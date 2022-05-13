---
title: RKE CIS v1.6 Benchmark - Self-Assessment Guide - Rancher v2.6
weight: 101
---

### RKE CIS v1.6 Kubernetes Benchmark - Rancher v2.6 with Kubernetes v1.18 to v1.23

[Click here to download a PDF version of this document](https://releases.rancher.com/documents/security/2.6/Rancher_v2-6_CIS_v1-6_Benchmark_Assessment.pdf).

#### Overview

This document is a companion to the [Rancher v2.6 RKE security hardening guide]({{<baseurl>}}/rancher/v2.6/en/security/hardening-guides/rke-1.6-hardening-2.6/). The hardening guide provides prescriptive guidance for hardening a production installation of Rancher, and this benchmark guide is meant to help you evaluate the level of security of the hardened cluster against each control in the benchmark.

This guide corresponds to specific versions of the hardening guide, Rancher, CIS Benchmark and Kubernetes:

| Hardening Guide Version | Rancher Version | CIS Benchmark Version |  Kubernetes Version |
| ----------------------- | --------------- | --------------------- | ------------------- |
| Hardening Guide CIS v1.6 Benchmark | Rancher v2.6 | CIS v1.6 | Kubernetes v1.18 up to v1.23 |

Because Rancher and RKE install Kubernetes services as Docker containers, many of the control verification checks in the CIS Kubernetes Benchmark do not apply and will have a result of \`Not Applicable\`. This guide will walk through the various controls and provide updated example commands to audit compliance in Rancher created clusters.

This document is to be used by Rancher operators, security teams, auditors and decision makers.

For more detail about each audit, including rationales and remediations for failing tests, you can refer to the corresponding section of the CIS Kubernetes Benchmark v1.6. You can download the benchmark, after creating a free account, in [Center for Internet Security (CIS)](https://www.cisecurity.org/benchmark/kubernetes/).

#### Testing controls methodology

Rancher and RKE install Kubernetes services via Docker containers. Configuration is defined by arguments passed to the container at the time of initialization, not via configuration files.

Where control audits differ from the original CIS benchmark, the audit commands specific to Rancher are provided for testing. When performing the tests, you will need access to the command line on the hosts of all RKE nodes. The commands also make use of the [kubectl](https://kubernetes.io/docs/tasks/tools/) (with a valid configuration file) and [jq](https://stedolan.github.io/jq/) tools, which are required in the testing and evaluation of test results.

> NOTE: Only `automated` tests (previously called `scored`) are covered in this guide.

### Controls

---
