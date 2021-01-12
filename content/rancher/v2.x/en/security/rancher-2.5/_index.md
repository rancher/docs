---
title: Rancher v2.5
weight: 1
---

Rancher v2.5 introduced the capability to deploy Rancher on any Kubernetes cluster. For that reason, we now provide separate security hardening guides for Rancher deployments on each of Rancher's Kubernetes distributions.

Rancher has the following Kubernetes distributions:

- [**RKE,**]({{<baseurl>}}/rke/latest/en/) Rancher Kubernetes Engine, is a CNCF-certified Kubernetes distribution that runs entirely within Docker containers. 
- [**K3s,**]({{<baseurl>}}/k3s/latest/en/) is a fully conformant, lightweight Kubernetes distribution. It is easy to install, with half the memory of upstream Kubernetes, all in a binary of less than 100 MB.
- [**RKE2**](https://docs.rke2.io/) is a fully conformant Kubernetes distribution that focuses on security and compliance within the U.S. Federal Government sector.

To harden a Kubernetes cluster outside of Rancher's distributions, refer to your Kubernetes provider docs.

# Guides

These guides have been tested along with the Rancher v2.5 release. Each self-assessment guide is accompanied with a hardening guide and tested on a specific Kubernetes version and CIS benchmark version. If a CIS benchmark has not been validated for your Kubernetes version, you can choose to use the existing guides until a newer version is added.

### RKE Guides

Kubernetes Version | CIS Benchmark Version | Self Assessment Guide | Hardening Guides
---|---|---|---
Kubernetes v1.15+ | CIS v1.5 | [Link](./1.5-benchmark-2.5) | [Link](./1.5-hardening-2.5)
Kubernetes v1.18+ | CIS v1.6 | [Link](./1.6-benchmark-2.5) | [Link](./1.6-hardening-2.5)

### RKE2 Guides

Kubernetes Version | CIS Benchmark Version | Self Assessment Guide | Hardening Guides
---|---|---|---
Kubernetes v1.18 | CIS v1.5 | [Link](https://docs.rke2.io/security/cis_self_assessment/) | [Link](https://docs.rke2.io/security/hardening_guide/)

### K3s Guides

The K3s security guides will be added soon.
