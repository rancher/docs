---
title: Installing Rancher on a Google Kubernetes Engine Cluster
shortTitle: GKE
weight: 5
---

In this section, you'll learn how to install Rancher using Google Kubernetes Engine.

If you already have a GKE Kubernetes cluster, skip to the step about [installing an ingress.](#7-install-an-ingress) Then install the Rancher Helm chart following the instructions on [this page.]({{<baseurl>}}/rancher/v2.5/en/installation/install-rancher-on-k8s/#install-the-rancher-helm-chart)

# Prerequisites

- You will need a Google account.
- You will need a Google Cloud billing account. You can manage your Cloud Billing accounts using the Google Cloud Console. For more information about the Cloud Console, visit [General guide to the console.](https://support.google.com/cloud/answer/3465889?hl=en&ref_topic=3340599)
- You will need a cloud quota for at least one in-use IP address and at least 2 CPUs. For more details about hardware requirements for the Rancher server, refer to [this section.]({{<baseurl>}}/rancher/v2.5/en/installation/requirements/#rke-and-hosted-kubernetes)

# 1. Enable the Kubernetes Engine API

Take the following steps to enable the Kubernetes Engine API:

1. Visit the [Kubernetes Engine page](https://console.cloud.google.com/projectselector/kubernetes?_ga=2.169595943.767329331.1617810440-856599067.1617343886) in the Google Cloud Console.
1. Create or select a project.
1. Open the project and enable the Kubernetes Engine API for the project. Wait for the API and related services to be enabled. This can take several minutes.
1. Make sure that billing is enabled for your Cloud project. For information on how to enable billing for your project, refer to the [Google Cloud documentation.](https://cloud.google.com/billing/docs/how-to/modify-project#enable_billing_for_a_project)

# 2. Open the Cloud Shell

Cloud Shell is a shell environment for managing resources hosted on Google Cloud. Cloud Shell comes preinstalled with the `gcloud` command-line tool and kubectl command-line tool. The `gcloud` tool provides the primary command-line interface for Google Cloud, and `kubectl` provides the primary command-line interface for running commands against Kubernetes clusters.

The following sections describe how to launch the cloud shell from the Google Cloud Console or from your local workstation.

### Cloud Shell

To launch the shell from the [Google Cloud Console,](https://console.cloud.google.com) go to the upper-right corner of the console and click the terminal button. When hovering over the button, it is labeled **Activate Cloud Shell.**

### Local Shell

To install `gcloud` and `kubectl`, perform the following steps:

1. Install the Cloud SDK by following [these steps.](https://cloud.google.com/sdk/docs/install) The Cloud SDK includes the `gcloud` command-line tool. The steps vary based on your OS.
1. After installing Cloud SDK, install the `kubectl` command-line tool by running the following command:

    ```
    gcloud components install kubectl
    ```
    In a later step, `kubectl` will be configured to use the new GKE cluster.
1. [Install Helm 3](https://helm.sh/docs/intro/install/) if it is not already installed.
1. Enable Helm experimental [support for OCI images](https://github.com/helm/community/blob/master/hips/hip-0006.md) with the `HELM_EXPERIMENTAL_OCI` variable. Add the following line to `~/.bashrc` (or `~/.bash_profile` in macOS, or wherever your shell stores environment variables):

    ```
    export HELM_EXPERIMENTAL_OCI=1
    ```
1. Run the following command to load your updated `.bashrc` file:

    ```
    source ~/.bashrc
    ```
    If you are running macOS, use this command:
    ```
    source ~/.bash_profile
    ```
    
   

# 3. Configure the gcloud CLI

 Set up default gcloud settings using one of the following methods:

- Using gcloud init, if you want to be walked through setting defaults.
- Using gcloud config, to individually set your project ID, zone, and region.

{{% tabs %}}
{{% tab "Using gloud init" %}}

1. Run gcloud init and follow the directions:

    ```
    gcloud init
    ```
    If you are using SSH on a remote server, use the --console-only flag to prevent the command from launching a browser:

    ```
    gcloud init --console-only
    ```
2. Follow the instructions to authorize gcloud to use your Google Cloud account and select the new project that you created.

{{% /tab %}}
{{% tab "Using gcloud config" %}}
{{% /tab %}}
{{% /tabs %}}

# 4. Confirm that gcloud is configured correctly

Run:

```
gcloud config list
```

The output should resemble the following:

```
[compute]
region = us-west1 # Your chosen region
zone = us-west1-b # Your chosen zone
[core]
account = <Your email>
disable_usage_reporting = True
project = <Your project ID>

Your active configuration is: [default]
```

# 5. Create a GKE Cluster

The following command creates a three-node cluster.

Replace `cluster-name` with the name of your new cluster.

```
gcloud container clusters create cluster-name --num-nodes=3
```

# 6. Get Authentication Credentials

After creating your cluster, you need to get authentication credentials to interact with the cluster:

```
gcloud container clusters get-credentials cluster-name
```

This command configures `kubectl` to use the cluster you created.

# 7. Install an Ingress

The cluster needs an Ingress so that Rancher can be accessed from outside the cluster.

The following command installs an `nginx-ingress-controller` with a LoadBalancer service:

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm upgrade --install \
  ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --set controller.service.type=LoadBalancer \
  --version 3.12.0 \
  --create-namespace
```

# 8. Get the Load Balancer IP

To get the address of the load balancer, run:

```
kubectl get service ingress-nginx-controller --namespace=ingress-nginx
```

The result should look similar to the following:

```
NAME                       TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)                      AGE
ingress-nginx-controller   LoadBalancer   10.3.244.156   35.233.206.34   80:31876/TCP,443:32497/TCP   81s
```

Save the `EXTERNAL-IP`.

# 9. Set up DNS

External traffic to the Rancher server will need to be directed at the load balancer you created.

Set up a DNS to point at the external IP that you saved. This DNS will be used as the Rancher server URL.

There are many valid ways to set up the DNS. For help, refer to the Google Cloud documentation about [managing DNS records.](https://cloud.google.com/dns/docs/records)

# 10. Install the Rancher Helm chart

Next, install the Rancher Helm chart by following the instructions on [this page.]({{<baseurl>}}/rancher/v2.5/en/installation/install-rancher-on-k8s/#install-the-rancher-helm-chart) The Helm instructions are the same for installing Rancher on any Kubernetes distribution.

Use the DNS name from the previous step as the Rancher server URL when you install Rancher. It can be passed in as a Helm option. For example, if the DNS name is `rancher.my.org`, you could run the Helm installation command with the option `--set hostname=rancher.my.org`.