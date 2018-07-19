---
title: Cluster Options
weight: 2250
---

As you configure a new cluster that's provisioned using [RKE]({{< baseurl >}}/rke/v0.1.x/en/), you can choose custom Kubernetes options.

You can configure Kubernetes options one of two ways:

- [Rancher UI](#rancher-ui): Use the Rancher UI to select options that are commonly customized when setting up a Kubernetes cluster.
- [Config File](#config-file): Alternatively, you can create a [RKE config file]({{< baseurl >}}/rke/v0.1.x/en/config-options/) to customize any option offered by Kubernetes.

## Rancher UI

When creating a cluster using one of the options described in [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters), you can configure basic Kubernetes options using the **Cluster Options** section.

From this section you can choose:

- The version of Kubernetes installed on your cluster nodes. Rancher uses its own version of Kubernetes based on [hyperkube](https://hub.docker.com/r/kubernetesonarm/hyperkube/), but packaged with more utilities.

- Whether Rancher should check if the nodes are running a supported or unsupported version of Docker. If you only allow supported versions, the cluster automatically fails to launch if you have an unsupported version of Docker. Each Kubernetes version is tied to specific Docker versions based on what Kubernetes tests against. 

- The [Network Provider](https://kubernetes.io/docs/concepts/cluster-administration/networking/) that the cluster uses. Out of the box, Rancher supports:
    
    - **[Canal](https://github.com/projectcalico/canal)**: In v2.0.0 - v2.0.4 and v2.0.6, this was the default option for these clusters was Canal with network isolation. With the network isolation automatically enabled, it prevented any pod communication between [projects]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/projects-and-namespaces/). 
    
    - **[Flannel](https://github.com/coreos/flannel#flannel)**: In v2.0.5, this was the default option, which did not prevent any network isolation between projects. 
    
    - **[Calico](https://docs.projectcalico.org/v3.1/introduction/)**
    
    > **Note:** Please carefully select which network provider you want to use as Kubernetes doesn't allow switching between network providers. Once a cluster is created with a network provider, you would need to tear down the entire cluster and all applications to be able to switch to a different one. 
    
- Whether or not to use a [cloud provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers). If you want to use [volumes and storage]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/volumes-and-storage/) in Kubernetes, typically you must select the specific cloud provider in order to use it. For example, if you want to use Amazon EBS, you would need to select the `aws` cloud provider. 
   > **Note:** If your cloud provider is not listed as an option, you will need to use the [config file option](#config-file) to use that cloud provider. PLease reference the [RKE's cloud provider documentation]({{< baseurl >}}/rke/v0.1.x/en/config-options/cloud-providers/) on how to configure these other cloud providers. 

- Whether or not to use a [pod security policy]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies). You must have an existing pod security policy configured before you can use this option.

## Config File

Instead of using the Rancher UI to choose Kubernetes options for the cluster, advanced users can create an RKE config file. Using a config file allows you to set any of the [options available]({{< baseurl >}}/rke/v0.1.x/en/config-options/) in an RKE installation.

- To edit an RKE config file directly from the Rancher UI, click **Edit as YAML**.
- To read from an existing RKE file, click **Read from File**.

For an example of RKE config file syntax, see the [RKE documentation]({{< baseurl >}}/rke/v0.1.x/en/example-yamls/).  
