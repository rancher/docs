---
title: Adding a Secret
weight: 
---

[Secrets](https://kubernetes.io/docs/concepts/configuration/secret/#overview-of-secrets) store sensitive data like passwords, tokens, or keys. They may contain one or more key value pairs.
When creating a secret, you can make it available for any deployment within a project, or you can limit it to a single namespace.

1. From the **Global** view, select the project containing the namespace(s) where you want to add a secret.

1. From the main menu, select **Resources > Secrets**. Click **Add Secret**.

1. Enter a **Name** for the secret.

    >**Note:** Kubernetes classifies secrets, certificates, ConfigMaps, and registries all as [secrets](https://kubernetes.io/docs/concepts/configuration/secret/), and no two secrets in a project or namespace can have duplicate names. Therefore, to prevent conflicts, your secret must have a unique name among all secrets within your workspace.

1. Select a **Scope** for the secret.

1. From **Secret Values**, click **Add Secret Value** to add a key value pair. Add as many values as you need.

	>**Tip:** You can add multiple key value pairs to the secret by copying and pasting.
	>
	> ![Bulk Key Value Pair Copy/Paste]({{< baseurl >}}/img/rancher/bulk-key-values.gif)

1. Click **Save**.
	

**Result:** Your secret is added to the project or namespace, depending on the scope you chose. You can view the secret in the Rancher UI from the **Resources > Secrets** view.

## What's Next?

Now that you have a secret added to the project or namespace, you can add it to a workload that you deploy.

For more information on adding secret to a workload, see [Deploying Workloads](../../workloads/deploy-workloads).
