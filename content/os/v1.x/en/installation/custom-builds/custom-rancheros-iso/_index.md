---
title: Custom RancherOS ISO
weight: 182
---

It's easy to build your own RancherOS ISO.

Create a clone of the main [RancherOS repository](https://github.com/rancher/os) to your local machine with a `git clone`.

```
$ git clone https://github.com/rancher/os.git
```

In the root of the repository, the "General Configuration" section of `Dockerfile.dapper` can be updated to use [custom kernels]({{< baseurl >}}/os/v1.x/en/installation/custom-builds/custom-kernels). 
After you've saved your edits, run `make` in the root directory. After the build has completed, a `./dist/artifacts` directory will be created with the custom built RancherOS release files. 
Build Requirements: `bash`, `make`, `docker` (Docker version >= 1.10.3)

```
$ make
$ cd dist/artifacts
$ ls
initrd             rancheros.iso
iso-checksums.txt  vmlinuz
```

If you need a compressed ISO, you can run this command:

```
$ make release
```

The `rancheros.iso` is ready to be used to [boot RancherOS from ISO]({{< baseurl >}}/os/v1.x/en/installation/running-rancheros/workstation/boot-from-iso/) or [launch RancherOS using Docker Machine]({{< baseurl >}}/os/v1.x/en/installation/running-rancheros/workstation/docker-machine).

## Creating a GCE Image Archive

Create a clone of the main [RancherOS repository](https://github.com/rancher/os) to your local machine with a `git clone`.

```
$ git clone https://github.com/rancher/os-packer.git
```

GCE supports KVM virtualization, and we use `packer` to build KVM images. Before building, you need to verify that the host can support KVM. 
If you want to build GCE image based on RancherOS v1.4.0, you can run this command:

```
RANCHEROS_VERSION=v1.4.0 make build-gce
```

## Custom Build Cases

#### Reduce Memory Requirements

With changes to the kernel and built Docker, RancherOS booting requires more memory. For details, please refer to the [memory requirements]({{< baseurl >}}/os/v1.x/en/#hardware-requirements).

By customizing the ISO, you can reduce the memory usage on boot. The easiest way is to downgrade the built-in Docker version, because Docker takes up a lot of space. 
This can effectively reduce the memory required to decompress the `initrd` on boot. Using docker 17.03 is a good choice:

```
# run make
$ USER_DOCKER_VERSION=17.03.2 make release
```

#### Building with a Different Console

_Available as of v1.5.0_

When building RancherOS, you have the ability to automatically start in a supported [console]({{< baseurl >}}/os/v1.x/en/installation/switching-consoles/) instead of booting into the default console and switching to your desired one. 

Here is an example of building RancherOS and having the `alpine` console enabled: 

```
$ OS_CONSOLE=alpine make release
```

#### Building with Predefined Docker Images

If you want to use a custom ISO file to address an offline scenario, you can use predefined images for `system-docker` and `user-docker`.

RancherOS supports `APPEND_SYSTEM_IMAGES`. It can save images to the `initrd` file, and is loaded with `system-docker` when booting.

You can build the ISO like this:

```
APPEND_SYSTEM_IMAGES="rancher/os-openvmtools:10.3.10-1" make release
```

RancherOS also supports `APPEND_USER_IMAGES`. It can save images to the `initrd` file, and is loaded with `user-docker` when booting.

You can build the ISO like this:

```
APPEND_USER_IMAGES="alpine:3.9 ubuntu:bionic" make release
```

Please note that these will be packaged into the `initrd`, and the predefined images will affect the resource footprint at startup.
