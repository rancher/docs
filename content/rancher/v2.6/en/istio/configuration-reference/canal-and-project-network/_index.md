---
title: Additional Steps for Project Network Isolation
weight: 4
aliases:
  - /rancher/v2.5/en/istio/v2.5/configuration-reference/canal-and-project-network
---

In clusters where:

- You are using the Canal network plugin with Rancher before v2.5.8, or you are using Rancher v2.5.8+ with an any RKE network plug-in that supports the enforcement of Kubernetes network policies, such as Canal or the Cisco ACI plugin
- The Project Network Isolation option is enabled
- You install the Istio Ingress module

The Istio Ingress Gateway pod won't be able to redirect ingress traffic to the workloads by default. This is because all the namespaces will be inaccessible from the namespace where Istio is installed. You have two options.

The first option is to add a new Network Policy in each of the namespaces where you intend to have ingress controlled by Istio. Your policy should include the following lines:

```
- podSelector:
    matchLabels:
      app: istio-ingressgateway
```

The second option is to move the `istio-system` namespace to the `system` project, which by default is excluded from the network isolation.