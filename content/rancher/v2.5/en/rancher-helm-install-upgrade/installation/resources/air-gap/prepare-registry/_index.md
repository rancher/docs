---
title: '1. Set up Private Registry'
weight: 100
---

> This page is under construction.

In this section, you will provision the underlying infrastructure for your Rancher management server in an air gapped environment. You will also set up the private Docker registry that must be available to your Rancher node(s).

An air gapped environment is an environment where the Rancher server is installed offline or behind a firewall.

The infrastructure depends on whether you are installing Rancher on a K3s Kubernetes cluster, an RKE Kubernetes cluster, or a single Docker container. For more information on each installation option, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/installation/)



### Set up a Private Docker Registry

Rancher supports air gap installs using a private registry. You must have your own private registry or other means of distributing Docker images to your machines.

In a later step, when you set up your K3s Kubernetes cluster, you will create a [private registries configuration file]({{<baseurl>}}/k3s/latest/en/installation/private-registry/) with details from this registry.

If you need help with creating a private registry, please refer to the [official Docker documentation.](https://docs.docker.com/registry/deploying/#run-an-externally-accessible-registry)


### [Next: Collect and Publish Images to your Private Registry]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/air-gap/populate-private-registry/)
