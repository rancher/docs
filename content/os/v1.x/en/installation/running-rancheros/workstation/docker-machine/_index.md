---
title: Using Docker Machine
weight: 101
---

Before we get started, you'll need to make sure that you have docker machine installed. Download it directly from the docker machine [releases](https://github.com/docker/machine/releases).

> **Note:** If you create a RancherOS instance using Docker Machine, you will not be able to upgrade your version of RancherOS.

### Downloading RancherOS

Get the latest `rancheros.iso` artifact from the RancherOS [releases](https://github.com/rancher/os/releases).

### Using Docker Machine

You can use Docker Machine to launch VMs for various providers. Currently VirtualBox and VMWare(VMWare VSphere, VMWare Fusion) and AWS are supported.

#### Using Docker Machine with VirtualBox

Before moving forward, you'll need to have VirtualBox installed. Download it directly from [VirtualBox](https://www.virtualbox.org/wiki/Downloads). Once you have VirtualBox and Docker Machine installed, it's just one command to get RancherOS running.

```
$ docker-machine create -d virtualbox --virtualbox-boot2docker-url <LOCATION-OF-RANCHEROS-ISO> <MACHINE-NAME>
```

<br>

> **Note:** Instead of downloading the ISO, you can directly use the URL for the `rancheros.iso`.

Example using the RancherOS latest link:

```
$ docker-machine create -d virtualbox --virtualbox-boot2docker-url https://releases.rancher.com/os/latest/rancheros.iso <MACHINE-NAME>
```

That's it! You should now have a RancherOS host running on VirtualBox. You can verify that you have a VirtualBox VM running on your host.

> **Note:** After the machine is created, Docker Machine may display some errors regarding creation, but if the VirtualBox VM is running, you should be able to [log in](#logging-into-rancheros).

```
$ VBoxManage list runningvms | grep <MACHINE-NAME>
```

This command will print out the newly created machine. If not, something went wrong with the provisioning step.

#### Using Docker Machine with VMWare VSphere

_Available as of v1.4_

Before moving forward, you’ll need to have VMWare VSphere installed. Once you have VMWare VSphere and Docker Machine installed, it’s just one command to get RancherOS running.

```
$ docker-machine create --driver vmwarevsphere --vmwarevsphere-username=<USERNAME> --vmwarevsphere-password=<PASSWORD> --vmwarevsphere-memory-size=<MEMORY-SIZE> --vmwarevsphere-boot2docker-url=<LOCATION-OF-RANCHEROS-VMWARE-ISO> --vmwarevsphere-vcenter=<IP-ADDRESS> --vmwarevsphere-vcenter-port=<PORT> --vmwarevsphere-disk-size=<DISK-SIZE> <MACHINE-NAME>
```

> **Note:** Instead of downloading the RancherOS VMWare ISO, you can directly use the URL for the rancheros-vmware.iso.

Example using the RancherOS VMWare latest link:

```
$ docker-machine create --driver vmwarevsphere --vmwarevsphere-username <USERNAME> --vmwarevsphere-password <PASSWORD> --vmwarevsphere-memory-size <MEMORY-SIZE> --vmwarevsphere-boot2docker-url https://releases.rancher.com/os/latest/rancheros-vmware.iso --vmwarevsphere-vcenter <IP-ADDRESS> --vmwarevsphere-vcenter-port <PORT> --vmwarevsphere-disk-size <DISK-SIZE> <MACHINE-NAME>
```

That’s it! You should now have a RancherOS host running on VMWare VSphere. You can verify that you have a VMWare(ESXi) VM running on your host.

#### Using Docker Machine with VMWare Fusion

_Available as of v1.4_

Before moving forward, you’ll need to have VMWare Fusion installed. Once you have VMWare Fusion and Docker Machine installed, it’s just one command to get RancherOS running.

```
$ docker-machine create --driver vmwarefusion --vmwarefusion-no-share --vmwarefusion-memory-size <MEMORY> --vmwarefusion-boot2docker-url <LOCATION-OF-RANCHEROS-VMWARE-ISO> <MACHINE_NAME>
```

> **Note:** Instead of downloading the RancherOS VMWare ISO, you can directly use the URL for the rancheros-vmware.iso.

Example using the RancherOS VMWare latest link:

```
$ docker-machine create --driver vmwarefusion --vmwarefusion-no-share --vmwarefusion-memory-size <MEMORY> --vmwarefusion-boot2docker-url https://releases.rancher.com/os/latest/rancheros-vmware.iso <MACHINE_NAME>
```

That’s it! You should now have a RancherOS host running on VMWare Fusion. You can verify that you have a VMWare Fusion VM running on your host.


### Logging into RancherOS

Logging into RancherOS follows the standard Docker Machine commands. To login into your newly provisioned RancherOS VM.

```
$ docker-machine ssh <MACHINE-NAME>
```

You'll be logged into RancherOS and can start exploring the OS, This will log you into the RancherOS VM. You'll then be able to explore the OS by [adding system services]({{< baseurl >}}/os/v1.x/en/installation/system-services/adding-system-services/), [customizing the configuration]({{< baseurl >}}/os/v1.x/en/installation/configuration/), and launching containers.

If you want to exit out of RancherOS, you can exit by pressing `Ctrl+D`.

### Docker Machine Benefits

With Docker Machine, you can point the docker client on your host to the docker daemon running inside of the VM. This allows you to run your docker commands as if you had installed docker on your host.

To point your docker client to the docker daemon inside the VM, use the following command:

```
$ eval $(docker-machine env <MACHINE-NAME>)
```

After setting this up, you can run any docker command in your host, and it will execute the command in your RancherOS VM.

```
$ docker run -p 80:80 -p 443:443 -d nginx
```

In your VM, a nginx container will start on your VM. To access the container, you will need the IP address of the VM.

```
$ docker-machine ip <MACHINE-NAME>
```

Once you obtain the IP address, paste it in a browser and a _Welcome Page_ for nginx will be displayed.
