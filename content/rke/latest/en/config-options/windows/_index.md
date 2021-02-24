---
title: Windows Specific Configuration
weight: 20
---

RKE provides Windows specific configuration options for the RKE `cluster.yaml`.

These options are intended to solve a problem in which Linux and Windows nodes may need different configuration options. When building a hybrid cluster with Windows nodes, there is only a single set of overrides you can use per service. This limits configuring the node as service args, and the `prefix_path` sometimes needs to be specific for each OS. 

Four `win_` prefixed parameters are available:

| Scope | RKE Directive for Linux Nodes | RKE Directive for Windows Nodes |
|===============|==========|===========|
|    cluster             | `prefix_path` |    `win_prefix_path` |
| service |   `extra_args`  |   `win_extra_args`  |
| service |  `extra_binds`   |  `win_extra_binds`   |
| service |   `extra_env`  |    `win_extra_env` |

The following example shows cluster level binds for `prefix_path`:

```yaml
# cluster.yaml
prefix_path: /opt/custom_path
win_prefix_path: 'c:\host\opt'
```

If you set the `win_` prefixed params, you will need to duplicate the params for both Linux and Windows in your RKE `cluster.yaml`. The following examples shows  duplicated service level binds for Linux and Windows nodes:

```yaml
# cluster.yaml
extra_args:
  max-pods: 122
extra_binds:
  - '/opt:/test'
extra_env:
  - "t1=v1"
win_extra_args:
  max-pods: '120'
win_extra_binds:
  - 'c:/:c:/test'
win_extra_env:
  - test=value
```