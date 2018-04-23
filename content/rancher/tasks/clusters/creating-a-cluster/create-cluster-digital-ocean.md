---
layout: single-docs
title: DigitalOcean
weight: 3275
---

# Creating a DigitalOcean Cluster

## Objectives

{{< prereq_cluster >}}

1.	[Create a Droplet](#create-a-droplet)

	Begin by logging into DigitalOcean and provisioning a new droplet.

2. [Create the Cluster](#create-the-digital-ocean-cluster)

	Use your new droplet as a template for your new Kubernetes cluster.

## Create a Droplet

Create a _droplet_, DigitalOcean's name for a virtual machine, using the DigitalOcean website.

Provision the droplet according to our [requirements](../setup/requirements.md).

[DigitalOcean Instructions](https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet)

## Create the DigitalOcean Cluster

Use {{< product >}} to clone your Linux host and configure them as Kubernetes nodes.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Digital Ocean**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}}

6. {{< step_create-cluster_node-pools >}}

	1.	Click **Add Node Template**.

	2.	Paste your DigitalOcean Personal Access Token.

		[DigitalOcean Instructions: How To Generate a Personal Access Token](https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-api-v2#how-to-generate-a-personal-access-token)

	3. Complete the **DigitalOcean Options** form.

		- **Droplet Options** provision your cluster's geographical region and specifications.

	4. {{< step_rancher-template >}}

	5. Click **Create**.

	6. **Optional:** Add additional node pools.
<br/>
7. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
