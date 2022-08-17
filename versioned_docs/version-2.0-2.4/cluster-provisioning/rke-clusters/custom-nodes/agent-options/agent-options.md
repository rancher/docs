---
title: Rancher Agent Options
weight: 2500
aliases:
  - /rancher/v2.0-v2.4/en/admin-settings/agent-options/
  - /rancher/v2.0-v2.4/en/cluster-provisioning/custom-clusters/agent-options
---

Rancher deploys an agent on each node to communicate with the node. This pages describes the options that can be passed to the agent. To use these options, you will need to [create a cluster with custom nodes]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/custom-nodes) and add the options to the generated `docker run` command when adding a node.

For an overview of how Rancher communicates with downstream clusters using node agents, refer to the [architecture section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/overview/architecture/#3-node-agents)

## General options

| Parameter  | Environment variable | Description |
| ---------- | -------------------- | ----------- |
| `--server` | `CATTLE_SERVER` | The configured Rancher `server-url` setting which the agent connects to |
| `--token`  | `CATTLE_TOKEN` | Token that is needed to register the node in Rancher |
| `--ca-checksum`  | `CATTLE_CA_CHECKSUM` | The SHA256 checksum of the configured Rancher `cacerts` setting to validate |
| `--node-name` | `CATTLE_NODE_NAME` | Override the hostname that is used to register the node (defaults to `hostname -s`) |
| `--label` | `CATTLE_NODE_LABEL` | Add node labels to the node. For multiple labels, pass additional `--label` options. (`--label key=value`) |
| `--taints` | `CATTLE_NODE_TAINTS` | Add node taints to the node. For multiple taints, pass additional `--taints` options.  (`--taints key=value:effect`) |

## Role options

| Parameter  | Environment variable | Description |
| ---------- | -------------------- | ----------- |
| `--all-roles` | `ALL=true` | Apply all roles (`etcd`,`controlplane`,`worker`) to the node |
| `--etcd`  | `ETCD=true` | Apply the role `etcd` to the node |
| `--controlplane`  | `CONTROL=true` | Apply the role `controlplane` to the node |
| `--worker`  | `WORKER=true` | Apply the role `worker` to the node |

## IP address options

| Parameter  | Environment variable | Description |
| ---------- | -------------------- | ----------- |
| `--address` | `CATTLE_ADDRESS` | The IP address the node will be registered with (defaults to the IP used to reach `8.8.8.8`) |
| `--internal-address` | `CATTLE_INTERNAL_ADDRESS` | The IP address used for inter-host communication on a private network |

### Dynamic IP address options

For automation purposes, you can't have a specific IP address in a command as it has to be generic to be used for every node. For this, we have dynamic IP address options. They are used as a value to the existing IP address options. This is supported for `--address` and `--internal-address`.

| Value  | Example | Description |
| ---------- | -------------------- | ----------- |
| Interface name | `--address eth0` | The first configured IP address will be retrieved from the given interface |
| `ipify` | `--address ipify` | Value retrieved from `https://api.ipify.org` will be used |
| `awslocal` | `--address awslocal` | Value retrieved from `http://169.254.169.254/latest/meta-data/local-ipv4` will be used |
| `awspublic` | `--address awspublic` | Value retrieved from `http://169.254.169.254/latest/meta-data/public-ipv4` will be used |
| `doprivate` | `--address doprivate` | Value retrieved from `http://169.254.169.254/metadata/v1/interfaces/private/0/ipv4/address` will be used |
| `dopublic` | `--address dopublic` | Value retrieved from `http://169.254.169.254/metadata/v1/interfaces/public/0/ipv4/address` will be used |
| `azprivate` | `--address azprivate` | Value retrieved from `http://169.254.169.254/metadata/instance/network/interface/0/ipv4/ipAddress/0/privateIpAddress?api-version=2017-08-01&format=text` will be used |
| `azpublic` | `--address azpublic` | Value retrieved from `http://169.254.169.254/metadata/instance/network/interface/0/ipv4/ipAddress/0/publicIpAddress?api-version=2017-08-01&format=text` will be used |
| `gceinternal` | `--address gceinternal` | Value retrieved from `http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/ip` will be used |
| `gceexternal` | `--address gceexternal` | Value retrieved from `http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip` will be used |
| `packetlocal` | `--address packetlocal` | Value retrieved from `https://metadata.packet.net/2009-04-04/meta-data/local-ipv4` will be used |
| `packetpublic` | `--address packetlocal` | Value retrieved from `https://metadata.packet.net/2009-04-04/meta-data/public-ipv4` will be used |
