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

- Whether Rancher should check if the nodes are running a supported or unsupported version of Docker. If you only allow supported versions, the cluster automatically fails to launch.

- The [Network Provider](https://kubernetes.io/docs/concepts/cluster-administration/networking/) that the cluster uses. Out of the box, Rancher supports:
    
    - [Flannel](https://github.com/coreos/flannel#flannel)
    
    - [Calico](https://docs.projectcalico.org/v3.1/introduction/)
    
    - [Canal] (https://github.com/projectcalico/canal) (default)
    
    
- Whether or not to use a [cloud provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers).

- Whether or not to use a [pod security policy]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies). You must have an existing pod security policy configured before you can use this option.

## Config File

Instead of using the Rancher UI to choose Kubernetes options for the cluster, advanced users can create an RKE config file. Using a config file allows you to set any of the [options available]({{< baseurl >}}/rke/v0.1.x/en/config-options/) in an RKE installation.

- To edit an RKE config file directly from the Rancher UI, click **Edit as YAML**.
- To read from an existing RKE file, click **Read from File**.

For an example of RKE config file syntax, see the [RKE documentation]({{< baseurl >}}/rke/v0.1.x/en/example-yamls/).  