---
title: Cloud Providers
weight: 3000
draft: true
---

RKE supports the following cloud providers to be used with Kubernetes:


| Cloud Providers 	|  YAML  	|
|:--------------------:	|:------:	|
|       AWS       	| awsCloudProvider 	|
|       Azure       	| azureCloudProvider 	|
|       Openstack       	| openstackCloudProvider 	|
|       VSphere      	| vsphereCloudProvider 	|
| Custom   |  customCloudProvider |


Also a custom cloud configuration file can be added to be used with any other cloud provider.

### AWS Cloud Provider

To enable AWS cloud provider, you can set the following in the cluster configuration file:
```
cloud_provider:
  name: aws
```

When using AWS cloud provider, all cluster nodes have to be assigned a proper IAM role.

### Azure Cloud provider

Azure cloud provider can be enabled by passing `azure` as the cloud provider name and set of options to the configuration file:
```
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

You also have to make sure that the Azure node name must match the kubernetes node name, you can do that by changing the value of hostname_override in the config file:
```
nodes:
  - address: x.x.x.x
    hostname_override: azure-rke1
    user: ubuntu
    role:
    - controlplane
    - etcd
    - worker
```

The full cloud configuration for Azure are:

|     Configuration Option     	|  Type  	|
|:----------------------------:	|:------:	|
|             cloud            	| string 	|
|           tenantId           	| string 	|
|        subscriptionId        	| string 	|
|         resourceGroup        	| string 	|
|           location           	| string 	|
|           vnetName           	| string 	|
|       vnetResourceGroup      	| string 	|
|          subnetName          	| string 	|
|       securityGroupName      	| string 	|
|        routeTableName        	| string 	|
|  primaryAvailabilitySetName  	| string 	|
|            vmType            	| string 	|
|      primaryScaleSetName     	| string 	|
|          aadClientId         	| string 	|
|        aadClientSecret       	| string 	|
|       aadClientCertPath      	| string 	|
|     aadClientCertPassword    	| string 	|
|     cloudProviderBackoff     	|  bool  	|
|  cloudProviderBackoffRetries 	|   int  	|
| cloudProviderBackoffExponent 	|   int  	|
| cloudProviderBackoffDuration 	|   int  	|
|  cloudProviderBackoffJitter  	|   int  	|
|    cloudProviderRateLimit    	|  bool  	|
|   cloudProviderRateLimitQPS  	|   int  	|
| cloudProviderRateLimitBucket 	|   int  	|
|      useInstanceMetadata     	|  bool  	|
|  useManagedIdentityExtension 	|  bool  	|
| maximumLoadBalancerRuleCount 	|   int  	|


### Openstack Cloud provider

For Openstack cloud provider user can pass `openstack` to the cloud provider name and add the configuration options for the openstack cloud provider:

```
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
```

Openstack configuration options are divided into 5 sections:

- **global**:

| Configuration Option 	|  Type  	|
|:--------------------:	|:------:	|
|       auth_url       	| string 	|
|       username       	| string 	|
|        user-id       	| string 	|
|       password       	| string 	|
|       tenant-id      	| string 	|
|      tenant-name     	| string 	|
|       trust-id       	| string 	|
|       domain-id      	| string 	|
|      domain-name     	| string 	|
|        region        	| string 	|
|        ca-file       	| string 	|

- **load_balancer**:

|  Configuration Option  	|  Type  	|
|:----------------------:	|:------:	|
|       lb-version       	| string 	|
|       use-octavia      	|  bool  	|
|        subnet-id       	| string 	|
|   floating-network-id  	| string 	|
|        lb-method       	| string 	|
|       lb-provider      	| string 	|
|     create-monitor     	|  bool  	|
|      monitor-delay     	|   int  	|
|     monitor-timeout    	|   int  	|
|   monitor-max-retries  	|   int  	|
| manage-security-groups 	|  bool  	|

- **block_storage**:

| Configuration Option 	|  Type  	|
|:--------------------:	|:------:	|
|      bs-version      	| string 	|
|   trust-device-path  	|  bool  	|
|   ignore-volume-az   	|  bool  	|

- **router**:

| Configuration Option 	|  Type  	|
|:--------------------:	|:------:	|
|       router-id      	| string 	|

- **metadata**:

| Configuration Option 	|  Type  	|
|:--------------------:	|:------:	|
|     search-order     	| string 	|
|    request-timeout   	|   int  	|


### VSphere Cloud Provider

For VSphere cloud provider user can pass `vsphere` to the cloud provider name and add the configuration options for the VSphere cloud provider:
```
cloud_provider:
  name: vsphere
  vsphereCloudProvider:
    global:
      user: user
      password: pass
      server: 1.2.3.4
      port: 22
    workspace:
      server: test.test.com
      datacenter: test
      folder: test
      default-datastore: test
      resourcepool-path: test
    virtual_center:
      1.2.3.4:
        user: test
        password: test
        port: test
      5.6.7.8:
        user: test
        password: test
        port: test
```
VSphere configuration options are divided into 5 sections:

- **global**:

| Configuration Option 	|  Type  	|
|:--------------------:	|:------:	|
|       user       	| string 	|
|       password       	| string 	|
|        server       	| string 	|
|       port       	| string 	|
|       insecure-flag      	| bool 	|
|      datacenter     	| string 	|
|       datacenters       	| string 	|
|       datastore      	| string 	|
|      working-dir    	| string 	|
|        soap-roundtrip-count        	| int 	|
|        vm-uuid       	| string 	|
|vm-name   |string   |

- **virtual_center**:

The virtual center configuration is dictionary of vcenters, it can be defined like that:
```
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
The full configuration options for each vcenter are:

| Configuration Option 	|  Type  	|
|:--------------------:	|:------:	|
|       user       	| string 	|
|       password       	| string 	|
|       port       	| string 	|
|       datacenters       	| string 	|
|        soap-roundtrip-count        	| int 	|

- **network**:

| Configuration Option 	|  Type  	|
|:--------------------:	|:------:	|
|      public-network     	| string 	|

- **disk**:

| Configuration Option 	|  Type  	|
|:--------------------:	|:------:	|
|       scsicontrollertype      	| string 	|

- **workspace**:

| Configuration Option 	|  Type  	|
|:--------------------:	|:------:	|
|     server    	| string 	|
|    datacenter  	|   string  	|
| folder  | string  |
| default-datastore | string  |
|  resourcepool-path | string  |


### Custom Cloud Provider

For any other cloud provider that is not listed above, user can just provide the name of the cloud provider and paste the cloud config file to `customCloudProvider` field, for example to use oVirt cloud provider with kubernetes the user will have to use the following cloud config file:

```
[connection]
uri = https://localhost:8443/ovirt-engine/api
username = admin@internal
password = admin
```

To add this cloud config file to rke, use the following:

```
cloud_provider:
  name: ovirt
  customCloudProvider: |-
    [connection]
    uri = https://localhost:8443/ovirt-engine/api
    username = admin@internal
    password = admin
```
