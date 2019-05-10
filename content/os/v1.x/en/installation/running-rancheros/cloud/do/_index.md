---
title: Digital Ocean
weight: 107
---

Now RancherOS is avaliable in DO portal. RancherOS is a member of container distributions and you can find it easily.

You can access the host via SSH after booted, the default user is `rancher`.

You can do some initialization with user data, such as deploying Rancher. Here are the rough user data:

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
