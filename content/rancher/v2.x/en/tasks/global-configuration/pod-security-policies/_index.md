---
title: Pod Security Policies
weight: 3150
---

## Adding Pod Security Policies

Using {{< product >}}, you can create a Pod Security Policy using our GUI rather than creating a YAML file.

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

- An existing cluster.

  - Pod Security Policy can be added to an existing cluster using edit cluster option
  
  1. Navigate to the **Cluster** option and click the **Ellipsis icon** (...) 
  2. Click **Edit** to launch **Edit Cluster** page
  3. Expand **Cluster Options**.
  4. Choose **Enabled option** for **Pod Security Policy Support**
  5. Select one of the pod security policies from the drop down list for **Default Pod Security Policy**
  6. Click on **Save**
  
  - Pod Security Policy can be disabled for an existing cluster
  
  1. Navigate to the **Cluster** option and click the **Ellipsis icon** (...) 
  2. Click **Edit** to launch **Edit Cluster** page
  3. Expand **Cluster Options**.
  4. Choose **Disabled option** for **Pod Security Policy Support**
  5. This will result in **Default Pod Security Policy** to be set to `None`
  6. Click on **Save**
  
- A brand new cluster. For more details, see [Creating a Cluster]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/creating-a-cluster/)

  Pod Security Policy can be added when a new cluster is created.
  
  1. Use **Add Cluster** option in **Global** view to add a new cluster.
  2. See [Creating a Cluster]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/creating-a-cluster/)
  3. Expand **Cluster Options**.
  4. Choose **Enabled option** for **Pod Security Policy Support**
  5. Select one of the podsecurity policies from the drop down list for **Default Pod Security Policy**
    
- A new Project in a cluster which has Pod Security Policy enabled.

  Pod Security Policy can be added to a project when we want the project to have a Pod Security Policy that is different from the Pod Security Policy set at cluster level.
  
  1. Navigate to the cluster where you want to create a project with Pod Security Policy.
  2. Click on **Projects/Namespaces** and click on **Add Project** to launch **Add Project** page
  3. Provide **Project Name**
  4. Select the desired Pod Security Policy from the drop down for **Pod Security Policy**
  5. Click on **Create**

- Existing Project in a cluster which has Pod Security Policy enabled.

  Pod Security Policy can be set for a project or altered at anytime after the project has been created. 
  
  1. Navigate to the cluster where you have the project you want to add Pod Security Policy to be added. 
  2. Locate the project and navigate to the **Project** option and click the **Ellipsis icon** (...) 
  3. Click on **Edit** to launch the **Edit Project** option
  4. Select the desired Pod Security Policy from the drop down for **Pod Security Policy**
  5. Click on **Save**
  
<!-- links -->

[1]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#volumes-and-file-systems
[2]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#host-namespaces
[3]: https://kubernetes.io/docs/concepts/policy/pod-security-policy/#users-and-groups
