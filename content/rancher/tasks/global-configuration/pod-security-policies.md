---
tag: ["rancher", "pod security policies","security policies", "settings" ]
category: "rancher"
layout: list-docs
title: Adding Pod Security Policies
weight: 90
---

# Adding Pod Security Policies

Using {{< product >}}, you can create a pod security policy using our GUI rather than creating a .yaml file.

1.	From the **Global** view, select **Security** > **Pod Security Policies** from the main menu. Then click **Add Policy**.

	**Step Result:** The **Add Policy** form opens.

2. Name the policy.
3. Complete each section of the form. Refer to the Kubernetes documentation linked below for more information on what each policy does.

	- Basic Policies
	- Capability Policies
	- Volume Policy
	- Allowed Host Paths Policy
	- FS Group Policy
	- Host Ports Policy
	- Run As User Policy
	- SELinux Policy
	- Supplemental Groups Policy
