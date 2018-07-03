---
title: Adding ConfigMaps
weight: 
draft: true
---

ConfigMaps store general configuration information for an application, such as configuration files, command-line arguments, environment variables, etc. ConfigMaps accept key value pairs in common string formats, like config files or JSON blobs. Add ConfigMaps to your Rancher workspaces so that you can add them to your workloads later. For more information on ConfigMaps, see the official [Kubernetes Documentation: Using ConfigMap](https://kubernetes-v1-4.github.io/docs/user-guide/configmap/).

>**Note:** ConfigMaps can only be applied to namespaces and not projects.

1. From the **Global** view, select the project containing the namespace that you want to add a ConfigMap to.

1. From the main menu, select **Resources > Config Maps**. Click **Add Config Map**.

1. Enter a **Name** for the Config Map.

    >**Note:** Kubernetes classifies ConfigMaps as [secrets](https://kubernetes.io/docs/concepts/configuration/secret/), and no two secrets in a project or namespace can have duplicate names. Therefore, to prevent conflicts, your ConfigMaps must have a unique name among the other certificates, ConfigMaps, registries, and secrets within your workspace.

1. Select the **Namespace** you want to add Config Map to. You can also add a new namespace on the fly by clicking **Add to a new namespace**.

1. From **Config Map Values**, click **Add Config Map Value** to add a key value pair to your ConfigMap. Add as many values as you need.

	
	>**Note:** Don't use ConfigMaps to store sensitive data [use a secret](../add-a-secret).
	>
	>**Tip:** You can add multiple key value pairs to the ConfigMap by copying and pasting.
	>
	> ![Bulk Key Value Pair Copy/Paste]({{< baseurl >}}/img/rancher/bulk-key-values.gif)
	

**Result:** Your ConfigMap is added to the namespace. You can view it in the Rancher UI from the **Resources > Config Maps** view.

## What's Next?

Now that you have a ConfigMap added to a namespace, you can add it to a workload that you deploy from the namespace of origin. You can use the ConfigMap to specify information for you application to consume, such as:

- Application environment variables.
- Specifying parameters for a Volume mounted to the workload.

For more information on adding ConfigMaps to a workload, see [Deploying Workloads](../../workloads/deploy-workloads).
