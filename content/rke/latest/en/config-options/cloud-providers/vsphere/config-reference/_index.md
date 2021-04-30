---
title: vSphere Configuration Reference
weight: 3
---

This section shows an example of how to configure the vSphere cloud provider.

The vSphere cloud provider must be enabled to allow dynamic provisioning of volumes.

For more details on deploying a Kubernetes cluster on vSphere, refer to the [official cloud provider documentation.](https://cloud-provider-vsphere.sigs.k8s.io/tutorials/kubernetes-on-vsphere-with-kubeadm.html)

>  **Note:** This documentation reflects the new vSphere Cloud Provider configuration schema introduced in Kubernetes v1.9 which differs from previous versions.

# vSphere Configuration Example

Given the following:

- VMs in the cluster are running in the same datacenter `eu-west-1` managed by the vCenter `vc.example.com`.
- The vCenter has a user `provisioner` with password `secret` with the required roles assigned, see [Prerequisites](#prerequisites).
- The vCenter has a datastore named `ds-1` which should be used to store the VMDKs for volumes.
- A `vm/kubernetes` folder exists in vCenter.

The corresponding configuration for the provider would then be as follows:

```yaml
rancher_kubernetes_engine_config:
  (...)
  cloud_provider:
    name: vsphere
    vsphereCloudProvider:
      virtual_center:
        vc.example.com:
          user: provisioner
          password: secret
          port: 443
          datacenters: /eu-west-1
      workspace:
        server: vc.example.com
        folder: myvmfolder
        default-datastore: ds-1
        datacenter: /eu-west-1
        resourcepool-path: /eu-west-1/host/hn1/resources/myresourcepool

```
# Configuration Options

The vSphere configuration options are divided into 5 groups:

* [global](#global)
* [virtual_center](#virtual_center)
* [workspace](#workspace)
* [disk](#disk)
* [network](#network)

### global

The main purpose of global options is to be able to define a common set of configuration parameters that will be inherited by all vCenters defined under the `virtual_center` directive unless explicitly defined there.

Accordingly, the `global` directive accepts the same configuration options that are available under the `virtual_center` directive. Additionally it accepts a single parameter that can only be specified here:

| global Options  |  Type   | Required  | Description |
|:---------------:|:-------:|:---------:|:---------|
| insecure-flag   | boolean |           | Set to **true** if the vCenter/ESXi uses a self-signed certificate.           |

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
|:----------------------:|:--------:|:---------:|:-----------|
| user                   | string	  |   *       | vCenter/ESXi user used to authenticate with this server. |
| password               | string	  |   *       | User's password. |
| port                   | string	  |           | Port to use to connect to this server. Defaults to 443.  |
| datacenters            | string	  |   *       | Comma-separated list of all datacenters in which cluster nodes are running in. |
| soap-roundtrip-count   | uint     |           | Round tripper count for API requests to the vCenter (num retries = value - 1). |

> The following additional options (introduced in Kubernetes v1.11) are not yet supported in RKE.

| virtual_center Options |  Type    | Required  | Description |
|:----------------------:|:--------:|:---------:|:-------|
| secret-name            | string   |           | Name of secret resource containing credential key/value pairs. Can be specified in lieu of user/password parameters.|
| secret-namespace       | string   |           | Namespace in which the secret resource was created in. |
| ca-file                | string   |           | Path to CA cert file used to verify the vCenter certificate. |

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
|:----------------------:|:--------:|:---------:|:---------|
| server                 | string   |   *       | IP or FQDN of the vCenter/ESXi that should be used for creating the volumes. Must match one of the vCenters defined under the `virtual_center` directive.|
| datacenter             | string   |   *       | Name of the datacenter that should be used for creating volumes. For ESXi enter *ha-datacenter*.|
| folder                 | string   |   *       | Path of folder in which to create dummy VMs used for volume provisioning (relative from the root folder in vCenter), e.g. "vm/kubernetes".|
| default-datastore      | string   |           | Name of default datastore to place VMDKs if neither datastore or storage policy are specified in the volume options of a PVC. If datastore is located in a storage folder or is a member of a datastore cluster, specify the full path. |
| resourcepool-path      | string   |           | Absolute or relative path to the resource pool where the dummy VMs for [Storage policy based provisioning](https://vmware.github.io/vsphere-storage-for-kubernetes/documentation/policy-based-mgmt.html) should be created. If a relative path is specified, it is resolved with respect to the datacenter's *host* folder. Examples: `/<dataCenter>/host/<hostOrClusterName>/Resources/<poolName>`, `Resources/<poolName>`. For standalone ESXi specify `Resources`. |

**Example:**

```yaml
(...)
    workspace:
      server: 172.158.111.1 # matches IP of vCenter defined in the virtual_center block
      datacenter: eu-west-1
      folder: vm/kubernetes
      default-datastore: ds-1
```

### disk

The following configuration options are available under the disk directive:

| disk Options         |  Type    | Required  | Description |
|:--------------------:|:--------:|:---------:|:----------------|
| scsicontrollertype   | string   |           | SCSI controller type to use when attaching block storage to VMs. Must be one of: *lsilogic-sas* or *pvscsi*. Default: *pvscsi*. |

### network

The following configuration options are available under the network directive:

| network Options     |  Type    | Required  | Description |
|:-------------------:|:--------:|:---------:|:-----------------------------------------------------------------------------|
| public-network      | string   |           | Name of public **VM Network** to which the VMs in the cluster are connected. Used to determine public IP addresses of VMs.|
