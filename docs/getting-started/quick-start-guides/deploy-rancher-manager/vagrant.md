---
title: Vagrant Quick Start
weight: 200
---
The following steps quickly deploy a Rancher Server with a single node cluster attached.

:::caution

The intent of these guides is to quickly launch a sandbox that you can use to evaluate Rancher. These guides are not intended for production environments. For comprehensive setup instructions, see [Installation](../../../pages-for-subheaders/installation-and-upgrade.md).

:::

## Prerequisites

- [Vagrant](https://www.vagrantup.com): Vagrant is required as this is used to provision the machine based on the Vagrantfile.
- [Virtualbox](https://www.virtualbox.org): The virtual machines that Vagrant provisions need to be provisioned to VirtualBox.
- At least 4GB of free RAM.

### Note
- Vagrant will require plugins to create VirtualBox VMs. Install them with the following commands:

  `vagrant plugin install vagrant-vboxmanage`

  `vagrant plugin install vagrant-vbguest`

## Getting Started

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

2. Go into the folder containing the Vagrantfile by executing `cd quickstart/rancher/vagrant`.

3. **Optional:** Edit `config.yaml` to:

    - Change the number of nodes and the memory allocations, if required. (`node.count`, `node.cpus`, `node.memory`)
    - Change the password of the `admin` user for logging into Rancher. (`default_password`)

4. To initiate the creation of the environment run, `vagrant up --provider=virtualbox`.

5. Once provisioning finishes, go to `https://192.168.56.101` in the browser. The default user/password is `admin/adminPassword`.

**Result:** Rancher Server and your Kubernetes cluster is installed on VirtualBox.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments](../../../pages-for-subheaders/deploy-rancher-workloads.md).

## Destroying the Environment

1. From the `quickstart/rancher/vagrant` folder execute `vagrant destroy -f`.

2. Wait for the confirmation that all resources have been destroyed.
