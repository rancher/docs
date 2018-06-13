---
title: Catalogs
weight: 1000
draft: true
---

Within Rancher, you can use Helm Charts for quick deployment of applications from a central repository.

## Converting Native Helm Charts for Rancher

To convert a native Helm chart for use in Rancher, you must add two files for Rancher: `app-readme.md` and `questions.yml`.

>**Note:** Conversion of Helm charts for use in Rancher takes place outside of the Rancher UI.

1. Create an `app-readme.md` file.
    <br/>
    <br/>

    **Example**:

    ```
    $ cat ./app-readme.md

    # Wordpress ROCKS!
    ```

    [What's an `app-readme.md` file?]({{< baseurl >}}/rancher/v2.x/en/concepts/catalogs/#rancher-chart-structure)

2. Create a `questions.yml` file that prompts the user for parameters.

    The example below prompts the user to enable persistent storage with a radio button. If the user enables persistent storage, they are prompted for a storage class and volume size.

    The example also provides a list of categories for the chart. This metadata helps users find the chart when browsing the catalog UI.

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

    [What's a `questions.yml` file?]({{< baseurl >}}/rancher/v2.x/en/concepts/catalogs/#rancher-chart-structure)

    [What variables can I use in question.yml?]({{< baseurl >}}/rancher/v2.x/en/concepts/catalogs/#question-variable-reference)

## Adding Custom Catalogs

>**Note:**
>
>- Currently, you can only add custom catalogs to Rancher at the global level. Therefore, any catalog that you add is shared with all clusters and projects.
>
>- Currently, only unauthenticated catalogs are supported.

You can create custom catalogs of Helm charts for use in Rancher. Custom catalogs are helpful for fast deployment of applications unique to your environment.

>**Prerequisites:**
>
>- Create a custom catalog in GitHub. For more information, see [Catalogs]({{< baseurl >}}/rancher/v2.x/en/concepts/catalogs).
>- Convert the native Helm charts in your custom catalog for use in Rancher. For more information, see [Converting Native Helm Charts for Rancher](#converting-native-helm-charts-for-rancher).

1. From the **Global** view, choose **Catalogs** from the main menu.
2. Click **Add Catalog**.
3. Complete the form and click **Create**.

**Result**: Your catalog is added to Rancher. The catalog is available for deployment of your applications.
