---
title: Expression
weight: 10000
---

## In This Document

<!-- TOC -->

- [Cluster Metrics](#cluster-metrics)

    + [Node Metrics](#node-metrics)
- [Etcd Metrics](#etcd-metrics)
- [Kubernetes Components Metrics](#kubernetes-components-metrics)
- [Rancher Logging Metrics](#rancher-logging-metrics)
- [Workload Metrics](#workload-metrics)

    + [Pod Metrics](#pod-metrics)
    + [Container Metrics](#container-metrics)

<!-- /TOC -->

## Cluster Metrics

- **CPU Utilization**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `1 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) by (instance))` |
    | Summary | `1 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])))` |

- **Load Average**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>load1</td><td>`sum(node_load1) by (instance) / count(node_cpu_seconds_total{mode="system"}) by (instance)`</td></tr><tr><td>load5</td><td>`sum(node_load5) by (instance) / count(node_cpu_seconds_total{mode="system"}) by (instance)`</td></tr><tr><td>load15</td><td>`sum(node_load15) by (instance) / count(node_cpu_seconds_total{mode="system"}) by (instance)`</td></tr></table> |
    | Summary | <table><tr><td>load1</td><td>`sum(node_load1) by (instance) / count(node_cpu_seconds_total{mode="system"})`</td></tr><tr><td>load5</td><td>`sum(node_load5) by (instance) / count(node_cpu_seconds_total{mode="system"})`</td></tr><tr><td>load15</td><td>`sum(node_load15) by (instance) / count(node_cpu_seconds_total{mode="system"})`</td></tr></table> |

- **Memory Utilization**
    
    | Catalog | Expression |
    | --- | --- |
    | Detail | `1 - sum(node_memory_MemAvailable_bytes) by (instance) / sum(node_memory_MemTotal_bytes) by (instance)` |
    | Summary | `1 - sum(node_memory_MemAvailable_bytes) / sum(node_memory_MemTotal_bytes)` |

- **Disk Utilization**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `(sum(node_filesystem_size_bytes{device!="rootfs"}) by (instance) - sum(node_filesystem_free_bytes{device!="rootfs"}) by (instance)) / sum(node_filesystem_size_bytes{device!="rootfs"}) by (instance)` |
    | Summary | `(sum(node_filesystem_size_bytes{device!="rootfs"}) - sum(node_filesystem_free_bytes{device!="rootfs"})) / sum(node_filesystem_size_bytes{device!="rootfs"})` |
    
- **Disk I/O**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>read</td><td>`sum(rate(node_disk_read_bytes_total[5m])) by (instance)`</td></tr><tr><td>written</td><td>`sum(rate(node_disk_written_bytes_total[5m])) by (instance)`</td></tr></table> |
    | Summary | <table><tr><td>read</td><td>`sum(rate(node_disk_read_bytes_total[5m]))`</td></tr><tr><td>written</td><td>`sum(rate(node_disk_written_bytes_total[5m]))`</td></tr></table> |

- **Network Packets**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>receive-dropped</td><td><code>sum(rate(node_network_receive_drop_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m])) by (instance)</code></td></tr><tr><td>receive-errs</td><td><code>sum(rate(node_network_receive_errs_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m])) by (instance)</code></td></tr><tr><td>receive-packets</td><td><code>sum(rate(node_network_receive_packets_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m])) by (instance)</code></td></tr><tr><td>transmit-dropped</td><td><code>sum(rate(node_network_transmit_drop_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m])) by (instance)</code></td></tr><tr><td>transmit-errs</td><td><code>sum(rate(node_network_transmit_errs_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m])) by (instance)</code></td></tr><tr><td>transmit-packets</td><td><code>sum(rate(node_network_transmit_packets_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m])) by (instance)</code></td></tr></table> |
    | Summary | <table><tr><td>receive-dropped</td><td><code>sum(rate(node_network_receive_drop_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m]))</code></td></tr><tr><td>receive-errs</td><td><code>sum(rate(node_network_receive_errs_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m]))</code></td></tr><tr><td>receive-packets</td><td><code>sum(rate(node_network_receive_packets_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m]))</code></td></tr><tr><td>transmit-dropped</td><td><code>sum(rate(node_network_transmit_drop_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m]))</code></td></tr><tr><td>transmit-errs</td><td><code>sum(rate(node_network_transmit_errs_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m]))</code></td></tr><tr><td>transmit-packets</td><td><code>sum(rate(node_network_transmit_packets_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m]))</code></td></tr></table> |

- **Network I/O**
    
    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>receive</td><td><code>sum(rate(node_network_receive_bytes_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m])) by (instance)</code></td></tr><tr><td>transmit</td><td><code>sum(rate(node_network_transmit_bytes_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m])) by (instance)</code></td></tr></table> |
    | Summary | <table><tr><td>receive</td><td><code>sum(rate(node_network_receive_bytes_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m]))</code></td></tr><tr><td>transmit</td><td><code>sum(rate(node_network_transmit_bytes_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*"}[5m]))</code></td></tr></table> |

### Node Metrics

- **CPU Utilization**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `avg(irate(node_cpu_seconds_total{mode!="idle", instance=~"$instance"}[5m])) by (mode)` |
    | Summary | `1 - (avg(irate(node_cpu_seconds_total{mode="idle", instance=~"$instance"}[5m])))` |

- **Load Average**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>load1</td><td>`sum(node_load1{instance=~"$instance"}) / count(node_cpu_seconds_total{mode="system",instance=~"$instance"})`</td></tr><tr><td>load5</td><td>`sum(node_load5{instance=~"$instance"}) / count(node_cpu_seconds_total{mode="system",instance=~"$instance"})`</td></tr><tr><td>load15</td><td>`sum(node_load15{instance=~"$instance"}) / count(node_cpu_seconds_total{mode="system",instance=~"$instance"})`</td></tr></table> |
    | Summary | <table><tr><td>load1</td><td>`sum(node_load1{instance=~"$instance"}) / count(node_cpu_seconds_total{mode="system",instance=~"$instance"})`</td></tr><tr><td>load5</td><td>`sum(node_load5{instance=~"$instance"}) / count(node_cpu_seconds_total{mode="system",instance=~"$instance"})`</td></tr><tr><td>load15</td><td>`sum(node_load15{instance=~"$instance"}) / count(node_cpu_seconds_total{mode="system",instance=~"$instance"})`</td></tr></table> |

- **Memory Utilization**
    
    | Catalog | Expression |
    | --- | --- |
    | Detail | `1 - sum(node_memory_MemAvailable_bytes{instance=~"$instance"}) / sum(node_memory_MemTotal_bytes{instance=~"$instance"})` |
    | Summary | `1 - sum(node_memory_MemAvailable_bytes{instance=~"$instance"}) / sum(node_memory_MemTotal_bytes{instance=~"$instance"}) ` |

- **Disk Utilization**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `(sum(node_filesystem_size_bytes{device!="rootfs",instance=~"$instance"}) by (device) - sum(node_filesystem_free_bytes{device!="rootfs",instance=~"$instance"}) by (device)) / sum(node_filesystem_size_bytes{device!="rootfs",instance=~"$instance"}) by (device)` |
    | Summary | `(sum(node_filesystem_size_bytes{device!="rootfs",instance=~"$instance"}) - sum(node_filesystem_free_bytes{device!="rootfs",instance=~"$instance"})) / sum(node_filesystem_size_bytes{device!="rootfs",instance=~"$instance"})` |
    
- **Disk I/O**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>read</td><td>`sum(rate(node_disk_read_bytes_total{instance=~"$instance"}[5m]))`</td></tr><tr><td>written</td><td>`sum(rate(node_disk_written_bytes_total{instance=~"$instance"}[5m]))`</td></tr></table> |
    | Summary | <table><tr><td>read</td><td>`sum(rate(node_disk_read_bytes_total{instance=~"$instance"}[5m]))`</td></tr><tr><td>written</td><td>`sum(rate(node_disk_written_bytes_total{instance=~"$instance"}[5m]))`</td></tr></table> |

- **Network Packets**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>receive-dropped</td><td><code>sum(rate(node_network_receive_drop_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m])) by (device)</code></td></tr><tr><td>receive-errs</td><td><code>sum(rate(node_network_receive_errs_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m])) by (device)</code></td></tr><tr><td>receive-packets</td><td><code>sum(rate(node_network_receive_packets_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m])) by (device)</code></td></tr><tr><td>transmit-dropped</td><td><code>sum(rate(node_network_transmit_drop_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m])) by (device)</code></td></tr><tr><td>transmit-errs</td><td><code>sum(rate(node_network_transmit_errs_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m])) by (device)</code></td></tr><tr><td>transmit-packets</td><td><code>sum(rate(node_network_transmit_packets_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m])) by (device)</code></td></tr></table> |
    | Summary | <table><tr><td>receive-dropped</td><td><code>sum(rate(node_network_receive_drop_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m]))</code></td></tr><tr><td>receive-errs</td><td><code>sum(rate(node_network_receive_errs_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m]))</code></td></tr><tr><td>receive-packets</td><td><code>sum(rate(node_network_receive_packets_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m]))</code></td></tr><tr><td>transmit-dropped</td><td><code>sum(rate(node_network_transmit_drop_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m]))</code></td></tr><tr><td>transmit-errs</td><td><code>sum(rate(node_network_transmit_errs_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m]))</code></td></tr><tr><td>transmit-packets</td><td><code>sum(rate(node_network_transmit_packets_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m]))</code></td></tr></table> |

- **Network I/O**
    
    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>receive</td><td><code>sum(rate(node_network_receive_bytes_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m])) by (device)</code></td></tr><tr><td>transmit</td><td><code>sum(rate(node_network_transmit_bytes_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m])) by (device)</code></td></tr></table> |
    | Summary | <table><tr><td>receive</td><td><code>sum(rate(node_network_receive_bytes_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m]))</code></td></tr><tr><td>transmit</td><td><code>sum(rate(node_network_transmit_bytes_total{device!~"lo &#124; veth.* &#124; docker.* &#124; flannel.* &#124; cali.* &#124; cbr.*",instance=~"$instance"}[5m]))</code></td></tr></table> |

## Etcd Metrics

- **GRPC Client Traffic**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>in</td><td>`sum(rate(etcd_network_client_grpc_received_bytes_total[5m])) by (instance)`</td></tr><tr><td>out</td><td>`sum(rate(etcd_network_client_grpc_sent_bytes_total[5m])) by (instance)`</td></tr></table> |
    | Summary | <table><tr><td>in</td><td>`sum(rate(etcd_network_client_grpc_received_bytes_total[5m]))`</td></tr><tr><td>out</td><td>`sum(rate(etcd_network_client_grpc_sent_bytes_total[5m]))`</td></tr></table> |

- **Peer Traffic**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>in</td><td>`sum(rate(etcd_network_peer_received_bytes_total[5m])) by (instance)`</td></tr><tr><td>out</td><td>`sum(rate(etcd_network_peer_sent_bytes_total[5m])) by (instance)`</td></tr></table> |
    | Summary | <table><tr><td>in</td><td>`sum(rate(etcd_network_peer_received_bytes_total[5m]))`</td></tr><tr><td>out</td><td>`sum(rate(etcd_network_peer_sent_bytes_total[5m]))`</td></tr></table> |

- **DB Size**
    
    | Catalog | Expression |
    | --- | --- |
    | Detail | `sum(etcd_debugging_mvcc_db_total_size_in_bytes) by (instance)` |
    | Summary | `sum(etcd_debugging_mvcc_db_total_size_in_bytes)` |

- **Active Streams**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>lease-watch</td><td>`sum(grpc_server_started_total{grpc_service="etcdserverpb.Lease",grpc_type="bidi_stream"}) by (instance) - sum(grpc_server_handled_total{grpc_service="etcdserverpb.Lease",grpc_type="bidi_stream"}) by (instance)`</td></tr><tr><td>watch</td><td>`sum(grpc_server_started_total{grpc_service="etcdserverpb.Watch",grpc_type="bidi_stream"}) by (instance) - sum(grpc_server_handled_total{grpc_service="etcdserverpb.Watch",grpc_type="bidi_stream"}) by (instance)`</td></tr></table> |
    | Summary | <table><tr><td>lease-watch</td><td>`sum(grpc_server_started_total{grpc_service="etcdserverpb.Lease",grpc_type="bidi_stream"}) - sum(grpc_server_handled_total{grpc_service="etcdserverpb.Lease",grpc_type="bidi_stream"})`</td></tr><tr><td>watch</td><td>`sum(grpc_server_started_total{grpc_service="etcdserverpb.Watch",grpc_type="bidi_stream"}) - sum(grpc_server_handled_total{grpc_service="etcdserverpb.Watch",grpc_type="bidi_stream"})`</td></tr></table> |

- **Raft Proposals**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>applied</td><td>`sum(increase(etcd_server_proposals_applied_total[5m])) by (instance)`</td></tr><tr><td>committed</td><td>`sum(increase(etcd_server_proposals_committed_total[5m])) by (instance)`</td></tr><tr><td>pending</td><td>`sum(increase(etcd_server_proposals_pending[5m])) by (instance)`</td></tr><tr><td>failed</td><td>`sum(increase(etcd_server_proposals_failed_total[5m])) by (instance)`</td></tr></table> |
    | Summary | <table><tr><td>applied</td><td>`sum(increase(etcd_server_proposals_applied_total[5m]))`</td></tr><tr><td>committed</td><td>`sum(increase(etcd_server_proposals_committed_total[5m]))`</td></tr><tr><td>pending</td><td>`sum(increase(etcd_server_proposals_pending[5m]))`</td></tr><tr><td>failed</td><td>`sum(increase(etcd_server_proposals_failed_total[5m]))`</td></tr></table> |

- **RPC Rate**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>total</td><td>`sum(rate(grpc_server_started_total{grpc_type="unary"}[5m])) by (instance)`</td></tr><tr><td>fail</td><td>`sum(rate(grpc_server_handled_total{grpc_type="unary",grpc_code!="OK"}[5m])) by (instance)`</td></tr></table> |
    | Summary | <table><tr><td>total</td><td>`sum(rate(grpc_server_started_total{grpc_type="unary"}[5m]))`</td></tr><tr><td>fail</td><td>`sum(rate(grpc_server_handled_total{grpc_type="unary",grpc_code!="OK"}[5m]))`</td></tr></table> |

- **Disk Operations**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>commit-called-by-backend</td><td>`sum(rate(etcd_disk_backend_commit_duration_seconds_sum[1m])) by (instance)`</td></tr><tr><td>fsync-called-by-wal</td><td>`sum(rate(etcd_disk_wal_fsync_duration_seconds_sum[1m])) by (instance)`</td></tr></table> |
    | Summary | <table><tr><td>commit-called-by-backend</td><td>`sum(rate(etcd_disk_backend_commit_duration_seconds_sum[1m]))`</td></tr><tr><td>fsync-called-by-wal</td><td>`sum(rate(etcd_disk_wal_fsync_duration_seconds_sum[1m]))`</td></tr></table> |

- **Disk Sync Duration**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>wal</td><td>`histogram_quantile(0.99, sum(rate(etcd_disk_wal_fsync_duration_seconds_bucket[5m])) by (instance, le))`</td></tr><tr><td>db</td><td>`histogram_quantile(0.99, sum(rate(etcd_disk_backend_commit_duration_seconds_bucket[5m])) by (instance, le))`</td></tr></table> |
    | Summary | <table><tr><td>wal</td><td>`sum(histogram_quantile(0.99, sum(rate(etcd_disk_wal_fsync_duration_seconds_bucket[5m])) by (instance, le)))`</td></tr><tr><td>db</td><td>`sum(histogram_quantile(0.99, sum(rate(etcd_disk_backend_commit_duration_seconds_bucket[5m])) by (instance, le)))`</td></tr></table> |

## Kubernetes Components Metrics

- **API Server Request Latency**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `avg(apiserver_request_latencies_sum / apiserver_request_latencies_count) by (instance, verb) /1e+06` |
    | Summary | `avg(apiserver_request_latencies_sum / apiserver_request_latencies_count) by (instance) /1e+06` |

- **API Server Request Rate**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `sum(rate(apiserver_request_count[5m])) by (instance, code)` |
    | Summary | `sum(rate(apiserver_request_count[5m])) by (instance)` |

- **Scheduling Failed Pods**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `sum(kube_pod_status_scheduled{condition="false"})` |
    | Summary | `sum(kube_pod_status_scheduled{condition="false"})` |

- **Controller Manager Queue Depth**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>volumes</td><td>`sum(volumes_depth) by instance`</td></tr><tr><td>deployment</td><td>`sum(deployment_depth) by instance`</td></tr><tr><td>replicaset</td><td>`sum(replicaset_depth) by instance`</td></tr><tr><td>service</td><td>`sum(service_depth) by instance`</td></tr><tr><td>serviceaccount</td><td>`sum(serviceaccount_depth) by instance`</td></tr><tr><td>endpoint</td><td>`sum(endpoint_depth) by instance`</td></tr><tr><td>daemonset</td><td>`sum(daemonset_depth) by instance`</td></tr><tr><td>statefulset</td><td>`sum(statefulset_depth) by instance`</td></tr><tr><td>replicationmanager</td><td>`sum(replicationmanager_depth) by instance`</td></tr></table> |
    | Summary | <table><tr><td>volumes</td><td>`sum(volumes_depth)`</td></tr><tr><td>deployment</td><td>`sum(deployment_depth)`</td></tr><tr><td>replicaset</td><td>`sum(replicaset_depth)`</td></tr><tr><td>service</td><td>`sum(service_depth)`</td></tr><tr><td>serviceaccount</td><td>`sum(serviceaccount_depth)`</td></tr><tr><td>endpoint</td><td>`sum(endpoint_depth)`</td></tr><tr><td>daemonset</td><td>`sum(daemonset_depth)`</td></tr><tr><td>statefulset</td><td>`sum(statefulset_depth)`</td></tr><tr><td>replicationmanager</td><td>`sum(replicationmanager_depth)`</td></tr></table> |

- **Scheduler E2E Scheduling Latency**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `histogram_quantile(0.99, sum(scheduler_e2e_scheduling_latency_microseconds_bucket) by (le, instance)) / 1e+06` |
    | Summary | `sum(histogram_quantile(0.99, sum(scheduler_e2e_scheduling_latency_microseconds_bucket) by (le, instance)) / 1e+06)` |

- **Scheduler Preemption Attempts**
    
    | Catalog | Expression |
    | --- | --- |
    | Detail | `sum(rate(scheduler_total_preemption_attempts[5m])) by (instance)` |
    | Summary | `sum(rate(scheduler_total_preemption_attempts[5m]))` |

- **Ingress Controller Connections**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>reading</td><td>`sum(nginx_ingress_controller_nginx_process_connections{state="reading"}) by (instance)`</td></tr><tr><td>waiting</td><td>`sum(nginx_ingress_controller_nginx_process_connections{state="waiting"}) by (instance)`</td></tr><tr><td>writing</td><td>`sum(nginx_ingress_controller_nginx_process_connections{state="writing"}) by (instance)`</td></tr><tr><td>accpeted</td><td>`sum(increase(nginx_ingress_controller_nginx_process_connections_total{state="accepted"}[5m])) by (instance)`</td></tr><tr><td>active</td><td>`sum(increase(nginx_ingress_controller_nginx_process_connections_total{state="active"}[5m])) by (instance)`</td></tr><tr><td>handled</td><td>`sum(increase(nginx_ingress_controller_nginx_process_connections_total{state="handled"}[5m])) by (instance)`</td></tr></table> |
    | Summary | <table><tr><td>reading</td><td>`sum(nginx_ingress_controller_nginx_process_connections{state="reading"})`</td></tr><tr><td>waiting</td><td>`sum(nginx_ingress_controller_nginx_process_connections{state="waiting"})`</td></tr><tr><td>writing</td><td>`sum(nginx_ingress_controller_nginx_process_connections{state="writing"})`</td></tr><tr><td>accpeted</td><td>`sum(increase(nginx_ingress_controller_nginx_process_connections_total{state="accepted"}[5m]))`</td></tr><tr><td>active</td><td>`sum(increase(nginx_ingress_controller_nginx_process_connections_total{state="active"}[5m]))`</td></tr><tr><td>handled</td><td>`sum(increase(nginx_ingress_controller_nginx_process_connections_total{state="handled"}[5m]))`</td></tr></table> |

- **Ingress Controller Request Process Time**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `max(nginx_ingress_controller_request_duration_seconds_bucket{le="1"}) by (host, path)` |
    | Summary | `max(nginx_ingress_controller_request_duration_seconds_bucket{le="1"}) by (host, path)` |

- **Nginx Response Seconds**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `sort_desc(max(nginx_ingress_controller_ingress_upstream_latency_seconds_sum) by (host, path))` |
    | Summary | `sort_desc(max(nginx_ingress_controller_ingress_upstream_latency_seconds_sum) by (host, path))` |

## Rancher Logging Metrics

- **Fluentd Buffer Queue Rate**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `sum(rate(fluentd_output_status_buffer_queue_length[5m])) by (instance)` |
    | Summary | `sum(rate(fluentd_output_status_buffer_queue_length[5m]))` |

- **Fluentd Input Rate**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `sum(rate(fluentd_input_status_num_records_total[5m])) by (instance)` |
    | Summary | `sum(rate(fluentd_input_status_num_records_total[5m]))` |

- **Fluentd Output Errors Rate**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `sum(rate(fluentd_output_status_num_errors[5m])) by (type)` |
    | Summary | `sum(rate(fluentd_output_status_num_errors[5m]))` |

- **Fluentd Output Rate**
    
    | Catalog | Expression |
    | --- | --- |
    | Detail | `sum(rate(fluentd_output_status_num_records_total[5m])) by (instance)` |
    | Summary | `sum(rate(fluentd_output_status_num_records_total[5m]))` |

## Workload Metrics

- **CPU Utilization**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>cfs throttled seconds</td><td>`sum(rate(container_cpu_cfs_throttled_seconds_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr><tr><td>user seconds</td><td>`sum(rate(container_cpu_user_seconds_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr><tr><td>system seconds</td><td>`sum(rate(container_cpu_system_seconds_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr><tr><td>usage seconds</td><td>`sum(rate(container_cpu_usage_seconds_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr></table> |
    | Summary | <table><tr><td>cfs throttled seconds</td><td>`sum(rate(container_cpu_cfs_throttled_seconds_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr><tr><td>user seconds</td><td>`sum(rate(container_cpu_user_seconds_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr><tr><td>system seconds</td><td>`sum(rate(container_cpu_system_seconds_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr><tr><td>usage seconds</td><td>`sum(rate(container_cpu_usage_seconds_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr></table> |

- **Memory Utilization**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `sum(container_memory_working_set_bytes{namespace="$namespace",pod_name=~"$podName", container_name!=""}) by (pod_name)` |
    | Summary | `sum(container_memory_working_set_bytes{namespace="$namespace",pod_name=~"$podName", container_name!=""})` |

- **Network Packets**
    
    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>receive-packets</td><td>`sum(rate(container_network_receive_packets_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr><tr><td>receive-dropped</td><td>`sum(rate(container_network_receive_packets_dropped_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr><tr><td>receive-errors</td><td>`sum(rate(container_network_receive_errors_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr><tr><td>transmit-packets</td><td>`sum(rate(container_network_transmit_packets_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr><tr><td>transmit-dropped</td><td>`sum(rate(container_network_transmit_packets_dropped_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr><tr><td>transmit-errors</td><td>`sum(rate(container_network_transmit_errors_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr></table> |
    | Summary | <table><tr><td>receive-packets</td><td>`sum(rate(container_network_receive_packets_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr><tr><td>receive-dropped</td><td>`sum(rate(container_network_receive_packets_dropped_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr><tr><td>receive-errors</td><td>`sum(rate(container_network_receive_errors_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr><tr><td>transmit-packets</td><td>`sum(rate(container_network_transmit_packets_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr><tr><td>transmit-dropped</td><td>`sum(rate(container_network_transmit_packets_dropped_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr><tr><td>transmit-errors</td><td>`sum(rate(container_network_transmit_errors_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr></table> |

- **Network I/O**
    
    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>receive</td><td>`sum(rate(container_network_receive_bytes_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr><tr><td>transmit</td><td>`sum(rate(container_network_transmit_bytes_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr></table> |
    | Summary | <table><tr><td>receive</td><td>`sum(rate(container_network_receive_bytes_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr><tr><td>transmit</td><td>`sum(rate(container_network_transmit_bytes_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr></table> |

- **Disk I/O**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>read</td><td>`sum(rate(container_fs_reads_bytes_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr><tr><td>write</td><td>`sum(rate(container_fs_writes_bytes_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m])) by (pod_name)`</td></tr></table> |
    | Summary | <table><tr><td>read</td><td>`sum(rate(container_fs_reads_bytes_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr><tr><td>write</td><td>`sum(rate(container_fs_writes_bytes_total{namespace="$namespace",pod_name=~"$podName",container_name!=""}[5m]))`</td></tr></table> |

### Pod Metrics

- **CPU Utilization**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>cfs throttled seconds</td><td>`sum(rate(container_cpu_cfs_throttled_seconds_total{container_name!="POD",namespace="$namespace",pod_name="$podName", container_name!=""}[5m])) by (container_name)`</td></tr><tr><td>usage seconds</td><td>`sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace="$namespace",pod_name="$podName", container_name!=""}[5m])) by (container_name)`</td></tr><tr><td>system seconds</td><td>`sum(rate(container_cpu_system_seconds_total{container_name!="POD",namespace="$namespace",pod_name="$podName", container_name!=""}[5m])) by (container_name)`</td></tr><tr><td>user seconds</td><td>`sum(rate(container_cpu_user_seconds_total{container_name!="POD",namespace="$namespace",pod_name="$podName", container_name!=""}[5m])) by (container_name)`</td></tr></table> |
    | Summary | <table><tr><td>cfs throttled seconds</td><td>`sum(rate(container_cpu_cfs_throttled_seconds_total{container_name!="POD",namespace="$namespace",pod_name="$podName", container_name!=""}[5m]))`</td></tr><tr><td>usage seconds</td><td>`sum(rate(container_cpu_usage_seconds_total{container_name!="POD",namespace="$namespace",pod_name="$podName", container_name!=""}[5m]))`</td></tr><tr><td>system seconds</td><td>`sum(rate(container_cpu_system_seconds_total{container_name!="POD",namespace="$namespace",pod_name="$podName", container_name!=""}[5m]))`</td></tr><tr><td>user seconds</td><td>`sum(rate(container_cpu_user_seconds_total{container_name!="POD",namespace="$namespace",pod_name="$podName", container_name!=""}[5m]))`</td></tr></table> |

- **Memory Utilization**

    | Catalog | Expression |
    | --- | --- |
    | Detail | `sum(container_memory_working_set_bytes{container_name!="POD",namespace="$namespace",pod_name="$podName",container_name!=""}) by (container_name)` |
    | Summary | `sum(container_memory_working_set_bytes{container_name!="POD",namespace="$namespace",pod_name="$podName",container_name!=""})` |

- **Network Packets**
    
    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>receive-packets</td><td>`sum(rate(container_network_receive_packets_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>receive-dropped</td><td>`sum(rate(container_network_receive_packets_dropped_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>receive-errors</td><td>`sum(rate(container_network_receive_errors_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>transmit-packets</td><td>`sum(rate(container_network_transmit_packets_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>transmit-dropped</td><td>`sum(rate(container_network_transmit_packets_dropped_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>transmit-errors</td><td>`sum(rate(container_network_transmit_errors_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr></table> |
    | Summary | <table><tr><td>receive-packets</td><td>`sum(rate(container_network_receive_packets_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>receive-dropped</td><td>`sum(rate(container_network_receive_packets_dropped_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>receive-errors</td><td>`sum(rate(container_network_receive_errors_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>transmit-packets</td><td>`sum(rate(container_network_transmit_packets_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>transmit-dropped</td><td>`sum(rate(container_network_transmit_packets_dropped_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>transmit-errors</td><td>`sum(rate(container_network_transmit_errors_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr></table> |

- **Network I/O**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>receive</td><td>`sum(rate(container_network_receive_bytes_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>transmit</td><td>`sum(rate(container_network_transmit_bytes_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr></table> |
    | Summary | <table><tr><td>receive</td><td>`sum(rate(container_network_receive_bytes_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>transmit</td><td>`sum(rate(container_network_transmit_bytes_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr></table> |

- **Disk I/O**

    | Catalog | Expression |
    | --- | --- |
    | Detail | <table><tr><td>read</td><td>`sum(rate(container_fs_reads_bytes_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m])) by (container_name)`</td></tr><tr><td>write</td><td>`sum(rate(container_fs_writes_bytes_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m])) by (container_name)`</td></tr></table> |
    | Summary | <table><tr><td>read</td><td>`sum(rate(container_fs_reads_bytes_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr><tr><td>write</td><td>`sum(rate(container_fs_writes_bytes_total{namespace="$namespace",pod_name="$podName",container_name!=""}[5m]))`</td></tr></table> |

### Container Metrics

- **CPU Utilization**

    | Catalog | Expression |
    | --- | --- |
    | cfs throttled seconds | `sum(rate(container_cpu_cfs_throttled_seconds_total{namespace="$namespace",pod_name="$podName",container_name="$containerName"}[5m]))` |
    | usage seconds | `sum(rate(container_cpu_usage_seconds_total{namespace="$namespace",pod_name="$podName",container_name="$containerName"}[5m]))` |
    | system seconds | `sum(rate(container_cpu_system_seconds_total{namespace="$namespace",pod_name="$podName",container_name="$containerName"}[5m]))` |
    | user seconds | `sum(rate(container_cpu_user_seconds_total{namespace="$namespace",pod_name="$podName",container_name="$containerName"}[5m]))` |

- **Memory Utilization**

    `sum(container_memory_working_set_bytes{namespace="$namespace",pod_name="$podName",container_name="$containerName"})`

- **Disk IO**
    
    | Catalog | Expression |
    | --- | --- |
    | read | `sum(rate(container_fs_reads_bytes_total{namespace="$namespace",pod_name="$podName",container_name="$containerName"}[5m]))` |
    | write | `sum(rate(container_fs_writes_bytes_total{namespace="$namespace",pod_name="$podName",container_name="$containerName"}[5m]))` |

    
