---
title: "Private Registry Configuration"
weight: 55
---
​
Containerd can be configured to connect to private registries and use them to pull private images on the node, private registry configuration feature was added in k3s v1.0.0.
​
Upon startup, K3s will check to see if a `registries.yaml` file exists at `/etc/rancher/k3s/` and instruct containerd to use any registries defined in the file. If you wish to use a private registry, then you will need to create this file as root on each node that will be using the registry.
​
Note that server nodes are scheduleable by default. If you have not tainted the server nodes and will be running workloads on them please ensure you also create the registires.yaml file on each server as well.
​
Configuration in Containerd can be used to connect to private registry with TLS connection and with registries that enable authentication as well, the following section will explain the registries.yaml file and give different examples of using private registry configuration in k3s.
​
### Registries Configuration file

The file consists of two main sections:

- mirrors
- configs

#### Mirrors

Mirrors is a directive that define the names and endpoints of the private registries, for example:

```
mirrors:
  mycustomreg.com:5000
    endpoint:
      - "https://mycustomreg.com:5000"
```

Each mirror must have a name and set of endpoints, when pulling an image from a registry, containerd will try these endpoint URLs one by one, and use the first working one.

### Configs

Configs section define the TLS and credential configuration for each mirror, for each mirror you can define `auth` and/or `tls`, the tls part consists of:

- cert_file: which defines the client certificate path that will be used to authenticate with the registry.
- key_file: which defines the client key path that will be used to authenticate with the registry.
- ca_file: which defines the ca certificate path to be used to verify the registry's server cert file.

The `cred` part consists of either username/password or authentication token:

- username: user name of the private registry basic auth
- password: user password of the private registry basic auth
- auth: authentication token of the private registry basic auth

Below are basic examples of using private registries in different modes:

### With TLS
​
Below are examples showing how you may configure `/etc/rancher/k3s/registires.yaml` on each node when using TLS.
​
{{% tabs %}}
{{% tab "With Authentication" %}}
​
With Auth Content here:
​
```
mirrors:
  mycustomreg.com:5000
    endpoint:
      - "https://mycustomreg.com:5000"
configs:
  mycustomreg:5000
    auth:
      username: xxxxxx # this is the registry username
      password: xxxxxx # this is the registry password
    tls:
      cert_file: # path to the cert file used in the registry
      key_file:  # path to the key file used in the registry
      ca_file:   # path to the ca file used in the registry
```
​
{{% /tab %}}
{{% tab "Without Authentication" %}}
​
Without Auth content:
​
```
mirrors:
  mycustomreg.com:5000
    endpoint:
      - "https://mycustomreg.com:5000"
configs:
  mycustomreg:5000
    tls:
      cert_file: # path to the cert file used in the registry
      key_file:  # path to the key file used in the registry
      ca_file:   # path to the ca file used in the registry
```

{{% /tab %}}
{{% /tabs %}}

### Without TLS
​
Below are examples showing how you may configure `/etc/rancher/k3s/registries.yaml` on each node when _not_ using TLS.
​
{{% tabs %}}
{{% tab "With Authentication" %}}
​
With Auth content:

```
mirrors:
  mycustomreg.com:5000
    endpoint:
      - "http://mycustomreg.com:5000"
configs:
  mycustomreg:5000
    auth:
      username: xxxxxx # this is the registry username
      password: xxxxxx # this is the registry password
```
​
{{% /tab %}}
{{% tab "Without Authentication" %}}
​
Without Auth content:

```
mirrors:
  mycustomreg.com:5000
    endpoint:
      - "http://mycustomreg.com:5000"
```
​
{{% /tab %}}
{{% /tabs %}}
​
Note that in case of no TLS communication, you need to specify `http://` for the endpoints, otherwise it will default to https.
 
In order for containerd to take an effect you need to restart K3s on each node in order to leverage the private registry.
