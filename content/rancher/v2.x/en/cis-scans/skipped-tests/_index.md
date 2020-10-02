---
title: Skipped and Not Applicable Tests
weight: 3
---

This section lists the tests that are skipped in the permissive test profile for RKE.

# CIS Benchmark v1.5

This skipped and not applicable tests for CIS Benchmark v1.5 are listed in [this file.](https://github.com/rancher/kontainer-driver-metadata/blob/dev-v2.5/rke/cis_config.go#L81-L119)

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
2.1.6 | "Ensure that the --protect-kernel-defaults argument is set to true (Scored)" | System level configurations are required prior to provisioning the cluster in order for this argument to be set to true.
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

