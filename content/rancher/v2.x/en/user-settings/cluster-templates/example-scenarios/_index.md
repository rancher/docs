---
title: Example Scenarios
weight: 5
---

These example scenarios describe how an organization could use templates to standardize cluster creation.

- **Enforcing templates:** Administrators might want to [enforce one or more template settings for everyone](#enforcing-a-template-setting-for-everyone) if they want all new Rancher-provisioned clusters to have those settings.
- **Sharing different templates with different users:** Administrators might give [different templates to basic and advanced users,](#templates-for-basic-and-advanced-users) so that basic users can have more restricted options and advanced users can have more discretion when creating clusters.
- **Updating template settings:** If an organization's security and DevOps teams decide to embed best practices into the required settings for new clusters, those best practices could change over time. If the best practices change, [a template can be updated to a new revision](#updating-templates-and-clusters-created-with-them) and clusters created from the template can upgrade to the new version of the template.
- **Sharing ownership of a template:** When a template owner no longer wants to maintain a template, or wants to delegate ownership of the template, this scenario describes how [template ownership can be shared.](#allowing-other-users-to-update-and-share-a-template)


# Enforcing a Template Setting for Everyone

Let's say there is an organization in which the administrators decide that all new clusters should be created with Kubernetes version 1.14.

1. First, an administrator creates a template which specifies the Kubernetes version as 1.14 and marks all other settings as **Allow User Override**. 
1. Then the administrator makes the template public and turns on template enforcement.

**Result:** All Rancher users in the organization have access to the template. All users except for administrators are required to use a template when creating new clusters.

In this way, the administrators can enforce the Kubernetes version across the organization, while still allowing end users to configure everything else.

# Templates for Basic and Advanced Users

Let's say an organization has both basic and advanced users. Adminstrators want the basic users to be required to use a template, while the advanced users can create their own clusters however they want.

1. First, an administrator turns on [cluster template enforcement.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/enforcement-and-overrides/#requiring-new-clusters-to-use-a-cluster-template) This means that every Rancher user will need to use a cluster template when they create a cluster.
1. The administrator then creates two templates: 

  - One template for basic users, with almost every option specified except for access keys
  - One template for advanced users, which has most or all options has **Allow User Override** turned on

1. The administrator shares the advanced template with only the advanced users.
1. The administrator makes the template for basic users public, so the more restrictive template is an option for everyone who creates a Rancher-provisioned cluster.

**Result:** All Rancher users, except for administrators, are required to use a template when creating a cluster. Everyone has access to the restrictive template, but only advanced users have permission to use the more permissive template. The basic users are more restricted, while advanced users have more freedom when configuring their Kubernetes clusters.

# Updating Templates and Clusters Created with Them

Let's say an organization has a template that requires clusters to use Kubernetes v1.14. As time goes on, the adminstrators change their minds. They decide they want users to be able to upgrade their clusters to use newer versions of Kubernetes.

In this organization, many clusters were created with a template that requires Kubernetes v1.14. Therefore, the template doesn't allow the cluster creators to directly modify the settings.

The template owner has several options for allowing those clusters to upgrade Kubernetes:

- **Specify Kubernetes v1.15 on the template:** The template owner can create a new template revision that specifies Kubernetes v1.15. Then the owner of each cluster that uses that template can upgrade their cluster to a new revision of the template. This template upgrade then allows the cluster creator to upgrade Kubernetes to v1.15 on their cluster.
- **Allow any Kubernetes version on the template:** When creating a template revision, the template owner can also mark the the Kubernetes version as **Allow User Override** using the switch near that setting on the Rancher UI. This will allow clusters that upgrade to this template revision to use any version of Kubernetes.
- **Allow the latest minor Kubernetes version on the template:** The template owner can also create a template revision in which the Kubernetes version is defined as **Latest v1.14 (Allows patch version upgrades).** This means clusters that use that revision will be able to get patch version upgrades, but major version upgrades will not be allowed.

# Allowing Other Users to Update and Share a Template

Let's say Alice is a Rancher administrator. She owns a cluster template that reflects her organization's agreed-upon best practices for creating a cluster.

Bob is an advanced user who can make informed decisions about cluster configuration. Alice decides Bob can be trusted to create new revisions of her template as the best practices get updated over time. Therefore, she decides to make Bob an owner of the template.

To share ownership of the template with Bob, Alice does the following:

1. First, as an administrator, Alice gives Bob the [global permission to create and edit clusters.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/owner-permissions/#allowing-a-user-to-create-and-revise-templates)
1. Then, Alice [adds Bob as an owner of her template.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/sharing-templates/#sharing-ownership-of-templates)

The result is that as a template owner, Bob is in charge of version control for that template. Bob can now do all of the following:

- [Revise the template]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/creating-and-revising/#updating-a-cluster-template) when the best practices change
- [Disable outdated revisions]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/creating-and-revising/#disabling-a-cluster-template-revision) of the template so that no new clusters can be created with it
- [Delete the whole template]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/creating-and-revising/#deleting-a-cluster-template) if the organization wants to go in a different direction
- [Set a certain revision as default]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/creating-and-revising/#setting-a-cluster-template-revision-as-default) when users create a cluster with it. End users of the template will still be able to choose which revision they want to create the cluster with.
- [Share the template]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/sharing-templates) with specific users, make the template available to all Rancher users, or share ownership of the template with another user.

The only exception to Bob's ownership of the template is that if he wants to share ownership with another user, an administrator such as Alice still has to give that user [global permission to create templates]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/owner-permissions/#giving-users-permission-to-create-templates) as a prerequisite to template ownership.