---
title: Catalogs and Charts
weight: 2250
---

_Catalogs_ are GitHub repositories filled with applications that are ready-made for deployment.

Applications are bundled in objects called _charts_, which are a packaging format popularized by [Helm](https://docs.helm.sh/). Think of them as templates for deployments. Per Helm, charts are:

>A collection of files that describe a related set of Kubernetes resources. A single chart might be used to deploy something simple, like a memcached pod, or something complex, like a full web app stack with HTTP servers, databases, caches, and so on.

Rancher improves on Helm catalogs and charts. All native Helm charts can work within Rancher, but Rancher adds several enhancements to improve their user experience.

## Catalog Types

Within Rancher, you can access several different catalogs either by default or through customization. Enable or disable these catalogs by opening the **Global** view and then selecting **Catalogs** from the main menu.

- **Library**

	The Library Catalog includes charts curated by Rancher. Rancher stores charts in a git repository to expedite the fetch and update of charts. In Rancher 2.0, only global catalogs are supported. Support for cluster-level and project-level charts will be added in the future.
	
	This catalog features Rancher Charts, which include some [notable advantages](#chart-types) over native Helm charts.

- **Helm Stable**

	This catalog includes native [Helm charts](https://github.com/kubernetes/helm/blob/master/docs/chart_template_guide/getting_started.md), both of which are maintained by the Kubernetes community. This catalog features the largest pool of apps, but is also the most complex way to deploy charts within Rancher.

- **Helm Incubator**

	Similar in user experience to Helm Stable, but this catalog is filled with applications in BETA.

- **Custom**

	Finally, you have the option of building your own catalogs. Custom catalogs are useful when you have a handful of apps that you deploy regularly in a specific configuration.
 
### Custom Catalog Creation
	
Creating a custom catalog for Rancher is straightforward. Create a Git Repo and then direct Rancher toward the repo. 

For step-by-step directions, see [placeholder](placeholder).

When you're done creating the catalog, populate it charts. See [Custom Chart Creation](#custom-chart-creation).

## Chart Types

Rancher supports two different types of charts:

- **Helm Charts**

	Native Helm charts include an application along with other software required to run it. When deploying native Helm charts, you'll learn the chart's parameters and then configure them using **Answers**, which are sets of key value pairs.

	The Helm Stable and Helm Incubators are populated with native Helm charts. However, you can also use native Helm charts in Custom catalogs (although we recommend Rancher Charts).

- **Rancher Charts**

	Rancher charts mirror native helm charts, although they add two files that enhance user experience: `app-readme.md` and `questions.yaml`. Read more about them in [Rancher Chart Additional Files](#rancher-chart-additional-files)

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
			<td> Rancher Specific: Text displayed within Rancher.</td>
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
			<td><strong>Rancher Specific:</strong> File containing questions displayed within Rancher.</td>
		</tr>
		<tr>
			<td> </td>
			<td><code>README.md</code></td>
			<td>Optional: Helm Readme file displayed within Rancher.</td>
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

Before you create your own custom catalog, you should have a basic understanding about how a Rancher chart differs from a native Helm chart. Rancher charts differ slightly from native Helm charts in their directory structures. Rancher charts include two files that native Helm charts do not.

- `app-readme.md`
      
    A file that provides descriptive text in the chart's UI header. The following image displays the difference between a Rancher chart (which includes `app-readme.md`) and a native Helm chart (which does not).

	**Example: `app-readme.md` Rancher Output**

	![app-readme.md]({{< baseurl >}}/img/rancher/app-readme.png)
      
- `questions.yml`
    
    A file that containing questions for a form. These form questions simplify deployment of a chart. Without it, you must configure the deployment using key value pairs, which is more difficult. The following image displays the difference between a Rancher chart (which includes `questions.yml`) and a native Helm chart (which does not).


	**Example: `questions.yml` Rancher Output**

	![questions.yml]({{< baseurl >}}/img/rancher/questions.png)


### Custom Chart Creation

 You can fill your custom catalog with either Helm Charts or Rancher Charts, although we recommend Rancher Charts due to their enhanced user experience.

>**Note:** For a complete walk through of developing charts, see the upstream Helm chart [developer reference](https://docs.helm.sh/developing_charts/).
