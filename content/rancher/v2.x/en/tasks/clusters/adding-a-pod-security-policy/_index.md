---
title: Adding a Pod Security Policy
weight: 3475
draft: true
---

You can add a [Pod Security Policy]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/#pod-security-policies) to either a _Cluster_ or a _Project_. _Pod Security Policies_ set on a _Cluster_ act as a default and are applied to all _Namespaces_ assigned to _Projects_ within that _Cluster_. Default _Pod Security Policies_ can be overridden by setting a _Pod Security Policy_ on a project. _Namespaces_ that are not assigned to a _Project_ within a _Cluster_ are not given a _Pod Security Policy_.  As a result, all new _Workload_ deployments within those _Namespaces_ will fail (this is the default Kubernetes behavior).

## Pod Security Policies and Clusters
### Create a Cluster with a default Pod Security Policy
1. Ensure a _Pod Security Policy_ exists. Refer to the [Adding Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/) task for details.
1. On the __Add Cluster__ screen under the __Cluster Options__ accordion select __Enabled__ for __Pod Security Policy Support__.

    >Note that not all cloud providers support _Pod Security Policies_ and this option may not be shown. Also if no _Pod Security Policy_ are defined in Rancher then this option will be greyed out.
1. Select a _Pod Security Policy_ from the dropdown.
1. Fill out the rest of the _Cluster_ information and create it as normal.
1. When the _Cluster_ has finished provisioning the _Pod Security Policy_ that you selected will be applied to all the projects within that cluster.

### Add a Pod Security Policy to an existing Cluster
1. Ensure a _Pod Security Policy_ exists. Refer to the [Adding Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/) task for details.
1. Click the vertical ellipsis next to the _Cluster_ you want to enable _Pod Security Policies_ for.
1. Select __Edit__.
1. On the __Edit Cluster__ screen under the __Cluster Options__ accordion select __Enabled__ for __Pod Security Policy Support__. Note that not all cloud providers support _Pod Security Policies_ and this option may not be shown. Also if no _Pod Security Policy_ are defined in Rancher then this option will be greyed out.
1. Select a _Pod Security Policy_ from the dropdown.
1. __Save__ the _Cluster_.
1. When the _Cluster_ has finished updating the _Pod Security Policy_ that you selected will be applied to all the projects within that cluster.

## Pod Security Policies and Projects
### Create a Project with a Pod Security Policy.
1. Ensure a _Pod Security Policy_ exists. Refer to the [Adding Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/) task for details.
1. Navigate to a _Cluster_ with _Pod Security Policy Support_ enabled.
1. On the __Projects/Namespaces__ screen click __Add Project__.
1. On the __Add Project__ screen select a _Pod Security Policy_ from the dropdown.
1. Fill out the rest of the information as usual.
1. Click __Create__.
1. The _Project_ will create with the selected _Pod Security Policy_ applied.

### Add a Pod Security Policy to an existing Project
1. Ensure a _Pod Security Policy_ exists. Refer to the [Adding Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/) task for details.
1. Navigate to a _Cluster_ with _Pod Security Policy Support_ enabled.
1. __Edit__ a _Project_.
1. Select a _Pod Security Policy_ from the dropdown.
1. Click __Save__.
1. The _Project_ will have the selected _Pod Security Policy_ applied.
