---
title: Adding Ingresses to Your Project
description: Ingresses can be added for workloads to provide load balancing, SSL termination and host/path-based routing. Learn how to add Rancher ingress to your project
weight: 3042
aliases:
  - /rancher/v2.6/en/tasks/workloads/add-ingress/
  - /rancher/v2.6/en/k8s-in-rancher/load-balancers-and-ingress/ingress  
---

Ingress can be added for workloads to provide load balancing, SSL termination and host/path based routing. When using ingresses in a project, you can program the ingress hostname to an external DNS by setting up a Global DNS entry.

1. From the **Global** view, open the project that you want to add ingress to.
1. Click **Resources** in the main navigation bar. Click the **Load Balancing** tab. Then click **Add Ingress**.
1. Enter a **Name** for the ingress.
1. Select an existing **Namespace** from the drop-down list. Alternatively, you can create a new namespace on the fly by clicking **Add to a new namespace**.
1. Create ingress forwarding **Rules**. For help configuring the rules, refer to [this section.](#ingress-rule-configuration) If any of your ingress rules handle requests for encrypted ports, add a certificate to encrypt/decrypt communications.
1. **Optional:** click **Add Rule** to create additional ingress rules. For example, after you create ingress rules to direct requests for your hostname, you'll likely want to create a default backend to handle 404s. 

**Result:** Your ingress is added to the project. The ingress begins enforcing your ingress rules.

