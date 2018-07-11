---
title: Vagrant Quick Start
weight: 200
---
The following steps will allow you to quickly deploy a Rancher Server with a 3-node cluster attached.

## Prerequisites

- [Vagrant](https://www.vagrantup.com) - Vagrant is required as this is used to provision the machine based on the Vagrantfile.
- [Virtualbox](https://www.virtualbox.org) - The Virtual Machines that Vagrant provisions need to be provisioned to VirtualBox.
- At least 6GB of free RAM.


## Getting Going

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

2. Go into the folder containing the terraform file by executing `cd quickstart/vagrant`.

3. Edit the config.yaml if required (you can change the number of nodes and the memory allocations if required).

4. To initiate the creation of the environment run `vagrant up`.

5. Once provisioning has finished go to `https://172.22.101.100` in the browser (default user/password is `admin/password1` you can change this in the config.yaml prior to running the `vagrant up` command).

## Destroying the environment

1. From the `quickstart/vagrant` folder execute `vagrant destroy -f` .

2. Wait for the confirmation that all resources have been destroyed.