---
title: Configurations
weight: 3725
---

## Data Persistency for Pipeline Components

The internal docker registry and the Minio store use ephemeral volumes by default. Therefore, it can be easily setup for testing and works out of the box, but it does not help for disaster recovery. We recommend users to configure these two deployments to persist their data.

### Docker registry

Prerequisites: 

 - Pipeline components are deployed in the project; 
 - Persistent Volumes are available in the cluster.

1. Go to the workload tab of the project.

2. Find the registry workload with the name `docker-registry` under dedicated `xxx-pipeline` namespace.

3. Edit `docker-registry` workload.

4. Expand `Volumes` bar in workload configuration page.

5. Click `Add Mount`

6. Click `Add a new persistent volume(claim)` or `Use an existing persistent volume(claim)`, depending on the the PV management way you are using.

7. After the new volume calim is defined, or an existing PVC is chosen, input `/var/lib/registry` in `Mount Point` field, which is the data storage path inside docker registry container.

8. Click `Upgrade`

### Minio

Prerequisites:

 - Pipeline components are deployed in the project;
 - Persistent Volumes are available in the cluster.

1. Go to the workload tab of the project.

2. Find the Minio workload with the name `minio` under dedicated `xxx-pipeline` namespace.

3. Edit `minio` workload.

4. Expand `Volumes` bar in workload configuration page.

5. Click `Add Mount`

6. Click `Add a new persistent volume(claim)` or `Use an existing persistent volume(claim)`, depending on the the PV management way you are using.

7. After the new volume calim is defined, or an existing PVC is chosen, input `/data` in `Mount Point` field, which is the data storage path inside Minio container.

8. Click `Upgrade`


## Version Control Providers


Rancher Pipeline supports for integration with version control providers including GitHub and GitLab.

### GitHub

1. Go to the project that you want to run pipelines.

2. Under resources menu select pipeline.

3. Follow the directions displayed to Setup a GitHub Application.

4. From GitHub, copy the Client ID and Client Secret. Paste them into Rancher.

5. For GitHub enterprise setup, enable the `Use a private github enterprise installation` option. Fill in the host address of your GitHub installation.

6. Click Authenticate.


### GitLab

1. Go to the project that you want to run pipelines.

2. Under resources menu select pipeline.

3. Follow the directions displayed to Setup a GitLab Application.

4. From GitLab, copy the Client ID and Client Secret. Paste them into Rancher.

5. For private GitLab setup, enable the `Use a private gitlab enterprise installation` option. Fill in the host address of your GitLab installation.

6. Click Authenticate.

>**Note:** If you use GitLab and your rancher setup is in a local network, make sure to enable ‘Allow requests to the local network from hooks and services’ option in GitLab admin settings.

## Executor Quota

Executor quota decides how many builds can be running simultaneously in the project. If the number of triggered builds exceeds the quota, excess builds will be kept in queueing state until there is a vacant slot for it. By default, the quota is 2.

To change that,

1. Go to the project as a project owner.

2. Under resources menu select pipeline.

3. Under `The maximum number of pipeline executors` setting click the button to change the quota. A number less than or equal to zero stands for unlimited quota.


## Pipeline Trigger

When a repository is enabled, the webhook is automatically set in version control system. By default, pipeline trigger for "push" event is enabled.

To change that,

1. Go to the pipeline tab of a project.

2. For an enabled repository, click and expand the action button on the right.

3. Click `Settting`

4. On the pop-up window, toggle trigger for "Push", "Push Request" and "Tag" events according to your need.

5. Click `Save`


## Pipeline Steps

For convenience, there are multiple built-in step types for dedicated tasks.

### Clone step

The first step is preserved to be a cloning step to check out the source code. Rancher handles the cloning of the git repository. It is the equivalent of a `git clone <repository_link> <workspace_dir>`.

### Run Script step

`Run Script` step is to execute arbitrary commands in the workspace inside a specified container. You can use it to build, test and do more, given whatever utilities the base image provides. For your convenience you can use variables to refer to metadata of a pipeline execution. Please go to [reference page](/rancher/v2.x/en/tools/pipelines/reference/#variable-substitution) for the list of available vairables.

To add a `Run Script` step,

1. Go to EditConfig view.

2. Click `Add a Step` in a stage.

3. Choose `Run Script` in `Step Type` option, fill in an image and the commands in the form. You can optionally set environment variables and conditions by expanding advanced options.

4. Click `Add`

Or in yaml format:

```yaml
# example
stages:
- name: Build something
  steps:
  - runScriptConfig:
      image: golang
      shellScript: go build
```

### Publish Image step

`Publish Image` step is to build and publish a docker image. To do that a Dockerfile is required to be present in the source code repository.

To add a `Publish Image` step,

1. Go to EditConfig view.

2. Click `Add a Step` in a stage.

1. Choose `Build and Publish Image` in `Step Type` option.

2. Fill in the configuration form:
  - `Dockerfile Path` is the relative path to the Dockerfile in the source code repo. It is `./Dockerfile` as default and suits the case when you put the Dockerfile in the root directory. You can, for example, set it to `./path/to/myDockerfile` in other cases.
  - `Image Name` is the image name in 'name:tag' format. It doesn't need to contain the registry address. For example, to build  `example.com/repo/my-image:dev`, input `repo/my-image:dev` here.
  - `Push image to remote repository` option is to tell what registry to publish the built image. If it is disabled, the built image will be pushed to the internal registry. Or you can enable it and choose a registry from registry list of the project as the publish target.
  - `Build Context` configuration is in advanced options. It is by default `.` representing the root directory of the source code. For more details please refer to [docs for docker build](https://docs.docker.com/engine/reference/commandline/build/)

3. Click `Add`

Or in yaml format:

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
    # additional docker daemon options and build args
    env:
      PLUGIN_INSECURE: "true"
      PLUGIN_BUILD_ARGS: "myVar=value"
```
You can use specific arguments for docker daemon and the build. They are not exposed in the UI but are available in pipeline yaml format, as indicated in the above example. Available variables includes:

Variable Name           | Description
------------------------|------------------------------------------------------------
PLUGIN_DRY_RUN          | Disable docker push
PLUGIN_MIRROR           | Docker daemon registry mirror
PLUGIN_INSECURE         | Docker daemon allows insecure registries
PLUGIN_BUILD_ARGS       | Docker build args


### Deploy YAML step

`Deploy YAML` step is to deploy arbitrary Kubernetes resources inside the project. To do that a Kubernetes manifest file is required to be present in the source code repository. Pipeline variable substitution is supported in the manifest file. For available variables please refer to [variable reference](https://TODO).

To add a `Deploy YAML` step,

1. Go to EditConfig view.

2. Click `Add a Step` in a stage.

3. Choose `Deploy YAML` in `Step Type` option, fill in `YAML Path` which is the path to the manifest file in the source code.

4. Click `Add`

Or in yaml format:

```yaml
# example
stages:
- name: Deploy
  steps:
  - applyYamlConfig:
      path: ./deployment.yaml
```

## Conditions

You can set conditions for a pipeline/stage/step. If all conditions evaluate to true the pipeline/stage/step is executed, otherwise it is skipped. When a stage/step is skipped, it is considered as SUCCESS and follow-up stages/steps continue to run. Wildcard character(`*`) expansion is supported in conditions.

To set branch conditions of a pipeline,

1. Go to EditConfig view.

2. Click Show advanced options for the pipeline configuration.

3. Click Add Rule button in Trigger Rules to set rules for branch conditions.

For a stage/step,

1. Click on a stage or a step.

2. Click Show advanced options.

3. Click Add Rule button in Trigger Rules.

4. Choose Branch or Event in Type drop-down, input Value for branch conditions, or choose Value for event conditions.

Or in yaml format:

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

## Timeout

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

## Environment Variables

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

## Secrets

You can use Kubernetes secrets from the project in your pipeline steps.

>**Note:** Secret injection is disabled on pull request events.

1. Go to the project page.

2. Under Resources menu, click Secrets.

3. Add a secret available to the dedicated `xxx-pipeline` namespace in this project.

4. Go to `Edit Config` view of the pipeline, create or edit a Run Script step.

5. Click Show advanced options.

6. Click Add From Secret.

7. Choose the secret created above and choose the key. You can optionally input an alias.

8. Now the secret is injected as environment variables for this step.

Or in yaml format:

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