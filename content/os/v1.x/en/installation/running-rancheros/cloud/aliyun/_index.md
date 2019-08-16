---
title: Aliyun
weight: 111
---

### Adding the RancherOS Image into Aliyun

RancherOS is available as an image in Aliyun, and can be easily run in Elastic Compute Service (ECS).  Let’s walk through how to upload ECS image.

1. Download the most recent RancherOS image. The image can be found in the [release artifacts](https://github.com/rancher/os/releases). It is a `rancheros-aliyun.vhd` file.
2. Follow Aliyun's instructions on how to [upload the image](https://help.aliyun.com/document_detail/127285.html). The image must be uploaded into a OSS bucket before it can be added.
3. Once the image is added to your ECS, we can start creating new instances!

Here is a screenshot we can refer to:

![RancherOS on Aliyun 1]({{< baseurl >}}/img/os/RancherOS_aliyun1.jpg)

Please note these options:

- Root disk size, it should be greater than 10GB and kept same as the value when booting an instance.
- Platform, it must be `Others Linux`
- Image Format, it must be `VHD`

### Launching RancherOS using Aliyun Console

After the image is uploaded, we can use the `Aliyun Console` to start a new instance. Currently RancherOS on Aliyun only supports ssh key access, so we need to fill it out in the console.

Since the image is private, we need to use the `Custom Images`.

![RancherOS on Aliyun 2]({{< baseurl >}}/img/os/RancherOS_aliyun2.jpg)

After the instance is successfully started, we can login with the `rancher` user via SSH.
