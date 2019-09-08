---
title: Custom Kernels
weight: 181
---

### Kernel version in RancherOS

RancherOS basically uses the standard Linux kernel, but we maintain a kernel config ourselves. Due to various feature support and security fixes, we are constantly updating the kernel version.

RancherOS | Kernel
--------- | ------
<=v0.7.1  | 4.4.x
<=v1.3.0  | 4.9.x
>=v1.4.0  | 4.14.x

### Building and Packaging a Kernel to be used in RancherOS

We build the kernel for RancherOS at the [os-kernel repository](https://github.com/rancher/os-kernel). You can use this repository to help package your own custom kernel to be used in RancherOS.

Create a clone of the [os-kernel](https://github.com/rancher/os-kernel) repository to your local machine using `git clone`.

```
$ git clone https://github.com/rancher/os-kernel.git
```

If you want to build kernel v4.14.53, you can refer to the following command. After the build is completed, a `./dist/kernel` directory will be created with the freshly built kernel tarball and headers.

```
$ git tag v4.14.53-rancher
$ KERNEL_TAG=4.14.53 make release
...snip...
./dist/kernel/extra-linux-4.14.53-rancher-x86.tar.gz
./dist/kernel/build-linux-4.14.53-rancher-x86.tar.gz
./dist/kernel/linux-4.14.53-rancher-x86.tar.gz
./dist/kernel/config
...snip...
Images ready to push:
rancher/os-extras:4.14.53-rancher
rancher/os-headers:4.14.53-rancher
 ```
For some users who need a custom kernel, the following information is very useful to you:

1. The modules defined in `modules.list`  will be packaged into the built-in modules.
2. The modules defined in `modules-extra.list`  will be packaged into the extra modules.
3. You can modify `config/kernel-config` to build the kernel modules you need.
4. You can add your patches in the `patches` directory, and `os-kernel` will update these patches after downloading the kernel source.

Now you need to either upload the `./dist/kernel/linux-4.14.53-rancher-x86.tar.gz` file to somewhere, or copy that file into your clone of the `rancher/os` repo, as `assets/kernel.tar.gz`.

The `build-<name>.tar.gz` and `extra-<name>.tar.gz` files are used to build the `rancher/os-extras` and `rancher/os-headers` images for your RancherOS release - which you will need to tag them with a different organisation name, push them to a registry, and create custom service.yml files.

Your kernel should be packaged and published as a set of files of the following format:

1. `<kernel-name-and-version>.tar.gz` is the one KERNEL_URL in `rancher/os` should point to. It contains the kernel binary, core modules and firmware.

2. `build-<kernel-name-and-version>.tar.gz` contains build headers to build additional modules: it is a subset of the kernel sources tarball. These files will be installed into `/usr/src/<os-kernel-tag>` using the `kernel-headers-system-docker` and `kernel-headers` services.

3. `extra-<kernel-name-and-version>.tar.gz` contains extra modules and firmware for your kernel and should be built into a `kernel-extras` service.

### Building a RancherOS release using the Packaged kernel files.

By default, RancherOS ships with the kernel provided by the [os-kernel repository](https://github.com/rancher/os-kernel). Swapping out the default kernel can by done by building your own custom RancherOS ISO.

Create a clone of the main [RancherOS repository](https://github.com/rancher/os) to your local machine with a `git clone`.

```
$ git clone https://github.com/rancher/os.git
```

In the root of the repository, the "General Configuration" section of `Dockerfile.dapper` will need to be updated. Using your favorite editor, replace the appropriate `KERNEL_URL` value with a URL of your compiled custom kernel tarball. Ideally, the URL will use `HTTPS`.

```
# Update the URL to your own custom kernel tarball
ARG KERNEL_VERSION_amd64=4.14.63-rancher
ARG KERNEL_URL_amd64=https://link/xxxx
```

After you've replaced the URL with your custom kernel, you can follow the steps in building your own custom RancherOS ISO.

> **Note:** `KERNEL_URL` settings should point to a Linux kernel, compiled and packaged in a specific way. You can fork [os-kernel repository](https://github.com/rancher/os-kernel) to package your own kernel.
