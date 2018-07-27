---
title: Openstack Cloud Provider
weight: 253
---

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

## Overriding the hostname

The OpenStack cloud provider uses the instance name (as determined from OpenStack metadata) as the name of the Kubernetes Node object, you must override the Kubernetes name on the node by setting the `hostname_override` for each node. If you do not set the `hostname_override`, the Kubernetes node name will be set as the `address`, which will cause the Openstack cloud provider to fail.

## Openstack Configuration Options

The Openstack configuration options are divided into 5 groups.

* Global
* Load Balancer
* Block Storage
* Route
* Metadata

### Global

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

### Load Balancer

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


### Block Storage

These are the options that are available under the `block_storage` directive.

| OpenStack's Block Storage Configuration Options 	|  Type  	| Required |
|:--------------------:	|:------:	|:---------:|
|      bs-version      	| string 	|      |
|   trust-device-path  	|  bool  	|      |
|   ignore-volume-az   	|  bool  	|      |

### Route

This is the option that is available under the `route` directive.

| OpenStack's Route Configuration Option 	|  Type  	| Required |
|:--------------------:	|:------:	|:---------:|
|       router-id      	| string 	|      |

### Metadata

These are the options that are available under the `metadata` directive.

| OpenStack's Metadata Configuration Options 	|  Type  	| Required |
|:--------------------:	|:------:	|:---------:|
|     search-order     	| string 	|      |
|    request-timeout   	|   int  	|      |

For more information of Openstack configurations options please refer to the official Kubernetes [documentation](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#openstack).
