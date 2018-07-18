---
title: Cluster Options
weight: 2250
---

As you configure a new cluster that's provisioned using RKE, you can can choose custom Kubernetes (K8s) options.

You can configure K8s options one of two ways:

- [Rancher UI](#rancher-ui): Use the Rancher UI to select options that are commonly customized when setting up a K8s cluster.
- [Config File](#config-file): Alternatively, you can create a RKE config file to customize any option offered by K8s.

## Rancher UI

When creating a cluster using one of the options described in [Rancher Launched Kubenernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters), you can configure basic K8s options using the **Cluster Options** section.

From this section allows you choose:

- The version of Kubernetes installed on your cluster nodes. Rancher uses its own version of Kubernetes based on [hyperkube](https://hub.docker.com/r/kubernetesonarm/hyperkube/), but packaged with more utilities.

- Whether your nodes allow installation of an unsupported version of Docker (i.e., a version not listed in the Rancher requirements).

- The <a href='https://kubernetes.io/docs/concepts/cluster-administration/networking/' target='_blank'>Network Provider</a> that the cluster uses. Out of the box, Rancher supports:
    
    - <a href='https://github.com/coreos/flannel#flannel' target='_blank'>Flannel</a>
    
    - <a href='https://docs.projectcalico.org/v3.1/introduction/' target='_blank'>Calico</a>
    
    - <a href='https://github.com/projectcalico/canal' target='_blank'>Canal</a> (default)
    
- Whether or not to use a <a href='{{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers'>cloud provider</a>.

- Whether or not to use a <a href='{{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies'>pod security policy</a>. You must have an existing pod security policy configured before you can use this option.

## Config File

Instead of using the Rancher UI to choose K8s options for the cluster, advanced users can create an RKE config file. Using a config file allows you to set any of the <a href='/rke/v0.1.x/en/config-options/' >options available</a> in an RKE installation.

- To edit an RKE config file directly from the Rancher UI, click **Edit as YAML**.
- To read from an existing RKE file, click **Read from File**.

For an example of RKE config file syntax, see the <a href='{{< baseurl >}}/rke/v0.1.x/en/example-yamls/'>RKE documentation</a>.  