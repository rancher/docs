---
title: Disabling access to system
weight: 136
---
_Available as of v1.5_

At the moment, you can set `rancher.password` and `auto-login` to the system.
In some environments it is required to disable these methods.
This can be achieved by:

- Option to ignore rancher.password kernel param.

- Option to disable auto-login.

### Ignoring `rancher.password` kernel param

You can use `ros` command or `cloud-config` file to ignore `rancher.passowrd` kernel param. 

ros command: `sudo ros config set rancher.disable ["password"]`

cloud-config file:

```yaml
# cloud-config
rancher:
  disable:
  - password
```

### Disabling `autologin`

You can use `ros` command or `cloud-config` file to disable auto-login.

ros command: `sudo ros config set rancher.disable ["autologin"]`

cloud-config file:

```yaml
# cloud-config
rancher:
  disable:
  - autologin
```
