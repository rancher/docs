---
title: Creating Persistent Storage in Amazon's EBS
weight: 3053
---

This section describes how to set up Amazon's Elastic Block Store in EC2.

1. From the EC2 console, go to the **ELASTIC BLOCK STORE** section in the left panel and click **Volumes.**
1. Click **Create Volume.**
1. Optional: Configure the size of the volume or other options. The volume should be created in the same availability zone as the instance it will be attached to.
1. Click **Create Volume.**
1. Click **Close.**

**Result:** Persistent storage has been created.

For details on how to set up the newly created storage in Rancher, refer to the section on [setting up existing storage.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/volumes-and-storage/attaching-existing-storage/)