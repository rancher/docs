---
title: Setting up the Azure Cloud Provider
weight: 2
---

When using the `Azure` cloud provider, you can leverage the following capabilities:

- **Load Balancers:** Launches an Azure Load Balancer within a specific Network Security Group.

- **Persistent Volumes:** Supports using Azure Blob disks and Azure Managed Disks with standard and premium storage accounts.

- **Network Storage:** Support Azure Files via CIFS mounts.

The following account types are not supported for Azure Subscriptions:

- Single tenant accounts (i.e. accounts with no subscriptions).
- Multi-subscription accounts.

To set up the Azure cloud provider following credentials need to be configured:

1. [Set up the Azure Tenant ID](#1-set-up-the-azure-tenant-id)
2. [Set up the Azure Client ID and Azure Client Secret](#2-set-up-the-azure-client-id-and-azure-client-secret)
3. [Configure App Registration Permissions](#3-configure-app-registration-permissions)
4. [Set up Azure Network Security Group Name](#4-set-up-azure-network-security-group-name)

### 1. Set up the Azure Tenant ID

Visit [Azure portal](https://portal.azure.com), login and go to **Azure Active Directory** and select **Properties**. Your **Directory ID** is your **Tenant ID** (tenantID).

If you want to use the Azure CLI, you can run the command `az account show` to get the information.

### 2. Set up the Azure Client ID and Azure Client Secret 

Visit [Azure portal](https://portal.azure.com), login and follow the steps below to create an **App Registration** and the corresponding **Azure Client ID** (aadClientId) and **Azure Client Secret** (aadClientSecret).

1. Select **Azure Active Directory**.
1. Select **App registrations**.
1. Select **New application registration**.
1. Choose a **Name**, select `Web app / API` as **Application Type** and a **Sign-on URL** which can be anything in this case.
1. Select **Create**.

In the **App registrations** view, you should see your created App registration. The value shown in the column **APPLICATION ID** is what you need to use as **Azure Client ID**.

The next step is to generate the **Azure Client Secret**:

1. Open your created App registration.
1. In the **Settings** view, open **Keys**.
1. Enter a **Key description**, select an expiration time and select **Save**.
1. The generated value shown in the column **Value** is what you need to use as **Azure Client Secret**. This value will only be shown once.

### 3. Configure App Registration Permissions

The last thing you will need to do, is assign the appropriate permissions to your App registration.

1. Go to **More services**, search for **Subscriptions** and open it.
1. Open **Access control (IAM)**.
1. Select **Add**.
1. For **Role**, select `Contributor`.
1. For **Select**, select your created App registration name.
1. Select **Save**.

### 4. Set up Azure Network Security Group Name

A custom Azure Network Security Group (securityGroupName) is needed to allow Azure Load Balancers to work.

If you provision hosts using Rancher Machine Azure driver, you will need to edit them manually to assign them to this Network Security Group.

You should already assign custom hosts to this Network Security Group during provisioning.

Only hosts expected to be load balancer back ends need to be in this group.
