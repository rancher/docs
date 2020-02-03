---
title: CIS Benchmark Rancher Self-Assessment Guide - Rancher v2.3.4
weight: 105
---

### CIS Kubernetes Benchmark 1.5 - Rancher 2.3.4 with Kubernetes 1.15

[Click here to download a PDF version of this document](https://releases.rancher.com/documents/security/2.3.4/Rancher_Benchmark_Assessment.pdf)

#### Overview

This document is a companion to the Rancher v2.3.4 security hardening guide. The hardening guide provides prescriptive guidance for hardening a production installation of Rancher, and this benchmark guide is meant to help you evaluate the level of security of the hardened cluster against each control in the benchmark.

This guide corresponds to specific versions of the hardening guide, Rancher, Kubernetes, and the CIS Benchmark:

Self Assessment Guide Version | Rancher Version | Hardening Guide Version | Kubernetes Version | CIS Benchmark Version
---------------------------|----------|---------|-------|-----
Self Assessment Guide v2.3.4 | Rancher v2.3.4 | Hardening Guide v2.3.4 | Kubernetes v1.15 | Benchmark v1.5

Because Rancher and RKE install Kubernetes services as Docker containers, many of the control verification checks in the CIS Kubernetes Benchmark don't apply. This guide will walk through the various controls and provide updated example commands to audit compliance in Rancher-created clusters.

This document is to be used by Rancher operators, security teams, auditors and decision makers.

For more detail about each audit, including rationales and remediations for failing tests, you can refer to the corresponding section of the CIS Kubernetes Benchmark v1.5. You can download the benchmark after logging in to [CISecurity.org]( https://www.cisecurity.org/benchmark/kubernetes/).

#### Testing controls methodology

Rancher and RKE install Kubernetes services via Docker containers. Configuration is defined by arguments passed to the container at the time of initialization, not via configuration files.

Scoring the commands is different in Rancher Labs than in the CIS Benchmark. Where the commands differ from the original CIS benchmark, the commands specific to Rancher Labs are provided for testing.

When performing the tests, you will need access to the Docker command line on the hosts of all three RKE roles. The commands also make use of the the `jq` command to provide human-readable formatting.

### Controls

---
## 1 Master Node Security Configuration
### 1.1 Master Node Configuration Files 

#### 1.1.1 Ensure that the API server pod specification file permissions are set to `644` or more restrictive (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the API server. All configuration is passed in as arguments at container run time.

#### 1.1.2 Ensure that the API server pod specification file ownership is set to `root:root` (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the API server. All configuration is passed in as arguments at container run time.

#### 1.1.3 Ensure that the controller manager pod specification file permissions are set to `644` or more restrictive (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the controller manager. All configuration is passed in as arguments at container run time.

#### 1.1.4 Ensure that the controller manager pod specification file ownership is set to `root:root` (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the controller manager. All configuration is passed in as arguments at container run time.

#### 1.1.5 Ensure that the scheduler pod specification file permissions are set to `644` or more restrictive (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the scheduler. All configuration is passed in as arguments at container run time.

#### 1.1.6 Ensure that the scheduler pod specification file ownership is set to `root:root` (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the scheduler. All configuration is passed in as arguments at container run time.

#### 1.1.7 Ensure that the etcd pod specification file permissions are set to `644` or more restrictive (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for etcd. All configuration is passed in as arguments at container run time.

#### 1.1.8 Ensure that the etcd pod specification file ownership is set to `root:root` (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for etcd. All configuration is passed in as arguments at container run time.

#### 1.1.9 Ensure that the Container Network Interface file permissions are set to `644` or more restrictive (Not Scored)

**Result:** WARN

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,

``` bash
chmod 644 <path/to/cni/files>
```

**Audit:**

```
stat -c %a <path/to/cni/files>
```

#### 1.1.10 Ensure that the Container Network Interface file ownership is set to `root:root` (Not Scored)

**Result:** WARN

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,

``` bash
chown root:root <path/to/cni/files>
```

**Audit:**

```
stat -c %U:%G <path/to/cni/files>
```

#### 1.1.11 Ensure that the etcd data directory permissions are set to `700` or more restrictive (Scored)

**Result:** PASS

**Remediation:**
On the etcd server node, get the etcd data directory, passed as an argument `--data-dir`,
from the below command:

``` bash
ps -ef | grep etcd
```

Run the below command (based on the etcd data directory found above). For example,

``` bash
chmod 700 /var/lib/etcd
```

**Audit:**

```
ps -ef | grep etcd | grep -- --data-dir | sed 's%.*data-dir[= ]\([^ ]*\).*%\1%' | xargs stat -c %a
```

**Expected result**:

```
'700' is equal to '700'
```

#### 1.1.12 Ensure that the etcd data directory ownership is set to `etcd:etcd` (Scored)

**Result:** PASS

**Remediation:**
On the etcd server node, get the etcd data directory, passed as an argument `--data-dir`,
from the below command:

``` bash
ps -ef | grep etcd
```

Run the below command (based on the etcd data directory found above).
For example,
``` bash 
chown etcd:etcd /var/lib/etcd
``` 

**Audit:**

```
ps -ef | grep etcd | grep -- --data-dir | sed 's%.*data-dir[= ]\([^ ]*\).*%\1%' | xargs stat -c %U:%G
```

**Expected result**:

```
'etcd:etcd' is present
```

#### 1.1.13 Ensure that the `admin.conf` file permissions are set to `644` or more restrictive (Scored)

**Result:** INFO

**Remediation:**
RKE does not store the kubernetes default kubeconfig credentials file on the nodes. It’s presented to user where RKE is run.
We recommend that this `kube_config_cluster.yml` file be kept in secure store.

#### 1.1.14 Ensure that the admin.conf file ownership is set to `root:root` (Scored) 

**Result:** INFO

**Remediation:**
RKE does not store the kubernetes default kubeconfig credentials file on the nodes. It’s presented to user where RKE is run.
We recommend that this `kube_config_cluster.yml` file be kept in secure store.

#### 1.1.15 Ensure that the `scheduler.conf` file permissions are set to `644` or more restrictive (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the scheduler. All configuration is passed in as arguments at container run time.

#### 1.1.16 Ensure that the `scheduler.conf` file ownership is set to `root:root` (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the scheduler. All configuration is passed in as arguments at container run time.

#### 1.1.17 Ensure that the `controller-manager.conf` file permissions are set to `644` or more restrictive (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the controller manager. All configuration is passed in as arguments at container run time.

#### 1.1.18 Ensure that the `controller-manager.conf` file ownership is set to `root:root` (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the controller manager. All configuration is passed in as arguments at container run time.

#### 1.1.19 Ensure that the Kubernetes PKI directory and file ownership is set to `root:root` (Scored)

**Result:** WARN

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,

``` bash
chown -R root:root /etc/kubernetes/pki/
```

**Audit:**

```
ls -laR /etc/kubernetes/pki/
```

#### 1.1.20 Ensure that the Kubernetes PKI certificate file permissions are set to `644` or more restrictive (Scored) 

**Result:** WARN

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,

``` bash
chmod -R 644 /etc/kubernetes/pki/*.crt
```

**Audit:**

```
stat -c %n %a /etc/kubernetes/pki/*.crt
```

#### 1.1.21 Ensure that the Kubernetes PKI key file permissions are set to `600` (Scored)

**Result:** WARN

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,

``` bash
chmod -R 600 /etc/kubernetes/pki/*.key
```

**Audit:**

```
stat -c %n %a /etc/kubernetes/pki/*.key
```

### 1.2 API Server

#### 1.2.1 Ensure that the `--anonymous-auth` argument is set to `false` (Not Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the below parameter.

``` bash
--anonymous-auth=false
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'false' is equal to 'false'
```

#### 1.2.2 Ensure that the `--basic-auth-file` argument is not set (Scored)

**Result:** PASS

**Remediation:**
Follow the documentation and configure alternate mechanisms for authentication. Then,
edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and remove the `--basic-auth-file=<filename>` parameter.

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--basic-auth-file' is not present
```

#### 1.2.3 Ensure that the `--token-auth-file` parameter is not set (Scored)

**Result:** PASS

**Remediation:**
Follow the documentation and configure alternate mechanisms for authentication. Then,
edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and remove the `--token-auth-file=<filename>` parameter.

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--token-auth-file' is not present
```

#### 1.2.4 Ensure that the `--kubelet-https` argument is set to true (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and remove the `--kubelet-https` parameter.

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--kubelet-https' is present OR '--kubelet-https' is not present
```

#### 1.2.5 Ensure that the `--kubelet-client-certificate` and `--kubelet-client-key` arguments are set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Follow the Kubernetes documentation and set up the TLS connection between the
apiserver and kubelets. Then, edit API server pod specification file
`/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the
kubelet client certificate and key parameters as below.

``` bash
--kubelet-client-certificate=<path/to/client-certificate-file>
--kubelet-client-key=<path/to/client-key-file>
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--kubelet-client-certificate' is present AND '--kubelet-client-key' is present
```

#### 1.2.6 Ensure that the `--kubelet-certificate-authority` argument is set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Follow the Kubernetes documentation and setup the TLS connection between
the apiserver and kubelets. Then, edit the API server pod specification file
`/etc/kubernetes/manifests/kube-apiserver.yaml` on the master node and set the
`--kubelet-certificate-authority` parameter to the path to the cert file for the certificate authority.
`--kubelet-certificate-authority=<ca-string>`

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--kubelet-certificate-authority' is present
```

#### 1.2.7 Ensure that the `--authorization-mode` argument is not set to `AlwaysAllow` (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--authorization-mode` parameter to values other than `AlwaysAllow`.
One such example could be as below.

``` bash
--authorization-mode=RBAC
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'Node,RBAC' not have 'AlwaysAllow'
```

#### 1.2.8 Ensure that the `--authorization-mode` argument includes `Node` (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--authorization-mode` parameter to a value that includes `Node`.

``` bash
--authorization-mode=Node,RBAC
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'Node,RBAC' has 'Node'
```

#### 1.2.9 Ensure that the `--authorization-mode` argument includes `RBAC` (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--authorization-mode` parameter to a value that includes RBAC,
for example:

``` bash
--authorization-mode=Node,RBAC
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'Node,RBAC' has 'RBAC'
```

#### 1.2.10 Ensure that the admission control plugin `EventRateLimit` is set (Not Scored)

**Result:** PASS

**Remediation:**
Follow the Kubernetes documentation and set the desired limits in a configuration file.
Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
and set the below parameters.

``` bash
--enable-admission-plugins=...,EventRateLimit,...
--admission-control-config-file=<path/to/configuration/file>
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'ServiceAccount,NamespaceLifecycle,LimitRanger,PersistentVolumeLabel,DefaultStorageClass,ResourceQuota,DefaultTolerationSeconds,AlwaysPullImages,DenyEscalatingExec,NodeRestriction,EventRateLimit,PodSecurityPolicy' has 'EventRateLimit'
```

#### 1.2.11 Ensure that the admission control plugin `AlwaysAdmit` is not set (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and either remove the `--enable-admission-plugins` parameter, or set it to a
value that does not include `AlwaysAdmit`.

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'ServiceAccount,NamespaceLifecycle,LimitRanger,PersistentVolumeLabel,DefaultStorageClass,ResourceQuota,DefaultTolerationSeconds,AlwaysPullImages,DenyEscalatingExec,NodeRestriction,EventRateLimit,PodSecurityPolicy' not have 'AlwaysAdmit' OR '--enable-admission-plugins' is not present
```

#### 1.2.12 Ensure that the admission control plugin `AlwaysPullImages` is set (Not Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--enable-admission-plugins` parameter to include
`AlwaysPullImages`.

``` bash
--enable-admission-plugins=...,AlwaysPullImages,...
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'ServiceAccount,NamespaceLifecycle,LimitRanger,PersistentVolumeLabel,DefaultStorageClass,ResourceQuota,DefaultTolerationSeconds,AlwaysPullImages,DenyEscalatingExec,NodeRestriction,EventRateLimit,PodSecurityPolicy' has 'AlwaysPullImages'
```

#### 1.2.13 Ensure that the admission control plugin `SecurityContextDeny` is set if `PodSecurityPolicy` is not used (Not Scored)

**Result:** WARN

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--enable-admission-plugins` parameter to include
`SecurityContextDeny`, unless `PodSecurityPolicy` is already in place.

``` bash
--enable-admission-plugins=...,SecurityContextDeny,...
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

#### 1.2.14 Ensure that the admission control plugin `ServiceAccount` is set (Scored)

**Result:** PASS

**Remediation:**
Follow the documentation and create ServiceAccount objects as per your environment.
Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and ensure that the `--disable-admission-plugins` parameter is set to a
value that does not include `ServiceAccount`.

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'ServiceAccount,NamespaceLifecycle,LimitRanger,PersistentVolumeLabel,DefaultStorageClass,ResourceQuota,DefaultTolerationSeconds,AlwaysPullImages,DenyEscalatingExec,NodeRestriction,EventRateLimit,PodSecurityPolicy' has 'ServiceAccount' OR '--enable-admission-plugins' is not present
```

#### 1.2.15 Ensure that the admission control plugin `NamespaceLifecycle` is set (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--disable-admission-plugins` parameter to
ensure it does not include `NamespaceLifecycle`.

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--disable-admission-plugins' is present OR '--disable-admission-plugins' is not present
```

#### 1.2.16 Ensure that the admission control plugin `PodSecurityPolicy` is set (Scored)

**Result:** PASS

**Remediation:**
Follow the documentation and create Pod Security Policy objects as per your environment.
Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--enable-admission-plugins` parameter to a
value that includes `PodSecurityPolicy`:

``` bash
--enable-admission-plugins=...,PodSecurityPolicy,...
```

Then restart the API Server.

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'ServiceAccount,NamespaceLifecycle,LimitRanger,PersistentVolumeLabel,DefaultStorageClass,ResourceQuota,DefaultTolerationSeconds,AlwaysPullImages,DenyEscalatingExec,NodeRestriction,EventRateLimit,PodSecurityPolicy' has 'PodSecurityPolicy'
```

#### 1.2.17 Ensure that the admission control plugin `NodeRestriction` is set (Scored)

**Result:** PASS

**Remediation:**
Follow the Kubernetes documentation and configure `NodeRestriction` plug-in on kubelets.
Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--enable-admission-plugins` parameter to a
value that includes `NodeRestriction`.

``` bash
--enable-admission-plugins=...,NodeRestriction,...
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'ServiceAccount,NamespaceLifecycle,LimitRanger,PersistentVolumeLabel,DefaultStorageClass,ResourceQuota,DefaultTolerationSeconds,AlwaysPullImages,DenyEscalatingExec,NodeRestriction,EventRateLimit,PodSecurityPolicy' has 'NodeRestriction'
```

#### 1.2.18 Ensure that the `--insecure-bind-address` argument is not set (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and remove the `--insecure-bind-address` parameter.

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--insecure-bind-address' is not present
```

#### 1.2.19 Ensure that the `--insecure-port` argument is set to `0` (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the below parameter.

``` bash
--insecure-port=0
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'0' is equal to '0'
```

#### 1.2.20 Ensure that the `--secure-port` argument is not set to `0` (Scored) 

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and either remove the `--secure-port` parameter or
set it to a different **(non-zero)** desired port.

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
6443 is greater than 0 OR '--secure-port' is not present
```

#### 1.2.21 Ensure that the `--profiling` argument is set to `false` (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the below parameter.

``` bash
--profiling=false
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'false' is equal to 'false'
```

#### 1.2.22 Ensure that the `--audit-log-path` argument is set (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--audit-log-path` parameter to a suitable path and
file where you would like audit logs to be written, for example:

``` bash
--audit-log-path=/var/log/apiserver/audit.log
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--audit-log-path' is present
```

#### 1.2.23 Ensure that the `--audit-log-maxage` argument is set to `30` or as appropriate (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--audit-log-maxage` parameter to `30` or as an appropriate number of days:

``` bash
--audit-log-maxage=30
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
30 is greater or equal to 30
```

#### 1.2.24 Ensure that the `--audit-log-maxbackup` argument is set to `10` or as appropriate (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--audit-log-maxbackup` parameter to `10` or to an appropriate
value.

``` bash
--audit-log-maxbackup=10
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
10 is greater or equal to 10
```

#### 1.2.25 Ensure that the `--audit-log-maxsize` argument is set to `100` or as appropriate (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--audit-log-maxsize` parameter to an appropriate size in **MB**.
For example, to set it as `100` **MB**:

``` bash
--audit-log-maxsize=100
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
100 is greater or equal to 100
```

#### 1.2.26 Ensure that the `--request-timeout` argument is set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
and set the below parameter as appropriate and if needed.
For example,

``` bash
--request-timeout=300s
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--request-timeout' is not present OR '--request-timeout' is present
```

#### 1.2.27 Ensure that the `--service-account-lookup` argument is set to `true` (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the below parameter.

``` bash
--service-account-lookup=true
```

Alternatively, you can delete the `--service-account-lookup` parameter from this file so
that the default takes effect.

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--service-account-lookup' is not present OR 'true' is equal to 'true'
```

#### 1.2.28 Ensure that the `--service-account-key-file` argument is set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--service-account-key-file` parameter
to the public key file for service accounts:

``` bash
--service-account-key-file=<filename>
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--service-account-key-file' is present
```

#### 1.2.29 Ensure that the `--etcd-certfile` and `--etcd-keyfile` arguments are set as appropriate (Scored) 

**Result:** PASS

**Remediation:**
Follow the Kubernetes documentation and set up the TLS connection between the apiserver and etcd.
Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the **etcd** certificate and **key** file parameters.

``` bash
--etcd-certfile=<path/to/client-certificate-file>
--etcd-keyfile=<path/to/client-key-file>
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--etcd-certfile' is present AND '--etcd-keyfile' is present
```

#### 1.2.30 Ensure that the `--tls-cert-file` and `--tls-private-key-file` arguments are set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Follow the Kubernetes documentation and set up the TLS connection on the apiserver.
Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the TLS certificate and private key file parameters.

``` bash
--tls-cert-file=<path/to/tls-certificate-file>
--tls-private-key-file=<path/to/tls-key-file>
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--tls-cert-file' is present AND '--tls-private-key-file' is present
```

#### 1.2.31 Ensure that the `--client-ca-file` argument is set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Follow the Kubernetes documentation and set up the TLS connection on the apiserver.
Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the client certificate authority file.

``` bash
--client-ca-file=<path/to/client-ca-file>
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--client-ca-file' is present
```

#### 1.2.32 Ensure that the `--etcd-cafile` argument is set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Follow the Kubernetes documentation and set up the TLS connection between the apiserver and etcd.
Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the etcd certificate authority file parameter.

``` bash
--etcd-cafile=<path/to/ca-file>
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--etcd-cafile' is present
```

#### 1.2.33 Ensure that the `--encryption-provider-config` argument is set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Follow the Kubernetes documentation and configure a EncryptionConfig file.
Then, edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the `--encryption-provider-config` parameter to the path of that file:

``` bash
--encryption-provider-config=</path/to/EncryptionConfig/File>
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'--encryption-provider-config' is present
```

#### 1.2.34 Ensure that encryption providers are appropriately configured (Scored)

**Result:** WARN

**Remediation:**
Follow the Kubernetes documentation and configure a `EncryptionConfig` file.
In this file, choose **aescbc**, **kms** or **secretbox** as the encryption provider.

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

#### 1.2.35 Ensure that the API Server only makes use of Strong Cryptographic Ciphers (Not Scored)

**Result:** PASS

**Remediation:**
Edit the API server pod specification file `/etc/kubernetes/manifests/kube-apiserver.yaml`
on the master node and set the below parameter.

``` bash
--tls-cipher-suites=TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
```

**Audit:**

```
/bin/ps -ef | grep kube-apiserver | grep -v grep
```

**Expected result**:

```
'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256' has 'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256'
```

### 1.3 Controller Manager

#### 1.3.1 Ensure that the `--terminated-pod-gc-threshold` argument is set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml`
on the master node and set the `--terminated-pod-gc-threshold` to an appropriate threshold,
for example:

``` bash
--terminated-pod-gc-threshold=10
```

**Audit:**

```
/bin/ps -ef | grep kube-controller-manager | grep -v grep
```

**Expected result**:

```
'--terminated-pod-gc-threshold' is present
```

#### 1.3.2 Ensure that the `--profiling` argument is set to false (Scored)

**Result:** PASS

**Remediation:**
Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml`
on the master node and set the below parameter.

``` bash
--profiling=false
```

**Audit:**

```
/bin/ps -ef | grep kube-controller-manager | grep -v grep
```

**Expected result**:

```
'false' is equal to 'false'
```

#### 1.3.3 Ensure that the `--use-service-account-credentials` argument is set to `true` (Scored)

**Result:** PASS

**Remediation:**
Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml`
on the master node to set the below parameter.

``` bash
--use-service-account-credentials=true
```

**Audit:**

```
/bin/ps -ef | grep kube-controller-manager | grep -v grep
```

**Expected result**:

```
'true' is not equal to 'false'
```

#### 1.3.4 Ensure that the `--service-account-private-key-file` argument is set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml`
on the master node and set the `--service-account-private-key-file` parameter
to the private key file for service accounts.

``` bash
--service-account-private-key-file=<filename>
```

**Audit:**

```
/bin/ps -ef | grep kube-controller-manager | grep -v grep
```

**Expected result**:

```
'--service-account-private-key-file' is present
```

#### 1.3.5 Ensure that the `--root-ca-file` argument is set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml`
on the master node and set the `--root-ca-file` parameter to the certificate bundle file`.

``` bash
--root-ca-file=<path/to/file>
```

**Audit:**

```
/bin/ps -ef | grep kube-controller-manager | grep -v grep
```

**Expected result**:

```
'--root-ca-file' is present
```

#### 1.3.6 Ensure that the `RotateKubeletServerCertificate` argument is set to `true` (Scored)

**Result:** PASS

**Remediation:**
Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml`
on the master node and set the `--feature-gates` parameter to include `RotateKubeletServerCertificate=true`.

``` bash
--feature-gates=RotateKubeletServerCertificate=true
```

**Audit:**

```
/bin/ps -ef | grep kube-controller-manager | grep -v grep
```

**Expected result**:

```
'RotateKubeletServerCertificate=true' is equal to 'RotateKubeletServerCertificate=true'
```

#### 1.3.7 Ensure that the `--bind-address argument` is set to `127.0.0.1` (Scored)

**Result:** PASS

**Remediation:**
Edit the Controller Manager pod specification file `/etc/kubernetes/manifests/kube-controller-manager.yaml`
on the master node and ensure the correct value for the `--bind-address` parameter.

**Audit:**

```
/bin/ps -ef | grep kube-controller-manager | grep -v grep
```

**Expected result**:

```
'--bind-address' is present OR '--bind-address' is not present
```

### 1.4 Scheduler

#### 1.4.1 Ensure that the `--profiling` argument is set to `false` (Scored)

**Result:** PASS

**Remediation:**
Edit the Scheduler pod specification file `/etc/kubernetes/manifests/kube-scheduler.yaml` file
on the master node and set the below parameter.

``` bash
--profiling=false
```

**Audit:**

```
/bin/ps -ef | grep kube-scheduler | grep -v grep
```

**Expected result**:

```
'false' is equal to 'false'
```

#### 1.4.2 Ensure that the `--bind-address` argument is set to `127.0.0.1` (Scored) 

**Result:** PASS

**Remediation:**
Edit the Scheduler pod specification file `/etc/kubernetes/manifests/kube-scheduler.yaml`
on the master node and ensure the correct value for the `--bind-address` parameter.

**Audit:**

```
/bin/ps -ef | grep kube-scheduler | grep -v grep
```

**Expected result**:

```
'--bind-address' is present OR '--bind-address' is not present
```

## 2 Etcd Node Configuration
### 2 Etcd Node Configuration Files

#### 2.1 Ensure that the `--cert-file` and `--key-file` arguments are set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Follow the etcd service documentation and configure TLS encryption.
Then, edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml`
on the master node and set the below parameters.

``` bash
--cert-file=</path/to/ca-file>
--key-file=</path/to/key-file>
```

**Audit:**

```
/bin/ps -ef | /bin/grep etcd | /bin/grep -v grep
```

**Expected result**:

```
'--cert-file' is present AND '--key-file' is present
```

#### 2.2 Ensure that the `--client-cert-auth` argument is set to `true` (Scored)

**Result:** PASS

**Remediation:**
Edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` on the master
node and set the below parameter.

``` bash
--client-cert-auth="true"
```

**Audit:**

```
/bin/ps -ef | /bin/grep etcd | /bin/grep -v grep
```

**Expected result**:

```
'true' is equal to 'true'
```

#### 2.3 Ensure that the `--auto-tls` argument is not set to `true` (Scored)

**Result:** PASS

**Remediation:**
Edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` on the master
node and either remove the `--auto-tls` parameter or set it to `false`.

``` bash
 --auto-tls=false
```

**Audit:**

```
/bin/ps -ef | /bin/grep etcd | /bin/grep -v grep
```

**Expected result**:

```
'--auto-tls' is not present OR '--auto-tls' is not present
```

#### 2.4 Ensure that the `--peer-cert-file` and `--peer-key-file` arguments are set as appropriate (Scored)

**Result:** PASS

**Remediation:**
Follow the etcd service documentation and configure peer TLS encryption as appropriate
for your etcd cluster. Then, edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` on the
master node and set the below parameters.

``` bash
--peer-client-file=</path/to/peer-cert-file>
--peer-key-file=</path/to/peer-key-file>
```

**Audit:**

```
/bin/ps -ef | /bin/grep etcd | /bin/grep -v grep
```

**Expected result**:

```
'--peer-cert-file' is present AND '--peer-key-file' is present
```

#### 2.5 Ensure that the `--peer-client-cert-auth` argument is set to `true` (Scored)

**Result:** PASS

**Remediation:**
Edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` on the master
node and set the below parameter.

``` bash
--peer-client-cert-auth=true
```

**Audit:**

```
/bin/ps -ef | /bin/grep etcd | /bin/grep -v grep
```

**Expected result**:

```
'true' is equal to 'true'
```

#### 2.6 Ensure that the `--peer-auto-tls` argument is not set to `true` (Scored)

**Result:** PASS

**Remediation:**
Edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` on the master
node and either remove the `--peer-auto-tls` parameter or set it to `false`.

``` bash
--peer-auto-tls=false
```

**Audit:**

```
/bin/ps -ef | /bin/grep etcd | /bin/grep -v grep
```

**Expected result**:

```
'--peer-auto-tls' is not present OR '--peer-auto-tls' is present
```

#### 2.7 Ensure that a unique Certificate Authority is used for etcd (Not Scored)

**Result:** PASS

**Remediation:**
[Manual test]
Follow the etcd documentation and create a dedicated certificate authority setup for the
etcd service.
Then, edit the etcd pod specification file `/etc/kubernetes/manifests/etcd.yaml` on the
master node and set the below parameter.

``` bash
--trusted-ca-file=</path/to/ca-file>
```

**Audit:**

```
/bin/ps -ef | /bin/grep etcd | /bin/grep -v grep
```

**Expected result**:

```
'--trusted-ca-file' is present
```

## 3 Control Plane Configuration
### 3.1 Authentication and Authorization

#### 3.1.1 Client certificate authentication should not be used for users (Not Scored) 

**Result:** WARN

**Remediation:**
Alternative mechanisms provided by Kubernetes such as the use of OIDC should be
implemented in place of client certificates.

### 3.2 Logging

#### 3.2.1 Ensure that a minimal audit policy is created (Scored) 

**Result:** WARN

**Remediation:**
Create an audit policy file for your cluster.

#### 3.2.2 Ensure that the audit policy covers key security concerns (Not Scored) 

**Result:** WARN

**Remediation:**
Consider modification of the audit policy in use on the cluster to include these items, at a
minimum.

## 4 Worker Node Security Configuration
### 4.1 Worker Node Configuration Files

#### 4.1.1 Ensure that the kubelet service file permissions are set to `644` or more restrictive (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the kubelet service. All configuration is passed in as arguments at container run time.

#### 4.1.2 Ensure that the kubelet service file ownership is set to `root:root` (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the kubelet service. All configuration is passed in as arguments at container run time.

#### 4.1.3 Ensure that the proxy kubeconfig file permissions are set to `644` or more restrictive (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the proxy service. All configuration is passed in as arguments at container run time.

#### 4.1.4 Ensure that the proxy kubeconfig file ownership is set to `root:root` (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the proxy service. All configuration is passed in as arguments at container run time.

#### 4.1.5 Ensure that the kubelet.conf file permissions are set to `644` or more restrictive (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the kubelet service. All configuration is passed in as arguments at container run time.

#### 4.1.6 Ensure that the kubelet.conf file ownership is set to `root:root` (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the kubelet service. All configuration is passed in as arguments at container run time.

#### 4.1.7 Ensure that the certificate authorities file permissions are set to `644` or more restrictive (Scored)

**Result:** WARN

**Remediation:**
Run the following command to modify the file permissions of the

``` bash
--client-ca-file chmod 644 <filename>
```

#### 4.1.8 Ensure that the client certificate authorities file ownership is set to `root:root` (Scored)

**Result:** PASS

**Remediation:**
Run the following command to modify the ownership of the `--client-ca-file`.

``` bash
chown root:root <filename>
```

**Audit:**

```
/bin/sh -c 'if test -e /etc/kubernetes/ssl/kube-ca.pem; then stat -c %U:%G /etc/kubernetes/ssl/kube-ca.pem; fi' 
```

**Expected result**:

```
'root:root' is equal to 'root:root'
```

#### 4.1.9 Ensure that the kubelet configuration file has permissions set to `644` or more restrictive (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the kubelet service. All configuration is passed in as arguments at container run time.

#### 4.1.10 Ensure that the kubelet configuration file ownership is set to `root:root` (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the kubelet service. All configuration is passed in as arguments at container run time.

### 4.2 Kubelet

#### 4.2.1 Ensure that the `--anonymous-auth argument` is set to false (Scored)

**Result:** PASS

**Remediation:**
If using a Kubelet config file, edit the file to set authentication: `anonymous`: enabled to
`false`.
If using executable arguments, edit the kubelet service file
`/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and
set the below parameter in `KUBELET_SYSTEM_PODS_ARGS` variable.

``` bash
--anonymous-auth=false
```
 
Based on your system, restart the kubelet service. For example:

``` bash
systemctl daemon-reload
systemctl restart kubelet.service
```

**Audit:**

```
/bin/ps -fC kubelet
```

**Audit Config:**

```
/bin/cat /var/lib/kubelet/config.yaml
```

**Expected result**:

```
'false' is equal to 'false'
```

#### 4.2.2 Ensure that the `--authorization-mode` argument is not set to `AlwaysAllow` (Scored)

**Result:** PASS

**Remediation:**
If using a Kubelet config file, edit the file to set authorization: `mode` to `Webhook`. If
using executable arguments, edit the kubelet service file
`/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and
set the below parameter in `KUBELET_AUTHZ_ARGS` variable.

``` bash
--authorization-mode=Webhook
```

Based on your system, restart the kubelet service. For example:

``` bash
systemctl daemon-reload
systemctl restart kubelet.service
```

**Audit:**

```
/bin/ps -fC kubelet
```

**Audit Config:**

```
/bin/cat /var/lib/kubelet/config.yaml
```

**Expected result**:

```
'Webhook' not have 'AlwaysAllow'
```

#### 4.2.3 Ensure that the `--client-ca-file` argument is set as appropriate (Scored)

**Result:** PASS

**Remediation:**
If using a Kubelet config file, edit the file to set authentication: `x509`: `clientCAFile` to
the location of the client CA file.
If using command line arguments, edit the kubelet service file
`/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and
set the below parameter in `KUBELET_AUTHZ_ARGS` variable.

``` bash
--client-ca-file=<path/to/client-ca-file>
```

Based on your system, restart the kubelet service. For example:

``` bash
systemctl daemon-reload
systemctl restart kubelet.service
```

**Audit:**

```
/bin/ps -fC kubelet
```

**Audit Config:**

```
/bin/cat /var/lib/kubelet/config.yaml
```

**Expected result**:

```
'--client-ca-file' is present
```

#### 4.2.4 Ensure that the `--read-only-port` argument is set to `0` (Scored)

**Result:** PASS

**Remediation:**
If using a Kubelet config file, edit the file to set `readOnlyPort` to `0`.
If using command line arguments, edit the kubelet service file
`/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and
set the below parameter in `KUBELET_SYSTEM_PODS_ARGS` variable.

``` bash
--read-only-port=0
```

Based on your system, restart the kubelet service. For example:

``` bash
systemctl daemon-reload
systemctl restart kubelet.service
```

**Audit:**

```
/bin/ps -fC kubelet
```

**Audit Config:**

```
/bin/cat /var/lib/kubelet/config.yaml
```

**Expected result**:

```
'0' is equal to '0'
```

#### 4.2.5 Ensure that the `--streaming-connection-idle-timeout` argument is not set to `0` (Scored)

**Result:** PASS

**Remediation:**
If using a Kubelet config file, edit the file to set `streamingConnectionIdleTimeout` to a
value other than `0`.
If using command line arguments, edit the kubelet service file
`/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and
set the below parameter in `KUBELET_SYSTEM_PODS_ARGS` variable.

``` bash
--streaming-connection-idle-timeout=5m
```

Based on your system, restart the kubelet service. For example:

``` bash
systemctl daemon-reload
systemctl restart kubelet.service
```

**Audit:**

```
/bin/ps -fC kubelet
```

**Audit Config:**

```
/bin/cat /var/lib/kubelet/config.yaml
```

**Expected result**:

```
'1800s' is not equal to '0' OR '--streaming-connection-idle-timeout' is not present
```

#### 4.2.6 Ensure that the ```--protect-kernel-defaults``` argument is set to `true` (Scored)

**Result:** PASS

**Remediation:**
If using a Kubelet config file, edit the file to set `protectKernelDefaults`: `true`.
If using command line arguments, edit the kubelet service file
`/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and
set the below parameter in `KUBELET_SYSTEM_PODS_ARGS` variable.

``` bash
--protect-kernel-defaults=true
```

Based on your system, restart the kubelet service. For example:

``` bash
systemctl daemon-reload
systemctl restart kubelet.service
```

**Audit:**

```
/bin/ps -fC kubelet
```

**Audit Config:**

```
/bin/cat /var/lib/kubelet/config.yaml
```

**Expected result**:

```
'true' is equal to 'true'
```

#### 4.2.7 Ensure that the `--make-iptables-util-chains` argument is set to `true` (Scored) 

**Result:** PASS

**Remediation:**
If using a Kubelet config file, edit the file to set `makeIPTablesUtilChains`: `true`.
If using command line arguments, edit the kubelet service file
`/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and
remove the `--make-iptables-util-chains` argument from the
`KUBELET_SYSTEM_PODS_ARGS` variable.
Based on your system, restart the kubelet service. For example:

```bash 
systemctl daemon-reload
systemctl restart kubelet.service
```

**Audit:**

```
/bin/ps -fC kubelet
```

**Audit Config:**

```
/bin/cat /var/lib/kubelet/config.yaml
```

**Expected result**:

```
'true' is equal to 'true' OR '--make-iptables-util-chains' is not present
```

#### 4.2.8 Ensure that the `--hostname-override` argument is not set (Not Scored)

**Result:** WARN

**Remediation:**
Edit the kubelet service file `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf`
on each worker node and remove the `--hostname-override` argument from the
`KUBELET_SYSTEM_PODS_ARGS` variable.
Based on your system, restart the kubelet service. For example:

``` bash
systemctl daemon-reload
systemctl restart kubelet.service
```

**Audit:**

```
/bin/ps -fC kubelet 
```

#### 4.2.9 Ensure that the `--event-qps` argument is set to `0` or a level which ensures appropriate event capture (Not Scored)

**Result:** PASS

**Remediation:**
If using a Kubelet config file, edit the file to set `eventRecordQPS`: to an appropriate level.
If using command line arguments, edit the kubelet service file
`/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and
set the below parameter in `KUBELET_SYSTEM_PODS_ARGS` variable.
Based on your system, restart the kubelet service. For example:

``` bash
systemctl daemon-reload
systemctl restart kubelet.service
```

**Audit:**

```
/bin/ps -fC kubelet
```

**Audit Config:**

```
/bin/cat /var/lib/kubelet/config.yaml
```

**Expected result**:

```
'0' is equal to '0'
```

#### 4.2.10 Ensure that the `--tls-cert-file` and `--tls-private-key-file` arguments are set as appropriate (Scored)

**Result:** INFO

**Remediation:**
RKE doesn’t require or maintain a configuration file for the kubelet service. All configuration is passed in as arguments at container run time.

#### 4.2.11 Ensure that the `--rotate-certificates` argument is not set to `false` (Scored)

**Result:** PASS

**Remediation:**
If using a Kubelet config file, edit the file to add the line `rotateCertificates`: `true` or
remove it altogether to use the default value.
If using command line arguments, edit the kubelet service file
`/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and
remove `--rotate-certificates=false` argument from the `KUBELET_CERTIFICATE_ARGS`
variable.
Based on your system, restart the kubelet service. For example:

``` bash
systemctl daemon-reload
systemctl restart kubelet.service
```

**Audit:**

```
/bin/ps -fC kubelet
```

**Audit Config:**

```
/bin/cat /var/lib/kubelet/config.yaml
```

**Expected result**:

```
'--rotate-certificates' is present OR '--rotate-certificates' is not present
```

#### 4.2.12 Ensure that the `RotateKubeletServerCertificate` argument is set to `true` (Scored)

**Result:** PASS

**Remediation:**
Edit the kubelet service file `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf`
on each worker node and set the below parameter in `KUBELET_CERTIFICATE_ARGS` variable.

``` bash
--feature-gates=RotateKubeletServerCertificate=true
```

Based on your system, restart the kubelet service. For example:

``` bash
systemctl daemon-reload
systemctl restart kubelet.service
```

**Audit:**

```
/bin/ps -fC kubelet
```

**Audit Config:**

```
/bin/cat /var/lib/kubelet/config.yaml
```

**Expected result**:

```
'true' is equal to 'true'
```

#### 4.2.13 Ensure that the Kubelet only makes use of Strong Cryptographic Ciphers (Not Scored)

**Result:** PASS

**Remediation:**
If using a Kubelet config file, edit the file to set `TLSCipherSuites`: to

``` bash
TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256
```

or to a subset of these values.
If using executable arguments, edit the kubelet service file
`/etc/systemd/system/kubelet.service.d/10-kubeadm.conf` on each worker node and
set the `--tls-cipher-suites` parameter as follows, or to a subset of these values.

``` bash
--tls-cipher-suites=TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256
```

Based on your system, restart the kubelet service. For example:

``` bash
systemctl daemon-reload
systemctl restart kubelet.service
```

**Audit:**

```
/bin/ps -fC kubelet
```

**Audit Config:**

```
/bin/cat /var/lib/kubelet/config.yaml
```

**Expected result**:

```
'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256' contains valid elements from 'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256'
```

## 5 Kubernetes Policies
### 5.1 RBAC and Service Accounts

#### 5.1.1 Ensure that the cluster-admin role is only used where required (Not Scored)

**Result:** WARN

**Remediation:**
Identify all `clusterrolebindings` to the `cluster-admin` role. Check if they are used and
if they need this role or if they could use a role with fewer privileges.
Where possible, first bind users to a lower privileged role and then remove the
`clusterrolebinding` to the `cluster-admin` role :

``` bash
kubectl delete clusterrolebinding [name]
```

#### 5.1.2 Minimize access to secrets (Not Scored)

**Result:** WARN

**Remediation:**
Where possible, remove `get`, `list` and `watch` access to secret objects in the cluster.

#### 5.1.3 Minimize wildcard use in Roles and ClusterRoles (Not Scored)

**Result:** WARN

**Remediation:**
Where possible replace any use of wildcards in `clusterroles` and roles with specific
objects or actions.

#### 5.1.4 Minimize access to create pods (Not Scored)

**Result:** WARN

#### 5.1.5 Ensure that default service accounts are not actively used. (Scored)

**Result:** WARN

**Remediation:**
Create explicit service accounts wherever a Kubernetes workload requires specific access
to the Kubernetes API server.
Modify the configuration of each default service account to include this value

``` bash
automountServiceAccountToken: false
```

#### 5.1.6 Ensure that Service Account Tokens are only mounted where necessary (Not Scored)

**Result:** WARN

**Remediation:**
Modify the definition of pods and service accounts which do not need to mount service
account tokens to disable it.

### 5.2 Pod Security Policies

#### 5.2.1 Minimize the admission of privileged containers (Not Scored)

**Result:** WARN

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that
the `.spec.privileged` field is omitted or set to `false`.

#### 5.2.2 Minimize the admission of containers wishing to share the host process ID namespace (Scored)

**Result:** WARN

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that the
`.spec.hostPID` field is omitted or set to `false`.

#### 5.2.3 Minimize the admission of containers wishing to share the host IPC namespace (Scored)

**Result:** WARN

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that the
`.spec.hostIPC` field is omitted or set to `false`.

#### 5.2.4 Minimize the admission of containers wishing to share the host network namespace (Scored)

**Result:** WARN

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that the
`.spec.hostNetwork` field is omitted or set to `false`.

#### 5.2.5 Minimize the admission of containers with `allowPrivilegeEscalation` (Scored)

**Result:** WARN

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that the
`.spec.allowPrivilegeEscalation` field is omitted or set to `false`.

#### 5.2.6 Minimize the admission of root containers (Not Scored)

**Result:** WARN

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that the
`.spec.runAsUser.rule` is set to either `MustRunAsNonRoot` or `MustRunAs` with the range of
UIDs not including `0`.

#### 5.2.7 Minimize the admission of containers with the `NET_RAW` capability (Not Scored)

**Result:** WARN

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that the
`.spec.requiredDropCapabilities` is set to include either `NET_RAW` or `ALL`.

#### 5.2.8 Minimize the admission of containers with added capabilities (Not Scored)

**Result:** WARN

**Remediation:**
Ensure that `allowedCapabilities` is not present in PSPs for the cluster unless
it is set to an empty array.

#### 5.2.9 Minimize the admission of containers with capabilities assigned (Not Scored) 

**Result:** WARN

**Remediation:**
Review the use of capabilites in applications runnning on your cluster. Where a namespace
contains applicaions which do not require any Linux capabities to operate consider adding
a PSP which forbids the admission of containers which do not drop all capabilities.

### 5.3 Network Policies and CNI

#### 5.3.1 Ensure that the CNI in use supports Network Policies (Not Scored)

**Result:** WARN

**Remediation:**
If the CNI plugin in use does not support network policies, consideration should be given to
making use of a different plugin, or finding an alternate mechanism for restricting traffic
in the Kubernetes cluster.

#### 5.3.2 Ensure that all Namespaces have Network Policies defined (Scored)

**Result:** WARN

**Remediation:**
Follow the documentation and create `NetworkPolicy` objects as you need them.

### 5.4 Secrets Management

#### 5.4.1 Prefer using secrets as files over secrets as environment variables (Not Scored)

**Result:** WARN

**Remediation:**
if possible, rewrite application code to read secrets from mounted secret files, rather than
from environment variables.

#### 5.4.2 Consider external secret storage (Not Scored)

**Result:** WARN

**Remediation:**
Refer to the secrets management options offered by your cloud provider or a third-party
secrets management solution.

### 5.5 Extensible Admission Control

#### 5.5.1 Configure Image Provenance using `ImagePolicyWebhook` admission controller (Not Scored)

**Result:** WARN

**Remediation:**
Follow the Kubernetes documentation and setup image provenance.

### 5.6 General Policies

#### 5.6.1 Create administrative boundaries between resources using namespaces (Not Scored)

**Result:** WARN

**Remediation:**
Follow the documentation and create namespaces for objects in your deployment as you need
them.

#### 5.6.2 Ensure that the seccomp profile is set to docker/default in your pod definitions (Not Scored)

**Result:** WARN

**Remediation:**
Seccomp is an alpha feature currently. By default, all alpha features are disabled. So, you
would need to enable alpha features in the apiserver by passing `"--feature-
gates=AllAlpha=true"` argument.
Edit the `/etc/kubernetes/apiserver` file on the master node and set the `KUBE_API_ARGS`
parameter to `"--feature-gates=AllAlpha=true"`
`KUBE_API_ARGS="--feature-gates=AllAlpha=true"`
Based on your system, restart the kube-apiserver service. For example:

``` bash
systemctl restart kube-apiserver.service
```

Use annotations to enable the docker/default seccomp profile in your pod definitions. An
example is as below:

``` bash
apiVersion: v1
kind: Pod
metadata:
 name: trustworthy-pod
 annotations:
 seccomp.security.alpha.kubernetes.io/pod: docker/default
spec:
 containers:
 - name: trustworthy-container
 image: sotrustworthy:latest
```

#### 5.6.3 Apply Security Context to Your Pods and Containers (Not Scored)

**Result:** WARN

**Remediation:**
Follow the Kubernetes documentation and apply security contexts to your pods. For a
suggested list of security contexts, you may refer to the CIS Security Benchmark for Docker
Containers.

#### 5.6.4 The default namespace should not be used (Scored)

**Result:** WARN

**Remediation:**
Ensure that namespaces are created to allow for appropriate segregation of Kubernetes
resources and that all new resources are created in a specific namespace.

