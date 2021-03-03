---
title: Skipped and Not Applicable Tests
weight: 1
aliases:
  - /rancher/v2.0-v2.4/en/cis-scans/legacy/skipped-tests
  - /rancher/v2.0-v2.4/en/cis-scans/v2.4/skipped-tests
  - /rancher/v2.0-v2.4/en/cis-scans/skipped-tests
---

This section lists the tests that are skipped in the permissive test profile for RKE.

All the tests that are skipped and not applicable on this page will be counted as Not Applicable in the generated report. The skipped test count will only mention the user-defined skipped tests. This allows user-skipped tests to be distinguished from the tests that are skipped by default in the RKE permissive test profile.

- [CIS Benchmark v1.5](#cis-benchmark-v1-5)
- [CIS Benchmark v1.4](#cis-benchmark-v1-4)

# CIS Benchmark v1.5

### CIS Benchmark v1.5 Skipped Tests

| Number | Description | Reason for Skipping |
| ---------- | ------------- | --------- |
| 1.1.12 |  Ensure that the etcd data directory ownership is set to etcd:etcd (Scored) |  A system service account is required for etcd data directory ownership. Refer to Rancher's hardening guide for more details on how to configure this ownership.     |
| 1.2.6 | Ensure that the --kubelet-certificate-authority argument is set as appropriate (Scored)  |  When generating serving certificates, functionality could break in conjunction with hostname overrides which are required for certain cloud providers.  |
| 1.2.16 | Ensure that the admission control plugin PodSecurityPolicy is set (Scored) |  Enabling Pod Security Policy can cause applications to unexpectedly fail.     |
| 1.2.33 | Ensure that the --encryption-provider-config argument is set as appropriate (Not Scored)  |  Enabling encryption changes how data can be recovered as data is encrypted.     |
| 1.2.34 | Ensure that encryption providers are appropriately configured (Not Scored) |  Enabling encryption changes how data can be recovered as data is encrypted.     |
| 4.2.6 | Ensure that the --protect-kernel-defaults argument is set to true (Scored) |  System level configurations are required before provisioning the cluster in order for this argument to be set to true.     |
| 4.2.10 |  Ensure that the--tls-cert-file and --tls-private-key-file arguments are set as appropriate (Scored) |  When generating serving certificates, functionality could break in conjunction with hostname overrides which are required for certain cloud providers.     |
| 5.1.5 |  Ensure that default service accounts are not actively used. (Scored)  |  Kubernetes provides default service accounts to be used.     |
| 5.2.2 | Minimize the admission of containers wishing to share the host process ID namespace (Scored) |  Enabling Pod Security Policy can cause applications to unexpectedly fail.     |
| 5.2.3 |  Minimize the admission of containers wishing to share the host IPC namespace (Scored) |  Enabling Pod Security Policy can cause applications to unexpectedly fail.     |
| 5.2.4 |  Minimize the admission of containers wishing to share the host network namespace (Scored) |  Enabling Pod Security Policy can cause applications to unexpectedly fail.     |
| 5.2.5 |   Minimize the admission of containers with allowPrivilegeEscalation (Scored)  |  Enabling Pod Security Policy can cause applications to unexpectedly fail.     |
| 5.3.2 | Ensure that all Namespaces have Network Policies defined (Scored) |  Enabling Network Policies can prevent certain applications from communicating with each other.     |
| 5.6.4 | The default namespace should not be used (Scored)  |  Kubernetes provides a default namespace.     |

### CIS Benchmark v1.5 Not Applicable Tests

| Number | Description | Reason for being not applicable |
| ---------- | ------------- | --------- |
| 1.1.1 | Ensure that the API server pod specification file permissions are set to 644 or more restrictive (Scored)  |  Clusters provisioned by RKE doesn't require or maintain a configuration file for kube-apiserver. All configuration is passed in as arguments at container run time.     |
| 1.1.2 |  Ensure that the API server pod specification file ownership is set to root:root (Scored) |  Clusters provisioned by RKE doesn't require or maintain a configuration file for kube-apiserver. All configuration is passed in as arguments at container run time.     |
| 1.1.3 |  Ensure that the controller manager pod specification file permissions are set to 644 or more restrictive (Scored) |  Clusters provisioned by RKE doesn't require or maintain a configuration file for controller-manager. All configuration is passed in as arguments at container run time.     |
| 1.1.4 |  Ensure that the controller manager pod specification file ownership is set to root:root (Scored) |  Clusters provisioned by RKE doesn't require or maintain a configuration file for controller-manager. All configuration is passed in as arguments at container run time.     |
| 1.1.5 |  Ensure that the scheduler pod specification file permissions are set to 644 or more restrictive (Scored) |  Clusters provisioned by RKE doesn't require or maintain a configuration file for scheduler. All configuration is passed in as arguments at container run time.     |
| 1.1.6 |  Ensure that the scheduler pod specification file ownership is set to root:root (Scored) |  Clusters provisioned by RKE doesn't require or maintain a configuration file for scheduler. All configuration is passed in as arguments at container run time.     |
| 1.1.7 |  Ensure that the etcd pod specification file permissions are set to 644 or more restrictive (Scored)  |  Clusters provisioned by RKE doesn't require or maintain a configuration file for etcd. All configuration is passed in as arguments at container run time.     |
| 1.1.8 |  Ensure that the etcd pod specification file ownership is set to root:root (Scored)  |  Clusters provisioned by RKE doesn't require or maintain a configuration file for etcd. All configuration is passed in as arguments at container run time.     |
| 1.1.13 |  Ensure that the admin.conf file permissions are set to 644 or more restrictive (Scored) |  Clusters provisioned by RKE does not store the kubernetes default kubeconfig credentials file on the nodes.     |
| 1.1.14 | Ensure that the admin.conf file ownership is set to root:root (Scored)  |  Clusters provisioned by RKE does not store the kubernetes default kubeconfig credentials file on the nodes.     |
| 1.1.15 | Ensure that the scheduler.conf file permissions are set to 644 or more restrictive (Scored)  |  Clusters provisioned by RKE doesn't require or maintain a configuration file for scheduler. All configuration is passed in as arguments at container run time.  |
| 1.1.16 |  Ensure that the scheduler.conf file ownership is set to root:root (Scored) |  Clusters provisioned by RKE doesn't require or maintain a configuration file for scheduler. All configuration is passed in as arguments at container run time.     |
| 1.1.17 | Ensure that the controller-manager.conf file permissions are set to 644 or more restrictive (Scored) |  Clusters provisioned by RKE doesn't require or maintain a configuration file for controller-manager. All configuration is passed in as arguments at container run time.     |
| 1.1.18 | Ensure that the controller-manager.conf file ownership is set to root:root (Scored) |  Clusters provisioned by RKE doesn't require or maintain a configuration file for controller-manager. All configuration is passed in as arguments at container run time.     |
| 1.3.6 | Ensure that the RotateKubeletServerCertificate argument is set to true (Scored)  |  Clusters provisioned by RKE handles certificate rotation directly through RKE.     |
| 4.1.1 |  Ensure that the kubelet service file permissions are set to 644 or more restrictive (Scored) |  Clusters provisioned by RKE doesn’t require or maintain a configuration file for the kubelet service. All configuration is passed in as arguments at container run time.     |
| 4.1.2 | Ensure that the kubelet service file ownership is set to root:root (Scored) |  Clusters provisioned by RKE doesn’t require or maintain a configuration file for the kubelet service. All configuration is passed in as arguments at container run time.     |
| 4.1.9 | Ensure that the kubelet configuration file has permissions set to 644 or more restrictive (Scored) |  Clusters provisioned by RKE doesn’t require or maintain a configuration file for the kubelet. All configuration is passed in as arguments at container run time.     |
| 4.1.10 |  Ensure that the kubelet configuration file ownership is set to root:root (Scored) |  Clusters provisioned by RKE doesn’t require or maintain a configuration file for the kubelet. All configuration is passed in as arguments at container run time.     |
| 4.2.12 |  Ensure that the RotateKubeletServerCertificate argument is set to true (Scored) |  Clusters provisioned by RKE handles certificate rotation directly through RKE.     |

# CIS Benchmark v1.4

The skipped and not applicable tests for CIS Benchmark v1.4 are as follows:

### CIS Benchmark v1.4 Skipped Tests

Number | Description | Reason for Skipping
---|---|---
1.1.11 | "Ensure that the admission control plugin AlwaysPullImages is set (Scored)" | Enabling AlwaysPullImages can use significant bandwidth.
1.1.21 | "Ensure that the --kubelet-certificate-authority argument is set as appropriate (Scored)" | When generating serving certificates, functionality could break in conjunction with hostname overrides which are required for certain cloud providers.
1.1.24 | "Ensure that the admission control plugin PodSecurityPolicy is set (Scored)" | Enabling Pod Security Policy can cause applications to unexpectedly fail.
1.1.34 | "Ensure that the --encryption-provider-config argument is set as appropriate (Scored)" | Enabling encryption changes how data can be recovered as data is encrypted.
1.1.35 | "Ensure that the encryption provider is set to aescbc (Scored)" | Enabling encryption changes how data can be recovered as data is encrypted.
1.1.36 | "Ensure that the admission control plugin EventRateLimit is set (Scored)" | EventRateLimit needs to be tuned depending on the cluster.
1.2.2 | "Ensure that the --address argument is set to 127.0.0.1 (Scored)" | Adding this argument prevents Rancher's monitoring tool to collect metrics on the scheduler.
1.3.7 | "Ensure that the --address argument is set to 127.0.0.1 (Scored)" | Adding this argument prevents Rancher's monitoring tool to collect metrics on the controller manager.
1.4.12 | "Ensure that the etcd data directory ownership is set to etcd:etcd (Scored)" | A system service account is required for etcd data directory ownership. Refer to Rancher's hardening guide for more details on how to configure this ownership.
1.7.2 | "Do not admit containers wishing to share the host process ID namespace (Scored)" | Enabling Pod Security Policy can cause applications to unexpectedly fail.
1.7.3 | "Do not admit containers wishing to share the host IPC namespace (Scored)" | Enabling Pod Security Policy can cause applications to unexpectedly fail.
1.7.4 | "Do not admit containers wishing to share the host network namespace (Scored)" | Enabling Pod Security Policy can cause applications to unexpectedly fail.
1.7.5 | " Do not admit containers with allowPrivilegeEscalation (Scored)" | Enabling Pod Security Policy can cause applications to unexpectedly fail.
2.1.6 | "Ensure that the --protect-kernel-defaults argument is set to true (Scored)" | System level configurations are required before provisioning the cluster in order for this argument to be set to true.
2.1.10 | "Ensure that the --tls-cert-file and --tls-private-key-file arguments are set as appropriate (Scored)" | When generating serving certificates, functionality could break in conjunction with hostname overrides which are required for certain cloud providers.

### CIS Benchmark v1.4 Not Applicable Tests

Number | Description | Reason for being not applicable
---|---|---
1.1.9 | "Ensure that the --repair-malformed-updates argument is set to false (Scored)" | The argument --repair-malformed-updates has been removed as of Kubernetes version 1.14
1.3.6 | "Ensure that the RotateKubeletServerCertificate argument is set to true" | Cluster provisioned by RKE handles certificate rotation directly through RKE.
1.4.1 | "Ensure that the API server pod specification file permissions are set to 644 or more restrictive (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for kube-apiserver.
1.4.2 | "Ensure that the API server pod specification file ownership is set to root:root (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for kube-apiserver.
1.4.3 | "Ensure that the controller manager pod specification file permissions are set to 644 or more restrictive (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for controller-manager.
1.4.4 | "Ensure that the controller manager pod specification file ownership is set to root:root (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for controller-manager.
1.4.5 | "Ensure that the scheduler pod specification file permissions are set to 644 or more restrictive (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for scheduler.
1.4.6 | "Ensure that the scheduler pod specification file ownership is set to root:root (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for scheduler.
1.4.7 | "Ensure that the etcd pod specification file permissions are set to 644 or more restrictive (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for etcd.
1.4.8 | "Ensure that the etcd pod specification file ownership is set to root:root (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for etcd.
1.4.13 |  "Ensure that the admin.conf file permissions are set to 644 or more restrictive (Scored)" | Cluster provisioned by RKE does not store the kubernetes default kubeconfig credentials file on the nodes.
1.4.14 | "Ensure that the admin.conf file ownership is set to root:root (Scored)" | Cluster provisioned by RKE does not store the kubernetes default kubeconfig credentials file on the nodes.
2.1.8 | "Ensure that the --hostname-override argument is not set (Scored)" | Clusters provisioned by RKE clusters and most cloud providers require hostnames.
2.1.12 | "Ensure that the --rotate-certificates argument is not set to false (Scored)" | Cluster provisioned by RKE handles certificate rotation directly through RKE.
2.1.13 | "Ensure that the RotateKubeletServerCertificate argument is set to true (Scored)" | Cluster provisioned by RKE handles certificate rotation directly through RKE.
2.2.3 | "Ensure that the kubelet service file permissions are set to 644 or more restrictive (Scored)" | Cluster provisioned by RKE doesn’t require or maintain a configuration file for the kubelet service.
2.2.4 | "Ensure that the kubelet service file ownership is set to root:root (Scored)" | Cluster provisioned by RKE doesn’t require or maintain a configuration file for the kubelet service.
2.2.9 | "Ensure that the kubelet configuration file ownership is set to root:root (Scored)" | RKE doesn’t require or maintain a configuration file for the kubelet.
2.2.10 | "Ensure that the kubelet configuration file has permissions set to 644 or more restrictive (Scored)" | RKE doesn’t require or maintain a configuration file for the kubelet.
