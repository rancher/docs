---
layout: single-docs
title: Adding Pod Security Policies
weight: 3150
---

# Pod Security Policies

## Adding Pod Security Policies

Using {{< product >}}, you can create a Pod Security Policy using our GUI rather than creating a .yaml file.

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

Now that you've created a Pod Security Policy, you can apply it to:

- An existing cluster
- A brand new cluster. For more details, see [Creating a Cluster](../../clusters/creating-a-cluster/_index)


<!-- links -->

[1]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems
[2]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#host-namespaces
[3]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#users-and-groups
