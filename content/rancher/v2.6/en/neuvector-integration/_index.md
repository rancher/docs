---
title: NeuVector Integration
weight: 22
---

##### _Tech Preview_

New in Rancher v2.6.5, [NeuVector 5.x](https://open-docs.neuvector.com/) is an open-source container-centric security platform that is now integrated into Rancher. NeuVector offers real-time compliance, visibility, and protection for critical applications and data during runtime. NeuVector provides a firewall, container process/file system monitoring, security auditing with CIS benchmarks, and vulnerability scanning. For more information on Rancher security, please see the [hardening guides and benchmark versions]({{<baseurl>}}/rancher/v2.6/en/security/).

NeuVector can be enabled through a Helm chart that may be installed either through **Apps & Marketplace** or through the **Cluster Tools** button in the Rancher UI. Once the Helm chart is installed, users can easily [deploy and manage NeuVector clusters within Rancher](https://open-docs.neuvector.com/deploying/rancher#deploy-and-manage-neuvector-through-rancher-apps-marketplace).

### Installing NeuVector with Rancher

The Harvester Helm Chart is used to manage access to the NeuVector UI in Rancher where users can navigate directly to deploy and manage their NeuVector clusters. 

**To navigate to and install the NeuVector chart through Apps & Marketplace:**

1. Click **☰ > Cluster Management**.
1. On the Clusters page, go to the cluster where you want to deploy NeuVector, and click **Explore**.
1. Go to **Apps & Marketplace > Repositories**, then click **Create**.
1. In the Target section, select **Git repository containing Helm chart or cluster template definitions**. Then enter the index URL of https://github.com/selvamt94/charts.git and the branch **neuvector**. Click **Create**.
1. Go to **Apps & Marketplace > Charts**, and install **NeuVector** from the chart repo. When configuring Helm chart values, go to the **Container Runtime** section, de-select **Docker** and instead select **Containerd Runtime**. Finally, click **Install** again.

**To navigate to and install the NeuVector chart through Cluster Tools:**

1. Repeat steps 1 - 4 above.
1. Click on **Cluster Tools** at the bottom of the left navigation bar.
1. Select the **NeuVector** chart and then click **Install**. When configuring Helm chart values, go to the **Container Runtime** section, de-select **Docker** and instead select **Containerd Runtime**. Finally, click **Install** again.

### Accessing NeuVector from the Rancher UI

1. Go to the cluster where NeuVector is installed. In the left navigation bar, click **NeuVector**.
1. Click the external link to go to the NeuVector UI.

### Uninstalling NeuVector from the Rancher UI

**To uninstall from Apps & Marketplace:**

1. Click **☰ > Cluster Management**.
1. On the Clusters page, go to the cluster where NeuVector is deployed, and click **Explore**.
1. In the left navigation bar, click **NeuVector**.
1. Under **Apps & Marketplace**, click **Installed Apps**.
1. Under `cattle-neuvector-system`, select both the NeuVector app (and the associated CRD if desired), then click **Delete**.

**To uninstall from Cluster Tools:**

1. Repeat steps 1 - 3 above.
1. Click on **Cluster Tools** at the bottom-left of the screen, then click on the trash can icon under the NeuVector chart. Select `Delete the CRD associated with this app` if desired.

### GitHub Repository

The NeuVector project is available [here](https://github.com/neuvector/neuvector).

### Documentation

The NeuVector documentation is [here](https://open-docs.neuvector.com/).

### Architecture

The NeuVector security solution contains four types of security containers: Controllers, Enforcers, Managers, and Scanners. A special container called an All-in-One is also provided to combine the Controller, Enforcer, and Manager functions all in one container, primarily for Docker-native deployments. There is also an Updater which, when run, will update the CVE database.

- **Controller:** Manages the NeuVector Enforcer container; provides REST APIs for the management console.
- **Enforcer:** Enforces security policies.
- **Manager:** Provides a web-UI and CLI console to manage the NeuVector platform.
- **All-in-One:** Includes the Controller, Enforcer, and Manager.
- **Scanner:** Performs the vulnerability and compliance scanning for images, containers, and nodes.
- **Updater:** Updates the CVE database for Neuvector (when run); redeploys scanner pods.

<figcaption>**NeuVector Security Containers:**</figcaption>
![NeuVector Security Containers]({{<baseurl>}}/img/rancher/neuvector-security-containers.png)

<figcaption>**NeuVector Architecture:**</figcaption>
![NeuVector Architecture]({{<baseurl>}}/img/rancher/neuvector-architecture.png)

To learn more about NeuVector's architecture, please refer [here](https://open-docs.neuvector.com/basics/overview#architecture).

### Limitations

* Currently, NeuVector feature chart installation fails when a NeuVector partner chart already exists. To work around this issue, uninstall the NeuVector partner chart and reinstall the NeuVector feature chart. 