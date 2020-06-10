---
title: "Private Registry Configuration"
weight: 55
---
_Available as of v1.0.0_

With containerd, `docker.io` is the default image registry.  To pull private images on a node, containerd can be configured to connect to private registries.

In this section, you'll learn:

- How to modify the `registries.yaml` file so that K3s can pull images from your private registry
- How to populate the registry with the required images for K3s

For more information about configuring containerd to pull private images, refer to the official [containerd documentation.](https://github.com/containerd/cri/blob/master/docs/registry.md)

For information how to install K3s in such a way that it uses images from the private registry, refer to the [section about installing K3s in an air gapped environment.](../../install-options/airgap)

> In order for the registry changes to take effect, you need to restart K3s on each node.

- [Prerequisites](#prerequisites)
- [Registries Configuration File](#registries-configuration-file)
  - [Mirrors](#mirrors)
  - [Configs (TLS and Credentials)](#configs-tls-and-credentials)
- [Examples](#examples)
  - [With TLS and Authentication](#with-tls-and-authentication)
  - [With TLS and without Authentication](#with-tls-and-without-authentication)
  - [Without TLS and with Authentication](#without-tls-and-with-authentication)
  - [Without TLS and without Authentication](#without-tls-and-without-authentication)
- [Adding Images to the Private Registry](#adding-images-to-the-private-registry)
- [Containerd Configuration Template](#containerd-configuration-template)

# Prerequisites

Upon startup, K3s will check to see if a `registries.yaml` file exists at `/etc/rancher/k3s/`.

Containerd will be instructed to use any registries defined in the file. If you wish to use a private registry, then you will need to create this file as root on each node that will be using the registry.

Note that server nodes are schedulable by default. If you have not tainted the server nodes and will be running workloads on them, please ensure you also create the `registries.yaml` file on each server as well.

# Registries Configuration File

The `registries.yaml` file consists of two main sections:

- mirrors
- configs

### Mirrors

Mirrors is a directive that defines the names and endpoints of the private registries. The following example shows two mirrors:

```
mirrors:
  docker.io:
    endpoint:
      - "https://mycustomreg.com:5000"
  <YOUR_PRIVATE_REGISTRY_IP>:<PORT>:
    endpoint:
      - "<YOUR_PRIVATE_REGISTRY_IP>:<PORT>"
```

Each mirror must have a name and set of endpoints. When pulling an image from a registry, containerd will try these endpoint URLs one by one, and use the first working one.

### Configs (TLS and Credentials)

The configs section defines the TLS and credential configuration for each mirror. For each mirror you can define `auth` and/or `tls`.

The TLS part consists of:

Directive | Description
----------|------------
`cert_file` | The client certificate path that will be used to authenticate with the registry
`key_file` | The client key path that will be used to authenticate with the registry
`ca_file` | Defines the CA certificate path to be used to verify the registry's server cert file

For one-way SSL, provide the `ca_file` only.

For mutual SSL, provide the `ca_file`, `cert_file` and `key_file`.

The credentials consist of either username/password or authentication token:

- username: user name of the private registry basic auth
- password: user password of the private registry basic auth
- auth: authentication token of the private registry basic auth

# Examples

Below are basic examples of using private registries in different modes.

### With TLS and Authentication

The below configuration can be used in the `/etc/rancher/k3s/registries.yaml` file on each node when using TLS with authentication.

```
mirrors:
  docker.io:
    endpoint:
      - "https://mycustomreg.com:5000"
configs:
  "mycustomreg:5000":
    auth:
      username: xxxxxx # this is the registry username
      password: xxxxxx # this is the registry password
    tls:
      cert_file: # path to the cert file used in the registry
      key_file:  # path to the key file used in the registry
      ca_file:   # path to the ca file used in the registry
```

### With TLS and without Authentication

The below configuration can be used in the `/etc/rancher/k3s/registries.yaml` file on each node when using TLS without authentication.

```
mirrors:
  docker.io:
    endpoint:
      - "https://mycustomreg.com:5000"
configs:
  "mycustomreg:5000":
    tls:
      cert_file: # path to the cert file used in the registry
      key_file:  # path to the key file used in the registry
      ca_file:   # path to the ca file used in the registry
```

### Without TLS and with Authentication

The below configuration can be used in the `/etc/rancher/k3s/registries.yaml` file on each node when using authentication without TLS.

> For communication without TLS, you need to specify `http://` for the endpoints, otherwise it will default to https.

```
mirrors:
  docker.io:
    endpoint:
      - "http://mycustomreg.com:5000"
configs:
  "mycustomreg:5000":
    auth:
      username: xxxxxx # this is the registry username
      password: xxxxxx # this is the registry password
```

### Without TLS and without Authentication

The below configuration can be used in the `/etc/rancher/k3s/registries.yaml` file on each node without using TLS or authentication.

> For communication without TLS, you need to specify `http://` for the endpoints, otherwise it will default to https.

```
mirrors:
  "mycustomreg.com:5000":
    endpoint:
      - "http://mycustomreg.com:5000"
```

# Adding Images to the Private Registry

1. Go to the [K3s release notes](https://github.com/rancher/k3s/releases/) and download the  `k3s-images.txt` file for your K3s release.
1. Pull the K3s images listed on the k3s-images.txt file from docker.io. 

    Example: 
    
    ```
    docker pull docker.io/rancher/coredns-coredns:1.6.3
    ```
1. Retag the images to the private registry.

    Example:
    
    ```
    docker tag coredns-coredns:1.6.3 mycustomreg:5000/coredns-coredns
    ```
1. Last, push the images to the private registry.

    Example: 
    
    ```
    docker push mycustomreg:5000/coredns-coredns
    ```

# Containerd Configuration Template

The following `config.toml.tmpl` template can be placed into `/var/lib/rancher/k3s/agent/etc/containerd`:

```
[plugins.opt]
  path = "{{ .NodeConfig.Containerd.Opt }}"
[plugins.cri]
  stream_server_address = "127.0.0.1"
  stream_server_port = "10010"
  enable_selinux = {{ .SELinuxEnabled }}
{{- if .IsRunningInUserNS }}
  disable_cgroup = true
  disable_apparmor = true
  restrict_oom_score_adj = true
{{end}}
{{- if .NodeConfig.AgentConfig.PauseImage }}
  sandbox_image = "{{ .NodeConfig.AgentConfig.PauseImage }}"
{{end}}
{{- if not .NodeConfig.NoFlannel }}
[plugins.cri.cni]
  bin_dir = "{{ .NodeConfig.AgentConfig.CNIBinDir }}"
  conf_dir = "{{ .NodeConfig.AgentConfig.CNIConfDir }}"
{{end}}
[plugins.cri.containerd.runtimes.runc]
  runtime_type = "io.containerd.runc.v2"
{{ if .PrivateRegistryConfig }}
{{ if .PrivateRegistryConfig.Mirrors }}
[plugins.cri.registry.mirrors]{{end}}
{{range $k, $v := .PrivateRegistryConfig.Mirrors }}
[plugins.cri.registry.mirrors."{{$k}}"]
  endpoint = [{{range $i, $j := $v.Endpoints}}{{if $i}}, {{end}}{{printf "%q" .}}{{end}}]
{{end}}
{{range $k, $v := .PrivateRegistryConfig.Configs }}
{{ if $v.Auth }}
[plugins.cri.registry.configs."{{$k}}".auth]
  {{ if $v.Auth.Username }}username = {{ printf "%q" $v.Auth.Username }}{{end}}
  {{ if $v.Auth.Password }}password = {{ printf "%q" $v.Auth.Password }}{{end}}
  {{ if $v.Auth.Auth }}auth = {{ printf "%q" $v.Auth.Auth }}{{end}}
  {{ if $v.Auth.IdentityToken }}identitytoken = {{ printf "%q" $v.Auth.IdentityToken }}{{end}}
{{end}}
{{ if $v.TLS }}
[plugins.cri.registry.configs."{{$k}}".tls]
  {{ if $v.TLS.CAFile }}ca_file = "{{ $v.TLS.CAFile }}"{{end}}
  {{ if $v.TLS.CertFile }}cert_file = "{{ $v.TLS.CertFile }}"{{end}}
  {{ if $v.TLS.KeyFile }}key_file = "{{ $v.TLS.KeyFile }}"{{end}}
{{end}}
{{end}}
{{end}}
```