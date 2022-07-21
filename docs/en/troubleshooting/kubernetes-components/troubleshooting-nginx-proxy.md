---
title: Troubleshooting nginx-proxy
weight: 3
---

The `nginx-proxy` container is deployed on every node that does not have the `controlplane` role. It provides access to all the nodes with the `controlplane` role by dynamically generating the NGINX configuration based on available nodes with the `controlplane` role.

# Check if the Container is Running

The container is called `nginx-proxy` and should have status `Up`. The duration shown after `Up` is the time the container has been running.

```
docker ps -a -f=name=nginx-proxy
```

Example output:

```
docker ps -a -f=name=nginx-proxy
CONTAINER ID        IMAGE                       COMMAND                  CREATED             STATUS              PORTS               NAMES
c3e933687c0e        rancher/rke-tools:v0.1.15   "nginx-proxy CP_HO..."   3 hours ago         Up 3 hours                              nginx-proxy
```

# Check Generated NGINX Configuration

The generated configuration should include the IP addresses of the nodes with the `controlplane` role. The configuration can be checked using the following command:

```
docker exec nginx-proxy cat /etc/nginx/nginx.conf
```

Example output:
```
error_log stderr notice;

worker_processes auto;
events {
  multi_accept on;
  use epoll;
  worker_connections 1024;
}

stream {
        upstream kube_apiserver {
            
            server ip_of_controlplane_node1:6443;
            
            server ip_of_controlplane_node2:6443;
            
        }

        server {
            listen        6443;
            proxy_pass    kube_apiserver;
            proxy_timeout 30;
            proxy_connect_timeout 2s;

        }

}
```

# nginx-proxy Container Logging

The logging of the containers can contain information on what the problem could be.

```
docker logs nginx-proxy
```