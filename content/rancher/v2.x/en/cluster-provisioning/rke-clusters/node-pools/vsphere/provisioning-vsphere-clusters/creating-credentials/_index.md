---
title: Creating Credentials in the vSphere Console
weight: 1
---

This section describes how to create a vSphere username and password. You will need to provide these vSphere credentials to Rancher, which allows Rancher to provision resources in vSphere.

The following table lists the permissions required for the vSphere user account:

| Privilege Group       | Operations  |
|:----------------------|:-----------------------------------------------------------------------|
| Datastore             | AllocateSpace </br> Browse </br> FileManagement (Low level file operations) </br> UpdateVirtualMachineFiles </br> UpdateVirtualMachineMetadata |
| Network               | Assign |
| Resource              | AssignVMToPool |
| Virtual Machine       | Config (All) </br> GuestOperations (All) </br> Interact (All) </br> Inventory (All) </br> Provisioning (All) |

The following steps create a role with the required privileges and then assign it to a new user in the vSphere console:

1. From the **vSphere** console, go to the **Administration** page.

2. Go to the **Roles** tab.

3. Create a new role.  Give it a name and select the privileges listed in the permissions table above.

    ![image]({{< baseurl >}}/img/rancher/rancherroles1.png)

4. Go to the **Users and Groups** tab.

5. Create a new user. Fill out the form and then click **OK**. Make sure to note the username and password, because you will need it when configuring node templates in Rancher.

    ![image]({{< baseurl >}}/img/rancher/rancheruser.png)

6. Go to the **Global Permissions** tab.

7. Create a new Global Permission. Add the user you created earlier and assign it the role you created earlier. Click **OK**.

    ![image]({{< baseurl >}}/img/rancher/globalpermissionuser.png)

	![image]({{< baseurl >}}/img/rancher/globalpermissionrole.png)

**Result:** You now have credentials that Rancher can use to manipulate vSphere resources.