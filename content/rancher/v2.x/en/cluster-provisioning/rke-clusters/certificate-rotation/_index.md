---
title: Rotate Certificates for RKE clusters
shortTitle: Certificate Rotation
weight: 2225
---


## Certificate Rotation

As of v2.2, you can rotate certificates for RKE clusters in Rancher. You can chose to:

- Rotate Certificate for all cluster components
- Rotate Certificates for a specific component.
- Rotate CA certificates.

To rotate certificates for your cluster, open the **Global** view, make sure the **Clusters** tab is selected, and then select **Ellipsis (...) > Rotate Certificates** for the cluster that you want to rotate certificate.

### Certificate rotation for all components

Certificates can be rotated for the following kubernetes cluster components:

- Kube-apiserver
- Kube-scheduler
- kube-controller-manager
- etcd nodes
- kube-proxy
- kubelet

Select **Rotate all Service certificates (keep the same CA)** to rotate all the certificates mentioned above

### Certificate rotation for a specific component

To rotate certificates for one of the components, expand **Rotate an individual service** and select one of the components from the drop down menu. It will result in rotating certificate for only this component.


### Certificate rotation for CA

To rotate Kubernetes CA certificate, select **Rotate the CA and all Service certificates** option. Note that rotating this certificate will trigger rotating all components' certificates as they need to be signed with the new rotated CA.
