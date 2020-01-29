---
title: Hardening Guide - Rancher v2.3.4.
weight: 100
---

### Hardening Guide for Rancher 2.3.4 with Kubernetes 1.15

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


### Minimal RKE `config.yml` configuration 

``` yaml
---
kubernetes_version: v1.15.6-rancher1-2
services:
- kube_api:
  - extra_args:
    - admission-control-config-file: "/opt/kubernetes/admission.yaml"
      anonymous-auth: 'false'
      audit-log-format: json
      audit-log-maxage: '30'
      audit-log-maxbackup: '10'
      audit-log-maxsize: '100'
      audit-log-path: "/var/log/kube-audit/audit-log.json"
      audit-policy-file: "/opt/kubernetes/audit.yaml"
      enable-admission-plugins: ServiceAccount,NamespaceLifecycle,LimitRanger,PersistentVolumeLabel,DefaultStorageClass,ResourceQuota,DefaultTolerationSeconds,AlwaysPullImages,DenyEscalatingExec,NodeRestriction,EventRateLimit,PodSecurityPolicy
      encryption-provider-config: "/opt/kubernetes/encryption.yaml"
      profiling: 'false'
      service-account-lookup: 'true'
      tls-cipher-suites: TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256
    extra_binds:
    - "/var/log/kube-audit:/var/log/kube-audit"
    - "/opt/kubernetes:/opt/kubernetes"
    pod_security_policy: true
  kube_controller:
  - extra_args:
    - address: 127.0.0.1
      feature-gates: RotateKubeletServerCertificate=true
      profiling: 'false'
      terminated-pod-gc-threshold: '1000'
  kubelet:
  - extra_args:
    - anonymous-auth: 'false'
      event-qps: '0'
      feature-gates: RotateKubeletServerCertificate=true
      make-iptables-util-chains: 'true'
      protect-kernel-defaults: 'true'
      streaming-connection-idle-timeout: 1800s
      tls-cipher-suites: TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256
  scheduler:
  - extra_args:
    - address: 127.0.0.1
      profiling: 'false'
addons: |
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
```

### Example Ubuntu cloud-config:

``` yaml
#cloud-config
packages:
  - curl
  - jq
runcmd:
  - curl https://releases.rancher.com/install-docker/18.09.sh | sh
  - usermod -aG docker ubuntu
  - sysctl -w vm.overcommit_memory=1
  - sysctl -w kernel.panic=10
  - sysctl -w kernel.panic_on_oops=1
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
                secret: <BASE 64 ENCODED SECRET>
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
