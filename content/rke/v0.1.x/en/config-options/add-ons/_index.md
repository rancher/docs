---
title: Add-Ons
weight: 3000
draft: true
---


RKE supports pluggable addons. Addons are used to deploy several cluster components including:
- Network plugin
- KubeDNS
- Ingress controller

In addition, a user can specify the addon yaml in the cluster.yml file, and when running

```yaml
rke up --config cluster.yml
```

RKE will deploy the addons yaml after the cluster starts, RKE first uploads this yaml file as a configmap in kubernetes cluster and then run a kubernetes job that mounts this config map and deploy the addons.

> Note that RKE doesn't support yet removal or update of the addons, so once they are deployed the first time you can't change them using rke

To start using addons use `addons:` option in the `cluster.yml` file for example:

```yaml
addons: |-
    ---
    apiVersion: v1
    kind: Pod
    metadata:
      name: my-nginx
      namespace: default
    spec:
      containers:
      - name: my-nginx
        image: nginx
        ports:
        - containerPort: 80
```

Note that we are using `|-` because the addons option is a multi line string option, where you can specify multiple yaml files and separate them with `---`

For `addons_include:` you may pass either http/https urls or file paths, for example:
```yaml
addons_include:
    - https://raw.githubusercontent.com/rook/rook/master/cluster/examples/kubernetes/rook-operator.yaml
    - https://raw.githubusercontent.com/rook/rook/master/cluster/examples/kubernetes/rook-cluster.yaml
    - /opt/manifests/example.yaml
    - ./nginx.yaml
```

#### Addon deployment jobs

RKE uses kubernetes Jobs to deploy addons. In some cases, addons deployment takes longer than expected. Starting with version `0.1.7-rc1`, RKE provides an option to controle the job check timeout in seconds:
```yaml
addon_job_timeout: 30
```

#### Critical and noncritical addons
As of version `0.1.7-rc1`, addons are split into two categories: critical and noncritical.

Critical addons will cause RKE to error out if they fail to deploy for any reason. While noncritical addons will just log a warning and continue with the deployment. Currently only the network plugin is considered critical.
