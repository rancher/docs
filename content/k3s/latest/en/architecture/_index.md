---
title: Architecture
weight: 1
---

This page describes the architecture of a high-availability K3s server cluster and how it differs from a single-node server cluster.

It also describes how agent nodes are registered with K3s servers.

A server node is defined as a machine (bare-metal or virtual) running the `k3s server` command. A worker node is defined as a machine running the `k3s agent` command.

This page covers the following topics:

- [Single-server setup with an embedded database](#single-server-setup-with-an-embedded-db)
- [High-availability K3s server with an external database](#high-availability-k3s-server-with-an-external-db)
  - [Fixed registration address for agent nodes](#fixed-registration-address-for-agent-nodes)
- [How agent node registration works](#how-agent-node-registration-works)

# Single-server Setup with an Embedded DB

The following diagram shows an example of a cluster that has a single-node K3s server with an embedded SQLite database.

In this configuration, each agent node is registered to the same server node. A K3s user can manipulate Kubernetes resources by calling the K3s API on the server node.

![Architecture]({{<baseurl>}}/img/rancher/k3s-single-node-server-architecture.svg)

# High-Availability K3s Server with an External DB

Single server clusters can meet a variety of use cases, but for environments where uptime of the Kubernetes control plane is critical, you can run K3s in an HA configuration. An HA K3s cluster is comprised of:

* Two or more **server nodes** that will serve the Kubernetes API and run other control plane services
* An **external datastore** (as opposed to the embedded SQLite datastore used in single-server setups)

![Architecture]({{< baseurl >}}/img/rancher/k3s-ha-architecture.svg)

### Fixed Registration Address for Agent Nodes

In the high-availability server configuration, each node must also register with the Kubernetes API by using a fixed registration address, as shown in the diagram below.

After registration, the agent nodes establish a connection directly to one of the server nodes.

![k3s HA]({{< baseurl >}}/img/k3s/k3s-production-setup.svg)

# How Agent Node Registration Works

Agent nodes are registered with a websocket connection initiated by the `k3s agent` process, and the connection is maintained by a client-side load balancer running as part of the agent process.

Agents will register with the server using the node cluster secret along with a randomly generated password for the node, stored at `/etc/rancher/node/password`. The server will store the passwords for individual nodes at `/var/lib/rancher/k3s/server/cred/node-passwd`, and any subsequent attempts must use the same password.

If the `/etc/rancher/node` directory of an agent is removed, the password file should be recreated for the agent, or the entry removed from the server.

A unique node ID can be appended to the hostname by launching K3s servers or agents using the `--with-node-id` flag.