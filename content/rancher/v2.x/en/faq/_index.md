---
title: FAQ
weight: 8000
aliases:
  - /rancher/v2.x/en/about/
---

This FAQ is a work in progress designed to answers the questions our users most frequently ask about Rancher v2.x.

See [Technical FAQ]({{< baseurl >}}/rancher/v2.x/en/faq/technical/), for frequently asked technical questions.

### Kubernetes

#### What does it mean when you say Rancher v2.x is built on Kubernetes?

Rancher v2.x is a complete container management platform built 100% on Kubernetes leveraging its Custom Resource and Controller framework.  All features are written as a CustomResourceDefinition (CRD) which extends the existing Kubernetes API and can leverage native features such as RBAC.

#### Do you plan to implement upstream Kubernetes, or continue to work on your own fork?

We're still going to provide our distribution when you select the default option of having us create your Kubernetes cluster, but it will be very close to upstream.

#### Does this release mean that we need to re-train our support staff in Kubernetes?

Yes.  Rancher will offer the native Kubernetes functionality via `kubectl` but will also offer our own UI dashboard to allow you to deploy Kubernetes workload without having to understand the full complexity of Kubernetes.  However, to fully leverage Kubernetes, we do recommend understanding Kubernetes.  We do plan on improving our UX with subsequent releases to make Kubernetes easier to use.

#### So, wait. Is a Rancher compose going to make a Kubernetes pod? Do we have to learn both now? We usually use the filesystem layer of files, not the UI.

No.  Unfortunately, the differences were enough such that we cannot support Rancher compose anymore in 2.x.  We will be providing both a tool and guides to help with this migration.

### Cattle

### How does Rancher v2.x affect Cattle?

Cattle will not supported in v2.x as Rancher has been re-architected to be based on Kubernetes. You can, however, expect majority of Cattle features you use will exist and function similarly on Kubernetes. We will develop migration tools in Rancher v2.1 to help you transform your existing Rancher Compose files into Kubernetes YAML files.

#### Can I migrate existing Cattle workloads into Kubernetes?

Yes. In the upcoming Rancher v2.1 release we will provide a tool to help translate existing Cattle workloads in Compose format to Kubernetes YAML format.  You will then be able to deploy those workloads on the v2.x platform.

### Environments & Clusters

#### Can I still create templates for environments and clusters?

Starting with 2.0, the concept of an environment has now been changed to a Kubernetes cluster as going forward, only the Kubernetes orchestration engine is supported.
Kubernetes RKE Templates is on our roadmap for 2.x. Please refer to our Release Notes and documentation for all the features that we currently support.

#### Can you still add an existing host to an environment? (i.e. not provisioned directly from Rancher)

Yes. We still provide you with the same way of executing our Rancher agents directly on hosts.

### Upgrading/Migrating

#### How would the migration from v1.x to v2.x work?

Due to the technical difficulty in transforming a Docker container into a pod running Kubernetes, upgrading will require users to "replay" those workloads from v1.x into new v2.x environments. We plan to ship with a tool in v2.1 to translate existing Rancher Compose files into Kubernetes YAML files.  You will then be able to deploy those workloads on the v2.x platform.

#### Is it possible to upgrade from Rancher v1.x to v2.x without any disruption to Cattle and Kubernetes clusters?

At this time, we are still exploring this scenario and taking feedback. We anticipate that you will need to launch a new Rancher instance and then relaunch on v2.x. Once you've moved to v2.x, upgrades will be in place, as they are in v1.6.

#### Can I import OpenShift Kubernetes clusters into v2.x?

Our goal is to run any upstream Kubernetes clusters. Therefore, Rancher v2.x should work with OpenShift, but we haven't tested it yet.

### Support

#### What about Rancher v1.6? Are you planning some long-term support releases?

That is definitely the focus of the v1.6 stream. We're continuing to improve that release, fix bugs, and maintain it for the next 12 months at a minimum. We will extend that time period, if necessary, depending on how quickly users move to v2.1.

#### Does Rancher v2.x support Docker Swarm and Mesos as environment types?

When creating an environment in Rancher v2.x, Swarm and Mesos will no longer be standard options you can select. However, both Swarm and Mesos will continue to be available as Catalog applications you can deploy. It was a tough decision to make but, in the end, it came down to adoption. For example, out of more than 15,000 clusters, only about 200 or so are running Swarm.

#### Is it possible to manage Azure Kubernetes Services with Rancher v2.x?
Yes.

#### What about Windows support?

With [Rancher 2.3.0 Preview 1](https://forums.rancher.com/t/rancher-release-v2-3-0-alpha3-preview-of-windows-containers/14260), we have enabled the support for Windows Server 1809 containers. The technology is in preview mode but we intend to make it GA later this year. Please refer to our documentation and Release Notes to get the latest information on this feature.

#### Are you planning on supporting Istio in Rancher v2.x?

[Rancher 2.3.0 Preview 2](https://forums.rancher.com/t/rancher-release-v2-3-0-alpha5-preview-of-istio/14585/2) has support for Istio. Please refer to our documentation and Release Notes to get the latest information on this feature.
Furthermore, Istio is implemented in our micro-PaaS "Rio", which works on Rancher 2.x along wtih any CNCF compliant Kubernetes cluster. You can read more about it [here](https://rio.io/).

#### Will Rancher v2.x support Hashicorp's Vault for storing secrets?

Secrets management is on our roadmap but we haven't assigned it to a specific release yet. 

#### Does Rancher v2.x support RKT containers as well?

At this time, we only support Docker.

#### Will Rancher v2.x support Calico, Contiv, Contrail, Flannel, Weave net, etc., for embedded and imported Kubernetes?

We will provide the ability to use Calico, Canal, and Flannel, but always refer to the [Rancher Support Matrix](https://rancher.com/support-maintenance-terms/) on what is officially supported.

#### Are you planning on supporting Traefik for existing setups?

We don't currently plan on providing embedded Traefik support, but we're still exploring load-balancing approaches.

### General

#### Can we still add our own infrastructure services, which had a separate view/filter in 1.6.x?

Yes. We plan to eventually enhance this feature so you can manage Kubernetes storage, networking, and its vast ecosystem of add-ons.

#### Are you going to integrate Longhorn?

Yes. Longhorn was on a bit of a hiatus while we were working on v2.0. We plan to re-engage on the project once v2.0 reaches GA (general availability).

#### Are there changes to default roles available now or going forward? Will the Kubernetes alignment impact plans for roles/RBAC?

The default roles will be expanded to accommodate the new Rancher 2.x features, and will also take advantage of the Kubernetes RBAC (Role-Based Access Control) capabilities to give you more flexibility.

#### Will there be any functions like network policies to separate a front-end container from a back-end container through some kind of firewall in v2.x?

Yes. You can do so by leveraging Kubernetes' network policies.

#### What about the CLI? Will that work the same way with the same features?

Yes. Definitely.

#### If we use Kubernetes native YAML files for creating resources, should we expect that to work as expected, or do we need to use Rancher/Docker compose files to deploy infrastructure?

Absolutely.
