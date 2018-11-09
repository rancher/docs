---
title: How to custom partition layout
weight: 305
---

When users use the default `ros install`, ROS will automatically create one partition on the root disk.
It will be the only partition with the label RANCHER_STATE.
But sometimes users want to be able to customize the root disk partition to isolate the data.

> The following defaults to MBR mode, GPT mode has not been tested.

### Use RANCHER_STATE partition

As mentioned above, the default mode is that ROS will automatically create one partition with the label RANCHER_STATE.

In addition, we can have other partitions, e.g.: two partitions, one is RANCHER_STATE and the other is a normal partition.

First boot a ROS instance from ISO, then manually format and partition `/dev/sda` , the reference configuration is as follows:

```
[root@rancher oem]# fdisk -l
Disk /dev/sda: 5 GiB, 5377622016 bytes, 10503168 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x9fff87e9

Device     Boot   Start      End Sectors  Size Id Type
/dev/sda1  *       2048  7503167 7501120  3.6G 83 Linux
/dev/sda2       7503872 10503167 2999296  1.4G 83 Linux

[root@rancher oem]# blkid
/dev/sda1: LABEL="RANCHER_STATE" UUID="512f212b-3130-458e-a2d1-1d601c34d4e4" TYPE="ext4" PARTUUID="9fff87e9-01"
/dev/sda2: UUID="3828e3ac-b825-4898-9072-45da9d37c2a6" TYPE="ext4" PARTUUID="9fff87e9-02"
```

Then install ROS to the disk with `ros install -t noformat -d /dev/sda ...`.

After rebooting, you can use `/dev/sda2`. For example, changing the data root of user-docker:

```
$ ros config set mounts '[["/dev/sda2","/mnt/s","ext4",""]]’
$ ros config set rancher.docker.graph /mnt/s
$ reboot
```

> In this mode, the RANCHER_STATE partition capacity cannot exceed 3.8GiB, otherwise the bootloader may not recognize the boot disk. This is the test result on VirtualBox.

### Use RANCHER_BOOT partition

When you only use the RANCHER_STATE partition, the bootloader will be installed in the `/boot` directory.

```
$ system-docker run -it --rm -v /:/host alpine
ls /host/boot
...
```

If you want to use a separate boot partition, you also need to boot a ROS instance from ISO, then manually format and partition `/dev/sda`:

```
[root@rancher rancher]# fdisk -l
Disk /dev/sda: 5 GiB, 5377622016 bytes, 10503168 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xe32b3025

Device     Boot   Start      End Sectors  Size Id Type
/dev/sda1          2048  2503167 2501120  1.2G 83 Linux
/dev/sda2       2504704  7503167 4998464  2.4G 83 Linux
/dev/sda3       7503872 10503167 2999296  1.4G 83 Linux

[root@rancher rancher]# mkfs.ext4 -L RANCHER_BOOT /dev/sda1
[root@rancher rancher]# mkfs.ext4 -L RANCHER_STATE /dev/sda2
[root@rancher rancher]# mkfs.ext4 /dev/sda3

[root@rancher rancher]# blkid
/dev/sda1: LABEL="RANCHER_BOOT" UUID="43baeac3-11f3-4eed-acfa-64daf66b26c8" TYPE="ext4" PARTUUID="e32b3025-01"
/dev/sda2: LABEL="RANCHER_STATE" UUID="16f1ecef-dbe4-42a2-87a1-611939684e0b" TYPE="ext4" PARTUUID="e32b3025-02"
/dev/sda3: UUID="9f34e161-0eee-48f9-93de-3b7c54dea437" TYPE="ext4" PARTUUID="c9b8f181-03"
```

Then install ROS to the disk with `ros install -t noformat -d /dev/sda ...`.

After rebooting, you can check the boot partition:

```
[root@rancher rancher]# mkdir /boot
[root@rancher rancher]# mount /dev/sda1 /boot
[root@rancher rancher]# ls -ahl /boot/
total 175388
drwxr-xr-x    4 root     root        4.0K Sep 27 03:35 .
drwxr-xr-x    1 root     root        4.0K Sep 27 03:38 ..
-rw-r--r--    1 root     root          24 Sep 27 03:05 append
-rw-r--r--    1 root     root         128 Sep 27 03:35 global.cfg
-rw-r--r--    1 root     root       96.8M Sep 27 03:05 initrd
```

If you are not using the first partition as a BOOT partition, you need to set BOOT flag via the fdisk tool.

> In this mode, the RANCHER_BOOT partition capacity cannot exceed 3.8GiB, otherwise the bootloader may not recognize the boot disk. This is the test result on VirtualBox.

### Use RANCHER_OEM partition

If you format any partition with the label RANCHER_OEM, ROS will mount this partition to `/usr/share/ros/oem`:

```
[root@rancher rancher]# blkid
/dev/sda2: LABEL="RANCHER_OEM" UUID="4f438455-63a3-4d29-ac90-50adbeced412" TYPE="ext4" PARTUUID="9fff87e9-02"

[root@rancher rancher]# df -hT | grep sda2
/dev/sda2            ext4            1.4G      4.3M      1.3G   0% /usr/share/ros/oem
```

Currently, this OEM directory is hardcoded and not configurable.

### Use RANCHER_SWAP partition

Suppose you have a partition(`/dev/sda2`) and you want to use it as a SWAP partition:

```
$ mkswap -L RANCHER_SWAP /dev/sda2

$ blkid
/dev/sda1: LABEL="RANCHER_STATE" UUID="512f212b-3130-458e-a2d1-1d601c34d4e4" TYPE="ext4" PARTUUID="9fff87e9-01"
/dev/sda2: LABEL="RANCHER_SWAP" UUID="772b6e76-f89c-458e-931e-10902d78d3e4" TYPE="swap" PARTUUID="9fff87e9-02"
```

After you install ROS to the disk, you can add the `runcmd` to enable SWAP:

```
runcmd:
- swapon -L RANCHER_SWAP
```

Then check the memory information:

```
[root@rancher rancher]# free -m
            total       used       free     shared    buffers     cached
Mem:          1996        774       1221        237         20        614
-/+ buffers/cache:        139       1856
Swap:          487          0        487
```
