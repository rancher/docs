---
title: Dockershim
weight: 300
---

The Dockershim is the CRI compliant layer between the Kubelet and the Docker daemon. As part of the Kubernetes 1.20 release, the [deprecation of the in-tree Dockershim was announced](https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/). For more information on the deprecation and its timelines, see the [Kubernetes Dockershim Deprecation FAQ](https://kubernetes.io/blog/2020/12/02/dockershim-faq/#when-will-dockershim-be-removed).

RKE clusters now support the external Dockershim to continue leveraging Docker as the CRI runtime. We now implement the upstream open source community external Dockershim announced by [Mirantis and Docker](https://www.mirantis.com/blog/mirantis-to-take-over-support-of-kubernetes-dockershim-2/) to ensure RKE clusters can continue to leverage Docker.

To enable the external Dockershim in versions of RKE before 1.24, configure the following option.

```
enable_cri_dockerd: true
```

Starting with version 1.24, the above defaults to true.

For users looking to use another container runtime, Rancher has the edge-focused K3s and datacenter-focused RKE2 Kubernetes distributions that use containerd as the default runtime. Imported RKE2 and K3s Kubernetes clusters can then be upgraded and managed through Rancher going forward.

### FAQ

<br>

Q. Do I have to upgrade Rancher to get Rancher’s support of the upstream external Dockershim replacement?  

A The upstream support of the Dockershim replacement `cri_dockerd` begins for RKE in Kubernetes 1.21. You will need to be on a version of Rancher that supports RKE 1.21. See our support matrix for details.

<br> 

Q. I am currently on RKE with Kubernetes 1.23. What happens when upstream finally removes Dockershim in 1.24? 

A. The version of Dockershim in RKE with Kubernetes will continue to work until 1.23. For information on the timeline, see the [Kubernetes Dockershim Deprecation FAQ](https://kubernetes.io/blog/2020/12/02/dockershim-faq/#when-will-dockershim-be-removed). After this, starting in 1.24, RKE will default to enabling `cri_dockerd` by default and will continue to do for versions afterwards. 

<br>

Q: What are my other options if I don’t want to depend on the Dockershim or cri_dockerd? 

A: You can use a runtime like containerd with Kubernetes that does not require Dockershim support. RKE2 or K3s are two options for doing this.

<br>

Q: If I am already using RKE1 and want to switch to RKE2, what are my migration options?  

A: Today, you can stand up a new cluster and migrate workloads to a new RKE2 cluster that uses containerd. Rancher is exploring the possibility of an in-place upgrade path. 

<br>
