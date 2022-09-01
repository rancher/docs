---
title: Behavior Differences Between RKE1 and RKE2
weight: 2450
---

RKE2, also known as RKE Government, is a Kubernetes distribution that focuses on security and compliance for U.S. Federal Government entities. It is considered the next iteration of the Rancher Kubernetes Engine, now known as RKE1.

RKE1 and RKE2 have several slight behavioral differences to note, and this page will highlight some of these at a high level.

### Control Plane Components

RKE1 uses Docker for deploying and managing control plane components, and it also uses Docker as the container runtime for Kubernetes. By contrast, RKE2 launches control plane components as static pods that are managed by the kubelet. RKE2's container runtime is containerd, which allows things such as container registry mirroring (RKE1 with Docker does not).

### Cluster API

RKE2/K3s provisioning is built on top of the Cluster API (CAPI) upstream framework which often makes RKE2-provisioned clusters behave differently than RKE1-provisioned clusters. 

When you make changes to your cluster configuration in RKE2, this **may** result in nodes reprovisioning. This is controlled by CAPI controllers and not by Rancher itself. Note that for etcd nodes, the same behavior does not apply.

The following are some specific example configuration changes that may cause the described behavior:

- When editing the cluster and enabling `drain before delete`, the existing control plane nodes and worker are deleted and new nodes are created.

- When nodes are being provisioned and a scale down operation is performed, rather than scaling down the desired number of nodes, it is possible that the currently provisioning nodes get deleted and new nodes are provisioned to reach the desired node count. Please note that this is a bug in Cluster API, and it will be fixed in an upcoming release. Once fixed, Rancher will update the documentation.

Users who are used to RKE1 provisioning should take note of this new RKE2 behavior which may be unexpected.

### Terminology

You will notice that some terms have changed or gone away going from RKE1 to RKE2. For example, in RKE1 provisioning, you use **node templates**; in RKE2 provisioning, you can configure your cluster node pools when creating or editing the cluster. Another example is that the term **node pool** in RKE1 is now known as **machine pool** in RKE2.




