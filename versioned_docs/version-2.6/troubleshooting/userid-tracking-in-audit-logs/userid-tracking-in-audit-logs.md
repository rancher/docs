---
title: User ID Tracking in Audit Logs
weight: 110
---

The following audit logs are used in Rancher to track events occuring on the local and downstream clusters:

* [Kubernetes Audit Logs]({{<baseurl>}}/rke/latest/en/config-options/audit-log/)
* [Rancher API Audit Logs]({{<baseurl>}}/rancher/v2.6/en/installation/resources/advanced/api-audit-log/)

Audit logs in Rancher v2.6 have been enhanced to include the external Identity Provider name (common name of the user in the external Auth provider) in both the Rancher and downstream Kubernetes audit logs.

Before v2.6, a Rancher Admin could not trace an event from the Rancher audit logs and into the Kubernetes audit logs without knowing the mapping of the external Identity Provider username to the userId (`u-xXXX`) used in Rancher.
To know this mapping, the cluster admins needed to have access to Rancher API, UI, and the local management cluster.

Now with this feature, a downstream cluster admin should be able to look at the Kubernetes audit logs and know which specific external Identity Provider (IDP) user performed an action without needing to view anything in Rancher.
If the audit logs are shipped off of the cluster, a user of the logging system should be able to identify the user in the external Identity Provider system.  
A Rancher Admin should now be able to view Rancher audit logs and follow through to the Kubernetes audit log by using the external Identity Provider username.

### Feature Description

- When Kubernetes Audit logs are enabled on the downstream cluster, in each event that is logged, the external Identity Provider's username is now logged for each request, at the "metadata" level.
- When Rancher API Audit logs are enabled on the Rancher installation, the external Identity Provider's username is also logged now at the `auditLog.level=1` for each request that hits the Rancher API server, including the login requests.
