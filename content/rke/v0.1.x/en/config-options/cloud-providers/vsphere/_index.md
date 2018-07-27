---
title: vSphere Cloud Provider
weight: 254
---

The [vSphere Cloud Provider](https://vmware.github.io/vsphere-storage-for-kubernetes/documentation/) interacts with VMware infrastructure (vCenter or standalone ESXi server) to provision and manage storage for persistent volumes in a Kubernetes cluster.

When provisioning Kubernetes using RKE CLI or using [RKE clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) in Rancher, the vSphere Cloud Provider can be enabled by configuring the `cloud_provider` directive in the cluster YAML file.

### Prerequisites

1. You'll need to have credentials of a vCenter/ESXi user account with privileges allowing the cloud provider to interact with the vSphere infrastructure to provision storage. Refer to [this document](https://vmware.github.io/vsphere-storage-for-kubernetes/documentation/vcp-roles.html) to create and assign a role with the required permissions in vCenter.
2. VMware Tools must be running in the Guest OS for all nodes in the cluster.
3. All nodes must be configured with disk UUIDs. This is required so that attached VMDKs present a consistent UUID to the VM, allowing the disk to be mounted properly. See [Enabling Disk UUIDs](#enabling-disk-uuids-for-vsphere-vms).

## Clusters provisioned with RKE CLI

To enable the vSphere Cloud Provider in the cluster, you must add the top-level `cloud_provider` directive to the cluster configuration file, set the `name` property to `vsphere` and add the `vsphereCloudProvider` directive containing the configuration matching your infrastructure. See the [configuration reference](#configuration-reference) for the gory details.

## Clusters provisioned with Rancher

When provisioning clusters in Rancher using the [vSphere node driver]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/vsphere/) or on pre-created [custom nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/) the cluster YAML file must be modified in order to enable the cloud provider.

1. Log in to the Rancher UI as admin user.
2. Navigate to **Clusters** in the **Global** view.
3. Click **Add Cluster** and select the **vSphere** infrastructure provider.
4. Assign a **Cluster Name**.
5. Assign **Member Roles** as required.
6. Expand **Cluster Options** and configure as required.
7. Set **Cloud Provider** option to `Custom`.
    
    ![vsphere-node-driver-cloudprovider]({{< baseurl >}}/img/rancher/vsphere-node-driver-cloudprovider.png)

8. Click on **Edit as YAML**
9. Insert the following top-level structure to the pre-populated cluster YAML. Note that the `name` *must* be set to `vsphere`. Refer to the [configuration reference](#configuration-reference) to learn about the properties of the `vsphereCloudProvider` directive.

    ```yaml
    cloud_provider:
        name: vsphere
        vsphereCloudProvider:
            [Insert provider configuration]
    ```

10. Configure the **Node Pools** per your requirements while ensuring to use a node template that enables disk UUIDs for the VMs (See [Annex - Enable disk UUIDs for vSphere VMs]).
11. Click on **Create** to start provisioning the VMs and Kubernetes services.

## Configuration Reference

>  **Note:** This documentation reflects the new vSphere Cloud Provider configuration schema introduced in Kubernetes v1.9 which differs from previous versions.

The vSphere configuration options are divided into 5 groups:

* global
* virtual_center
* workspace
* disk
* network

### global

The main purpose of global options is to be able to define a common set of configuration parameters that will be inherited by all vCenters defined under the `virtual_center` directive unless explicitely defined there.

Accordingly, the `global` directive accepts the same configuration options that are available under the `virtual_center` directive. Additionally it accepts a single parameter that can only be specified here:

| global Options  |  Type   | Required  | Description |
|:---------------:|:-------:|:---------:|:-----------------------------------------------------------------------------:|
| insecure-flag   | boolean |           | Set to **true** if the vCenter/ESXi uses a self-signed certificate.           |

___

**Example:**

```yaml
(...)
    global:
      insecure-flag: true
```

### virtual_center

This configuration directive specifies the vCenters that are managing the nodes in the cluster. You must define at least one vCenter/ESXi server. If the nodes span multiple vCenters then all must be defined.

Each vCenter is defined by adding a new entry under the `virtual_center` directive with the vCenter IP or FQDN as the name. All required parameters must be provided for each vCenter unless they are already defined under the `global` directive.

| virtual_center Options |  Type    | Required  | Description |
|:----------------------:|:--------:|:---------:|:-----------------------------------------------------------------------------:|
| user                   | string	  |   *       | vCenter/ESXi user used to authenticate with this server. |
| password               | string	  |   *       | User's password. |
| port                   | string	  |           | Port to use to connect to this server. Defaults to 443.  |
| datacenters            | string	  |   *       | Comma-separated list of all datacenters in which cluster nodes are running in.|
| soap-roundtrip-count   | uint     |           | Round tripper count for API requests to the vCenter (num retries = value - 1).|


> The following additional options (introduced in Kubernetes v1.11) are not yet supported in RKE.

| virtual_center Options |  Type    | Required  | Description |
|:----------------------:|:--------:|:---------:|:-----------------------------------------------------------------------------:|
| secret-name            | string   |           | Name of secret resource containing credential key/value pairs. Can be specified in lieu of user/password parameters.|
| secret-namespace       | string   |           | Namespace in which the secret resource was created in. |
| ca-file                | string   |           | Path to CA cert file used to verify the vCenter certificate. |

___

**Example:**

```yaml
(...)
    virtual_center:
      172.158.111.1: {}  # This vCenter inherits all it's properties from global options
      172.158.110.2:     # All required options are set explicitly
        user: vc-user
        password: othersecret
        datacenters: eu-west-2
```

### workspace

This configuration group specifies how storage for volumes is created in vSphere.
The following configuration options are available:

| workspace Options      |  Type    | Required  | Description |
|:----------------------:|:--------:|:---------:|:-----------------------------------------------------------------------------:|
| server                 | string   |   *       | IP or FQDN of the vCenter/ESXi that should be used for creating the volumes. Must match one of the vCenters defined under the `virtual_center` directive.|
| datacenter             | string   |   *       | Name of the datacenter that should be used for creating volumes. For ESXi enter *ha-datacenter*.|
| folder                 | string   |   *       | Path of folder in which to create dummy VMs used for volume provisioning (relative from the root of the datastore).|
| default-datastore      | string   |           | Name of datastore used for volumes if neither datastore or storage policy are specified in the volume options of a PVC.|
| resourcepool-path      | string   |           | Path of the vSphere resource pool that should be used to create dummy VMs. Applies only to policy-based provisioning of vSphere volumes. See [Storage policy based provisioning](https://vmware.github.io/vsphere-storage-for-kubernetes/documentation/policy-based-mgmt.html).|

___

**Example:**

```yaml
(...)
    workspace:
      server: 172.158.111.1 # matches IP of vCenter defined in the virtual_center block
      datacenter: eu-west-1
      folder: k8s-dummy
      default-datastore: ds-1
```

### disk

The following configuration options are available under the disk directive:

| disk Options         |  Type    | Required  | Description |
|:--------------------:|:--------:|:---------:|:-----------------------------------------------------------------------------:|
| scsicontrollertype   | string   |           | SCSI controller type to use when attaching block storage to VMs. Must be one of: *lsilogic-sas* or *pvscsi*. Default: *pvscsi*.|

___

### network 

The following configuration options are available under the network directive:

| network Options     |  Type    | Required  | Description |
|:-------------------:|:--------:|:---------:|:-----------------------------------------------------------------------------:|
| public-network      | string   |           | Name of public **VM Network** to which the VMs in the cluster are connected. Used to determine public IP addresses of VMs.|


##  Configuration Example

Given the following:

- VMs in the cluster are running in the same datacenter `eu-west-1` managed by the vCenter `vc.example.com`.
- The vCenter has a user `provisioner` with password `secret` with the required roles assigned, see [Prerequisites](#prerequisites).
- The vCenter has a datastore named `ds-1` which should be used to store the VMDKs for volumes.
- A `k8s-dummy` folder exists in the root of the datastore.

The corresponding configuration for the provider would then be as follows:

```yaml
(...)
cloud_provider:
  name: vsphere
  vsphereCloudProvider:
    virtual_center:
      vc.example.com:
        user: provisioner
        password: secret
        datacenters: eu-west-1
    workspace:
      server: vc.example.com
      folder: k8s-dummy
      default-datastore: ds-1
      datacenter: eu-west-1
    
```

## Annex

### Enabling disk UUIDs for vSphere VMs

Depending on whether you are provisioning the VMs using the [vSphere node driver]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/vsphere) in Rancher or using your own scripts or third-party tools, there are different methods available to enable disk UUIDs for VMs.

#### Using the Vsphere Console

The required property can be set while creating or modifying VMs in the vSphere Console:

1. For each VM navigate to the tab **VM Options** and click on **Edit Configuration**.
2. Add the parameter `disk.EnableUUID` with a value of **TRUE**.

    ![vsphere-advanced-parameters]({{< baseurl >}}/img/rke/vsphere-advanced-parameters.png)

#### Using the GOVC CLI tool

You can also modify properties of VMs with the [govc](https://github.com/vmware/govmomi/tree/master/govc) command-line tool to enable disk UUIDs:

```sh
$ govc vm.change -vm <vm-path> -e disk.enableUUID=TRUE
```

#### Using Rancher node template

When creating new clusters in Rancher using vSphere node templates, you can configure the template to automatically enable disk UUIDs for all VMs created for a cluster:

1. Navigate to the **Node Templates** in the Rancher UI while logged in as admin user.

2. Add or edit an existing vSphere node template.

3. Under **Instance Options** click on **Add Parameter**.

4. Enter `disk.enableUUID` as key with a value of **TRUE**.

    ![vsphere-nodedriver-enable-uuid]({{< baseurl >}}/img/rke/vsphere-nodedriver-enable-uuid.png)

5. Click **Create** or **Save**.

### Troubleshooting

If you are experiencing issues while provisioning a cluster with enabled vSphere Cloud Provider or while creating vSphere volumes for your workloads, you should inspect the logs of the following K8s services:

- controller-manager (Manages volumes in vCenter)
- kubelet: (Mounts vSphere volumes to pods)

If your cluster is not configured with external [Cluster Logging]({{< baseurl >}}/rancher/v2.x/en/tools/logging/), you will need to SSH into nodes to get the logs of the `kube-controller-manager` (running on one of the control plane nodes) and the `kubelet` (pertaining to the node where the stateful pod has been scheduled).

The easiest way to create a SSH session with a node is the Rancher CLI tool.

1. [Configure the Rancher CLI]({{< baseurl >}}/rancher/v2.x/en/cli/) for your cluster.
2. Run the following command to get a shell to the corresponding nodes:

    ```sh
$ rancher ssh <nodeName>
    ```

3. Inspect the logs of the controller-manager and kubelet containers looking for errors related to the vSphere cloud provider:
    
    ```sh
    $ docker logs --since 15m kube-controller-manager
    $ docker logs --since 15m kubelet
    ```


### Related Links

- [vSphere Storage for Kubernetes](https://vmware.github.io/vsphere-storage-for-kubernetes/documentation/)
- [Kubernetes Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
