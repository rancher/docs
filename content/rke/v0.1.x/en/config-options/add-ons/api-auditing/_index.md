---
title: API Auditing
weight: 10000
---

If you're using RKE to install Rancher, you can use directives to enable API Auditing for your Rancher install. You can know what happened, when it happened, who initiated it, and what cluster it affected. API auditing records all requests and responses to and from the Rancher API, which includes use of the Rancher UI and any other use of the Rancher API through programmatic use.

## In-line Arguments

Enable API Auditing using RKE by adding arguments to your Rancher container.

To enable API auditing:

- Add API Auditing arguments (`args`) to your Rancher container.
- Declare a `mountPath` in the `volumeMounts` directive of the container.
- Declare a `path` in the `volumes` directive.

For more information about each argument, its syntax, and how to view API Audit logs, see [Rancher v2.0 Documentation: API Auditing]({{< baseurl >}}/rancher/v2.x/en/installation/api-auditing).

```yaml
...
containers:
        - image: rancher/rancher:latest
          imagePullPolicy: Always
          name: cattle-server
          args: ["--audit-log-path", "/var/log/auditlog/rancher-api-audit.log", "--audit-log-maxbackup", "5", "--audit-log-maxsize", "50", "--audit-level", "2"]
          ports:
          - containerPort: 80
            protocol: TCP
          - containerPort: 443
            protocol: TCP
          volumeMounts:
          - mountPath: /etc/rancher/ssl
            name: cattle-keys-volume
            readOnly: true
          - mountPath: /var/log/auditlog
            name: audit-log-dir
        volumes:
        - name: cattle-keys-volume
          secret:
            defaultMode: 420
            secretName: cattle-keys-server
        - name: audit-log-dir
          hostPath:
            path: /var/log/rancher/auditlog
            type: Directory
```
