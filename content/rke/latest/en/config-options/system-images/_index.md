---
title: System Images
weight: 225
---
When RKE is deploying Kubernetes, there are several images that are pulled. These images are used as Kubernetes system components as well as helping to deploy these system components.  

As of `v0.1.6`, the functionality of a couple of the system images were consolidated into a single `rancher/rke-tools` image to simplify and speed the deployment process.

You can configure the [network plug-ins]({{<baseurl>}}/rke/latest/en/config-options/add-ons/network-plugins/), [ingress controller]({{<baseurl>}}/rke/latest/en/config-options/add-ons/ingress-controllers/) and [dns provider]({{<baseurl>}}/rke/latest/en/config-options/add-ons/dns/) as well as the options for these add-ons separately.

Below is an example of the list of system images used to deploy Kubernetes through RKE. The default versions of Kubernetes are tied to specific versions of system images. 

- For RKE v0.2.x and below, the map of versions and the system image versions is located here: https://github.com/rancher/types/blob/release/v2.2/apis/management.cattle.io/v3/k8s_defaults.go

- For RKE v0.3.0 and above, the map of versions and the system image versions is located here: https://github.com/rancher/kontainer-driver-metadata/blob/master/rke/k8s_rke_system_images.go

> **Note:** As versions of RKE are released, the tags on these images will no longer be up to date. This list is specific for `v1.10.3-rancher2`.

```yaml
system_images:
  etcd: rancher/coreos-etcd:v3.2.24
  alpine: rancher/rke-tools:v0.1.24
  nginx_proxy: rancher/rke-tools:v0.1.24
  cert_downloader: rancher/rke-tools:v0.1.24
  kubernetes: rancher/hyperkube:v1.13.1-rancher1
  kubernetes_services_sidecar: rancher/rke-tools:v0.1.24
  pod_infra_container: rancher/pause-amd64:3.1

  # kube-dns images
  kubedns: rancher/k8s-dns-kube-dns-amd64:1.15.0
  dnsmasq: rancher/k8s-dns-dnsmasq-nanny-amd64:1.15.0
  kubedns_sidecar: rancher/k8s-dns-sidecar-amd64:1.15.0
  kubedns_autoscaler: rancher/cluster-proportional-autoscaler-amd64:1.0.0

  # CoreDNS images
  coredns: coredns/coredns:1.2.6
  coredns_autoscaler: rancher/cluster-proportional-autoscaler-amd64:1.0.0

  # Flannel images
  flannel: rancher/coreos-flannel:v0.10.0
  flannel_cni: rancher/coreos-flannel-cni:v0.3.0

  # Calico images
  calico_node: rancher/calico-node:v3.4.0
  calico_cni: rancher/calico-cni:v3.4.0
  calico_controllers: ""
  calico_ctl: rancher/calico-ctl:v2.0.0

  # Canal images
  canal_node: rancher/calico-node:v3.4.0
  canal_cni: rancher/calico-cni:v3.4.0
  canal_flannel: rancher/coreos-flannel:v0.10.0

  # Weave images
  weave_node: weaveworks/weave-kube:2.5.0
  weave_cni: weaveworks/weave-npc:2.5.0

  # Ingress controller images
  ingress: rancher/nginx-ingress-controller:0.21.0-rancher1
  ingress_backend: rancher/nginx-ingress-controller-defaultbackend:1.4

  # Metrics server image
  metrics_server: rancher/metrics-server-amd64:v0.3.1
```

Prior to `v0.1.6`, instead of using the `rancher/rke-tools` image, we used the following images:

```yaml
system_images:
    alpine: alpine:latest
    nginx_proxy: rancher/rke-nginx-proxy:v0.1.1
    cert_downloader: rancher/rke-cert-deployer:v0.1.1
    kubernetes_services_sidecar: rancher/rke-service-sidekick:v0.1.0
```

### Air-gapped Setups

If you have an air-gapped setup and cannot access `docker.io`, you will need to set up your [private registry]({{< baseurl >}}/rke/latest/en/config-options/private-registries/) in your cluster configuration file. After you set up private registry, you will need to update these images to pull from your private registry.
