---
title: Built-in System Services
weight: 150
---

## Built-in System Services

To launch RancherOS, we have built-in system services. They are defined in the [Docker Compose](https://docs.docker.com/compose/compose-file/) format, and can be found in the default system config file, `/usr/share/ros/os-config.yml`. You can [add your own system services]({{< baseurl >}}/os/installation/system-services/adding-system-services/) or override services in the cloud-config.

### preload-user-images

Read more about [image preloading]({{< baseurl >}}/os/installation/boot-process/image-preloading/).

### network

During this service, networking is set up, e.g. hostname, interfaces, and DNS.

It is configured by `hostname` and `rancher.network`settings in [cloud-config]({{< baseurl >}}/os/installation/configuration/#cloud-config).

### ntp

Runs `ntpd` in a System Docker container.

### console

This service provides the RancherOS user interface by running `sshd` and `getty`. It completes the RancherOS configuration on start up:

1. If the `rancher.password=<password>` kernel parameter exists, it sets `<password>` as the password for the `rancher` user.
2. If there are no host SSH keys, it generates host SSH keys and saves them under `rancher.ssh.keys` in [cloud-config]({{< baseurl >}}/os/installation/configuration/#cloud-config).
3. Runs `cloud-init -execute`, which does the following:
   * Updates `.ssh/authorized_keys` in `/home/rancher` and `/home/docker` from [cloud-config]({{< baseurl >}}/os/installation/configuration/ssh-keys/) and metadata.
   * Writes files specified by the `write_files` [cloud-config]({{< baseurl >}}/os/installation/configuration/write-files/) setting.
   * Resizes the device specified by the `rancher.resize_device` [cloud-config]({{< baseurl >}}/os/installation/configuration/resizing-device-partition/) setting.
   * Mount devices specified in the `mounts` [cloud-config]({{< baseurl >}}/os/installation/storage/additional-mounts/) setting.
   * Set sysctl parameters specified in  the`rancher.sysctl` [cloud-config]({{< baseurl >}}/os/installation/configuration/sysctl/) setting.
4. If user-data contained a file that started with `#!`, then a file would be saved at `/var/lib/rancher/conf/cloud-config-script` during cloud-init and then executed. Any errors are ignored.
5. Runs `/opt/rancher/bin/start.sh` if it exists and is executable. Any errors are ignored.
6. Runs `/etc/rc.local` if it exists and is executable. Any errors are ignored.

### docker

This system service runs the user docker daemon. Normally it runs inside the console system container by running `docker-init` script which, in turn, looks for docker binaries in `/opt/bin`, `/usr/local/bin` and `/usr/bin`, adds the first found directory with docker binaries to PATH and runs `dockerlaunch docker daemon` appending the passed arguments.

Docker daemon args are read from `rancher.docker.args` cloud-config property (followed by `rancher.docker.extra_args`).
