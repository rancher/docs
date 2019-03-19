---
title: Rotate Certificates for RKE clusters
shortTitle: Certificate Rotation
weight: 2225
---


## Certificate Rotation

As of v2.2, you can rotate certificates for RKE clusters in Rancher. You can chose to:

- Rotate Certificate for all cluster components.
- Rotate Certificates for a specific component.
- Rotate CA certificates.

To rotate certificates for your cluster, open the **Global** view, make sure the **Clusters** tab is selected, and then select **Ellipsis (...) > Rotate Certificates** for the cluster that you want to rotate certificate.

### Certificate rotation for all cluster components

Certificates can be rotated for the following kubernetes cluster components:

- etcd
- kubelet
- kube-apiserver
- kube-proxy
- kube-scheduler
- kube-controller-manager

Select **Rotate all Service certificates (keep the same CA)** to rotate all the certificates above.

### Certificate rotation for a specific component

To rotate an individual service certificate, select **Rotate an individual service** and chose one of the components from the drop down menu. It will result in rotating certificate for only this component.


### Certificate rotation for CA

To rotate Kubernetes CA certificate, select **Rotate the CA and all Service certificates** option. Note that rotating this certificate will trigger rotating all components' certificates as they need to be signed with the new rotated CA.
