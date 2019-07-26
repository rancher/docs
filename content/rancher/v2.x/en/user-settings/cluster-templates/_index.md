---
title: Cluster Templates
weight: 7010
---

When you provision a cluster [hosted by an infrastructure provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters), cluster templates can be used to provision the cluster. 
These cluster templates let you pre-define all cluster configuration options and while creating a cluster you can just use all settings from this cluster template.
Cluster creation by figuring out right settings can take a lot of effort and time and after it worked one time, applying the same settings over and over again across clusters is both painful and error prone. 
For such cases creating a cluster template to define all the cluster settings at one place and using that template to create clusters is useful.

When you create a cluster template, it is bound to your user profile. You can share the Cluster templates with other users or groups and can also make it public.


## Who can create Cluster Templates?

1. Cluster Templates can be created by default by Global Admins only.
1. Also, users that have been granted the global role "Create Cluster Templates" by the Admin, can create cluster templates.
1. A Global Admin can selectively grant the role "Create Cluster Templates" to any existing user by editing the user's global permissions.

	- To do so, select **Users** tab and choose the user you want to edit and click the **Vertical Ellipsis (...) > Edit**.
	- Under *Global Permissions* choose "Custom" and select "Create Cluster Templates" role along with any other roles the user should have and click **Save**.

1. Alternatively, can every user in the setup be authorized to create cluster templates?
  - Yes. To do so, Global Admin should navigate to the **Security > Roles**
  - Under the *Global* roles tab select the role "Create Cluster Templates" and click the **Vertical Ellipsis (...) > Edit**.
  - Select the option "Yes: Default role for new users" and click *Save*
  - Any new user created in this Rancher installation henceforth, will be able to create cluster templates.

## What can be set using Cluster Templates?

All cluster options that you can set via Rancher's **Add Cluster** UI form, can be defined on a cluster template. This includes
  - Kubernetes parameters
  - Kubernetes settings per component (API server, Kubelet, etcd)
  - Pod Security Policy
  - Network Security Policy
  - Cluster Options like Kubernetes version, Cloud Provider options

## Setting Questions on a Cluster Template

When a cluster is created via cluster template,  you can't update any of the settings defined in the template except for those settings that are set as Questions.
Thus if there are any cluster settings that need to be updated over time on the cluster, these should be set as Questions on the cluster template.

1. Any parameter on the cluster configuration can be turned into a *Question* by the cluster template creator.
1. When any parameter is set as a question on the cluster template, it means that while creating a cluster using this template, the parameter's value can be overridden.
1. While creating a cluster using a cluster template, user can answer these questions to set the exact values of the parameter in question.
1. The Question-Answer model of the cluster template is useful especially in cases like:
 - Accesskey/SecretKey credentials for some cluster component should be provided by each cluster creator, the cluster template creator need not bake them in the template.
 - Kubernetes versions can be set as a question, so that clusters can be upgraded to new kubernetes versions via cluster edits.

## Sharing a Cluster Template

1. You can share the cluster template with other users or groups by adding them as members of the template.
1. You can set the members on the template while creating a new cluster template.
1. Alternatively, you can edit an existing cluster template to add new members.
  - From your user settings, select **User Avatar > Cluster Templates**.
  - Choose the cluster template that you want to share and click the **Vertical Ellipsis (...) > Edit**.
  - Under *Share Template*, click on **Add Member** and search in the name field the user or group you want to share the template with and then click *Save*.
1. You can also share a cluster template with all users in the Rancher setup by choosing the option "Make Public (read-only)" under "Share Template".

## Cluster Template Enforcement

1. Cluster Template Enforcement means that new Clusters can be created using a cluster template only.
1. Only a Global Admin has the ability to create clusters without a template. All other users must use a cluster template they can list to create a cluster.
1. Only a Global Admin can turn ON "Cluster Template Enforcement" via settings.
1. Using Enforcement Admin can ensure that any cluster launched by any user uses the kubernetes and/or rancher parameters vetted by Admins.


## Managing Cluster Templates

### Creating a Cluster Template from User Settings

1. From your user settings, select **User Avatar > Cluster Templates**.
1. Click **Add Template**.
1. Provide a name for the template. An auto generated name is already provided for the template's revision being created along with this template.
1. The template can be shared with other users or groups by adding them as members. A template can also be made public to share with everyone.
1. Then follow the form on screen to save the cluster configuration parameters as part of the template's revision. The revision can be marked as default for this template.

**Result:** A clustertemplate with one revision is configured. You can use this cluster template revision later when you [provision an rke cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters).

### Updating a Cluster Template

1. From your user settings, select **User Avatar > Cluster Templates**.
1. Choose the cluster template that you want to edit and click the **Vertical Ellipsis (...) > Edit**.
1. Edit the required information and click **Save**.
1. You can change the default revision of this template and also change who it is shared with.

**Result:** The cluster template is updated.

### New Revision From Default

You can clone the default template revision and quickly update its settings rather than creating a new revision from scratch. Cloning templates saves you the hassle of re-entering the access keys and other parameters needed for cluster creation.

1. From your user settings, select **User Avatar > Cluster Templates**.
1. Choose the cluster template that you want to clone and click the **Vertical Ellipsis (...) > New Revision From Default**.
1. Complete the rest of the form to create a new revision.

**Result:** The cluster template revision is cloned and configured.

### Deleting a Cluster Template

When you no longer use a cluster template for any of your clusters, you can delete it from your user settings.

1. From your user settings, select **User Avatar > Cluster Templates**.
1. Choose the cluster template that you want to delete and click the **Vertical Ellipsis (...) > Delete**.
1. Confirm the delete when prompted.

**Result:** The cluster template is deleted.

### Cloning a Cluster Template Revision

When creating new cluster template revisions from your user settings, you can clone an existing revision and quickly update its settings rather than creating a new one from scratch. Cloning template revisions saves you the hassle of re-entering the cluster parameters.

1. From your user settings, select **User Avatar > Cluster Templates**.
1. Find the template revision you want to clone. Then select **Ellipsis > Clone Revision**.
1. Complete the rest of the form.

**Result:** The cluster template revision is cloned and configured. You can use the cluster template revision later when you provision a cluster. Or any existing cluster using this cluster template can be upgrade to this new revision.

### Disable a Cluster Template Revision

When you no longer want to use a cluster template revision for creating new clusters, you can disable it.

1. From your user settings, select **User Avatar > Cluster Templates**.
1. Find the template revision you want to clone. Then select **Ellipsis > Disable**.
1. You can disable the revision if it is not being used by any cluster.


## Managing Clusters via Cluster Templates

### Cluster creation using cluster template

To add a cluster[hosted by an infrastructure provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters) using a cluster template, use these steps:

1. Click **Add Cluster** and choose the infrastructure provider.
1. Provide the cluster name and node template details as usual.
1. To use a cluster template, under the **Cluster Options**, select the option **Use an existing cluster template and revision**.
1. Choose an existing template and associated revision from the drop down.
1. All settings defined in the template revision will be loaded on UI form and they cannot be changed.
1. Any settings set as questions on the cluster template, will be the only fields that you can edit and answer.
1. Click **Save** to launch the cluster.

### Editing the Cluster created using a cluster template

1. A cluster created from a cluster template, can be edited to change to a new revision of the cluster template.
1. Also any parameters that are set on the cluster template as questions can be changed on a cluster edit.
1. One cannot change the cluster to use a new cluster template, only changes to a new revision for the same template is supported.
