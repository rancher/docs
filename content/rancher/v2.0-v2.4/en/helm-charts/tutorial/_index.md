---
title: "Tutorial: Example Custom Chart Creation"
weight: 800
aliases:
  - /rancher/v2.0-v2.4/en/catalog/tutorial
  - /rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/tutorial
---

In this tutorial, you'll learn how to create a Helm chart and deploy it to a  repository. The repository can then be used as a source for a custom catalog in Rancher.

You can fill your custom catalogs with either Helm Charts or Rancher Charts, although we recommend Rancher Charts due to their enhanced user experience.

> For a complete walkthrough of developing charts, see the upstream Helm chart [developer reference](https://helm.sh/docs/chart_template_guide/).

1. Within the GitHub repo that you're using as your custom catalog, create a directory structure that mirrors the structure listed in the [Chart Directory Structure]({{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/creating-apps/#chart-directory-structure). 

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
    For a list of variables you can use when creating a `questions.yml` file, see [Question Variable Reference]({{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/creating-apps/#question-variable-reference).

    ```yaml
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
    ```

4. Check the customized chart into your GitHub repo.

**Result:** Your custom chart is added to the repo. Your Rancher Server will replicate the chart within a few minutes.
