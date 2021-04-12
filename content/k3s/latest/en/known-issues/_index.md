---
title: Known Issues
weight: 70
---
The Known Issues are updated periodically and designed to inform you about any issues that may not be immediately addressed in the next upcoming release.

**Snap Docker**

If you plan to use K3s with docker, Docker installed via a snap package is not recommended as it has been known to cause issues running K3s.

**Iptables**

If you are running iptables in nftables mode instead of legacy you might encounter issues. We recommend utilizing newer iptables (such as 1.6.1+) to avoid issues.

**RootlessKit**

Running K3s with RootlessKit is experimental and has several [known issues.]({{<baseurl>}}/k3s/latest/en/advanced/#known-issues-with-rootlesskit)

**Ufw**

UFW firewall rules are evaluated prior to the kube-proxy rules, so traffic to cluster services can be blocked. Traffic from the service and pod networks should be allowed in ufw to ensure that the kube-proxy rules are evaluated. Given the default values, the following will allow traffic from those network through the ufw portion, before reaching the kube-proxy rules.

```
sudo ufw allow from 10.42.0.0/16 to any
sudo ufw allow from 10.43.0.0/16 to any
```
