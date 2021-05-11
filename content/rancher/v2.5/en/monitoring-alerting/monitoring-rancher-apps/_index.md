---
title: Monitoring Rancher Apps
weight: 11
---

CIS application has a flag that lets you deploy a service monitor in it. As a general practice we expose charts for prometheus metrics to have that service monitor definition. The moment it’s deployed into the cluster, the prometheus scrape configuration will automatically be updated to reflect the service monitors that it has access to.

In logging v2 they will deploy a service monitor and we will just absorb it.


question: someone found out from looking through rancher helm charts that some of them already have a service monitor defined that you might have to turn on, and if you do, those metrics are prepackaged for Prometheus in the right format. 

It's a common pattern to have service monitor packaged inside. That’s how we do it for cis scans.