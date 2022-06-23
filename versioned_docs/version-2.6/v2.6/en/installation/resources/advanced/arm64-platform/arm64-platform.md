---
title: "Running on ARM64 (Experimental)"
weight: 3
---

> **Important:**
>
> Running on an ARM64 platform is currently an experimental feature and is not yet officially supported in Rancher. Therefore, we do not recommend using ARM64 based nodes in a production environment.

The following options are available when using an ARM64 platform:

- Running Rancher on ARM64 based node(s)
  - Only for Docker Install. Please note that the following installation command replaces the examples found in the [Docker Install]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker) link:

  ```
  # In the last line `rancher/rancher:vX.Y.Z`, be certain to replace "X.Y.Z" with a released version in which ARM64 builds exist. For  example, if your matching version is v2.5.8, you would fill in this line with `rancher/rancher:v2.5.8`. 
  docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    --privileged \
    rancher/rancher:vX.Y.Z  
  ``` 
> **Note:** To check if your specific released version is compatible with the ARM64 architecture, you may navigate to your  
> version's release notes in the following two ways:
>
> - Manually find your version using https://github.com/rancher/rancher/releases.
> - Go directly to your version using the tag and the specific version number. If you plan to use v2.5.8, for example, you may 
>   navigate to https://github.com/rancher/rancher/releases/tag/v2.5.8. 

- Create custom cluster and adding ARM64 based node(s)
  - Kubernetes cluster version must be 1.12 or higher
  - CNI Network Provider must be [Flannel]({{<baseurl>}}/rancher/v2.6/en/faq/networking/cni-providers/#flannel)
- Importing clusters that contain ARM64 based nodes
  - Kubernetes cluster version must be 1.12 or higher

Please see [Cluster Options]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/options/) how to configure the cluster options.

The following features are not tested:

- Monitoring, alerts, notifiers, pipelines and logging
- Launching apps from the catalog
