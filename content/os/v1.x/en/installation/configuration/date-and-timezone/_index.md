---
title: Date and time zone
weight: 121
---

The default console keeps time in the Coordinated Universal Time (UTC) zone and synchronize their clocks with the Network Time Protocol (NTP).

RancherOS can run ntpd in System Docker container, you can update its configurations by updating `/etc/ntp.conf`. Please refer to [here]({{< baseurl >}}/os/v1.x/en/installation/configuration/write-files/#writing-files-in-specific-system-services).

The default console can not support changing the time zone, as including tzdata will increase the ISO size. However, you can change the time zone at will in the container, such as:

```
$ docker run -e TZ=Europe/Amsterdam debian:jessie date
Tue Aug 20 09:28:19 CEST 2019
```

You may need to install the tzdata in some images:

```
$ docker run -e TZ=Asia/Shanghai -e DEBIAN_FRONTEND=noninteractive -it --rm ubuntu /bin/bash -c "apt-get update && apt-get install -yq tzdata && date”
Thu Aug 29 08:13:02 CST 2019
```
