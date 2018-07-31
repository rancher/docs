---
title: Vagrant Quick Start
weight: 200
---
The following steps quickly deploy a Rancher Server with a 3-node cluster attached.

## Prerequisites

- [Vagrant](https://www.vagrantup.com): Vagrant is required as this is used to provision the machine based on the Vagrantfile.
- [Virtualbox](https://www.virtualbox.org): The virtual machines that Vagrant provisions need to be provisioned to VirtualBox.
- At least 6GB of free RAM.

## Getting Started

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

2. Go into the folder containing the terraform file by executing `cd quickstart/vagrant`.

3. **Optional:** Edit `config.yaml` to:

    - Change the number of nodes and the memory allocations, if required.
    - Change the default user and password for logging into Rancher.

4. To initiate the creation of the environment run, `vagrant up`.

5. Once provisioning finishes, go to `https://172.22.101.101` in the browser. The default user/password is `admin/admin`.

**Result:** Rancher Server and your Kubernetes cluster is installed on VirtualBox.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments]({{< baseurl >}}/rancher/v2.x/en/quick-start-guide/workload).

## Destroying the Environment

1. From the `quickstart/vagrant` folder execute `vagrant destroy -f`.

2. Wait for the confirmation that all resources have been destroyed.
