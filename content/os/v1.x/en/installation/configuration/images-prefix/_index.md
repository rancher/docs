---
title: Images prefix
weight: 121
---

_Available as of v1.3_

When you have built your own docker registries, and have cached the `rancher/os` and other `os-services` images,
something like a normal `docker pull rancher/os` can be cached as `docker pull dockerhub.mycompanyname.com/docker.io/rancher/os`.

However, you need a way to inject a prefix into RancherOS for installation or service pulls.
RancherOS supports a global prefix you can add to force ROS to always use your mirror.

You can config a global image prefix:

```
ros config set rancher.environment.REGISTRY_DOMAIN xxxx.yyy

```

Then you check the os list:

```
$ ros os list
xxxx.yyy/rancher/os:v1.3.0 remote latest running
xxxx.yyy/rancher/os:v1.2.0 remote available
...
...
```

Also you can check consoles:

```
$ ros console switch ubuntu
Switching consoles will
1. destroy the current console container
2. log you out
3. restart Docker
Continue [y/N]: y
Pulling console (xxxx.yyy/rancher/os-ubuntuconsole:v1.3.0)...
...
```

If you want to reset this setting:

```
ros config set rancher.environment.REGISTRY_DOMAIN docker.io
```
