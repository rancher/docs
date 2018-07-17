---
title: Catalogs and Charts
weight: 4000
aliases:
  - /rancher/v2.x/en/concepts/global-configuration/catalog/
  - /rancher/v2.x/en/tasks/global-configuration/catalog/
---

This section includes step-by-step instruction on how to configure default and custom catalogs.

- [Enabling Default Catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog-and-charts/enabling-default-catalogs)
- [Adding Custom Catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog-and-charts/adding-custom-catalogs)
- [Customizing Charts]({{< baseurl >}}/rancher/v2.x/en/catalog-and-charts/customizing-charts)


_Catalogs_ are GitHub repositories filled with applications that are ready-made for deployment. Applications are bundled in objects called _charts_.

_Charts_ are a packaging format popularized by [Helm](https://docs.helm.sh/). Think of them as templates for deployments. Per Helm, charts are:

>A collection of files that describe a related set of Kubernetes resources. A single chart might be used to deploy something simple, like a memcached pod, or something complex, like a full web app stack with HTTP servers, databases, caches, and so on.

Rancher improves on Helm catalogs and charts. All native Helm charts can work within Rancher, but Rancher adds several enhancements to improve their user experience.

## Catalog Types

Within Rancher, you can access several different catalogs either by default or through customization. Enable or disable these catalogs by opening the **Global** view and then selecting **Catalogs** from the main menu.

- **Library**

	The Library Catalog includes charts curated by Rancher. Rancher stores charts in a Git repository to expedite the fetch and update of charts. In Rancher 2.0, only global catalogs are supported. Support for cluster-level and project-level charts will be added in the future.

	This catalog features Rancher Charts, which include some [notable advantages](#chart-types) over native Helm charts.

- **Helm Stable**

	This catalog, , which is maintained by the Kubernetes community, includes native [Helm charts](https://github.com/kubernetes/helm/blob/master/docs/chart_template_guide/getting_started.md). This catalog features the largest pool of apps.

- **Helm Incubator**

	Similar in user experience to Helm Stable, but this catalog is filled with applications in BETA.

- **Custom**

	Finally, you have the option of building your own catalogs. Custom catalogs are useful when you have a handful of apps that you deploy regularly in a specific configuration.

### Custom Catalog Creation

Creating a custom catalog for Rancher is straightforward. Create a Git repo and then direct Rancher toward the repo.

Custom catalog requirements include:

- A unique name.
- A URL that `git clone` can handle.

For step-by-step directions, see [Adding Custom Catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog-and-charts/adding-custom-catalogs).

When you're done creating the catalog, populate it with charts. Custom catalogs can support both native Helm charts and Rancher charts. See [Custom Chart Creation](#custom-chart-creation).

## Chart Types

Rancher supports two different types of charts:

- **Helm Charts**

	Native Helm charts include an application along with other software required to run it. When deploying native Helm charts, you'll learn the chart's parameters and then configure them using **Answers**, which are sets of key value pairs.

	The Helm Stable and Helm Incubators are populated with native Helm charts. However, you can also use native Helm charts in Custom catalogs (although we recommend Rancher Charts).

- **Rancher Charts**

	Rancher charts mirror native helm charts, although they add two files that enhance user experience: `app-readme.md` and `questions.yaml`. Read more about them in [Rancher Chart Additional Files](#rancher-chart-additional-files).

	Advantages of Rancher charts include:

	- **Enhanced Revision Tracking**

		While Helm supports versioned deployments, Rancher adds tracking and revision history to display changes between different versions of the chart.

	- **Streamlined Application Launch**

		Rancher charts add simplified chart descriptions and configuration forms to make catalog application deployment easy. Rancher users need not read through the entire list of Helm variables to understand how to launch an application.

	- **Application Resource Management**

		Rancher tracks all the resources created by a specific application. Users can easily navigate to and troubleshoot on a page listing all the workload objects used to power an application.

### Chart Directory Structure

The following table demonstrates the directory structure for a chart, which can be found in a chart directory: `charts/%application%/%app version%/`. This information is helpful when customizing charts for a custom catalog. Files denoted with **Rancher Specific** are specific to Rancher charts, but are optional for chart customization.

<table>
	<tbody>
		<tr>
			<td>Sub-Directory </td>
			<td>File</td>
			<td>Description</td>
		</tr>
		<tr>
			<td> </td>
			<td> <code>app-readme.md</code></td>
			<td> <strong>Rancher Specific:</strong> Text displayed in the charts header within the Rancher UI.</td>
		</tr>
		<tr>
			<td><code>charts/</code></td>
            <td></td>
			<td>Directory containing dependency charts.</td>
		</tr>
		<tr>
			<td> </td>
			<td><code>Chart.yml</code></td>
			<td>Required Helm chart information file.</td>
		</tr>
		<tr>
			<td> </td>
			<td><code>questions.yml</code></td>
			<td><strong>Rancher Specific:</strong> File containing form questions displayed within the Rancher UI. Questions display in <strong>Configuration Options</strong>.</td>
		</tr>
		<tr>
			<td> </td>
			<td><code>README.md</code></td>
			<td>Optional: Helm Readme file displayed within Rancher UI. This test displays in <strong>Detailed Descriptions</strong>.</td>
		</tr>
			<td></td>
			<td><code>requirements.yml</code></td>
			<td>Optional YAML file listing dependencies for the chart.</td>
		</tr>
		<tr>
			<td><code>templates/</code></td>
            <td></td>
			<td>A directory of templates that, when combined with <code>values.yml</code>, generates Kubernetes YAML.</td>
		</tr>
		<tr>
			<td> </td>
			<td><code>values.yml</code></td>
			<td>The default configuration values for the chart.</td>
		</tr>
	</tbody>
</table>

### Rancher Chart Additional Files

Before you create your own custom catalog, you should have a basic understanding about how a Rancher chart differs from a native Helm chart. Rancher charts differ slightly from Helm charts in their directory structures. Rancher charts include two files that Helm charts do not.

- `app-readme.md`

    A file that provides descriptive text in the chart's UI header. The following image displays the difference between a Rancher chart (which includes `app-readme.md`) and a native Helm chart (which does not).

	<small>Rancher Chart with <code>app-readme.md</code> (left) vs. Helm Chart without (right)</small>

	![app-readme.md]({{< baseurl >}}/img/rancher/app-readme.png)

- `questions.yml`

    A file that contains questions for a form. These form questions simplify deployment of a chart. Without it, you must configure the deployment using key value pairs, which is more difficult. The following image displays the difference between a Rancher chart (which includes `questions.yml`) and a native Helm chart (which does not).


	<small>Rancher Chart with <code>question.yml</code> (left) vs. Helm Chart without (right)</small>

	![questions.yml]({{< baseurl >}}/img/rancher/questions.png)


### Custom Chart Creation

 You can fill your custom catalogs with either Helm Charts or Rancher Charts, although we recommend Rancher Charts due to their enhanced user experience.

 For information on how to add and customize charts for a custom catalog, see [Customizing Charts]({{< baseurl >}}/rancher/v2.x/en/catalog-and-charts/customizing-charts).

>**Note:** For a complete walkthrough of developing charts, see the upstream Helm chart [developer reference](https://docs.helm.sh/developing_charts/).
