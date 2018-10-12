---
title: Workload with Ingress Quick Start
weight: 100
---

### Prerequisite

You have a running cluster with at least 1 node.

### 1. Deploying a Workload

You're ready to create your first _workload_. A workload is an object that includes pods along with other files and info needed to deploy your application.

For this workload, you'll be deploying the application Rancher Hello-World.

1.  From the **Clusters** page, open the cluster that you just created.

2.  From the main menu of the **Dashboard**, select **Projects/Namespaces**.

3.  Open the **Project: Default** project.

4.  Click **Deploy**.

	**Step Result:** The **Deploy Workload** page opens.

5.  Enter a **Name** for your workload.

6.  From the **Docker Image** field, enter `rancher/hello-world`. This field is case-sensitive.

7. Leave the remaining options on their default setting. We'll tell you about them later.

8. Click **Launch**.

**Result:**

* Your workload is deployed. This process might take a few minutes to complete.
* When your workload completes deployment, it's assigned a state of **Active**. You can view this status from the project's **Workloads** page.

<br/>
### 2. Expose The Application Via An Ingress

Now that the application is up and running it needs to be exposed so that other services can connect.

1.  From the **Clusters** page, open the cluster that you just created.

2.  From the main menu of the **Dashboard**, select **Projects**.

3.  Open the **Default** project.

4.  Click on the **Load Balancing** tab.

5.  Click **Add Ingress**.

6.  Enter a name i.e. **hello**.

7.  In the **Target** field, drop down the list and choose the name that you set for your service.

8.  Enter `80` in the **Port** field.

9.  Leave everything else as default and click **Save**.

**Result:**  The application is assigned a `xip.io` address and exposed. It may take a minute or two to populate.

### View Your Application

From the **Load Balancing** page, click the target link, which will look something like `hello.default.xxx.xxx.xxx.xxx.xip.io > hello-world`.

Your application will open in a separate window.

#### Finished

Congratulations! You have successfully deployed a workload exposed via an ingress.

#### What's Next?

When you're done using your sandbox, destroy the Rancher Server and your cluster. See one of the following:

- [Amazon AWS: Destroying the Environment]({{< baseurl >}}/rancher/v2.x/en/quick-start-guide/deployment/amazon-aws-qs/#destroying-the-environment)
- [DigitalOcean: Destroying the Environment]({{< baseurl >}}/rancher/v2.x/en/quick-start-guide/deployment/digital-ocean-qs/#destroying-the-environment)
- [Vagrant: Destroying the Environment]({{< baseurl >}}/rancher/v2.x/en/quick-start-guide/deployment/quickstart-vagrant/#destroying-the-environment)
