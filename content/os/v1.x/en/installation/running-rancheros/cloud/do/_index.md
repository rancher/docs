---
title: Digital Ocean
weight: 107
---

RancherOS is avaliable in the Digital Ocean portal. RancherOS is a member of container distributions and you can find it easily.

## Prerequisites

>**Note**
>Deploying to Digital Ocean will incur charges.

Make sure your Digital Ocean droplet has the [minimum hardware requirements for RancherOS]({{< baseurl >}}os/v1.x/en/overview/#hardware-requirements).

## Creating a Droplet with RancherOS

To start a RancherOS droplet on Digital Ocean:

1. In the Digital Ocean portal, go to the project view.
1. Click **New Droplet.**
1. Click **Create Droplet.**
1. Click the **Container distributions** tab.
1. Click **RancherOS.**
1. Choose any options for plan, backups, block storage, and datacenter region.
1. Optional: In the **Select additional options** section, you can check the **User data** box and enter a `cloud-config` file in the text box that appears. The `cloud-config` file is used to provide a script to be run on the first boot. An example is below.
1. Choose an SSH key that you have access to, or generate a new SSH key.
1. Choose your project.
1. Click **Create.**


You can access the host via SSH after the droplet is booted. The default user is `rancher`.

Below is an example `cloud-config` file that you can use to initialize the droplet with user data, such as deploying Rancher:

```
#cloud-config

write_files:
  - path: /etc/rc.local
    permissions: "0755"
    owner: root
    content: |
      #!/bin/bash
      wait-for-docker

      export curlimage=appropriate/curl
      export jqimage=stedolan/jq
      export rancher_version=v2.2.2

      for image in $curlimage $jqimage "rancher/rancher:${rancher_version}"; do
        until docker inspect $image > /dev/null 2>&1; do
          docker pull $image
          sleep 2
        done
      done

      docker run -d --restart=unless-stopped -p 80:80 -p 443:443 -v /opt/rancher:/var/lib/rancher rancher/rancher:${rancher_version}
```
