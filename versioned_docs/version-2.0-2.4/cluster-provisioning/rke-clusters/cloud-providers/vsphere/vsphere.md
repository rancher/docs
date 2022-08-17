---
title: Setting up the vSphere Cloud Provider
weight: 4
---

In this section, you'll learn how to set up the vSphere cloud provider for a Rancher managed RKE Kubernetes cluster in vSphere.

Follow these steps while creating the vSphere cluster in Rancher:

1. Set **Cloud Provider** option to `Custom`.

    {{< img "/img/rancher/vsphere-node-driver-cloudprovider.png" "vsphere-node-driver-cloudprovider">}}

1. Click on **Edit as YAML**
1. Insert the following structure to the pre-populated cluster YAML. As of Rancher v2.3+, this structure must be placed under `rancher_kubernetes_engine_config`. In versions before v2.3, it has to be defined as a top-level field. Note that the `name` *must* be set to `vsphere`. 

    ```yaml
    rancher_kubernetes_engine_config: # Required as of Rancher v2.3+
      cloud_provider:
          name: vsphere
          vsphereCloudProvider:
              [Insert provider configuration]
    ```

Rancher uses RKE (the Rancher Kubernetes Engine) to provision Kubernetes clusters. Refer to the [vSphere configuration reference in the RKE documentation]({{<baseurl>}}/rke/latest/en/config-options/cloud-providers/vsphere/config-reference/) for details about the properties of the `vsphereCloudProvider` directive.