---
title: Pod Security Policies
weight: 60
---

_Pod Security Policies_ (or PSPs) are objects that control security-sensitive aspects of pod specification (like root privileges).

If a pod does not meet the conditions specified in the PSP, Kubernetes will not allow it to start, and Rancher will display an error message of `Pod <NAME> is forbidden: unable to validate...`.

- [How PSPs Work](#how-psps-work)
- [Default PSPs](#default-psps)
  - [Restricted-NoRoot](#restricted-noroot)
  - [Restricted](#restricted)
  - [Unrestricted](#unrestricted)
- [Creating PSPs](#creating-psps)
  - [Requirements](#requirements)
  - [Creating PSPs in the Rancher UI](#creating-psps-in-the-rancher-ui)
- [Configuration](#configuration)

# How PSPs Work

You can assign PSPs at the cluster or project level.

PSPs work through inheritance:

- By default, PSPs assigned to a cluster are inherited by its projects, as well as any namespaces added to those projects.
- **Exception:** Namespaces that are not assigned to projects do not inherit PSPs, regardless of whether the PSP is assigned to a cluster or project. Because these namespaces have no PSPs, workload deployments to these namespaces will fail, which is the default Kubernetes behavior.
- You can override the default PSP by assigning a different PSP directly to the project.

Any workloads that are already running in a cluster or project before a PSP is assigned will not be checked if it complies with the PSP. Workloads would need to be cloned or upgraded to see if they pass the PSP.

Read more about Pod Security Policies in the [Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/pod-security-policy/).

# Default PSPs

Rancher ships with three default Pod Security Policies (PSPs): the `restricted-noroot`, `restricted` and `unrestricted` policies.

### Restricted-NoRoot

This policy is based on the Kubernetes [example restricted policy](https://raw.githubusercontent.com/kubernetes/website/master/content/en/examples/policy/restricted-psp.yaml). It significantly restricts what types of pods can be deployed to a cluster or project. This policy:

- Prevents pods from running as a privileged user and prevents escalation of privileges.
- Validates that server-required security mechanisms are in place, such as restricting what volumes can be mounted to only the core volume types and preventing root supplemental groups from being added.

### Restricted

This policy is a relaxed version of the `restricted-noroot` policy, with almost all the restrictions in place, except for the fact that it allows running containers as a privileged user.

### Unrestricted

This policy is equivalent to running Kubernetes with the PSP controller disabled. It has no restrictions on what pods can be deployed into a cluster or project.

# Creating PSPs

Using Rancher, you can create a Pod Security Policy using our GUI rather than creating a YAML file.

### Requirements

Rancher can only assign PSPs for clusters that are [launched using RKE](../../../pages-for-subheaders/launch-kubernetes-with-rancher.md).

You must enable PSPs at the cluster level before you can assign them to a project. This can be configured by [editing the cluster](../../../pages-for-subheaders/cluster-configuration.md).

It is a best practice to set PSP at the cluster level.

We recommend adding PSPs during cluster and project creation instead of adding it to an existing one.

### Creating PSPs in the Rancher UI

1. In the upper left corner, click **☰ > Cluster Management**.
1. In the left navigation bar, click **Pod Security Policies**.
1. Click **Add Policy**.
1. Name the policy.
1. Complete each section of the form. Refer to the [Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/pod-security-policy/) for more information on what each policy does.
1. Click **Create**.

# Configuration

The Kubernetes documentation on PSPs is [here](https://kubernetes.io/docs/concepts/policy/pod-security-policy/).
