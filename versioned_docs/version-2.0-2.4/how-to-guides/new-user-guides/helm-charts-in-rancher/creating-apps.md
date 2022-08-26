---
title: Creating Catalog Apps
weight: 400
aliases:
  - /rancher/v2.0-v2.4/en/tasks/global-configuration/catalog/customizing-charts/
  - /rancher/v2.0-v2.4/en/catalog/custom/creating
  - /rancher/v2.0-v2.4/en/catalog/custom
  - /rancher/v2.0-v2.4/en/catalog/creating-apps
  - /rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/creating-apps
---

Rancher's catalog service requires any custom catalogs to be structured in a specific format for the catalog service to be able to leverage it in Rancher.

> For a complete walkthrough of developing charts, see the [Chart Template Developer's Guide](https://helm.sh/docs/chart_template_guide/) in the official Helm documentation.

- [Chart types](#chart-types)
  - [Helm charts](#helm-charts)
  - [Rancher charts](#rancher-charts)
- [Chart directory structure](#chart-directory-structure)
- [Additional Files for Rancher Charts](#additional-files-for-rancher-charts)
  - [questions.yml](#questions-yml)
  - [Min/Max Rancher versions](#min-max-rancher-versions)
  - [Question variable reference](#question-variable-reference)
- [Tutorial: Example Custom Chart Creation](#tutorial-example-custom-chart-creation)

# Chart Types

Rancher supports two different types of charts: Helm charts and Rancher charts.

### Helm Charts

Native Helm charts include an application along with other software required to run it. When deploying native Helm charts, you'll learn the chart's parameters and then configure them using **Answers**, which are sets of key value pairs.

The Helm Stable and Helm Incubators are populated with native Helm charts. However, you can also use native Helm charts in Custom catalogs (although we recommend Rancher Charts).

### Rancher Charts

Rancher charts mirror native helm charts, although they add two files that enhance user experience: `app-readme.md` and `questions.yaml`. Read more about them in [Additional Files for Rancher Charts.](#additional-files-for-rancher-charts)

Advantages of Rancher charts include:

- **Enhanced revision tracking:** While Helm supports versioned deployments, Rancher adds tracking and revision history to display changes between different versions of the chart.
- **Streamlined application launch:** Rancher charts add simplified chart descriptions and configuration forms to make catalog application deployment easy. Rancher users need not read through the entire list of Helm variables to understand how to launch an application.
- **Application resource management:** Rancher tracks all the resources created by a specific application. Users can easily navigate to and troubleshoot on a page listing all the workload objects used to power an application.

# Chart Directory Structure

The following table demonstrates the directory structure for a Rancher Chart. The `charts` directory is the top level directory under the repository base. Adding the repository to Rancher will expose all charts contained within it. This information is helpful when customizing charts for a custom catalog. The `questions.yaml`, `README.md`, and `requirements.yml` files are specific to Rancher charts, but are optional for chart customization.

```
<Repository-Base>/
 │
 ├── charts/
 │   ├── <Application Name>/	  # This directory name will be surfaced in the Rancher UI as the chart name
 │   │   ├── <App Version>/	  # Each directory at this level provides different app versions that will be selectable within the chart in the Rancher UI
 │   │   │   ├── Chart.yaml	  # Required Helm chart information file.
 │   │   │   ├── questions.yaml	  # Form questions displayed within the Rancher UI. Questions display in Configuration Options.*
 │   │   │   ├── README.md         # Optional: Helm Readme file displayed within Rancher UI. This text displays in Detailed Descriptions.
 │   │   │   ├── requirements.yml  # Optional: YAML file listing dependencies for the chart.
 │   │   │   ├── values.yml        # Default configuration values for the chart.
 │   │   │   ├── templates/        # Directory containing templates that, when combined with values.yml, generates Kubernetes YAML.
```

# Additional Files for Rancher Charts

Before you create your own custom catalog, you should have a basic understanding about how a Rancher chart differs from a native Helm chart. Rancher charts differ slightly from Helm charts in their directory structures. Rancher charts include two files that Helm charts do not.

- `app-readme.md`

    A file that provides descriptive text in the chart's UI header. The following image displays the difference between a Rancher chart (which includes `app-readme.md`) and a native Helm chart (which does not).

	<figcaption>Rancher Chart with <code>app-readme.md</code> (left) vs. Helm Chart without (right)</figcaption>

	![app-readme.md](/img/app-readme.png)

- `questions.yml`

    A file that contains questions for a form. These form questions simplify deployment of a chart. Without it, you must configure the deployment using key value pairs, which is more difficult. The following image displays the difference between a Rancher chart (which includes `questions.yml`) and a native Helm chart (which does not).


	<figcaption>Rancher Chart with <code>questions.yml</code> (left) vs. Helm Chart without (right)</figcaption>

	![questions.yml](/img/questions.png)


### questions.yml

Inside the `questions.yml`, most of the content will be around the questions to ask the end user, but there are some additional fields that can be set in this file.

### Min/Max Rancher versions

_Available as of v2.3.0_

For each chart, you can add the minimum and/or maximum Rancher version, which determines whether or not this chart is available to be deployed from Rancher.

> **Note:** Even though Rancher release versions are prefixed with a `v`, there is *no* prefix for the release version when using this option.

```
rancher_min_version: 2.3.0
rancher_max_version: 2.3.99
```

### Question Variable Reference

This reference contains variables that you can use in `questions.yml` nested under `questions:`.

| Variable  | Type | Required | Description |
| ------------- | ------------- | --- |------------- |
| 	variable          | string  | true    |  Define the variable name specified in the `values.yml` file, using `foo.bar` for nested objects. |
| 	label             | string  | true      |  Define the UI label. |
| 	description       | string  | false      |  Specify the description of the variable.|
| 	type              | string  | false      |  Default to `string` if not specified (current supported types are string, multiline, boolean, int, enum, password, storageclass, hostname, pvc, and secret).|
| 	required          | bool    | false      |  Define if the variable is required or not (true \| false)|
| 	default           | string  | false      |  Specify the default value. |
| 	group             | string  | false      |  Group questions by input value. |
| 	min_length        | int     | false      | Min character length.|
| 	max_length        | int     | false      | Max character length.|
| 	min               | int     | false      |  Min integer length. |
| 	max               | int     | false      |  Max integer length. |
| 	options           | []string | false     |  Specify the options when the variable type is `enum`, for example: options:<br/> - "ClusterIP" <br/> - "NodePort" <br/> - "LoadBalancer"|
| 	valid_chars       | string   | false     |  Regular expression for input chars validation. |
| 	invalid_chars     | string   | false     |  Regular expression for invalid input chars validation.|
| 	subquestions      | []subquestion | false|  Add an array of subquestions.|
| 	show_if           | string      | false  | Show current variable if conditional variable is true. For example `show_if: "serviceType=Nodeport"` |
| 	show\_subquestion_if |  string  | false     | Show subquestions if is true or equal to one of the options. for example `show_subquestion_if: "true"`|

>**Note:** `subquestions[]` cannot contain `subquestions` or `show_subquestions_if` keys, but all other keys in the above table are supported.

# Tutorial: Example Custom Chart Creation

For a tutorial on adding a custom Helm chart to a custom catalog, refer to [this page.](catalog/tutorial)
