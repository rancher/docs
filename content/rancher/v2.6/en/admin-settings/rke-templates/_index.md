---
title: RKE Templates
weight: 7010
---

RKE templates are designed to allow DevOps and security teams to standardize and simplify the creation of Kubernetes clusters.

RKE is the [Rancher Kubernetes Engine,]({{<baseurl>}}/rke/latest/en/) which is the tool that Rancher uses to provision Kubernetes clusters.

With Kubernetes increasing in popularity, there is a trend toward managing a larger number of smaller clusters. When you want to create many clusters, it’s more important to manage them consistently. Multi-cluster management comes with challenges to enforcing security and add-on configurations that need to be standardized before turning clusters over to end users.

RKE templates help standardize these configurations. Regardless of whether clusters are created with the Rancher UI, the Rancher API, or an automated process, Rancher will guarantee that every cluster it provisions from an RKE template is uniform and consistent in the way it is produced.

Admins control which cluster options can be changed by end users. RKE templates can also be shared with specific users and groups, so that admins can create different RKE templates for different sets of users.

If a cluster was created with an RKE template, you can't change it to a different RKE template. You can only update the cluster to a new revision of the same template.

You can [save the configuration of an existing cluster as an RKE template.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/applying-templates/#converting-an-existing-cluster-to-use-an-rke-template) Then the cluster's settings can only be changed if the template is updated. The new template can also be used to launch new clusters.

The core features of RKE templates allow DevOps and security teams to:

- Standardize cluster configuration and ensure that Rancher-provisioned clusters are created following best practices
- Prevent less technical users from making uninformed choices when provisioning clusters
- Share different templates with different sets of users and groups
- Delegate ownership of templates to users who are trusted to make changes to them
- Control which users can create templates
- Require users to create clusters from a template

# Configurable Settings

RKE templates can be created in the Rancher UI or defined in YAML format. They can define all the same parameters that can be specified when you use Rancher to provision custom nodes or nodes from an infrastructure provider:

- Cloud provider options
- Pod security options
- Network providers
- Ingress controllers
- Network security configuration
- Network plugins
- Private registry URL and credentials
- Add-ons
- Kubernetes options, including configurations for Kubernetes components such as kube-api, kube-controller, kubelet, and services

The [add-on section](#add-ons) of an RKE template is especially powerful because it allows a wide range of customization options.

# Scope of RKE Templates

RKE templates are supported for Rancher-provisioned clusters. The templates can be used to provision custom clusters or clusters that are launched by an infrastructure provider.

RKE templates are for defining Kubernetes and Rancher settings. Node templates are responsible for configuring nodes. For tips on how to use RKE templates in conjunction with hardware, refer to [RKE Templates and Hardware]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/rke-templates-and-hardware).

RKE templates can be created from scratch to pre-define cluster configuration. They can be applied to launch new clusters, or templates can also be exported from existing running clusters.

The settings of an existing cluster can be [saved as an RKE template.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/applying-templates/#converting-an-existing-cluster-to-use-an-rke-template) This creates a new template and binds the cluster settings to the template, so that the cluster can only be upgraded if the [template is updated]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/creating-and-revising/#updating-a-template), and the cluster is upgraded to [use a newer version of the template.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/creating-and-revising/#upgrading-a-cluster-to-use-a-new-template-revision) The new template can also be used to create new clusters.


# Example Scenarios
When an organization has both basic and advanced Rancher users, administrators might want to give the advanced users more options for cluster creation, while restricting the options for basic users.

These [example scenarios]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/example-scenarios) describe how an organization could use templates to standardize cluster creation.

Some of the example scenarios include the following:

- **Enforcing templates:** Administrators might want to [enforce one or more template settings for everyone]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/example-scenarios/#enforcing-a-template-setting-for-everyone) if they want all new Rancher-provisioned clusters to have those settings.
- **Sharing different templates with different users:** Administrators might give [different templates to basic and advanced users,]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/example-scenarios/#templates-for-basic-and-advanced-users) so that basic users can have more restricted options and advanced users can use more discretion when creating clusters.
- **Updating template settings:** If an organization's security and DevOps teams decide to embed best practices into the required settings for new clusters, those best practices could change over time. If the best practices change, [a template can be updated to a new revision]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/example-scenarios/#updating-templates-and-clusters-created-with-them) and clusters created from the template can [upgrade to the new version]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/creating-and-revising/#upgrading-a-cluster-to-use-a-new-template-revision) of the template.
- **Sharing ownership of a template:** When a template owner no longer wants to maintain a template, or wants to share ownership of the template, this scenario describes how [template ownership can be shared.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/example-scenarios/#allowing-other-users-to-control-and-share-a-template)

# Template Management

When you create an RKE template, it is available in the Rancher UI from the **Global** view under **Tools > RKE Templates.** When you create a template, you become the template owner, which gives you permission to revise and share the template. You can share the RKE templates with specific users or groups, and you can also make it public.

Administrators can turn on template enforcement to require users to always use RKE templates when creating a cluster. This allows administrators to guarantee that Rancher always provisions clusters with specific settings.

RKE template updates are handled through a revision system. If you want to change or update a template, you create a new revision of the template. Then a cluster that was created with the older version of the template can be upgraded to the new template revision.

In an RKE template, settings can be restricted to what the template owner chooses, or they can be open for the end user to select the value. The difference is indicated by the **Allow User Override** toggle over each setting in the Rancher UI when the template is created.

For the settings that cannot be overridden, the end user will not be able to directly edit them. In order for a user to get different options of these settings, an RKE template owner would need to create a new revision of the RKE template, which would allow the user to upgrade and change that option.

The documents in this section explain the details of RKE template management:

- [Getting permission to create templates]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/creator-permissions/)
- [Creating and revising templates]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/creating-and-revising/)
- [Enforcing template settings](./enforcement/#requiring-new-clusters-to-use-an-rke-template) 
- [Overriding template settings]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/overrides/)
- [Sharing templates with cluster creators]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/template-access-and-sharing/#sharing-templates-with-specific-users-or-groups)
- [Sharing ownership of a template]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/template-access-and-sharing/#sharing-ownership-of-templates)

An [example YAML configuration file for a template]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/example-yaml) is provided for reference.

# Applying Templates

You can [create a cluster from a template]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/applying-templates/#creating-a-cluster-from-an-rke-template) that you created, or from a template that has been [shared with you.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/template-access-and-sharing)

If the RKE template owner creates a new revision of the template, you can [upgrade your cluster to that revision.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/applying-templates/#updating-a-cluster-created-with-an-rke-template)

RKE templates can be created from scratch to pre-define cluster configuration. They can be applied to launch new clusters, or templates can also be exported from existing running clusters.

You can [save the configuration of an existing cluster as an RKE template.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/applying-templates/#converting-an-existing-cluster-to-use-an-rke-template) Then the cluster's settings can only be changed if the template is updated.

# Standardizing Hardware

RKE templates are designed to standardize Kubernetes and Rancher settings. If you want to standardize your infrastructure as well, you use RKE templates [in conjunction with other tools]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/rke-templates-and-hardware).

# YAML Customization

If you define an RKE template as a YAML file, you can modify this [example RKE template YAML]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/example-yaml). The YAML in the RKE template uses the same customization that Rancher uses when creating an RKE cluster, but since the YAML is located within the context of a Rancher provisioned cluster, you will need to nest the RKE template customization under the `rancher_kubernetes_engine_config` directive in the YAML.

The RKE documentation also has [annotated]({{<baseurl>}}/rke/latest/en/example-yamls/) `cluster.yml` files that you can use for reference.

For guidance on available options, refer to the RKE documentation on [cluster configuration.]({{<baseurl>}}/rke/latest/en/config-options/)

### Add-ons

The add-on section of the RKE template configuration file works the same way as the [add-on section of a cluster configuration file]({{<baseurl>}}/rke/latest/en/config-options/add-ons/).

The user-defined add-ons directive allows you to either call out and pull down Kubernetes manifests or put them inline directly. If you include these manifests as part of your RKE template, Rancher will provision those in the cluster.

Some things you could do with add-ons include:

- Install applications on the Kubernetes cluster after it starts
- Install plugins on nodes that are deployed with a Kubernetes daemonset
- Automatically set up namespaces, service accounts, or role binding

The RKE template configuration must be nested within the `rancher_kubernetes_engine_config` directive. To set add-ons, when creating the template, you will click **Edit as YAML.** Then use the `addons` directive to add a manifest, or the `addons_include` directive to set which YAML files are used for the add-ons. For more information on custom add-ons, refer to the [user-defined add-ons documentation.]({{<baseurl>}}/rke/latest/en/config-options/add-ons/user-defined-add-ons/)
