---
title: Template Enforcement
weight: 32
---

This section describes how template administrators can enforce templates in Rancher, restricting the ability of users to create clusters without a template.

By default, any standard user in Rancher can create clusters. But when RKE template enforcement is turned on,

- Only an administrator has the ability to create clusters without a template.
- All standard users must use an RKE template to create a new cluster.
- Standard users cannot create a cluster without using a template.

Users can only create new templates if the administrator [gives them permission.]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rke-templates/creator-permissions/#allowing-a-user-to-create-templates)

After a cluster is created with an RKE template, the cluster creator cannot edit settings that are defined in the template. The only way to change those settings after the cluster is created is to [upgrade the cluster to a new revision]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rke-templates/applying-templates/#updating-a-cluster-created-with-an-rke-template) of the same template. If cluster creators want to change template-defined settings, they would need to contact the template owner to get a new revision of the template. For details on how template revisions work, refer to the [documentation on revising templates.]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rke-templates/creating-and-revising/#updating-a-template)

# Requiring New Clusters to Use an RKE Template

You might want to require new clusters to use a template to ensure that any cluster launched by a [standard user]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/) will use the Kubernetes and/or Rancher settings that are vetted by administrators.

To require new clusters to use an RKE template, administrators can turn on RKE template enforcement with the following steps:

1. From the **Global** view, click the **Settings** tab.
1. Go to the `cluster-template-enforcement` setting. Click the vertical **&#8942;** and click **Edit.**
1. Set the value to **True** and click **Save.**

**Result:** All clusters provisioned by Rancher must use a template, unless the creator is an administrator.

# Disabling RKE Template Enforcement

To allow new clusters to be created without an RKE template, administrators can turn off RKE template enforcement with the following steps:

1. From the **Global** view, click the **Settings** tab.
1. Go to the `cluster-template-enforcement` setting. Click the vertical **&#8942;** and click **Edit.**
1. Set the value to **False** and click **Save.**

**Result:** When clusters are provisioned by Rancher, they don't need to use a template.
