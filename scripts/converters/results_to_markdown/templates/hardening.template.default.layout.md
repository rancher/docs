---
title: CIS ${cis_version} Benchmark - Self-Assessment Guide - Rancher ${rancher_version}
weight: ${weight}
---

### CIS ${cis_version} Kubernetes Benchmark - Rancher ${rancher_version} with Kubernetes ${kubernetes_version}

[Click here to download a PDF version of this document](https://releases.rancher.com/documents/security/2.5/Rancher_1.6_Benchmark_Assessment.pdf)

#### Overview

This document is a companion to the Rancher ${rancher_version} security hardening guide. The hardening guide provides prescriptive guidance for hardening a production installation of Rancher, and this benchmark guide is meant to help you evaluate the level of security of the hardened cluster against each control in the benchmark.

This guide corresponds to specific versions of the hardening guide, Rancher, CIS Benchmark, and Kubernetes:

Hardening Guide Version | Rancher Version | CIS Benchmark Version |  Kubernetes Version
---------------------------|----------|---------|-------
Hardening Guide with CIS ${cis_version} Benchmark | Rancher ${rancher_version} | CIS ${cis_version}| Kubernetes ${kubernetes_version}

Because Rancher and RKE install Kubernetes services as Docker containers, many of the control verification checks in the CIS Kubernetes Benchmark don't apply and will have a result of `Not Applicable`. This guide will walk through the various controls and provide updated example commands to audit compliance in Rancher-created clusters.

This document is to be used by Rancher operators, security teams, auditors and decision makers.

For more detail about each audit, including rationales and remediations for failing tests, you can refer to the corresponding section of the CIS Kubernetes Benchmark ${cis_version}. You can download the benchmark after logging in to [CISecurity.org]( https://www.cisecurity.org/benchmark/kubernetes/).

#### Testing controls methodology

Rancher and RKE install Kubernetes services via Docker containers. Configuration is defined by arguments passed to the container at the time of initialization, not via configuration files.

Where control audits differ from the original CIS benchmark, the audit commands specific to Rancher Labs are provided for testing.
When performing the tests, you will need access to the Docker command line on the hosts of all three RKE roles. The commands also make use of the the [jq](https://stedolan.github.io/jq/) and [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) (with valid config) tools to and are required in the testing and evaluation of test results.

### Controls

%{ for section in results ~}
## ${section.id} ${section.description}
%{ for check in section.checks ~}
### ${check.id} ${check.description}

**Result:** ${check.state}

**Remediation:**
${check.remediation}

**Audit:**

```bash
${check.audit}
```

%{ if check.expected_result != "" ~}
**Expected Result**:

```console
${check.expected_result}
```
%{ endif ~}

%{ if length(regexall("^\\w+(\\.sh)", "${check.audit}")) == 1 ~}
**Audit Script:**
```bash
${file("${test_helper_path}/${regex("\\S+", check.audit)}") }
```
%{ endif ~}
%{ if check.actual_value_per_node[test_node] != "" ~}
**Returned Value**:

```console
${check.actual_value_per_node[test_node]}
```
%{ endif ~}
%{ endfor ~}
%{ endfor ~}