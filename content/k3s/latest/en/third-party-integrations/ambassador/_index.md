---
title: Deploying the Ambassador Ingress Controller
weight: 2
---

[Ambassador](https://www.getambassador.io/) provides all the functionality of a traditional Ingress controller (i.e., path-based routing) while exposing many additional capabilities such as authentication, URL rewriting, CORS, rate limiting and automatic metrics collection.

The Ambassador ingress controller will use ports 80 and 443 on the host (i.e. these will not be usable for HostPort or NodePort).

### Installing Ambassador

1. First, disable Traefik to avoid port conflicts by starting the server with `--no-deploy traefik` option.
2. Install Ambassador by following the instructions [here](https://www.getambassador.io/docs/latest/topics/install/install-ambassador-oss/).

Read the [official documentation](https://www.getambassador.io/docs/latest/topics/running/ingress-controller/) on how to configure and use Ambassador as an ingress controller.