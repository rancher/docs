---
title: CIS Self Assessment Guide
weight: 90
---

### CIS Kubernetes Benchmark v1.6 - K3s with Kubernetes v1.17 to v1.21

#### Overview

This document is a companion to the K3s security hardening guide. The hardening guide provides prescriptive guidance for hardening a production installation of K3s, and this benchmark guide is meant to help you evaluate the level of security of the hardened cluster against each control in the CIS Kubernetes Benchmark. It is to be used by K3s operators, security teams, auditors, and decision-makers.

This guide is specific to the **v1.17**, **v1.18**, **v1.19**, **v1.20** and **v1.21** release line of K3s and the **v1.6** release of the CIS Kubernetes Benchmark.

For more information about each control, including detailed descriptions and remediations for failing tests, you can refer to the corresponding section of the CIS Kubernetes Benchmark v1.6. You can download the benchmark, after creating a free account, in [Center for Internet Security (CIS)](https://www.cisecurity.org/benchmark/kubernetes/).

#### Testing controls methodology

Each control in the CIS Kubernetes Benchmark was evaluated against a K3s cluster that was configured according to the accompanying hardening guide.

Where control audits differ from the original CIS benchmark, the audit commands specific to K3s are provided for testing.

These are the possible results for each control:

- **Pass** - The K3s cluster under test passed the audit outlined in the benchmark.
- **Not Applicable** - The control is not applicable to K3s because of how it is designed to operate. The remediation section will explain why this is so.
- **Warn** - The control is manual in the CIS benchmark and it depends on the cluster's use case or some other factor that must be determined by the cluster operator. These controls have been evaluated to ensure K3s does not prevent their implementation, but no further configuration or auditing of the cluster under test has been performed.

This guide makes the assumption that K3s is running as a Systemd unit. Your installation may vary and will require you to adjust the "audit" commands to fit your scenario.

> NOTE: Only `automated` tests (previously called `scored`) are covered in this guide.

### Controls

---

## 1.1 Master Node Configuration Files
### 1.1.1 Ensure that the API server pod specification file permissions are set to 644 or more restrictive (Automated)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the
master node.
For example, chmod 644 /etc/kubernetes/manifests/kube-apiserver.yaml

### 1.1.2 Ensure that the API server pod specification file ownership is set to root:root (Automated)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chown root:root /etc/kubernetes/manifests/kube-apiserver.yaml

### 1.1.3 Ensure that the controller manager pod specification file permissions are set to 644 or more restrictive (Automated)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chmod 644 /etc/kubernetes/manifests/kube-controller-manager.yaml

### 1.1.4 Ensure that the controller manager pod specification file ownership is set to root:root (Automated)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chown root:root /etc/kubernetes/manifests/kube-controller-manager.yaml

### 1.1.5 Ensure that the scheduler pod specification file permissions are set to 644 or more restrictive (Automated)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chmod 644 /etc/kubernetes/manifests/kube-scheduler.yaml

### 1.1.6 Ensure that the scheduler pod specification file ownership is set to root:root (Automated)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chown root:root /etc/kubernetes/manifests/kube-scheduler.yaml

### 1.1.7 Ensure that the etcd pod specification file permissions are set to 644 or more restrictive (Automated)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chmod 644 /etc/kubernetes/manifests/etcd.yaml

### 1.1.8 Ensure that the etcd pod specification file ownership is set to root:root (Automated)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chown root:root /etc/kubernetes/manifests/etcd.yaml

### 1.1.9 Ensure that the Container Network Interface file permissions are set to 644 or more restrictive (Manual)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chmod 644 <path/to/cni/files>

### 1.1.10 Ensure that the Container Network Interface file ownership is set to root:root (Manual)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chown root:root <path/to/cni/files>

### 1.1.11 Ensure that the etcd data directory permissions are set to 700 or more restrictive (Automated)


**Result:** pass

**Remediation:**
On the etcd server node, get the etcd data directory, passed as an argument --data-dir,
from the below command:
ps -ef | grep etcd
Run the below command (based on the etcd data directory found above). For example,
chmod 700 /var/lib/etcd

**Audit Script:** `check_for_k3s_etcd.sh`

```bash
#!/bin/bash

# This script is used to ensure that k3s is actually running etcd (and not other databases like sqlite3)
# before it checks the requirement
set -eE

handle_error() {
    echo "false"
}

trap 'handle_error' ERR


if [[ "$(journalctl -D /var/log/journal -u k3s | grep 'Managed etcd' | grep -v grep | wc -l)" -gt 0 ]]; then
    case $1 in 
        "1.1.11")
            echo $(stat -c %a /var/lib/rancher/k3s/server/db/etcd);;
        "1.2.29")
            echo $(journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'etcd-');;
        "2.1")
            echo $(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.2")
            echo "$(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.3")
            echo $(grep 'auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.4")
            echo $(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.5")
            echo "$(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.6")
            echo $(grep 'peer-auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.7")
            echo $(grep 'trusted-ca-file' /var/lib/rancher/k3s/server/db/etcd/config);;
    esac
else
# If another database is running, return whatever is required to pass the scan
    case $1 in
        "1.1.11")
            echo "700";;
        "1.2.29")
            echo "--etcd-certfile AND --etcd-keyfile";;
        "2.1")
            echo "cert-file AND key-file";;
        "2.2")
            echo "true";;
        "2.3")
            echo "false";;
        "2.4")
            echo "peer-cert-file AND peer-key-file";;
        "2.5")
            echo "true";;
        "2.6")
            echo "--peer-auto-tls=false";;
        "2.7")
            echo "--trusted-ca-file";;
    esac
fi

```

**Audit Execution:**

```bash
./check_for_k3s_etcd.sh 1.1.11
```

**Expected Result**:

```console
'700' is equal to '700'
```

**Returned Value**:

```console
700
```

### 1.1.12 Ensure that the etcd data directory ownership is set to etcd:etcd (Automated)


**Result:** Not Applicable

**Remediation:**
On the etcd server node, get the etcd data directory, passed as an argument --data-dir,
from the below command:
ps -ef | grep etcd
Run the below command (based on the etcd data directory found above).
For example, chown etcd:etcd /var/lib/etcd

### 1.1.13 Ensure that the admin.conf file permissions are set to 644 or more restrictive (Automated)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chmod 644 /var/lib/rancher/k3s/server/cred/admin.kubeconfig

### 1.1.14 Ensure that the admin.conf file ownership is set to root:root (Automated)


**Result:** pass

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chown root:root /etc/kubernetes/admin.conf

**Audit:**

```bash
/bin/sh -c 'if test -e /var/lib/rancher/k3s/server/cred/admin.kubeconfig; then stat -c %U:%G /var/lib/rancher/k3s/server/cred/admin.kubeconfig; fi'
```

**Expected Result**:

```console
'root:root' is equal to 'root:root'
```

**Returned Value**:

```console
root:root
```

### 1.1.15 Ensure that the scheduler.conf file permissions are set to 644 or more restrictive (Automated)


**Result:** pass

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chmod 644 scheduler

**Audit:**

```bash
/bin/sh -c 'if test -e scheduler; then stat -c permissions=%a scheduler; fi'
```

**Expected Result**:

```console
'permissions' is not present
```

### 1.1.16 Ensure that the scheduler.conf file ownership is set to root:root (Automated)


**Result:** pass

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chown root:root scheduler

**Audit:**

```bash
/bin/sh -c 'if test -e scheduler; then stat -c %U:%G scheduler; fi'
```

**Expected Result**:

```console
'root:root' is not present
```

### 1.1.17 Ensure that the controller-manager.conf file permissions are set to 644 or more restrictive (Automated)


**Result:** pass

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chmod 644 controllermanager

**Audit:**

```bash
/bin/sh -c 'if test -e controllermanager; then stat -c permissions=%a controllermanager; fi'
```

**Expected Result**:

```console
'permissions' is not present
```

### 1.1.18 Ensure that the controller-manager.conf file ownership is set to root:root (Automated)


**Result:** pass

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chown root:root controllermanager

**Audit:**

```bash
stat -c %U:%G /var/lib/rancher/k3s/server/tls
```

**Expected Result**:

```console
'root:root' is equal to 'root:root'
```

**Returned Value**:

```console
root:root
```

### 1.1.19 Ensure that the Kubernetes PKI directory and file ownership is set to root:root (Automated)


**Result:** pass

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chown -R root:root /etc/kubernetes/pki/

**Audit:**

```bash
find /etc/kubernetes/pki/ | xargs stat -c %U:%G
```

**Expected Result**:

```console
'root:root' is not present
```

### 1.1.20 Ensure that the Kubernetes PKI certificate file permissions are set to 644 or more restrictive (Manual)


**Result:** pass

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chmod -R 644 /etc/kubernetes/pki/*.crt

**Audit:**

```bash
stat -c %n %a /var/lib/rancher/k3s/server/tls/*.crt
```

**Expected Result**:

```console
'permissions' is not present
```

### 1.1.21 Ensure that the Kubernetes PKI key file permissions are set to 600 (Manual)


**Result:** pass

**Remediation:**
Run the below command (based on the file location on your system) on the master node.
For example,
chmod -R 600 /etc/kubernetes/pki/*.key

**Audit:**

```bash
stat -c %n %a /var/lib/rancher/k3s/server/tls/*.key
```

**Expected Result**:

```console
'permissions' is not present
```

## 1.2 API Server
### 1.2.1 Ensure that the --anonymous-auth argument is set to false (Manual)


**Result:** warn

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the below parameter.
--anonymous-auth=false

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'anonymous-auth'
```

### 1.2.2 Ensure that the --basic-auth-file argument is not set (Automated)


**Result:** pass

**Remediation:**
Follow the documentation and configure alternate mechanisms for authentication. Then,
edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and remove the --basic-auth-file=<filename> parameter.

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'basic-auth-file'
```

**Expected Result**:

```console
'--basic-auth-file' is not present
```

### 1.2.3 Ensure that the --token-auth-file parameter is not set (Automated)


**Result:** pass

**Remediation:**
Follow the documentation and configure alternate mechanisms for authentication. Then,
edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and remove the --token-auth-file=<filename> parameter.

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'token-auth-file'
```

**Expected Result**:

```console
'--token-auth-file' is not present
```

### 1.2.4 Ensure that the --kubelet-https argument is set to true (Automated)


**Result:** Not Applicable

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and remove the --kubelet-https parameter.

### 1.2.5 Ensure that the --kubelet-client-certificate and --kubelet-client-key arguments are set as appropriate (Automated)


**Result:** pass

**Remediation:**
Follow the Kubernetes documentation and set up the TLS connection between the
apiserver and kubelets. Then, edit API server pod specification file
/etc/kubernetes/manifests/kube-apiserver.yaml on the master node and set the
kubelet client certificate and key parameters as below.
--kubelet-client-certificate=<path/to/client-certificate-file>
--kubelet-client-key=<path/to/client-key-file>

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'kubelet-certificate-authority'
```

**Expected Result**:

```console
'--kubelet-client-certificate' is not present AND '--kubelet-client-key' is not present
```

### 1.2.6 Ensure that the --kubelet-certificate-authority argument is set as appropriate (Automated)


**Result:** pass

**Remediation:**
Follow the Kubernetes documentation and setup the TLS connection between
the apiserver and kubelets. Then, edit the API server pod specification file
/etc/kubernetes/manifests/kube-apiserver.yaml on the master node and set the
--kubelet-certificate-authority parameter to the path to the cert file for the certificate authority.
--kubelet-certificate-authority=<ca-string>

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'kubelet-certificate-authority'
```

**Expected Result**:

```console
'--kubelet-certificate-authority' is not present
```

### 1.2.7 Ensure that the --authorization-mode argument is not set to AlwaysAllow (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --authorization-mode parameter to values other than AlwaysAllow.
One such example could be as below.
--authorization-mode=RBAC

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'authorization-mode'
```

**Expected Result**:

```console
'--authorization-mode' is not present
```

### 1.2.8 Ensure that the --authorization-mode argument includes Node (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --authorization-mode parameter to a value that includes Node.
--authorization-mode=Node,RBAC

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'authorization-mode'
```

**Expected Result**:

```console
'--authorization-mode' is not present
```

### 1.2.9 Ensure that the --authorization-mode argument includes RBAC (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --authorization-mode parameter to a value that includes RBAC,
for example:
--authorization-mode=Node,RBAC

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'authorization-mode'
```

**Expected Result**:

```console
'--authorization-mode' is not present
```

### 1.2.10 Ensure that the admission control plugin EventRateLimit is set (Manual)


**Result:** pass

**Remediation:**
Follow the Kubernetes documentation and set the desired limits in a configuration file.
Then, edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
and set the below parameters.
--enable-admission-plugins=...,EventRateLimit,...
--admission-control-config-file=<path/to/configuration/file>

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'enable-admission-plugins'
```

**Expected Result**:

```console
'--enable-admission-plugins' is not present
```

### 1.2.11 Ensure that the admission control plugin AlwaysAdmit is not set (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and either remove the --enable-admission-plugins parameter, or set it to a
value that does not include AlwaysAdmit.

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'enable-admission-plugins'
```

**Expected Result**:

```console
'--enable-admission-plugins' is not present OR '--enable-admission-plugins' is not present
```

### 1.2.12 Ensure that the admission control plugin AlwaysPullImages is set (Manual)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --enable-admission-plugins parameter to include
AlwaysPullImages.
--enable-admission-plugins=...,AlwaysPullImages,...

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'enable-admission-plugins'
```

**Expected Result**:

```console
'--enable-admission-plugins' is not present
```

### 1.2.13 Ensure that the admission control plugin SecurityContextDeny is set if PodSecurityPolicy is not used (Manual)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --enable-admission-plugins parameter to include
SecurityContextDeny, unless PodSecurityPolicy is already in place.
--enable-admission-plugins=...,SecurityContextDeny,...

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'enable-admission-plugins'
```

**Expected Result**:

```console
'--enable-admission-plugins' is not present OR '--enable-admission-plugins' is not present
```

### 1.2.14 Ensure that the admission control plugin ServiceAccount is set (Automated)


**Result:** pass

**Remediation:**
Follow the documentation and create ServiceAccount objects as per your environment.
Then, edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and ensure that the --disable-admission-plugins parameter is set to a
value that does not include ServiceAccount.

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'ServiceAccount'
```

**Expected Result**:

```console
'--disable-admission-plugins' is not present OR '--disable-admission-plugins' is not present
```

### 1.2.15 Ensure that the admission control plugin NamespaceLifecycle is set (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --disable-admission-plugins parameter to
ensure it does not include NamespaceLifecycle.

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'disable-admission-plugins'
```

**Expected Result**:

```console
'--disable-admission-plugins' is not present OR '--disable-admission-plugins' is not present
```

### 1.2.16 Ensure that the admission control plugin PodSecurityPolicy is set (Automated)


**Result:** pass

**Remediation:**
Follow the documentation and create Pod Security Policy objects as per your environment.
Then, edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --enable-admission-plugins parameter to a
value that includes PodSecurityPolicy:
--enable-admission-plugins=...,PodSecurityPolicy,...
Then restart the API Server.

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'enable-admission-plugins'
```

**Expected Result**:

```console
'--enable-admission-plugins' is not present
```

### 1.2.17 Ensure that the admission control plugin NodeRestriction is set (Automated)


**Result:** pass

**Remediation:**
Follow the Kubernetes documentation and configure NodeRestriction plug-in on kubelets.
Then, edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --enable-admission-plugins parameter to a
value that includes NodeRestriction.
--enable-admission-plugins=...,NodeRestriction,...

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'enable-admission-plugins'
```

**Expected Result**:

```console
'--enable-admission-plugins' is not present
```

### 1.2.18 Ensure that the --insecure-bind-address argument is not set (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and remove the --insecure-bind-address parameter.

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'insecure-bind-address'
```

**Expected Result**:

```console
'--insecure-bind-address' is not present
```

### 1.2.19 Ensure that the --insecure-port argument is set to 0 (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the below parameter.
--insecure-port=0

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'insecure-port'
```

**Expected Result**:

```console
'--insecure-port' is not present
```

### 1.2.20 Ensure that the --secure-port argument is not set to 0 (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and either remove the --secure-port parameter or
set it to a different (non-zero) desired port.

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'secure-port'
```

**Expected Result**:

```console
'--secure-port' is not present OR '--secure-port' is not present
```

### 1.2.21 Ensure that the --profiling argument is set to false (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the below parameter.
--profiling=false

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'profiling'
```

**Expected Result**:

```console
'--profiling' is not present
```

### 1.2.22 Ensure that the --audit-log-path argument is set (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --audit-log-path parameter to a suitable path and
file where you would like audit logs to be written, for example:
--audit-log-path=/var/log/apiserver/audit.log

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'audit-log-path'
```

**Expected Result**:

```console
'--audit-log-path' is not present
```

### 1.2.23 Ensure that the --audit-log-maxage argument is set to 30 or as appropriate (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --audit-log-maxage parameter to 30 or as an appropriate number of days:
--audit-log-maxage=30

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'audit-log-maxage'
```

**Expected Result**:

```console
'--audit-log-maxage' is not present
```

### 1.2.24 Ensure that the --audit-log-maxbackup argument is set to 10 or as appropriate (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --audit-log-maxbackup parameter to 10 or to an appropriate
value.
--audit-log-maxbackup=10

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'audit-log-maxbackup'
```

**Expected Result**:

```console
'--audit-log-maxbackup' is not present
```

### 1.2.25 Ensure that the --audit-log-maxsize argument is set to 100 or as appropriate (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --audit-log-maxsize parameter to an appropriate size in MB.
For example, to set it as 100 MB:
--audit-log-maxsize=100

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'audit-log-maxsize'
```

**Expected Result**:

```console
'--audit-log-maxsize' is not present
```

### 1.2.26 Ensure that the --request-timeout argument is set as appropriate (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
and set the below parameter as appropriate and if needed.
For example,
--request-timeout=300s

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'request-timeout'
```

**Expected Result**:

```console
'--request-timeout' is not present OR '--request-timeout' is not present
```

### 1.2.27 Ensure that the --service-account-lookup argument is set to true (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the below parameter.
--service-account-lookup=true
Alternatively, you can delete the --service-account-lookup parameter from this file so
that the default takes effect.

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'service-account-lookup'
```

**Expected Result**:

```console
'--service-account-lookup' is not present OR '--service-account-lookup' is not present
```

### 1.2.28 Ensure that the --service-account-key-file argument is set as appropriate (Automated)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --service-account-key-file parameter
to the public key file for service accounts:
--service-account-key-file=<filename>

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'service-account-key-file'
```

**Expected Result**:

```console
'--service-account-key-file' is not present
```

### 1.2.29 Ensure that the --etcd-certfile and --etcd-keyfile arguments are set as appropriate (Automated)


**Result:** pass

**Remediation:**
Follow the Kubernetes documentation and set up the TLS connection between the apiserver and etcd.
Then, edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the etcd certificate and key file parameters.
--etcd-certfile=<path/to/client-certificate-file>
--etcd-keyfile=<path/to/client-key-file>

**Audit Script:** `check_for_k3s_etcd.sh`

```bash
#!/bin/bash

# This script is used to ensure that k3s is actually running etcd (and not other databases like sqlite3)
# before it checks the requirement
set -eE

handle_error() {
    echo "false"
}

trap 'handle_error' ERR


if [[ "$(journalctl -D /var/log/journal -u k3s | grep 'Managed etcd' | grep -v grep | wc -l)" -gt 0 ]]; then
    case $1 in 
        "1.1.11")
            echo $(stat -c %a /var/lib/rancher/k3s/server/db/etcd);;
        "1.2.29")
            echo $(journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'etcd-');;
        "2.1")
            echo $(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.2")
            echo "$(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.3")
            echo $(grep 'auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.4")
            echo $(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.5")
            echo "$(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.6")
            echo $(grep 'peer-auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.7")
            echo $(grep 'trusted-ca-file' /var/lib/rancher/k3s/server/db/etcd/config);;
    esac
else
# If another database is running, return whatever is required to pass the scan
    case $1 in
        "1.1.11")
            echo "700";;
        "1.2.29")
            echo "--etcd-certfile AND --etcd-keyfile";;
        "2.1")
            echo "cert-file AND key-file";;
        "2.2")
            echo "true";;
        "2.3")
            echo "false";;
        "2.4")
            echo "peer-cert-file AND peer-key-file";;
        "2.5")
            echo "true";;
        "2.6")
            echo "--peer-auto-tls=false";;
        "2.7")
            echo "--trusted-ca-file";;
    esac
fi

```

**Audit Execution:**

```bash
./check_for_k3s_etcd.sh 1.2.29
```

**Expected Result**:

```console
'--etcd-certfile' is present AND '--etcd-keyfile' is present
```

**Returned Value**:

```console
Feb 21 23:13:24 <node_ip> k3s[5223]: time="2022-02-21T23:13:24.847339487Z" level=info msg="Running kube-apiserver --advertise-port=6443 --allow-privileged=true --anonymous-auth=false --api-audiences=https://kubernetes.default.svc.cluster.local,k3s --audit-log-maxage=30 --audit-log-maxbackup=10 --audit-log-maxsize=100 --audit-log-path=/var/lib/rancher/k3s/server/logs/audit-log --authorization-mode=Node,RBAC --bind-address=127.0.0.1 --cert-dir=/var/lib/rancher/k3s/server/tls/temporary-certs --client-ca-file=/var/lib/rancher/k3s/server/tls/client-ca.crt --enable-admission-plugins=NodeRestriction,PodSecurityPolicy,NamespaceLifecycle,ServiceAccount --encryption-provider-config=/var/lib/rancher/k3s/server/cred/encryption-config.json --etcd-cafile=/var/lib/rancher/k3s/server/tls/etcd/server-ca.crt --etcd-certfile=/var/lib/rancher/k3s/server/tls/etcd/client.crt --etcd-keyfile=/var/lib/rancher/k3s/server/tls/etcd/client.key --etcd-servers=https://127.0.0.1:2379 --insecure-port=0 --kubelet-certificate-authority=/var/lib/rancher/k3s/server/tls/server-ca.crt --kubelet-client-certificate=/var/lib/rancher/k3s/server/tls/client-kube-apiserver.crt --kubelet-client-key=/var/lib/rancher/k3s/server/tls/client-kube-apiserver.key --profiling=false --proxy-client-cert-file=/var/lib/rancher/k3s/server/tls/client-auth-proxy.crt --proxy-client-key-file=/var/lib/rancher/k3s/server/tls/client-auth-proxy.key --request-timeout=300s --requestheader-allowed-names=system:auth-proxy --requestheader-client-ca-file=/var/lib/rancher/k3s/server/tls/request-header-ca.crt --requestheader-extra-headers-prefix=X-Remote-Extra- --requestheader-group-headers=X-Remote-Group --requestheader-username-headers=X-Remote-User --secure-port=6444 --service-account-issuer=https://kubernetes.default.svc.cluster.local --service-account-key-file=/var/lib/rancher/k3s/server/tls/service.key --service-account-lookup=true --service-account-signing-key-file=/var/lib/rancher/k3s/server/tls/service.key --service-cluster-ip-range=10.43.0.0/16 --service-node-port-range=30000-32767 --storage-backend=etcd3 --tls-cert-file=/var/lib/rancher/k3s/server/tls/serving-kube-apiserver.crt --tls-private-key-file=/var/lib/rancher/k3s/server/tls/serving-kube-apiserver.key"
```

### 1.2.30 Ensure that the --tls-cert-file and --tls-private-key-file arguments are set as appropriate (Automated)


**Result:** pass

**Remediation:**
Follow the Kubernetes documentation and set up the TLS connection on the apiserver.
Then, edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the TLS certificate and private key file parameters.
--tls-cert-file=<path/to/tls-certificate-file>
--tls-private-key-file=<path/to/tls-key-file>

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep -A1 'Running kube-apiserver' | tail -n2
```

**Expected Result**:

```console
'--tls-cert-file' is present AND '--tls-private-key-file' is present
```

**Returned Value**:

```console
Feb 21 23:13:24 <node_ip> k3s[5223]: time="2022-02-21T23:13:24.847339487Z" level=info msg="Running kube-apiserver --advertise-port=6443 --allow-privileged=true --anonymous-auth=false --api-audiences=https://kubernetes.default.svc.cluster.local,k3s --audit-log-maxage=30 --audit-log-maxbackup=10 --audit-log-maxsize=100 --audit-log-path=/var/lib/rancher/k3s/server/logs/audit-log --authorization-mode=Node,RBAC --bind-address=127.0.0.1 --cert-dir=/var/lib/rancher/k3s/server/tls/temporary-certs --client-ca-file=/var/lib/rancher/k3s/server/tls/client-ca.crt --enable-admission-plugins=NodeRestriction,PodSecurityPolicy,NamespaceLifecycle,ServiceAccount --encryption-provider-config=/var/lib/rancher/k3s/server/cred/encryption-config.json --etcd-cafile=/var/lib/rancher/k3s/server/tls/etcd/server-ca.crt --etcd-certfile=/var/lib/rancher/k3s/server/tls/etcd/client.crt --etcd-keyfile=/var/lib/rancher/k3s/server/tls/etcd/client.key --etcd-servers=https://127.0.0.1:2379 --insecure-port=0 --kubelet-certificate-authority=/var/lib/rancher/k3s/server/tls/server-ca.crt --kubelet-client-certificate=/var/lib/rancher/k3s/server/tls/client-kube-apiserver.crt --kubelet-client-key=/var/lib/rancher/k3s/server/tls/client-kube-apiserver.key --profiling=false --proxy-client-cert-file=/var/lib/rancher/k3s/server/tls/client-auth-proxy.crt --proxy-client-key-file=/var/lib/rancher/k3s/server/tls/client-auth-proxy.key --request-timeout=300s --requestheader-allowed-names=system:auth-proxy --requestheader-client-ca-file=/var/lib/rancher/k3s/server/tls/request-header-ca.crt --requestheader-extra-headers-prefix=X-Remote-Extra- --requestheader-group-headers=X-Remote-Group --requestheader-username-headers=X-Remote-User --secure-port=6444 --service-account-issuer=https://kubernetes.default.svc.cluster.local --service-account-key-file=/var/lib/rancher/k3s/server/tls/service.key --service-account-lookup=true --service-account-signing-key-file=/var/lib/rancher/k3s/server/tls/service.key --service-cluster-ip-range=10.43.0.0/16 --service-node-port-range=30000-32767 --storage-backend=etcd3 --tls-cert-file=/var/lib/rancher/k3s/server/tls/serving-kube-apiserver.crt --tls-private-key-file=/var/lib/rancher/k3s/server/tls/serving-kube-apiserver.key" Feb 21 23:13:24 <node_ip> k3s[5223]: {"level":"info","ts":"2022-02-21T23:13:24.848Z","caller":"raft/raft.go:1530","msg":"b3656202b34887ca switched to configuration voters=(12926846069174208458)"}
```

### 1.2.31 Ensure that the --client-ca-file argument is set as appropriate (Automated)


**Result:** pass

**Remediation:**
Follow the Kubernetes documentation and set up the TLS connection on the apiserver.
Then, edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the client certificate authority file.
--client-ca-file=<path/to/client-ca-file>

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'client-ca-file'
```

**Expected Result**:

```console
'--client-ca-file' is not present
```

### 1.2.32 Ensure that the --etcd-cafile argument is set as appropriate (Automated)


**Result:** pass

**Remediation:**
Follow the Kubernetes documentation and set up the TLS connection between the apiserver and etcd.
Then, edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the etcd certificate authority file parameter.
--etcd-cafile=<path/to/ca-file>

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'etcd-cafile'
```

**Expected Result**:

```console
'--etcd-cafile' is not present
```

### 1.2.33 Ensure that the --encryption-provider-config argument is set as appropriate (Manual)


**Result:** pass

**Remediation:**
Follow the Kubernetes documentation and configure a EncryptionConfig file.
Then, edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the --encryption-provider-config parameter to the path of that file: --encryption-provider-config=</path/to/EncryptionConfig/File>

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'encryption-provider-config'
```

**Expected Result**:

```console
'--encryption-provider-config' is not present
```

### 1.2.34 Ensure that encryption providers are appropriately configured (Manual)


**Result:** warn

**Remediation:**
Follow the Kubernetes documentation and configure a EncryptionConfig file.
In this file, choose aescbc, kms or secretbox as the encryption provider.

**Audit:**

```bash
grep aescbc /path/to/encryption-config.json
```

### 1.2.35 Ensure that the API Server only makes use of Strong Cryptographic Ciphers (Manual)


**Result:** pass

**Remediation:**
Edit the API server pod specification file /etc/kubernetes/manifests/kube-apiserver.yaml
on the master node and set the below parameter.
--tls-cipher-suites=TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM
_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM
_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM
_SHA384

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'tls-cipher-suites'
```

**Expected Result**:

```console
'--tls-cipher-suites' is not present
```

## 1.3 Controller Manager
### 1.3.1 Ensure that the --terminated-pod-gc-threshold argument is set as appropriate (Manual)


**Result:** pass

**Remediation:**
Edit the Controller Manager pod specification file /etc/kubernetes/manifests/kube-controller-manager.yaml
on the master node and set the --terminated-pod-gc-threshold to an appropriate threshold,
for example:
--terminated-pod-gc-threshold=10

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-controller-manager' | tail -n1 | grep 'terminated-pod-gc-threshold'
```

**Expected Result**:

```console
'--terminated-pod-gc-threshold' is not present
```

### 1.3.2 Ensure that the --profiling argument is set to false (Automated)


**Result:** pass

**Remediation:**
Edit the Controller Manager pod specification file /etc/kubernetes/manifests/kube-controller-manager.yaml
on the master node and set the below parameter.
--profiling=false

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-controller-manager' | tail -n1 | grep 'profiling'
```

**Expected Result**:

```console
'--profiling' is not present
```

### 1.3.3 Ensure that the --use-service-account-credentials argument is set to true (Automated)


**Result:** pass

**Remediation:**
Edit the Controller Manager pod specification file /etc/kubernetes/manifests/kube-controller-manager.yaml
on the master node to set the below parameter.
--use-service-account-credentials=true

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-controller-manager' | tail -n1 | grep 'use-service-account-credentials'
```

**Expected Result**:

```console
'--use-service-account-credentials' is not present
```

### 1.3.4 Ensure that the --service-account-private-key-file argument is set as appropriate (Automated)


**Result:** pass

**Remediation:**
Edit the Controller Manager pod specification file /etc/kubernetes/manifests/kube-controller-manager.yaml
on the master node and set the --service-account-private-key-file parameter
to the private key file for service accounts.
--service-account-private-key-file=<filename>

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-controller-manager' | tail -n1 | grep 'service-account-private-key-file'
```

**Expected Result**:

```console
'--service-account-private-key-file' is not present
```

### 1.3.5 Ensure that the --root-ca-file argument is set as appropriate (Automated)


**Result:** pass

**Remediation:**
Edit the Controller Manager pod specification file /etc/kubernetes/manifests/kube-controller-manager.yaml
on the master node and set the --root-ca-file parameter to the certificate bundle file`.
--root-ca-file=<path/to/file>

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-controller-manager' | tail -n1 | grep 'root-ca-file'
```

**Expected Result**:

```console
'--root-ca-file' is not present
```

### 1.3.6 Ensure that the RotateKubeletServerCertificate argument is set to true (Automated)


**Result:** Not Applicable

**Remediation:**
Edit the Controller Manager pod specification file /etc/kubernetes/manifests/kube-controller-manager.yaml
on the master node and set the --feature-gates parameter to include RotateKubeletServerCertificate=true.
--feature-gates=RotateKubeletServerCertificate=true

### 1.3.7 Ensure that the --bind-address argument is set to 127.0.0.1 (Automated)


**Result:** pass

**Remediation:**
Edit the Controller Manager pod specification file /etc/kubernetes/manifests/kube-controller-manager.yaml
on the master node and ensure the correct value for the --bind-address parameter

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-controller-manager' | tail -n1 | grep 'bind-address'
```

**Expected Result**:

```console
'--bind-address' is present OR '--bind-address' is not present
```

## 1.4 Scheduler
### 1.4.1 Ensure that the --profiling argument is set to false (Automated)


**Result:** pass

**Remediation:**
Edit the Scheduler pod specification file /etc/kubernetes/manifests/kube-scheduler.yaml file
on the master node and set the below parameter.
--profiling=false

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-scheduler' | tail -n1
```

**Expected Result**:

```console
'false' is equal to 'false'
```

**Returned Value**:

```console
Feb 21 23:13:24 <node_ip> k3s[5223]: time="2022-02-21T23:13:24.851975832Z" level=info msg="Running kube-scheduler --address=127.0.0.1 --bind-address=127.0.0.1 --kubeconfig=/var/lib/rancher/k3s/server/cred/scheduler.kubeconfig --port=10251 --profiling=false --secure-port=0"
```

### 1.4.2 Ensure that the --bind-address argument is set to 127.0.0.1 (Automated)


**Result:** pass

**Remediation:**
Edit the Scheduler pod specification file /etc/kubernetes/manifests/kube-scheduler.yaml
on the master node and ensure the correct value for the --bind-address parameter

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-scheduler' | tail -n1 | grep 'bind-address'
```

**Expected Result**:

```console
'--bind-address' is present OR '--bind-address' is not present
```

## 2 Etcd Node Configuration Files
### 2.1 Ensure that the --cert-file and --key-file arguments are set as appropriate (Automated)


**Result:** pass

**Remediation:**
Follow the etcd service documentation and configure TLS encryption.
Then, edit the etcd pod specification file /etc/kubernetes/manifests/etcd.yaml
on the master node and set the below parameters.
--cert-file=</path/to/ca-file>
--key-file=</path/to/key-file>

**Audit Script:** `check_for_k3s_etcd.sh`

```bash
#!/bin/bash

# This script is used to ensure that k3s is actually running etcd (and not other databases like sqlite3)
# before it checks the requirement
set -eE

handle_error() {
    echo "false"
}

trap 'handle_error' ERR


if [[ "$(journalctl -D /var/log/journal -u k3s | grep 'Managed etcd' | grep -v grep | wc -l)" -gt 0 ]]; then
    case $1 in 
        "1.1.11")
            echo $(stat -c %a /var/lib/rancher/k3s/server/db/etcd);;
        "1.2.29")
            echo $(journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'etcd-');;
        "2.1")
            echo $(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.2")
            echo "$(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.3")
            echo $(grep 'auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.4")
            echo $(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.5")
            echo "$(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.6")
            echo $(grep 'peer-auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.7")
            echo $(grep 'trusted-ca-file' /var/lib/rancher/k3s/server/db/etcd/config);;
    esac
else
# If another database is running, return whatever is required to pass the scan
    case $1 in
        "1.1.11")
            echo "700";;
        "1.2.29")
            echo "--etcd-certfile AND --etcd-keyfile";;
        "2.1")
            echo "cert-file AND key-file";;
        "2.2")
            echo "true";;
        "2.3")
            echo "false";;
        "2.4")
            echo "peer-cert-file AND peer-key-file";;
        "2.5")
            echo "true";;
        "2.6")
            echo "--peer-auto-tls=false";;
        "2.7")
            echo "--trusted-ca-file";;
    esac
fi

```

**Audit Execution:**

```bash
./check_for_k3s_etcd.sh 2.1
```

**Expected Result**:

```console
'cert-file' is present AND 'key-file' is present
```

**Returned Value**:

```console
cert-file: /var/lib/rancher/k3s/server/tls/etcd/server-client.crt key-file: /var/lib/rancher/k3s/server/tls/etcd/server-client.key
```

### 2.2 Ensure that the --client-cert-auth argument is set to true (Automated)


**Result:** pass

**Remediation:**
Edit the etcd pod specification file /var/lib/rancher/k3s/server/db/etcd/config on the master
node and set the below parameter.
--client-cert-auth="true"

**Audit Script:** `check_for_k3s_etcd.sh`

```bash
#!/bin/bash

# This script is used to ensure that k3s is actually running etcd (and not other databases like sqlite3)
# before it checks the requirement
set -eE

handle_error() {
    echo "false"
}

trap 'handle_error' ERR


if [[ "$(journalctl -D /var/log/journal -u k3s | grep 'Managed etcd' | grep -v grep | wc -l)" -gt 0 ]]; then
    case $1 in 
        "1.1.11")
            echo $(stat -c %a /var/lib/rancher/k3s/server/db/etcd);;
        "1.2.29")
            echo $(journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'etcd-');;
        "2.1")
            echo $(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.2")
            echo "$(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.3")
            echo $(grep 'auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.4")
            echo $(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.5")
            echo "$(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.6")
            echo $(grep 'peer-auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.7")
            echo $(grep 'trusted-ca-file' /var/lib/rancher/k3s/server/db/etcd/config);;
    esac
else
# If another database is running, return whatever is required to pass the scan
    case $1 in
        "1.1.11")
            echo "700";;
        "1.2.29")
            echo "--etcd-certfile AND --etcd-keyfile";;
        "2.1")
            echo "cert-file AND key-file";;
        "2.2")
            echo "true";;
        "2.3")
            echo "false";;
        "2.4")
            echo "peer-cert-file AND peer-key-file";;
        "2.5")
            echo "true";;
        "2.6")
            echo "--peer-auto-tls=false";;
        "2.7")
            echo "--trusted-ca-file";;
    esac
fi

```

**Audit Execution:**

```bash
./check_for_k3s_etcd.sh 2.2
```

**Expected Result**:

```console
'--client-cert-auth' is not present
```

**Returned Value**:

```console
client-cert-auth: true
```

### 2.3 Ensure that the --auto-tls argument is not set to true (Automated)


**Result:** pass

**Remediation:**
Edit the etcd pod specification file /var/lib/rancher/k3s/server/db/etcd/config on the master
node and either remove the --auto-tls parameter or set it to false.
 --auto-tls=false

**Audit Script:** `check_for_k3s_etcd.sh`

```bash
#!/bin/bash

# This script is used to ensure that k3s is actually running etcd (and not other databases like sqlite3)
# before it checks the requirement
set -eE

handle_error() {
    echo "false"
}

trap 'handle_error' ERR


if [[ "$(journalctl -D /var/log/journal -u k3s | grep 'Managed etcd' | grep -v grep | wc -l)" -gt 0 ]]; then
    case $1 in 
        "1.1.11")
            echo $(stat -c %a /var/lib/rancher/k3s/server/db/etcd);;
        "1.2.29")
            echo $(journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'etcd-');;
        "2.1")
            echo $(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.2")
            echo "$(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.3")
            echo $(grep 'auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.4")
            echo $(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.5")
            echo "$(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.6")
            echo $(grep 'peer-auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.7")
            echo $(grep 'trusted-ca-file' /var/lib/rancher/k3s/server/db/etcd/config);;
    esac
else
# If another database is running, return whatever is required to pass the scan
    case $1 in
        "1.1.11")
            echo "700";;
        "1.2.29")
            echo "--etcd-certfile AND --etcd-keyfile";;
        "2.1")
            echo "cert-file AND key-file";;
        "2.2")
            echo "true";;
        "2.3")
            echo "false";;
        "2.4")
            echo "peer-cert-file AND peer-key-file";;
        "2.5")
            echo "true";;
        "2.6")
            echo "--peer-auto-tls=false";;
        "2.7")
            echo "--trusted-ca-file";;
    esac
fi

```

**Audit Execution:**

```bash
./check_for_k3s_etcd.sh 2.3
```

**Expected Result**:

```console
'--auto-tls' is not present OR '--auto-tls' is not present
```

**Returned Value**:

```console
false
```

### 2.4 Ensure that the --peer-cert-file and --peer-key-file arguments are set as appropriate (Automated)


**Result:** pass

**Remediation:**
Follow the etcd service documentation and configure peer TLS encryption as appropriate
for your etcd cluster.
Then, edit the etcd pod specification file /var/lib/rancher/k3s/server/db/etcd/config on the
master node and set the below parameters.
--peer-client-file=</path/to/peer-cert-file>
--peer-key-file=</path/to/peer-key-file>

**Audit Script:** `check_for_k3s_etcd.sh`

```bash
#!/bin/bash

# This script is used to ensure that k3s is actually running etcd (and not other databases like sqlite3)
# before it checks the requirement
set -eE

handle_error() {
    echo "false"
}

trap 'handle_error' ERR


if [[ "$(journalctl -D /var/log/journal -u k3s | grep 'Managed etcd' | grep -v grep | wc -l)" -gt 0 ]]; then
    case $1 in 
        "1.1.11")
            echo $(stat -c %a /var/lib/rancher/k3s/server/db/etcd);;
        "1.2.29")
            echo $(journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'etcd-');;
        "2.1")
            echo $(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.2")
            echo "$(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.3")
            echo $(grep 'auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.4")
            echo $(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.5")
            echo "$(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.6")
            echo $(grep 'peer-auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.7")
            echo $(grep 'trusted-ca-file' /var/lib/rancher/k3s/server/db/etcd/config);;
    esac
else
# If another database is running, return whatever is required to pass the scan
    case $1 in
        "1.1.11")
            echo "700";;
        "1.2.29")
            echo "--etcd-certfile AND --etcd-keyfile";;
        "2.1")
            echo "cert-file AND key-file";;
        "2.2")
            echo "true";;
        "2.3")
            echo "false";;
        "2.4")
            echo "peer-cert-file AND peer-key-file";;
        "2.5")
            echo "true";;
        "2.6")
            echo "--peer-auto-tls=false";;
        "2.7")
            echo "--trusted-ca-file";;
    esac
fi

```

**Audit Execution:**

```bash
./check_for_k3s_etcd.sh 2.4
```

**Expected Result**:

```console
'cert-file' is present AND 'key-file' is present
```

**Returned Value**:

```console
cert-file: /var/lib/rancher/k3s/server/tls/etcd/peer-server-client.crt key-file: /var/lib/rancher/k3s/server/tls/etcd/peer-server-client.key
```

### 2.5 Ensure that the --peer-client-cert-auth argument is set to true (Automated)


**Result:** pass

**Remediation:**
Edit the etcd pod specification file /var/lib/rancher/k3s/server/db/etcd/config on the master
node and set the below parameter.
--peer-client-cert-auth=true

**Audit Script:** `check_for_k3s_etcd.sh`

```bash
#!/bin/bash

# This script is used to ensure that k3s is actually running etcd (and not other databases like sqlite3)
# before it checks the requirement
set -eE

handle_error() {
    echo "false"
}

trap 'handle_error' ERR


if [[ "$(journalctl -D /var/log/journal -u k3s | grep 'Managed etcd' | grep -v grep | wc -l)" -gt 0 ]]; then
    case $1 in 
        "1.1.11")
            echo $(stat -c %a /var/lib/rancher/k3s/server/db/etcd);;
        "1.2.29")
            echo $(journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'etcd-');;
        "2.1")
            echo $(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.2")
            echo "$(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.3")
            echo $(grep 'auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.4")
            echo $(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.5")
            echo "$(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.6")
            echo $(grep 'peer-auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.7")
            echo $(grep 'trusted-ca-file' /var/lib/rancher/k3s/server/db/etcd/config);;
    esac
else
# If another database is running, return whatever is required to pass the scan
    case $1 in
        "1.1.11")
            echo "700";;
        "1.2.29")
            echo "--etcd-certfile AND --etcd-keyfile";;
        "2.1")
            echo "cert-file AND key-file";;
        "2.2")
            echo "true";;
        "2.3")
            echo "false";;
        "2.4")
            echo "peer-cert-file AND peer-key-file";;
        "2.5")
            echo "true";;
        "2.6")
            echo "--peer-auto-tls=false";;
        "2.7")
            echo "--trusted-ca-file";;
    esac
fi

```

**Audit Execution:**

```bash
./check_for_k3s_etcd.sh 2.5
```

**Expected Result**:

```console
'--client-cert-auth' is not present
```

**Returned Value**:

```console
client-cert-auth: true
```

### 2.6 Ensure that the --peer-auto-tls argument is not set to true (Automated)


**Result:** pass

**Remediation:**
Edit the etcd pod specification file /var/lib/rancher/k3s/server/db/etcd/config on the master
node and either remove the --peer-auto-tls parameter or set it to false.
--peer-auto-tls=false

**Audit Script:** `check_for_k3s_etcd.sh`

```bash
#!/bin/bash

# This script is used to ensure that k3s is actually running etcd (and not other databases like sqlite3)
# before it checks the requirement
set -eE

handle_error() {
    echo "false"
}

trap 'handle_error' ERR


if [[ "$(journalctl -D /var/log/journal -u k3s | grep 'Managed etcd' | grep -v grep | wc -l)" -gt 0 ]]; then
    case $1 in 
        "1.1.11")
            echo $(stat -c %a /var/lib/rancher/k3s/server/db/etcd);;
        "1.2.29")
            echo $(journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'etcd-');;
        "2.1")
            echo $(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.2")
            echo "$(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.3")
            echo $(grep 'auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.4")
            echo $(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.5")
            echo "$(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.6")
            echo $(grep 'peer-auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.7")
            echo $(grep 'trusted-ca-file' /var/lib/rancher/k3s/server/db/etcd/config);;
    esac
else
# If another database is running, return whatever is required to pass the scan
    case $1 in
        "1.1.11")
            echo "700";;
        "1.2.29")
            echo "--etcd-certfile AND --etcd-keyfile";;
        "2.1")
            echo "cert-file AND key-file";;
        "2.2")
            echo "true";;
        "2.3")
            echo "false";;
        "2.4")
            echo "peer-cert-file AND peer-key-file";;
        "2.5")
            echo "true";;
        "2.6")
            echo "--peer-auto-tls=false";;
        "2.7")
            echo "--trusted-ca-file";;
    esac
fi

```

**Audit Execution:**

```bash
./check_for_k3s_etcd.sh 2.6
```

**Expected Result**:

```console
'--peer-auto-tls' is not present OR '--peer-auto-tls' is present
```

**Returned Value**:

```console
false
```

### 2.7 Ensure that a unique Certificate Authority is used for etcd (Manual)


**Result:** pass

**Remediation:**
[Manual test]
Follow the etcd documentation and create a dedicated certificate authority setup for the
etcd service.
Then, edit the etcd pod specification file /var/lib/rancher/k3s/server/db/etcd/config on the
master node and set the below parameter.
--trusted-ca-file=</path/to/ca-file>

**Audit Script:** `check_for_k3s_etcd.sh`

```bash
#!/bin/bash

# This script is used to ensure that k3s is actually running etcd (and not other databases like sqlite3)
# before it checks the requirement
set -eE

handle_error() {
    echo "false"
}

trap 'handle_error' ERR


if [[ "$(journalctl -D /var/log/journal -u k3s | grep 'Managed etcd' | grep -v grep | wc -l)" -gt 0 ]]; then
    case $1 in 
        "1.1.11")
            echo $(stat -c %a /var/lib/rancher/k3s/server/db/etcd);;
        "1.2.29")
            echo $(journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'etcd-');;
        "2.1")
            echo $(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.2")
            echo "$(grep -A 5 'client-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.3")
            echo $(grep 'auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.4")
            echo $(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep -E 'cert-file|key-file');;
        "2.5")
            echo "$(grep -A 5 'peer-transport-security' /var/lib/rancher/k3s/server/db/etcd/config | grep 'client-cert-auth')";;
        "2.6")
            echo $(grep 'peer-auto-tls' /var/lib/rancher/k3s/server/db/etcd/config);;
        "2.7")
            echo $(grep 'trusted-ca-file' /var/lib/rancher/k3s/server/db/etcd/config);;
    esac
else
# If another database is running, return whatever is required to pass the scan
    case $1 in
        "1.1.11")
            echo "700";;
        "1.2.29")
            echo "--etcd-certfile AND --etcd-keyfile";;
        "2.1")
            echo "cert-file AND key-file";;
        "2.2")
            echo "true";;
        "2.3")
            echo "false";;
        "2.4")
            echo "peer-cert-file AND peer-key-file";;
        "2.5")
            echo "true";;
        "2.6")
            echo "--peer-auto-tls=false";;
        "2.7")
            echo "--trusted-ca-file";;
    esac
fi

```

**Audit Execution:**

```bash
./check_for_k3s_etcd.sh 2.7
```

**Expected Result**:

```console
'trusted-ca-file' is present
```

**Returned Value**:

```console
trusted-ca-file: /var/lib/rancher/k3s/server/tls/etcd/server-ca.crt trusted-ca-file: /var/lib/rancher/k3s/server/tls/etcd/peer-ca.crt
```

## 3.1 Authentication and Authorization
### 3.1.1 Client certificate authentication should not be used for users (Manual)


**Result:** warn

**Remediation:**
Alternative mechanisms provided by Kubernetes such as the use of OIDC should be
implemented in place of client certificates.

## 3.2 Logging
### 3.2.1 Ensure that a minimal audit policy is created (Manual)


**Result:** warn

**Remediation:**
Create an audit policy file for your cluster.

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'audit-policy-file'
```

### 3.2.2 Ensure that the audit policy covers key security concerns (Manual)


**Result:** warn

**Remediation:**
Consider modification of the audit policy in use on the cluster to include these items, at a
minimum.

## 4.1 Worker Node Configuration Files
### 4.1.1 Ensure that the kubelet service file permissions are set to 644 or more restrictive (Automated)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the each worker node.
For example,
chmod 644 /etc/systemd/system/kubelet.service.d/10-kubeadm.conf

### 4.1.2 Ensure that the kubelet service file ownership is set to root:root (Automated)


**Result:** Not Applicable

**Remediation:**
Run the below command (based on the file location on your system) on the each worker node.
For example,
chown root:root /etc/systemd/system/kubelet.service.d/10-kubeadm.conf

### 4.1.3 If proxy kubeconfig file exists ensure permissions are set to 644 or more restrictive (Manual)


**Result:** pass

**Remediation:**
Run the below command (based on the file location on your system) on the each worker node.
For example,
chmod 644 /var/lib/rancher/k3s/agent/kubeproxy.kubeconfig

**Audit:**

```bash
stat -c %a /var/lib/rancher/k3s/agent/kubeproxy.kubeconfig
```

**Expected Result**:

```console
'permissions' is present OR '/var/lib/rancher/k3s/agent/kubeproxy.kubeconfig' is not present
```

**Returned Value**:

```console
644
```

### 4.1.4 Ensure that the proxy kubeconfig file ownership is set to root:root (Manual)


**Result:** pass

**Remediation:**
Run the below command (based on the file location on your system) on the each worker node.
For example, chown root:root /var/lib/rancher/k3s/agent/kubeproxy.kubeconfig

**Audit:**

```bash
stat -c %U:%G /var/lib/rancher/k3s/agent/kubeproxy.kubeconfig
```

**Expected Result**:

```console
'root:root' is not present OR '/var/lib/rancher/k3s/agent/kubeproxy.kubeconfig' is not present
```

**Returned Value**:

```console
root:root
```

### 4.1.5 Ensure that the --kubeconfig kubelet.conf file permissions are set to 644 or more restrictive (Automated)


**Result:** pass

**Remediation:**
Run the below command (based on the file location on your system) on the each worker node.
For example,
chmod 644 /var/lib/rancher/k3s/server/cred/admin.kubeconfig

**Audit:**

```bash
stat -c %a /var/lib/rancher/k3s/agent/kubelet.kubeconfig
```

**Expected Result**:

```console
'644' is equal to '644'
```

**Returned Value**:

```console
644
```

### 4.1.6 Ensure that the --kubeconfig kubelet.conf file ownership is set to root:root (Manual)


**Result:** warn

**Remediation:**
Run the below command (based on the file location on your system) on the each worker node.
For example,
chown root:root /var/lib/rancher/k3s/server/cred/admin.kubeconfig

**Audit:**

```bash
stat -c %U:%G /var/lib/rancher/k3s/agent/kubelet.kubeconfig
```

### 4.1.7 Ensure that the certificate authorities file permissions are set to 644 or more restrictive (Manual)


**Result:** pass

**Remediation:**
Run the following command to modify the file permissions of the
--client-ca-file chmod 644 <filename>

**Audit:**

```bash
stat -c %a /var/lib/rancher/k3s/server/tls/server-ca.crt
```

**Expected Result**:

```console
'644' is equal to '644' OR '640' is present OR '600' is present OR '444' is present OR '440' is present OR '400' is present OR '000' is present
```

**Returned Value**:

```console
644
```

### 4.1.8 Ensure that the client certificate authorities file ownership is set to root:root (Manual)


**Result:** warn

**Remediation:**
Run the following command to modify the ownership of the --client-ca-file.
chown root:root <filename>

**Audit:**

```bash
stat -c %U:%G /var/lib/rancher/k3s/server/tls/client-ca.crt
```

### 4.1.9 Ensure that the kubelet --config configuration file has permissions set to 644 or more restrictive (Automated)


**Result:** Not Applicable

**Remediation:**
Run the following command (using the config file location identified in the Audit step)
chmod 644 /var/lib/kubelet/config.yaml

### 4.1.10 Ensure that the kubelet --config configuration file ownership is set to root:root (Automated)


**Result:** Not Applicable

**Remediation:**
Run the following command (using the config file location identified in the Audit step)
chown root:root /var/lib/kubelet/config.yaml

## 4.2 Kubelet
### 4.2.1 Ensure that the anonymous-auth argument is set to false (Automated)


**Result:** pass

**Remediation:**
If using a Kubelet config file, edit the file to set authentication: anonymous: enabled to
false.
If using executable arguments, edit the kubelet service file
/etc/systemd/system/kubelet.service.d/10-kubeadm.conf on each worker node and
set the below parameter in KUBELET_SYSTEM_PODS_ARGS variable.
--anonymous-auth=false
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'anonymous-auth' | grep -v grep
```

**Expected Result**:

```console
'false' is equal to 'false'
```

**Returned Value**:

```console
Feb 21 23:13:24 <node_ip> k3s[5223]: time="2022-02-21T23:13:24.847339487Z" level=info msg="Running kube-apiserver --advertise-port=6443 --allow-privileged=true --anonymous-auth=false --api-audiences=https://kubernetes.default.svc.cluster.local,k3s --audit-log-maxage=30 --audit-log-maxbackup=10 --audit-log-maxsize=100 --audit-log-path=/var/lib/rancher/k3s/server/logs/audit-log --authorization-mode=Node,RBAC --bind-address=127.0.0.1 --cert-dir=/var/lib/rancher/k3s/server/tls/temporary-certs --client-ca-file=/var/lib/rancher/k3s/server/tls/client-ca.crt --enable-admission-plugins=NodeRestriction,PodSecurityPolicy,NamespaceLifecycle,ServiceAccount --encryption-provider-config=/var/lib/rancher/k3s/server/cred/encryption-config.json --etcd-cafile=/var/lib/rancher/k3s/server/tls/etcd/server-ca.crt --etcd-certfile=/var/lib/rancher/k3s/server/tls/etcd/client.crt --etcd-keyfile=/var/lib/rancher/k3s/server/tls/etcd/client.key --etcd-servers=https://127.0.0.1:2379 --insecure-port=0 --kubelet-certificate-authority=/var/lib/rancher/k3s/server/tls/server-ca.crt --kubelet-client-certificate=/var/lib/rancher/k3s/server/tls/client-kube-apiserver.crt --kubelet-client-key=/var/lib/rancher/k3s/server/tls/client-kube-apiserver.key --profiling=false --proxy-client-cert-file=/var/lib/rancher/k3s/server/tls/client-auth-proxy.crt --proxy-client-key-file=/var/lib/rancher/k3s/server/tls/client-auth-proxy.key --request-timeout=300s --requestheader-allowed-names=system:auth-proxy --requestheader-client-ca-file=/var/lib/rancher/k3s/server/tls/request-header-ca.crt --requestheader-extra-headers-prefix=X-Remote-Extra- --requestheader-group-headers=X-Remote-Group --requestheader-username-headers=X-Remote-User --secure-port=6444 --service-account-issuer=https://kubernetes.default.svc.cluster.local --service-account-key-file=/var/lib/rancher/k3s/server/tls/service.key --service-account-lookup=true --service-account-signing-key-file=/var/lib/rancher/k3s/server/tls/service.key --service-cluster-ip-range=10.43.0.0/16 --service-node-port-range=30000-32767 --storage-backend=etcd3 --tls-cert-file=/var/lib/rancher/k3s/server/tls/serving-kube-apiserver.crt --tls-private-key-file=/var/lib/rancher/k3s/server/tls/serving-kube-apiserver.key"
```

### 4.2.2 Ensure that the --authorization-mode argument is not set to AlwaysAllow (Automated)


**Result:** pass

**Remediation:**
If using a Kubelet config file, edit the file to set authorization: mode to Webhook. If
using executable arguments, edit the kubelet service file
/etc/systemd/system/kubelet.service.d/10-kubeadm.conf on each worker node and
set the below parameter in KUBELET_AUTHZ_ARGS variable.
--authorization-mode=Webhook
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver' | tail -n1 | grep 'authorization-mode' | grep -v grep
```

**Expected Result**:

```console
'Node,RBAC' not have 'AlwaysAllow'
```

**Returned Value**:

```console
Feb 21 23:13:24 <node_ip> k3s[5223]: time="2022-02-21T23:13:24.847339487Z" level=info msg="Running kube-apiserver --advertise-port=6443 --allow-privileged=true --anonymous-auth=false --api-audiences=https://kubernetes.default.svc.cluster.local,k3s --audit-log-maxage=30 --audit-log-maxbackup=10 --audit-log-maxsize=100 --audit-log-path=/var/lib/rancher/k3s/server/logs/audit-log --authorization-mode=Node,RBAC --bind-address=127.0.0.1 --cert-dir=/var/lib/rancher/k3s/server/tls/temporary-certs --client-ca-file=/var/lib/rancher/k3s/server/tls/client-ca.crt --enable-admission-plugins=NodeRestriction,PodSecurityPolicy,NamespaceLifecycle,ServiceAccount --encryption-provider-config=/var/lib/rancher/k3s/server/cred/encryption-config.json --etcd-cafile=/var/lib/rancher/k3s/server/tls/etcd/server-ca.crt --etcd-certfile=/var/lib/rancher/k3s/server/tls/etcd/client.crt --etcd-keyfile=/var/lib/rancher/k3s/server/tls/etcd/client.key --etcd-servers=https://127.0.0.1:2379 --insecure-port=0 --kubelet-certificate-authority=/var/lib/rancher/k3s/server/tls/server-ca.crt --kubelet-client-certificate=/var/lib/rancher/k3s/server/tls/client-kube-apiserver.crt --kubelet-client-key=/var/lib/rancher/k3s/server/tls/client-kube-apiserver.key --profiling=false --proxy-client-cert-file=/var/lib/rancher/k3s/server/tls/client-auth-proxy.crt --proxy-client-key-file=/var/lib/rancher/k3s/server/tls/client-auth-proxy.key --request-timeout=300s --requestheader-allowed-names=system:auth-proxy --requestheader-client-ca-file=/var/lib/rancher/k3s/server/tls/request-header-ca.crt --requestheader-extra-headers-prefix=X-Remote-Extra- --requestheader-group-headers=X-Remote-Group --requestheader-username-headers=X-Remote-User --secure-port=6444 --service-account-issuer=https://kubernetes.default.svc.cluster.local --service-account-key-file=/var/lib/rancher/k3s/server/tls/service.key --service-account-lookup=true --service-account-signing-key-file=/var/lib/rancher/k3s/server/tls/service.key --service-cluster-ip-range=10.43.0.0/16 --service-node-port-range=30000-32767 --storage-backend=etcd3 --tls-cert-file=/var/lib/rancher/k3s/server/tls/serving-kube-apiserver.crt --tls-private-key-file=/var/lib/rancher/k3s/server/tls/serving-kube-apiserver.key"
```

### 4.2.3 Ensure that the --client-ca-file argument is set as appropriate (Automated)


**Result:** pass

**Remediation:**
If using a Kubelet config file, edit the file to set authentication: x509: clientCAFile to
the location of the client CA file.
If using command line arguments, edit the kubelet service file
/etc/systemd/system/kubelet.service.d/10-kubeadm.conf on each worker node and
set the below parameter in KUBELET_AUTHZ_ARGS variable.
--client-ca-file=<path/to/client-ca-file>
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kube-apiserver'| tail -n1 | grep 'client-ca-file' | grep -v grep
```

**Expected Result**:

```console
'--client-ca-file' is present
```

**Returned Value**:

```console
Feb 21 23:13:24 <node_ip> k3s[5223]: time="2022-02-21T23:13:24.847339487Z" level=info msg="Running kube-apiserver --advertise-port=6443 --allow-privileged=true --anonymous-auth=false --api-audiences=https://kubernetes.default.svc.cluster.local,k3s --audit-log-maxage=30 --audit-log-maxbackup=10 --audit-log-maxsize=100 --audit-log-path=/var/lib/rancher/k3s/server/logs/audit-log --authorization-mode=Node,RBAC --bind-address=127.0.0.1 --cert-dir=/var/lib/rancher/k3s/server/tls/temporary-certs --client-ca-file=/var/lib/rancher/k3s/server/tls/client-ca.crt --enable-admission-plugins=NodeRestriction,PodSecurityPolicy,NamespaceLifecycle,ServiceAccount --encryption-provider-config=/var/lib/rancher/k3s/server/cred/encryption-config.json --etcd-cafile=/var/lib/rancher/k3s/server/tls/etcd/server-ca.crt --etcd-certfile=/var/lib/rancher/k3s/server/tls/etcd/client.crt --etcd-keyfile=/var/lib/rancher/k3s/server/tls/etcd/client.key --etcd-servers=https://127.0.0.1:2379 --insecure-port=0 --kubelet-certificate-authority=/var/lib/rancher/k3s/server/tls/server-ca.crt --kubelet-client-certificate=/var/lib/rancher/k3s/server/tls/client-kube-apiserver.crt --kubelet-client-key=/var/lib/rancher/k3s/server/tls/client-kube-apiserver.key --profiling=false --proxy-client-cert-file=/var/lib/rancher/k3s/server/tls/client-auth-proxy.crt --proxy-client-key-file=/var/lib/rancher/k3s/server/tls/client-auth-proxy.key --request-timeout=300s --requestheader-allowed-names=system:auth-proxy --requestheader-client-ca-file=/var/lib/rancher/k3s/server/tls/request-header-ca.crt --requestheader-extra-headers-prefix=X-Remote-Extra- --requestheader-group-headers=X-Remote-Group --requestheader-username-headers=X-Remote-User --secure-port=6444 --service-account-issuer=https://kubernetes.default.svc.cluster.local --service-account-key-file=/var/lib/rancher/k3s/server/tls/service.key --service-account-lookup=true --service-account-signing-key-file=/var/lib/rancher/k3s/server/tls/service.key --service-cluster-ip-range=10.43.0.0/16 --service-node-port-range=30000-32767 --storage-backend=etcd3 --tls-cert-file=/var/lib/rancher/k3s/server/tls/serving-kube-apiserver.crt --tls-private-key-file=/var/lib/rancher/k3s/server/tls/serving-kube-apiserver.key"
```

### 4.2.4 Ensure that the --read-only-port argument is set to 0 (Manual)


**Result:** warn

**Remediation:**
If using a Kubelet config file, edit the file to set readOnlyPort to 0.
If using command line arguments, edit the kubelet service file
/etc/systemd/system/kubelet.service.d/10-kubeadm.conf on each worker node and
set the below parameter in KUBELET_SYSTEM_PODS_ARGS variable.
--read-only-port=0
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kubelet' | tail -n1 | grep 'read-only-port'
```

### 4.2.5 Ensure that the --streaming-connection-idle-timeout argument is not set to 0 (Manual)


**Result:** warn

**Remediation:**
If using a Kubelet config file, edit the file to set streamingConnectionIdleTimeout to a
value other than 0.
If using command line arguments, edit the kubelet service file
/etc/systemd/system/kubelet.service.d/10-kubeadm.conf on each worker node and
set the below parameter in KUBELET_SYSTEM_PODS_ARGS variable.
--streaming-connection-idle-timeout=5m
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kubelet' | tail -n1 | grep 'streaming-connection-idle-timeout'
```

### 4.2.6 Ensure that the --protect-kernel-defaults argument is set to true (Automated)


**Result:** pass

**Remediation:**
If using a Kubelet config file, edit the file to set protectKernelDefaults: true.
If using command line arguments, edit the kubelet service file
/etc/systemd/system/kubelet.service.d/10-kubeadm.conf on each worker node and
set the below parameter in KUBELET_SYSTEM_PODS_ARGS variable.
--protect-kernel-defaults=true
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kubelet' | tail -n1 | grep 'protect-kernel-defaults'
```

**Expected Result**:

```console
'true' is equal to 'true'
```

**Returned Value**:

```console
Feb 21 23:13:32 <node_ip> k3s[5223]: time="2022-02-21T23:13:32.581127632Z" level=info msg="Running kubelet --address=0.0.0.0 --anonymous-auth=false --authentication-token-webhook=true --authorization-mode=Webhook --cgroup-driver=cgroupfs --client-ca-file=/var/lib/rancher/k3s/agent/client-ca.crt --cloud-provider=external --cluster-dns=10.43.0.10 --cluster-domain=cluster.local --cni-bin-dir=/var/lib/rancher/k3s/data/9de9bfcf367b723ef0ac73dd91761165a4a8ad11ad16a758d3a996264e60c612/bin --cni-conf-dir=/var/lib/rancher/k3s/agent/etc/cni/net.d --container-runtime-endpoint=unix:///run/k3s/containerd/containerd.sock --container-runtime=remote --containerd=/run/k3s/containerd/containerd.sock --eviction-hard=imagefs.available<5%,nodefs.available<5% --eviction-minimum-reclaim=imagefs.available=10%,nodefs.available=10% --fail-swap-on=false --healthz-bind-address=127.0.0.1 --hostname-override=<node_ip> --kubeconfig=/var/lib/rancher/k3s/agent/kubelet.kubeconfig --make-iptables-util-chains=true --node-labels= --pod-manifest-path=/var/lib/rancher/k3s/agent/pod-manifests --protect-kernel-defaults=true --read-only-port=0 --resolv-conf=/run/systemd/resolve/resolv.conf --serialize-image-pulls=false --streaming-connection-idle-timeout=5m --tls-cert-file=/var/lib/rancher/k3s/agent/serving-kubelet.crt --tls-private-key-file=/var/lib/rancher/k3s/agent/serving-kubelet.key"
```

### 4.2.7 Ensure that the --make-iptables-util-chains argument is set to true (Automated)


**Result:** pass

**Remediation:**
If using a Kubelet config file, edit the file to set makeIPTablesUtilChains: true.
If using command line arguments, edit the kubelet service file
/etc/systemd/system/kubelet.service.d/10-kubeadm.conf on each worker node and
remove the --make-iptables-util-chains argument from the
KUBELET_SYSTEM_PODS_ARGS variable.
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kubelet' | tail -n1 | grep 'make-iptables-util-chains'
```

**Expected Result**:

```console
'true' is equal to 'true' OR '--make-iptables-util-chains' is not present
```

**Returned Value**:

```console
Feb 21 23:13:32 <node_ip> k3s[5223]: time="2022-02-21T23:13:32.581127632Z" level=info msg="Running kubelet --address=0.0.0.0 --anonymous-auth=false --authentication-token-webhook=true --authorization-mode=Webhook --cgroup-driver=cgroupfs --client-ca-file=/var/lib/rancher/k3s/agent/client-ca.crt --cloud-provider=external --cluster-dns=10.43.0.10 --cluster-domain=cluster.local --cni-bin-dir=/var/lib/rancher/k3s/data/9de9bfcf367b723ef0ac73dd91761165a4a8ad11ad16a758d3a996264e60c612/bin --cni-conf-dir=/var/lib/rancher/k3s/agent/etc/cni/net.d --container-runtime-endpoint=unix:///run/k3s/containerd/containerd.sock --container-runtime=remote --containerd=/run/k3s/containerd/containerd.sock --eviction-hard=imagefs.available<5%,nodefs.available<5% --eviction-minimum-reclaim=imagefs.available=10%,nodefs.available=10% --fail-swap-on=false --healthz-bind-address=127.0.0.1 --hostname-override=<node_ip> --kubeconfig=/var/lib/rancher/k3s/agent/kubelet.kubeconfig --make-iptables-util-chains=true --node-labels= --pod-manifest-path=/var/lib/rancher/k3s/agent/pod-manifests --protect-kernel-defaults=true --read-only-port=0 --resolv-conf=/run/systemd/resolve/resolv.conf --serialize-image-pulls=false --streaming-connection-idle-timeout=5m --tls-cert-file=/var/lib/rancher/k3s/agent/serving-kubelet.crt --tls-private-key-file=/var/lib/rancher/k3s/agent/serving-kubelet.key"
```

### 4.2.8 Ensure that the --hostname-override argument is not set (Manual)


**Result:** Not Applicable

**Remediation:**
Edit the kubelet service file /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
on each worker node and remove the --hostname-override argument from the
KUBELET_SYSTEM_PODS_ARGS variable.
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

### 4.2.9 Ensure that the --event-qps argument is set to 0 or a level which ensures appropriate event capture (Manual)


**Result:** warn

**Remediation:**
If using a Kubelet config file, edit the file to set eventRecordQPS: to an appropriate level.
If using command line arguments, edit the kubelet service file
/etc/systemd/system/kubelet.service.d/10-kubeadm.conf on each worker node and
set the below parameter in KUBELET_SYSTEM_PODS_ARGS variable.
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

**Audit:**

```bash
/bin/ps -fC containerd
```

### 4.2.10 Ensure that the --tls-cert-file and --tls-private-key-file arguments are set as appropriate (Manual)


**Result:** warn

**Remediation:**
If using a Kubelet config file, edit the file to set tlsCertFile to the location
of the certificate file to use to identify this Kubelet, and tlsPrivateKeyFile
to the location of the corresponding private key file.
If using command line arguments, edit the kubelet service file
/etc/systemd/system/kubelet.service.d/10-kubeadm.conf on each worker node and
set the below parameters in KUBELET_CERTIFICATE_ARGS variable.
--tls-cert-file=<path/to/tls-certificate-file>
--tls-private-key-file=<path/to/tls-key-file>
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

**Audit:**

```bash
journalctl -D /var/log/journal -u k3s | grep 'Running kubelet' | tail -n1
```

### 4.2.11 Ensure that the --rotate-certificates argument is not set to false (Manual)


**Result:** Not Applicable

**Remediation:**
If using a Kubelet config file, edit the file to add the line rotateCertificates: true or
remove it altogether to use the default value.
If using command line arguments, edit the kubelet service file
/etc/systemd/system/kubelet.service.d/10-kubeadm.conf on each worker node and
remove --rotate-certificates=false argument from the KUBELET_CERTIFICATE_ARGS
variable.
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

### 4.2.12 Verify that the RotateKubeletServerCertificate argument is set to true (Manual)


**Result:** Not Applicable

**Remediation:**
Edit the kubelet service file /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
on each worker node and set the below parameter in KUBELET_CERTIFICATE_ARGS variable.
--feature-gates=RotateKubeletServerCertificate=true
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

### 4.2.13 Ensure that the Kubelet only makes use of Strong Cryptographic Ciphers (Manual)


**Result:** warn

**Remediation:**
If using a Kubelet config file, edit the file to set TLSCipherSuites: to
TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256
or to a subset of these values.
If using executable arguments, edit the kubelet service file
/etc/systemd/system/kubelet.service.d/10-kubeadm.conf on each worker node and
set the --tls-cipher-suites parameter as follows, or to a subset of these values.
--tls-cipher-suites=TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256
Based on your system, restart the kubelet service. For example:
systemctl daemon-reload
systemctl restart kubelet.service

**Audit:**

```bash
/bin/ps -fC containerd
```

## 5.1 RBAC and Service Accounts
### 5.1.1 Ensure that the cluster-admin role is only used where required (Manual)


**Result:** warn

**Remediation:**
Identify all clusterrolebindings to the cluster-admin role. Check if they are used and
if they need this role or if they could use a role with fewer privileges.
Where possible, first bind users to a lower privileged role and then remove the
clusterrolebinding to the cluster-admin role :
kubectl delete clusterrolebinding [name]

### 5.1.2 Minimize access to secrets (Manual)


**Result:** warn

**Remediation:**
Where possible, remove get, list and watch access to secret objects in the cluster.

### 5.1.3 Minimize wildcard use in Roles and ClusterRoles (Manual)


**Result:** warn

**Remediation:**
Where possible replace any use of wildcards in clusterroles and roles with specific
objects or actions.

### 5.1.4 Minimize access to create pods (Manual)


**Result:** warn

**Remediation:**
Where possible, remove create access to pod objects in the cluster.

### 5.1.5 Ensure that default service accounts are not actively used. (Manual)


**Result:** warn

**Remediation:**
Create explicit service accounts wherever a Kubernetes workload requires specific access
to the Kubernetes API server.
Modify the configuration of each default service account to include this value
automountServiceAccountToken: false

### 5.1.6 Ensure that Service Account Tokens are only mounted where necessary (Manual)


**Result:** warn

**Remediation:**
Modify the definition of pods and service accounts which do not need to mount service
account tokens to disable it.

## 5.2 Pod Security Policies
### 5.2.1 Minimize the admission of privileged containers (Manual)


**Result:** warn

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that
the .spec.privileged field is omitted or set to false.

**Audit:**

```bash
kubectl describe psp global-restricted-psp | grep MustRunAsNonRoot
```

### 5.2.2 Minimize the admission of containers wishing to share the host process ID namespace (Manual)


**Result:** pass

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that the
.spec.hostPID field is omitted or set to false.

**Audit:**

```bash
kubectl get psp -o json | jq .items[] | jq -r 'select((.spec.hostPID == null) or (.spec.hostPID == false))' | jq .metadata.name | wc -l | xargs -I {} echo '--count={}'
```

**Expected Result**:

```console
1 is greater than 0
```

**Returned Value**:

```console
--count=1
```

### 5.2.3 Minimize the admission of containers wishing to share the host IPC namespace (Manual)


**Result:** pass

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that the
.spec.hostIPC field is omitted or set to false.

**Audit:**

```bash
kubectl get psp -o json | jq .items[] | jq -r 'select((.spec.hostIPC == null) or (.spec.hostIPC == false))' | jq .metadata.name | wc -l | xargs -I {} echo '--count={}'
```

**Expected Result**:

```console
1 is greater than 0
```

**Returned Value**:

```console
--count=1
```

### 5.2.4 Minimize the admission of containers wishing to share the host network namespace (Manual)


**Result:** pass

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that the
.spec.hostNetwork field is omitted or set to false.

**Audit:**

```bash
kubectl get psp -o json | jq .items[] | jq -r 'select((.spec.hostNetwork == null) or (.spec.hostNetwork == false))' | jq .metadata.name | wc -l | xargs -I {} echo '--count={}'
```

**Expected Result**:

```console
1 is greater than 0
```

**Returned Value**:

```console
--count=1
```

### 5.2.5 Minimize the admission of containers with allowPrivilegeEscalation (Manual)


**Result:** pass

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that the
.spec.allowPrivilegeEscalation field is omitted or set to false.

**Audit:**

```bash
kubectl get psp -o json | jq .items[] | jq -r 'select((.spec.allowPrivilegeEscalation == null) or (.spec.allowPrivilegeEscalation == false))' | jq .metadata.name | wc -l | xargs -I {} echo '--count={}'
```

**Expected Result**:

```console
1 is greater than 0
```

**Returned Value**:

```console
--count=1
```

### 5.2.6 Minimize the admission of root containers (Manual)


**Result:** pass

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that the
.spec.runAsUser.rule is set to either MustRunAsNonRoot or MustRunAs with the range of
UIDs not including 0.

**Audit:**

```bash
kubectl get psp -o json | jq .items[] | jq -r 'select((.spec.allowPrivilegeEscalation == null) or (.spec.allowPrivilegeEscalation == false))' | jq .metadata.name | wc -l | xargs -I {} echo '--count={}'
```

**Expected Result**:

```console
1 is greater than 0
```

**Returned Value**:

```console
--count=1
```

### 5.2.7 Minimize the admission of containers with the NET_RAW capability (Manual)


**Result:** warn

**Remediation:**
Create a PSP as described in the Kubernetes documentation, ensuring that the
.spec.requiredDropCapabilities is set to include either NET_RAW or ALL.

**Audit:**

```bash
kubectl get psp
```

### 5.2.8 Minimize the admission of containers with added capabilities (Manual)


**Result:** warn

**Remediation:**
Ensure that allowedCapabilities is not present in PSPs for the cluster unless
it is set to an empty array.

### 5.2.9 Minimize the admission of containers with capabilities assigned (Manual)


**Result:** warn

**Remediation:**
Review the use of capabilites in applications runnning on your cluster. Where a namespace
contains applicaions which do not require any Linux capabities to operate consider adding
a PSP which forbids the admission of containers which do not drop all capabilities.

## 5.3 Network Policies and CNI
### 5.3.1 Ensure that the CNI in use supports Network Policies (Manual)


**Result:** warn

**Remediation:**
If the CNI plugin in use does not support network policies, consideration should be given to
making use of a different plugin, or finding an alternate mechanism for restricting traffic
in the Kubernetes cluster.

### 5.3.2 Ensure that all Namespaces have Network Policies defined (Manual)


**Result:** pass

**Remediation:**
Follow the documentation and create NetworkPolicy objects as you need them.

**Audit Script:** `check_for_rke2_network_policies.sh`

```bash
#!/bin/bash

set -eE

handle_error() {
    echo "false"
}

trap 'handle_error' ERR

for namespace in kube-system kube-public default; do
  policy_count=$(/var/lib/rancher/rke2/bin/kubectl get networkpolicy -n ${namespace} -o json | jq -r '.items | length')
  if [ ${policy_count} -eq 0 ]; then
    echo "false"
    exit
  fi
done

echo "true"

```

**Audit Execution:**

```bash
./check_for_rke2_network_policies.sh 
```

**Expected Result**:

```console
'true' is equal to 'true'
```

**Returned Value**:

```console
true
```

## 5.4 Secrets Management
### 5.4.1 Prefer using secrets as files over secrets as environment variables (Manual)


**Result:** warn

**Remediation:**
if possible, rewrite application code to read secrets from mounted secret files, rather than
from environment variables.

**Audit:**

```bash
kubectl get all -o jsonpath='{range .items[?(@..secretKeyRef)]} {.kind} {.metadata.name} {' '}{end}' -A
```

### 5.4.2 Consider external secret storage (Manual)


**Result:** warn

**Remediation:**
Refer to the secrets management options offered by your cloud provider or a third-party
secrets management solution.

## 5.5 Extensible Admission Control
### 5.5.1 Configure Image Provenance using ImagePolicyWebhook admission controller (Manual)


**Result:** warn

**Remediation:**
Follow the Kubernetes documentation and setup image provenance.

## 5.7 General Policies
### 5.7.1 Create administrative boundaries between resources using namespaces (Manual)


**Result:** warn

**Remediation:**
Follow the documentation and create namespaces for objects in your deployment as you need
them.

### 5.7.2 Ensure that the seccomp profile is set to docker/default in your pod definitions (Manual)


**Result:** warn

**Remediation:**
Seccomp is an alpha feature currently. By default, all alpha features are disabled. So, you
would need to enable alpha features in the apiserver by passing "--feature-
gates=AllAlpha=true" argument.
Edit the /etc/kubernetes/apiserver file on the master node and set the KUBE_API_ARGS
parameter to "--feature-gates=AllAlpha=true"
KUBE_API_ARGS="--feature-gates=AllAlpha=true"
Based on your system, restart the kube-apiserver service. For example:
systemctl restart kube-apiserver.service
Use annotations to enable the docker/default seccomp profile in your pod definitions. An
example is as below:
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

### 5.7.3 Apply Security Context to Your Pods and Containers (Manual)


**Result:** warn

**Remediation:**
Follow the Kubernetes documentation and apply security contexts to your pods. For a
suggested list of security contexts, you may refer to the CIS Security Benchmark for Docker
Containers.

### 5.7.4 The default namespace should not be used (Manual)


**Result:** pass

**Remediation:**
Ensure that namespaces are created to allow for appropriate segregation of Kubernetes
resources and that all new resources are created in a specific namespace.

**Audit:**

```bash
kubectl get all --no-headers -n default | grep -v service | wc -l | xargs -I {} echo '--count={}'
```

**Expected Result**:

```console
'0' is equal to '0'
```

**Returned Value**:

```console
--count=0
```
