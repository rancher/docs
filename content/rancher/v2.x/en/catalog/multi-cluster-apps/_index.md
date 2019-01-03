---
title: Multi-Cluster Applications
weight: 5000
---
_Available as of v2.2.0_

In use cases where you need to deploy a common workload to multiple clusters or projects, deploy it using a multi-cluster application. A _multi-cluster application_ is a Helm chart template that stores a unique workload configuration. When you deploy a multi-cluster application, this template replicates a unique workload for each deployment target that you choose (i.e., clusters or projects).

Multi-cluster applications are beneficial because they reduce the repetition of deploying individual workloads to each target. They also reduce the likelihood of user error during workload configuration, as you only have to configure a single object rather than a unique object for each target. Additionally, because multi-cluster workloads are a single object, they simplify routine maintenance. For example, rather than upgrading several unique workloads, you can upgrade the multi-cluster application, which then replicates to each target.

In the diagram below, a user is deploying identical workloads to three separate targets: clusters A, B, and C. In this case, the user creates three separate deployments, one for each target. This approach works, but it becomes tedious as your number of targets grows. Furthermore, because each workload is unique, maintenance overhead increases.

<figcaption>Multiple App Deployments Configured Identically</figcaption>

![Multiple App Deployments Configured Identically]({{< baseurl >}}/img/rancher/multi-cluster-app-manual.svg)

However, this second diagram depicts deployment of a multi-cluster application. Instead of making three separate deployments, the user creates a single multi-cluster app, which replicates the app and its configuration on each target. Instead of maintaining three deployments, the user only has to maintain a single object.

<figcaption>Multi-Cluster App: Setup and Deployment</figcaption>

![Multi-Cluster Application: Setup and Deployment]({{< baseurl >}}/img/rancher/multi-cluster-app.svg)


Deploy multi-cluster applications using a catalog app. Following initial deployment, multi-cluster applications can be upgraded or rolled back just like any other workload.


## Multi-Cluster Application Notes

- When deploying a multi-cluster application, you can schedule it to either individual clusters/projects or _all_ of your clusters/projects.

- For multi-cluster applications that require a unique value in each cluster, you can provide them using **Answers** when configuring your app.

- Before you can connect to a multi-cluster workload using a hostname or alias, you must first configure global DNS, which enables service discovery across clusters, allowing services from different clusters to be mapped.

- Using RBAC, you can configure multi-cluster applications to share them among users holding membership in different clusters or projects.

## Multi-Cluster Application Management

After deploying a multi-cluster application, you need to maintain it using the catalog features available for all Helm chart deployments, be they single-cluster or multi-cluster. Just like catalog app deployments to an individual cluster, multi-cluster applications can be cloned, upgraded, or rolled back.

- **Clone**

    After creating a multi-cluster application, you can clone it and use it as a template for another multi-cluster application with a slightly different configuration. Cloning saves you the busy work of manually duplicating a configuration.

- **Upgrade**

    When a new version of an application is released, you can upgrade it across clusters by upgrading its multi-cluster application. When performing a multi-cluster upgrade, you'll have an opportunity to configure an upgrade strategy that optimizes network speed and upgrade reliability for your environment.

    The **batch size** option lets you choose how many target-side workloads can be upgraded simultaneously during rolling waves, optimizing network speed and upgrade reliability for your environment, just as you can with any other workload.

- **Rollback**

    In the event that an upgrade causes issues for one or more of your targets, you can roll the application back to the prior version. Rolling back a multi-cluster application reverts it for _all_ target clusters and projects, not just those targets affected by the upgrade issue.


<!-- TODO: Add step-by-step instructions -->