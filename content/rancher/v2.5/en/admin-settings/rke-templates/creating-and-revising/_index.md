---
title: Creating and Revising Templates
weight: 32
---

This section describes how to manage RKE templates and revisions. You an create, share, update, and delete templates from the **Global** view under **Tools > RKE Templates.**

Template updates are handled through a revision system. When template owners want to change or update a template, they create a new revision of the template. Individual revisions cannot be edited. However, if you want to prevent a revision from being used to create a new cluster, you can disable it.

Template revisions can be used in two ways: to create a new cluster, or to upgrade a cluster that was created with an earlier version of the template. The template creator can choose a default revision, but when end users create a cluster, they can choose any template and any template revision that is available to them. After the cluster is created from a specific revision, it cannot change to another template, but the cluster can be upgraded to a newer available revision of the same template.

The template owner has full control over template revisions, and can create new revisions to update the template, delete or disable revisions that should not be used to create clusters, and choose which template revision is the default.

This section covers the following topics:

- [Prerequisites](#prerequisites)
- [Creating a template](#creating-a-template)
- [Updating a template](#updating-a-template)
- [Deleting a template](#deleting-a-template)
- [Creating a revision based on the default revision](#creating-a-revision-based-on-the-default-revision)
- [Creating a revision based on a cloned revision](#creating-a-revision-based-on-a-cloned-revision)
- [Disabling a template revision](#disabling-a-template-revision)
- [Re-enabling a disabled template revision](#re-enabling-a-disabled-template-revision)
- [Setting a template revision as default](#setting-a-template-revision-as-default)
- [Deleting a template revision](#deleting-a-template-revision)
- [Upgrading a cluster to use a new template revision](#upgrading-a-cluster-to-use-a-new-template-revision)
- [Exporting a running cluster to a new RKE template and revision](#exporting-a-running-cluster-to-a-new-rke-template-and-revision)

### Prerequisites

You can create RKE templates if you have the **Create RKE Templates** permission, which can be [given by an administrator.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/creator-permissions)

You can revise, share, and delete a template if you are an owner of the template. For details on how to become an owner of a template, refer to [the documentation on sharing template ownership.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/template-access-and-sharing/#sharing-ownership-of-templates)

### Creating a Template

1. From the **Global** view, click **Tools > RKE Templates.**
1. Click **Add Template.**
1. Provide a name for the template. An auto-generated name is already provided for the template' first version, which is created along with this template.
1. Optional: Share the template with other users or groups by [adding them as members.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/template-access-and-sharing/#sharing-templates-with-specific-users-or-groups) You can also make the template public to share with everyone in the Rancher setup.
1. Then follow the form on screen to save the cluster configuration parameters as part of the template's revision. The revision can be marked as default for this template.

**Result:** An RKE template with one revision is configured. You can use this RKE template revision later when you [provision a Rancher-launched cluster]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters). After a cluster is managed by an RKE template, it cannot be disconnected and the option to uncheck **Use an existing RKE Template and Revision** will be unavailable.

### Updating a Template

When you update an RKE template, you are creating a revision of the existing template. Clusters that were created with an older version of the template can be updated to match the new revision.

You can't edit individual revisions. Since you can't edit individual revisions of a template, in order to prevent a revision from being used, you can [disable it.](#disabling-a-template-revision)

When new template revisions are created, clusters using an older revision of the template are unaffected.

1. From the **Global** view, click **Tools > RKE Templates.**
1. Go to the template that you want to edit and click the **&#8942; > Edit.**
1. Edit the required information and click **Save.**
1. Optional: You can change the default revision of this template and also change who it is shared with.

**Result:** The template is updated. To apply it to a cluster using an older version of the template, refer to the section on [upgrading a cluster to use a new revision of a template.](#upgrading-a-cluster-to-use-a-new-template-revision)

### Deleting a Template

When you no longer use an RKE template for any of your clusters, you can delete it.

1. From the **Global** view, click **Tools > RKE Templates.**
1. Go to the RKE template that you want to delete and click the **&#8942; > Delete.**
1. Confirm the deletion when prompted.

**Result:** The template is deleted.

### Creating a Revision Based on the Default Revision

You can clone the default template revision and quickly update its settings rather than creating a new revision from scratch. Cloning templates saves you the hassle of re-entering the access keys and other parameters needed for cluster creation.

1. From the **Global** view, click **Tools > RKE Templates.**
1. Go to the RKE template that you want to clone and click the **&#8942; > New Revision From Default.**
1. Complete the rest of the form to create a new revision.

**Result:** The RKE template revision is cloned and configured.

### Creating a Revision Based on a Cloned Revision

When creating new RKE template revisions from your user settings, you can clone an existing revision and quickly update its settings rather than creating a new one from scratch. Cloning template revisions saves you the hassle of re-entering the cluster parameters.

1. From the **Global** view, click **Tools > RKE Templates.**
1. Go to the template revision you want to clone. Then select **&#8942; > Clone Revision.**
1. Complete the rest of the form.

**Result:** The RKE template revision is cloned and configured. You can use the RKE template revision later when you provision a cluster. Any existing cluster using this RKE template can be upgraded to this new revision.

### Disabling a Template Revision

When you no longer want an RKE template revision to be used for creating new clusters, you can disable it. A disabled revision can be re-enabled.

You can disable the revision if it is not being used by any cluster.

1. From the **Global** view, click **Tools > RKE Templates.**
1. Go to the template revision you want to disable. Then select **&#8942; > Disable.**

**Result:** The RKE template revision cannot be used to create a new cluster.

### Re-enabling a Disabled Template Revision

If you decide that a disabled RKE template revision should be used to create new clusters, you can re-enable it.

1. From the **Global** view, click **Tools > RKE Templates.**
1. Go to the template revision you want to re-enable. Then select **&#8942; > Enable.**

**Result:** The RKE template revision can be used to create a new cluster.

### Setting a Template Revision as Default

When end users create a cluster using an RKE template, they can choose which revision to create the cluster with. You can configure which revision is used by default.

To set an RKE template revision as default,

1. From the **Global** view, click **Tools > RKE Templates.**
1. Go to the RKE template revision that should be default and click the **&#8942; > Set as Default.**

**Result:** The RKE template revision will be used as the default option when clusters are created with the template.

### Deleting a Template Revision

You can delete all revisions of a template except for the default revision.

To permanently delete a revision,

1. From the **Global** view, click **Tools > RKE Templates.**
1. Go to the RKE template revision that should be deleted and click the **&#8942; > Delete.**

**Result:** The RKE template revision is deleted.

### Upgrading a Cluster to Use a New Template Revision

> This section assumes that you already have a cluster that [has an RKE template applied.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/applying-templates)
> This section also assumes that you have [updated the template that the cluster is using](#updating-a-template) so that a new template revision is available.

To upgrade a cluster to use a new template revision,

1. From the **Global** view in Rancher, click the **Clusters** tab.
1. Go to the cluster that you want to upgrade and click **&#8942; > Edit.**
1. In the **Cluster Options** section, click the dropdown menu for the template revision, then select the new template revision.
1. Click **Save.**

**Result:** The cluster is upgraded to use the settings defined in the new template revision.

### Exporting a Running Cluster to a New RKE Template and Revision

You can save an existing cluster's settings as an RKE template.

This exports the cluster's settings as a new RKE template, and also binds the cluster to that template. The result is that the cluster can only be changed if the [template is updated,]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/creating-and-revising/#updating-a-template) and the cluster is upgraded to [use a newer version of the template.]

To convert an existing cluster to use an RKE template,

1. From the **Global** view in Rancher, click the **Clusters** tab.
1. Go to the cluster that will be converted to use an RKE template. Click **&#8942;** > **Save as RKE Template.**
1. Enter a name for the template in the form that appears, and click **Create.**

**Results:**

- A new RKE template is created.
- The cluster is converted to use the new template.
- New clusters can be [created from the new template and revision.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/applying-templates/#creating-a-cluster-from-an-rke-template)