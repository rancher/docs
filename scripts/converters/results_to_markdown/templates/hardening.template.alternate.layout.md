---
title: CIS ${cis_version} Benchmark - Self-Assessment Guide - Rancher ${rancher_version}
weight: ${weight}
---

# CIS v1.6 Kubernetes Benchmark - Rancher v2.5 with Kubernetes v1.18

[Click here to download a PDF version of this document](https://releases.rancher.com/documents/security/2.5/Rancher_1.6_Benchmark_Assessment.pdf)

## Overview

This document is a companion to the Rancher v2.5 security hardening guide. The hardening guide provides prescriptive guidance for hardening a production installation of Rancher, and this benchmark guide is meant to help you evaluate the level of security of the hardened cluster against each control in the benchmark.

This guide corresponds to specific versions of the hardening guide, Rancher, CIS Benchmark, and Kubernetes:

Hardening Guide Version | Rancher Version | CIS Benchmark Version |  Kubernetes Version
---------------------------|----------|---------|-------
Hardening Guide with CIS 1.5 Benchmark | Rancher v2.5 | CIS v1.5| Kubernetes v1.15

Because Rancher and RKE install Kubernetes services as Docker containers, many of the control verification checks in the CIS Kubernetes Benchmark don't apply and will have a result of `Not Applicable`. This guide will walk through the various controls and provide updated example commands to audit compliance in Rancher-created clusters.

This document is to be used by Rancher operators, security teams, auditors and decision makers.

For more detail about each audit, including rationales and remediations for failing tests, you can refer to the corresponding section of the CIS Kubernetes Benchmark v1.5. You can download the benchmark after logging in to [CISecurity.org]( https://www.cisecurity.org/benchmark/kubernetes/).

## Testing controls methodology

Rancher and RKE install Kubernetes services via Docker containers. Configuration is defined by arguments passed to the container at the time of initialization, not via configuration files.

Where control audits differ from the original CIS benchmark, the audit commands specific to Rancher Labs are provided for testing.
When performing the tests, you will need access to the Docker command line on the hosts of all three RKE roles. The commands also make use of the the [jq](https://stedolan.github.io/jq/) and [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) (with valid config) tools to and are required in the testing and evaluation of test results.


## Control Result Details
%{ for section in results ~}

### ${section.id} ${section.description}
%{ for check in section.checks ~}

#### ${check.id}: ${check.description}

Attribute | Details
--- | --- 
**Result** | ${check.state}
**Remediation** | ${replace(replace(check.remediation,"|","\\|"),"\n","<br>")}
%{ if check.audit != "" ~}
**Audit** | <code style="color:#2c3d4f;font-weight:normal;background:content-box">${replace(check.audit,"|","\\|")}</code>
%{ endif ~}
%{ if check.expected_result != "" ~}
**Expected Result** | <code style="color:#2c3d4f;font-weight:normal;background:content-box">${check.expected_result}</code>
%{ endif ~}
%{ if check.actual_value_per_node[test_node] != "" ~}

{{% accordion label="Audit Output" %}}
```console
 ${check.actual_value_per_node[test_node]}
 ```
{{% /accordion %}}
 %{ endif ~}

%{ if length(regexall("^\\w+(\\.sh)", "${check.audit}")) == 1 ~}
{{% accordion label="Audit Script" %}}
```bash
${file("${test_helper_path}/${regex("\\S+", check.audit)}") }
```
{{% /accordion %}}
%{ endif ~}
%{ endfor ~}
%{ endfor ~}
