---
title: NGINX
weight: 270
aliases:
  - /rancher/v2.0-v2.4/en/installation/options/helm2/create-nodes-lb/nginx
---
NGINX will be configured as Layer 4 load balancer (TCP) that forwards connections to one of your Rancher nodes.

>**Note:**
> In this configuration, the load balancer is positioned in front of your nodes. The load balancer can be any host capable of running NGINX.
>
> One caveat: do not use one of your Rancher nodes as the load balancer.

## Install NGINX

Start by installing NGINX on the node you want to use as a load balancer. NGINX has packages available for all known operating systems. The versions tested are `1.14` and `1.15`. For help installing NGINX, refer to their [install documentation](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/).

The `stream` module is required, which is present when using the official NGINX packages. Please refer to your OS documentation on how to install and enable the NGINX `stream` module on your operating system.

## Create NGINX Configuration

After installing NGINX, you need to update the NGINX configuration file, `nginx.conf`, with the IP addresses for your nodes.

1. Copy and paste the code sample below into your favorite text editor. Save it as `nginx.conf`.

2. From `nginx.conf`, replace both occurrences (port 80 and port 443) of `<IP_NODE_1>`, `<IP_NODE_2>`, and `<IP_NODE_3>` with the IPs of your [nodes]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/create-nodes-lb/).

    >**Note:** See [NGINX Documentation: TCP and UDP Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/tcp-udp-load-balancer/) for all configuration options.

    <figcaption>Example NGINX config</figcaption>
    ```
    worker_processes 4;
    worker_rlimit_nofile 40000;

    events {
        worker_connections 8192;
    }

    stream {
        upstream rancher_servers_http {
            least_conn;
            server <IP_NODE_1>:80 max_fails=3 fail_timeout=5s;
            server <IP_NODE_2>:80 max_fails=3 fail_timeout=5s;
            server <IP_NODE_3>:80 max_fails=3 fail_timeout=5s;
        }
        server {
            listen     80;
            proxy_pass rancher_servers_http;
        }

        upstream rancher_servers_https {
            least_conn;
            server <IP_NODE_1>:443 max_fails=3 fail_timeout=5s;
            server <IP_NODE_2>:443 max_fails=3 fail_timeout=5s;
            server <IP_NODE_3>:443 max_fails=3 fail_timeout=5s;
        }
        server {
            listen     443;
            proxy_pass rancher_servers_https;
        }
    }
    ```

3. Save `nginx.conf` to your load balancer at the following path: `/etc/nginx/nginx.conf`.

4. Load the updates to your NGINX configuration by running the following command:

    ```
    # nginx -s reload
    ```

## Option - Run NGINX as Docker container

Instead of installing NGINX as a package on the operating system, you can rather run it as a Docker container. Save the edited **Example NGINX config** as `/etc/nginx.conf` and run the following command to launch the NGINX container:

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /etc/nginx.conf:/etc/nginx/nginx.conf \
  nginx:1.14
```
