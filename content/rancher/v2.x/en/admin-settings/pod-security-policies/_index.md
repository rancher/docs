---
title: Managing Pod Security Policies
weight: 1135
aliases:
    - /rancher/v2.x/en/concepts/global-configuration/pod-security-policies
    - /rancher/v2.x/en/tasks/global-configuration/pod-security-policies
---

_Pod Security Policies_ (or PSPs) are objects that control security-sensitive aspects of pod specification (like root privileges). If a pod does not meet the conditions specified in the PSP, Kubernetes will not allow it to start, and Rancher will display an error message of `Pod <NAME> is forbidden: unable to validate...`.

- You can assign PSPs at the cluster or project level.
- PSPs work through inheritance.

    - By default, PSPs assigned to a cluster are inherited by its projects, as well as any namespaces added to those projects.
    - **Exception:** Namespaces that are not assigned to projects do not inherit PSPs, regardless of whether the PSP is assigned to a cluster or project. Because these namespaces have no PSPs, workload deployments to these namespaces will fail, which is the default Kubernetes behavior.
    - You can override the default PSP by assigning a different PSP directly to the project.
- Any workloads that are already running in a cluster or project before a PSP is assigned will not be checked if it complies with the PSP. Workloads would need to be cloned or upgraded to see if they pass the PSP.

Read more about Pod Security Policies in the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/policy/pod-security-policy/).

>**Best Practice:**
>Set Pod Security at the cluster level.

Using Rancher, you can create a Pod Security Policy using our GUI rather than creating a YAML file.

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
	- [Run As User Policy][1]
	- [Host Ports Policy][2]
	- [Run As User Policy][3]
	- [SELinux Policy](https://kubernetes.io/docs/concepts/policy/pod-security-policy/#selinux)
	- [Supplemental Groups Policy][3]

### What's Next?

You can add a Pod Security Policy (PSPs hereafter) in the following contexts:

- [When creating a cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/pod-security-policies/)
- [When editing an existing cluster]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/editing-clusters/)
- [When creating a project]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/projects-and-namespaces/#creating-a-project/)
- [When editing an existing project]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/projects-and-namespaces/editing-projects/)

> **Note:** We recommend adding PSPs during cluster and project creation instead of adding it to an existing one.


<!-- links -->

[1]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems
[2]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#host-namespaces
[3]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#users-and-groups
