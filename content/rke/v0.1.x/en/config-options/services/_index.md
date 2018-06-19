---
title: Kubernetes Services
weight: 3025
draft: true
---

## Default services

<!--Talk about the default services launched and options around them-->

```
services:
  etcd:
    # if external etcd is used
    # path: /etcdcluster
    # external_urls:
    #   - https://etcd-example.com:2379
    # ca_cert: |-
    #   -----BEGIN CERTIFICATE-----
    #   xxxxxxxxxx
    #   -----END CERTIFICATE-----
    # cert: |-
    #   -----BEGIN CERTIFICATE-----
    #   xxxxxxxxxx
    #   -----END CERTIFICATE-----
    # key: |-
    #   -----BEGIN PRIVATE KEY-----
    #   xxxxxxxxxx
    #   -----END PRIVATE KEY-----
  kube-api:
    service_cluster_ip_range: 10.43.0.0/16
    pod_security_policy: false
    # add additional arguments to the kubernetes component
    # Note that this WILL OVERRIDE existing defaults
    extra_args:
      # Enable audit log to stdout
      audit-log-path: "-"
      # Increase number of delete workers
      delete-collection-workers: 3
      # Set the level of log output to debug-level
      v: 4
  kube-controller:
    cluster_cidr: 10.42.0.0/16
    service_cluster_ip_range: 10.43.0.0/16
  scheduler:
  kubelet:
    cluster_domain: cluster.local
    cluster_dns_server: 10.43.0.10
    infra_container_image: gcr.io/google_containers/pause-amd64:3.0
    # Optionally define additional volume binds to a service
    extra_binds:
      - "/usr/libexec/kubernetes/kubelet-plugins:/usr/libexec/kubernetes/kubelet-plugins"
  kubeproxy:

```
