---
title: Pod Security Policies
weight: 1135
aliases:
    - /rancher/v2.x/en/concepts/global-configuration/pod-security-policies/
    - /rancher/v2.x/en/tasks/global-configuration/pod-security-policies/
    - /rancher/v2.x/en/tasks/clusters/adding-a-pod-security-policy/
---

_Pod Security Policies_ (or PSPs) are objects that control security-sensitive aspects of pod specification (like root privileges). If a pod does not meet the conditions specified in the PSP, Kubernetes will not allow it to start, and Rancher will display an error message of `Pod <NAME> is forbidden: unable to validate...`.

- You can assign PSPs at the cluster or project level.
- PSPs work through inheritance.

    - By default, PSPs assigned to a cluster are inherited by its projects, as well as any namespaces added to those projects.
    - **Exception:** Namespaces that are not assigned to projects do not inherit PSPs, regardless of whether the PSP is assigned to a cluster or project. Because these namespaces have no PSPs, workload deployments to these namespaces will fail, which is the default Kubernetes behavior.
    - You can override the default PSP by assigning a different PSP directly to the project.
- Any workloads that are already running in a cluster or project before a PSP is assigned will not be checked if it complies with the PSP. Workloads would need to be cloned or upgraded to see if they pass the PSP.

Read more about Pod Security Policies in the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/policy/pod-security-policy/).

>**Best Practice:** Set pod security at the cluster level.

Using Rancher, you can create a Pod Security Policy using our GUI rather than creating a YAML file.

## Default Pod Security Policies

_Available as of v2.0.7_

Rancher ships with two default Pod Security Policies (PSPs): the `restricted` and `unrestricted` policies.

- `restricted`

	This policy is equivilent to running Kubernetes with the PSP controller disabled. It has no restrictions on what pods can be deployed into a cluster or project.

- `unrestricted`

	This policy is based on the Kubernetes [example restricted policy](https://kubernetes.io/docs/concepts/policy/pod-security-policy/#example-policies). It significantly restricts what types of pods can be deployed to a cluster or project. This policy:
	
	- Prevents pods from running as a privileged user and prevents escalation of privileges.
	- Validates that server-required security mechanisms are in place (such as restricting what volumes can be mounted to only the core volume types and preventing root supplemental groups from being added). 

## Creating Pod Security Policies

1.	From the **Global** view, select **Security** > **Pod Security Policies** from the main menu. Then click **Add Policy**.

	**Step Result:** The **Add Policy** form opens.

2. Name the policy.

3. Complete each section of the form. Refer to the Kubernetes documentation linked below for more information on what each policy does.

	- Basic Policies:

		- [Privilege Escalation](https://kubernetes.io/docs/concepts/policy/pod-security-policy/#privilege-escalation)
		- [Host Namespaces][2]
		- [Read Only Root Filesystems][1]

	- [Capability Policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/#capabilities)
	- [Volume Policy][1]
	- [Allowed Host Paths Policy][1]
	- [FS Group Policy][1]
	- [Host Ports Policy][2]
	- [Run As User Policy][3]
	- [SELinux Policy](https://kubernetes.io/docs/concepts/policy/pod-security-policy/#selinux)
	- [Supplemental Groups Policy][3]

### What's Next?

You can add a Pod Security Policy (PSPs hereafter) in the following contexts:

- [When creating a cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/pod-security-policies/)
- [When editing an existing cluster]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/)
- [When creating a project]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#creating-a-project/)
- [When editing an existing project]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/)

> **Note:** We recommend adding PSPs during cluster and project creation instead of adding it to an existing one.


<!-- links -->

[1]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems
[2]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#host-namespaces
[3]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#users-and-groups
