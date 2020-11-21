---
title: Rancher v2.5
weight: 1
---

For Rancher v2.5, the guides are organized differntly than previous guides. Since Rancher v2.5 can be deployed on any Kubernetes cluster, the guides are broken up based on Rancher's Kubernetes distributions. To harden a Kubernetes cluster outside of Rancher's distributions, refer to your Kubernetes provider docs.

Rancher has the following Kubernetes distributions:

* RKE
* k3s
* RKE2

### Guides

These guides have been tested along with the Rancher v2.5 release. Each self assessment guide is accompanied with a hardening guide and tested on a specific Kubernetes version and CIS benchmark version. If a CIS benchmark has not been validated for your Kubernetes version, you can choose to use the existing guides until a newer version is added.


#### RKE Guides

Kubernetes Version | CIS Benchmark Version | Self Assessment Guide | Hardening Guides
---|---|---|---
Kubernetes v1.15+ | CIS v1.5 | [Link](./1.5-benchmark-2.5) | [Link](./1.5-hardening-2.5)

#### RKE2 Guides

Kubernetes Version | CIS Benchmark Version | Self Assessment Guide | Hardening Guides
---|---|---|---
Kubernetes v1.18 | CIS v1.5 | [Link](https://docs.rke2.io/security/cis_self_assessment/) | [Link](https://docs.rke2.io/security/hardening_guide/)
