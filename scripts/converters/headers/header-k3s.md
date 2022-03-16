---
title: CIS Self Assessment Guide
weight: 90
---

### CIS Kubernetes Benchmark v1.6 - K3s with Kubernetes v1.17 to v1.21

#### Overview

This document is a companion to the [K3s security hardening guide]({{<baseurl>}}/k3s/latest/en/security/hardening_guide/). The hardening guide provides prescriptive guidance for hardening a production installation of K3s, and this benchmark guide is meant to help you evaluate the level of security of the hardened cluster against each control in the CIS Kubernetes Benchmark. It is to be used by K3s operators, security teams, auditors, and decision-makers.

This guide is specific to the **v1.17**, **v1.18**, **v1.19**, **v1.20** and **v1.21** release line of K3s and the **v1.6** release of the CIS Kubernetes Benchmark.

For more information about each control, including detailed descriptions and remediations for failing tests, you can refer to the corresponding section of the CIS Kubernetes Benchmark v1.6. You can download the benchmark, after creating a free account, in [Center for Internet Security (CIS)](https://www.cisecurity.org/benchmark/kubernetes/).

#### Testing controls methodology

Each control in the CIS Kubernetes Benchmark was evaluated against a K3s cluster that was configured according to the accompanying hardening guide.

Where control audits differ from the original CIS benchmark, the audit commands specific to K3s are provided for testing.

These are the possible results for each control:

- **Pass** - The K3s cluster under test passed the audit outlined in the benchmark.
- **Not Applicable** - The control is not applicable to K3s because of how it is designed to operate. The remediation section will explain why this is so.
- **Warn** - The control is manual in the CIS benchmark and it depends on the cluster's use case or some other factor that must be determined by the cluster operator. These controls have been evaluated to ensure K3s does not prevent their implementation, but no further configuration or auditing of the cluster under test has been performed.

This guide makes the assumption that K3s is running as a Systemd unit. Your installation may vary and will require you to adjust the "audit" commands to fit your scenario.

> NOTE: Only `automated` tests (previously called `scored`) are covered in this guide.

### Controls

---

