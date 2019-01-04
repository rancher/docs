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
$ INTEGRATION_TESTS=0 make release
```

The `rancheros.iso` is ready to be used to [boot RancherOS from ISO]({{< baseurl >}}/os/v1.x/en/installation/running-rancheros/workstation/boot-from-iso/) or [launch RancherOS using Docker Machine]({{< baseurl >}}/os/v1.x/en/installation/running-rancheros/workstation/docker-machine).

### Creating a GCE Image Archive

Create a clone of the main [RancherOS repository](https://github.com/rancher/os) to your local machine with a `git clone`.

```
$ git clone https://github.com/rancher/os-packer.git
```

GCE supports KVM virtualization, and we use `packer` to build KVM images. Before building, you need to verify that the host can support KVM. 
If you want to build GCE image based on RancherOS v1.4.0, you can run this command:

```
RANCHEROS_VERSION=v1.4.0 make build-gce
```

### Custom build cases

#### Reduce memory requirements

With the changes of the kernel and built docker, RancherOS booting requires more memory, please refer to [Memory Requirements]({{< baseurl >}}/os/v1.x/en/#hardware-requirements).

By customizing the ISO, you can reduce the memory usage on boot. The easiest way is to downgrade the built-in docker version, because docker takes up a lot of space. 
This can effectively reduce the memory required to decompress the initrd on boot, using docker 17.03 is a good choice:

```
# update os-config.tpl.yml in rancher/os
     hostname: {{.HOSTNAME_DEFAULT}}
     {{if eq "amd64" .ARCH -}}
     docker:
-      engine: docker-18.03.1-ce
+      engine: docker-17.03.2-ce
     {{else -}}
     docker:
-      engine: docker-18.03.1-ce
+      engine: docker-17.03.2-ce
     {{end -}}
...

# run make
$ INTEGRATION_TESTS=0 make release
```

#### Building with a different  console

_Available as of v1.5.0_

When building RancherOS, you have the ability to automatically start in a supported [console]({{< baseurl >}}/os/v1.x/en/installation/switching-consoles/) instead of booting into the default console and switching to your desired one. 

Here is an example of building RanchreOS and having the alpine console enabled: 

```
$ OS_CONSOLE=alpine make release
```
