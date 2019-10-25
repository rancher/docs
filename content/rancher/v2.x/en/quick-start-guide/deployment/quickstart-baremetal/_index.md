---
title: Bare metal Quick Start
weight: 200
---
The following steps quickly deploy a Rancher Server on `bare metal` (aka a computer with no operating system).

## Prerequisites

- [rancheros.iso](https://github.com/rancher/os/releases): Download the latest rancheros.iso file and create bootable device
- Computer allows access to boot menu, has at least one hard drive, and network has DHCP server
- Computer's first hard drive can be erased


## Getting Started

1. Boot PC using bootable media (may have to press F12 to get to the boot menu, then select the bootable device)

2. Once you get to a `rancher` prompt, change the rancher password: `sudo passwd rancher` (You will need this password when you ssh to this instance.)

3. Run `ifconfig -a` to get the ip address of this instance.

4. From another computer `ssh rancher@<ip from previous step>` (for example, `ssh rancher@192.168.0.11`)

5. Create a `cloud-config.yml` file. Here is an example file (with the ssh-rsa line truncated for brevity):

	```
	hostname: apple.example.com

	rancher:
	  network:
	    interfaces:
        eth*:
          dhcp: false
        eth0:
          address: 192.168.0.101/24
          gateway: 192.168.0.1
      dns:
        nameservers:
          - 192.168.0.171
          - 8.8.8.8

	ssh_authorized_keys:
    - ssh-rsa AAAAB3NzaC...jJw== XXX
  ```   

6. Install Rancher OS to the hard drive. Run `sudo ros install -i rancher/os:latest -c cloud-config.yml -d /dev/sda` (Note: This will wipe out any existing operating system on this computer.)

7. Reboot and remove the bootable media when installation is complete.

8. From another computer `ssh rancher@<ip from cloud-config.yml file>` (using the example above `ssh rancher@192.168.0.101`)

9. Start Rancher UI. Run `sudo docker run -d --restart=unless-stopped -p 9080:80 -p 9443:443 rancher/rancher` (Note: You can change the ports 9080 and/or 9443 if you want.)

10. Open up `https://<ip from cloud-config.yml file>:9443` (for example `https://192.168.0.101:9443`) and enter password for `admin` user.

11. Add a cluster. Enter `name`, click on "Next", then ensure all three options are checked ("worker", "etcd", "controlplane"). Copy the text.

12. Paste the text from prior step into the window from step 8 above. It will take a few minutes for all of the pieces to start.

### Want to add another worker node?

If you want to add another computer to the Rancher cluster, then follow these steps.

1. Follow the steps 1-8 from above. (be sure to change the ip address and hostname values in the cloud-config.yml file)

2. On the Cluster you want to add this computer (aka Node), click on `Edit`. You may only want the `worker` option checked. Copy the text.

3. Run the command from step 2 into the ssh'd connection to the second computer.

4. The node should now be added to the cluster.
