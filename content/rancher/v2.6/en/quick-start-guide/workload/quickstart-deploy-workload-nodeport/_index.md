---
title: Workload with NodePort Quick Start
weight: 200
---

### Prerequisite

You have a running cluster with at least 1 node.

### 1. Deploying a Workload

You're ready to create your first Kubernetes [workload](https://kubernetes.io/docs/concepts/workloads/). A workload is an object that includes pods along with other files and info needed to deploy your application.

For this workload, you'll be deploying the application Rancher Hello-World.

1.  From the **Clusters** page, open the cluster that you just created.

2.  From the main menu of the **Dashboard**, select **Projects/Namespaces**.

3.  Open the **Project: Default** project.

4.  Click **Resources > Workloads.**

5.  Click **Deploy**.

	**Step Result:** The **Deploy Workload** page opens.

6.  Enter a **Name** for your workload.

7.  From the **Docker Image** field, enter `rancher/hello-world`. This field is case-sensitive.

8.  From **Port Mapping**, click **Add Port**.

9.  From the **As a** drop-down, make sure that **NodePort (On every node)** is selected.

	![As a dropdown, NodePort (On every node selected)]({{<baseurl>}}/img/rancher/nodeport-dropdown.png)

10.  From the **On Listening Port** field, leave the **Random** value in place.

	![On Listening Port, Random selected]({{<baseurl>}}/img/rancher/listening-port-field.png)

11. From the **Publish the container port** field, enter port `80`.

	![Publish the container port, 80 entered]({{<baseurl>}}/img/rancher/container-port-field.png)

12. Leave the remaining options on their default setting. We'll tell you about them later.

13. Click **Launch**.

**Result:**

* Your workload is deployed. This process might take a few minutes to complete.
* When your workload completes deployment, it's assigned a state of **Active**. You can view this status from the project's **Workloads** page.

<br/>

### 2. Viewing Your Application

From the **Workloads** page, click the link underneath your workload. If your deployment succeeded, your application opens.

### Attention: Cloud-Hosted Sandboxes

When using a cloud-hosted virtual machine, you may not have access to the port running the container. In this event, you can test Nginx in an ssh session on the local machine using `Execute Shell`. Use the port number after the `:` in the link under your workload if available, which is `31568` in this example.

```sh
gettingstarted@rancher:~$ curl http://localhost:31568
<!DOCTYPE html>
<html>
  <head>
    <title>Rancher</title>
    <link rel="icon" href="img/favicon.png">
    <style>
      body {
        background-color: white;
        text-align: center;
        padding: 50px;
        font-family: "Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
      }
      button {
          background-color: #0075a8;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
      }

      #logo {
        margin-bottom: 40px;
      }
    </style>
  </head>
  <body>
    <img id="logo" src="img/rancher-logo.svg" alt="Rancher logo" width=400 />
    <h1>Hello world!</h1>
    <h3>My hostname is hello-world-66b4b9d88b-78bhx</h3>
    <div id='Services'>
      <h3>k8s services found 2</h3>

      <b>INGRESS_D1E1A394F61C108633C4BD37AEDDE757</b> tcp://10.43.203.31:80<br />

      <b>KUBERNETES</b> tcp://10.43.0.1:443<br />

    </div>
    <br />

    <div id='rancherLinks' class="row social">
      <a class="p-a-xs" href="https://rancher.com/docs"><img src="img/favicon.png" alt="Docs" height="25" width="25"></a>
      <a class="p-a-xs" href="https://slack.rancher.io/"><img src="img/icon-slack.svg" alt="slack" height="25" width="25"></a>
      <a class="p-a-xs" href="https://github.com/rancher/rancher"><img src="img/icon-github.svg" alt="github" height="25" width="25"></a>
      <a class="p-a-xs" href="https://twitter.com/Rancher_Labs"><img src="img/icon-twitter.svg" alt="twitter" height="25" width="25"></a>
      <a class="p-a-xs" href="https://www.facebook.com/rancherlabs/"><img src="img/icon-facebook.svg" alt="facebook" height="25" width="25"></a>
      <a class="p-a-xs" href="https://www.linkedin.com/groups/6977008/profile"><img src="img/icon-linkedin.svg" height="25" alt="linkedin" width="25"></a>
    </div>
    <br />
    <button class='button' onclick='myFunction()'>Show request details</button>
    <div id="reqInfo" style='display:none'>
      <h3>Request info</h3>
      <b>Host:</b> 172.22.101.111:31411 <br />
      <b>Pod:</b> hello-world-66b4b9d88b-78bhx </b><br />

      <b>Accept:</b> [*/*]<br />

      <b>User-Agent:</b> [curl/7.47.0]<br />

    </div>
    <br />
    <script>
      function myFunction() {
          var x = document.getElementById("reqInfo");
          if (x.style.display === "none") {
              x.style.display = "block";
          } else {
              x.style.display = "none";
          }
      }
    </script>
  </body>
</html>
gettingstarted@rancher:~$

```

### Finished

Congratulations! You have successfully deployed a workload exposed via a NodePort.

#### What's Next?

When you're done using your sandbox, destroy the Rancher Server and your cluster. See one of the following:

- [Amazon AWS: Destroying the Environment]({{<baseurl>}}/rancher/v2.5/en/quick-start-guide/deployment/amazon-aws-qs/#destroying-the-environment)
- [DigitalOcean: Destroying the Environment]({{<baseurl>}}/rancher/v2.5/en/quick-start-guide/deployment/digital-ocean-qs/#destroying-the-environment)
- [Vagrant: Destroying the Environment]({{<baseurl>}}/rancher/v2.5/en/quick-start-guide/deployment/quickstart-vagrant/#destroying-the-environment)
