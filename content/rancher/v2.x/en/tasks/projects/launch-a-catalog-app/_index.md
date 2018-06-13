---
title: Launching a Catalog App
weight: 
draft: true
---

1. From the **Global** view, open the project that you want to deploy to.

2. From the main menu, choose **Catalog Apps**. Then click **Launch**.

3. Click **Launch**.

4. Find the app that you want to launch, and then click **View Now**.

5. Under **Configuration Options** enter a **Name**. By default, this name is also used to create a Kubernetes namespace for the application.
 
    * If you would like to change the **Namespace**, click **Customize** and enter a new name
    * If you want to use a different namespace that already exists, click **Customize**, and then click **Use an existing namespace**. Choose a namespace from the list.

6. Select a **Template Version**.

7. Optional: Add answers to the deployment. Click **Add Answers** to add key value pairs.

    * For native Helm charts, answers are provided as key value pairs in the **Answers** section.
    * Keys and values are available within the **Detailed Descriptions** accordion.

8. Review the files in **Preview**. When you're satisfied, click **Launch**

**Result**: Your application is deployed to your chosen namespace. You can view the application status from the project's:

- **Workloads** view
- **Catalog Apps** view
