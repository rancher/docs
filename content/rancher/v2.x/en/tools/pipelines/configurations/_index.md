---
title: Configuring Pipelines
weight: 3725
---
<!-- TODO: 

-[] Add steps for configuring repo -->
Configuring a pipeline automates the process of triggering and publishing builds. This section describes how to set up a pipeline in a production environment. 

- The [Basic Configuration](#basic-configuration) section provides sequential instruction on how to configure a functional pipeline.
- The [Advanced Configuration](#advanced-configuration) section provides instructions for configuring pipeline options.

## Basic Configuration

To configure a functional pipeline for your project, begin by completing the mandatory basic configuration steps.

### Pipeline Configuration Outline

Initial configuration of a pipeline in a production environment involves completion of several mandatory procedures.

>**Note:** Before setting up a pipeline for a production environment, we recommend trying the [Pipeline Quick Start Guide]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/quick-start-guide).




### 1—Configuring Version Control Providers

Begin configuration of your pipeline by enabling authentication with your version control provider. Rancher Pipeline supports integration with GitHub and GitLab. 

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

>**Note:** If you use GitLab and your Rancher setup is in a local network, enable the **Allow requests to the local network from hooks and services** option in GitLab admin settings.
{{% /tab %}}
{{% /tabs %}}

**Result:** A pipeline is added to the project.

<!-- What happens if you change this value while builds are running? -->





### 2—Configuring Pipeline Stages and Steps

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

The **Run Script** step executes arbitrary commands in the workspace inside a specified container. You can use it to build, test and do more, given whatever utilities the base image provides. For your convenience you can use variables to refer to metadata of a pipeline execution. Please go to [reference page](/rancher/v2.x/en/tools/pipelines/reference/#variable-substitution) for the list of available vairables.

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

This step deploys arbitrary Kubernetes resources to the project. This deployment requires a Kubernetes manifest file to be present in the source code repository. Pipeline variable substitution is supported in the manifest file. You can view an example file at [GitHub](https://github.com/rancher/pipeline-example-go/blob/master/deployment.yaml). For available variables, refer to [Pipeline Variable Reference]({{< baseurl >}}rancher/v2.x/en/tools/pipelines/reference/).

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

### 3—Run Pipeline

Run your pipeline for the first time. From the **Pipeline** tab, find your pipeline and select **Ellipsis (...) > Run**.

During this initial run, your pipeline is tested, and the following [pipeline components](/Users/markbishop/Documents/GitHub/docs/content/rancher/v2.x/en/tools/pipelines/#how-pipelines-work) are deployed to your project as workloads in a new namespace dedicated to the pipeline:

- `docker-registry`
- `jenkins`
- `minio`

This process takes several minutes. When it completes, you can view each pipeline component from the project **Workloads** tab.

### 4—Configuring Persistent Data for Pipeline Components

The internal [Docker registry]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/#reg) and the [Minio]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/#minio) wokrloads use ephemeral volumes by default. This default storage works out-of-the-box and makes testing easy, but it does not help in cases of disaster recovery. We recommend that you to configure these two deployments to persist their data.

Complete both [A—Configuring Persistent Data for Docker Registry](#a—configuring-persistent-data-for-docker-registry) _and_ [B—Configuring Persistent Data for Minio](#b—configuring-persistent-data-for-minio).

>**Prerequisites (for both parts A and B):**
>
>[Persistent volumes]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#persistent-volumes) must be available for the cluster.

#### A—Configuring Persistent Data for Docker Registry


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

#### B—Configuring Persistent Data for Minio


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


### Configuring the Executor Quota

The executor quota decides how many builds can run simultaneously in the project. If the number of triggered builds exceeds the quota, subsequent builds will queue until a vacancy opens. By default, the quota is `2`, but you can change it.

1. From the context menu, open the project for which you've configured a pipeline.

1. From the main menu, select **Resources > Pipelines**.

1. From `The maximum number of pipeline executors` increment the **Scale** up or down to change the quota. A value of `0` or less removes the quota limit.


### Configuring Pipeline Trigger Rules

When a repository is enabled, a webhook for it is automatically set in the version control system. By default, the project pipeline is triggered by a push event to a specific repository, but you can add (or change) events that trigger a build, such as a pull request or a tagging.

Trigger rules come in two types:

- **Run this when:**

    This type of rule starts the pipeline, stage, or step when a trigger explicitly occurs.

- **Do Not Run this when:**
 
    If all conditions evaluate to true the pipeline/stage/step is executed, otherwise it is skipped. When a stage/step is skipped, it is considered as SUCCESS and follow-up stages/steps continue to run. Wildcard character(`*`) expansion is supported in conditions.


{{% tabs %}}
{{% tab "Pipeline Trigger" %}}
1. From the context menu, open the project for which you've configured a pipeline. Then select the **Pipelines** tab.

1. From the pipeline for which you want to edit build triggers, select **Ellipsis (...) > Edit Config**.

1. Click **Show advanced options**.

1. From **Trigger Rules**, configure rules to run or skip the pipeline, stage, or step.

    1.  Click **Add Rule**. In the **Value** field, enter the name of the branch that triggers the pipeline.

    1. **Optional:** Add more branches that trigger a build. 
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

### Configuring Timeouts

By default, A pipeline execution has 60 minutes timeout. 

{{% tabs %}}
{{% tab "By UI" %}}
1. Go to EditConfig view.

2. Click Show advanced options.

3. Input timeout value in minutes.
 
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

You can set environment variables to individual steps.

{{% tabs %}}
{{% tab "By UI" %}}
1. Go to a step's configuration page.

2. Click `Show advanced options`.

3. Under `Environment Variables` click `Add Variable` button.

4. Fill in the name/value of the variable.

5. Click `Save` 
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

You can use Kubernetes secrets from the project in your pipeline steps.

>**Note:** Secret injection is disabled on pull request events.

{{% tabs %}}
{{% tab "By UI" %}}
1. Go to the project page.

2. Under Resources menu, click Secrets.

3. Add a secret available to all namespaces in this project.

4. Go to `Edit Config` view of the pipeline, create or edit a Run Script step.

5. Click Show advanced options.

6. Click Add From Secret.

7. Choose the secret created above and choose the key. You can optionally input an alias.

8. Now the secret is injected as environment variables for this step. 
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
