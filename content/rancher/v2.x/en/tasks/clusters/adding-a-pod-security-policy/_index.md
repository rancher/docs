---
title: Adding a Pod Security Policy
weight: 3475
draft: true
---

_Pod Security Policies_ are objects that control security-sensitive aspects of pod specification. You can add a Pod Security Policy (PSPs hereafter) to either a cluster or project. For more information about PSPs, refer to [Pod Security Policy]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/#pod-security-policies).

## Pod Security Policies and Clusters

### Create a Cluster with a default Pod Security Policy

1. Ensure a PSP exists. Refer to the [Adding Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/) task for details.

2. On the __Add Cluster__ screen under the __Cluster Options__ accordion select __Enabled__ for __Pod Security Policy Support__.

    >Note that not all cloud providers support PSPs and this option may not be shown. Also if no PSP are defined in Rancher then this option will be greyed out.

3. Select a PSP from the dropdown.

4. Fill out the rest of the _Cluster_ information and create it as normal.

5. When the _Cluster_ has finished provisioning the PSP that you selected will be applied to all the projects within that cluster.

### Add a Pod Security Policy to an existing Cluster

1. Ensure a PSP exists. Refer to the [Adding Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/) task for details.

2. Click the vertical ellipsis next to the _Cluster_ you want to enable PSPs for.

3. Select __Edit__.

4. On the __Edit Cluster__ screen under the __Cluster Options__ accordion select __Enabled__ for __Pod Security Policy Support__. Note that not all cloud providers support PSPs and this option may not be shown. Also if no PSP are defined in Rancher then this option will be greyed out.

5. Select a PSP from the dropdown.

6. __Save__ the _Cluster_.

7. When the _Cluster_ has finished updating the PSP that you selected will be applied to all the projects within that cluster.

## Pod Security Policies and Projects

### Create a Project with a Pod Security Policy.

1. Ensure a PSP exists. Refer to the [Adding Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/) task for details.

2. Navigate to a _Cluster_ with _Pod Security Policy Support_ enabled.

3. On the __Projects/Namespaces__ screen click __Add Project__.

4. On the __Add Project__ screen select a PSP from the dropdown.

5. Fill out the rest of the information as usual.

6. Click __Create__.

7. The _Project_ will create with the selected PSP applied.

### Add a Pod Security Policy to an existing Project

1. Ensure a PSP exists. Refer to the [Adding Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/) task for details.

2. Navigate to a _Cluster_ with _Pod Security Policy Support_ enabled.

3. __Edit__ a _Project_.

4. Select a PSP from the dropdown.

5. Click __Save__.

6. The _Project_ will have the selected PSP applied.
