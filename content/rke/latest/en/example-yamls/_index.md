---
title: Example Cluster.ymls
weight: 300
aliases:
  - /rke/latest/en/config-options/example-yamls/
---

There are lots of different [configuration options]({{< baseurl >}}/rke/latest/en/config-options/) that can be set in the cluster configuration file for RKE. Here are some examples of files:

> **Note for Rancher 2 users** If you are configuring Cluster Options using a [Config File]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/#config-file) when creating [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/), the names of services should contain underscores only: `kube_api` and `kube_controller`. This only applies to Rancher v2.0.5 and v2.0.6.

## Minimal `cluster.yml` example

```yaml
nodes:
    - address: 1.2.3.4
      user: ubuntu
      role:
        - controlplane
        - etcd
        - worker
```

## Full `cluster.yml` example

```yaml
nodes:
    - address: 1.1.1.1
      user: ubuntu
      role:
        - controlplane
        - etcd
      ssh_key_path: /home/user/.ssh/id_rsa
      port: 2222
    - address: 2.2.2.2
      user: ubuntu
      role:
        - worker
      ssh_key: |-
        -----BEGIN RSA PRIVATE KEY-----

        -----END RSA PRIVATE KEY-----
    - address: example.com
      user: ubuntu
      role:
        - worker
      hostname_override: node3
      internal_address: 192.168.1.6
      labels:
        app: ingress

# If set to true, RKE will not fail when unsupported Docker version
# are found
ignore_docker_version: false

# Cluster level SSH private key
# Used if no ssh information is set for the node
ssh_key_path: ~/.ssh/test

# Enable use of SSH agent to use SSH private keys with passphrase
# This requires the environment `SSH_AUTH_SOCK` configured pointing
#to your SSH agent which has the private key added
ssh_agent_auth: true

# List of registry credentials
# If you are using a Docker Hub registry, you can omit the `url`
# or set it to `docker.io`
private_registries:
    - url: registry.com
      user: Username
      password: password

# Bastion/Jump host configuration
bastion_host:
    address: x.x.x.x
    user: ubuntu
    port: 22
    ssh_key_path: /home/user/.ssh/bastion_rsa
# or
#   ssh_key: |-
#     -----BEGIN RSA PRIVATE KEY-----
#
#     -----END RSA PRIVATE KEY-----

# Set the name of the Kubernetes cluster  
cluster_name: mycluster


# The Kubernetes version used. The default versions of Kubernetes
# are tied to specific versions of the system images.
#
# For RKE v0.2.x and below, the map of Kubernetes versions and their system images is
# located here:
# https://github.com/rancher/types/blob/release/v2.2/apis/management.cattle.io/v3/k8s_defaults.go
#
# For RKE v0.3.0 and above, the map of Kubernetes versions and their system images is
# located here:
# https://github.com/rancher/kontainer-driver-metadata/blob/master/rke/k8s_rke_system_images.go
#
# In case the kubernetes_version and kubernetes image in
# system_images are defined, the system_images configuration
# will take precedence over kubernetes_version.
kubernetes_version: v1.10.3-rancher2

# System Images are defaulted to a tag that is mapped to a specific
# Kubernetes Version and not required in a cluster.yml. 
# Each individual system image can be specified if you want to use a different tag.
#
# For RKE v0.2.x and below, the map of Kubernetes versions and their system images is
# located here:
# https://github.com/rancher/types/blob/release/v2.2/apis/management.cattle.io/v3/k8s_defaults.go
#
# For RKE v0.3.0 and above, the map of Kubernetes versions and their system images is
# located here:
# https://github.com/rancher/kontainer-driver-metadata/blob/master/rke/k8s_rke_system_images.go
#
system_images:
    kubernetes: rancher/hyperkube:v1.10.3-rancher2
    etcd: rancher/coreos-etcd:v3.1.12
    alpine: rancher/rke-tools:v0.1.9
    nginx_proxy: rancher/rke-tools:v0.1.9
    cert_downloader: rancher/rke-tools:v0.1.9
    kubernetes_services_sidecar: rancher/rke-tools:v0.1.9
    kubedns: rancher/k8s-dns-kube-dns-amd64:1.14.8
    dnsmasq: rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.8
    kubedns_sidecar: rancher/k8s-dns-sidecar-amd64:1.14.8
    kubedns_autoscaler: rancher/cluster-proportional-autoscaler-amd64:1.0.0
    pod_infra_container: rancher/pause-amd64:3.1

services:
    etcd:
      # if external etcd is used
      # path: /etcdcluster
      # external_urls:
      #   - https://etcd-example.com:2379
      # ca_cert: |-
      #   -----BEGIN CERTIFICATE-----
      #   xxxxxxxxxx
      #   -----END CERTIFICATE-----
      # cert: |-
      #   -----BEGIN CERTIFICATE-----
      #   xxxxxxxxxx
      #   -----END CERTIFICATE-----
      # key: |-
      #   -----BEGIN PRIVATE KEY-----
      #   xxxxxxxxxx
      #   -----END PRIVATE KEY-----
    # Note for Rancher v2.0.5 and v2.0.6 users: If you are configuring
    # Cluster Options using a Config File when creating Rancher Launched
    # Kubernetes, the names of services should contain underscores
    # only: `kube_api`.
    kube-api:
      # IP range for any services created on Kubernetes
      # This must match the service_cluster_ip_range in kube-controller
      service_cluster_ip_range: 10.43.0.0/16
      # Expose a different port range for NodePort services
      service_node_port_range: 30000-32767    
      pod_security_policy: false
      # Add additional arguments to the kubernetes API server
      # This WILL OVERRIDE any existing defaults
      extra_args:
        # Enable audit log to stdout
        audit-log-path: "-"
        # Increase number of delete workers
        delete-collection-workers: 3
        # Set the level of log output to debug-level
        v: 4
    # Note for Rancher 2 users: If you are configuring Cluster Options
    # using a Config File when creating Rancher Launched Kubernetes,
    # the names of services should contain underscores only:
    # `kube_controller`. This only applies to Rancher v2.0.5 and v2.0.6.
    kube-controller:
      # CIDR pool used to assign IP addresses to pods in the cluster
      cluster_cidr: 10.42.0.0/16
      # IP range for any services created on Kubernetes
      # This must match the service_cluster_ip_range in kube-api
      service_cluster_ip_range: 10.43.0.0/16
    kubelet:
      # Base domain for the cluster
      cluster_domain: cluster.local
      # IP address for the DNS service endpoint
      cluster_dns_server: 10.43.0.10
      # Fail if swap is on
      fail_swap_on: false
      # Set max pods to 250 instead of default 110
      extra_args:
        max-pods: 250
      # Optionally define additional volume binds to a service
      extra_binds:
        - "/usr/libexec/kubernetes/kubelet-plugins:/usr/libexec/kubernetes/kubelet-plugins"

# Currently, only authentication strategy supported is x509.
# You can optionally create additional SANs (hostnames or IPs) to
# add to the API server PKI certificate.
# This is useful if you want to use a load balancer for the
# control plane servers.
authentication:
    strategy: x509
    sans:
      - "10.18.160.10"
      - "my-loadbalancer-1234567890.us-west-2.elb.amazonaws.com"

# Kubernetes Authorization mode
# Use `mode: rbac` to enable RBAC
# Use `mode: none` to disable authorization
authorization:
    mode: rbac

# If you want to set a Kubernetes cloud provider, you specify
# the name and configuration
cloud_provider:
    name: aws

# Add-ons are deployed using kubernetes jobs. RKE will give
# up on trying to get the job status after this timeout in seconds..
addon_job_timeout: 30

# There are several network plug-ins that work, but we default
# to canal      
network:
    plugin: canal

# Specify DNS provider (coredns or kube-dns)
dns:
    provider: coredns

# Currently only nginx ingress provider is supported.
# To disable ingress controller, set `provider: none`

ingress:
    provider: nginx

# All add-on manifests MUST specify a namespace
addons: |-
    ---
    apiVersion: v1
    kind: Pod
    metadata:
      name: my-nginx
      namespace: default
    spec:
      containers:
      - name: my-nginx
        image: nginx
        ports:
        - containerPort: 80

addons_include:
    - https://raw.githubusercontent.com/rook/rook/master/cluster/examples/kubernetes/rook-operator.yaml
    - https://raw.githubusercontent.com/rook/rook/master/cluster/examples/kubernetes/rook-cluster.yaml
    - /path/to/manifest
```
