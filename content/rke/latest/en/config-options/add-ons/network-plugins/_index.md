---
title: Network Plug-ins
weight: 261
---

RKE provides the following network plug-ins that are deployed as add-ons:

- Flannel
- Calico
- Canal
- Weave

By default, the network plug-in is `canal`. If you want to use another network plug-in, you need to specify which network plug-in to enable at the cluster level in the `cluster.yml`.

```yaml
# Setting the flannel network plug-in
network:
    plugin: flannel
```

The images used for network plug-ins are under the [`system_images` directive]({{< baseurl >}}/rke/latest/en/config-options/system-images/). For each Kubernetes version, there are default images associated with each network plug-in, but these can be overridden by changing the image tag in `system_images`.

# Disabling Deployment of a Network Plug-in

You can disable deploying a network plug-in by specifying `none` to the network `plugin` directive in the cluster configuration.

```yaml
network:
    plugin: none
```

# Network Plug-in Options

Besides the different images that could be used to deploy network plug-ins, certain network plug-ins support additional options that can be used to customize the network plug-in.

## Canal Network Plug-in Options

```yaml
network:
    plugin: canal
    options:
        canal_iface: eth1
        canal_flannel_backend_type: vxlan
```

#### Canal Interface

By setting the `canal_iface`, you can configure the interface to use for inter-host communication.
The `canal_flannel_backend_type` option allows you to specify the type of [flannel backend](https://github.com/coreos/flannel/blob/master/Documentation/backends.md) to use. By default the `vxlan` backend is used.

## Flannel Network Plug-in Options

```yaml
network:
    plugin: flannel
    options:
        flannel_iface: eth1
        flannel_backend_type: vxlan
```

#### Flannel Interface

By setting the `flannel_iface`, you can configure the interface to use for inter-host communication.
The `flannel_backend_type` option allows you to specify the type of [flannel backend](https://github.com/coreos/flannel/blob/master/Documentation/backends.md) to use. By default the `vxlan` backend is used.

## Calico Network Plug-in Options

```yaml
network:
    plugin: calico
    options:
        calico_cloud_provider: aws
```
#### Calico Cloud Provider

Calico currently only supports 2 cloud providers, AWS or GCE, which can be set using `calico_cloud_provider`.

**Valid Options**

- `aws`
- `gce`

## Weave Network Plug-in Options

```yaml
network:
    plugin: weave
    weave_network_provider:
        password: "Q]SZOQ5wp@n$oijz"
```

#### Weave encryption

Weave encryption can be enabled by passing a string password to the network provider config.


## Installing a Custom Network Plug-in

_Available as of v2.2.4_

You can add a network plug-in manifest via the add-ons section in the `cluster.yml`. 

To edit the network plug-ins, go to the Rancher UI, open the Clusters view and click **Ellipsis (...) > Edit** for the cluster in which you want to edit add-ons. Then click **Edit as YAML.**

Change the `network` section of the YAML from:

```
network: 
  options: 
    flannel_backend_type: "vxlan"
  plugin: "canal"
```
to:
```
network:
    plugin: none
```

Then, in the `addons` section of the YAML, add the entire `configmap` file of a cluster that has the network plugin-that you want.

An example `configmap` could look like the YAML snippet below. In this example, we are replacing the Canal plugin with a Flannel plugin by adding a new `configmap` for the cluster through the `addons` field:

```
addons: |-
    ---
    kind: ClusterRoleBinding
    apiVersion: rbac.authorization.k8s.io/v1
    metadata:
      name: flannel
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: ClusterRole
      name: flannel
    subjects:
    - kind: ServiceAccount
      name: flannel
      namespace: kube-system
    ---
    kind: ClusterRole
    apiVersion: rbac.authorization.k8s.io/v1
    metadata:
      name: flannel
    rules:
      - apiGroups:
          - ""
        resources:
          - pods
        verbs:
          - get
      - apiGroups:
          - ""
        resources:
          - nodes
        verbs:
          - list
          - watch
      - apiGroups:
          - ""
        resources:
          - nodes/status
        verbs:
          - patch
    ---
    kind: ConfigMap
    apiVersion: v1
    metadata:
      name: kube-flannel-cfg
      namespace: "kube-system"
      labels:
        tier: node
        app: flannel
    data:
      cni-conf.json: |
        {
          "name":"cbr0",
          "cniVersion":"0.3.1",
          "plugins":[
            {
              "type":"flannel",
              "delegate":{
                "forceAddress":true,
                "isDefaultGateway":true
              }
            },
            {
              "type":"portmap",
              "capabilities":{
                "portMappings":true
              }
            }
          ]
        }
      net-conf.json: |
        {
          "Network": "10.42.0.0/16",
          "Backend": {
            "Type": "vxlan"
          }
        }
    ---
    apiVersion: extensions/v1beta1
    kind: DaemonSet
    metadata:
      name: kube-flannel
      namespace: "kube-system"
      labels:
        tier: node
        k8s-app: flannel
    spec:
      template:
        metadata:
          labels:
            tier: node
            k8s-app: flannel
        spec:
          affinity:
            nodeAffinity:
              requiredDuringSchedulingIgnoredDuringExecution:
                nodeSelectorTerms:
                  - matchExpressions:
                    - key: beta.kubernetes.io/os
                      operator: NotIn
                      values:
                        - windows
          serviceAccountName: flannel
          containers:
          - name: kube-flannel
            image: rancher/coreos-flannel:v0.10.0-rancher1
            imagePullPolicy: IfNotPresent
            resources:
              limits:
                cpu: 300m
                memory: 500M
              requests:
                cpu: 150m
                memory: 64M
            command: ["/opt/bin/flanneld","--ip-masq","--kube-subnet-mgr"]
            securityContext:
              privileged: true
            env:
            - name: POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            volumeMounts:
            - name: run
              mountPath: /run
            - name: cni
              mountPath: /etc/cni/net.d
            - name: flannel-cfg
              mountPath: /etc/kube-flannel/
          - name: install-cni
            image: rancher/flannel-cni:v0.3.0-rancher1
            command: ["/install-cni.sh"]
            env:
            # The CNI network config to install on each node.
            - name: CNI_NETWORK_CONFIG
              valueFrom:
                configMapKeyRef:
                  name: kube-flannel-cfg
                  key: cni-conf.json
            - name: CNI_CONF_NAME
              value: "10-flannel.conflist"
            volumeMounts:
            - name: cni
              mountPath: /host/etc/cni/net.d
            - name: host-cni-bin
              mountPath: /host/opt/cni/bin/
          hostNetwork: true
          tolerations:
          - operator: Exists
            effect: NoSchedule
          - operator: Exists
            effect: NoExecute
          - key: node.kubernetes.io/not-ready
            effect: NoSchedule
            operator: Exists
          volumes:
            - name: run
              hostPath:
                path: /run
            - name: cni
              hostPath:
                path: /etc/cni/net.d
            - name: flannel-cfg
              configMap:
                name: kube-flannel-cfg
            - name: host-cni-bin
              hostPath:
                path: /opt/cni/bin
      updateStrategy:
        rollingUpdate:
          maxUnavailable: 20%
        type: RollingUpdate
    ---
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: flannel
      namespace: kube-system
```
**Result:** The cluster is up with the custom network plug-in. The above customizations have been applied to the `rancherKubernetesEngineConfig.`
