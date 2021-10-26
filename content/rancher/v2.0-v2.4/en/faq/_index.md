---
title: FAQ
weight: 25
aliases:
  - /rancher/v2.0-v2.4/en/about/
---

This FAQ is a work in progress designed to answers the questions our users most frequently ask about Rancher v2.x.

See [Technical FAQ]({{<baseurl>}}/rancher/v2.0-v2.4/en/faq/technical/), for frequently asked technical questions.

<br>

**Does Rancher v2.x support Docker Swarm and Mesos as environment types?**

When creating an environment in Rancher v2.x, Swarm and Mesos will no longer be standard options you can select. However, both Swarm and Mesos will continue to be available as Catalog applications you can deploy. It was a tough decision to make but, in the end, it came down to adoption. For example, out of more than 15,000 clusters, only about 200 or so are running Swarm.

<br>

**Is it possible to manage Azure Kubernetes Services with Rancher v2.x?**

Yes.

<br>

**Does Rancher support Windows?**

As of Rancher 2.3.0, we support Windows Server 1809 containers. For details on how to set up a cluster with Windows worker nodes, refer to the section on [configuring custom clusters for Windows.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/windows-clusters/)

<br>

**Does Rancher support Istio?**

As of Rancher 2.3.0, we support [Istio.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/istio/)

Furthermore, Istio is implemented in our micro-PaaS "Rio", which works on Rancher 2.x along with any CNCF compliant Kubernetes cluster. You can read more about it [here](https://rio.io/)

<br>

**Will Rancher v2.x support Hashicorp's Vault for storing secrets?**

Secrets management is on our roadmap but we haven't assigned it to a specific release yet. 

<br>

**Does Rancher v2.x support RKT containers as well?**

At this time, we only support Docker.

<br>

**Does Rancher v2.x support Calico, Contiv, Contrail, Flannel, Weave net, etc., for embedded and imported Kubernetes?**

Out-of-the-box, Rancher provides the following CNI network providers for Kubernetes clusters: Canal, Flannel, Calico and Weave (Weave is available as of v2.2.0).  Always refer to the [Rancher Support Matrix](https://rancher.com/support-maintenance-terms/) for details about what is officially supported.

<br>

**Are you planning on supporting Traefik for existing setups?**

We don't currently plan on providing embedded Traefik support, but we're still exploring load-balancing approaches.

<br>

**Can I import OpenShift Kubernetes clusters into v2.x?**

Our goal is to run any upstream Kubernetes clusters. Therefore, Rancher v2.x should work with OpenShift, but we haven't tested it yet.

<br>

**Are you going to integrate Longhorn?**

Yes. Longhorn was on a bit of a hiatus while we were working on v2.0. We plan to re-engage on the project.