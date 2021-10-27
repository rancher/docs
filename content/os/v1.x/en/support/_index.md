---
title: Support
weight: 170
---

## RancherOS: 2020 and Beyond

### Development Status

RancherOS v1.x is currently in a maintain-only-as-essential mode. That is to say, it is no longer being actively maintained at a code level other than addressing critical or security fixes. There are two significant reasons behind this product decision:

**1. Docker:**  The current industry requirements for a container runtime are very much evolving. Container runtimes like containerd and CRIO are now being actively considered as the default choices. RancherOS 1.x, which  was specifically designed around using Docker engine only, unfortunately does not lend itself, in its current design, to this new evolving requirement. To address this situation, we at Rancher Labs are currently working on new technologies such as [K3OS](https://k3os.io/) that leverage K3s constructs built on containerd. When done, it is a desired outcome for us to be able to offer K3OS as a RancherOS 2.0 alternate.

**2. ISV Support:** RancherOS was specifically designed as a minimalistic OS to support purpose-built containerized applications. It was not designed to be used as a general purpose OS (such as CentOS or Ubuntu). As such, most ISVs have not certified their software to run on RancherOS, nor does RancherOS even contain the necessary components for many of these applications to run. For the K3OS project, our outlook is to investigate the viability of technologies like [AWS Bottlerocket](https://aws.amazon.com/bottlerocket/) that can be used as the default general purpose OS and leverage its ecosystem of compatible ISVs.

### Support Status

**For customers with a currently active support subscription for RancherOS:**

- Commercial support continues to be available until the subscription term end date, per our terms of service described [here](https://rancher.com/support-maintenance-terms/). Upon term end date, currently active subscriptions shall not be available for renewal toward a new term, for reasons cited in the [Development Status](#development-status) section above.

**For Rancher (1.x and 2.x) customers without a separate and currently active subscription for Rancher OS:**

- Any assistance from Rancher Support on RancherOS topics filed as support tickets are not SLA-bound and shall be available on a best-effort basis only.