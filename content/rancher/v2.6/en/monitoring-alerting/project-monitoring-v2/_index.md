---
title: Project Monitoring V2
weight: 15
---

Project Monitoring V2 may be added on to Monitoring V2. The workflow to get project monitoring set up is outlined below.

>**Prerequisite:** [Monitoring V2]({{<baseurl>}}/rancher/v2.6/en/monitoring-alerting/configuration/) is required to be set up first in order for you to add Project Monitoring as it contains the CRDs and the Prometheus Operator needed in order to make Project Monitoring V2 work.
<a id="1"></a>
<a id="2"></a>

If you do not have Monitoring V2 installed yet, start with [Step 1](#1) below. If you already have it installed, skip to [Step 2](#2).

1. Install monitoring in the [`system` project]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/projects-and-namespaces/#the-system-project):

    1.1. Click **☰ > Cluster Management**.

    1.2. On the **Clusters** page, go to the cluster where you want to enable monitoring and click **Explore**.

    1.3. Click **Apps > Charts**.

    1.4. Click **Install** in the **Monitoring** app.

    1.5. Select `System` in the dropdown **Install into Project**:

    ![Install Monitoring in System Project]({{<baseurl>}}/img/rancher/install-in-system-project.png)

    1.6. Optional: Customize requests, limits, and more for Alerting, Prometheus, and Grafana. For help, refer to the [configuration reference]({{<baseurl>}}/rancher/v2.6/en/monitoring-alerting/configuration/helm-chart-options/).
    <br/>
    <br/>

1. Open the `system` project to check your namespaces:

    2.1. Click **Cluster > Projects/Namespaces** in the Rancher UI. This will display all of the namespaces in the `system` project:

    ![Select Projects-Namespaces]({{<baseurl>}}/img/rancher/cattle-monitoring-system.png)

    2.2. If you have an existing monitoring V2 installation in which `cattle-monitoring-system` is not in the `system` project, it is recommended - but not required - that you move the `cattle-monitoring-system` namespace into the `system` project. This is recommended because cluster-level monitoring needs to be in a locked-down project with very minimal user access. To do so, you may either

    - Drag and drop the namespace into the `system` project or
    - Select **⋮** to the right of the namespace, click **Move**, then choose `System` from the **Target Project** dropdown

        ![Move to a New Project]({{<baseurl>}}/img/rancher/move-to-new-project.png)


    >It's important to ensure that the `cattle-monitoring-system` namespace is placed into the `system` project to ensure that user access is controlled. Please refer [here](https://github.com/rancher/prometheus-federator/blob/main/docs/design.md#ensure-the-cattle-monitoring-system-namespace-is-placed-into-the-system-project-or-a-similarly-locked-down-project-that-has-access-to-other-projects-in-the-cluster) to learn more about the security expectations for the Prometheus Operator.

1. Install the [Prometheus Federator]({{<baseurl>}}/rancher/v2.6/en/monitoring-alerting/prometheus-federator/) app. 

1. Install Project Monitors in each project where you want to enable project monitoring.
