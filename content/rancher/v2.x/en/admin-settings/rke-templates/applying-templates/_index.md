---
title: Applying Templates
weight: 50
---

You can create a cluster from an RKE template that you created, or from a template that has been [shared with you.]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rke-templates/template-access-and-sharing)

RKE templates can only be applied to new clusters, not existing clusters.

You can't change the cluster to use a different RKE template. You can only update the cluster to a new revision of the same template.

### Creating a Cluster from an RKE Template

To add a cluster [hosted by an infrastructure provider]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters) using an RKE template, use these steps:

1. From the **Global** view, go to the **Clusters** tab.
1. Click **Add Cluster** and choose the infrastructure provider.
1. Provide the cluster name and node template details as usual.
1. To use an RKE template, under the **Cluster Options**, check the box for **Use an existing RKE template and revision.**
1. Choose an existing template and revision from the dropdown menu.
1. Optional: You can edit any settings that the RKE template owner marked as **Allow User Override** when the template was created. If there are settings that you want to change, but don't have the option to, you will need to contact the template owner to get a new revision of the template. Then you will need to edit the cluster to upgrade it to the new revision.
1. Click **Save** to launch the cluster.

### Updating a Cluster Created with an RKE Template

When the template owner creates a template, each setting has a switch in the Rancher UI that indicates if users can override the setting.

- If the setting allows a user override, you can update these settings in the cluster by [editing the cluster.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/editing-clusters/)
- If the switch is turned off, you cannot change these settings unless the cluster owner creates a template revision that lets you override them. If there are settings that you want to change, but don't have the option to, you will need to contact the template owner to get a new revision of the template.

If a cluster was created from an RKE template, you can edit the cluster to update the cluster to a new revision of the template.

> **Note:** You can't change the cluster to use a different RKE template. You can only update the cluster to a new revision of the same template.
