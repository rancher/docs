---
title: Node Templates
weight: 125
---

You can create new clusters within Rancher using _node templates_. A node template is a virtual machine image used to create a Kubernetes cluster. While creating a cluster, Rancher will prompt you for an image to use as a template. Follow the directions on screen to create the template. During cluster creation, Rancher clones the template and installs different Kubernetes components.

After you add a node template to Rancher, its stored by the system so that you can use it when creating another cluster later. Node templates are bound to your login. After you add a template, you can remove them from your user profile.

