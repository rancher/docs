---
title: Additional Steps for Installing Istio on an RKE2 Cluster
weight: 3
aliases:
  - /rancher/v2.5/en/istio/v2.5/configuration-reference/rke2
---

Through the **Cluster Explorer,** when installing or upgrading Istio through **Apps & Marketplace,**

1. Click **Components.**
1. Check the box next to **Enabled CNI.**
1. Add a custom overlay file specifying `cniBinDir` and `cniConfDir`. For more information on these options, refer to the [Istio documentation.](https://istio.io/latest/docs/setup/additional-setup/cni/#helm-chart-parameters) An example is below:

    ```yaml
    apiVersion: install.istio.io/v1alpha1
    kind: IstioOperator
    spec:
      components:
        cni:
          enabled: true
      values:
        cni:
          image: rancher/istio-install-cni:1.7.3
          excludeNamespaces:
            - istio-system
            - kube-system
          logLevel: info
          cniBinDir: /opt/cni/bin
          cniConfDir: /etc/cni/net.d
    ```
1. After installing Istio, you'll notice the cni-node pods in the istio-system namespace in a CrashLoopBackoff error. Manually edit the `istio-cni-node` daemonset to include the following on the `install-cni` container:
    ```yaml
    securityContext:
        privileged: true
    ```

**Result:** Now you should be able to utilize Istio as desired, including sidecar injection and monitoring via Kiali.
