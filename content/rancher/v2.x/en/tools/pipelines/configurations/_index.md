---
title: Configuring Pipelines
weight: 3725
---
<!-- TODO: 

-[] Add steps for configuring repo -->
Configuring a pipeline automates the process of triggering and publishing builds. This section describes how to set up a pipeline in a production environment. 

- The [Basic Configuration](#basic-configuration) section provides sequential instruction on how to configure a functional pipeline.
- The [Advanced Configuration](#advanced-configuration) section provides instructions for configuring pipeline options.

>**Note:** Before setting up a pipeline for a production environment, we recommend trying the [Pipeline Quick Start Guide]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/quick-start-guide).

## Pipeline Configuration Outline

Initial configuration of a pipeline in a production environment involves completion of several mandatory procedures.

<!-- TOC -->


- [1—Configuring Persistent Data for Pipeline Components](#1—configuring-persistent-data-for-pipeline-components)
- [2—Configuring Version Control Providers](#2—configuring-version-control-providers)
- [3—Configuring Pipeline Steps](#3—configuring-pipeline-steps)
- [Advanced Configuration](#advanced-configuration)

<!-- /TOC -->
## Basic Configuration

To configure a functional pipeline for your project, begin by completing the mandatory basic configuration steps.

### 1—Configuring Persistent Data for Pipeline Components

The internal [Docker registry]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/#reg) and the [Minio]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/#minio) store use ephemeral volumes by default. This default storage works out-of-the-box and makes testing easy, but it does not help in cases of disaster recovery. We recommend that you to configure these two deployments to persist their data.

Complete both [A—Configuring Persistent Data for Docker Registry](#a—configuring-persistent-data-for-docker-registry) _and_ [B—Configuring Persistent Data for Minio](#b—configuring-persistent-data-for-minio).

>**Prerequisites (for both parts A and B):**
>
>- Pipeline components are deployed in the project. <!-- TODO: link -->
>- [Persistent volumes]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#persistent-volumes) are available in the cluster.

#### A—Configuring Persistent Data for Docker Registry


1. From the context menu, open the project for which you're going to create a pipeline. Then select the **Workloads** tab.

1. Find the `docker-registry` workload and select **Ellipsis (...) > Edit**.

1. Expand the **Volumes** section. Make one of the following selections from the **Add Volume** menu:

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

1. Expand the **Volumes** section. Make one of the following selections from the **Add Volume** menu:

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



### 2—Configuring Version Control Providers

Rancher Pipeline supports integration with version control providers GitHub and GitLab.

{{% tabs %}}
{{% tab "GitHub" %}}
1. From the context menu, open the project for which you're configuring a pipeline. 

1. From the main menu, select **Resources > Pipelines**.

1. Follow the directions displayed to setup a GitHub application.

    ![GitHub Pipeline Instructions]({{< baseurl >}}/img/rancher/github-pipeline.png)

1. From GitHub, copy the **Client ID** and **Client Secret**. Paste them into Rancher.

1. If you're using GitHub for enterprise setup, select **Use a private github enterprise installation**. Enter the host address of your GitHub installation.

1. Click **Authenticate**. 
{{% /tab %}}
{{% tab "GitLab" %}}
1. From the context menu, open the project for which you're configuring a pipeline. 

1. From the main menu, select **Resources > Pipelines**.

1. Follow the directions displayed to setup a GitLab application.

    ![GitLab Pipeline Instructions]({{< baseurl >}}/img/rancher/gitlab-pipeline.png)

1. From GitLab, copy the **Application ID** and **Secret**. Paste them into Rancher.

1. If you're using GitLab for enterprise setup, select **Use a private gitlab enterprise installation**. Enter the host address of your GitLab installation.

1. Click **Authenticate**. 

>**Note:** If you use GitLab and your Rancher setup is in a local network, enable the **Allow requests to the local network from hooks and services** option in GitLab admin settings.
{{% /tab %}}
{{% /tabs %}}

<!-- What happens if you change this value while builds are running? -->

### 3—Configuring Pipeline Steps

For convenience, there are multiple built-in step types for dedicated tasks.

#### Clone Step Type

The first step is preserved to be a cloning step to check out the source code.

#### Run Script Step Type

`Run Script` step is to execute arbitrary commands inside a specified container. You can use it to build, test and do more, given whatever utilities the base image provides.

{{% tabs %}}
{{% tab "By UI" %}}
1. Go to EditConfig view.

2. Click `Add a Step` in a stage.

3. Choose `Run Script` in `Step Type` option, fill in an image and the commands in the form. You can optionally set environment variables and conditions by expanding advanced options.

4. Click `Add` 
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

#### Build and Publish Image Step

`Publish Image` step is to build and publish a docker image. To do that a Dockerfile is required to be present in the source code repository.

{{% tabs %}}
{{% tab "By UI" %}}
1. Go to EditConfig view.

1. Click `Add a Step` in a stage.

1. Choose `Build and Publish Image` in `Step Type` option.

1. Fill in the configuration form:
  - `Dockerfile Path` is the relative path to the Dockerfile in the source code repo. It is `./Dockerfile` as default and suits the case when you put the Dockerfile in the root directory. You can, for example, set it to `./path/to/myDockerfile` in other cases.
  - `Image Name` is the image name in 'name:tag' format. It doesn't need to contain the registry address. For example, to build  `example.com/repo/my-image:dev`, input `repo/my-image:dev` here.
  - `Push image to remote repository` option is to tell what registry to publish the built image. If it is disabled, the built image will be pushed to the internal registry. Or you can enable it and choose a registry from registry list of the project as the publish target.
  - `Build Context` configuration is in advanced options. It is by default `.` representing the root directory of the source code. For more details please refer to [docs for docker build](https://docs.docker.com/engine/reference/commandline/build/)

1. Click `Add` 
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
You can use specific arguments for docker daemon and the build. They are not exposed in the UI but are available in pipeline yaml format, as indicated in the above example. Available variables includes:

Variable Name           | Description
------------------------|------------------------------------------------------------
PLUGIN_DRY_RUN          | Disable docker push
PLUGIN_DEBUG            | Docker daemon executes in debug mode
PLUGIN_MIRROR           | Docker daemon registry mirror
PLUGIN_INSECURE         | Docker daemon allows insecure registries
PLUGIN_BUILD_ARGS       | Docker build args, a comma separated list 
{{% /tab %}}
{{% /tabs %}}

#### Deploy YAML Step Type

`Deploy YAML` step is to deploy arbitrary Kubernetes resources inside the project. To do that a Kubernetes manifest file is required to be present in the source code repository. Pipeline variable substitution is supported in the manifest file. For available variables please refer to [variable reference](https://TODO).

{{% tabs %}}
{{% tab "By UI" %}}
1. Go to EditConfig view.

2. Click `Add a Step` in a stage.

3. Choose `Deploy YAML` in `Step Type` option, fill in `YAML Path` which is the path to the manifest file in the source code.

4. Click `Add` 
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




## Advanced Configuration

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

### Timeout

By default, A pipeline execution has 60 minutes timeout. To change that,

1. Go to EditConfig view.

2. Click Show advanced options.

3. Input timeout value in minutes.

Or in yaml format:

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

### Environment Variables

You can set environment variables to individual steps.

1. Go to a step's configuration page.

2. Click `Show advanced options`.

3. Under `Environment Variables` click `Add Variable` button.

4. Fill in the name/value of the variable.

5. Click `Save`

Or in yaml format:

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

### Secrets

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
