---
title: FAQ
weight: 60
---

The FAQ is updated periodically and designed to answer the questions our users most frequently ask about k3s.

**Is k3s a suitable replacement for k8s?**

k3s is capable of nearly everything k8s can do. It is just a more lightweight version. See the [main]({{<baseurl>}}/k3s/latest/en/) docs page for more details.

**How can I use my own Ingress instead of Traefik?**

Simply start k3s server with `--no-deploy=traefik` and deploy your ingress.

**Does k3s support Windows?**

At this time k3s does not natively support Windows, however we are open to the idea in the future.
