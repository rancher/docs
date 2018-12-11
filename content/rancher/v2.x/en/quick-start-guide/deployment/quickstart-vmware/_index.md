---
title: VMware vSphere Quick Start
weight: 150
---
The following steps will quickly deploy a Rancher Server with a single node cluster attached.

## Prerequisites

### VMware vSphere

You must have access to a VMware vSphere (6.0 or later) datacenter and have a user account with sufficient privileges to:

- Deploy from OVF/OVA template
- Convert VM to template
- Provision new VMs
- Create VM folders

### VM Network

A VM network must be available in the vSphere datacenter that provides:

- A DHCP service to assign IP addresses to the guest OS
- Internet access to the public Docker registry (aka Docker Hub)

### Ubuntu Cloud Image VM template

A VM template must exist in vSphere based off of the official [Ubuntu 16.04 LTS cloud image](https://cloud-images.ubuntu.com/releases/16.04/release/). This is so that the Rancher Server and Kubernetes Cluster nodes can be bootstrapped using a Cloud-Init userdata script. The following steps guide you through importing the Ubuntu 16.04 LTS virtual appliance and converting it to a VM template:

1. Log in to vCenter using the vSphere web console.
2. Right-click on the inventory list and select "Deploy OVF template...".
3. Specify the URL of the Ubuntu 16.04 LTS cloud image OVA bundle and hit *Next*: [ubuntu-16.04-server-cloudimg-amd64.ova](https://cloud-images.ubuntu.com/releases/16.04/release/ubuntu-16.04-server-cloudimg-amd64.ova)
4. Select an inventory folder to save the VM template in.
5. Select the cluster, host or resource pool in which to temporarily create the VM before converting it to a template.
6. Select a (preferably shared) datastore for the template's disk image.
7. Select the default VM network to use for the template.
8. Skip the "Customize template" step.
9. Navigate to the newly created VM, click "Edit Settings..." in the context menu and update the size of "Hard disk 1" to 25GB or larger.
10. Finally convert the VM to a template by selecting "Convert to template..." in the context menu.

### Terraform

Download and install [Terraform](https://www.terraform.io/downloads.html) to provision the Rancher server and cluster in vSphere.

## Getting Started

1. Clone the [Rancher Quickstart](https://github.com/rancher/quickstart) repository locally using `git clone https://github.com/rancher/quickstart`.
2. Go into the folder containing the terraform files for vSphere by executing `cd quickstart/vsphere`.
3. Rename the `terraform.tfvars.example` file to `terraform.tfvars`.
4. Edit `terraform.tfvars` to match your environment. See the inline comments in the file `variables.tf` for all available configuration variables and their usage. You must at least modify the following configuration variables:
    - `vcenter_user`
    - `vcenter_password`
    - `vcenter_server`
    - `vsphere_datacenter`
    - `vsphere_datastore`
    - `vsphere_network`
    - Either `vsphere_resource_pool` or `vsphere_cluster` to specify where the VMs should be deployed
    - `vsphere_template` must match the name/path of the Ubuntu VM template
    - `rancher_admin_password`
5. **Optional:** Use the following variable to specify the number of nodes that should be created for the Kubernetes cluster (Default: 3): `rancher_num_cluster_nodes`
6. Run `terraform init`.
7. To initiate the creation of the environment, run `terraform apply`. Then wait for the the following output:

	```
	Apply complete! Resources: 2 added, 0 changed, 0 destroyed. 
	  Outputs: 
	  rancher-url = [ 
              https://xxx.xxx.xxx.xxx 
      ]
	```
8. Paste the `rancher-url` from the output above into the browser. Log in with the username `admin` and the password you specified in the `rancher_admin_password` variable.

**Result:** A Rancher Server and Kubernetes cluster have been provisioned in vSphere.

### What's Next?

Use the Rancher GUI to create a deployment. For more information, see [Creating Deployments]({{< baseurl >}}/rancher/v2.x/en/quick-start-guide/workload).

## Destroying the Environment

1. From the `quickstart/vsphere` folder, execute `terraform destroy --force`.

2. Wait for confirmation that all resources have been destroyed.
