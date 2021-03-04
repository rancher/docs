---
title: Launching Catalog Apps
weight: 700
aliases:
  - /rancher/v2.0-v2.4/en/catalog/launching-apps
  - /rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/launching-apps
---

Within a project, when you want to deploy applications from catalogs, the applications available in your project will be based on the [scope of the catalogs]({{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/#catalog-scopes).

If your application is using ingresses, you can program the ingress hostname to an external DNS by setting up a [Global DNS entry]({{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/globaldns/).

- [Prerequisites](#prerequisites)
- [Launching a catalog app](#launching-a-catalog-app)
- [Configuration options](#configuration-options)

# Prerequisites

When Rancher deploys a catalog app, it launches an ephemeral instance of a Helm service account that has the permissions of the user deploying the catalog app. Therefore, a user cannot gain more access to the cluster through Helm or a catalog application than they otherwise would have.

To launch an app from a catalog in Rancher, you must have at least one of the following permissions:

- A [project-member role]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#project-roles) in the target cluster, which gives you the ability to create, read, update, and delete the workloads
- A [cluster owner role]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) for the cluster that include the target project

Before launching an app, you'll need to either [enable a built-in global catalog]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/built-in) or [add your own custom catalog.]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/adding-catalogs)

# Launching a Catalog App

1. From the **Global** view, open the project that you want to deploy an app to.

2. From the main navigation bar, choose **Apps**. In versions before v2.2.0, choose **Catalog Apps** on the main navigation bar. Click **Launch**.

3. Find the app that you want to launch, and then click **View Now**.

4. Under **Configuration Options** enter a **Name**. By default, this name is also used to create a Kubernetes namespace for the application.

    * If you would like to change the **Namespace**, click **Customize** and enter a new name.
    * If you want to use a different namespace that already exists, click **Customize**, and then click **Use an existing namespace**. Choose a namespace from the list.

5. Select a **Template Version**.

6. Complete the rest of the **Configuration Options**.

    * For native Helm charts (i.e., charts from the **Helm Stable** or **Helm Incubator** catalogs), answers are provided as key value pairs in the **Answers** section.
    * Keys and values are available within **Detailed Descriptions**.
    * When entering answers, you must format them using the syntax rules found in [Using Helm: The format and limitations of --set](https://helm.sh/docs/intro/using_helm/#the-format-and-limitations-of---set), as Rancher passes them as `--set` flags to Helm. For example, when entering an answer that includes two values separated by a comma (i.e., `abc, bcd`), wrap the values with double quotes (i.e., `"abc, bcd"`).

7. Review the files in **Preview**. When you're satisfied, click **Launch**.

**Result**: Your application is deployed to your chosen namespace. You can view the application status from the project's **Workloads** view or **Apps** view. In versions before v2.2.0, this is the **Catalog Apps** view.

# Configuration Options

For each Helm chart, there are a list of desired answers that must be entered in order to successfully deploy the chart. When entering answers, you must format them using the syntax rules found in [Using Helm: The format and limitations of –set](https://helm.sh/docs/intro/using_helm/#the-format-and-limitations-of---set), as Rancher passes them as `--set` flags to Helm.

> For example, when entering an answer that includes two values separated by a comma (i.e. `abc, bcd`), it is required to wrap the values with double quotes (i.e., ``"abc, bcd"``).

{{% tabs %}}
{{% tab "UI" %}}

### Using a questions.yml file

If the Helm chart that you are deploying contains a `questions.yml` file, Rancher's UI will translate this file to display an easy to use UI to collect the answers for the questions.

### Key Value Pairs for Native Helm Charts

For native Helm charts (i.e., charts from the **Helm Stable** or **Helm Incubator** catalogs or a [custom Helm chart repository]({{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/catalog-config/#custom-helm-chart-repository)), answers are provided as key value pairs in the **Answers** section. These answers are used to override the default values.

{{% /tab %}}
{{% tab "Editing YAML Files" %}}

_Available as of v2.1.0_

If you do not want to input answers using the UI, you can choose the **Edit as YAML** option.

With this example YAML:

```YAML
outer:
  inner: value
servers:
- port: 80
  host: example
```

### Key Value Pairs

You can have a YAML file that translates these fields to match how to [format custom values so that it can be used with `--set`](https://github.com/helm/helm/blob/master/docs/using_helm.md#the-format-and-limitations-of---set).

These values would be translated to:

```
outer.inner=value
servers[0].port=80
servers[0].host=example
```

### YAML files

_Available as of v2.2.0_

You can directly paste that YAML formatted structure into the YAML editor. By allowing custom values to be set using a YAML formatted structure, Rancher has the ability to easily customize for more complicated input values (e.g. multi-lines, array and JSON objects).
{{% /tab %}}
{{% /tabs %}}