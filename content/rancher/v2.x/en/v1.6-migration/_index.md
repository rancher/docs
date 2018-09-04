---
title: Migrating from Rancher v1.6 to v2.x
weight: 10000
draft: true
---

In Rancher 1.6, Cattle was the default container-orchestration platform. Rancher users preferred Cattle for creating and managing applications based on Docker containers. With the release of Rancher 2.0, Kubernetes replaces Cattle as the default orchestration platform, bringing new technology and specifications. Thus, Cattle users who want to upgrade to Rancher 2.0 must find ways to migrate their apps from 1.6 to 2.0.

In this blog series, we explore how you can map features from Cattle in Rancher 1.6 to Kubernetes in Rancher 2.0.

### Checklist for Migration from a 1.6 Setup to 2.0  

Rancher 2.0 differs from Rancher 1.6 because it brings in a new orchestration technology, Kubernetes. Currently, there is no straightforward upgrade path available between Rancher 1.6 and Rancher 2.0.

As a Rancher 1.6 user who’s interested in moving your setup to 2.0, what steps should you take? The following blog provides a short checklist to help with this transition.

Blog Post: https://rancher.com/blog/2018/2018-08-09-migrate-1dot6-setup-to-2dot0/

### Rancher 1.6 Stack, Service, Environment and the Parallels in Rancher 2.0

In Rancher 1.6, you launch applications as _services_, and you organize them under _stacks_ in an _environment_. Rancher 1.6 supports the Docker compose standard and provides import/export for application configurations using the following file types: `docker-compose.yml` and `rancher-compose.yml`.

The following article explores how to map Cattle's stack and service design to Kubernetes. It also demonstrates how to migrate a simple application from Rancher 1.6 to 2.0 using either the Rancher UI or Docker Compose.

Blog Post: https://rancher.com/blog/2018/2018-08-02-journey-from-cattle-to-k8s/

### Exposing Your Services Publicly—Port Mapping in Rancher 2.0

In Rancher 1.6, you could provide external access to your applications using port mapping. This article explores how to publicly expose your services in Rancher 2.0. It explores both UI and CLI methods to transition the port mapping functionality to 2.0.

Blog Post: https://rancher.com/blog/2018/expose-and-monitor-workloads/

### Monitoring Your Application using Healthchecks in Rancher 2.0

Rancher 1.6 provided TCP and HTTP healthchecks using its own healthcheck microservice. This article overviews healthcheck support and how to configure it in Rancher 2.0.

Blog Post: https://rancher.com/blog/2018/2018-08-22-k8s-monitoring-and-healthchecks/

### Scheduling Rules for Placement of Service Containers & Global Services in Rancher 2.0

Scheduling application containers on available resources is a key container orchestration technique. The following blog reviews how to schedule containers in Rancher 2.0 for those familiar with 1.6 scheduling labels (such as affinity and anti-affinity). It also explores how to launch a global service in 2.0.

Blog Post: Coming soon!

### Service Discovery: Rancher Internal DNS

Rancher 1.6 provides service discovery within and across stacks using its own internal DNS microservice. It also supports pointing to external services and creating aliases. Moving to Rancher 2.0, you can replicate this same service discovery behavior. The following blog reviews this topic and the solutions needed to achieve service discovery parity in Rancher 2.0.

Blog Post: Coming soon!

### Load Balancing

How to achieve TCP/HTTP load balancing and configure hostname/path-based routing in Rancher 2.0.

Blog Post: Coming soon!
