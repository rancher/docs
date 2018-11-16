---
title: User-Defined Add-Ons
weight: 263
---

Besides the [network plug-in]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/network-plugins) and [ingress controllers]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/ingress-controllers/), you can define any add-on that you want deployed after the Kubernetes cluster is deployed.

There are two ways that you can specify an add-on.

- [In-line Add-ons](#in-line-add-ons)
- [Referencing YAML Files for Add-ons](#referencing-yaml-files-for-add-ons)

> **Note:** When using user-defined add-ons, you *must* define a namespace for *all* your resources, otherwise they will end up in the `kube-system` namespace.

RKE uploads the YAML manifest as a configmap to the Kubernetes cluster. Then, it runs a Kubernetes job that mounts the configmap and deploys the add-on using `kubectl apply -f`.

RKE only adds additional add-ons when using `rke up` multiple times. RKE does **not** support removing of cluster add-ons when doing `rke up` with a different list of add-ons.

As of v0.1.8, RKE will update an add-on if it is the same name.

Prior to v0.1.8, update any add-ons by by using `kubectl edit`.

## In-line Add-ons

To define an add-on directly in the YAML file, make sure to use the YAML's block indicator `|-` as the `addons` directive is a multi-line string option. It's possible to specify multiple YAML resource definitions by separating them using the `---` directive.

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

## Referencing YAML files for Add-ons
Use the `addons_include` directive to reference a local file or a URL for any user-defined add-ons.  

```yaml
addons_include:
    - https://raw.githubusercontent.com/rook/rook/master/cluster/examples/kubernetes/ceph/operator.yaml
    - https://raw.githubusercontent.com/rook/rook/master/cluster/examples/kubernetes/ceph/cluster.yaml
    - /opt/manifests/example.yaml
    - ./nginx.yaml
```
