---
title: How to use recovery console
weight: 304
---

### Test Environment

In order to demonstrate how to use the recovery console, we choose a scene that the disk space is full and the OS cannot boot.

| Term                  | Definition                                       |
|-----------------------|--------------------------------------------------|
| RancherOS             |  v1.4.0  |
| Platform              |  Virtualbox |
| Root Disk             |  2GB  |
| CPU                   |  1C   |
| MEM                   |  2GB  |


### Fill up the disk

Start this VM to check disk usage:

```
/dev/sda1            ext4            1.8G    567.2M      1.2G  32% /opt
/dev/sda1            ext4            1.8G    567.2M      1.2G  32% /mnt
...
...
```

Fill the remaining space with `dd`:

```
$ cd /opt/
$ dd if=/dev/zero of=2GB.img bs=1M count=2000
dd: writing '2GB.img': No space left on device
1304+0 records in
1302+1 records out

$ ls -ahl
total 1334036
drwxr-xr-x    2 root     root        4.0K Jul 19 07:32 .
drwxr-xr-x    1 root     root        4.0K Jul 19 06:58 ..
-rw-r--r--    1 root     root        1.3G Jul 19 07:32 2GB.img
```

At this point you cannot reboot in the OS,  but you can reboot via Virtualbox:

```
$ shutdown -h now
Failed to write to log, write /var/log/boot/shutdown.log: no space left on device
[            ] shutdown:info: Setting shutdown timeout to 60 (rancher.shutdown_timeout set to 60)
Failed to write to log, write /var/log/boot/shutdown.log: no space left on device
Failed to write to log, write /var/log/boot/shutdown.log: no space left on device
.[            ] shutdown:fatal: Error response from daemon: {"message":"mkdir /var/lib/system-docker/overlay2/7c7dffbed40e7b0ed4c68d5630b17a179751643ca7b7a4ac183e48a767071684-init: no space left on device"}
Failed to write to log, write /var/log/boot/shutdown.log: no space left on device
```

After rebooting, you will not be able to enter the OS and there will be a kernel panic.

![](https://ws1.sinaimg.cn/mw1024/006tNc79ly1ftf8071p5sj31kw0s14or.jpg)

### Boot with recovery console

When you can access the bootloader, you should select the `Recovery console` and  press `<Tab>` to edit:

![](https://ws3.sinaimg.cn/mw1024/006tNc79ly1ftf7mpir3fj312u0i4a9z.jpg)

You need add `rancher.autologin=tty1` to the end, then press `<Enter>`. If all goes well, you will automatically login to the recovery console.

### How to recover

We need to mount the root disk in the recovery console and delete some data:

```
$ mkdir /mnt/root-disk
$ mount /dev/sda1 /mnt/root-disk

# delete data previously generated using dd
$ ls -ahl /mnt/root-disk/opt
-rw-r--r--    1 root     root        1.3G Jul 19 07:32 2GB.img
$ rm -f /mnt/root-disk/opt/2GB.img
```

After rebooting, you can enter the OS normally.

