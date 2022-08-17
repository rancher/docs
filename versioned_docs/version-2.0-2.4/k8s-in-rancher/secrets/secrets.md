---
title: Secrets
weight: 3062
aliases:
  - /rancher/v2.0-v2.4/en/tasks/projects/add-a-secret
  - /rancher/v2.0-v2.4/en/k8s-in-rancher/secrets   
---

[Secrets](https://kubernetes.io/docs/concepts/configuration/secret/#overview-of-secrets) store sensitive data like passwords, tokens, or keys. They may contain one or more key value pairs.

> This page is about secrets in general. For details on setting up a private registry, refer to the section on [registries.]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/registries)

When configuring a workload, you'll be able to choose which secrets to include. Like config maps, secrets can be referenced by workloads as either an environment variable or a volume mount.

Mounted secrets will be updated automatically unless they are mounted as subpath volumes. For details on how updated secrets are propagated, refer to the [Kubernetes documentation.](https://kubernetes.io/docs/concepts/configuration/secret/#mounted-secrets-are-updated-automatically)

# Creating Secrets

When creating a secret, you can make it available for any deployment within a project, or you can limit it to a single namespace.

1. From the **Global** view, select the project containing the namespace(s) where you want to add a secret.

2. From the main menu, select **Resources > Secrets**. Click **Add Secret**.

3. Enter a **Name** for the secret.

    >**Note:** Kubernetes classifies secrets, certificates, and registries all as [secrets](https://kubernetes.io/docs/concepts/configuration/secret/), and no two secrets in a project or namespace can have duplicate names. Therefore, to prevent conflicts, your secret must have a unique name among all secrets within your workspace.

4. Select a **Scope** for the secret. You can either make the registry available for the entire project or a single namespace.

5. From **Secret Values**, click **Add Secret Value** to add a key value pair. Add as many values as you need.

    >**Tip:** You can add multiple key value pairs to the secret by copying and pasting.
    >
    > {{< img "/img/rancher/bulk-key-values.gif" "Bulk Key Value Pair Copy/Paste">}}

1. Click **Save**.

**Result:** Your secret is added to the project or namespace, depending on the scope you chose. You can view the secret in the Rancher UI from the **Resources > Secrets** view.

Mounted secrets will be updated automatically unless they are mounted as subpath volumes. For details on how updated secrets are propagated, refer to the [Kubernetes documentation.](https://kubernetes.io/docs/concepts/configuration/secret/#mounted-secrets-are-updated-automatically)

# What's Next?

Now that you have a secret added to the project or namespace, you can add it to a workload that you deploy.

For more information on adding secret to a workload, see [Deploying Workloads]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/workloads/deploy-workloads/).
