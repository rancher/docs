---
title: Custom Catalogs and Charts
weight: 4020
aliases:
  - /rancher/v2.x/en/tasks/global-configuration/catalog/customizing-charts/
---

Rancher's catalog service requires any custom catalogs to be structured in a specific format for the catalog service to be able to leverage it in Rancher. Any custom catalog must be a public Git repository. The URL needs to be one that `git clone` [can handle](https://git-scm.com/docs/git-clone#_git_urls_a_id_urls_a) and must end in `.git`.

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

## Chart Directory Structure

The following table demonstrates the directory structure for a chart, which can be found in a chart directory: `charts/<APPLICATION>/<APP_VERSION>/`. This information is helpful when customizing charts for a custom catalog. Files denoted with **Rancher Specific** are specific to Rancher charts, but are optional for chart customization.

```
charts/<APPLICATION>/<APP_VERSION>/
|--charts/           # Directory containing dependency charts.
|--templates/        # Directory containing templates that, when combined with values.yml, generates Kubernetes YAML.
|--app-readme.md     # Text displayed in the charts header within the Rancher UI.*
|--Chart.yml         # Required Helm chart information file.
|--questions.yml     # Form questions displayed within the Rancher UI. Questions display in Configuration Options.*
|--README.md         # Optional: Helm Readme file displayed within Rancher UI. This text displays in Detailed Descriptions.
|--requirements.yml  # Optional: YAML file listing dependencies for the chart.
|--values.yml        # Default configuration values for the chart.
```

## Rancher Chart Additional Files

Before you create your own custom catalog, you should have a basic understanding about how a Rancher chart differs from a native Helm chart. Rancher charts differ slightly from Helm charts in their directory structures. Rancher charts include two files that Helm charts do not.

- `app-readme.md`

    A file that provides descriptive text in the chart's UI header. The following image displays the difference between a Rancher chart (which includes `app-readme.md`) and a native Helm chart (which does not).

	<figcaption>Rancher Chart with <code>app-readme.md</code> (left) vs. Helm Chart without (right)</figcaption>

	![app-readme.md]({{< baseurl >}}/img/rancher/app-readme.png)

- `questions.yml`

    A file that contains questions for a form. These form questions simplify deployment of a chart. Without it, you must configure the deployment using key value pairs, which is more difficult. The following image displays the difference between a Rancher chart (which includes `questions.yml`) and a native Helm chart (which does not).


	<figcaption>Rancher Chart with <code>questions.yml</code> (left) vs. Helm Chart without (right)</figcaption>

	![questions.yml]({{< baseurl >}}/img/rancher/questions.png)


### Question Variable Reference

This reference contains variables that you can use in `questions.yml`.

| Variable  | Type | Required | Description |
| ------------- | ------------- | --- |------------- |
| 	variable          | string  | true    |  Define the variable name specified in the `values.yml` file, using `foo.bar` for nested objects. |
| 	label             | string  | true      |  Define the UI label. |
| 	description       | string  | false      |  Specify the description of the variable.|
| 	type              | string  | false      |  Default to `string` if not specified (current supported types are string, boolean, int, enum, password, storageclass and hostname).|
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


## Example Custom Chart Creation

 You can fill your custom catalogs with either Helm Charts or Rancher Charts, although we recommend Rancher Charts due to their enhanced user experience.

>**Note:** For a complete walkthrough of developing charts, see the upstream Helm chart [developer reference](https://docs.helm.sh/developing_charts/).

1. Within the GitHub repo that you're using as your custom catalog, create a directory structure that mirrors the structure listed in [Chart Directory Structure](#chart-directory-structure).

    Rancher requires this directory structure, although `app-readme.md` and `questions.yml` are optional.

    >**Tip:**
    >
    >- To begin customizing a chart, copy one from either the [Rancher Library](https://github.com/rancher/charts) or the [Helm Stable](https://github.com/kubernetes/charts/tree/master/stable).
    >- For a complete walk through of developing charts, see the upstream Helm chart [developer reference](https://docs.helm.sh/developing_charts/).

2. **Recommended:** Create an `app-readme.md` file.

    Use this file to create custom text for your chart's header in the Rancher UI. You can use this text to notify users that the chart is customized for your environment or provide special instruction on how to use it.
    <br/>
    <br/>
    **Example**:

    ```
    $ cat ./app-readme.md

    # Wordpress ROCKS!
    ```

3. **Recommended:** Create a `questions.yml` file.

    This file creates a form for users to specify deployment parameters when they deploy the custom chart. Without this file, users **must** specify the parameters manually using key value pairs, which isn't user-friendly.
    <br/>
    <br/>
    The example below creates a form that prompts users for persistent volume size and a storage class.
    <br/>
    <br/>
    For a list of variables you can use when creating a `questions.yml` file, see [Question Variable Reference](#question-variable-reference).

    <pre style="color:#f8f8f2;background-color:#272822;-moz-tab-size:4;-o-tab-size:4;tab-size:4">
        categories:
        - Blog
        - CMS
        questions:
        - variable: persistence.enabled
          default: "false"
          description: "Enable persistent volume for WordPress"
          type: boolean
          required: true
          label: WordPress Persistent Volume Enabled
          show_subquestion_if: true
          group: "WordPress Settings"
          subquestions:
          - variable: persistence.size
            default: "10Gi"
            description: "WordPress Persistent Volume Size"
            type: string
            label: WordPress Volume Size
          - variable: persistence.storageClass
            default: ""
            description: "If undefined or null, uses the default StorageClass. Default to null"
            type: storageclass
            label: Default StorageClass for WordPress
    </pre>

4. Check the customized chart into your GitHub repo.

**Result:** Your custom chart is added to the repo. Your Rancher Server will replicate the chart within a few minutes.
