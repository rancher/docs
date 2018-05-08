---
title: Google Container Engine
weight: 3325
---

# Creating a Google Container Engine Cluster

## Objectives

1.	[Create a Service Account](#create-a-gke-service-account)

	Begin by logging into Google Cloud Platform and creating a service account to operate your cluster.

2. [Create the Cluster](#create-the-gke-cluster)

	Using your service account, create your Google Container Engine (GKE) cluster.

## Create a Service Account

Create a service account using [Google Cloud Platform](https://console.cloud.google.com/projectselector/iam-admin/serviceaccounts). GKE uses this account to operate your cluster. Creating this account also generates a private key used for authentication.

The service account requires the following roles:

-	`project/viewer`
-	`kubernetes-engine/admin`
-	`service-account/user`

[Google Documentation: Creating and Enabling Service Accounts](https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances)

## Create the GKE Cluster

Use {{< product >}} to set up and configure your Kubernetes cluster.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Google Container Engine**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. Either paste your service account private key in the **Service Account** text box or **Read from a file**. Then click **Next: Configure Nodes**.

	>**Note:** After submitting your private key, you may have to enable the Google Kubernetes Engine API. If prompted, browse to the URL displayed in the Rancher UI to enable the API.

6. {{< step_create-cluster_cluster-options >}}

7. Use **Nodes** to provision each node in your cluster and choose a geographical region.

8. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
