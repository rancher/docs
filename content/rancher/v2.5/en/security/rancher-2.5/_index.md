---
title: Self-Assessment and Hardening Guides for Rancher v2.5
shortTitle: Rancher v2.5 Guides
weight: 1
---

Rancher v2.5 introduced the capability to deploy Rancher on any Kubernetes cluster. For that reason, we now provide separate security hardening guides for Rancher deployments on each of Rancher's Kubernetes distributions.

- [Rancher Kubernetes Distributions](#rancher-kubernetes-distributions)
- [Hardening Guides and Benchmark Versions](#hardening-guides-and-benchmark-versions)
  - [RKE Guides](#rke-guides)
  - [RKE2 Guides](#rke2-guides)
  - [K3s Guides](#k3s)
- [Rancher with SELinux](#rancher-with-selinux)

# Rancher Kubernetes Distributions

Rancher has the following Kubernetes distributions:

- [**RKE,**]({{<baseurl>}}/rke/latest/en/) Rancher Kubernetes Engine, is a CNCF-certified Kubernetes distribution that runs entirely within Docker containers. 
- [**K3s,**]({{<baseurl>}}/k3s/latest/en/) is a fully conformant, lightweight Kubernetes distribution. It is easy to install, with half the memory of upstream Kubernetes, all in a binary of less than 100 MB.
- [**RKE2**](https://docs.rke2.io/) is a fully conformant Kubernetes distribution that focuses on security and compliance within the U.S. Federal Government sector.

To harden a Kubernetes cluster outside of Rancher's distributions, refer to your Kubernetes provider docs.

# Hardening Guides and Benchmark Versions

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

Kubernetes Version | CIS Benchmark Version | Self Assessment Guide | Hardening Guide
---|---|---|---
Kubernetes v1.17, v1.18, & v1.19 | CIS v1.5 | [Link]({{<baseurl>}}/k3s/latest/en/security/self_assessment/) | [Link]({{<baseurl>}}/k3s/latest/en/security/hardening_guide/)


# Rancher with SELinux

_Available as of v2.5.8_

[Security-Enhanced Linux (SELinux)](https://en.wikipedia.org/wiki/Security-Enhanced_Linux) is a security enhancement to Linux. After being historically used by government agencies, SELinux is now industry standard and is enabled by default on CentOS 7 and 8.

To use Rancher with SELinux, we recommend installing the `rancher-selinux` RPM according to the instructions on [this page.]({{<baseurl>}}/rancher/v2.5/en/security/selinux/#installing-the-rancher-selinux-rpm)