---
title: Aliyun
weight: 111
---

# Adding the RancherOS Image into Aliyun

RancherOS is available as an image in Aliyun, and can be easily run in Elastic Compute Service (ECS).  Let’s walk through how to upload the ECS image.

1. Download the most recent RancherOS image. The image `rancheros-aliyun.vhd` can be found in the [release artifacts](https://github.com/rancher/os/releases). 
2. Follow Aliyun's instructions on how to [upload the image](https://help.aliyun.com/document_detail/127285.html). Before the image can be added, it must be uploaded into an OSS bucket.
3. Once the image is added to your ECS, we can start creating new instances!

Example: 

![RancherOS on Aliyun 1]({{< baseurl >}}/img/os/RancherOS_aliyun1.jpg)

## Options

| Option | Description | 
| --- | --- |
| Root disk size | The size must be greater than 10GB. Note: When booting the instance, the value must be kept the same. |
| Platform |  Select `Others Linux` |
| Image Format | Select `VHD` |

### Launching RancherOS using Aliyun Console

After the image is uploaded, we can use the `Aliyun Console` to start a new instance. Currently, RancherOS on Aliyun only supports SSH key access, so it can only be deployed through the UI. 

Since the image is private, we need to use the `Custom Images`.

![RancherOS on Aliyun 2]({{< baseurl >}}/img/os/RancherOS_aliyun2.jpg)

After the instance is successfully started, we can login with the `rancher` user via SSH.
