---
title: Date and time zone
weight: 121
---

The default console keeps time in the Coordinated Universal Time (UTC) zone and synchronizes clocks with the Network Time Protocol (NTP). The Network Time Protocol daemon (ntpd) is an operating system program that maintains the system time in synchronization with time servers using the NTP. 

RancherOS can run ntpd in the System Docker container. You can update its configurations by updating `/etc/ntp.conf`. For an example of how to update a file such as `/etc/ntp.conf` within a container, refer to [this page.]({{< baseurl >}}/os/v1.x/en/installation/configuration/write-files/#writing-files-in-specific-system-services)

The default console cannot support changing the time zone because including `tzdata` (time zone data) will increase the ISO size. However, you can change the time zone in the container by passing a flag to specify the time zone when you run the container:

```
$ docker run -e TZ=Europe/Amsterdam debian:jessie date
Tue Aug 20 09:28:19 CEST 2019
```

You may need to install the `tzdata` in some images:

```
$ docker run -e TZ=Asia/Shanghai -e DEBIAN_FRONTEND=noninteractive -it --rm ubuntu /bin/bash -c "apt-get update && apt-get install -yq tzdata && date”
Thu Aug 29 08:13:02 CST 2019
```
