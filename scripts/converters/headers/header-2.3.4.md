---
title: CIS Benchmark Rancher Self-Assessment Guide - Rancher v2.3.4
weight: 103
---

### CIS Kubernetes Benchmark 1.5 - Rancher 2.3.4 with Kubernetes 1.15

[Click here to download a PDF version of this document](https://releases.rancher.com/documents/security/2.3.4/Rancher_Benchmark_Assessment.pdf)

#### Overview

This document is a companion to the Rancher v2.3.4 security hardening guide. The hardening guide provides prescriptive guidance for hardening a production installation of Rancher, and this benchmark guide is meant to help you evaluate the level of security of the hardened cluster against each control in the benchmark.

This guide corresponds to specific versions of the hardening guide, Rancher, Kubernetes, and the CIS Benchmark:

Self Assessment Guide Version | Rancher Version | Hardening Guide Version | Kubernetes Version | CIS Benchmark Version
---------------------------|----------|---------|-------|-----
Self Assessment Guide v2.3.4 | Rancher v2.3.4 | Hardening Guide v2.3.4 | Kubernetes v1.15 | Benchmark v1.5

Because Rancher and RKE install Kubernetes services as Docker containers, many of the control verification checks in the CIS Kubernetes Benchmark don't apply and will have a result of `Not Applicable`. This guide will walk through the various controls and provide updated example commands to audit compliance in Rancher-created clusters.

This document is to be used by Rancher operators, security teams, auditors and decision makers.

For more detail about each audit, including rationales and remediations for failing tests, you can refer to the corresponding section of the CIS Kubernetes Benchmark v1.5. You can download the benchmark after logging in to [CISecurity.org]( https://www.cisecurity.org/benchmark/kubernetes/).

#### Testing controls methodology

Rancher and RKE install Kubernetes services via Docker containers. Configuration is defined by arguments passed to the container at the time of initialization, not via configuration files.

Scoring the commands is different in Rancher Labs than in the CIS Benchmark. Where the commands differ from the original CIS benchmark, the commands specific to Rancher Labs are provided for testing. Only **scored** tests will be covered in this guide.

When performing the tests, you will need access to the Docker command line on the hosts of all three RKE roles. The commands also make use of the the `jq` and `kubectl` (with valid config) commands to provide human-readable formatting.

### Controls

---
