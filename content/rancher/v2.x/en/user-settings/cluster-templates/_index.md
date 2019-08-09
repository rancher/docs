---
title: Managing Cluster Templates
weight: 7010
---

_Available as of Rancher v2.3.0_

Cluster templates are designed to allow DevOps and security teams to standardize and simplify the creation of Kubernetes clusters.

With Kubernetes increasing in popularity, there is a trend toward managing a larger number of smaller clusters. When you want to create many clusters, it’s more important to manage them consistently. Multi-cluster management comes with challenges to enforcing security and add-on configurations that need to be standardized before turning clusters over to end users.

Cluster templates help standardize these configurations. Regardless of whether clusters are created with the Rancher UI, the Rancher API, or an automated process, Rancher will guarantee that every cluster it provisions from a cluster template is uniform and consistent in the way it is produced. Admins can control which cluster options can be changed by end users. Cluster templates can also be shared with specific users, so that admins can create different cluster templates for different sets of users.

To summarize, cluster templates allow dev ops and security teams to:

- Standardize cluster configuration and ensure that Rancher-provisioned clusters are created following best practices
- Prevent less technical users from making uninformed choices when provisioning clusters
- Share different templates with different sets of users
- Delegate ownership of templates to users who are trusted to make changes to them
- Control which users can create templates
- Require users to create clusters from a template

# Configurable Settings

Templates can be created in the Rancher UI or defined in YAML format. They can define all the same parameters that can be specified in Rancher’s cluster creation feature, including the following:

- Cloud provider options
- Pod security options
- Network providers
- Ingress controllers
- Network security configuration
- Network plugins
- Private registry URL and credentials
- Add-ons
- Kubernetes options, including configurations for Kubernetes components such as kube-api, kube-controller, kubelet, and services

The [add-on section](#add-ons) of a cluster template is especially powerful because it allows a wide range of customization options.

# Scope of Cluster Templates

Cluster templates are supported for Rancher-provisioned clusters. The templates can be used to provision custom clusters or clusters that are launched by an infrastructure provider.
 
Cluster templates are for defining Kubernetes and Rancher settings. Node templates are responsible for configuring nodes. For tips on how to use cluster templates in conjunction with hardware, you can refer to [Cluster Templates and Hardware]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/cluster-templates-and-hardware).
 
Cluster templates can be applied to new clusters, but not existing clusters.

# Example Scenarios
When an organization has both basic and advanced Rancher users, administrators might want to give the advanced users more options for cluster creation, while restricting the options for basic users.

These [example scenarios]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/example-scenarios) describe how an organization could use templates to standardize cluster creation.

Some of the example scenarios include the following:

- **Enforcing templates:** Administrators might want to [enforce one or more template settings for everyone]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/example-scenarios/#enforcing-a-template-setting-for-everyone) if they want all new Rancher-provisioned clusters to have those settings.
- **Sharing different templates with different users:** Administrators might give [different templates to basic and advanced users,]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/example-scenarios/#templates-for-basic-and-advanced-users) so that basic users can have more restricted options and advanced users can have more discretion when creating clusters.
- **Updating template settings:** If an organization's security and DevOps teams decide to embed best practices into the required settings for new clusters, those best practices could change over time. If the best practices change, [a template can be updated to a new revision]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/example-scenarios/#updating-templates-and-clusters-created-with-them) and clusters created from the template can upgrade to the new version of the template.
- **Sharing ownership of a template:** When a template owner no longer wants to maintain a template, or wants to share ownership of the template, this scenario describes how [template ownership can be shared.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/example-scenarios/#allowing-other-users-to-update-and-share-a-template)

# Template Management

When you create a cluster template, it is bound to your user profile. When you create a template, you become the template owner, which gives you permission to revise and share the template. You can share the cluster templates with specific users or groups, and you can also make it public.

Administrators can require users to always use cluster templates when creating a cluster. This allows administrators to guarantee that clusters in Rancher are created with specific settings.

Cluster template updates are handled through a revision system. If you want to change or update a template, you can create a new revision of the template. Then a cluster that was created with the older version of the template can be upgraded to the new template revision.

There are two types of settings in a cluster template: settings that can be overridden by the end user and settings that cannot. The difference is indicated by the **Allow User Override** toggle over each setting in the Rancher UI when the template is created.

For the settings that cannot be overridden, the end user will not be able to directly edit them. The only way to edit these options would be to upgrade to a new revision of the same cluster template.

The documents in this section explain the details of cluster template management:

- [Getting permission to create and revise templates]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/owner-permissions/)
- [Creating and revising templates]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/creating-and-revising/)
- [Enforcing template settings]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/enforcement-and-overrides/#requiring-new-clusters-to-use-a-cluster-template)
- [Overriding template settings]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/enforcement-and-overrides/#defining-which-template-settings-can-be-overridden)
- [Sharing templates with cluster creators]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/sharing-templates/#sharing-cluster-templates-with-specific-users)
- [Sharing ownership of a template]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/sharing-templates/#sharing-ownership-of-templates)

An [example YAML configuration file for a template]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/example-yaml) is provided for reference.

# Applying Templates

You can [create a cluster from a template]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/applying-templates/#creating-a-cluster-from-a-cluster-template) that you created, or from a template that has been [shared with you.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/sharing-templates)

If the cluster template owner creates a new revision of the template, you can [upgrade your clsuter to that revision.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/applying-templates/#updating-a-cluster-created-with-a-cluster-template)

Cluster templates can only be applied to new clusters, not existing clusters.

# Standardizing Hardware
Cluster templates are designed to standardize Kubernetes and Rancher settings. If you want to standardize your infrastructure as well, you can use cluster templates [in conjuction with other tools]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/cluster-templates-and-hardware).

# YAML Customization

If you define a cluster template as a YAML file, you can modify this [example cluster template YAML]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/example-yaml).

The RKE documentation also has [annotated]({{<baseurl>}}/rke/latest/en/example-yamls/) `cluster.yml` files that you can use for reference.

For guidance on available options, you can also refer to the RKE documentation on [cluster configuration.]({{<baseurl>}}/rke/latest/en/config-options/)

### Add-ons

The add-on section of the cluster template configuration file works the same way as the [add-on section of a cluster configuration file]({{<baseurl>}}/rke/latest/en/config-options/add-ons/). The user-defined add-ons directive allows you to either call out and pull down Kubernetes manifests or put them inline directly. If you include these manifests as part of your cluster template, Rancher will provision those in the cluster.

Some things you could do with add-ons include:

- Install applications on the Kubernetes cluster after it starts
- Install plugins on nodes that are deployed with a Kubernetes daemonset
- Automatically set up namespaces, service accounts, or role binding

To set add-ons, when creating the template, click **Edit as YAML.** Then use the `addons` or `addons_include` directive to set which YAML files are used for the add-ons.

For information on custom add-ons, refer to the [user-defined add-ons documentation.]({{<baseurl>}}/rke/latest/en/config-options/add-ons/user-defined-add-ons/)
