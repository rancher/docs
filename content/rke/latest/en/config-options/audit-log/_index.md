---
title: Audit Log
weight: 251
---

Kubernetes auditing provides a security-relevant chronological set of records about a cluster. Kube-apiserver performs auditing. Each request on each stage of its execution generates an event, which is then pre-processed according to a certain policy and written to a backend. The policy determines what’s recorded and the backends persist the records.

You might want to configure the audit log as part of compliance with the CIS (Center for Internet Security) Kubernetes Benchmark controls.

For configuration details, refer to the [official Kubernetes documentation.](https://kubernetes.io/docs/tasks/debug-application-cluster/audit/)

### Enabled by default

In RKE v1.1.0 and higher and when using specific Kubernetes versions, audit log is enabled by default. See the table below to check when audit log is enabled by default.

| RKE version | Kubernetes version | audit log Enabled |
|-------------|--------------------|----------------------|
| v1.1.0 and higher | v1.17.4 and higher (v1.17.x) | Yes |
| v1.1.0 and higher | v1.16.8 and higher (v1.16.x) | Yes |
| v1.1.0 and higher | v1.15.11 and higher (v1.15.x) | Yes |

### Example Configurations

The audit log can be enabled by default using the following configuration in `cluster.yml`:

```yaml
services:
  kube-api:
    audit_log:
      enabled: true
```

When the audit log is enabled, you should be able to see the default values at `/etc/kubernetes/audit-policy.yaml` (This is located at `/etc/kubernetes/audit.yaml` before RKE v1.1.0):

```yaml
# Minimum Configuration: Capture event metadata.
...
rules:
- level: Metadata
...
```

When the audit log is enabled, default values are also set for the audit log path, maximum age, maximum number of backups, maximum size in megabytes, and format. To see the default values, run:

```
ps -ef | grep kube-apiserver
```

The default values for audit log were changed in RKE v1.1.0 to the following:

```yaml
--audit-log-maxage=30 # The maximum number of days to retain old audit log files
--audit-log-maxbackup=10 # The maximum number of audit log files to retain
--audit-log-path=/var/log/kube-audit/audit-log.json # The log file path that log backend uses to write audit events
--audit-log-maxsize=100 # The maximum size in megabytes of the audit log file before it gets rotated
--audit-policy-file=/etc/kubernetes/audit-policy.yaml # The file containing your audit log rules
--audit-log-format=json # The log file format

```

The default values for the audit log before RKE v1.1.0 are:

```yaml
--audit-log-maxage=5 # The maximum number of days to retain old audit log files
--audit-log-maxbackup=5 # The maximum number of audit log files to retain
--audit-log-path=/var/log/kube-audit/audit-log.json # The log file path that log backend uses to write audit events
--audit-log-maxsize=100 # The maximum size in megabytes of the audit log file before it gets rotated
--audit-policy-file=/etc/kubernetes/audit.yaml # The file containing your audit log rules
--audit-log-format=json # The log file format

```

To customize the audit log, the `configuration` directive is used.

A rules policy is passed to kube-apiserver using the `--audit-policy-file` or the `policy` directive in the `cluster.yml`. Below is an example `cluster.yml` with custom values and an audit log policy nested under the `configuration` directive. This example audit log policy is taken from the official [Kubernetes documentation:](https://kubernetes.io/docs/tasks/debug-application-cluster/audit/#audit-policy)

```yaml
services:
  kube-api:
    audit_log:
      enabled: true
      configuration:
        max_age: 6
        max_backup: 6
        max_size: 110
        path: /var/log/kube-audit/audit-log.json
        format: json
        policy:
          apiVersion: audit.k8s.io/v1 # This is required.
          kind: Policy
          omitStages:
            - "RequestReceived"
          rules:
            # Log pod changes at RequestResponse level
            - level: RequestResponse
              resources:
              - group: ""
                # Resource "pods" doesn't match requests to any subresource of pods,
                # which is consistent with the RBAC policy.
                resources: ["pods"]
            # Log "pods/log", "pods/status" at Metadata level
            - level: Metadata
              resources:
              - group: ""
                resources: ["pods/log", "pods/status"]

            # Don't log requests to a configmap called "controller-leader"
            - level: None
              resources:
              - group: ""
                resources: ["configmaps"]
                resourceNames: ["controller-leader"]

            # Don't log watch requests by the "system:kube-proxy" on endpoints or services
            - level: None
              users: ["system:kube-proxy"]
              verbs: ["watch"]
              resources:
              - group: "" # core API group
                resources: ["endpoints", "services"]

            # Don't log authenticated requests to certain non-resource URL paths.
            - level: None
              userGroups: ["system:authenticated"]
              nonResourceURLs:
              - "/api*" # Wildcard matching.
              - "/version"

            # Log the request body of configmap changes in kube-system.
            - level: Request
              resources:
              - group: "" # core API group
                resources: ["configmaps"]
              # This rule only applies to resources in the "kube-system" namespace.
              # The empty string "" can be used to select non-namespaced resources.
              namespaces: ["kube-system"]

            # Log configmap and secret changes in all other namespaces at the Metadata level.
            - level: Metadata
              resources:
              - group: "" # core API group
                resources: ["secrets", "configmaps"]

            # Log all other resources in core and extensions at the Request level.
            - level: Request
              resources:
              - group: "" # core API group
              - group: "extensions" # Version of group should NOT be included.

            # A catch-all rule to log all other requests at the Metadata level.
            - level: Metadata
              # Long-running requests like watches that fall under this rule will not
              # generate an audit event in RequestReceived.
              omitStages:
                - "RequestReceived"
```
