---
title: Hardening Guide v2.3.4
weight: 100
---

This document provides prescriptive guidance for hardening a production installation of Rancher v2.3.4. It outlines the configurations and controls required to address Kubernetes benchmark controls from the Center for Information Security (CIS).

> This hardening guide describes how to secure the nodes in your cluster, and it is recommended to follow this guide before installing Kubernetes.

This hardening guide is intended to be used with specific versions of the CIS Kubernetes Benchmark, Kubernetes, and Rancher:

Hardening Guide Version | Rancher Version | CIS Benchmark Version | Kubernetes Version
------------------------|----------------|-----------------------|------------------
Hardening Guide v2.3.4 | Rancher v2.3.4 | Benchmark v1.5 | Kubernetes 1.15


[Click here to download a PDF version of this document](https://releases.rancher.com/documents/security/2.3.4/Rancher_Hardening_Guide.pdf)

### Overview

This document provides prescriptive guidance for hardening a production installation of Rancher v2.3.4 with Kubernetes v1.15. It outlines the configurations required to address Kubernetes benchmark controls from the Center for Information Security (CIS).

For more detail about evaluating a hardened cluster against the official CIS benchmark, refer to the [CIS Benchmark Rancher Self-Assessment Guide - Rancher v2.3.4]({{< baseurl >}}/rancher/v2.x/en/security/benchmark-2.3.4/).

### Configure Kernel Runtime Parameters

The folowing `sysctl` configuration is recommended for all nodes type in the cluster. Set the following parameters in `/etc/sysctl.d/90-kubelet.conf`:

``` bash
vm.overcommit_memory=1
vm.panic_on_oom=0
kernel.panic=10
kernel.panic_on_oops=1
kernel.keys.root_maxkeys=1000000
kernel.keys.root_maxbytes=25000000
```

Run `sysctl -p /etc/sysctl.d/90-kubelet.conf` to enable the settings.

### Configuration Files and Permissions.

#### kubelet.conf

**path**: /etc/sysctl.d/kubelet.conf

**owner**: root:root

**permissions:** 0644

**contents**:

``` text
vm.overcommit_memory=1
kernel.panic=10
kernel.panic_on_oops=1
```

#### admission.yaml

**path**: /opt/kubernetes/admission.yaml

**owner**: root:root

**permissions**: 0600

**content**:

``` yaml
apiVersion: apiserver.k8s.io/v1alpha1
kind: AdmissionConfiguration
plugins:
- name: EventRateLimit
  path: /opt/kubernetes/event.yaml
```

#### event.yaml

**path**: /opt/kubernetes/event.yaml

**owner**: root:root

**permissions**: 0600

**content**: 

``` yaml
apiVersion: eventratelimit.admission.k8s.io/v1alpha1
kind: Configuration
limits:
- type: Server
  qps: 5000
  burst: 20000
```

#### encryption.yaml

**path**: /opt/kubernetes/encryption.yaml

**owner**: root:root

**permissions**: 0600

**content**:

``` yaml
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
    - secrets
    providers:
    - aescbc:
      keys:
      - name: key1
        secret: <BASE 64 ENCODED SECRET>
    - identity: {}
```


#### audit.yaml

**path**: /opt/kubernetes/audit.yaml

**owner**: root:root

**permissions**: 0600

**content**:

``` yaml 
apiVersion: audit.k8s.io/v1beta1
kind: Policy
rules:
- level: Metadata

```

### Configure `etcd` user and `data-dir` permissions

#### create `etcd` user and `group`

```
addgroup --gid 52034 etcd
useradd --comment "etcd service account" --uid 52034 --gid 52034 etcd
```

#### create `data-dir` and set permissions
```
mkdir -p /var/lib/etcd && chown etcd.etcd /var/lib/etcd && chmod 0700 /var/lib/etcd
```


### Hardened RKE `config.yml` configuration 

``` yaml
# 
# Cluster Config
# 
docker_root_dir: /var/lib/docker
enable_cluster_alerting: false
enable_cluster_monitoring: false
enable_network_policy: false
# 
# Rancher Config
# 
rancher_kubernetes_engine_config:
  addon_job_timeout: 30
  addons: |-
    ---
    apiVersion: v1
    kind: Namespace
    metadata:
      name: ingress-nginx
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      name: default-psp-role
      namespace: ingress-nginx
    rules:
    - apiGroups:
      - extensions
      resourceNames:
      - default-psp
      resources:
      - podsecuritypolicies
      verbs:
      - use
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
      name: default-psp-rolebinding
      namespace: ingress-nginx
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: Role
      name: default-psp-role
    subjects:
    - apiGroup: rbac.authorization.k8s.io
      kind: Group
      name: system:serviceaccounts
    - apiGroup: rbac.authorization.k8s.io
      kind: Group
      name: system:authenticated
    ---
    apiVersion: v1
    kind: Namespace
    metadata:
      name: cattle-system
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      name: default-psp-role
      namespace: cattle-system
    rules:
    - apiGroups:
      - extensions
      resourceNames:
      - default-psp
      resources:
      - podsecuritypolicies
      verbs:
      - use
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
      name: default-psp-rolebinding
      namespace: cattle-system
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: Role
      name: default-psp-role
    subjects:
    - apiGroup: rbac.authorization.k8s.io
      kind: Group
      name: system:serviceaccounts
    - apiGroup: rbac.authorization.k8s.io
      kind: Group
      name: system:authenticated
    ---
    apiVersion: extensions/v1beta1
    kind: PodSecurityPolicy
    metadata:
      name: restricted
    spec:
      requiredDropCapabilities:
      - NET_RAW
      privileged: false
      allowPrivilegeEscalation: false
      defaultAllowPrivilegeEscalation: false
      fsGroup:
        rule: RunAsAny
      runAsUser:
        rule: MustRunAsNonRoot
      seLinux:
        rule: RunAsAny
      supplementalGroups:
        rule: RunAsAny
      volumes:
      - emptyDir
      - secret
      - persistentVolumeClaim
      - downwardAPI
      - configMap
      - projected
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRole
    metadata:
      name: psp:restricted
    rules:
    - apiGroups:
      - extensions
      resourceNames:
      - restricted
      resources:
      - podsecuritypolicies
      verbs:
      - use
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRoleBinding
    metadata:
      name: psp:restricted
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: ClusterRole
      name: psp:restricted
    subjects:
    - apiGroup: rbac.authorization.k8s.io
      kind: Group
      name: system:serviceaccounts
    - apiGroup: rbac.authorization.k8s.io
      kind: Group
      name: system:authenticated
    ---
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: tiller
      namespace: kube-system
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRoleBinding
    metadata:
      name: tiller
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: ClusterRole
      name: cluster-admin
    subjects:
    - kind: ServiceAccount
      name: tiller
      namespace: kube-system
  ignore_docker_version: true
  kubernetes_version: v1.15.6-rancher1-2
# 
#   If you are using calico on AWS
# 
#    network:
#      plugin: calico
#      calico_network_provider:
#        cloud_provider: aws
# 
# # To specify flannel interface
# 
#    network:
#      plugin: flannel
#      flannel_network_provider:
#      iface: eth1
# 
# # To specify flannel interface for canal plugin
# 
#    network:
#      plugin: canal
#      canal_network_provider:
#        iface: eth1
# 
  network:
    mtu: 0
    plugin: canal
# 
#    services:
#      kube-api:
#        service_cluster_ip_range: 10.43.0.0/16
#      kube-controller:
#        cluster_cidr: 10.42.0.0/16
#        service_cluster_ip_range: 10.43.0.0/16
#      kubelet:
#        cluster_domain: cluster.local
#        cluster_dns_server: 10.43.0.10
# 
  services:
    etcd:
      backup_config:
        enabled: false
        interval_hours: 12
        retention: 6
        safe_timestamp: false
      creation: 12h
      extra_args:
        data-dir: /var/lib/etcd
      extra_binds:
        - '/var/lib/etcd:/var/lib/etcd'
      gid: 52034
      retention: 72h
      snapshot: false
      uid: 52034
    kube_api:
      always_pull_images: false
      extra_args:
        admission-control-config-file: /opt/kubernetes/admission.yaml
        anonymous-auth: 'false'
        audit-log-format: json
        audit-log-maxage: '30'
        audit-log-maxbackup: '10'
        audit-log-maxsize: '100'
        audit-log-path: /var/log/kube-audit/audit-log.json
        audit-policy-file: /opt/kubernetes/audit.yaml
        enable-admission-plugins: >-
          ServiceAccount,NamespaceLifecycle,LimitRanger,PersistentVolumeLabel,DefaultStorageClass,ResourceQuota,DefaultTolerationSeconds,AlwaysPullImages,DenyEscalatingExec,NodeRestriction,EventRateLimit,PodSecurityPolicy
        encryption-provider-config: /opt/kubernetes/encryption.yaml
        profiling: 'false'
        service-account-lookup: 'true'
        tls-cipher-suites: >-
          TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256
      extra_binds:
        - '/var/log/kube-audit:/var/log/kube-audit'
        - '/opt/kubernetes:/opt/kubernetes'
      pod_security_policy: true
      service_node_port_range: 30000-32767
    kube_controller:
      extra_args:
        address: 127.0.0.1
        feature-gates: RotateKubeletServerCertificate=true
        profiling: 'false'
        terminated-pod-gc-threshold: '1000'
    kubelet:
      extra_args:
        anonymous-auth: 'false'
        event-qps: '0'
        feature-gates: RotateKubeletServerCertificate=true
        make-iptables-util-chains: 'true'
        protect-kernel-defaults: 'true'
        streaming-connection-idle-timeout: 1800s
        tls-cipher-suites: >-
          TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256
      fail_swap_on: false
      generate_serving_certificate: true
    scheduler:
      extra_args:
        address: 127.0.0.1
        profiling: 'false'
  ssh_agent_auth: false
windows_prefered_cluster: false
```

### Hardened Example Ubuntu cloud-config:

``` yaml
#cloud-config
package_update: false
packages:
  - curl
  - jq
runcmd:
  - sysctl -w vm.overcommit_memory=1
  - sysctl -w kernel.panic=10
  - sysctl -w kernel.panic_on_oops=1
  - curl https://releases.rancher.com/install-docker/18.09.sh | sh
  - usermod -aG docker ubuntu
  - return=1; while [ $return != 0 ]; do sleep 2; docker ps; return=$?; done
  - addgroup --gid 52034 etcd
  - useradd --comment "etcd service account" --uid 52034 --gid 52034 etcd
  - mkdir -p /var/lib/etcd && chown etcd.etcd /var/lib/etcd && chmod 0700 /var/lib/etcd
  - ${agent_cmd} --etcd --controlplane --worker
  - mkdir /mnt/kube-bench
write_files:
  - path: /etc/sysctl.d/kubelet.conf
    owner: root:root
    permissions: "0644"
    content: |
      vm.overcommit_memory=1
      kernel.panic=10
      kernel.panic_on_oops=1
  - path: /opt/kubernetes/admission.yaml
    owner: root:root
    permissions: "0600"
    content: |
      apiVersion: apiserver.k8s.io/v1alpha1
      kind: AdmissionConfiguration
      plugins:
      - name: EventRateLimit
        path: /opt/kubernetes/event.yaml
  - path: /opt/kubernetes/event.yaml
    owner: root:root
    permissions: "0600"
    content: |
      apiVersion: eventratelimit.admission.k8s.io/v1alpha1
      kind: Configuration
      limits:
      - type: Server
        qps: 5000
        burst: 20000
  - path: /opt/kubernetes/encryption.yaml
    owner: root:root
    permissions: "0600"
    content: |
      apiVersion: apiserver.config.k8s.io/v1
      kind: EncryptionConfiguration
      resources:
        - resources:
          - secrets
          providers:
          - aescbc:
              keys:
              - name: key1
                secret: LF7YiCFyWqAa2MovOgp42rArBdLBGWdjJpX2knvYAkc=
          - identity: {}
  - path: /opt/kubernetes/audit.yaml
    owner: root:root
    permissions: "0600"
    content: |
      apiVersion: audit.k8s.io/v1beta1
      kind: Policy
      rules:
      - level: Metadata
```
