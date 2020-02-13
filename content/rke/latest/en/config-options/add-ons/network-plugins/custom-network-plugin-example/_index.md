---
title: Custom Network Plug-in Example
weight: 1
---

The below example shows how to configure a custom network plug-in with an in-line add-on to the `cluster.yml`.

First, to edit the network plug-ins, change the `network` section of the YAML from:

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

Then, in the `addons` section of the `cluster.yml`, you can add the add-on manifest of a cluster that has the network plugin-that you want. In the below example, we are replacing the Canal plugin with a Flannel plugin by adding the add-on manifest for the cluster through the `addons` field:

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
**Result:** The cluster is up with the custom network plug-in.