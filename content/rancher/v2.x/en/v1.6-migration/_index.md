---
title: Migrating from Rancher v1.6 to v2.x
weight: 8500
draft: true
---

Rancher 1.6 used Cattle as the base container orchestration platform. Cattle is used extensively by Rancher users to create and manage applications based on Docker containers. With the release of Rancher 2.0, we shifted from Cattle as the base orchestration platform to Kubernetes which brings in a new orchestration technology and specifications. Thus it is a challenge for the Cattle developer and user community to find ways to migrate apps to the new Kubernetes-based 2.0 platform.

In the following blog series, we will explore how various features supported using Cattle in Rancher 1.6 can be mapped to their Kubernetes equivalents in Rancher 2.0.

### Checklist for migration of a 1.6 setup to 2.0  

Rancher 2.0 differs from Rancher 1.6 because it brings in a new orchestration technology, Kubernetes. Currently, there is no straightforward upgrade path available between Rancher 1.6 Cattle based platform to Rancher 2.0.

So as a Rancher 1.6 user who’s interested in moving their setup to 2.0, what steps should you take? Following blog provides a short checklist to help with this transition.

Blog Post: https://rancher.com/blog/2018/2018-08-09-migrate-1dot6-setup-to-2dot0/

### Rancher 1.6 Stack, Service, Environment and the parallels in Rancher 2.0

If you are a Rancher 1.6 user, you are used to launching your applications as Services and organize them under Stacks in an Environment. Rancher 1.6 supports the standard Docker compose and also provides ways to export and import application configuration - the docker-compose.yml and rancher-compose.yml files.

The following article explores how to map Cattle's Stack and service design to the Kubernetes world and also how to migrate a simple application from Rancher 1.6 to 2.0 via UI or using Compose!

Blog Post: https://rancher.com/blog/2018/2018-08-02-journey-from-cattle-to-k8s/

### Exposing your services publicly - port mapping in Rancher 2.0

Port mapping support provided by Cattle helped users to provide access to the applications launched in Rancher 1.6. This article will look into ways to publicly expose your Services in Rancher 2.0. It will explore both UI and CLI methods to transition the port mapping functionality to 2.0.

Blog Post: https://rancher.com/blog/2018/expose-and-monitor-workloads/

### Monitoring your application using healthchecks in Rancher 2.0

Rancher 1.6 provided TCP and HTTP healthchecks via its own healthcheck microservice. This article goes over the healthcheck support and how to configure them in Rancher 2.0.

Blog Post: https://rancher.com/blog/2018/2018-08-22-k8s-monitoring-and-healthchecks/

### Scheduling rules for placement of Service Containers & Global Services in Rancher 2.0

Scheduling the application containers on the available resources is a key orchestration technique. The following blog goes over how to find equivalence in 2.0 for scheduling your containers using host affinity/anti-affinity and other 1.6 scheduling labels. Also it explores how to launch a global service in 2.0.

Blog Post: https://rancher.com/blog/2018/2018-08-29-scheduling-options-in-2-dot-0/

### Service Discovery: Rancher internal DNS

Rancher 1.6 provided service discovery within and across stacks using its own Internal DNS micorservice. Also it supported pointing to external services and creating Aliases. Moving to Rancher 2.0, is it possible to find the same service discovery behavior? The following blog will go over this topic and any solutions needed to achieve equivalent service discovery mechanism in Rancher 2.0.

Blog Post: Coming soon!

### LoadBalancing

How to achieve TCP/HTTP load balancing and configure hostname/path based routing in Rancher 2.0.

Blog Post: Coming soon!

<!--
- [ ] Secrets - How to manage and use secrets in 2.0
- [ ] Storage - How to configure storage with Rancher 2.0 on Kubernetes
- [ ] Rancher metadata - What can be alternative solutions to rancher 1.6 metadata in rancher 2.0
- [ ] Environment management - What is the equivalence in 2.0 to creating and managing 1.6 environments
- [ ] External DNS integration- Alternative ways in 2.0 to integrate with external DNS providers supported by Rancher 1.6
- [ ] Differences in Upgrade procedure for applications deployed on Rancher
-->
