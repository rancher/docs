---
title: How to Configure In-tree vSphere Cloud Provider
shortTitle: In-tree Cloud Provider
weight: 10
---

To set up the in-tree vSphere cloud provider, follow these steps while creating the vSphere cluster in Rancher:

1. Set **Cloud Provider** option to `Custom` or `Custom (In-Tree)`.

    {{< img "/img/rancher/vsphere-node-driver-cloudprovider.png" "vsphere-node-driver-cloudprovider">}}

1. Click on **Edit as YAML**
1. Insert the following structure to the pre-populated cluster YAML. This structure must be placed under `rancher_kubernetes_engine_config`. Note that the `name` *must* be set to `vsphere`. 

    ```yaml
    rancher_kubernetes_engine_config:
      cloud_provider:
          name: vsphere
          vsphereCloudProvider:
              [Insert provider configuration]
    ```

Rancher uses RKE (the Rancher Kubernetes Engine) to provision Kubernetes clusters. Refer to the [vSphere configuration reference in the RKE documentation]({{<baseurl>}}/rke/latest/en/config-options/cloud-providers/vsphere/config-reference/) for details about the properties of the `vsphereCloudProvider` directive.
