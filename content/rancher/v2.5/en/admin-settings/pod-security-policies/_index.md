---
title: Pod Security Policies
weight: 1135
aliases:
    - /rancher/v2.5/en/concepts/global-configuration/pod-security-policies/
    - /rancher/v2.5/en/tasks/global-configuration/pod-security-policies/
    - /rancher/v2.5/en/tasks/clusters/adding-a-pod-security-policy/
---

_Pod Security Policies_ (or PSPs) are objects that control security-sensitive aspects of pod specification (like root privileges).

If a pod does not meet the conditions specified in the PSP, Kubernetes will not allow it to start, and Rancher will display an error message of `Pod <NAME> is forbidden: unable to validate...`.

- [How PSPs Work](#how-psps-work)
- [Default PSPs](#default-psps)
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

Read more about Pod Security Policies in the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/policy/pod-security-policy/).

# Default PSPs

Rancher ships with two default Pod Security Policies (PSPs): the `restricted` and `unrestricted` policies.

### Restricted

This policy is based on the Kubernetes [example restricted policy](https://raw.githubusercontent.com/kubernetes/website/master/content/en/examples/policy/restricted-psp.yaml). It significantly restricts what types of pods can be deployed to a cluster or project. This policy:

- Prevents pods from running as a privileged user and prevents escalation of privileges.
- Validates that server-required security mechanisms are in place (such as restricting what volumes can be mounted to only the core volume types and preventing root supplemental groups from being added.

### Unrestricted

This policy is equivalent to running Kubernetes with the PSP controller disabled. It has no restrictions on what pods can be deployed into a cluster or project.

# Creating PSPs

Using Rancher, you can create a Pod Security Policy using our GUI rather than creating a YAML file.

### Requirements

Rancher can only assign PSPs for clusters that are [launched using RKE.]({{< baseurl >}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/)

You must enable PSPs at the cluster level before you can assign them to a project. This can be configured by [editing the cluster.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/editing-clusters/)

It is a best practice to set PSP at the cluster level.

We recommend adding PSPs during cluster and project creation instead of adding it to an existing one.

### Creating PSPs in the Rancher UI

1.	From the **Global** view, select **Security** > **Pod Security Policies** from the main menu. Then click **Add Policy**.

	**Step Result:** The **Add Policy** form opens.

2. Name the policy.

3. Complete each section of the form. Refer to the [Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/pod-security-policy/) for more information on what each policy does.


# Configuration

The Kubernetes documentation on PSPs is [here.](https://kubernetes.io/docs/concepts/policy/pod-security-policy/)



<!-- links -->

[1]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems
[2]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#host-namespaces
[3]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#users-and-groups
