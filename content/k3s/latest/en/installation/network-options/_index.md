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

### Custom CNI

Run K3s with `--flannel-backend=none` and install your CNI of choice. IP Forwarding should be enabled for Canal and Calico. Please reference the steps below.

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
