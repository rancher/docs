---
title: Add-Ons
weight: 3000
draft: true
---


RKE supports pluggable add-ons. Addons are used to deploy several cluster components including:
- Network plugin
- KubeDNS
- Ingress controller

In addition, a user can specify an addon yaml manifests in the cluster.yml file. RKE will deploy the user-defined add-ons after the cluster  deployment is complete.

RKE first uploads the yaml manifest as a configmap to the Kubernetes cluster. Next, it will run a kubernetes job that mounts this configmap and deploy the addon by running `kubectl apply -f`.

> **Note: RKE doesn't support removal or update of cluster add-ons when doing `rke up` with a different list of add-ons. Please update the add-ons by using `kubectl edit`.**



#### Critical and non-critical add-ons
As of version `0.1.7`, add-ons are split into two categories:

- **Critical add-ons:** If these add-ons fail to deploy for any reason, RKE will error out.
- **Non-critical add-ons:** If these add-ons fail to deploy, RKE will only log a warning and continue deploying other add-ons.


Currently, only the network plugin is considered critical. KubeDNS, Ingress and user-defined add-ons are considered non-critical.

## Defining User Addons

User defined add-ons can be added by either defining the yaml directly in the RKE config or pointing to a file. Adding a yaml directly into the file uses the `addons` directive, while pointing to a file uses the `addons_include:` directive.

> **Note**: When using user-defined add-ons, you *must* define a namespace for *all* your resources, otherwise they will end up in the `kube-system` namespace.

##### In-line Addons
To define an add-on directly in the yaml file, make sure to use the yaml's block indicator `|-` as the `addons` directive is a multi-line string option. It's possible to specify multiple yaml resource definitions by separating them using the `---` directive.

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


#### Referencing files for Add-ons

User defined add-ons support referencing a local file or a URL.

```yaml
addons_include:
    - https://raw.githubusercontent.com/rook/rook/master/cluster/examples/kubernetes/rook-operator.yaml
    - https://raw.githubusercontent.com/rook/rook/master/cluster/examples/kubernetes/rook-cluster.yaml
    - /opt/manifests/example.yaml
    - ./nginx.yaml
```


#### Addon deployment jobs

RKE uses kubernetes Jobs to deploy add-ons. In some cases, add-ons deployment takes longer than expected. Starting with version `0.1.7-rc1`, RKE provides an option to control the job check timeout in seconds:
```yaml
addon_job_timeout: 30
```
