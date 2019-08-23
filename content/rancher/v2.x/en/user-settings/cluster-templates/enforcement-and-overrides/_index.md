---
title: Template Enforcement and Overrides
weight: 30
---

This section describes how template administrators can enforce templates in Rancher, restricting the ability of users to create clusters without a template.

This section also describes how template owners can define which settings in a template can be edited by end users.

By default, only an administrator has the ability to create clusters without a template. All other users must use a cluster template when creating a cluster. Users can only create new templates if the administrator [gives them permission.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/owner-permissions/#allowing-a-user-to-create-and-revise-templates)

# Requiring New Clusters to Use a Cluster Template

You might want to require new clusters to use a template to ensure that any cluster launched by any user will use the Kubernetes and/or Rancher parameters vetted by Admins.

To require new clusters to use a cluster template, administrators can turn on cluster template enforcement with the following steps:

1. From the global view, click the **Settings** tab.
1. Go to the `cluster-template-enforcement` setting. Click the vertical **Ellipsis (...)** and click **Edit.**
1. Set the value to **True** and click **Save.**

**Result:** All clusters provisioned by Rancher must use a template, unless the creator is an administrator.

# Disabling Cluster Template Enforcement

To allow new clusters to be created without a cluster template, administrators can turn off cluster template enforcement with the following steps:

1. From the global view, click the **Settings** tab.
1. Go to the `cluster-template-enforcement` setting. Click the vertical **Ellipsis (...)** and click **Edit.**
1. Set the value to **False** and click **Save.**

**Result:** When templates are provisioned by Rancher, they don't need to use a template.

# Defining Which Template Settings Can Be Overridden

When the cluster owner creates a template, each setting has a switch in the Rancher UI that indicates if users can override the setting. This switch marks those settings as **Allow User Override.**

After a cluster is created via cluster template, end users can't update any of the settings defined in the template unless the template owner marked them as **Allow User Override.**

When any parameter is set as **Allow User Override** on the cluster template, it means that end users have to fill out those fields during cluster creation and they can edit those settings afterward at any time.

The **Allow User Override** model of the cluster template is useful for situations such as:

- You know that some settings will need the flexibility to be frequently updated over time
- The end user needs to enter their own access keys or secret keys, for example, cloud credentials or credentials for backup snapshots