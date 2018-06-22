---
title: System Images
weight: 225
draft: true
---
When RKE is deploying Kubernetes, there are several images that are pulled. These images are used as Kubernetes system components as well as helping to deploy these system components.  

As of `v0.1.6`, the functionality of a couple of the system images were consolidated into a single `rancher/rke-tools` image to simplify and speed the deployment process.

You can configure the [network plug-ins]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/network-plugins/) and [ingress controller]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/ingress-controllers/) as well as the options for these add-ons separately.

This is the example of the full list of system images used to deploy Kubernetes through RKE. The image tags are dependent on the [Kubernetes image/version used](https://github.com/rancher/types/blob/master/apis/management.cattle.io/v3/k8s_defaults.go).

> **Note:** As versions of RKE are released, the tags on these images will no longer be up to date. This list is specific for `v1.10.3-rancher2`.

```yaml
system_images:
    kubernetes: rancher/hyperkube:v1.10.3-rancher2
    etcd: rancher/coreos-etcd:v3.1.12
    alpine: rancher/rke-tools:v0.1.9
    nginx_proxy: rancher/rke-tools:v0.1.9
    cert_downloader: rancher/rke-tools:v0.1.9
    kubernetes_services_sidecar: rancher/rke-tools:v0.1.9
    kubedns: rancher/k8s-dns-kube-dns-amd64:1.14.8
    dnsmasq: rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.8
    kubedns_sidecar: rancher/k8s-dns-sidecar-amd64:1.14.8
    kubedns_autoscaler: rancher/cluster-proportional-autoscaler-amd64:1.0.0
    pod_infra_container: rancher/pause-amd64:3.1

    # Flannel Networking Options
    flannel: rancher/coreos-flannel:v0.9.1
    flannel_cni: rancher/coreos-flannel-cni:v0.2.0

    # Calico Networking Options
    calico_node: rancher/calico-node:v3.1.1
    calico_cni: rancher/calico-cni:v3.1.1
    calico_ctl: rancher/calico-ctl:v2.0.0

    # Canal Networking Options
    canal_node: rancher/calico-node:v3.1.1
    canal_cni: rancher/calico-cni:v3.1.1
    canal_flannel: rancher/coreos-flannel:v0.9.1

    # Weave Networking Options
    weave_node: weaveworks/weave-kube:2.1.2
    weave_cni: weaveworks/weave-npc:2.1.2

    # Ingress Options
    ingress: rancher/nginx-ingress-controller:0.10.2-rancher3
    ingressBackend: rancher/nginx-ingress-controller-defaultbackend:1.4
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

If you have an air-gapped setup and cannot access `docker.io`, you will need to set up your [private registry]({{< baseurl >}}/rke/v0.1.x/en/config-options/private-registries/) in your cluster configuration file. After you set up private registry, you will need to update these images to pull from your private registry.
