---
title: Creating a GKE Cluster
shortTitle: Google Kubernetes Engine
weight: 2105
aliases:
  - /rancher/v2.5/en/tasks/clusters/creating-a-cluster/create-cluster-gke/
---

{{% tabs %}}
{{% tab "Rancher v2.5.8+" %}}

# Prerequisites

Some setup in Google Kubernetes Engine is required.

### Service Account Token

Create a service account using [Google Kubernetes Engine](https://console.cloud.google.com/projectselector/iam-admin/serviceaccounts). GKE uses this account to operate your cluster. Creating this account also generates a private key used for authentication.

The service account requires the following roles:

- **Compute Viewer:** `roles/compute.viewer`
- **Project Viewer:** `roles/viewer`
- **Kubernetes Engine Admin:** `roles/container.admin` 
- **Service Account User:** `roles/iam.serviceAccountUser`

[Google Documentation: Creating and Enabling Service Accounts](https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances)

For help obtaining a private key for your service account, refer to the Google cloud documentation [here.](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys) You will need to save the key in JSON format.

### Google Project ID

Your cluster will need to be part of a Google Project.

To create a new project, refer to the Google cloud documentation [here.](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project)

To get the project ID of an existing project, refer to the Google cloud documentation [here.](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects)

>**Note**
>Deploying to GKE will incur charges.

# 1. Create a Cloud Credential

1. In the upper right corner, click the user profile dropdown menu and click **Cloud Credentials.**
1. Click **Add Cloud Credential.**
1. Enter a name for your Google cloud credentials.
1. In the **Cloud Credential Type** field, select **Google.**
1. In the **Service Account** text box, paste your service account private key JSON, or upload the JSON file.
1. Click **Create.**

**Result:** You have created credentials that Rancher will use to provision the new GKE cluster.

# 2. Create the GKE Cluster
Use Rancher to set up and configure your Kubernetes cluster.

1. From the **Clusters** page, click **Add Cluster**.
1. Under **With a hosted Kubernetes provider,** click **Google GKE**.
1. Enter a **Cluster Name**.
1. Optional: Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. Optional: Add Kubernetes [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) or [annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) to the cluster.
1. Enter your Google project ID and your Google cloud credentials.
1. Fill out the rest of the form. For help, refer to the [GKE cluster configuration reference.](./config-reference)
1. Click **Create.**

**Result:** You have successfully deployed a GKE cluster.

Your cluster is created and assigned a state of **Provisioning.** Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active.**

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces

## Private Clusters

In GKE, [private clusters](https://cloud.google.com/kubernetes-engine/docs/concepts/private-cluster-concept) are clusters whose nodes are isolated from inbound and outbound traffic by assigning them internal IP addresses only. Private clusters in GKE have the option of exposing the control plane endpoint as a publicly accessible address or as a private address. This is different from other Kubernetes providers, which may refer to clusters with private control plane endpoints as "private clusters" but still allow traffic to and from nodes. You may want to create a cluster with private nodes, with or without a public control plane endpoint, depending on your organization's networking and security requirements. A GKE cluster hosted in Rancher can use isolated nodes by selecting "Private Cluster" in the Cluster Options (under "Show advanced options"). The control plane endpoint can optionally be made private by selecting "Enable Private Endpoint".

### Private Nodes

Because the nodes in a private cluster only have internal IP addresses, they will not be able to install the cluster agent and Rancher will not be able to fully manage the cluster. This can be overcome in a few ways.

#### Cloud NAT

>**Note**
>Cloud NAT will [incur charges](https://cloud.google.com/nat/pricing).

If restricting outgoing internet access is not a concern for your organization, use Google's [Cloud NAT](https://cloud.google.com/nat/docs/using-nat) service to allow nodes in the private network to access the internet, allowing them to download the required images from Dockerhub. This is the simplest solution.

#### Private registry

>**Note**
>This scenario is not officially supported, but is described for cases in which using the Cloud NAT service is not sufficient.

If restricting both incoming and outgoing traffic to nodes is a requirement, follow the air-gapped installation instructions to set up a private container image [registry](https://rancher.com/docs/rancher/v2.x/en/installation/other-installation-methods/air-gap/) on the VPC where the cluster is going to be, allowing the cluster nodes to access and download the images they need to run the cluster agent.

### Private Control Plane Endpoint

If the cluster has a public endpoint exposed, Rancher will be able to reach the cluster, and no additional steps need to be taken. However, if the cluster has no public endpoint, then considerations must be made to ensure Rancher can access the cluster.

#### Cloud NAT

>**Note**
>Cloud NAT will [incur charges](https://cloud.google.com/nat/pricing).

As above, if restricting outgoing internet access to the nodes is not a concern, then Google's [Cloud NAT](https://cloud.google.com/nat/docs/using-nat) service can be used to allow the nodes to access the internet. While the cluster is provisioning, Rancher will provide a registration command to run on the cluster. Download the [kubeconfig](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl) for the new cluster and run the provided kubectl command on the cluster. Gaining access
to the cluster in order to run this command can be done by creating a temporary node or using an existing node in the VPC, or by logging on to or creating an SSH tunnel through one of the cluster nodes.

#### Direct access

If the Rancher server is run on the same VPC as the cluster's control plane, it will have direct access to the control plane's private endpoint. The cluster nodes will need to have access to a private registry to download images as described above.

You can also use services from Google such as [Cloud VPN](https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview) or [Cloud Interconnect VLAN](https://cloud.google.com/network-connectivity/docs/interconnect) to facilitate connectivity between your organization's network and your Google VPC.

## Updating Kubernetes version

The Kubernetes version of a cluster can be upgraded to any version available in the region or zone fo the GKE cluster. Upgrading the master Kubernetes version does not automatically upgrade worker nodes. Nodes can be upgraded independently.

>**Note**
>GKE has removed basic authentication in 1.19+. In order to upgrade a cluster to 1.19+, basic authentication must be disabled in the Google Cloud. Otherwise, an error will appear in Rancher when an upgrade to 1.19+ is attempted. You can follow the [Google documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication#disabling_authentication_with_a_static_password). After this, the Kubernetes version can be updated to 1.19+ via Rancher.

{{% /tab %}}
{{% tab "Rancher before v2.5.8" %}}

# Prerequisites

Some setup in Google Kubernetes Engine is required.

### Service Account Token

Create a service account using [Google Kubernetes Engine](https://console.cloud.google.com/projectselector/iam-admin/serviceaccounts). GKE uses this account to operate your cluster. Creating this account also generates a private key used for authentication.

The service account requires the following roles:

- **Compute Viewer:** `roles/compute.viewer`
- **Project Viewer:** `roles/viewer`
- **Kubernetes Engine Admin:** `roles/container.admin` 
- **Service Account User:** `roles/iam.serviceAccountUser`

[Google Documentation: Creating and Enabling Service Accounts](https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances)


>**Note**
>Deploying to GKE will incur charges.

# Create the GKE Cluster

Use Rancher to set up and configure your Kubernetes cluster.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Google Kubernetes Engine**.

3. Enter a **Cluster Name**.

4. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.

5. Either paste your service account private key in the **Service Account** text box or **Read from a file**. Then click **Next: Configure Nodes**.

	>**Note:** After submitting your private key, you may have to enable the Google Kubernetes Engine API. If prompted, browse to the URL displayed in the Rancher UI to enable the API.

6. Select your cluster options, node options and security options. For help, refer to the [GKE Cluster Configuration Reference.](#gke-before-v2-5-8) 
9. Review your options to confirm they're correct. Then click **Create**.

**Result:** You have successfully deployed a GKE cluster.

Your cluster is created and assigned a state of **Provisioning.** Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active.**

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces

{{% /tab %}}
{{% /tabs %}}
