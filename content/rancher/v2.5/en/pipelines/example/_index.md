---
title: Example YAML File
weight: 501
aliases:
  - /rancher/v2.5/en/tools/pipelines/reference/
  - /rancher/v2.5/en/k8s-in-rancher/pipelines/example
---

Pipelines can be configured either through the UI or using a yaml file in the repository, i.e. `.rancher-pipeline.yml` or `.rancher-pipeline.yaml`.

In the [pipeline configuration reference]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/pipelines/config), we provide examples of how to configure each feature using the Rancher UI or using YAML configuration.

Below is a full example `rancher-pipeline.yml` for those who want to jump right in.

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
        shellScript: echo ${FIRST_KEY} && echo ${ALIAS_ENV}
      # Set environment variables in container for the step
      env:
        FIRST_KEY: VALUE
        SECOND_KEY: VALUE2
      # Set environment variables from project secrets
      envFrom:
      - sourceName: my-secret
        sourceKey: secret-key
        targetKey: ALIAS_ENV
    - runScriptConfig:
        image: busybox
        shellScript: date -R
      # Conditions for steps
      when:
        branch: [ master, dev ]
        event: push
  - name: Publish my image
    steps:
    - publishImageConfig:
        dockerfilePath: ./Dockerfile
        buildContext: .
        tag: rancher/rancher:v2.0.0
        # Optionally push to remote registry
        pushRemote: true
        registry: reg.example.com
  - name: Deploy some workloads
    steps:
    - applyYamlConfig:
        path: ./deployment.yaml
# branch conditions for the pipeline
branch:
  include: [ master, feature/*]
  exclude: [ dev ]
# timeout in minutes
timeout: 30
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
