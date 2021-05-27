---
title: Managing GKE Clusters
shortTitle: Google Kubernetes Engine
weight: 2105
aliases:
  - /rancher/v2.5/en/tasks/clusters/creating-a-cluster/create-cluster-gke/
  - /rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/gke
---

{{% tabs %}}
{{% tab "Rancher v2.5.8+" %}}

- [Prerequisites](#prerequisites)
- [Provisioning a GKE Cluster](#provisioning-a-gke-cluster)
- [Private Clusters](#private-clusters)
- [Configuration Reference](#configuration-reference)
- [Updating Kubernetes Version](#updating-kubernetes-version)
- [Syncing](#syncing)

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

# Provisioning a GKE Cluster

>**Note**
>Deploying to GKE will incur charges.

### 1. Create a Cloud Credential

1. In the upper right corner, click the user profile dropdown menu and click **Cloud Credentials.**
1. Click **Add Cloud Credential.**
1. Enter a name for your Google cloud credentials.
1. In the **Cloud Credential Type** field, select **Google.**
1. In the **Service Account** text box, paste your service account private key JSON, or upload the JSON file.
1. Click **Create.**

**Result:** You have created credentials that Rancher will use to provision the new GKE cluster.

### 2. Create the GKE Cluster
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

# Private Clusters

Private GKE clusters are supported. Note: This advanced setup can require more steps during the cluster provisioning process. For details, see [this section.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/editing-clusters/gke-config-reference/private-clusters/)

# Configuration Reference

For details on configuring GKE clusters in Rancher, see [this page.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/editing-clusters/gke-config-reference)
# Updating Kubernetes Version

The Kubernetes version of a cluster can be upgraded to any version available in the region or zone fo the GKE cluster. Upgrading the master Kubernetes version does not automatically upgrade worker nodes. Nodes can be upgraded independently.

>**Note**
>GKE has removed basic authentication in 1.19+. In order to upgrade a cluster to 1.19+, basic authentication must be disabled in the Google Cloud. Otherwise, an error will appear in Rancher when an upgrade to 1.19+ is attempted. You can follow the [Google documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication#disabling_authentication_with_a_static_password). After this, the Kubernetes version can be updated to 1.19+ via Rancher.

# Syncing

The GKE provisioner can synchronize the state of a GKE cluster between Rancher and the provider. For an in-depth technical explanation of how this works, see [Syncing.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/editing-clusters/syncing)

For information on configuring the refresh interval, see [this section.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/editing-clusters/gke-config-reference/#configuring-the-refresh-interval)


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
