---
title: Windows and Linux Cluster Feature Parity
weight: 3
---

Windows clusters do not share the same feature support as Linux clusters.

The following chart describes the feature parity between Windows and Linux on Rancher as of Rancher v2.5.8:

**Component** | **Linux** | **Windows**
--- | --- | ---
**Distributions** |  | 
RKE | Supported | Supported
RKE2 | Supported | Tenatively Planned For 2.6.x
K3S | Supported | Not Supported
EKS | Supported | Not Supported
GKE | Supported | Not Supported
AKS | Supported | Not Supported
**Rancher Components** |  | 
Server | Supported | Not Supported
Agent | Supported | Supported
Fleet | Supported | Supported
EKS Operator | Supported | Not Supported
AKS Operator | Not Supported | Not Supported
GKE Operator | Not Supported | Not Supported
Alerting v1 | Supported | Supported
Monitoring v1 | Supported | Supported
Logging v1 | Supported | Supported
Monitoring/Alerting v2 | Supported | Supported In 2.5.8+
Logging v2 | Supported | Supported In 2.5.8+
Istio | Supported | Not Supported
Catalog v1 | Supported | Not Supported
Catalog v2 | Supported | Not Supported
OPA | Supported | Not Supported
Longhorn | Supported | Not Supported
CIS Scans | Supported | Not Supported
Backup/Restore Operator | Supported | Not Supported
**CNI / Add-ons** |  | 
Flannel | Supported | Supported
Canal | Supported | Not Supported
Calico | Supported | Tentatively Planned for 2.6.x
Cilium | Supported | Not Supported
Multus | Supported | Not Supported
Traefik | Supported | Not Supported
NGINX Ingress | Supported | Not Supported

For updated information on feature support, you may visit [rancher/windows](https://github.com/rancher/windows) on GitHub.
