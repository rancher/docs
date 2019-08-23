---
title: Creating and Revising Templates
weight: 20
---

This section describes how to manage cluster templates and revisions. Templates can be created, updated, deleted, and disabled from the user settings.

Template updates are handled through a revision system. When template owners want to change or update a template, they create a new revision of the template. Then a cluster that was created with the older version of the template can be upgraded to the new template revision.

You can't edit individual revisions. However, if you want to prevent a revision from being used to create a new cluster, you can disable or delete it.

You can use an older revision as the basis for a new one, and you can choose which revision is the default revision for the template.

### Creating a New Cluster Template

1. Click **User Avatar > Cluster Templates.**
1. Click **Add Template.**
1. Provide a name for the template. An auto-generated name is already provided for the template's revision, which is created along with this template.
1. Optional: You can share the template with other users or groups by adding them as members. You can also make the template public to share with everyone in the Rancher setup.
1. Then follow the form on screen to save the cluster configuration parameters as part of the template's revision. The revision can be marked as default for this template.

**Result:** A cluster template with one revision is configured. You can use this cluster template revision later when you [provision a Rancher-launched cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters).

### Updating a Cluster Template

When you update a cluster template, you are creating a revision of the existing template. Clusters that were created with an older version of the template can be updated to match the new revision.

New template revisions can be created without affecting clusters already using a revision of the template.

1. From your user settings, select **User Avatar > Cluster Templates.**
1. Choose the cluster template that you want to edit and click the **Vertical Ellipsis (...) > Edit.**
1. Edit the required information and click **Save.**
1. Optional: You can change the default revision of this template and also change who it is shared with.

**Result:** The cluster template is updated.


### Deleting a Cluster Template

When you no longer use a cluster template for any of your clusters, you can delete it from your user settings.

1. Click **User Avatar > Cluster Templates.**
1. Choose the cluster template that you want to delete and click the **Vertical Ellipsis (...) > Delete.**
1. Confirm the deletion when prompted.

**Result:** The cluster template is deleted.


### Creating a Revision Based on the Default Revision

You can clone the default template revision and quickly update its settings rather than creating a new revision from scratch. Cloning templates saves you the hassle of re-entering the access keys and other parameters needed for cluster creation.

1. From your user settings, select **User Avatar > Cluster Templates.**
1. Choose the cluster template that you want to clone and click the **Vertical Ellipsis (...) > New Revision From Default.**
1. Complete the rest of the form to create a new revision.

**Result:** The cluster template revision is cloned and configured.

### Creating a Revision Based on a Cloned Revision

When creating new cluster template revisions from your user settings, you can clone an existing revision and quickly update its settings rather than creating a new one from scratch. Cloning template revisions saves you the hassle of re-entering the cluster parameters.

1. From your user settings, select **User Avatar > Cluster Templates.**
1. Find the template revision you want to clone. Then select **Ellipsis > Clone Revision.**
1. Complete the rest of the form.

**Result:** The cluster template revision is cloned and configured. You can use the cluster template revision later when you provision a cluster. Any existing cluster using this cluster template can be upgraded to this new revision.

### Disabling a Cluster Template Revision

When you no longer want to use a cluster template revision for creating new clusters, you can disable it.

You can disable the revision if it is not being used by any cluster.

1. From your user settings, select **User Avatar > Cluster Templates.**
1. Find the template revision you want to disable. Then select **Ellipsis > Disable.**

**Result:** The cluster template revision cannot be used to create a new cluster.

### Setting a Cluster Template Revision as Default

When end users create a cluster using a cluster template, they can choose which revision to create the cluster with. You can configure which revision is used by default.

To set a cluster template revision as default,

1. From your user settings, select **User Avatar > Cluster Templates.**
1. Find the cluster template revision that should be default and click the **Ellipsis (...) > Set as Default.**

**Result:** The cluster template revision will be used as the default option when clusters are created with the template.