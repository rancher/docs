---
title: FAQ
weight: 5000
---

This FAQ is a work in progress designed to answers the questions our users most frequently ask about Rancher v2.0.

### Kubernetes

#### What does it mean when you say Rancher v2.0 is built on Kubernetes?

Rancher v2.0 is a complete container management platform built on Kubernetes, which means that:

*	The Rancher-Kubernetes distribution powers the embedded Kubernetes master and enables easy setup and operations of Kubernetes clusters.
*	Rancher imports existing Kubernetes clusters built using other tools, like kops, or operated by cloud providers, like GKE.
*	Rancher manages Kubernetes clusters across any infrastructure, including public cloud, private cloud, virtualization clusters, and bare metal servers.
*	Rancher enables multi-cluster management across both embedded clusters and imported clusters.
*	In addition to the native Kubernetes UX via `kubectl` or dashboard, Rancher also offers a compelling user experience built on Kubernetes.

#### Do you plan to implement upstream Kubernetes, or continue to work on your own fork?

 We're still going to provide our distribution when you select the default option of having us manage your Kubernetes cluster, but it will be very close to upstream. We're adding a few enhancements, like integration with a MySQL database and making the Kubernetes master multi-tenant to support multiple clusters.

#### Does this release mean that we need to re-train our support staff in Kubernetes?

No. You don't need to learn Kubernetes, but you'll have it as an option if you want to leverage any integrations that work directly with the Kubernetes API. However, nothing from a UI or operations perspective is changing with the move to Kubernetes. Operations remain the same.

#### So, wait. Is a Rancher compose going to make a Kubernetes pod? Do we have to learn both now? We usually use the filesystem layer of files, not the UI.

You do not need to learn both, but you'll have access to both and can easily use either depending on what makes most sense.

### Cattle

### How does Rancher v2.0 affect Cattle?

Cattle will not supported in v2.0 as Rancher has been re-architected to be based on Kubernetes. You can, however, expect majority of Cattle features you use will exist and function similarly on Kubernetes. We will develop migration tools in Rancher v2.1 to help you transform your existing Rancher Compose files into Kubernetes yaml files.

#### Can I migrate existing Cattle workloads into Kubernetes?

Yes. In the upcoming Rancher v2.1 release we will provide a tool to help translate existing Cattle workloads in Compose format to kubernetes yaml format.  You will then be able to deploy those workloads on the v2.0 platform.

### Environments & Clusters

#### Can I still create templates for environments and clusters?

No.  Starting with 2.0, the concept of an environment has now been changed to a Kubernetes cluster as going forward, only the Kubernetes orchestration engine is supported.

#### Can you still add an existing host to an environment? (i.e. not provisioned directly from Rancher)

Yes. We still provide you with the same way of executing our Rancher agents directly on hosts.

#### If I have catalog items set to use managed network, can I deploy them in an imported Kubernetes cluster, or do they have to run on the Rancher-Kubernetes distribution?

Our goal is to have Catalog items run on any Kubernetes clusters, embedded or imported.

### Upgrading/Migrating

#### How would the migration from v1.x to v2.0 work?

Due to the technical difficulty in transforming a Docker container into a pod running Kubernetes, upgrading will require users to “replay” those workloads from v1.x into new v2.0 environments. We plan to ship with a tool in v2.1 to translate existing Rancher Compose files into Kubernetes yaml files.  You will then be able to deploy those workloads on the v2.0 platform.

#### Will I be able to export my environments from v1.0 and import them into v2.0?

Yes. We will make it easy to export environments from v1.0 to v2.0. However, we don't recommend moving yet! Rancher v1.6 has become very stable through thousands of deployments, so continue using that until v2.0 is ready.

#### Is it possible to upgrade from Rancher v1.0 to v2.0 without any disruption to Cattle and Kubernetes clusters?

At this time, we are still exploring this scenario and taking feedback. We anticipate that you will need to launch a new Rancher instance and then relaunch on v2.0. Once you've moved to v2.0, upgrades will be in place, as they are in v1.6.

#### Can I import OpenShift Kubernetes clusters into v2.0?

Our goal is to run any upstream Kubernetes clusters. Therefore, Rancher v2.0 should work with OpenShift, but we haven't tested it yet.

### Support

#### What about Rancher v1.6? Are you planning some long-term support releases?

That is definitely the focus of the v1.6 stream. We're continuing to improve that release, fix bugs, and maintain it for the next 12 months at a minimum. We will extend that time period, if necessary, depending on how quickly users move to v2.0.

#### Does Rancher v2.0 support Docker Swarm and Mesos as environment types?

When creating an environment in Rancher v2.0, Swarm and Mesos will no longer be standard options you can select. However, both Swarm and Mesos will continue to be available as Catalog applications you can deploy. It was a tough decision to make but, in the end, it came down to adoption. For example, out of more than 15,000 clusters, only about 200 or so are running Swarm.

#### Is it possible to manage Azure Container Services with Rancher v2.0?
Yes.

#### What about Windows support?

We plan to provide Windows support for v2.0 based on Microsoft’s new approach to providing an overlay network using Kubernetes and CNI. This new approach matches well with what we are doing in v2.0 and, once that is complete, you will be able to leverage the same Rancher UX, or Kubernetes UX, but with Windows. We are in the middle of discussing how we can make this happen with Microsoft, and we will provide more information before the end of this year.

#### Are you planning on supporting Istio in Rancher v2.0?

We like Istio, and it's something we're looking at potentially integrating and supporting.

#### Does Rancher v2.0 support Hashicorp's Vault for storing secrets?

Yes. We currently support Hashicorp's Vault in v1.6 and plan on supporting it in v2.0 as well.

#### Will v2.0 continue to support different planes, such as DATA, ORCHESTRATION, and COMPUTE?

Yes. We will also allow you to run Kubernetes as a standalone cluster launched from Rancher, but that capability isn't in the technical preview yet.

#### Does Rancher v2.0 support RKT containers as well?

At this time, we only support Docker. We are looking into containerD as a container runtime in the near future.

#### Will Rancher v2.0 support Calico, Contiv, Contrail, Flannel, Weave net, etc., for embedded and imported Kubernetes?

This is something we are still investigating. We hope they will work with Rancher v2.0 with both options. It is unlikely that we will be able to support all networking options as part of Rancher's support contract.

#### Are you planning on supporting Traefik for existing setups?

We don't currently plan on providing embedded Traefik support, but we're still exploring load-balancing approaches.

### General

#### When will Rancher v2.0 be ready for use in production?

We anticipate Rancher v2.0 will be ready for production use during the second quarter of 2018. Until then, please continue to use v1.6 in production.

#### Can I export all of the configuration performed in the UI to config files, to serve as a source for (re)building "infrastructure-as-code"?

Yes. As in v1.x, all configuration performed in the UI always creates a compose file that you can export for reuse.

#### Can we still add our own infrastructure services, which had a separate view/filter in 1.6.x?

Yes. We plan to eventually enhance this feature so you can manage Kubernetes storage, networking, and its vast ecosystem of add-ons.

#### Can you share some thoughts on how you plan to integrate the CI/CD process into the mix?

Rancher will add a CI/CD pipeline soon after v2.0 launches. We plan to showcase it at our monthly Meetup in November.

#### Will the networking options in Rancher v2.0 change?

Yes. With 2.0, all RKE clusters will have the option to use flannel or Calico.

#### Are you going to integrate Longhorn?

Yes. Longhorn was on a bit of a hiatus while we were working on v2.0. We plan to re-engage on the project once v2.0 reaches GA (general availability).

#### Will the API reflect differences as well?

Yes. Everything in the Rancher UI is always built on the API.

#### Are there changes to default roles available now or going forward? Will the Kubernetes alignment impact plans for roles/RBAC?

The default roles remain the same in v2.0, but we now take advantage of the Kubernetes RBAC (Role-Based Access Control) capabilities to give you more flexibility.

#### Will the Rancher-NFS driver become available for v2.0?

Yes. That will be part of the Volumes work coming soon!

#### Will there be any functions like network policies to separate a front-end contrainer from a back-end container through some kind of firewall in v2.0?

Yes. You can do so by leveraging Kubernetes' network policies.

#### What about the CLI? Will that work the same way with the same features?

Yes. Definitely.

#### Will Rancher compose still work with v2.0?

Rancher compose will be updated to support 2.0 features.  As part of the upgrade process, our intention is to provide a way to convert Compose 1.0 to 2.0 format.

#### If we use Kubernetes native YAML files for creating resources, should we expect that to work as expected, or do we need to use Rancher/Docker compose files to deploy infrastructure?

Absolutely. You'll have both options.
