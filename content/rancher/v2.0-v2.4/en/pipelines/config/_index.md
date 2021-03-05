---
title: Pipeline Configuration Reference
weight: 1
aliases:
  - /rancher/v2.0-v2.4/en/k8s-in-rancher/pipelines/config
---

In this section, you'll learn how to configure pipelines.

- [Step Types](#step-types)
- [Step Type: Run Script](#step-type-run-script)
- [Step Type: Build and Publish Images](#step-type-build-and-publish-images)
- [Step Type: Publish Catalog Template](#step-type-publish-catalog-template)
- [Step Type: Deploy YAML](#step-type-deploy-yaml)
- [Step Type: Deploy Catalog App](#step-type-deploy-catalog-app)
- [Notifications](#notifications)
- [Timeouts](#timeouts)
- [Triggers and Trigger Rules](#triggers-and-trigger-rules)
- [Environment Variables](#environment-variables)
- [Secrets](#secrets)
- [Pipeline Variable Substitution Reference](#pipeline-variable-substitution-reference)
- [Global Pipeline Execution Settings](#global-pipeline-execution-settings)
  - [Executor Quota](#executor-quota)
  - [Resource Quota for Executors](#resource-quota-for-executors)
  - [Custom CA](#custom-ca)
- [Persistent Data for Pipeline Components](#persistent-data-for-pipeline-components)
- [Example rancher-pipeline.yml](#example-rancher-pipeline-yml)

# Step Types

Within each stage, you can add as many steps as you'd like. When there are multiple steps in one stage, they run concurrently.

Step types include:

- [Run Script](#step-type-run-script)
- [Build and Publish Images](#step-type-build-and-publish-images)
- [Publish Catalog Template](#step-type-publish-catalog-template)
- [Deploy YAML](#step-type-deploy-yaml)
- [Deploy Catalog App](#step-type-deploy-catalog-app)

<!--
### Clone

The first stage is preserved to be a cloning step that checks out source code from your repo. Rancher handles the cloning of the git repository. This action is equivalent to `git clone <repository_link> <workspace_dir>`.
-->

### Configuring Steps By UI

If you haven't added any stages, click **Configure pipeline for this branch** to configure the pipeline through the UI.

1. Add stages to your pipeline execution by clicking **Add Stage**.

   1. Enter a **Name** for each stage of your pipeline.
   1. For each stage, you can configure [trigger rules](#triggers-and-trigger-rules) by clicking on **Show Advanced Options**. Note: this can always be updated at a later time.

1. After you've created a stage, start [adding steps](#step-types) by clicking **Add a Step**. You can add multiple steps to each stage.

### Configuring Steps by YAML

For each stage, you can add multiple steps. Read more about each [step type](#step-types) and the advanced options to get all the details on how to configure the YAML. This is only a small example of how to have multiple stages with a singular step in each stage.

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
  - name: Publish my image
    steps:
    - publishImageConfig:
        dockerfilePath: ./Dockerfile
        buildContext: .
        tag: rancher/rancher:v2.0.0
        # Optionally push to remote registry
        pushRemote: true
        registry: reg.example.com
```
# Step Type: Run Script

The **Run Script** step executes arbitrary commands in the workspace inside a specified container. You can use it to build, test and do more, given whatever utilities the base image provides. For your convenience, you can use variables to refer to metadata of a pipeline execution. Please refer to the [pipeline variable substitution reference](#pipeline-variable-substitution-reference) for the list of available variables.

### Configuring Script by UI

1. From the **Step Type** drop-down, choose **Run Script** and fill in the form.

1. Click **Add**.

### Configuring Script by YAML
```yaml
# example
stages:
- name: Build something
  steps:
  - runScriptConfig:
      image: golang
      shellScript: go build
```
# Step Type: Build and Publish Images

_Available as of Rancher v2.1.0_

The **Build and Publish Image** step builds and publishes a Docker image. This process requires a Dockerfile in your source code's repository to complete successfully.

The option to publish an image to an insecure registry is not exposed in the UI, but you can specify an environment variable in the YAML that allows you to publish an image insecurely.

### Configuring Building and Publishing Images by UI
1. From the **Step Type** drop-down, choose **Build and Publish**.

1. Fill in the rest of the form. Descriptions for each field are listed below. When you're done, click **Add**.

    Field | Description |
    ---------|----------|
     Dockerfile Path | The relative path to the Dockerfile in the source code repo. By default, this path is `./Dockerfile`, which assumes the Dockerfile is in the root directory. You can set it to other paths in different use cases (`./path/to/myDockerfile` for example). |
     Image Name | The image name in `name:tag` format. The registry address is not required. For example, to build  `example.com/repo/my-image:dev`, enter `repo/my-image:dev`. |
     Push image to remote repository | An option to set the registry that publishes the image that's built.  To use this option, enable it and choose a registry from the drop-down. If this option is disabled, the image is pushed to the internal registry. |
     Build Context <br/><br/> (**Show advanced options**)| By default, the root directory of the source code (`.`). For more details, see the Docker [build command documentation](https://docs.docker.com/engine/reference/commandline/build/).

### Configuring Building and Publishing Images by YAML

You can use specific arguments for Docker daemon and the build. They are not exposed in the UI, but they are available in pipeline YAML format, as indicated in the example below. Available environment variables include:

Variable Name           | Description
------------------------|------------------------------------------------------------
PLUGIN_DRY_RUN          | Disable docker push
PLUGIN_DEBUG            | Docker daemon executes in debug mode
PLUGIN_MIRROR           | Docker daemon registry mirror
PLUGIN_INSECURE         | Docker daemon allows insecure registries
PLUGIN_BUILD_ARGS       | Docker build args, a comma separated list

<br>

```yaml
# This example shows an environment variable being used
# in the Publish Image step. This variable allows you to
# publish an image to an insecure registry:

stages:
- name: Publish Image
  steps:
  - publishImageConfig:
      dockerfilePath: ./Dockerfile
      buildContext: .
      tag: repo/app:v1
      pushRemote: true
      registry: example.com
    env:
      PLUGIN_INSECURE: "true"
```

# Step Type: Publish Catalog Template

_Available as of v2.2.0_

The **Publish Catalog Template** step publishes a version of a catalog app template (i.e. Helm chart) to a [git hosted chart repository]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/custom/). It generates a git commit and pushes it to your chart repository. This process requires a chart folder in your source code's repository and a pre-configured secret in the dedicated pipeline namespace to complete successfully. Any variables in the [pipeline variable substitution reference](#pipeline-variable-substitution-reference) is supported for any file in the chart folder.

### Configuring Publishing a Catalog Template by UI

1. From the **Step Type** drop-down, choose **Publish Catalog Template**.

1. Fill in the rest of the form. Descriptions for each field are listed below. When you're done, click **Add**.

    Field | Description |
    ---------|----------|
     Chart Folder | The relative path to the chart folder in the source code repo, where the `Chart.yaml` file is located. |
     Catalog Template Name | The name of the template. For example, wordpress. |
     Catalog Template Version | The version of the template you want to publish, it should be consistent with the version defined in the `Chart.yaml` file. |
     Protocol | You can choose to publish via HTTP(S) or SSH protocol. |
     Secret   | The secret that stores your Git credentials. You need to create a secret in dedicated pipeline namespace in the project before adding this step. If you use HTTP(S) protocol, store Git username and password in `USERNAME` and `PASSWORD` key of the secret. If you use SSH protocol, store Git deploy key in `DEPLOY_KEY` key of the secret. After the secret is created, select it in this option. |
     Git URL  | The Git URL of the chart repository that the template will be published to. |
     Git Branch | The Git branch of the chart repository that the template will be published to. |
     Author Name | The author name used in the commit message. |
     Author Email | The author email used in the commit message. |


### Configuring Publishing a Catalog Template by YAML

You can add **Publish Catalog Template** steps directly in the `.rancher-pipeline.yml` file.

Under the `steps` section, add a step with `publishCatalogConfig`. You will provide the following information:

* Path: The relative path to the chart folder in the source code repo, where the `Chart.yaml` file is located.
* CatalogTemplate: The name of the template.
* Version: The version of the template you want to publish, it should be consistent with the version defined in the `Chart.yaml` file.
* GitUrl: The git URL of the chart repository that the template will be published to.
* GitBranch: The git branch of the chart repository that the template will be published to.
* GitAuthor: The author name used in the commit message.
* GitEmail: The author email used in the commit message.
* Credentials: You should provide Git credentials by referencing secrets in dedicated pipeline namespace. If you publish via SSH protocol, inject your deploy key to the `DEPLOY_KEY` environment variable. If you publish via HTTP(S) protocol, inject your username and password to `USERNAME` and `PASSWORD` environment variables.

```yaml
# example
stages:
- name: Publish Wordpress Template
  steps:
  - publishCatalogConfig:
      path: ./charts/wordpress/latest
      catalogTemplate: wordpress
      version: ${CICD_GIT_TAG}
      gitUrl: git@github.com:myrepo/charts.git
      gitBranch: master
      gitAuthor: example-user
      gitEmail: user@example.com
    envFrom:
    - sourceName: publish-keys
      sourceKey: DEPLOY_KEY
```

# Step Type: Deploy YAML

This step deploys arbitrary Kubernetes resources to the project. This deployment requires a Kubernetes manifest file to be present in the source code repository. Pipeline variable substitution is supported in the manifest file. You can view an example file at [GitHub](https://github.com/rancher/pipeline-example-go/blob/master/deployment.yaml). Please refer to the [pipeline variable substitution reference](#pipeline-variable-substitution-reference) for the list of available variables.

### Configure Deploying YAML by UI

1. From the **Step Type** drop-down, choose **Deploy YAML** and fill in the form.

1. Enter the **YAML Path**, which is the path to the manifest file in the source code.

1. Click **Add**.

### Configure Deploying YAML by YAML

```yaml
# example
stages:
- name: Deploy
  steps:
  - applyYamlConfig:
      path: ./deployment.yaml
```

# Step Type :Deploy Catalog App

_Available as of v2.2.0_

The **Deploy Catalog App** step deploys a catalog app in the project. It will install a new app if it is not present, or upgrade an existing one.

### Configure Deploying Catalog App by UI

1. From the **Step Type** drop-down, choose **Deploy Catalog App**.

1. Fill in the rest of the form. Descriptions for each field are listed below. When you're done, click **Add**.

    Field | Description |
    ---------|----------|
     Catalog | The catalog from which the app template will be used. |
     Template Name | The name of the app template. For example, wordpress. |
     Template Version | The version of the app template you want to deploy. |
     Namespace | The target namespace where you want to deploy the app. |
     App Name  | The name of the app you want to deploy. |
     Answers   | Key-value pairs of answers used to deploy the app. |


### Configure Deploying Catalog App by YAML

You can add **Deploy Catalog App** steps directly in the `.rancher-pipeline.yml` file.

Under the `steps` section, add a step with `applyAppConfig`. You will provide the following information:

* CatalogTemplate: The ID of the template. This can be found by clicking `Launch app` and selecting `View details` for the app. It is the last part of the URL.
* Version: The version of the template you want to deploy.
* Answers: Key-value pairs of answers used to deploy the app.
* Name: The name of the app you want to deploy.
* TargetNamespace: The target namespace where you want to deploy the app.

```yaml
# example
stages:
- name: Deploy App
  steps:
  - applyAppConfig:
      catalogTemplate: cattle-global-data:library-mysql
      version: 0.3.8
      answers:
        persistence.enabled: "false"
      name: testmysql
      targetNamespace: test
```

# Timeouts

By default, each pipeline execution has a timeout of 60 minutes. If the pipeline execution cannot complete within its timeout period, the pipeline is aborted.

### Configuring Timeouts by UI

Enter a new value in the **Timeout** field.

### Configuring Timeouts by YAML

In the `timeout` section, enter the timeout value in minutes.

```yaml
# example
stages:
  - name: Build something
    steps:
    - runScriptConfig:
        image: busybox
        shellScript: ls
# timeout in minutes
timeout: 30
```

# Notifications

You can enable notifications to any [notifiers]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers/) based on the build status of a pipeline. Before enabling notifications, Rancher recommends [setting up notifiers]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/notifiers/) so it will be easy to add recipients immediately.

### Configuring Notifications by UI

_Available as of v2.2.0_

1. Within the **Notification** section, turn on notifications by clicking **Enable**.

1. Select the conditions for the notification. You can select to get a notification for the following statuses: `Failed`, `Success`, `Changed`. For example, if you want to receive notifications when an execution fails, select **Failed**.

1. If you don't have any existing [notifiers]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers), Rancher will provide a warning that no notifiers are set up and provide a link to be able to go to the notifiers page. Follow the [instructions]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/notifiers/) to add a notifier. If you  already have notifiers, you can add them to the notification by clicking the **Add Recipient** button.

    > **Note:** Notifiers are configured at a cluster level and require a different level of permissions.

1. For each recipient, select which notifier type from the dropdown. Based on the type of notifier, you can use the default recipient or override the recipient with a different one. For example, if you have a notifier for _Slack_, you can update which channel to send the notification to. You can add additional notifiers by clicking **Add Recipient**.

### Configuring Notifications by YAML
_Available as of v2.2.0_

In the `notification` section, you will provide the following information:

* **Recipients:** This will be the list of notifiers/recipients that will receive the notification.
  * **Notifier:** The ID of the notifier. This can be found by finding the notifier and selecting **View in API** to get the ID.
  * **Recipient:** Depending on the type of the notifier, the "default recipient" can be used or you can override this with a different recipient. For example, when configuring a slack notifier, you select a channel as your default recipient, but if you wanted to send notifications to a different channel, you can select a different recipient.
* **Condition:** Select which conditions of when you want the notification to be sent.
* **Message (Optional):** If you want to change the default notification message, you can edit this in the yaml. Note: This option is not available in the UI.

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

# Triggers and Trigger Rules

After you configure a pipeline, you can trigger it using different methods:

- **Manually:**

    After you configure a pipeline, you can trigger a build using the latest CI definition from Rancher UI. When a pipeline execution is triggered, Rancher dynamically provisions a Kubernetes pod to run your CI tasks and then remove it upon completion.

- **Automatically:**

    When you enable a repository for a pipeline, webhooks are automatically added to the version control system. When project users interact with the repo by pushing code, opening pull requests, or creating a tag, the version control system sends a webhook to Rancher Server, triggering a pipeline execution.

    To use this automation, webhook management permission is required for the repository. Therefore, when users authenticate and fetch their repositories, only those on which they have webhook management permission will be shown.

Trigger rules can be created to have fine-grained control of pipeline executions in your pipeline configuration. Trigger rules come in two types:

- **Run this when:** This type of rule starts the pipeline, stage, or step when a trigger explicitly occurs.

- **Do Not Run this when:** This type of rule skips the pipeline, stage, or step when a trigger explicitly occurs.

If all conditions evaluate to `true`, then the pipeline/stage/step is executed. Otherwise it is skipped. When a pipeline is skipped, none of the pipeline is executed. When a stage/step is skipped, it is considered successful and follow-up stages/steps continue to run.

Wildcard character (`*`) expansion is supported in `branch` conditions.

This section covers the following topics:

- [Configuring pipeline triggers](#configuring-pipeline-triggers)
- [Configuring stage triggers](#configuring-stage-triggers)
- [Configuring step triggers](#configuring-step-triggers)
- [Configuring triggers by YAML](#configuring-triggers-by-yaml)

### Configuring Pipeline Triggers

1. From the **Global** view, navigate to the project that you want to configure a pipeline trigger rule.

1. Click **Resources > Pipelines.** In versions before v2.3.0, click **Workloads > Pipelines.**

1. From the repository for which you want to manage trigger rules, select the vertical **&#8942; > Edit Config**.

1. Click on **Show Advanced Options**.

1. In the **Trigger Rules** section, configure rules to run or skip the pipeline.

    1.  Click **Add Rule**. In the **Value** field, enter the name of the branch that triggers the pipeline.

    1. **Optional:** Add more branches that trigger a build.

1. Click **Done.**

### Configuring Stage Triggers

1. From the **Global** view, navigate to the project that you want to configure a stage trigger rule.

1. Click **Resources > Pipelines.** In versions before v2.3.0, click **Workloads > Pipelines.**

1. From the repository for which you want to manage trigger rules, select the vertical **&#8942; > Edit Config**.

1. Find the **stage** that you want to manage trigger rules, click the **Edit** icon for that stage.

1. Click **Show advanced options**.

1. In the **Trigger Rules** section, configure rules to run or skip the stage.

    1.  Click **Add Rule**.

    1.  Choose the **Type** that triggers the stage and enter a value.

        | Type   | Value                                                                |
        | ------ | -------------------------------------------------------------------- |
        | Branch | The name of the branch that triggers the stage.                      |
        | Event  | The type of event that triggers the stage. Values are: `Push`, `Pull Request`, `Tag` |

1. Click **Save**.

### Configuring Step Triggers

1. From the **Global** view, navigate to the project that you want to configure a stage trigger rule.

1. Click **Resources > Pipelines.** In versions before v2.3.0, click **Workloads > Pipelines.**

1. From the repository for which you want to manage trigger rules, select the vertical **&#8942; > Edit Config**.

1. Find the **step** that you want to manage trigger rules, click the **Edit** icon for that step.

1. Click **Show advanced options**.

1. In the **Trigger Rules** section, configure rules to run or skip the step.

    1.  Click **Add Rule**.

    1.  Choose the **Type** that triggers the step and enter a value.

        | Type   | Value                                                                |
        | ------ | -------------------------------------------------------------------- |
        | Branch | The name of the branch that triggers the step.                      |
        | Event  | The type of event that triggers the step. Values are: `Push`, `Pull Request`, `Tag` |

1. Click **Save**.


### Configuring Triggers by YAML

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
  exclude: [ dev ]
```

# Environment Variables

When configuring a pipeline, certain [step types](#step-types) allow you to use environment variables to configure the step's script.

### Configuring Environment Variables by UI

1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Click **Resources > Pipelines.** In versions before v2.3.0, click **Workloads > Pipelines.**

1. From the pipeline for which you want to edit build triggers, select **&#8942; > Edit Config**.

1. Within one of the stages, find the **step** that you want to add an environment variable for, click the **Edit** icon.

1. Click **Show advanced options**.

1. Click **Add Variable**, and then enter a key and value in the fields that appear. Add more variables if needed.

1. Add your environment variable(s) into either the script or file.

1. Click **Save**.

### Configuring Environment Variables by YAML

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

# Secrets

If you need to use security-sensitive information in your pipeline scripts (like a password), you can pass them in using Kubernetes [secrets]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/secrets/).

### Prerequisite
Create a secret in the same project as your pipeline, or explicitly in the namespace where pipeline build pods run.
<br>

>**Note:** Secret injection is disabled on [pull request events](#triggers-and-trigger-rules).

### Configuring Secrets by UI

1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Click **Resources > Pipelines.** In versions before v2.3.0, click **Workloads > Pipelines.**

1. From the pipeline for which you want to edit build triggers, select **&#8942; > Edit Config**.

1. Within one of the stages, find the **step** that you want to use a secret for, click the **Edit** icon.

1. Click **Show advanced options**.

1. Click **Add From Secret**. Select the secret file that you want to use. Then choose a key. Optionally, you can enter an alias for the key.

1. Click **Save**.

### Configuring Secrets by YAML

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

# Pipeline Variable Substitution Reference

For your convenience, the following variables are available for your pipeline configuration scripts. During pipeline executions, these variables are replaced by metadata. You can reference them in the form of `${VAR_NAME}`.

Variable Name           | Description
------------------------|------------------------------------------------------------
`CICD_GIT_REPO_NAME`      | Repository name (Github organization omitted).
`CICD_GIT_URL`            | URL of the Git repository.
`CICD_GIT_COMMIT`         | Git commit ID being executed.
`CICD_GIT_BRANCH`         | Git branch of this event.
`CICD_GIT_REF`            | Git reference specification of this event.
`CICD_GIT_TAG`            | Git tag name, set on tag event.
`CICD_EVENT`              | Event that triggered the build (`push`, `pull_request` or `tag`).
`CICD_PIPELINE_ID`        | Rancher ID for the pipeline.
`CICD_EXECUTION_SEQUENCE` | Build number of the pipeline.
`CICD_EXECUTION_ID`       | Combination of `{CICD_PIPELINE_ID}-{CICD_EXECUTION_SEQUENCE}`.
`CICD_REGISTRY`           | Address for the Docker registry for the previous publish image step, available in the Kubernetes manifest file of a `Deploy YAML` step.
`CICD_IMAGE`              | Name of the image built from the previous publish image step, available in the Kubernetes manifest file of a `Deploy YAML` step. It does not contain the image tag.<br/><br/> [Example](https://github.com/rancher/pipeline-example-go/blob/master/deployment.yaml)

# Global Pipeline Execution Settings

After configuring a version control provider, there are several options that can be configured globally on how pipelines are executed in Rancher. These settings can be edited by selecting **Tools > Pipelines** in the navigation bar. In versions before v2.2.0, you can select **Resources > Pipelines**.

- [Executor Quota](#executor-quota)
- [Resource Quota for Executors](#resource-quota-for-executors)
- [Custom CA](#custom-ca)

### Executor Quota

Select the maximum number of pipeline executors. The _executor quota_ decides how many builds can run simultaneously in the project. If the number of triggered builds exceeds the quota, subsequent builds will queue until a vacancy opens. By default, the quota is `2`. A value of `0` or less removes the quota limit.

### Resource Quota for Executors

_Available as of v2.2.0_

Configure compute resources for Jenkins agent containers. When a pipeline execution is triggered, a build pod is dynamically provisioned to run your CI tasks. Under the hood, A build pod consists of one Jenkins agent container and one container for each pipeline step. You can [manage compute resources](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/) for every containers in the pod.

Edit the **Memory Reservation**, **Memory Limit**, **CPU Reservation** or **CPU Limit**, then click **Update Limit and Reservation**.

To configure compute resources for pipeline-step containers:

You can configure compute resources for pipeline-step containers in the `.rancher-pipeline.yml` file.

In a step, you will provide the following information:

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

### Custom CA  

_Available as of v2.2.0_

If you want to use a version control provider with a certificate from a custom/internal CA root, the CA root certificates need to be added as part of the version control provider configuration in order for the pipeline build pods to succeed.

1. Click **Edit cacerts**.

1. Paste in the CA root certificates and click **Save cacerts**.

**Result:** Pipelines can be used and new pods will be able to work with the self-signed-certificate.

# Persistent Data for Pipeline Components

The internal Docker registry and the Minio workloads use ephemeral volumes by default. This default storage works out-of-the-box and makes testing easy, but you lose the build images and build logs if the node running the Docker Registry or Minio fails. In most cases this is fine. If you want build images and logs to survive node failures, you can configure the Docker Registry and Minio to use persistent volumes.

For details on setting up persistent storage for pipelines, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/pipelines/storage)

# Example rancher-pipeline.yml

An example pipeline configuration file is on [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/pipelines/example)
