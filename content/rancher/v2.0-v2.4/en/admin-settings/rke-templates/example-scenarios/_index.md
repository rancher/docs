---
title: Example Scenarios
weight: 5
---

These example scenarios describe how an organization could use templates to standardize cluster creation.

- **Enforcing templates:** Administrators might want to [enforce one or more template settings for everyone](#enforcing-a-template-setting-for-everyone) if they want all new Rancher-provisioned clusters to have those settings.
- **Sharing different templates with different users:** Administrators might give [different templates to basic and advanced users,](#templates-for-basic-and-advanced-users) so that basic users have more restricted options and advanced users have more discretion when creating clusters.
- **Updating template settings:** If an organization's security and DevOps teams decide to embed best practices into the required settings for new clusters, those best practices could change over time. If the best practices change, [a template can be updated to a new revision](#updating-templates-and-clusters-created-with-them) and clusters created from the template can upgrade to the new version of the template.
- **Sharing ownership of a template:** When a template owner no longer wants to maintain a template, or wants to delegate ownership of the template, this scenario describes how [template ownership can be shared.](#allowing-other-users-to-control-and-share-a-template)


# Enforcing a Template Setting for Everyone

Let's say there is an organization in which the administrators decide that all new clusters should be created with Kubernetes version 1.14.

1. First, an administrator creates a template which specifies the Kubernetes version as 1.14 and marks all other settings as **Allow User Override**.
1. The administrator makes the template public.
1. The administrator turns on template enforcement.

**Results:**

- All Rancher users in the organization have access to the template.
- All new clusters created by [standard users]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/) with this template will use Kubernetes 1.14 and they are unable to use a different Kubernetes version. By default, standard users don't have permission to create templates, so this template will be the only template they can use unless more templates are shared with them.
- All standard users must use a cluster template to create a new cluster. They cannot create a cluster without using a template.

In this way, the administrators enforce the Kubernetes version across the organization, while still allowing end users to configure everything else.

# Templates for Basic and Advanced Users

Let's say an organization has both basic and advanced users. Administrators want the basic users to be required to use a template, while the advanced users and administrators create their clusters however they want.

1. First, an administrator turns on [RKE template enforcement.]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rke-templates/enforcement/#requiring-new-clusters-to-use-an-rke-template) This means that every [standard user]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/) in Rancher will need to use an RKE template when they create a cluster.
1. The administrator then creates two templates:

  - One template for basic users, with almost every option specified except for access keys
  - One template for advanced users, which has most or all options has **Allow User Override** turned on

1. The administrator shares the advanced template with only the advanced users.
1. The administrator makes the template for basic users public, so the more restrictive template is an option for everyone who creates a Rancher-provisioned cluster.

**Result:** All Rancher users, except for administrators, are required to use a template when creating a cluster. Everyone has access to the restrictive template, but only advanced users have permission to use the more permissive template. The basic users are more restricted, while advanced users have more freedom when configuring their Kubernetes clusters.

# Updating Templates and Clusters Created with Them

Let's say an organization has a template that requires clusters to use Kubernetes v1.14. However, as time goes on, the administrators change their minds. They decide they want users to be able to upgrade their clusters to use newer versions of Kubernetes.

In this organization, many clusters were created with a template that requires Kubernetes v1.14. Because the template does not allow that setting to be overridden, the users who created the cluster cannot directly edit that setting.

The template owner has several options for allowing the cluster creators to upgrade Kubernetes on their clusters:

- **Specify Kubernetes v1.15 on the template:** The template owner can create a new template revision that specifies Kubernetes v1.15. Then the owner of each cluster that uses that template can upgrade their cluster to a new revision of the template. This template upgrade allows the cluster creator to upgrade Kubernetes to v1.15 on their cluster.
- **Allow any Kubernetes version on the template:** When creating a template revision, the template owner can also mark the the Kubernetes version as **Allow User Override** using the switch near that setting on the Rancher UI. This will allow clusters that upgrade to this template revision to use any version of Kubernetes.
- **Allow the latest minor Kubernetes version on the template:** The template owner can also create a template revision in which the Kubernetes version is defined as **Latest v1.14 (Allows patch version upgrades).** This means clusters that use that revision will be able to get patch version upgrades, but major version upgrades will not be allowed.

# Allowing Other Users to Control and Share a Template

Let's say Alice is a Rancher administrator. She owns an RKE template that reflects her organization's agreed-upon best practices for creating a cluster.

Bob is an advanced user who can make informed decisions about cluster configuration. Alice trusts Bob to create new revisions of her template as the best practices get updated over time. Therefore, she decides to make Bob an owner of the template.

To share ownership of the template with Bob, Alice [adds Bob as an owner of her template.]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rke-templates/template-access-and-sharing/#sharing-ownership-of-templates)

The result is that as a template owner, Bob is in charge of version control for that template. Bob can now do all of the following:

- [Revise the template]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rke-templates/creating-and-revising/#updating-a-template) when the best practices change
- [Disable outdated revisions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rke-templates/creating-and-revising/#disabling-a-template-revision) of the template so that no new clusters can be created with it
- [Delete the whole template]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rke-templates/creating-and-revising/#deleting-a-template) if the organization wants to go in a different direction
- [Set a certain revision as default]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rke-templates/creating-and-revising/#setting-a-template-revision-as-default) when users create a cluster with it. End users of the template will still be able to choose which revision they want to create the cluster with.
- [Share the template]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rke-templates/template-access-and-sharing) with specific users, make the template available to all Rancher users, or share ownership of the template with another user.