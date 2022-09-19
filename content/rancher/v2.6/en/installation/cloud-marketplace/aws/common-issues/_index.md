---
title: Common Issues 
weight: 4
---

**After installing the adapter, a banner message appears in Rancher that says "AWS Marketplace Adapter: Unable to run the adapter, please check the adapter logs"**

This error indicates that while the adapter was installed into the cluster, an error has occurred which prevents it from properly checking-in/checking-out licenses.

This often occurs because the IAM role was not set up properly. Review the [prerequisites]({{<baseurl>}}/rancher/v2.6/en/installation/cloud-marketplace/aws/prerequisites) and verify that:

- An OIDC provider has been created/associated with the cluster Rancher is running on.
- The IAM role has been configured to trust this OIDC provider.
- The IAM role has at least the permissions outlined in the policy.

If all of the above have been configured correctly, reach out to support for assistance.

**I see a banner message that states, "AWS Marketplace Adapter: You have exceeded your licensed node count. At least x more license(s) are required in AWS to become compliant"**

This message indicates that you do not have enough entitlements for the amount of nodes Rancher is currently managing.

Keep in mind the following limitations:

- Each entitlement is valid for a certain number of nodes.
- Every node currently managed by Rancher counts toward your usage total (with exception of nodes in the cluster rancher is installed on).
- Each entitlement can be used by at most one Rancher instance. For example, if you have two running Rancher instances in your account (each installed on a separate EKS cluster), then you will need at least two entitlements.

You may also have recently uninstalled/re-installed the adapter. If the adapter loses track of the licenses that it is currently managing, it can take up to an hour to resolve the actual state of the licenses.

