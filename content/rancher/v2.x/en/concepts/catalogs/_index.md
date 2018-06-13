---
title: Catalogs
weight: 2250
---

Rancher catalog builds on an enhanced version of Helm. All upstream Helm charts can work within Rancher, but Rancher adds several enhancements to improve the user experience.

## Catalog Git Repositories

Rancher stores Helm charts in git repositories to expedite the fetch and update of charts. In Rancher 2.0, only global catalogs are supported. Support for cluster-level and project-level charts will be added in the future.

## Enhanced Revision Tracking

While Helm supports versioned deployments, Rancher added capabilities to track and display what exactly changed between different revisions.

## Streamlined Application Launch

Rancher supports simplified README files and questions files to streamline the application launch process. Users need not read through the entire list of Helm variables to understand how to launch an application.

## Application Resource Management

Rancher tracks all the resources created by a specific application. Users can easily navigate to and troubleshoot on a page listing all the workload objects used to power an application.

## Custom Catalogs

Creating a custom catalog for Rancher is straightforward. The catalogs are hosted in Git repositories and cloned into Rancher periodically.

The charts themselves are standard [Helm templates](https://github.com/kubernetes/helm/blob/master/docs/chart_template_guide/getting_started.md), with a few differences outlined below.

## Rancher Chart Structure

Before you create your own custom catalog, you should have a basic understanding about how a Rancher chart differs from a standard chart.

Rancher charts differ slightly from native Helm charts in their directory structures. Rancher charts include two files that native Helm charts do not.

- `app-readme.md`
      
    A file that provides a high level overview, which displays within Rancher.
      
- `questions.yml`
    
    A file containing questions to prompt the user with.

>**Tip:**  Though we recommend using Rancher charts, you can use native Helm repositories as well.

The following table lists each file and sub-directory found in a Rancher chart directory: `charts/%application%/%app version%/`

<table>
	<tbody>
		<tr>
			<td>Sub-Directory </td>
			<td>File</td>
			<td>Description</td>
		</tr>
		<tr>
			<td> </td>
			<td> <code>add-readme</code></td>
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
			<td>Rancher Specific: File containing questions displayed within Rancher.</td>
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

>**Note:** For a complete walk through of developing charts, see the upstream Helm chart [developer reference](https://docs.helm.sh/developing_charts/).


## Question Variable Reference

This reference contains variables that you can use in `questions.yml`.

| Variable  | Type | Required | Description |
| ------------- | ------------- | --- |------------- |
| 	variable          | string  | true    |  define the variable name specified in the `values.yml`file, using `foo.bar` for nested object. |
| 	label             | string  | true      |  define the UI label. |
| 	description       | string  | false      |  specify the description of the variable.|
| 	type              | string  | false      |  default to `string` if not specified (current supported types are string, boolean, int, enum, password, storageclass and hostname).|
| 	required          | bool    | false      |  define if the variable is required or not (true \| false)|
| 	default           | string  | false      |  specify the default value. |
| 	group             | string  | false      |  group questions by input value. |
| 	min_length        | int     | false      | min character length.|
| 	max_length        | int     | false      | max character length.|
| 	min               | int     | false      |  min integer length. |
| 	max               | int     | false      |  max integer length. |
| 	options           | []string | false     |  specify the options when the vriable type is `enum`, for example: options:<br> - "ClusterIP" <br> - "NodePort" <br> - "LoadBalancer"|
| 	valid_chars       | string   | false     |  regular expression for input chars validation. |
| 	invalid_chars     | string   | false     |  regular expression for invalid input chars validation.|
| 	subquestions      | []subquestion | false|  add an array of subquestions.|
| 	show_if           | string      | false  | show current variable if conditional variable is true, for example `show_if: "serviceType=Nodeport"` |
| 	show\_subquestion_if |  string  | false     | show subquestions if is true or equal to one of the options. for example `show_subquestion_if: "true"`|

**subquestions**: `subquestions[]` cannot contain `subquestions` or `show_subquestions_if` keys, but all other keys in the above table are supported. 
