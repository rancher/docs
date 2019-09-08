---
title: Overview of RancherOS
shortTitle: RancherOS
description: RancherOS is a simplified Linux distribution built from containers, for containers. These documents describe how to install and use RancherOS.
weight: 1
---

RancherOS is the smallest, easiest way to run Docker in production.  Every process in RancherOS is a container managed by Docker. This includes system services such as `udev` and `syslog`.  Because it only includes the services necessary to run Docker, RancherOS is significantly smaller than most traditional operating systems. By removing unnecessary libraries and services, requirements for security patches and other maintenance are also reduced. This is possible because, with Docker, users typically package all necessary libraries into their containers.

Another way in which RancherOS is designed specifically for running Docker is that it always runs the latest version of Docker. This allows users to take advantage of the latest Docker capabilities and bug fixes.

Like other minimalist Linux distributions, RancherOS boots incredibly quickly. Starting Docker containers is nearly instant, similar to starting any other process. This speed is ideal for organizations adopting microservices and autoscaling.

Docker is an open-source platform designed for developers, system admins, and DevOps. It is used to build, ship, and run containers, using a simple and powerful command line interface (CLI). To get started with Docker, please visit the [Docker user guide](https://docs.docker.com/config/daemon/).

### Hardware Requirements

* Memory Requirements

Platform   | RAM requirement(>=v1.5.x) | RAM requirement(v1.4.x)
--------   | ------------------------  | ---------------------------
Baremetal  | 1GB                       | 1280MB
VirtualBox | 1GB                       | 1280MB
VMWare     | 1GB                       | 1280MB (rancheros.iso) <br> 2048MB (rancheros-vmware.iso)
GCE        | 1GB                       | 1280MB
AWS        | 1GB                       | 1.7GB

You can adjust memory requirements by custom building RancherOS, please refer to reduce-memory-requirements

### How RancherOS Works

Everything in RancherOS is a Docker container. We accomplish this by launching two instances of Docker. One is what we call **System Docker** and is the first process on the system. All other system services, like `ntpd`, `syslog`, and `console`, are running in Docker containers. System Docker replaces traditional init systems like `systemd` and is used to launch [additional system services]({{< baseurl >}}/os/v1.x/en/installation/system-services/adding-system-services/).

System Docker runs a special container called **Docker**, which is another Docker daemon responsible for managing all of the user’s containers. Any containers that you launch as a user from the console will run inside this Docker. This creates isolation from the System Docker containers and ensures that normal user commands don’t impact system services.

 We created this separation not only for the security benefits, but also to make sure that commands like `docker rm -f $(docker ps -qa)` don't delete the entire OS.

![How it works]({{< baseurl >}}/img/os/rancheroshowitworks.png)

### Running RancherOS

To get started with RancherOS, head over to our [Quick Start Guide]({{< baseurl >}}/os/v1.x/en/quick-start-guide/).

### Latest Release

Please check our repository for the latest release in our [README](https://github.com/rancher/os/blob/master/README.md).

<br>
<br>
