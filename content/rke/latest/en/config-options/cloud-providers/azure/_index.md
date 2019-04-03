---
title: Azure Cloud Provider
weight: 252
---

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

## Overriding the hostname

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

## Azure Configuration Options

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
