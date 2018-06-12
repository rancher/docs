---
title: System Images
weight: 3000
draft: true
---
RKE pulls several images during it's operation. Both for actual system components and to perform deployment actions.

Prior to version `0.1.6`, RKE used the following list of images for deployment and cluster configuration:
```yaml
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
```
In addintion to the above list, images for the network plugin were also pulled. The exact network plugin images depend on the configured plugin and it's version.



As of version `0.1.6`, the functionality of several system images were consolidated into a single `rke-tools` image to simplify and speed the deployment process.

The following images are no longer used. They are replaced by `rancher/rke-tools`:
- alpine:latest
- rancher/rke-nginx-proxy:v0.1.1
- rancher/rke-cert-deployer:v0.1.1
- rancher/rke-service-sidekick:v0.1.0

This as of version `v0.1.8`, this is a full list of images and values:
```yaml
etcd: rancher/coreos-etcd:v3.1.12
alpine: rancher/rke-tools:v0.1.9
nginx_proxy: rancher/rke-tools:v0.1.9
cert_downloader: rancher/rke-tools:v0.1.9
kubernetes_services_sidecar: rancher/rke-tools:v0.1.9
kubedns: rancher/k8s-dns-kube-dns-amd64:1.14.8
dnsmasq: rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.8
kubednsSidecar: rancher/k8s-dns-sidecar-amd64:1.14.8
kubednsAutoscaler: rancher/cluster-proportional-autoscaler-amd64:1.0.0
kubernetes: rancher/hyperkube:v1.10.3-rancher2
flannel: rancher/coreos-flannel:v0.9.1
flannelCNI: rancher/coreos-flannel-cni:v0.2.0
calico_node: rancher/calico-node:v3.1.1
calico_cni: rancher/calico-cni:v3.1.1
calico_ctl: rancher/calico-ctl:v2.0.0
canal_node: rancher/calico-node:v3.1.1
canal_cni: rancher/calico-cni:v3.1.1
Canalflannel: rancher/coreos-flannel:v0.9.1
wave_node: weaveworks/weave-kube:2.1.2
weave_cni: weaveworks/weave-npc:2.1.2
pod_infra_container: rancher/pause-amd64:3.1
ingress: rancher/nginx-ingress-controller:0.10.2-rancher3
ingressBackend: rancher/nginx-ingress-controller-defaultbackend:1.4
```
