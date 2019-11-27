---
title: "Installation"
weight: 20
---

This section contains instructions for installing K3s in various environments. Please ensure you have met the [Node Requirements]({{< baseurl >}}/k3s/latest/en/installation/node-requirements/) before you begin installing K3s.

[Installation and Configuration Options]({{< baseurl >}}/k3s/latest/en/installation/install-options/) provides guidance on the options available to you when installing K3s.


[High Availability with an External DB]({{< baseurl >}}/k3s/latest/en/installation/ha/) details how to setup an HA K3s cluster backed by an external datastore such as MySQL, PostgreSQL, or etcd.

[High Availability with Embedded DB (Experimental)]({{< baseurl >}}/k3s/latest/en/installation/ha-embedded/) details how to setup an HA K3s cluster that leverages a built-in distributed database.

[Air-Gap Installation]({{< baseurl >}}/k3s/latest/en/installation/airgap/) details how to setup K3s in environments that do not have direct access to the Internet.

### Uninstalling

If you installed K3s with the help of the `install.sh` script, an uninstall script is generated during installation, which will be created on your node at `/usr/local/bin/k3s-uninstall.sh` (or as `k3s-agent-uninstall.sh`).
