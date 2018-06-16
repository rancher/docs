---
title: Customizing Charts
weight: 75
---

Before you can deploy customized catalog apps using Rancher, you must add charts to the GitHub repository serving as your custom catalog.

The custom catalog can contain native Helm charts, Rancher charts, or a combination of both (although we recommend using Rancher charts).

>**Prerequisites:**

>- Recommended: Read [Catalogs and Charts]({{< baseurl >}}/rancher/v2.x/en/concepts/catalogs).
>- Create a GitHub repository to serve as your custom catalog.
>- Complete [Adding Custom Catalogs]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/catalog/adding-custom-catalogs).

>**Note:** Customization of Helm charts takes place outside of the Rancher UI.

1. Within the GitHub repo that you're using as your custom catalog, create a directory structure that mirrors the structure listed in [Chart Directory Structure]({{< baseurl >}}/rancher/v2.x/en/concepts/catalogs/#chart-directory-structure).

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

## What's Next?

Launch your custom catalog app. For more information, see [Launching a Catalog App]({{< baseurl >}}/rancher/v2.x/en/tasks/projects/launch-a-catalog-app).

## Question Variable Reference

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
