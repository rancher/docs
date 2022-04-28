---
title: "Network Options"
weight: 25
---

> **Note:** Please reference the [Networking]({{<baseurl>}}/k3s/latest/en/networking) page for information about CoreDNS, Traefik, and the Service LB.

By default, K3s will run with flannel as the CNI, using VXLAN as the default backend. To change the CNI, refer to the section on configuring a [custom CNI](#custom-cni). To change the flannel backend, refer to the flannel options section.

### Flannel Options

The default backend for flannel is VXLAN. To enable encryption, pass the IPSec (Internet Protocol Security) or WireGuard options below.

If you wish to use WireGuard as your flannel backend it may require additional kernel modules. Please see the [WireGuard Install Guide](https://www.wireguard.com/install/) for details. The WireGuard install steps will ensure the appropriate kernel modules are installed for your operating system. You need to install WireGuard on every node, both server and agents before attempting to leverage the WireGuard flannel backend option.

  CLI Flag and Value | Description
  -------------------|------------
 <span style="white-space: nowrap">`--flannel-backend=vxlan`</span> | (Default) Uses the VXLAN backend. |
 <span style="white-space: nowrap">`--flannel-backend=ipsec`</span> | Uses the IPSEC backend which encrypts network traffic. |
 <span style="white-space: nowrap">`--flannel-backend=host-gw`</span> |  Uses the host-gw backend. |
 <span style="white-space: nowrap">`--flannel-backend=wireguard`</span> | Uses the WireGuard backend which encrypts network traffic. May require additional kernel modules and configuration. |
 <span style="white-space: nowrap">`--flannel-ipv6-masq`</span> | Apply masquerading rules to IPv6 traffic (default for IPv4). Only applies on dual-stack or IPv6-only clusters |

### Custom CNI

Run K3s with `--flannel-backend=none` and install your CNI of choice. Most CNI plugins come with their own network policy engine, so it is recommended to set `--disable-network-policy` as well to avoid conflicts. IP Forwarding should be enabled for Canal and Calico. Please reference the steps below.

{{% tabs %}}
{{% tab "Canal" %}}

Visit the [Project Calico Docs](https://docs.projectcalico.org/) website. Follow the steps to install Canal. Modify the Canal YAML so that IP forwarding is allowed in the container_settings section, for example:

```
"container_settings": {
              "allow_ip_forwarding": true
          }
```

Apply the Canal YAML.

Ensure the settings were applied by running the following command on the host:

```
cat /etc/cni/net.d/10-canal.conflist
```

You should see that IP forwarding is set to true.

{{% /tab %}}
{{% tab "Calico" %}}

Follow the [Calico CNI Plugins Guide](https://docs.projectcalico.org/master/reference/cni-plugin/configuration). Modify the Calico YAML so that IP forwarding is allowed in the container_settings section, for example:

```
"container_settings": {
              "allow_ip_forwarding": true
          }
```

Apply the Calico YAML.

Ensure the settings were applied by running the following command on the host:

```
cat /etc/cni/net.d/10-calico.conflist
```

You should see that IP forwarding is set to true.


{{% /tab %}}
{{% /tabs %}}

### Dual-stack installation

Dual-stack networking must be configured when the cluster is first created. It cannot be enabled on an existing single-stack cluster.

Dual-stack is supported on k3s v1.21 or above.

To enable dual-stack in K3s, you must provide valid dual-stack `cluster-cidr` and `service-cidr` on all server nodes. Both servers and agents must provide valid dual-stack `node-ip` settings. Node address auto-detection is not supported on dual-stack clusters, because kubelet fetches only the first IP address that it finds. Additionally, only vxlan backend is supported currently. This is an example of a valid configuration:

```
k3s server --node-ip 10.0.10.7,2a05:d012:c6f:4611:5c2:5602:eed2:898c --cluster-cidr 10.42.0.0/16,2001:cafe:42:0::/56 --service-cidr 10.43.0.0/16,2001:cafe:42:1::/112
```

Note that you can choose whatever `cluster-cidr` and `service-cidr` value, however the `node-ip` values must correspond to the ip addresses of your main interface. Remember to allow ipv6 traffic if you are deploying in a public cloud.

If you are using a custom cni plugin, i.e. a cni plugin different from flannel, the previous configuration might not be enough to enable dual-stack in the cni plugin. Please check how to enable dual-stack in its documentation and verify if network policies can be enabled.

### IPv6 only installation

IPv6 only setup is supported on k3s v1.22 or above. Note that network policy enforcement is not supported on IPv6-only clusters when using the default flannel CNI. This is an example of a valid configuration:

```
k3s server --disable-network-policy
```
