---
title: Migrating vSphere In-tree Volumes to CSI
weight: 5
---
_Available as of v2.5.6_

Kubernetes is moving away from maintaining cloud providers in-tree. vSphere has an out-of-tree cloud provider that can be used by installing the vSphere cloud provider and cloud storage plugins.

For instructions on how to migrate from the in-tree vSphere cloud provider to out-of-tree, and manage the existing VMs post migration, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/vsphere-volume-migration)