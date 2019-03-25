---
title:  Pipelines
weight: 2529
aliases:
  - /rancher/v2.x/en/concepts/ci-cd-pipelines/
  - /rancher/v2.x/en/tasks/pipelines/
  - /rancher/v2.x/en/tools/pipelines/
  - /rancher/v2.x/en/tools/pipelines/configurations/
---
>**Notes:**
>
>- Pipelines are new and improved for Rancher v2.1! Therefore, if you configured pipelines while using v2.0.x, you'll have to reconfigure them after upgrading to v2.1.
>- Still using v2.0.x? See the pipeline documentation for [previous versions]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/docs-for-v2.0.x).

A _pipeline_ is a software delivery process that is broken into different stages and steps. Setting up a pipeline can help developers deliver new software as quickly and efficiently as possible. Within Rancher, you can configure pipelines for each of your Rancher projects.

Typically, pipeline stages include:

- **Build:**

    Each time code is checked into your repository, the pipeline automatically clones the repo and builds a new iteration of your software. Throughout this process, the software is typically reviewed by automated tests.

- **Publish:**

    After the build is completed, either a Docker image is built and published to a Docker registry or a catalog template is published.

- **Deploy:**

    After the artifacts are published, you would release your application so users could start using the updated product.

## Overview

Rancher's pipeline provides a simple CI/CD experience. Use it to automatically checkout code, run builds or scripts, publish Docker images or catalog applications, and deploy the updated software to users.

After enabling the ability to use pipelines in a project, you can configure multiple pipelines in each project. Each pipeline is unique and can be configured independently.

A pipeline is configured off of a group of files that are checked into source code repositories. Users can configure their pipelines either through the Rancher UI or by adding a `.rancher-pipeline.yml` into the repository.

>**Note:** Rancher's pipeline provides a simple CI/CD experience, but it does not offer the full power and flexibility of and is not a replacement of enterprise-grade Jenkins or other CI tools your team uses.


## How Pipelines Work

When you configure a pipeline in one of your projects, a namespace specifically for the pipeline is automatically created. The following components are deployed to it:

  - **Jenkins:**

    The pipeline's build engine. Because project users do not directly interact with Jenkins, it's managed and locked.

    >**Note:**  There is no option to use existing Jenkins deployments as the pipeline engine.

    <a id="reg"></a>

  - **Docker Registry:**

    Out-of-the-box, the default target for your build-publish step is an internal Docker Registry. However, you can make configurations to push to a remote registry instead. The internal Docker Registry is only accessible from cluster nodes and cannot be directly accessed by users. Images are not persisted beyond the lifetime of the pipeline and should only be used in pipeline runs. If you need to access your images outside of pipeline runs, please push to an external registry.

    <a id="minio"></a>

  - **Minio:**

    Minio storage is used to store the logs for pipeline executions.

  >**Note:** The managed Jenkins instance works statelessly, so don't worry about its data persistency. The Docker Registry and Minio instances use ephemeral volumes by default, which is fine for most use cases. If you want to make sure pipeline logs can survive node failures, you can configure persistent volumes for them, as described in [data persistency for pipeline components](#data-persistency-for-pipeline-components).

## Pipeline Triggers

After you configure a pipeline, you can trigger it using different methods:


- **Manually:**

    After you configure a pipeline, you can trigger a build using the latest CI definition from Rancher UI. When a pipeline execution is triggered, Rancher dynamically provisions a Kubernetes pod to run your CI tasks and then remove it upon completion.

- **Automatically:**

    When you enable a repository for a pipeline, webhooks are automatically added to the version control system. When project users interact with the repo—push code, open pull requests, or create a tag—the version control system sends a webhook to Rancher Server, triggering a pipeline execution.

    To use this automation, webhook management permission is required for the repository. Therefore, when users authenticate and fetch their repositories, only those on which they have webhook management permission will be shown.

## Version Control Providers

Before you can start [configuring a pipeline]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/pipelines/#configuring-repositories) for your repository, you must configure and authorize a version control provider.

| Provider  | Available as of  |
| --- | --- |
| GitHub  | v2.0.0           |
| GitLab | v2.1.0 |
| Bitbucket | v2.2.0 |

Select your provider's tab below and follow the directions.

{{% tabs %}}
{{% tab "GitHub" %}}
1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Select **Tools > Pipelines** in the navigation bar. In versions prior to v2.2.0, you can select **Resources > Pipelines**.

1. Follow the directions displayed to **Setup a Github application**. Rancher redirects you to Github to setup an OAuth App in Github.

1. From GitHub, copy the **Client ID** and **Client Secret**. Paste them into Rancher.

1. If you're using GitHub for enterprise, select **Use a private github enterprise installation**. Enter the host address of your GitHub installation.

1. Click **Authenticate**.

{{% /tab %}}
{{% tab "GitLab" %}}

_Available as of v2.1.0_

1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Select **Tools > Pipelines** in the navigation bar. In versions prior to v2.2.0, you can select **Resources > Pipelines**.

1. Follow the directions displayed to **Setup a GitLab application**. Rancher redirects you to GitLab.

1. From GitLab, copy the **Application ID** and **Secret**. Paste them into Rancher.

1. If you're using GitLab for enterprise setup, select **Use a private gitlab enterprise installation**. Enter the host address of your GitLab installation.

1. Click **Authenticate**.

>**Note:**
> 1. Pipeline uses Gitlab [v4 API](https://docs.gitlab.com/ee/api/v3_to_v4.html) and the supported Gitlab version is 9.0+.  
> 2. If you use GitLab 10.7+ and your Rancher setup is in a local network, enable the **Allow requests to the local network from hooks and services** option in GitLab admin settings.
{{% /tab %}}
{{% tab "Bitbucket Cloud" %}}

_Available as of v2.2.0_

1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Select **Tools > Pipelines** in the navigation bar.

1. Choose the **Use public Bitbucket Cloud** option.

1. Follow the directions displayed to **Setup a Bitbucket Cloud application**. Rancher redirects you to Bitbucket to setup an OAuth consumer in Bitbucket.

1. From Bitbucket, copy the consumer **Key** and **Secret**. Paste them into Rancher.

1. Click **Authenticate**.

{{% /tab %}}
{{% tab "Bitbucket Server" %}}

_Available as of v2.2.0_

1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Select **Tools > Pipelines** in the navigation bar.

1. Choose the **Use private Bitbucket Server setup** option.

1. Follow the directions displayed to **Setup a Bitbucket Server application**.

1. Enter the host address of your Bitbucket server installation.

1. Click **Authenticate**.

>**Note:**
> Bitbucket server needs to do SSL verification when sending webhooks to Rancher. Please ensure that Rancher server's certificate is trusted by the Bitbucket server. There are two options:
>
> 1. Setup Rancher server with a certificate from a trusted CA.
> 1. If you're using self-signed certificates, import Rancher server's certificate to the Bitbucket server. For instructions, see the Bitbucket server documentation for [configuring self-signed certificates](https://confluence.atlassian.com/bitbucketserver/if-you-use-self-signed-certificates-938028692.html).
>
{{% /tab %}}
{{% /tabs %}}

**Result:** After the version control provider is authenticated, you will be automatically re-directed to start [configuring which repositories]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/pipelines/#configuring-repositories) that you want start using with a pipeline. Once a repository is enabled, you can start to [configure the pipeline]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/pipelines/#pipeline-configuration).

## Managing Pipeline Settings

After configuring a version control provider, there are several options that can be configured for all pipelines.

1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Select **Tools > Pipelines** in the navigation bar. In versions prior to v2.2.0, you can select **Resources > Pipelines**.

1. Edit the different settings:

    {{% accordion id="executor-quota" label="Executor Quota" %}}   

Select the maximum number of pipeline executors. The _executor quota_ decides how many builds can run simultaneously in the project. If the number of triggered builds exceeds the quota, subsequent builds will queue until a vacancy opens. By default, the quota is `2`. A value of `0` or less removes the quota limit.
    {{% /accordion %}}

    {{% accordion id="resource-quota" label="Resource Quota for Executors" %}}   

_Available as of v2.2.0_

Configure compute resources for Jenkins agent containers. When a pipeline execution is triggered, a build pod is dynamically provisioned to run your CI tasks. Under the hood, A build pod consists of one Jenkins agent container and one container for each pipeline step. You can [manage compute resources](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/) for every containers in the pod.

Edit the **Memory Reservation**, **Memory Limit**, **CPU Reservation** or **CPU Limit**, then click **Update Limit and Reservation**.

To configure compute resources for pipeline-step containers:
{{% tabs %}}
{{% tab "By YAML" %}}

You can configure compute resources for pipeline-step containers in the `.rancher-pipeline.yml` file.

In a [step type]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/pipelines/#step-types), you will provide the following information:

* **CPU Reservation (`CpuRequest`)**: CPU request for the container of a pipeline step.
* **CPU Limit (`CpuLimit`)**: CPU limit for the container of a pipeline step.
* **Memory Reservation (`MemoryRequest`)**: Memory request for the container of a pipeline step.
* **Memory Limit (`MemoryLimit`)**: Memory limit for the container of a pipeline step.

```yaml
# example
stages:
  - name: Build something
    steps:
    - runScriptConfig:
        image: busybox
        shellScript: ls
      cpuRequest: 100m
      cpuLimit: 1
      memoryRequest:100Mi
      memoryLimit: 1Gi
    - publishImageConfig:
        dockerfilePath: ./Dockerfile
        buildContext: .
        tag: repo/app:v1
      cpuRequest: 100m
      cpuLimit: 1
      memoryRequest:100Mi
      memoryLimit: 1Gi
```

>**Note:** Rancher sets default compute resources for pipeline steps except for `Build and Publish Images` and `Run Script` steps. You can override the default value by specifying compute resources in the same way.
{{% /tab %}}
{{% /tabs %}}

    {{% /accordion %}}
    {{% accordion id="cacerts" label="Custom CA" %}}   

_Available as of v2.2.0_

If you want to use a version control provider with a certificate from a custom/internal CA root, the CA root certificates need to be added as part of the version control provider configuration in order for the pipeline build pods to succeed.

1. Click **Edit cacerts**.

1. Paste in the CA root certificates and click **Save cacerts**.

**Result:** Pipelines can be used and new pods will be able to work with the self-signed-certificate.

    {{% /accordion %}}

## Configuring Persistent Data for Pipeline Components

The internal [Docker registry]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/#reg) and the [Minio]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/#minio) workloads use ephemeral volumes by default. This default storage works out-of-the-box and makes testing easy, but you lose the build images and build logs if the node running the Docker Registry or Minio fails. In most cases this is fine. If you want build images and logs to survive node failures, you can configure the Docker Registry and Minio to use persistent volumes.

Complete both [A—Configuring Persistent Data for Docker Registry](#a—configuring-persistent-data-for-docker-registry) _and_ [B—Configuring Persistent Data for Minio](#b—configuring-persistent-data-for-minio).

>**Prerequisites (for both parts A and B):**
>
>[Persistent volumes]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#persistent-volumes) must be available for the cluster.

#### A. Configuring Persistent Data for Docker Registry

1. From the project that you're configuring a pipeline for, select the **Workloads** tab.

1. Find the `docker-registry` workload and select **Ellipsis (...) > Edit**.

1. Scroll to the **Volumes** section and expand it. Make one of the following selections from the **Add Volume** menu, which is near the bottom of the section:

    - **Add Volume > Add a new persistent volume (claim)**
    - **Add Volume > Use an existing persistent volume (claim)**

1.  Complete the form that displays to choose a persistent volume for the internal Docker registry.
{{% tabs %}}

{{% tab "Add a new persistent volume" %}}
<br/>
1. Enter a **Name** for the volume claim.

1. Select a volume claim **Source**:

    - If you select **Use a Storage Class to provision a new persistent volume**, select a [Storage Class]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#storage-classes) and enter a **Capacity**.

    - If you select **Use an existing persistent volume**, choose a **Persistent Volume** from the drop-down.
1. From the **Customize** section, choose the read/write access for the volume.

1. Click **Define**.

{{% /tab %}}

{{% tab "Use an existing persistent volume" %}}
<br/>
1. Enter a **Name** for the volume claim.

1. Choose a **Persistent Volume Claim** from the drop-down.

1. From the **Customize** section, choose the read/write access for the volume.

1. Click **Define**.

{{% /tab %}}

{{% /tabs %}}

1. From the **Mount Point** field, enter `/var/lib/registry`, which is the data storage path inside the Docker registry container.

1. Click **Upgrade**.

#### B. Configuring Persistent Data for Minio

1. From the **Workloads** tab, find the `minio` workload and select **Ellipsis (...) > Edit**.

1. Scroll to the **Volumes** section and expand it. Make one of the following selections from the **Add Volume** menu, which is near the bottom of the section:

    - **Add Volume > Add a new persistent volume (claim)**
    - **Add Volume > Use an existing persistent volume (claim)**

1.  Complete the form that displays to choose a persistent volume for the internal Docker registry.
{{% tabs %}}

{{% tab "Add a new persistent volume" %}}
<br/>
1. Enter a **Name** for the volume claim.

1. Select a volume claim **Source**:

    - If you select **Use a Storage Class to provision a new persistent volume**, select a [Storage Class]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#storage-classes) and enter a **Capacity**.

    - If you select **Use an existing persistent volume**, choose a **Persistent Volume** from the drop-down.
1. From the **Customize** section, choose the read/write access for the volume.

1. Click **Define**.

{{% /tab %}}

{{% tab "Use an existing persistent volume" %}}
<br/>
1. Enter a **Name** for the volume claim.

1. Choose a **Persistent Volume Claim** from the drop-down.

1. From the **Customize** section, choose the read/write access for the volume.

1. Click **Define**.

{{% /tab %}}

{{% /tabs %}}

1. From the **Mount Point** field, enter `/data`, which is the data storage path inside the Minio container.

1. Click **Upgrade**.

**Result:** Persistent storage is configured for your pipeline components.
