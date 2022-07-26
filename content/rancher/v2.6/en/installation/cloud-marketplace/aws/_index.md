---
title: AWS Marketplace Integration
weight: 1
---

# Overview

Rancher offers an integration with the AWS Marketplace which allows users to purchase a support contract with SUSE. This integration allows you easily adjust your support needs as you start to support more clusters.

# Limitations

- You must be running Rancher v2.6.7 or higher
- Rancher must be deployed with additional metrics enabled.
- Rancher must be installed on an EKS cluster.
- You must purchase at least one entitlement to Rancher support through AWS Marketplace.
- You may need additional setup to support proxy/airgap use cases. See the [prerequisites]({{<baseurl>}}/rancher/v2.6/en/installation/cloud-marketplace/aws/prerequisites) for more information.

# How to Use
1. Complete the [prerequisite steps]({{<baseurl>}}/rancher/v2.6/en/installation/cloud-marketplace/aws/prerequisites).
2. [Install the CSP Adapter]({{<baseurl>}}/rancher/v2.6/en/installation/cloud-marketplace/aws/adapter-install).

# FAQ

**Can I purchase support for more nodes later on?**

Yes. Simply go to the AWS Marketplace entry that you used to initially purchase support and increase the number of entitlements.

**Can I use multiple instances of Rancher in the same AWS account?**

Yes. However, each cluster that Rancher is installed in will need to adhere to the prerequisites. 

In addition, keep in mind that a given entitlement can only be used by one Rancher management server at a time. 
