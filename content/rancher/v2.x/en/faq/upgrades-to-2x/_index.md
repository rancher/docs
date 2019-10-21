---
title: Questions about Upgrading to Rancher v2.x
weight: 1
---

This page contains frequently asked questions about the changes between Rancher v1.x and v2.x, and how to upgrade from Rancher v1.x to v2.x.

# Kubernetes

**What does it mean when you say Rancher v2.x is built on Kubernetes?**

Rancher v2.x is a complete container management platform built 100% on Kubernetes leveraging its Custom Resource and Controller framework.  All features are written as a CustomResourceDefinition (CRD) which extends the existing Kubernetes API and can leverage native features such as RBAC.

<br>

**Do you plan to implement upstream Kubernetes, or continue to work on your own fork?**

We're still going to provide our distribution when you select the default option of having us create your Kubernetes cluster, but it will be very close to upstream.

<br>

**Does this release mean that we need to re-train our support staff in Kubernetes?**

Yes.  Rancher will offer the native Kubernetes functionality via `kubectl` but will also offer our own UI dashboard to allow you to deploy Kubernetes workload without having to understand the full complexity of Kubernetes.  However, to fully leverage Kubernetes, we do recommend understanding Kubernetes.  We do plan on improving our UX with subsequent releases to make Kubernetes easier to use.

<br>

**Is a Rancher compose going to make a Kubernetes pod? Do we have to learn both now? We usually use the filesystem layer of files, not the UI.**

No.  Unfortunately, the differences were enough such that we cannot support Rancher compose anymore in 2.x.  We will be providing both a tool and guides to help with this migration.

<br>

**If we use Kubernetes native YAML files for creating resources, should we expect that to work as expected, or do we need to use Rancher/Docker compose files to deploy infrastructure?**

Absolutely.

# Cattle

**How does Rancher v2.x affect Cattle?**

Cattle will not supported in v2.x as Rancher has been re-architected to be based on Kubernetes. You can, however, expect majority of Cattle features you use will exist and function similarly on Kubernetes. We will develop migration tools in Rancher v2.1 to help you transform your existing Rancher Compose files into Kubernetes YAML files.

<br>

**Can I migrate existing Cattle workloads into Kubernetes?**

Yes. In the upcoming Rancher v2.1 release we will provide a tool to help translate existing Cattle workloads in Compose format to Kubernetes YAML format.  You will then be able to deploy those workloads on the v2.x platform.

# Feature Changes

**Can we still add our own infrastructure services, which had a separate view/filter in 1.6.x?**

Yes. You can manage Kubernetes storage, networking, and its vast ecosystem of add-ons.

<br>

**Are there changes to default roles available now or going forward? Will the Kubernetes alignment impact plans for roles/RBAC?**

The default roles will be expanded to accommodate the new Rancher 2.x features, and will also take advantage of the Kubernetes RBAC (Role-Based Access Control) capabilities to give you more flexibility.

<br>

**Will there be any functions like network policies to separate a front-end container from a back-end container through some kind of firewall in v2.x?**

Yes. You can do so by leveraging Kubernetes' network policies.

<br>

**What about the CLI? Will that work the same way with the same features?**

Yes. Definitely.

# Environments & Clusters

**Can I still create templates for environments and clusters?**

Starting with 2.0, the concept of an environment has now been changed to a Kubernetes cluster as going forward, only the Kubernetes orchestration engine is supported.

Kubernetes RKE Templates is on our roadmap for 2.x. Please refer to our Release Notes and documentation for all the features that we currently support.

<br>

**Can you still add an existing host to an environment? (i.e. not provisioned directly from Rancher)**

Yes. We still provide you with the same way of executing our Rancher agents directly on hosts.

# Upgrading/Migrating

**How would the migration from v1.x to v2.x work?**

Due to the technical difficulty in transforming a Docker container into a pod running Kubernetes, upgrading will require users to "replay" those workloads from v1.x into new v2.x environments. We plan to ship with a tool in v2.1 to translate existing Rancher Compose files into Kubernetes YAML files.  You will then be able to deploy those workloads on the v2.x platform.

<br>

**Is it possible to upgrade from Rancher v1.x to v2.x without any disruption to Cattle and Kubernetes clusters?**

At this time, we are still exploring this scenario and taking feedback. We anticipate that you will need to launch a new Rancher instance and then relaunch on v2.x. Once you've moved to v2.x, upgrades will be in place, as they are in v1.6.

# Support

**Are you planning some long-term support releases for Rancher v1.6?**

That is definitely the focus of the v1.6 stream. We're continuing to improve that release, fix bugs, and maintain it. New releases of the v1.6 stream are announced in the [Rancher forums.](https://forums.rancher.com/c/announcements) The Rancher wiki contains the [v1.6 release notes.](https://github.com/rancher/rancher/wiki/Rancher-1.6)