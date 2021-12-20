---
title: Secrets
weight: 3062
---

[Secrets](https://kubernetes.io/docs/concepts/configuration/secret/#overview-of-secrets) store sensitive data like passwords, tokens, or keys. They may contain one or more key value pairs.

> This page is about secrets in general. For details on setting up a private registry, refer to the section on [registries.]({{<baseurl>}}/rancher/v2.6/en/k8s-in-rancher/registries)

When configuring a workload, you'll be able to choose which secrets to include. Like config maps, secrets can be referenced by workloads as either an environment variable or a volume mount.

Mounted secrets will be updated automatically unless they are mounted as subpath volumes. For details on how updated secrets are propagated, refer to the [Kubernetes documentation.](https://kubernetes.io/docs/concepts/configuration/secret/#mounted-secrets-are-updated-automatically)

# Creating Secrets in Namespaces

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to add a secret and click **Explore**.
1. To navigate to secrets, you may click either **Storage > Secrets** or **More Resources > Core > Secrets**. 
1. Click **Create**.
1. Select the type of secret you want to create.
1. Select a **Namespace** for the secret.
1. Enter a **Name** for the secret.

    >**Note:** Kubernetes classifies secrets, certificates, and registries all as [secrets](https://kubernetes.io/docs/concepts/configuration/secret/), and no two secrets in a namespace can have duplicate names. Therefore, to prevent conflicts, your secret must have a unique name among all secrets within your workspace.

1. From **Data**, click **Add** to add a key-value pair. Add as many values as you need.

    >**Tip:** You can add multiple key value pairs to the secret by copying and pasting.
    >
    > {{< img "/img/rancher/bulk-key-values.gif" "Bulk Key Value Pair Copy/Paste">}}

1. Click **Save**.

**Result:** Your secret is added to the namespace you chose. You can view the secret in the Rancher UI by clicking either **Storage > Secrets** or **More Resources > Core > Secrets**. 

Mounted secrets will be updated automatically unless they are mounted as subpath volumes. For details on how updated secrets are propagated, refer to the [Kubernetes documentation.](https://kubernetes.io/docs/concepts/configuration/secret/#mounted-secrets-are-updated-automatically)


# Creating Secrets in Projects

Before v2.6, secrets were required to be in a project scope. Projects are no longer required, and you may use the namespace scope instead. As a result, the Rancher UI was updated to reflect this new functionality. However, you may still create project-scoped secrets if desired. Note that you have to first enable the `legacy` feature flag and look at a single project to do so. Use the following steps to set up your project-level secret:

1. In the upper left corner, click **☰ > Global Settings** in the dropdown.
1. Click **Feature Flags**.
1. Go to the `legacy` feature flag and click **Activate**.
1. In the upper left corner, click **☰ > Cluster Management** in the dropdown.
1. Go to the cluster that you created and click **Explore.**
1. Click **Legacy > Projects**.
1. In the top navigation bar, filter to see only one project.
1. In the left navigation bar, click **Secrets**.
1. Click **Add Secret**.

**Result:** Your secret is added to the individual project you chose. You can view the secret in the Rancher UI by clicking either **Storage > Secrets** or **More Resources > Core > Secrets**. 

>**Note:** Project-scoped secrets on the local cluster are only visible when a single project is selected.

# What's Next?

Now that you have a secret added to a namespace, you can add it to a workload that you deploy.

For more information on adding secret to a workload, see [Deploying Workloads]({{<baseurl>}}/rancher/v2.6/en/k8s-in-rancher/workloads/deploy-workloads/).
