---
title: Azure
weight: 110
---

RancherOS has been published in Azure Marketplace, you can get it from [here](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/rancher.rancheros).

### Launching RancherOS through the Azure Portal

Using the new Azure Resource Management portal, click on **Marketplace**. Search for **RancherOS**. Click on **Create**.

Follow the steps to create a virtual machine.

In the _Basics_ step, provide a **name** for the VM, use _rancher_ as the **user name** and select the **SSH public key** option of authenticating. Add your ssh public key into the appropriate field. Select the **Resource group** that you want to add the VM to or create a new one. Select the **location** for your VM.

In the _Size_ step, select a virtual machine that has at least **1GB** of memory.

In the _Settings_ step, you can use all the default settings to get RancherOS running.

Review your VM and buy it so that you can **Create** your VM.

After the VM has been provisioned, click on the VM to find the public IP address. SSH into your VM using the _rancher_ username.

```
$ ssh rancher@<public_ip_of_vm> -p 22
```

### Launching RancherOS with custom data

_Available as of v1.5.2_

Instance Metadata Service provides the ability for the VM to have access to its custom data. The binary data must be less than 64 KB and is provided to the VM in base64 encoded form.
You can get more details from [here](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/instance-metadata-service#custom-data)

For example, you can add custom data through [CLI](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/cli-ps-findimage):

```
# list images from marketplace
az vm image list --location westus --publisher Rancher --offer rancheros --sku os --all --output table

Offer      Publisher    Sku    Urn                            Version
---------  -----------  -----  -----------------------------  ---------
rancheros  rancher      os     rancher:rancheros:os:1.5.1     1.5.1
rancheros  rancher      os152  rancher:rancheros:os152:1.5.2  1.5.2
...

# accept the terms
az vm image accept-terms --urn rancher:rancheros:os152:1.5.2

# create the vm
AZURE_ROS_SSH_PUBLIC_KEY="xxxxxx"
az vm create --resource-group mygroup \
             --name myvm \
             --image rancher:rancheros:os152:1.5.2 \
             --plan-name os152 \
             --plan-product rancheros \
             --plan-publisher rancher \
             --custom-data ./custom_data.txt \
             --admin-username rancher \
             --size Standard_A1 \
             --ssh-key-value "$AZURE_ROS_SSH_PUBLIC_KEY"
```

The `custom_data.txt` can be the cloud-config format or a shell script, such as:

```
#cloud-config
runcmd:
- [ touch, /home/rancher/test1 ]
- echo "test" > /home/rancher/test2
```

```
#!/bin/sh
echo "aaa" > /home/rancher/aaa.txt
```
