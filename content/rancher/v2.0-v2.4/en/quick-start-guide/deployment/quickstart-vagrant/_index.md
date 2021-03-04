---
title: Vagrant Quick Start
weight: 200
---
The following steps quickly deploy a Rancher Server with a single node cluster attached.

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

2. Go into the folder containing the Vagrantfile by executing `cd quickstart/vagrant`.

3. **Optional:** Edit `config.yaml` to:

    - Change the number of nodes and the memory allocations, if required. (`node.count`, `node.cpus`, `node.memory`)
    - Change the password of the `admin` user for logging into Rancher. (`default_password`)

4. To initiate the creation of the environment run, `vagrant up --provider=virtualbox`.

5. Once provisioning finishes, go to `https://172.22.101.101` in the browser. The default user/password is `admin/admin`.

**Result:** Rancher Server and your Kubernetes cluster is installed on VirtualBox.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments]({{<baseurl>}}/rancher/v2.0-v2.4/en/quick-start-guide/workload).

## Destroying the Environment

1. From the `quickstart/vagrant` folder execute `vagrant destroy -f`.

2. Wait for the confirmation that all resources have been destroyed.
