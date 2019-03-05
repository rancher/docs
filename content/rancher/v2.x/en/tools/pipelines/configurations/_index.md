---
title: Configuring Pipelines
weight: 3725
---

Configuring a pipeline automates the process of triggering and publishing builds. This section describes how to set up a pipeline in a production environment. 

- The [Basic Configuration](#basic-configuration) section provides sequential instruction on how to configure a functional pipeline.
- The [Advanced Configuration](#advanced-configuration) section provides instructions for configuring pipeline options.

## Basic Configuration

To configure a functional pipeline for your project, begin by completing the mandatory basic configuration steps.

### Pipeline Configuration Outline

Initial configuration of a pipeline in a production environment involves completion of several mandatory procedures.

>**Note:** Before setting up a pipeline for a production environment, we recommend trying the [Pipeline Quick Start Guide]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/quick-start-guide).

<!-- TOC -->

- [1. Configuring Version Control Providers](#1-configuring-version-control-providers)
- [2. Configuring Pipeline Stages and Steps](#2-configuring-pipeline-stages-and-steps)
- [3. Running the Pipeline](#3-running-the-pipeline)
- [4. Configuring Persistent Data for Pipeline Components](#4-configuring-persistent-data-for-pipeline-components)
- [Advanced Configuration](#advanced-configuration)
 

<!-- /TOC -->

### 1. Configuring Version Control Providers

Begin configuration of your pipeline by enabling authentication with your version control provider. Rancher Pipeline supports integration with GitHub, GitLab and Bitbucket.

Select your provider's tab below and follow the directions.

{{% tabs %}}
{{% tab "GitHub" %}}
1. From the context menu, open the project for which you're configuring a pipeline. 

1. From the main menu, select **Resources > Pipelines**.

1. Follow the directions displayed to setup an OAuth application in GitHub.

    ![GitHub Pipeline Instructions]({{< baseurl >}}/img/rancher/github-pipeline.png)

1. From GitHub, copy the **Client ID** and **Client Secret**. Paste them into Rancher.

1. If you're using GitHub for enterprise, select **Use a private github enterprise installation**. Enter the host address of your GitHub installation.

1. Click **Authenticate**. 

1. Enable the repository for which you want to run a pipeline. Then click **Done**.  

{{% /tab %}}
{{% tab "GitLab" %}}
1. From the context menu, open the project for which you're configuring a pipeline. 

1. From the main menu, select **Resources > Pipelines**.

1. Follow the directions displayed to setup a GitLab application.

    ![GitLab Pipeline Instructions]({{< baseurl >}}/img/rancher/gitlab-pipeline.png)

1. From GitLab, copy the **Application ID** and **Secret**. Paste them into Rancher.

1. If you're using GitLab for enterprise setup, select **Use a private gitlab enterprise installation**. Enter the host address of your GitLab installation.

1. Click **Authenticate**.

1. Enable the repository for which you want to run a pipeline. Then click **Done**.  

>**Note:** 
> 1. Pipeline uses Gitlab [v4 API](https://docs.gitlab.com/ee/api/v3_to_v4.html) and the supported Gitlab version is 9.0+.  
> 2. If you use GitLab 10.7+ and your Rancher setup is in a local network, enable the **Allow requests to the local network from hooks and services** option in GitLab admin settings.
{{% /tab %}}
{{% tab "Bitbucket Cloud" %}}

_Available as of v2.2.0_

1. From the context menu, open the project for which you're configuring a pipeline.

1. From the main menu, select **Tools > Pipelines**.

1. Choose the **Use public Bitbucket Cloud** option(the default).

1. Follow the directions displayed to setup an OAuth consumer in Bitbucket.

    ![Bitbucket Cloud Pipeline Instructions]({{< baseurl >}}/img/rancher/bitbucketcloud-pipeline.png)

1. From Bitbucket, copy the consumer **Key** and **Secret**. Paste them into Rancher.

1. Click **Authenticate**.

1. Enable the repository for which you want to run a pipeline. Then click **Done**.

{{% /tab %}}
{{% tab "Bitbucket Server" %}}

_Available as of v2.2.0_

1. From the context menu, open the project for which you're configuring a pipeline.

1. From the main menu, select **Tools > Pipelines**.

1. Choose the **Use private Bitbucket Server steup** option.

1. Follow the directions displayed to setup an application link in Bitbucket.

    ![Bitbucket Server Pipeline Instructions]({{< baseurl >}}/img/rancher/bitbucketserver-pipeline.png)

1. Enter the host address of your Bitbucket server installation.

1. Click **Authenticate**.

1. Enable the repository for which you want to run a pipeline. Then click **Done**.

>**Note:**
> Bitbucket server needs to do SSL verification when sending webhooks to Rancher. Please ensure that Rancher server's certificate is trusted by the Bitbucket server. There are two options:
>
> 1. Setup Rancher server with a certificate from a trusted CA.
> 1. If you're using self-signed certificates, import Rancher server's certificate to the Bitbucket server. For instructions, see the Bitbucket server documentation for [configuring self-signed certificates](https://confluence.atlassian.com/bitbucketserver/if-you-use-self-signed-certificates-938028692.html).
>
{{% /tab %}}
{{% /tabs %}}

**Result:** A pipeline is added to the project.

<!-- What happens if you change this value while builds are running? -->





### 2. Configuring Pipeline Stages and Steps

Now that the pipeline is added to your project, you need to configure its automated stages and steps. For your convenience, there are multiple built-in step types for dedicated tasks.

1. From your project's **Pipeline** tab, find your new pipeline, and select **Ellipsis (...) > Edit Config**.
    
    >**Note:** When configuring a pipeline, it takes a few moments for Rancher to check for an existing pipeline configuration.

1. Click **Configure pipeline for this branch**.
 
1. Add stages to your pipeline execution by clicking **Add Stage**.

1. Add steps to each stage by clicking **Add a Step**. You can add multiple steps to each stage.

    >**Note:** As you build out each stage and step, click `Show advanced options` to make [Advanced Configurations](#advanced-configuration), such as rules to trigger or skip pipeline actions, add environment variables, or inject environment variables using secrets. Advanced options are available the pipeline, each stage, and each individual step.

    **Step types available include:** 

    {{% accordion id="clone" label="Clone" %}}

The first stage is preserved to be a cloning step that checks out source code from your repo. Rancher handles the cloning of the git repository. This action is equivalent to `git clone <repository_link> <workspace_dir>`.

    {{% /accordion %}}
    {{% accordion id="run-script" label="Run Script" %}}

The **Run Script** step executes arbitrary commands in the workspace inside a specified container. You can use it to build, test and do more, given whatever utilities the base image provides. For your convenience you can use variables to refer to metadata of a pipeline execution. Please go to the [Pipeline Variable Reference]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/reference/#variable-substitution) for the list of available variables.

{{% tabs %}}

{{% tab "By UI" %}}
<br/>

1. From the **Step Type** drop-down, choose **Run Script** and fill in the form.

1. Click **Add**. 

{{% /tab %}}

{{% tab "By YAML" %}}

```yaml
# example
stages:
- name: Build something
  steps:
  - runScriptConfig:
      image: golang
      shellScript: go build
``` 
{{% /tab %}}

{{% /tabs %}}     

{{% /accordion %}}
{{% accordion id="build-publish-image" label="Build and Publish Images" %}}

The **Build and Publish Image** step builds and publishes a Docker image. This process requires a Dockerfile in your source code's repository to complete successfully.

{{% tabs %}}

{{% tab "By UI" %}}
1. From the **Step Type** drop-down, choose **Build and Publish**.

1. Fill in the rest of the form. Descriptions for each field are listed below. When you're done, click **Add**.
 
    Field | Description |
    ---------|----------|
     Dockerfile Path | The relative path to the Dockerfile in the source code repo. By default, this path is `./Dockerfile`, which assumes the Dockerfile is in the root directory. You can set it to other paths in different use cases (`./path/to/myDockerfile` for example). | 
     Image Name | The image name in `name:tag` format. The registry address is not required. For example, to build  `example.com/repo/my-image:dev`, enter `repo/my-image:dev`. |
     Push image to remote repository | An option to set the registry that publishes the image that's built.  To use this option, enable it and choose a registry from the drop-down. If this option is disabled, the image is pushed to the internal registry. |
     Build Context <br/><br/> (**Show advanced options**)| By default, the root directory of the source code (`.`). For more details, see the Docker [build command documentation](https://docs.docker.com/engine/reference/commandline/build/).

{{% /tab %}}

{{% tab "By YAML" %}}
```yaml
# example
stages:
- name: Publish Image
  steps:
  - publishImageConfig:
      dockerfilePath: ./Dockerfile
      buildContext: .
      tag: repo/app:v1
      pushRemote: true
      registry: example.com
```

You can use specific arguments for Docker daemon and the build. They are not exposed in the UI, but they are available in pipeline YAML format, as indicated in the example above. Available variables includes:

Variable Name           | Description
------------------------|------------------------------------------------------------
PLUGIN_DRY_RUN          | Disable docker push
PLUGIN_DEBUG            | Docker daemon executes in debug mode
PLUGIN_MIRROR           | Docker daemon registry mirror
PLUGIN_INSECURE         | Docker daemon allows insecure registries
PLUGIN_BUILD_ARGS       | Docker build args, a comma separated list 

{{% /tab %}}

{{% /tabs %}}

{{% /accordion %}}
{{% accordion id="deploy-yaml" label="Deploy YAML" %}}

This step deploys arbitrary Kubernetes resources to the project. This deployment requires a Kubernetes manifest file to be present in the source code repository. Pipeline variable substitution is supported in the manifest file. You can view an example file at [GitHub](https://github.com/rancher/pipeline-example-go/blob/master/deployment.yaml). For available variables, refer to [Pipeline Variable Reference]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/reference/).

{{% tabs %}}

{{% tab "By UI" %}}

1. From the **Step Type** drop-down, choose **Deploy YAML** and fill in the form.

1. Enter the **YAML Path**, which is the path to the manifest file in the source code.

1. Click **Add**. 

{{% /tab %}}

{{% tab "By YAML" %}}

```yaml
# example
stages:
- name: Deploy
  steps:
  - applyYamlConfig:
      path: ./deployment.yaml
``` 

{{% /tab %}}

{{% /tabs %}}     

{{% /accordion %}}

1. When you're finished adding stages and steps, click **Done.** 

### 3. Running the Pipeline

Run your pipeline for the first time. From the **Pipeline** tab, find your pipeline and select **Ellipsis (...) > Run**.

During this initial run, your pipeline is tested, and the following [pipeline components]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/) are deployed to your project as workloads in a new namespace dedicated to the pipeline:

- `docker-registry`
- `jenkins`
- `minio`

This process takes several minutes. When it completes, you can view each pipeline component from the project **Workloads** tab.

### 4. Configuring Persistent Data for Pipeline Components

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


## Advanced Configuration

During the process of configuring a pipeline, you can configure advanced options for triggering the pipeline or configuring environment variables.

- [Configuring Pipeline Trigger Rules](#configuring-pipeline-trigger-rules)
- [Configuring Notifications](#configuring-notifications)
- [Configuring Timeouts](#configuring-timeouts)
- [Configuring Environment Variables](#configuring-environment-variables)
- [Configuring Pipeline Secrets](#configuring-pipeline-secrets)
- [Configuring the Executor Quota](#configuring-the-executor-quota)

### Configuring Pipeline Trigger Rules

When a repository is enabled, a webhook for it is automatically set in the version control system. By default, the project pipeline is triggered by a push event to a specific repository, but you can add (or change) events that trigger a build, such as a pull request or a tagging.

Trigger rules come in two types:

- **Run this when:**

    This type of rule starts the pipeline, stage, or step when a trigger explicitly occurs.

- **Do Not Run this when:**
 
    If all conditions evaluate to true, then the pipeline/stage/step is executed. Otherwise it is skipped. When a stage/step is skipped, it is considered successful and follow-up stages/steps continue to run. Wildcard character (`*`) expansion is supported in conditions.


{{% tabs %}}
{{% tab "Pipeline Trigger" %}}

You can configure trigger rules for the entire pipeline in two different contexts:

{{% accordion id="pipeline-creation" label="During Initial Pipeline Configuration" %}}


1. From the context menu, open the project for which you've configured a pipeline. Then select the **Pipelines** tab.

1. From the pipeline for which you want to edit build triggers, select **Ellipsis (...) > Edit Config**.

1. Click **Show advanced options**.

1. From **Trigger Rules**, configure rules to run or skip the pipeline.

    1.  Click **Add Rule**. In the **Value** field, enter the name of the branch that triggers the pipeline.

    1. **Optional:** Add more branches that trigger a build.  
{{% /accordion %}}

{{% accordion id="pipeline-settings" label="While Editing Pipeline Settings" %}}
 
After you've configured a pipeline, you can go back and choose the events that trigger a pipeline execution.

>**Note:** This option is not available for example repositories.

1. From the context menu, open the project for which you've configured a pipeline. Then select the **Pipelines** tab.

1. From the pipeline for which you want to edit build triggers, select **Ellipsis (...) > Setting**.

1. Select (or clear) the events that you want to trigger a pipeline execution.

1. Click **Save**.   
{{% /accordion %}}

{{% /tab %}}
{{% tab "Stage Trigger" %}}
1. From the context menu, open the project for which you've configured a pipeline. Then select the **Pipelines** tab.

1. From the pipeline for which you want to edit triggers, select **Ellipsis (...) > Edit Config**.

1. From the pipeline stage that you want to configure a trigger for, click the **Edit** icon.

1. Click **Show advanced options**. 

1. Add one or more trigger rules.

    1.  Click **Add Rule**.  
    
    1.  Choose the **Type** that triggers the stage.

        | Type   | Value                                                                |
        | ------ | -------------------------------------------------------------------- |
        | Branch | The name of the branch that triggers the stage.                      |
        | Event  | The type of event that triggers the stage (Push, Pull Request, Tag). |

1. Click **Save**.
{{% /tab %}}
{{% tab "Step Trigger" %}}
1. From the context menu, open the project for which you've configured a pipeline. Then select the **Pipelines** tab.

1. From the pipeline for which you want to edit triggers, select **Ellipsis (...) > Edit Config**.

1. From the pipeline step that you want to configure a trigger for, click the **Edit** icon.

1. Click **Show advanced options**. 

1. Add one or more trigger rules.

    1.  Click **Add Rule**.  
    
    1.  Choose the **Type** that triggers the step.

        | Type   | Value                                                                |
        | ------ | -------------------------------------------------------------------- |
        | Branch | The name of the branch that triggers the stage.                      |
        | Event  | The type of event that triggers the stage (Push, Pull Request, Tag). |

1. Click **Save**.
{{% /tab %}}
{{% tab "Do Not Run YAML" %}}
```yaml
# example
stages:
  - name: Build something
    # Conditions for stages
    when:
      branch: master
      event: [ push, pull_request ]
    # Multiple steps run concurrently
    steps:
    - runScriptConfig:
        image: busybox
        shellScript: date -R
      # Conditions for steps
      when:
        branch: [ master, dev ]
        event: push
# branch conditions for the pipeline
branch:
  include: [ master, feature/*]
  exlclude: [ dev ]
```
{{% /tab %}}
{{% /tabs %}}

### Configuring Notifications

_Available as of v2.2.0_

You can configure pipelines to send out notifications to any [notifiers]({{< baseurl >}}/rancher/v2.x/en/tools/notifiers-and-alerts/#notifiers) based on the build status of a pipeline. Before configuring a notification, Rancher recommends [setting up notifiers]]({{< baseurl >}}/rancher/v2.x/en/tools/notifiers-and-alerts/#adding-notifiers) so it will be easy to add recipients immediately. 

> **Note:** Notifiers are configured at a cluster level, but pipelines are configured at the project level.

{{% tabs %}}
{{% tab "By UI" %}}
1. Find the pipline that you want to add a notification to, by opening the **Workloads** > **Pipelines** tab in your project.

1. From the pipeline for which you want to add notifications, select **Ellipsis (...) > Edit Config**.

1. Within the **Notification** section, turn on notifications by clicking **Enable**. 

1. Select the conditions for the notification. You can select to get a notification for the following statuses: `Failed`, `Success`, `Changed`. For example, if you want to receive notifications when an execution fails, select **Failed**. 

1. If you don't have any existing [notifiers]({{< baseurl >}}/rancher/v2.x/en/tools/notifiers-and-alerts/#notifiers), Rancher will provide a warning that no notifers are set up and provide a link to be able to go to the notifiers page. Follow the [instructions]({{< baseurl >}}/rancher/v2.x/en/tools/notifiers-and-alerts/#adding-notifiers) to add a notifier. If you  already have notifiers, you can add them to the notification by clicking **Add Recipient** button.

1. For each recipient, select which notifier type from the dropdown. Based on the type of notifier, you can use the default recipient or override the recipient with a different one. For example, if you have a notifier for Slack, you can update which channel to send the notification to. You can add additional notifiers by clicking **Add Recipient**.
 
{{% /tab %}}
{{% tab "By YAML" %}}

You can add notifiers directly in the `.rancher-pipeline.yml` file. 

Under the `notification` section, you will provide the following information:


* Recipients: This will be the list of notifiers/recipients that will receive the notification. 
  *  Notifier: The ID of the notifier. This can be found by finding the notifier and selecting **View in API** to get the ID. 
  * Recipient: Depending on the type of the notifier, the "default recipient" can be used or you can override this with a different recipient. For example, when configuring a slack notifier, you select a channel as your default recipient, but if you wanted to send notifications to a different channel, you can select a different recipient. 
* Condition: Select which conditions of when you want the notification to be sent. 
* Message (Optional): If you want to change the default notification message, you can edit this in the yaml. Note: This option is not available in the UI.  

```yaml
# Example
stages:
  - name: Build something
    steps:
    - runScriptConfig:
        image: busybox
        shellScript: ls
notification:
  recipients:
  - # Recipient
    recipient: "#mychannel"
    # ID of Notifier
    notifier: "c-wdcsr:n-c9pg7"
  - recipient: "test@example.com"
    notifier: "c-wdcsr:n-lkrhd"
  # Select which statuses you want the notification to be sent  
  condition: ["Failed", "Success", "Changed"]
  # Ability to override the default message (Optional)
  message: "my-message"
``` 
{{% /tab %}}
{{% /tabs %}}

### Configuring Timeouts

Each pipeline execution has a default timeout of 60 minutes. If the pipeline execution cannot complete within its timeout period, the pipeline is aborted. If a pipeline has more executions than can be completed in 60 minutes, 

{{% tabs %}}
{{% tab "By UI" %}}
1. From the context menu, open the project for which you've configured a pipeline. Then select the **Pipelines** tab.

1. From the pipeline for which you want to edit the timeout, select **Ellipsis (...) > Edit Config**.

1. Click **Show advanced options**.  

1. Enter a new value in the **Timeout** field.
 
{{% /tab %}}
{{% tab "By YAML" %}}
```yaml
# example
stages:
  - name: Build something
    steps:
    - runScriptConfig:
        image: busybox
        shellScript: ls
timeout: 30
``` 
{{% /tab %}}
{{% /tabs %}}


### Configuring Environment Variables

When configuring a pipeline, you can use environment variables to configure the step's script.

{{% tabs %}}
{{% tab "By UI" %}}
1. From the context menu, open the project for which you've configured a pipeline. Then select the **Pipelines** tab.

1. From the pipeline in which you want to use environment variables, select **Ellipsis (...) > Edit Config**.

1. Click the  **Edit** icon for the step in which you want to use environment variables.

1. Click **Show advanced options**.  

1. Click **Add Variable**, and then enter a key and value in the fields that appear. Add more variables if needed.

1. Edit the script, adding your environment variable(s).

1. Click **Save**. 

{{% /tab %}}

{{% tab "By YAML" %}}
```yaml
# example
stages:
  - name: Build something
    steps:
    - runScriptConfig:
        image: busybox
        shellScript: echo ${FIRST_KEY} && echo ${SECOND_KEY}
      env:
        FIRST_KEY: VALUE
        SECOND_KEY: VALUE2
``` 
{{% /tab %}}

{{% /tabs %}}

### Configuring Pipeline Secrets

If you need to use security-sensitive information in your pipeline scripts (like a password), you can pass them in using Kubernetes [secrets]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/secrets/).

>**Prerequisite:** Create a secret for your project for use in pipelines.

>**Note:** Secret injection is disabled on pull request events.

{{% tabs %}}
{{% tab "By UI" %}}
1. From the context menu, open the project for which you've configured a pipeline. Then select the **Pipelines** tab.

1. From the pipeline in which you want to use environment variables, select **Ellipsis (...) > Edit Config**.

1. Click the  **Edit** icon for the step in which you want to use environment variables.

1. Click **Show advanced options**.  

1. Click **Add From Secret**. Select the secret file that you want to use. Then choose a key. Optionally, you can enter an alias for the key.

1. Click **Save**. 

{{% /tab %}}
{{% tab "By YAML" %}}
```yaml
# example
stages:
  - name: Build something
    steps:
    - runScriptConfig:
        image: busybox
        shellScript: echo ${ALIAS_ENV}
      # environment variables from project secrets
      envFrom:
      - sourceName: my-secret
        sourceKey: secret-key
        targetKey: ALIAS_ENV
``` 
{{% /tab %}}
{{% /tabs %}}

### Configuring the Executor Quota

The _executor quota_ decides how many builds can run simultaneously in the project. If the number of triggered builds exceeds the quota, subsequent builds will queue until a vacancy opens. By default, the quota is `2`, but you can change it.

1. From the context menu, open the project for which you've configured a pipeline.

1. From the main menu, select **Resources > Pipelines**.

1. From `The maximum number of pipeline executors` increment the **Scale** up or down to change the quota. A value of `0` or less removes the quota limit.
