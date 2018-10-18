---
title: RancherOS Security
weight: 303
---

<table width="100%">
<tr style="vertical-align: top;">
<td width="30%" style="border: none;">
<h4>Security policy</h4>
<p style="padding: 8px">Rancher Labs supports responsible disclosure, and endeavours to resolve all issues in a reasonable time frame. RancherOS is a minimal Linux distribution, built with entirely using open source components.</p>
</td>
<td width="30%" style="border: none;">
<h4>Reporting process</h4>
<p style="padding: 8px">Please submit possible security issues by emailing <a href="mailto:security@rancher.com">security@rancher.com</a></p>
</td>
<td width="30%" style="border: none;">
<h4>Announcments</h4>
<p style="padding: 8px">Subscribe to the <a href="https://forums.rancher.com/c/announcements">Rancher announcements forum</a> for release updates.</p>
</td>
</tr>
</table>

### RancherOS Vulnerabilities

| ID | Description | Date | Resolution |
|----|-------------|------|------------|
| [CVE-2017-6074](http://seclists.org/oss-sec/2017/q1/471) | Local privilege-escalation using a user after free issue in [Datagram Congestion Control Protocol (DCCP)](https://wiki.linuxfoundation.org/networking/dccp). DCCP is built into the RancherOS kernel as a dynamically loaded module, and isn't loaded by default. | 17 Feb 2017 | [RancherOS v0.8.1](https://github.com/rancher/os/releases/tag/v0.8.1) using a [patched 4.9.12 Linux kernel](https://github.com/rancher/os-kernel/releases/tag/v4.9.12-rancher) |
| [CVE-2017-7184](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-7184) | Allows local users to obtain root privileges or cause a denial of service (heap-based out-of-bounds access) by leveraging the CAP_NET_ADMIN capability. | 3 April 2017 | [RancherOS v0.9.2-rc1](https://github.com/rancher/os/releases/tag/v0.9.2-rc1) using Linux 4.9.20 |
| [CVE-2017-1000364](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-1000364) | Linux Kernel is prone to a local memory-corruption vulnerability. Attackers may be able to exploit this issue to execute arbitrary code with elevated privileges | 19 June 2017 | [RancherOS v1.0.3](https://github.com/rancher/os/releases/tag/v1.0.3) |
| [CVE-2017-1000366](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-1000366) | glibc contains a vulnerability that allows manipulation of the heap/stack. Attackers may be able to exploit this issue to execute arbitrary code with elevated privileges | 19 June 2017 | [RancherOS v1.0.3](https://github.com/rancher/os/releases/tag/v1.0.3) |
| [CVE-2017-1000405](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-1000405) | The Linux Kernel versions 2.6.38 through 4.14 have a problematic use of pmd_mkdirty() in the touch_pmd() function inside the THP implementation. touch_pmd() can be reached by get_user_pages(). In such case, the pmd will become dirty. | 10 Dec 2017 | [RancherOS v1.1.1](https://github.com/rancher/os/releases/tag/v1.1.1) |
| [CVE-2017-5754](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-5754) | Systems with microprocessors utilizing speculative execution and indirect branch prediction may allow unauthorized disclosure of information to an attacker with local user access via a side-channel analysis of the data cache. | 5 Jan 2018 | [RancherOS v1.1.3](https://github.com/rancher/os/releases/tag/v1.1.3) using Linux v4.9.75 |
| [CVE-2017-5715](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-5715) | Systems with microprocessors utilizing speculative execution and indirect branch prediction may allow unauthorized disclosure of information to an attacker with local user access via a side-channel analysis | 6 Feb 2018 | [RancherOS v1.1.4](https://github.com/rancher/os/releases/tag/v1.1.4) using Linux v4.9.78 with the Retpoline support |
| [CVE-2017-5753](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-5753) | Systems with microprocessors utilizing speculative execution and branch prediction may allow unauthorized disclosure of information to an attacker with local user access via a side-channel analysis. | 31 May 2018 | [RancherOS v1.4.0](https://github.com/rancher/os/releases/tag/v1.4.0) using Linux v4.14.32 |
| [CVE-2018-8897](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-8897) | A statement in the System Programming Guide of the Intel 64 and IA-32 Architectures Software Developer's Manual (SDM) was mishandled in the development of some or all operating-system kernels, resulting in unexpected behavior for #DB exceptions that are deferred by MOV SS or POP SS, as demonstrated by (for example) privilege escalation in Windows, macOS, some Xen configurations, or FreeBSD, or a Linux kernel crash.  | 31 May 2018 | [RancherOS v1.4.0](https://github.com/rancher/os/releases/tag/v1.4.0) using Linux v4.14.32 |
| [L1 Terminal Fault](https://www.kernel.org/doc/html/latest/admin-guide/l1tf.html) | L1 Terminal Fault is a hardware vulnerability which allows unprivileged speculative access to data which is available in the Level 1 Data Cache when the page table entry controlling the virtual address, which is used for the access, has the Present bit cleared or other reserved bits set. | 19 Sep 2018 | [RancherOS v1.4.1](https://github.com/rancher/os/releases/tag/v1.4.1) using Linux v4.14.67 |
| [CVE-2018-3639](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-3639) | Systems with microprocessors utilizing speculative execution and speculative execution of memory reads before the addresses of all prior memory writes are known may allow unauthorized disclosure of information to an attacker with local user access via a side-channel analysis, aka Speculative Store Bypass (SSB), Variant 4. | 19 Sep 2018 | [RancherOS v1.4.1](https://github.com/rancher/os/releases/tag/v1.4.1) using Linux v4.14.67 |
| [CVE-2018-17182](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-17182) | The vmacache_flush_all function in mm/vmacache.c mishandles sequence number overflows. An attacker can trigger a use-after-free (and possibly gain privileges) via certain thread creation, map, unmap, invalidation, and dereference operations. | 18 Oct 2018 | [RancherOS v1.4.2](https://github.com/rancher/os/releases/tag/v1.4.2) using Linux v4.14.73 |
