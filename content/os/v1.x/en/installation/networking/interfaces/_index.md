---
title: Configuring Network Interfaces
weight: 170
---

Using `ros config`, you can configure specific interfaces. Wildcard globbing is supported so `eth*` will match `eth1` and `eth2`.  The available options you can configure are `address`, `gateway`, `mtu`, and `dhcp`.

```
$ sudo ros config set rancher.network.interfaces.eth1.address 172.68.1.100/24
$ sudo ros config set rancher.network.interfaces.eth1.gateway 172.68.1.1
$ sudo ros config set rancher.network.interfaces.eth1.mtu 1500
$ sudo ros config set rancher.network.interfaces.eth1.dhcp false
```

If you wanted to configure the interfaces through the cloud config file, you'll need to place interface configurations within the `rancher` key.

```yaml
#cloud-config
rancher:
  network:
    interfaces:
      eth1:
        address: 172.68.1.100/24
        gateway: 172.68.1.1
        mtu: 1500
        dhcp: false
```

### Multiple NICs

If you want to configure one of multiple network interfaces, you can specify the MAC address of the interface you want to configure.

Using `ros config`, you can specify the MAC address of the NIC you want to configure as follows:

```
$ sudo ros config set rancher.network.interfaces.”mac=ea:34:71:66:90:12:01”.dhcp true
```

Alternatively, you can place the MAC address selection in your cloud config file as follows:

```yaml
#cloud-config
rancher:
  network:
    interfaces:
      "mac=ea:34:71:66:90:12:01":
         dhcp: true
```

### NIC bonding

You can aggregate several network links into one virtual link for redundancy and increased throughput. For example:

```yaml
#cloud-config
rancher:
  network:
    interfaces:
      bond0:
        addresses:
        - 192.168.101.33/31
        - 10.88.23.129/31
        gateway: 192.168.101.32
        bond_opts:
          downdelay: "200"
          lacp_rate: "1"
          miimon: "100"
          mode: "4"
          updelay: "200"
          xmit_hash_policy: layer3+4
        post_up:
        - ip route add 10.0.0.0/8 via 10.88.23.128
      mac=0c:c4:d7:b2:14:d2:
        bond: bond0
      mac=0c:c4:d7:b2:14:d3:
        bond: bond0
```

In this example two physical NICs (with MACs `0c:c4:d7:b2:14:d2` and `0c:c4:d7:b2:14:d3`) are aggregated into a virtual one `bond0`.

During the bootup process, RancherOS runs cloud-init. It automatically detects the data sources of cloud-init, but sometimes a data source requires a network connection. By default, in cloud-init, we open `rancher.network.interfaces.eth*.dhcp=true`, which may affect the bonding NIC. If you do not require the network connection for your data-source, use `rancher.network.interfaces.eth*.dhcp=false` in the kernel cmdline to disable DHCP for all NICs.

### VLANS

In this example, you can create an interface `eth0.100` which is tied to VLAN 100 and an interface `foobar` that will be tied to VLAN 200.

```
#cloud-config
rancher:
  network:
    interfaces:
      eth0:
        vlans: 100,200:foobar
```

### Bridging

In this example, you can create a bridge interface.

```
#cloud-config
rancher:
  network:
    interfaces:
      br0:
        bridge: true
        dhcp: true
      eth0:
        bridge: br0
```

### Run custom network configuration commands

_Available as of v1.1_

You can configure `pre` and `post` network configuration commands to run in the `network` service container by adding `pre_cmds` and `post_cmds` array keys to `rancher.network`, or `pre_up` and`post_up` keys for specific `rancher.network.interfaces`.

For example:

```
#cloud-config
write_files:
  - container: network
    path: /var/lib/iptables/rules.sh
    permissions: "0755"
    owner: root:root
    content: |
      #!/bin/bash
      set -ex
      echo $@ >> /var/log/net.log
      # the last line of the file needs to be a blank line or a comment
rancher:
  network:
    dns:
      nameservers:
        - 8.8.4.4
        - 4.2.2.3
    pre_cmds:
    - /var/lib/iptables/rules.sh pre_cmds
    post_cmds:
    - /var/lib/iptables/rules.sh post_cmds
    interfaces:
      lo:
        pre_up:
        - /var/lib/iptables/rules.sh pre_up lo
        post_up:
        - /var/lib/iptables/rules.sh post_up lo
      eth0:
        pre_up:
        - /var/lib/iptables/rules.sh pre_up eth0
        post_up:
        - /var/lib/iptables/rules.sh post_up eth0
      eth1:
        dhcp: true
        pre_up:
        - /var/lib/iptables/rules.sh pre_up eth1
        post_up:
        - /var/lib/iptables/rules.sh post_up eth1
      eth2:
        address: 192.168.3.13/16
        mtu: 1450
        pre_up:
        - /var/lib/iptables/rules.sh pre_up eth2
        post_up:
        - /var/lib/iptables/rules.sh post_up eth2
```

### WiFi

_Available as of v1.5_

In order to enable WiFi access, update the `cloud-config` with the WiFi network information. You can use `DHCP` or `STATIC` mode.

#### Example of a wireless adapter using DHCP

```yaml
#cloud-config
rancher:
  network:
    interfaces:
      wlan0:
        wifi_network: network1
    wifi_networks:
      network1:
        ssid: "Your wifi ssid"
        psk: "Your wifi password"
        scan_ssid: 1
```

#### Example of a wireless adapter using STATIC


```yaml
rancher:
  network:
    dns:
      nameservers:
      - 8.8.8.8
      - 8.8.4.4
    interfaces:
      wlan0:
        wifi_network: network1
    wifi_networks:
      network1:
        ssid: "Your wifi ssid"
        psk: "Your wifi password"
        scan_ssid: 1
        address: 192.168.1.78/24
        gateway: 192.168.1.1
```

#### Example using two wireless adapters with DHCP

```yaml
rancher:
  network:
    interfaces:
      wlan0:
        wifi_network: network1
      wlan1:
        wifi_network: network2
    wifi_networks:
      network1:
        ssid: "Your wifi ssid"
        psk: "Your wifi password"
        scan_ssid: 1
      network2:
        ssid: "Your wifi ssid"
        psk: "Your wifi password"
        scan_ssid: 1
```

When adding in WiFi access, you do not need a system reboot, you only need to restart the `network` service in System Docker. 

```
$ sudo system-docker restart network
```

> **Note:** For Intel wireless adapters, there are some built-in firmware and modules, which prevents requiring to install any new modules or firmware. For other adapters, you may need to install additional os kernel-extras.

### 4G-LTE

_Available as of v1.5_

In order to support 4G-LTE, 4G-LTE module will need to be connected to the motherboard and to get a good signal, an external atenna will need to be added. You can assemble such a device, which supports USB interface and SIM cards slot:

![](https://ws1.sinaimg.cn/bmiddle/006tNc79ly1fzcuvhu6zpj30k80qwag1.jpg)

In order to use RancherOS, you will need to use the ISO built for 4G-LTE support. This ISO has a built-in `modem-manager` service and is available with each release. 

After booting the ISO, there will be a 4G NIC, such as `wwan0`. Use the following `cloud-config` to set the APN parameter. 

```yaml
rancher:
  network:
    modem_networks:
      wwan0:
        apn: xxx
```

After any configuration changes, restart the `modem-manager` service to apply these changes.

```
$ sudo system-docker restart modem-manager
```

> **Note:** Currently, RancherOS has some built-in  rules in `udev` rules to allow RancherOS to recognize specific 4G devices, but there are additional vendors that may be missing. If you need to add these in, please file an issue. 
