---
title: Adding Ingresses
description: Ingresses can be added for workloads to provide load balancing, SSL termination and host/path-based routing. Learn how to add Rancher ingress
weight: 3042
---

Ingresses can be added for workloads to provide load balancing, SSL termination and host/path based routing. When using ingresses in a project, you can program the ingress hostname to an external DNS by setting up a Global DNS entry.

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster that you want to add an ingress to and click **Explore**.
1. Click **Service Discovery > Ingresses**.
1. Click **Create**.
1. Select an existing **Namespace** from the drop-down list.
1. Enter a **Name** for the ingress.
1. Create ingress forwarding **Rules**. For help configuring the rules, refer to [this section.](#ingress-rule-configuration) If any of your ingress rules handle requests for encrypted ports, add a certificate to encrypt/decrypt communications.
1. **Optional:** click **Add Rule** to create additional ingress rules. For example, after you create ingress rules to direct requests for your hostname, you'll likely want to create a default backend to handle 404s. 
1. Click **Create** at the bottom right.

**Result:** Your ingress is added to the project. The ingress begins enforcing your ingress rules.

