---
title: "Networking"
weight: 35
---

Open Ports / Network Security
---------------------------

The server needs port 6443 to be accessible by the nodes.  The nodes need to be able to reach
other nodes over UDP port 8472.  The nodes also need to be able to reach the server on UDP port 8472.  This is used for flannel VXLAN.  If you don't use flannel
and provide your own custom CNI, then 8472 is not needed by k3s. The node should not listen
on any other port.  k3s uses reverse tunneling such that the nodes make outbound connections
to the server and all kubelet traffic runs through that tunnel.

IMPORTANT. The VXLAN port on nodes should not be exposed to the world, it opens up your
cluster network to accessed by anyone.  Run your nodes behind a firewall/security group that
disables access to port 8472.

Flannel
-------

Flannel is included by default, if you don't want flannel then run each agent with `--no-flannel` option.

In this setup you will still be required to install your own CNI driver.  More info [here](https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/#pod-network)

CoreDNS
-------

CoreDNS is deployed on start of the agent, to disable run each server with the `--no-deploy coredns` option.

If you don't install CoreDNS you will need to install a cluster DNS provider yourself.

Traefik Ingress Controller
--------------------------

Traefik is deployed by default when starting the server. For more information see [Auto Deploying Manifests]({{< baseurl >}}/k3s/latest/en/configuration/#auto-deploying-manifests). The default config file is found in `/var/lib/rancher/k3s/server/manifests/traefik.yaml` and any changes made to this file will automatically be deployed to Kubernetes in a manner similar to `kubectl apply`.

The Traefik ingress controller will use ports 80, 443, and 8080 on the host (i.e. these will not be usable for HostPort or NodePort).

You can tweak traefik to meet your needs by setting options in the traefik.yaml file.
Reference the official [Traefik for Helm Configuration Parameters](https://github.com/helm/charts/tree/master/stable/traefik#configuration) readme for more information.

To disable it, start each server with the `--no-deploy traefik` option.

Service Load Balancer
---------------------

k3s includes a basic service load balancer that uses available host ports.  If you try to create
a load balancer that listens on port 80, for example, it will try to find a free host in the cluster
for port 80.  If no port is available the load balancer will stay in Pending.

To disable the embedded load balancer run the server with the `--no-deploy servicelb` option. This is necessary if you wish to run a different load balancer, such as MetalLB.