---
title: 1—Get Started
weight: 25
---
Get started with your migration to Rancher 2.0 by installing Rancher and configuring your new Rancher environment.

## Outline


<!-- TOC -->

- [A—Install Rancher 2.0](#ainstall-rancher-20)
- [B—Configure Authentication](#bconfigure-authentication)
- [C—Provision a Cluster and Project](#cprovision-a-cluster-and-project)
- [D—Create Namespaces](#dcreate-namespaces)

<!-- /TOC -->

## A—Install Rancher 2.0

The first step in migrating from 1.6 to 2.0 is to install the Rancher 2.0 Server. Due the architecture changes between 1.6 and 2.0, there is no direct path for upgrade. You'll have to install Rancher 2.0 independently and then migrate your 1.6 content to 2.0.

New for Rancher 2.0, all communication to Rancher Server is encrypted. The procedures below will instruct you on how to create and install these certificates.

Before installing Rancher 2.0, you must provision one host or more to function as your Rancher Server(s). You can find the requirements for these hosts in [Server Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements/).

After provisioning your node(s), install Rancher:

- [Single Node Install]({{< baseurl >}}/rancher/v2.x/en/installation/single-node)

    For development environments, we recommend a single node install. This installation procedure deploys a single Rancher container to your host.

- [High Availability Configuration]({{< baseurl >}}/rancher/v2.x/en/installation/ha/)

    For production environments where your user base requires consistent access to your cluster, we recommend installing Rancher in a high availability (HA) configuration. This installation procedure provisions a three-node cluster using a Helm chart. Rancher is installed on each node.

    >**Important Difference:** Although you could install Rancher 1.6 in an HA configuration using an external database and a Docker command on each node, Rancher 2.0 in an HA configuration requires an existing Kubernetes cluster. Review [High Availability Install](https://rancher.com/docs/rancher/v2.x/en/installation/ha/) for full requirements.

## B—Configure Authentication

After Rancher Server is installed, we recommend configuring external authentication so that users can log in using their single sign-on.

<figcaption>External authentication providers communicating with Rancher</figcaption>

![Authentication Providers]({{< baseurl >}}/img/rancher/auth-providers.png)

The following table lists each external service you can use to authenticate with Rancher 2.0. Click through each link for instructions on how to configure Rancher for external authentication.

<figcaption>Supported authentication providers</figcaption>

| Rancher 2.0 Auth Providers  | Rancher 1.6 Auth Providers |
| --------------------------- | -------------------------- |
| [Active Directory][1]       | Active Directory           |
| [Azure AD][2]               | Azure AD                   |
| [GitHub][3]                 | GitHub                     |
| [OpenLDAP][4]               | OpenLDAP                   |
| [Ping Identity][5] 🆕       | Shibboleth                 |
| [Microsoft ADFS][6] 🆕      |                            |
| [FreeIPA][7] 🆕             |                            |

[1]:{{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/ad
[2]:{{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/azure-ad
[3]:{{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/github
[4]:{{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/openldap
[5]:{{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/ping-federate
[6]:{{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/microsoft-adfs
[7]:{{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/freeipa

### Authentication Note: Local Users

Although we recommend using an external authentication provider, Rancher 1.6 and 2.0 both offer support for users local to Rancher. However, these users cannot be migrated from Rancher 1.6 to 2.0. If you used local users for Rancher 1.6 and want to continue that practice for 2.0, you'll need to [manually recreate these user accounts]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/) and assign them access rights.

### Authentication Note: SAML Authentication Providers

In Rancher 1.6, we encouraged our SAML users to use Shibboleth, as it was the only SAML authentication option we offered. However, to better support their minor differences, we've added more fully tested SAML providers for 2.0: Ping Identity, Microsoft ADFS, and FreeIPA.

## C—Provision a Cluster and Project

Begin work in Rancher by provisioning a new Kubernetes cluster. This cluster will host your application deployments.

<figcaption>Cluster vocabulary cheat sheet</figcaption>


| Rancher 2.0        | Rancher 1.6   |
| ------------------ | ------------- |
| cluster  + project | environment   |

<br/>

In Rancher 1.6, compute nodes were added to an _environment_. Rancher 2.0 eschews the term _environment_ for _cluster_, as Kubernetes uses this term for a team of computers instead of _environment_.

Rancher 2.0 lets you launch a Kubernetes cluster anywhere. Host your cluster using:

- A hosted Kubernetes provider (Hosted Providers)
- An IaaS provider, as launched by Rancher Kubernetes Engine (IaaS)
- Any other computer, be it a baremetal server, a virtual machine, or a cloud host on a less popular IaaS provider (Custom).

The table below links to step-by-step instruction on how to provision your cluster.

<figcaption>Links to step-by-step instruction</figcaption>

| Hosted Providers  | IaaS              | Custom            |
| ----------------- | ----------------- | ----------------- |
| [GKE][1]          | [Amazon EC2][4]   | [Custom Nodes][8] |
| [AKS][2]          | [DigitalOcean][5] |                   |
| [EKS][3]          | [Azure][6]        |                   |
|                   | [vSphere][7]      |                   |

[1]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/gke
[2]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/aks
[3]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/eks
[4]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/ec2/
[5]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean/
[6]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/azure/
[7]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/vsphere/
[8]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/

Additionally, Rancher 2.0 introduces [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/), which are objects that divide clusters into different application groups. This model of clusters and projects allow for multi-tenancy because hosts are owned by the cluster, and the cluster can be further divided into multiple projects where users can manage their apps.

When you create a cluster, two projects are automatically created:

- The `system` project, which includes namespaces for each of your Kubernetes components.
- The `default` project, which is a hello-world project for your cluster.

However, for production environments, we recommend [creating your own project]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#creating-projects) and giving it a descriptive name.

After provisioning a new cluster and project, you can authorize your users to access and use project resources. Similarly to Rancher 1.6 environments, Rancher 2.0 allows you to [assign users to projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/). By assigning users to projects, you can limit what resources a user can access.

## D—Create Namespaces

After adding a cluster and a project, the next step is to define any [namespaces]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#namespaces) you'll use to group your application workloads.

In Rancher 1.6, _stacks_ were used to group together the services that belong to your application. In 2.0, you need to [create namespaces]({{< baseurl >}}rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#creating-namespaces) for the same purpose. When you create a project, a `default` namespace is added to the project.

If you don't explicitly define which namespace a workload is deployed to, it's deployed to the `default` namespace.

Just like 1.6, Rancher 2.0 supports service discovery within and across namespaces.

<figcaption>Namespace vocabulary cheat sheet</figcaption>

| Rancher 2.0  | Rancher 1.6    |
| ------------ | -------------- |
| namespace    | stack          |


### [Next: Migrate Applications]({{< baseurl >}}/rancher/v2.x/en/v1.6-migration/migrate-apps/)