---
title: Applying Templates
weight: 50
---

You can create a cluster from a template that you created, or from a template that has been [shared with you.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/sharing-templates)

Cluster templates can only be applied to new clusters, not existing clusters.

### Creating a Cluster from a Cluster Template

To add a cluster [hosted by an infrastructure provider]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters) using a cluster template, use these steps:

1. Click **Add Cluster** and choose the infrastructure provider.
1. Provide the cluster name and node template details as usual.
1. To use a cluster template, under the **Cluster Options**, select the option **Use an existing cluster template and revision.**
1. Choose an existing template and revision from the dropdown menu.
1. Optional: Change the settings that can be overridden. You can edit any settings that the cluster template owner marked as **Allow User Override** when the template was created.
1. Click **Save** to launch the cluster.

### Updating a Cluster Created with a Cluster Template

When the cluster owner creates a template, each setting has a switch in the Rancher UI that indicates if users can override the setting.

- If the setting allows a user override, you can update these settings in the cluster by [editing the cluster.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/editing-clusters/)
- If the switch is turned off, you cannot change these settings unless the cluster owner creates a template revision that lets you override them.

If a cluster was created from a cluster template, you can edit the cluster to update the cluster to a new revision of the template.

You can't change the cluster to use a different cluster template. You can only update the cluster to a new revision of the same template.
