---
title: Creating Apps
weight: 400
---

Rancher's App Marketplace is based on Helm Repositories and Helm Charts. You can add HTTP based standard Helm Repositories as well as any Git Repository which contains charts.

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

Native Helm charts include an application along with other software required to run it. When deploying native Helm charts, you' can provide the chart's parameter values in a YAML editor.

### Rancher Charts

Rancher charts are native helm charts with two files that enhance user experience: `app-readme.md` and `questions.yaml`. Read more about them in [Additional Files for Rancher Charts.](#additional-files-for-rancher-charts)

Rancher charts add simplified chart descriptions and configuration forms to make the application deployment easy. Rancher users do not need to read through the entire list of Helm variables to understand how to launch an application.

# Chart Directory Structure

You can provide Helm Charts in a standard, HTTP based Helm Repository. For more information see the [Chart Repository Guide](https://helm.sh/docs/topics/chart_repository) in the official Helm documentation.

Alternatively you can organize your charts in a Git Repository and directly add this to the App Marketplace.

The following table demonstrates the directory structure for a Git repository. The `charts` directory is the top level directory under the repository base. Adding the repository to Rancher will expose all charts contained within it. The `questions.yaml`, `README.md`, and `requirements.yml` files are specific to Rancher charts, but are optional for chart customization.

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

    A file that provides descriptive text in the chart's UI header.

- `questions.yml`

    A file that contains questions for a form. These form questions simplify deployment of a chart. Without it, you must configure the deployment using a values YAML config, which is more difficult. The following image displays the difference between a Rancher chart (which includes `questions.yml`) and a native Helm chart (which does not).


	<figcaption>Rancher Chart with <code>questions.yml</code> (top) vs. Helm Chart without (bottom)</figcaption>

	![questions.yml]({{<baseurl>}}/img/rancher/rancher-app-2.6.png) 
	![values.yaml]({{<baseurl>}}/img/rancher/helm-app-2.6.png)


### Chart.yaml annotations

Rancher supports additional annotations that you can add to the `Chart.yaml` file. These annotations allow you to define application dependencies or configure additional UI defaults:

| Annotation                        | Description | Example |
| --------------------------------- | ----------- | ------- |
| catalog.cattle.io/auto-install    | If set, will install the specified chart in the specified version before installing this chart | other-chart-name=1.0.0 |
| catalog.cattle.io/display-name    | A display name that should be displayed in the App Marketplace instead of the chart name | Display Name of Chart |
| catalog.cattle.io/namespace       | A fixed namespace where the chart should be deployed in. If set, this can't be changed by the user | fixed-namespace |
| catalog.cattle.io/release-name    | A fixed release name for the Helm installation. If set, this can't be changed by the user | fixed-release-name |
| catalog.cattle.io/requests-cpu    | Total amount of CPU that should be unreserverd in the cluster. If less CPU is available, a warning will be shown | 2000m |
| catalog.cattle.io/requests-memory | Total amount of memory that should be unreserverd in the cluster. If less memory is available, a warning will be shown | 2Gi |
| catalog.cattle.io/os              | Restricts the OS where this chart can be installed. Possible values: `linux`, `windows`. Default: no restriction | linux |

### questions.yml

Inside the `questions.yml`, most of the content will be around the questions to ask the end user, but there are some additional fields that can be set in this file.

### Min/Max Rancher versions

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
| 	options           | []string | false     |  Specify the options when the variable type is `enum`, for example: options:<br> - "ClusterIP" <br> - "NodePort" <br> - "LoadBalancer"|
| 	valid_chars       | string   | false     |  Regular expression for input chars validation. |
| 	invalid_chars     | string   | false     |  Regular expression for invalid input chars validation.|
| 	subquestions      | []subquestion | false|  Add an array of subquestions.|
| 	show_if           | string      | false  | Show current variable if conditional variable is true. For example `show_if: "serviceType=Nodeport"` |
| 	show\_subquestion_if |  string  | false     | Show subquestions if is true or equal to one of the options. for example `show_subquestion_if: "true"`|

>**Note:** `subquestions[]` cannot contain `subquestions` or `show_subquestions_if` keys, but all other keys in the above table are supported.
