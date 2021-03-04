---
title: ConfigMaps
weight: 3061
aliases:
  - /rancher/v2.0-v2.4/en/tasks/projects/add-configmaps
  - /rancher/v2.0-v2.4/en/k8s-in-rancher/configmaps  
---

While most types of Kubernetes secrets store sensitive information, [ConfigMaps](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/) store general configuration information, such as a group of config files. Because ConfigMaps don't store sensitive information, they can be updated automatically, and therefore don't require their containers to be restarted following update (unlike most secret types, which require manual updates and a container restart to take effect).

ConfigMaps accept key value pairs in common string formats, like config files or JSON blobs. After you upload a config map, any workload can reference it as either an environment variable or a volume mount.

>**Note:** ConfigMaps can only be applied to namespaces and not projects.

1. From the **Global** view, select the project containing the namespace that you want to add a ConfigMap to.

1. From the main menu, select **Resources > Config Maps**. Click **Add Config Map**.

1. Enter a **Name** for the Config Map.

    >**Note:** Kubernetes classifies ConfigMaps as [secrets](https://kubernetes.io/docs/concepts/configuration/secret/), and no two secrets in a project or namespace can have duplicate names. Therefore, to prevent conflicts, your ConfigMaps must have a unique name among the other certificates, registries, and secrets within your workspace.

1. Select the **Namespace** you want to add Config Map to. You can also add a new namespace on the fly by clicking **Add to a new namespace**.

1. From **Config Map Values**, click **Add Config Map Value** to add a key value pair to your ConfigMap. Add as many values as you need.

1. Click **Save**.

	>**Note:** Don't use ConfigMaps to store sensitive data [use a secret]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/secrets/).
	>
	>**Tip:** You can add multiple key value pairs to the ConfigMap by copying and pasting.
	>
    > {{< img "/img/rancher/bulk-key-values.gif" "Bulk Key Value Pair Copy/Paste">}}

**Result:** Your ConfigMap is added to the namespace. You can view it in the Rancher UI from the **Resources > Config Maps** view.

## What's Next?

Now that you have a ConfigMap added to a namespace, you can add it to a workload that you deploy from the namespace of origin. You can use the ConfigMap to specify information for you application to consume, such as:

- Application environment variables.
- Specifying parameters for a Volume mounted to the workload.

For more information on adding ConfigMaps to a workload, see [Deploying Workloads]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/workloads/deploy-workloads/).
