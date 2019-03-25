---
title: Apps in a Project
weight: 5005
---

Within a project, when you want to deploy applications from catalogs, the applications available in your project will be based on the [scope of the catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog/#catalog-scope).

If your application is using ingresses, you can program the ingress hostname to an external DNS by setting up a [Global DNS entry]({{< baseurl >}}/rancher/v2.x/en/catalog/globaldns/).

## Launching Catalog Applications

After you've either enabled the [built-in global catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog/built-in/) or [added your own custom catalog]({{< baseurl >}}/rancher/v2.x/en/catalog/custom/adding), you can start launching catalog applications.

1. From the **Global** view, navigate to your project that you want to start deploying applications.

2. From the main navigation bar, choose **Apps**. In versions prior to v2.2.0, choose **Catalog Apps** on the main navigation bar. Click **Launch**.

3. Find the application that you want to launch, and then click **View Details**.

4. (Optional) Review the detailed descriptions, which comes from the Helm chart's `README`.

5. Under **Configuration Options** enter a **Name**. By default, this name is also used to create a Kubernetes namespace for the application.

    * If you would like to change the **Namespace**, click **Customize** and change the name of the namespace.
    * If you want to use a different namespace that already exists, click **Customize**, and then click **Use an existing namespace**. Choose a namespace from the list.

6. Select a **Template Version**.

7. Complete the rest of the **Configuration Options**. Rancher handles how to [customize your configuration options](#configuration-options) depending on whether or not the custom catalog includes the `questions.yml` file.

8. Review the files in the **Preview** section. When you're satisfied, click **Launch**.

**Result**: Your application is deployed to your chosen namespace. You can view the application status from the project's:

- **Workloads** view
- **Apps** view. In versions prior to v2.2.0, this is the **Catalog Apps** view.

### Configuration Options

For each Helm chart, there are a list of desired answers that must be entered in order to successfully deploy the chart. When entering answers, you must format them using the syntax rules found in [Using Helm: The format and limitations of –set](https://github.com/helm/helm/blob/master/docs/using_helm.md#the-format-and-limitations-of---set), as Rancher passes them as `--set` flags to Helm.

> For example, when entering an answer that includes two values separated by a comma (i.e. `abc, bcd`), it is reuired to wrap the values with double quotes (i.e., ``"abc, bcd"``).

{{% tabs %}}
{{% tab "UI" %}}

#### Using a `questions.yml` file

If the Helm chart that you are deploying contains a `questions.yml` file, Rancher's UI will translate this file to display an easy to use UI to collect the answers for the questions.

#### Key Value Pairs for Native Helm Charts

For native Helm charts (i.e., charts from the **Helm Stable** or **Helm Incubator** catalogs or a [custom Helm chart repository]({{< baseurl >}}/rancher/v2.x/en/catalog/custom/#custom-helm-chart-repository)), answers are provided as key value pairs in the **Answers** section. These answers are used to override the default values.

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

#### Kev Value Pairs

You can have a YAML file that translates these fields to match how to [format custom values so that it can be used with `--set`](https://github.com/helm/helm/blob/master/docs/using_helm.md#the-format-and-limitations-of---set).

These values would be translated to:

```
outer.inner=value
servers[0].port=80
servers[0].host=example
```

#### YAML files

_Available as of v2.2.0_

You can directly paste that YAML formatted structure into the YAML editor. By allowing custom values to be set using a YAML formatted structure, Rancher has the ability to easily customize for more complicated input values (e.g. multi-lines, array and JSON objects).
{{% /tab %}}
{{% /tabs %}}

## Application Management

After deploying an application, one of the benefits of using an application versus individual workloads/resources is the ease of being able to manage many workloads/resources applications. Apps can be cloned, upgraded or rolled back.

### Cloning Catalog Applications

After an application is deployed, you can easily clone it to use create another application with almost the same configuration. It saves you the work of manually filling in duplicate information.

### Upgrading Catalog Applications

After an application is deployed, you can easily upgrade to a different template version.

1. From the **Global** view, navigate to the project that contains the catalog application that you want to upgrade.

1. From the main navigation bar, choose **Apps**. In versions prior to v2.2.0, choose **Catalog Apps** on the main navigation bar. Click **Launch**.

3. Find the application that you want to upgrade, and then click the Ellipsis to find **Upgrade**.

4. Select the **Template Version** that you want to deploy.

5. (Optional) Update your **Configuration Options**.

6. (Optional) Select whether or not you want to force the catalog application to be upgraded by checking the box for **Delete and recreate resources if needed during the upgrade**.

    > In Kubernetes, some fields are designed to be immutable or cannot be updated directly. As of v2.2.0, you can now force your catalog application to be updated regardless of these fields. This will cause the catalog apps to be deleted and resources to be re-created if needed during the upgrade.

7. Review the files in the **Preview** section. When you're satisfied, click **Launch**.

**Result**: Your application is updated. You can view the application status from the project's:

- **Workloads** view
- **Apps** view. In versions prior to v2.2.0, this is the **Catalog Apps** view.


### Rolling Back Catalog Applications

After an application has been upgraded, you can easily rollback to a different template version.

1. From the **Global** view, navigate to the project that contains the catalog application that you want to upgrade.

1. From the main navigation bar, choose **Apps**. In versions prior to v2.2.0, choose **Catalog Apps** on the main navigation bar. Click **Launch**.

3. Find the application that you want to rollback, and then click the Ellipsis to find **Rollback**.

4. Select the **Revision** that you want to roll back to. By default, Rancher saves up to the last 10 revisions.

5. (Optional) Select whether or not you want to force the catalog application to be upgraded by checking the box for **Delete and recreate resources if needed during the upgrade**.

    > In Kubernetes, some fields are designed to be immutable or cannot be updated directly. As of v2.2.0, you can now force your catalog application to be updated regardless of these fields. This will cause the catalog apps to be deleted and resources to be re-created if needed during the rollback.

7. Click **Rollback**.

**Result**: Your application is updated. You can view the application status from the project's:

- **Workloads** view
- **Apps** view. In versions prior to v2.2.0, this is the **Catalog Apps** view.

### Deleting Catalog Application Deployments

As a safeguard to prevent you from unintentionally deleting other catalog applications that share a namespace, deleting catalog applications themselves does not delete the namespace they're assigned to. Therefore, when you want to delete a deployed catalog application, assuming that it's the only app in its namespace, delete the namespace rather than the catalog app itself. Deleting the namespace deletes both the namespace and the catalog app, whereas deleting the catalog app only deletes the app but not the namespace.

1. From the **Global** view, navigate to the project that contains the catalog application that you want to delete.

1. From the main menu, choose **Namespaces**.

1. Find the namespace running your catalog app. Select it and click **Delete**.

**Result:** The catalog application deployment and its namespace are deleted.
