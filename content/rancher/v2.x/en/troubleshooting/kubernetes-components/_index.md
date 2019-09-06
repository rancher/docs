---
title: Kubernetes components
weight: 100
---

The commands/steps listed on this page apply to the core Kubernetes components on [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) clusters.

## Diagram

![Cluster diagram]({{< baseurl >}}/img/rancher/clusterdiagram.svg)<br/>
<sup>Lines show the traffic flow between components. Colors are used purely for visual aid</sup>

## etcd

This section applies to nodes with the `etcd` role.

### Is etcd container is running

The container for etcd should have status **Up**. The duration shown after **Up** is the time the container has been running.

```
docker ps -a -f=name=etcd$
```

Example output:
```
CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS              PORTS               NAMES
605a124503b9        rancher/coreos-etcd:v3.2.18   "/usr/local/bin/et..."   2 hours ago         Up 2 hours                              etcd
```

### etcd container logging

The logging of the container can contain information on what the problem could be.

```
docker logs etcd
```

* `health check for peer xxx could not connect: dial tcp IP:2380: getsockopt: connection refused`

A connection to the address shown on port 2380 cannot be established. Check if the etcd container is running on the host with the address shown.

* `xxx is starting a new election at term x`

The etcd cluster has lost it's quorum and is trying to establish a new leader. This can happen when the majority of the nodes running etcd go down/unreachable.

* `connection error: desc = "transport: Error while dialing dial tcp 0.0.0.0:2379: i/o timeout"; Reconnecting to {0.0.0.0:2379 0  <nil>}`

The host firewall is preventing network communication.

* `rafthttp: request cluster ID mismatch`

The node with the etcd instance logging `rafthttp: request cluster ID mismatch` is trying to join a cluster that has already been formed with another peer. The node should be removed from the cluster, and re-added.

* `rafthttp: failed to find member`

The cluster state (`/var/lib/etcd`) contains wrong information to join the cluster. The node should be removed from the cluster, the state directory should be cleaned and the node should be re-added.

### etcd cluster and connectivity checks

The address where etcd is listening depends on the address configuration of the host etcd is running on. If an internal address is configured for the host etcd is running on, the endpoint for `etcdctl` needs to be specified explicitly. If any of the commands respond with `Error:  context deadline exceeded`, the etcd instance is unhealthy (either quorum is lost or the instance is not correctly joined in the cluster)

* Check etcd members on all nodes

Output should contain all the nodes with the `etcd` role and the output should be identical on all nodes.

Command:
```
docker exec etcd etcdctl member list
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
docker exec etcd sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT member list"
```

Example output:
```
xxx, started, etcd-xxx, https://IP:2380, https://IP:2379,https://IP:4001
xxx, started, etcd-xxx, https://IP:2380, https://IP:2379,https://IP:4001
xxx, started, etcd-xxx, https://IP:2380, https://IP:2379,https://IP:4001
```

* Check endpoint status

The values for `RAFT TERM` should be equal and `RAFT INDEX` should be not be too far apart from each other.

Command:
```
docker exec etcd etcdctl endpoint status --endpoints=$(docker exec etcd /bin/sh -c "etcdctl member list | cut -d, -f5 | sed -e 's/ //g' | paste -sd ','") --write-out table
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
docker exec etcd etcdctl endpoint status --endpoints=$(docker exec etcd /bin/sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT member list | cut -d, -f5 | sed -e 's/ //g' | paste -sd ','") --write-out table
```

Example output:
```
+-----------------+------------------+---------+---------+-----------+-----------+------------+
| ENDPOINT        |        ID        | VERSION | DB SIZE | IS LEADER | RAFT TERM | RAFT INDEX |
+-----------------+------------------+---------+---------+-----------+-----------+------------+
| https://IP:2379 | 333ef673fc4add56 |  3.2.18 |   24 MB |     false |        72 |      66887 |
| https://IP:2379 | 5feed52d940ce4cf |  3.2.18 |   24 MB |      true |        72 |      66887 |
| https://IP:2379 | db6b3bdb559a848d |  3.2.18 |   25 MB |     false |        72 |      66887 |
+-----------------+------------------+---------+---------+-----------+-----------+------------+
```

* Check endpoint health

Command:
```
docker exec etcd etcdctl endpoint health --endpoints=$(docker exec etcd /bin/sh -c "etcdctl member list | cut -d, -f5 | sed -e 's/ //g' | paste -sd ','")
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
docker exec etcd etcdctl endpoint health --endpoints=$(docker exec etcd /bin/sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT member list | cut -d, -f5 | sed -e 's/ //g' | paste -sd ','")
```

Example output:
```
https://IP:2379 is healthy: successfully committed proposal: took = 2.113189ms
https://IP:2379 is healthy: successfully committed proposal: took = 2.649963ms
https://IP:2379 is healthy: successfully committed proposal: took = 2.451201ms
```

* Check connectivity on port TCP/2379

Requires the `curl` binary on the node.

Command:
```
for endpoint in $(docker exec etcd /bin/sh -c "etcdctl member list | cut -d, -f5"); do
  echo "Validating connection to ${endpoint}/health";
  curl -w "\n" --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) "${endpoint}/health";
done
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
for endpoint in $(docker exec etcd /bin/sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT member list | cut -d, -f5"); do
  echo "Validating connection to ${endpoint}/health";
  curl -w "\n" --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) "${endpoint}/health";
done
```

If you are running on an operating system without `curl` (for example, RancherOS), you can use the following command which uses a Docker container to run the `curl` command.

Command:
```
for endpoint in $(docker exec etcd /bin/sh -c "etcdctl member list | cut -d, -f5"); do
   echo "Validating connection to ${endpoint}/health"
   docker run --net=host -v $(docker inspect kubelet --format '{{ range .Mounts }}{{ if eq .Destination "/etc/kubernetes" }}{{ .Source }}{{ end }}{{ end }}')/ssl:/etc/kubernetes/ssl:ro appropriate/curl -s -w "\n" --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) "${endpoint}/health"
done
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
for endpoint in $(docker exec etcd /bin/sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT member list | cut -d, -f5"); do
  echo "Validating connection to ${endpoint}/health";
  docker run --net=host -v $(docker inspect kubelet --format '{{ range .Mounts }}{{ if eq .Destination "/etc/kubernetes" }}{{ .Source }}{{ end }}{{ end }}')/ssl:/etc/kubernetes/ssl:ro appropriate/curl -s -w "\n" --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) "${endpoint}/health"
done
```

Example output:
```
Validating connection to https://IP:2379/health
{"health": "true"}
Validating connection to https://IP:2379/health
{"health": "true"}
Validating connection to https://IP:2379/health
{"health": "true"}
```

* Check connectivity on port TCP/2380

Command:
```
for endpoint in $(docker exec etcd /bin/sh -c "etcdctl member list | cut -d, -f4"); do
  echo "Validating connection to ${endpoint}/version";
  curl --http1.1 -w "\n" --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) "${endpoint}/version";
done
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
for endpoint in $(docker exec etcd /bin/sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT member list | cut -d, -f4"); do
  echo "Validating connection to ${endpoint}/version";
  curl --http1.1 -w "\n" --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) "${endpoint}/version";
done
```

If you are running on an operating system without `curl` (for example, RancherOS), you can use the following command which uses a Docker container to run the `curl` command.

Command:
```
for endpoint in $(docker exec etcd /bin/sh -c "etcdctl member list | cut -d, -f4"); do
  echo "Validating connection to ${endpoint}/version";
  docker run --net=host -v $(docker inspect kubelet --format '{{ range .Mounts }}{{ if eq .Destination "/etc/kubernetes" }}{{ .Source }}{{ end }}{{ end }}')/ssl:/etc/kubernetes/ssl:ro appropriate/curl --http1.1 -s -w "\n" --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) "${endpoint}/version"
done
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
for endpoint in $(docker exec etcd /bin/sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT member list | cut -d, -f4"); do
  echo "Validating connection to ${endpoint}/version";
  docker run --net=host -v $(docker inspect kubelet --format '{{ range .Mounts }}{{ if eq .Destination "/etc/kubernetes" }}{{ .Source }}{{ end }}{{ end }}')/ssl:/etc/kubernetes/ssl:ro appropriate/curl --http1.1 -s -w "\n" --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) "${endpoint}/version"
done
```

Example output:
```
Validating connection to https://IP:2380/version
{"etcdserver":"3.2.18","etcdcluster":"3.2.0"}
Validating connection to https://IP:2380/version
{"etcdserver":"3.2.18","etcdcluster":"3.2.0"}
Validating connection to https://IP:2380/version
{"etcdserver":"3.2.18","etcdcluster":"3.2.0"}
```

### etcd alarms

etcd will trigger alarms, for instance when it runs out of space.

Command:
```
docker exec etcd etcdctl alarm list
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
docker exec etcd sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT alarm list"
```

Example output when NOSPACE alarm is triggered:
```
memberID:x alarm:NOSPACE
memberID:x alarm:NOSPACE
memberID:x alarm:NOSPACE
```

### etcd space errors

Related error messages are `etcdserver: mvcc: database space exceeded` or `applying raft message exceeded backend quota`. Alarm `NOSPACE` will be triggered.

Resolution:

* Compact the keyspace

Command:
```
rev=$(docker exec etcd etcdctl endpoint status --write-out json | egrep -o '"revision":[0-9]*' | egrep -o '[0-9]*')
docker exec etcd etcdctl compact "$rev"
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
rev=$(docker exec etcd sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT endpoint status --write-out json | egrep -o '\"revision\":[0-9]*' | egrep -o '[0-9]*'")
docker exec etcd sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT compact \"$rev\""
```

Example output:
```
compacted revision xxx
```

* Defrag all etcd members

Command:
```
docker exec etcd etcdctl defrag --endpoints=$(docker exec etcd /bin/sh -c "etcdctl member list | cut -d, -f5 | sed -e 's/ //g' | paste -sd ','")
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
docker exec etcd sh -c "etcdctl defrag --endpoints=$(docker exec etcd /bin/sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT member list | cut -d, -f5 | sed -e 's/ //g' | paste -sd ','")"
```

Example output:
```
Finished defragmenting etcd member[https://IP:2379]
Finished defragmenting etcd member[https://IP:2379]
Finished defragmenting etcd member[https://IP:2379]
```

* Check endpoint status

Command:
```
docker exec etcd etcdctl endpoint status --endpoints=$(docker exec etcd /bin/sh -c "etcdctl member list | cut -d, -f5 | sed -e 's/ //g' | paste -sd ','") --write-out table
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
docker exec etcd sh -c "etcdctl endpoint status --endpoints=$(docker exec etcd /bin/sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT member list | cut -d, -f5 | sed -e 's/ //g' | paste -sd ','") --write-out table"
```

Example output:
```
+-----------------+------------------+---------+---------+-----------+-----------+------------+
| ENDPOINT        |        ID        | VERSION | DB SIZE | IS LEADER | RAFT TERM | RAFT INDEX |
+-----------------+------------------+---------+---------+-----------+-----------+------------+
| https://IP:2379 |  e973e4419737125 |  3.2.18 |  553 kB |     false |        32 |    2449410 |
| https://IP:2379 | 4a509c997b26c206 |  3.2.18 |  553 kB |     false |        32 |    2449410 |
| https://IP:2379 | b217e736575e9dd3 |  3.2.18 |  553 kB |      true |        32 |    2449410 |
+-----------------+------------------+---------+---------+-----------+-----------+------------+
```

* Disarm alarm

After verifying that the DB size went down after compaction and defragmenting, the alarm needs to be disarmed for etcd to allow writes again.

Command:
```
docker exec etcd etcdctl alarm list
docker exec etcd etcdctl alarm disarm
docker exec etcd etcdctl alarm list
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
docker exec etcd sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT alarm list"
docker exec etcd sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT alarm disarm"
docker exec etcd sh -c "etcdctl --endpoints=\$ETCDCTL_ENDPOINT alarm list"
```

Example output:
```
docker exec etcd etcdctl alarm list
memberID:x alarm:NOSPACE
memberID:x alarm:NOSPACE
memberID:x alarm:NOSPACE
docker exec etcd etcdctl alarm disarm
docker exec etcd etcdctl alarm list
```

### Log level

The log level of etcd can be changed dynamically via the API. You can configure debug logging using the commands below.

Command:
```
curl -XPUT -d '{"Level":"DEBUG"}' --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) $(docker exec etcd printenv ETCDCTL_ENDPOINTS)/config/local/log
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
curl -XPUT -d '{"Level":"DEBUG"}' --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) $(docker exec etcd printenv $ETCDCTL_ENDPOINT)/config/local/log
```

To reset the log level back to the default (`INFO`), you can use the following command.

Command:
```
curl -XPUT -d '{"Level":"INFO"}' --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) $(docker exec etcd printenv ETCDCTL_ENDPOINTS)/config/local/log
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
curl -XPUT -d '{"Level":"INFO"}' --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) $(docker exec etcd printenv $ETCDCTL_ENDPOINT)/config/local/log
```

### etcd content

If you want to investigate the contents of your etcd, you can either watch streaming events or you can query etcd directly, see below for examples.

* Watch streaming events

Command:
```
docker exec etcd etcdctl watch --prefix /registry
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
docker exec etcd etcdctl --endpoints=\$ETCDCTL_ENDPOINT watch --prefix /registry
```

If you only want to see the affected keys (and not the binary data), you can append `| grep -a ^/registry` to the command to filter for keys only.

* Query etcd directly

Command:
```
docker exec etcd etcdctl get /registry --prefix=true --keys-only
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
docker exec etcd etcdctl --endpoints=\$ETCDCTL_ENDPOINT get /registry --prefix=true --keys-only
```

You can process the data to get a summary of count per key, using the command below:

```
docker exec etcd etcdctl get /registry --prefix=true --keys-only | grep -v ^$ | awk -F'/' '{ if ($3 ~ /cattle.io/) {h[$3"/"$4]++} else { h[$3]++ }} END { for(k in h) print h[k], k }' | sort -nr
```

## controlplane

This section applies to nodes with the `controlplane` role.

### Are the containers for controlplane running

There are three specific containers launched on nodes with the `controlpane` role:

* `kube-apiserver`
* `kube-controller-manager`
* `kube-scheduler`

The containers should have status **Up**. The duration shown after **Up** is the time the container has been running.

```
docker ps -a -f=name='kube-apiserver|kube-controller-manager|kube-scheduler'
```

Example output:
```
CONTAINER ID        IMAGE                                COMMAND                  CREATED             STATUS              PORTS               NAMES
26c7159abbcc        rancher/hyperkube:v1.11.5-rancher1   "/opt/rke-tools/en..."   3 hours ago         Up 3 hours                              kube-apiserver
f3d287ca4549        rancher/hyperkube:v1.11.5-rancher1   "/opt/rke-tools/en..."   3 hours ago         Up 3 hours                              kube-scheduler
bdf3898b8063        rancher/hyperkube:v1.11.5-rancher1   "/opt/rke-tools/en..."   3 hours ago         Up 3 hours                              kube-controller-manager
```

### controlplane container logging

> **Note:** If you added multiple nodes with the `controlplane` role, both `kube-controller-manager` and `kube-scheduler` use a leader election process to determine the leader. Only the current leader will log the performed actions. See [Kubernetes leader election]({{< baseurl >}}/rancher/v2.x/en/troubleshooting/kubernetes-resources/#kubernetes-leader-election) how to retrieve the current leader.

The logging of the containers can contain information on what the problem could be.

```
docker logs kube-apiserver
docker logs kube-controller-manager
docker logs kube-scheduler
```

## nginx-proxy

The `nginx-proxy` container is deployed on every node that does not have the `controlplane` role. It provides access to all the nodes with the `controlplane` role by dynamically generating the NGINX configuration based on available nodes with the `controlplane` role.

### Is the container running

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

### Check generated NGINX configuration

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

### nginx-proxy container logging

The logging of the containers can contain information on what the problem could be.

```
docker logs nginx-proxy
```

## worker and generic

This section applies to every node as it includes components that run on nodes with any role.

### Are the containers running

There are three specific containers launched on nodes with the `controlpane` role:

* kubelet
* kube-proxy

The containers should have status `Up`. The duration shown after `Up` is the time the container has been running.

```
docker ps -a -f=name='kubelet|kube-proxy'
```

Example output:
```
CONTAINER ID        IMAGE                                COMMAND                  CREATED             STATUS              PORTS               NAMES
158d0dcc33a5        rancher/hyperkube:v1.11.5-rancher1   "/opt/rke-tools/en..."   3 hours ago         Up 3 hours                              kube-proxy
a30717ecfb55        rancher/hyperkube:v1.11.5-rancher1   "/opt/rke-tools/en..."   3 hours ago         Up 3 hours                              kubelet
```

### container logging

The logging of the containers can contain information on what the problem could be.

```
docker logs kubelet
docker logs kube-proxy
```
