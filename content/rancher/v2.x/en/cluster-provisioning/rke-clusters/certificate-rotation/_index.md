---
title: Rotate Certificates for RKE clusters
shortTitle: Certificate Rotation
weight: 2225
---


## Certificate Rotation

As of v2.2, you can rotate certificates for any RKE clusters within Rancher, rotating certificates includes:

- Rotate Certificate for all components
- Rotate Certificates for specific component.
- Rotate CA certificates.

To rotate certificates for your cluster, open the **Global** view, make sure the **Clusters** tab is selected, and then select **Ellipsis (...) > Rotate Certificates** for the cluster that you want to rotate certificate.

### Certificate rotation for all components

To rotate certificates for all kubernetes components including:

- Kube-apiserver
- Kube-scheduler
- kube-controller-manager
- etcd nodes
- kube-proxy
- kubelet

Select **Rotate all Service certificates (keep the same CA)** to rotate all certificates mentioned above

### Certificate rotation for specific component

To rotate certificates for only one or more component you can select **Rotate an individual service** and then select one of the components from the drop down menu, this will result in rotating certificate for only this component.


### Certificate rotation for CA

To rotate Kubernetes CA certificate you can select **Rotate the CA and all Service certificates** option, note that rotating this certificate will trigger rotating all components certificates as well to be signed with the new rotated CA.
