---
title: Cloud Providers
weight: 3000
draft: true
---

RKE supports the ability to set your specific [cloud provider](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/) for your Kubernetes cluster. There are specific cloud configurations  for these cloud providers:

* [AWS](#aws)
* [Azure](#azure)
* [OpenStack](#openstack)
* [vSphere](#vsphere)

Outside of this list, RKE also supports the ability to handle any [custom cloud provider](#custom-cloud-provider).

The `cloud_provider` directive must be filled out with minimally a name. For each cloud provider, there are different configuration options to enable the cloud provider in Kubernetes.

### AWS

To enable the AWS cloud provider, there are no configuration options. You only need to set the name as `aws`. In order to use the AWS cloud provider, all cluster nodes must have already been configured with an appropriate IAM role.

```yaml
cloud_provider:
  name: aws
```

#### IAM Requirements

The nodes used in RKE that will be running the AWS cloud provider must have at least the following IAM policy.

```json
{
  "Effect": "Allow",
  "Action": "ec2:Describe*",
  "Resource": "*"
}
```

In order to use Elastic Load Balancers (ELBs) and EBS with Kubernetes, the node(s) will need to have the an IAM role with appropriate access.

##### Example Policy for IAM Role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ec2:Describe*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "ec2:AttachVolume",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "ec2:DetachVolume",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["elasticloadbalancing:*"],
      "Resource": ["*"]
    }
  ]
}
```

### Azure

To enable the Azure cloud provider, besides setting the name as `azure`, there are specific configuration options that must be set. Additionally, the Azure node name must also match the Kubernetes node name.

```yaml
cloud_provider:
  name: azure
  azureCloudProvider:
    aadClientId: xxxxxxxxx
    aadClientSecret: xxxxxxxxx
    location: xxxxxxxxx
    resourceGroup: xxxxxxxxx
    subnetName: xxxxxxxxx
    subscriptionId: xxxxxxxxx
    vnetName: xxxxxxxxx
    tenantId: xxxxxxxxx
    securityGroupName: xxxxxxxxx
```

#### Overriding the hostname

Since the Azure node name must match the Kubernetes node name, you override the Kubernetes name on the node by setting the `hostname_override` for each node. If you do not set the `hostname_override`, the Kubernetes node name will be set as the `address`, which will cause the Azure cloud provider to fail.

```yaml
nodes:
  - address: x.x.x.x
    hostname_override: azure-rke1
    user: ubuntu
    role:
    - controlplane
    - etcd
    - worker
```

#### Azure Configuration Options

Besides the minimum set of options, there are many other options that are supported in RKE:

|   Azure Configuration Options |  Type  	| Required  |
|:----------------------------:	|:------:	|:---------:|
|           tenantId           	| string 	|   *    |
|        subscriptionId        	| string 	|   *    |
|          aadClientId         	| string 	|   *    |
|        aadClientSecret       	| string 	|   *    |
|             cloud            	| string 	|      |
|         resourceGroup        	| string 	|      |
|           location           	| string 	|      |
|           vnetName           	| string 	|      |
|       vnetResourceGroup      	| string 	|      |
|          subnetName          	| string 	|      |
|       securityGroupName      	| string 	|      |
|        routeTableName        	| string 	|      |
|  primaryAvailabilitySetName  	| string 	|      |
|            vmType            	| string 	|      |
|      primaryScaleSetName     	| string 	|      |
|       aadClientCertPath      	| string 	|      |
|     aadClientCertPassword    	| string 	|      |
|     cloudProviderBackoff     	|  bool  	|      |
|  cloudProviderBackoffRetries 	|   int  	|      |
| cloudProviderBackoffExponent 	|   int  	|      |
| cloudProviderBackoffDuration 	|   int  	|      |
|  cloudProviderBackoffJitter  	|   int  	|      |
|    cloudProviderRateLimit    	|  bool  	|      |
|   cloudProviderRateLimitQPS  	|   int  	|      |
| cloudProviderRateLimitBucket 	|   int  	|      |
|      useInstanceMetadata     	|  bool  	|      |
|  useManagedIdentityExtension 	|  bool  	|      |
| maximumLoadBalancerRuleCount 	|   int  	|      |

### Openstack

To enable the Openstack cloud provider, besides setting the name as `openstack`, there are specific configuration options that must be set. The Openstack configuration options are grouped into different sections.

```yaml
cloud_provider:
  name: openstack
  openstackCloudProvider:
    global:
      username: xxxxxxxxxxxxxx
      password: xxxxxxxxxxxxxx
      auth-url: https://1.2.3.4/identity/v3
      tenant-id: xxxxxxxxxxxxxx
      domain-id: xxxxxxxxxxxxxx
    load_balancer:
      subnet-id: xxxxxxxxxxxxxx
    block_storage:
      ignore-volume-az: true
    route:
      router-id: xxxxxxxxxxxxxx
    metadata:
      search-order: xxxxxxxxxxxxxx
```

#### Overriding the hostname

The OpenStack cloud provider uses the instance name (as determined from OpenStack metadata) as the name of the Kubernetes Node object, you must override the Kubernetes name on the node by setting the `hostname_override` for each node. If you do not set the `hostname_override`, the Kubernetes node name will be set as the `address`, which will cause the Openstack cloud provider to fail.

#### Openstack Configuration Options

The Openstack configuration options are divided into 5 groups.

* Global
* Load Balancer
* Block Storage
* Route
* Metadata

##### Global

These are the options that are available under the `global` directive.

| OpenStack's Global Configuration Options 	|  Type  	| Required  |
|:--------------------:	|:------:	|:---------:|
|       auth_url       	| string 	|   *   |
|       username       	| string 	|   *   |
|        user-id       	| string 	|   *   |
|       password       	| string 	|   *   |
|       tenant-id      	| string 	|   *   |
|      tenant-name     	| string 	|      |
|       trust-id       	| string 	|      |
|       domain-id      	| string 	|      |
|      domain-name     	| string 	|      |
|        region        	| string 	|      |
|        ca-file       	| string 	|      |

##### Load Balancer

These are the options that are available under the `load_balancer` directive.

|  OpenStack's Load Balancer Configuration Options  	|  Type  	| Required |
|:----------------------:	|:------:	|:---------:|
|       lb-version       	| string 	|      |
|       use-octavia      	|  bool  	|      |
|        subnet-id       	| string 	|      |
|   floating-network-id  	| string 	|      |
|        lb-method       	| string 	|      |
|       lb-provider      	| string 	|      |
| manage-security-groups 	|  bool  	|      |
|     create-monitor     	|  bool  	|      |
|      monitor-delay     	|   int  	|   * if `create-monitor` is true   |
|     monitor-timeout    	|   int  	|   * if `create-monitor` is true    |
|   monitor-max-retries  	|   int  	|   * if `create-monitor` is true   |


##### Block Storage

These are the options that are available under the `block_storage` directive.

| OpenStack's Block Storage Configuration Options 	|  Type  	| Required |
|:--------------------:	|:------:	|:---------:|
|      bs-version      	| string 	|      |
|   trust-device-path  	|  bool  	|      |
|   ignore-volume-az   	|  bool  	|      |

##### Route

This is the option that is available under the `route` directive.

| OpenStack's Route Configuration Option 	|  Type  	| Required |
|:--------------------:	|:------:	|:---------:|
|       router-id      	| string 	|      |

##### Metadata

These are the options that are available under the `metadata` directive.

| OpenStack's Metadata Configuration Options 	|  Type  	| Required |
|:--------------------:	|:------:	|:---------:|
|     search-order     	| string 	|      |
|    request-timeout   	|   int  	|      |

For more information of Openstack configurations options please refer to the official Kubernetes [documentation](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#openstack).

### vSphere

To enable the vSphere cloud provider, besides setting the name as `vsphere`, there are specific configuration options that must be set. The vSphere configuration options are grouped into different sections.

```yaml
cloud_provider:
  name: vsphere
  vsphereCloudProvider:
    global:
      user: user
      password: pass
      server: 1.2.3.4
      port: 22
    virtual_center:
      1.2.3.4:
        user: test
        password: test
        port: test
      5.6.7.8:
        user: test
        password: test
        port: test
    workspace:
      server: test.test.com
      datacenter: test
      folder: test
      default-datastore: test
      resourcepool-path: test
    network:
      public-network: xxxxxxxxxxxxxx
    disk:
      scsicontrollertype: xxxxxxxxxxxxxx
```

#### vSphere Configuration Options

The vSphere configuration options are divided into 5 groups.

* Global
* Virtual Center
* Workspace
* Network
* Disk

##### Global

These are the options that are available under the `global` directive.

| vSphere's Global Configuration Options 	|  Type  	| Required |
|:--------------------:	|:------:	|:---------:|
|       user       	| string 	|      |
|       password       	| string 	|      |
|        server       	| string 	|      |
|       port       	| string 	|      |
|       insecure-flag      	| bool 	|      |
|      datacenter     	| string 	|      |
|       datacenters       	| string 	|      |
|       datastore      	| string 	|      |
|      working-dir    	| string 	|      |
|        soap-roundtrip-count        	| int 	|      |
|        vm-uuid       	| string 	|      |
|vm-name   |string   |      |


##### Virtual Center

These are the options that are available under `virtual_center`, which is a dictionary of vCenters. Each vCenter is defined individually.

```yaml
virtual_center:
  <vcenter1-ip>:
    user: test
    password: test
    port: test
  <vcenter2-ip>:
    user: test
    password: test
    port: test
```

For each `virtual_center`, these are the available configuration options to be used under the each virtual center. The virtual center's are separated from each other based on their IP.

| vSphere's Virtual Center Configuration Options 	|  Type  	| Required |
|:--------------------:	|:------:	|:---------:|
|       user       	| string 	|   * if `global` `user` is not set   |
|       password       	| string 	| * if `global` `password` is not set  |
|       port       	| string 	|      |
|       datacenters       	| string 	|      |
|        soap-roundtrip-count        	| int 	|      |

##### Workspace

These are the options that are available under the `workspace` directive.

| vSphere's Workspace Configuration Options 	|  Type  	| Required |
|:--------------------:	|:------:	|:---------:|
|     server    	| string 	|   *   |
|    datacenter  	|   string  	|   *   |
| folder  | string  |   *   |
| default-datastore | string  |   *   |
|  resourcepool-path | string  |   *   |

##### Network

This is the option that is available under the `network` directive.

| vSphere's Network Configuration Option	|  Type  	| Required |
|:--------------------:	|:------:	|:---------:|
|      public-network     	| string 	|      |

##### Disk

This is the option that is available under the `disk` directive.

| vSphere's Disk Configuration Option 	|  Type  	| Required |
|:--------------------:	|:------:	|:---------:|
|       scsicontrollertype      	| string 	|      |

### Custom Cloud Provider

If you want to enable a different cloud provider, RKE allows for custom cloud provider options. A name must be provided and the custom Cloud Provider options can be passed in as a multiline string in `customCloudProvider`.

For example, in order to use the oVirt cloud provider with Kubernetes, here's the following cloud provider information:

```bash
[connection]
uri = https://localhost:8443/ovirt-engine/api
username = admin@internal
password = admin
```

To add this cloud config file to RKE, the `cloud_provider` would be need to be set.

```yaml
cloud_provider:
  name: ovirt
  # Note the pipe as this is what indicates a multiline string
  customCloudProvider: |-
    [connection]
    uri = https://localhost:8443/ovirt-engine/api
    username = admin@internal
    password = admin
```
