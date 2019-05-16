---
title: How to update microcode
weight: 306
---

Processor manufacturers release stability and security updates to the processor microcode. 
While microcode can be updated through the BIOS, the Linux kernel is also able to apply these updates. 
These updates provide bug fixes that can be critical to the stability of your system. 
Without these updates, you may experience spurious crashes or unexpected system halts that can be difficult to track down.

The microcode loader supports three loading methods:

- Early load microcode
- Late loading
- Builtin microcode

You can get more details from [here](https://www.kernel.org/doc/html/latest/x86/microcode.html).

RancherOS can support `Late loading`, here are the steps to update Intel microcode, you can refer to:

```
# we can get the latest intel microcode, such as https://downloadcenter.intel.com/download/28087/Linux-Processor-Microcode-Data-File?v=t
# then we need to copy data files to firmware dir
mkdir -p /lib/firmware/intel-ucode/
cp -v intel-ucode/* /lib/firmware/intel-ucode/

# reload the microcode
# this file does not exist if you are running ROS on the hypervisor
# usually, the VM does not need to update the microcode.
echo 1 > /sys/devices/system/cpu/microcode/reload

# check the result
dmesg | grep microcode
[   13.659429] microcode: sig=0x306f2, pf=0x1, revision=0x36
[   13.665981] microcode: Microcode Update Driver: v2.01 <tigran@aivazian.fsnet.co.uk>, Peter Oruba
[  510.899733] microcode: updated to revision 0x3b, date = 2017-11-17
```

You can use `runcmd` to reload microcode every boot:

```
runcmd:
- echo 1 > /sys/devices/system/cpu/microcode/reload
```
