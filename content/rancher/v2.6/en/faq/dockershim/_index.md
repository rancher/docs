---
title: Dockershim
weight: 300
---

The Dockershim is the CRI compliant layer between the Kubelet and the Docker daemon. As part of the Kubernetes 1.20 release, the [deprecation of the in-tree Dockershim was announced](https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/). Removal is currently scheduled for Kubernetes 1.24. For more information on the deprecation and its timelines, see the [Kubernetes Dockershim Deprecation FAQ](https://kubernetes.io/blog/2020/12/02/dockershim-faq/#when-will-dockershim-be-removed).

RKE clusters, starting with Kubernetes 1.21, now support the external Dockershim to continue leveraging Docker as the CRI runtime. We now implement the upstream open source community Dockershim announced by [Mirantis and Docker](https://www.mirantis.com/blog/mirantis-to-take-over-support-of-kubernetes-dockershim-2/) to ensure RKE clusters can continue to leverage Docker.

To enable the external Dockershim, configure the following option.

```
enable_cri_dockerd: true
```

For users looking to use another container runtime, Rancher has the edge-focused K3s and datacenter-focused RKE2 Kubernetes distributions that use containerd as the default runtime. Imported RKE2 and K3s Kubernetes clusters can then be upgraded and managed through Rancher even after the removal of in-tree Dockershim in Kubernetes 1.24.

### FAQ

<br>

Q. Do I have to upgrade Rancher to get Rancher’s support of the upstream Dockershim?

The upstream support of Dockershim begins for RKE in Kubernetes 1.21. You will need to be on Rancher 2.6 or above to have support for RKE with Kubernetes 1.21. See our [support matrix](https://www.rancher.com/support-maintenance-terms/all-supported-versions/rancher-v2.6.0/) for details.

<br>

Q. I am currently on RKE with Kubernetes 1.20. Do I need to upgrade to RKE with Kubernetes 1.21 sooner to avoid being out of support for Dockershim?

A. The version of Dockershim in RKE with Kubernetes 1.20 will continue to work and is not scheduled for removal upstream until Kubernetes 1.24. It will only emit a warning of its future deprecation, which Rancher has mitigated in RKE with Kubernetes 1.21. You can plan your upgrade to Kubernetes 1.21 as you would normally, but should consider enabling the external Dockershim by Kubernetes 1.22. The external Dockershim will need to be enabled before upgrading to Kubernetes 1.24, at which point the existing implementation will be removed.

For more information on the deprecation and its timeline, see the [Kubernetes Dockershim Deprecation FAQ](https://kubernetes.io/blog/2020/12/02/dockershim-faq/#when-will-dockershim-be-removed).

<br>

Q: What are my other options if I don’t want to depend on the Dockershim?

A: You can use a runtime like containerd with Kubernetes that does not require Dockershim support. RKE2 or K3s are two options for doing this.

<br>

Q: If I am already using RKE1 and want to switch to RKE2, what are my migration options?

A: Rancher is exploring the possibility of an in-place upgrade path. Alternatively you can always migrate workloads from one cluster to another using kubectl.

<br>
