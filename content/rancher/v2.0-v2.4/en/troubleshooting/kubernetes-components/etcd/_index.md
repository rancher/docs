---
title: Troubleshooting etcd Nodes
weight: 1
---

This section contains commands and tips for troubleshooting nodes with the `etcd` role.

This page covers the following topics:

- [Checking if the etcd Container is Running](#checking-if-the-etcd-container-is-running)
- [etcd Container Logging](#etcd-container-logging)
- [etcd Cluster and Connectivity Checks](#etcd-cluster-and-connectivity-checks)
  - [Check etcd Members on all Nodes](#check-etcd-members-on-all-nodes)
  - [Check Endpoint Status](#check-endpoint-status)
  - [Check Endpoint Health](#check-endpoint-health)
  - [Check Connectivity on Port TCP/2379](#check-connectivity-on-port-tcp-2379)
  - [Check Connectivity on Port TCP/2380](#check-connectivity-on-port-tcp-2380)
- [etcd Alarms](#etcd-alarms)
- [etcd Space Errors](#etcd-space-errors)
- [Log Level](#log-level)
- [etcd Content](#etcd-content)
  - [Watch Streaming Events](#watch-streaming-events)
  - [Query etcd Directly](#query-etcd-directly)
- [Replacing Unhealthy etcd Nodes](#replacing-unhealthy-etcd-nodes)

# Checking if the etcd Container is Running

The container for etcd should have status **Up**. The duration shown after **Up** is the time the container has been running.

```
docker ps -a -f=name=etcd$
```

Example output:
```
CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS              PORTS               NAMES
605a124503b9        rancher/coreos-etcd:v3.2.18   "/usr/local/bin/et..."   2 hours ago         Up 2 hours                              etcd
```

# etcd Container Logging

The logging of the container can contain information on what the problem could be.

```
docker logs etcd
```
| Log | Explanation |
|-----|------------------|
| `health check for peer xxx could not connect: dial tcp IP:2380: getsockopt: connection refused` | A connection to the address shown on port 2380 cannot be established. Check if the etcd container is running on the host with the address shown. |
| `xxx is starting a new election at term x` | The etcd cluster has lost its quorum and is trying to establish a new leader. This can happen when the majority of the nodes running etcd go down/unreachable. |
| `connection error: desc = "transport: Error while dialing dial tcp 0.0.0.0:2379: i/o timeout"; Reconnecting to {0.0.0.0:2379 0  <nil>}` | The host firewall is preventing network communication. |
| `rafthttp: request cluster ID mismatch` | The node with the etcd instance logging `rafthttp: request cluster ID mismatch` is trying to join a cluster that has already been formed with another peer. The node should be removed from the cluster, and re-added. |
| `rafthttp: failed to find member` | The cluster state (`/var/lib/etcd`) contains wrong information to join the cluster. The node should be removed from the cluster, the state directory should be cleaned and the node should be re-added.

# etcd Cluster and Connectivity Checks

The address where etcd is listening depends on the address configuration of the host etcd is running on. If an internal address is configured for the host etcd is running on, the endpoint for `etcdctl` needs to be specified explicitly. If any of the commands respond with `Error:  context deadline exceeded`, the etcd instance is unhealthy (either quorum is lost or the instance is not correctly joined in the cluster)

### Check etcd Members on all Nodes

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

### Check Endpoint Status

The values for `RAFT TERM` should be equal and `RAFT INDEX` should be not be too far apart from each other.

Command:
```
docker exec -e ETCDCTL_ENDPOINTS=$(docker exec etcd /bin/sh -c "etcdctl member list | cut -d, -f5 | sed -e 's/ //g' | paste -sd ','") etcd etcdctl endpoint status --write-out table
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

### Check Endpoint Health

Command:
```
docker exec -e ETCDCTL_ENDPOINTS=$(docker exec etcd /bin/sh -c "etcdctl member list | cut -d, -f5 | sed -e 's/ //g' | paste -sd ','") etcd etcdctl endpoint health
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

### Check Connectivity on Port TCP/2379

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

### Check Connectivity on Port TCP/2380

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

# etcd Alarms

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

# etcd Space Errors

Related error messages are `etcdserver: mvcc: database space exceeded` or `applying raft message exceeded backend quota`. Alarm `NOSPACE` will be triggered.

Resolutions:

- [Compact the Keyspace](#compact-the-keyspace)
- [Defrag All etcd Members](#defrag-all-etcd-members)
- [Check Endpoint Status](#check-endpoint-status)
- [Disarm Alarm](#disarm-alarm)

### Compact the Keyspace

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

### Defrag All etcd Members

Command:
```
docker exec -e ETCDCTL_ENDPOINTS=$(docker exec etcd /bin/sh -c "etcdctl member list | cut -d, -f5 | sed -e 's/ //g' | paste -sd ','") etcd etcdctl defrag
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

### Check Endpoint Status

Command:
```
docker exec -e ETCDCTL_ENDPOINTS=$(docker exec etcd /bin/sh -c "etcdctl member list | cut -d, -f5 | sed -e 's/ //g' | paste -sd ','") etcd etcdctl endpoint status --write-out table
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

### Disarm Alarm

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

# Log Level

The log level of etcd can be changed dynamically via the API. You can configure debug logging using the commands below.

Command:
```
docker run --net=host -v $(docker inspect kubelet --format '{{ range .Mounts }}{{ if eq .Destination "/etc/kubernetes" }}{{ .Source }}{{ end }}{{ end }}')/ssl:/etc/kubernetes/ssl:ro appropriate/curl -s -XPUT -d '{"Level":"DEBUG"}' --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) $(docker exec etcd printenv ETCDCTL_ENDPOINTS)/config/local/log
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
docker run --net=host -v $(docker inspect kubelet --format '{{ range .Mounts }}{{ if eq .Destination "/etc/kubernetes" }}{{ .Source }}{{ end }}{{ end }}')/ssl:/etc/kubernetes/ssl:ro appropriate/curl -s -XPUT -d '{"Level":"DEBUG"}' --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) $(docker exec etcd printenv ETCDCTL_ENDPOINT)/config/local/log
```

To reset the log level back to the default (`INFO`), you can use the following command.

Command:
```
docker run --net=host -v $(docker inspect kubelet --format '{{ range .Mounts }}{{ if eq .Destination "/etc/kubernetes" }}{{ .Source }}{{ end }}{{ end }}')/ssl:/etc/kubernetes/ssl:ro appropriate/curl -s -XPUT -d '{"Level":"INFO"}' --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) $(docker exec etcd printenv ETCDCTL_ENDPOINTS)/config/local/log
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
docker run --net=host -v $(docker inspect kubelet --format '{{ range .Mounts }}{{ if eq .Destination "/etc/kubernetes" }}{{ .Source }}{{ end }}{{ end }}')/ssl:/etc/kubernetes/ssl:ro appropriate/curl -s -XPUT -d '{"Level":"INFO"}' --cacert $(docker exec etcd printenv ETCDCTL_CACERT) --cert $(docker exec etcd printenv ETCDCTL_CERT) --key $(docker exec etcd printenv ETCDCTL_KEY) $(docker exec etcd printenv ETCDCTL_ENDPOINT)/config/local/log
```

# etcd Content

If you want to investigate the contents of your etcd, you can either watch streaming events or you can query etcd directly, see below for examples.

### Watch Streaming Events

Command:
```
docker exec etcd etcdctl watch --prefix /registry
```

Command when using etcd version lower than 3.3.x (Kubernetes 1.13.x and lower) and `--internal-address` was specified when adding the node:
```
docker exec etcd etcdctl --endpoints=\$ETCDCTL_ENDPOINT watch --prefix /registry
```

If you only want to see the affected keys (and not the binary data), you can append `| grep -a ^/registry` to the command to filter for keys only.

### Query etcd Directly

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

# Replacing Unhealthy etcd Nodes

When a node in your etcd cluster becomes unhealthy, the recommended approach is to fix or remove the failed or unhealthy node before adding a new etcd node to the cluster.
