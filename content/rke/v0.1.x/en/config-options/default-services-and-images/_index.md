
title: Default Services and images
weight: 3000
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

## System Images

Prior to version `0.1.6`, RKE used the following list of images for deployment and cluster configuration:
```
system_images:
  etcd: rancher/etcd:v3.0.17
  kubernetes: rancher/k8s:v1.8.9-rancher1-1
  alpine: alpine:latest
  nginx_proxy: rancher/rke-nginx-proxy:v0.1.1
  cert_downloader: rancher/rke-cert-deployer:v0.1.1
  kubernetes_services_sidecar: rancher/rke-service-sidekick:v0.1.0
  kubedns: rancher/k8s-dns-kube-dns-amd64:1.14.5
  dnsmasq: rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.5
  kubedns_sidecar: rancher/k8s-dns-sidecar-amd64:1.14.5
  kubedns_autoscaler: rancher/cluster-proportional-autoscaler-amd64:1.0.0
  flannel: rancher/coreos-flannel:v0.9.1
  flannel_cni: rancher/coreos-flannel-cni:v0.2.0
```
As of version `0.1.6`, we consolidated several of those images into a single image to simplify and speed the deployment process.

The following images are no longer required, and can be replaced by `rancher/rke-tools:v0.1.4`:
- alpine:latest
- rancher/rke-nginx-proxy:v0.1.1
- rancher/rke-cert-deployer:v0.1.1
- rancher/rke-service-sidekick:v0.1.0
