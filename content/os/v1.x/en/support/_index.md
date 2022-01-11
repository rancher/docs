---
title: Support
weight: 170
---

## Development and Maintenance Status


RancherOS 1.x is no longer being actively maintained. There are two significant reasons behind this product decision:

**1. Docker:**  The current industry requirements for a container runtime are very much evolving. Container runtimes like containerd and CRIO are now being actively considered as the default choices. RancherOS 1.x, which was specifically designed around using Docker engine only, unfortunately does not lend itself, in its current design, to this new evolving requirement.

**2. ISV Support:** RancherOS was specifically designed as a minimalistic OS to support purpose-built containerized applications. It was not designed to be used as a general purpose OS (such as CentOS or Ubuntu). As such, most ISVs have not certified their software to run on RancherOS, nor does RancherOS even contain the necessary components for many of these applications to run.

We're working on a replacement. Stay tuned!