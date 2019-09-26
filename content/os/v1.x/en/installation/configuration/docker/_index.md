---
title: Configuring Docker or System Docker
weight: 126
---

In RancherOS, you can configure System Docker and Docker daemons by using [cloud-config]({{< baseurl >}}/os/v1.x/en/installation/configuration/#cloud-config).

### Configuring Docker

In your cloud-config, Docker configuration is located under the `rancher.docker` key.

```yaml
#cloud-config
rancher:
  docker:
    tls: true
    tls_args:
      - "--tlsverify"
      - "--tlscacert=/etc/docker/tls/ca.pem"
      - "--tlscert=/etc/docker/tls/server-cert.pem"
      - "--tlskey=/etc/docker/tls/server-key.pem"
      - "-H=0.0.0.0:2376"
    storage_driver: overlay
```

You can also customize Docker after it's been started using `ros config`.

```
$ sudo ros config set rancher.docker.storage_driver overlay
```

#### User Docker settings

Many of the standard Docker daemon arguments can be placed under the `rancher.docker` key. The command needed to start the Docker daemon will be generated based on these arguments. The following arguments are currently supported.

Key | Value
---|---
`bridge` | String
`bip` | String
`config_file` | String
`containerd` | String
`debug` | Boolean
`exec_root` | String
`group` | String
`graph` | String
`host` | List
`insecure_registry` | List
`live_restore` | Boolean
`log_driver` | String
`log_opts` | Map where keys and values are strings
`pid_file` | String
`registry_mirror` | String
`restart` | Boolean
`selinux_enabled` | Boolean
`storage_driver` | String
`userland_proxy` | Boolean

In addition to the standard daemon arguments, there are a few fields specific to RancherOS.

Key | Value | Default | Description
---|---|---| ---
`extra_args` | List of Strings | `[]` | Arbitrary daemon arguments, appended to the generated command
`environment` | List of Strings | `[]` |
`tls` | Boolean | `false` | When [setting up TLS]({{< baseurl >}}/os/v1.x/en/installation/configuration/setting-up-docker-tls/), this key needs to be set to true.
`tls_args` | List of Strings (used only if `tls: true`) | `[]` |
`server_key` | String (used only if `tls: true`)| `""` | PEM encoded server TLS key.
`server_cert` | String (used only if `tls: true`) | `""` | PEM encoded server TLS certificate.
`ca_key` | String (used only if `tls: true`) | `""` | PEM encoded CA TLS key.
`storage_context` | String | `console` | Specifies the name of the system container in whose context to run the Docker daemon process.

#### Example using extra_args for setting MTU

The following example can be used to set MTU on the Docker daemon:

```yaml
#cloud-config
rancher:
  docker:
    extra_args: [--mtu, 1460]
```

#### Example using bip for docker0 bridge

_Available as of v1.4.x_

The docker0 bridge can be configured with docker args, it will take effect after reboot.

```
$ ros config set rancher.docker.bip 192.168.0.0/16
```

### Configuring System Docker

In your cloud-config, System Docker configuration is located under the `rancher.system_docker` key.

```yaml
#cloud-config
rancher:
  system_docker:
    storage_driver: overlay
```

#### System Docker settings

All daemon arguments shown in the first table are also available to System Docker. The following are also supported.

Key | Value | Default | Description
---|---|---| ---
`extra_args` | List of Strings | `[]` | Arbitrary daemon arguments, appended to the generated command
`environment` | List of Strings (optional) | `[]` |

_Available as of v1.4.x_

The docker-sys bridge can be configured with system-docker args, it will take effect after reboot.

```
$ ros config set rancher.system_docker.bip 172.19.0.0/16
```

_Available as of v1.4.x_

The default path of system-docker logs is `/var/log/system-docker.log`. If you want to write the system-docker logs to a separate partition, 
e.g. [RANCHE_OEM partition]({{< baseurl >}}/os/v1.x/en/about/custom-partition-layout/#use-rancher-oem-partition), you can try `rancher.defaults.system_docker_logs`:

```
#cloud-config
rancher:
  defaults:
    system_docker_logs: /usr/share/ros/oem/system-docker.log
```

### Using a pull through registry mirror

There are 3 Docker engines that can be configured to use the pull-through Docker Hub registry mirror cache:

```
#cloud-config
rancher:
  bootstrap_docker:
    registry_mirror: "http://10.10.10.23:5555"
  docker:
    registry_mirror: "http://10.10.10.23:5555"
  system_docker:
    registry_mirror: "http://10.10.10.23:5555"
```

`bootstrap_docker` is used to prepare and initial network and pull any cloud-config options that can be used to configure the final network configuration and System-docker - its very unlikely to pull any images.

A successful pull through mirror cache request by System-docker looks like:

```
[root@rancher-dev rancher]# system-docker pull alpine
Using default tag: latest
DEBU[0201] Calling GET /v1.23/info
> WARN[0201] Could not get operating system name: Error opening /usr/lib/os-release: open /usr/lib/os-release: no such file or directory
WARN[0201] Could not get operating system name: Error opening /usr/lib/os-release: open /usr/lib/os-release: no such file or directory
DEBU[0201] Calling POST /v1.23/images/create?fromImage=alpine%3Alatest
DEBU[0201] hostDir: /etc/docker/certs.d/10.10.10.23:5555
DEBU[0201] Trying to pull alpine from http://10.10.10.23:5555/ v2
DEBU[0204] Pulling ref from V2 registry: alpine:latest
DEBU[0204] pulling blob "sha256:2aecc7e1714b6fad58d13aedb0639011b37b86f743ba7b6a52d82bd03014b78e" latest: Pulling from library/alpine
DEBU[0204] Downloaded 2aecc7e1714b to tempfile /var/lib/system-docker/tmp/GetImageBlob281102233 2aecc7e1714b: Extracting  1.99 MB/1.99 MB
DEBU[0204] Untar time: 0.161064213s
DEBU[0204] Applied tar sha256:3fb66f713c9fa9debcdaa58bb9858bd04c17350d9614b7a250ec0ee527319e59 to 841c99a5995007d7a66b922be9bafdd38f8090af17295b4a44436ef433a2aecc7e1714b: Pull complete
Digest: sha256:0b94d1d1b5eb130dd0253374552445b39470653fb1a1ec2d81490948876e462c
Status: Downloaded newer image for alpine:latest
```

### Using Multiple User Docker Daemons

_Available as of v1.5.0_

When RancherOS is booted, you start with a User Docker service that is running in System Docker. With v1.5.0, RancherOS has the ability to create additional User Docker services that can run at the same time. 

#### Terminology

Throughout the rest of this documentation, we may simplify to use these terms when describing Docker. 

| Terminology                  | Definition                                       |
|-----------------------|--------------------------------------------------|
| DinD                  |  Docker in docker  |
| User Docker     |  The user-docker on RancherOS |
| Other User Docker|  The other user-docker daemons you create, these user-docker daemons are automatically assumed to be Docker in Docker.  |

#### Pre-Requisites

User Docker must be set as Docker 17.12.1 or earlier. If it's a later Docker version, it will produce errors when creating a user defined network in System Docker. 

```
$ ros engine switch docker-17.12.1-ce
```

You will need to create a user-defined network, which will be used when creating the Other User Docker. 

```
$ system-docker network create --subnet=172.20.0.0/16 dind
```

#### Create the Other User Docker

In order to create another User Docker, you will use `ros engine create`. Currently, RancherOS only supports Docker `17.12.1` and `18.03.1` for the Other User Docker image.

```
$ ros engine create otheruserdockername --network=dind --fixed-ip=172.20.0.2
```

After the Other User Docker service is created, users can query this service like other services. 

```
$ ros service list
...
...
disabled volume-efs
disabled volume-nfs
enabled  otheruserdockername
```

You can use `ros service up` to start the Other User Docker service.  

```
$ ros service up otheruserdockername
```

After the Other User Docker service is running, you can interact with it just like you can use the built-in User Docker. You would need to append `-<SERVICE_NAME>` to `docker`. 

```
$ docker-otheruserdockername ps -a
```

#### SSH into the Other User Docker container

When creating the Other User Docker, you can set an external SSH port so you can SSH into the Other User Docker container in System Docker. By using `--ssh-port` and adding ssh keys with `--authorized-keys`, you can set up this optional SSH port. 

```
$ ros engine create  --help
...
...
OPTIONS:
    --ssh-port value
    --authorized-keys value
```

When using `--authorized-keys`, you will need to put the key file in one of the following directories:

```
/var/lib/rancher/
/opt/
/home/
```

RancherOS will generate a random password for each Other User Docker container, which can be viewed in the container logs. If you do not set any SSH keys, the password can be used. 

```
$ system-docker logs otheruserdockername

======================================
chpasswd: password for 'root' changed
password: xCrw6fEG
======================================
```

In System Docker, you can SSH into any Other Uesr Docker Container using `ssh`. 

```
$ system-docker ps
CONTAINER ID        IMAGE                              COMMAND                  CREATED             STATUS              PORTS                             NAMES
2ca07a25799b        rancher/os-dind:17.12.1          "docker-entrypoint..."   5 seconds ago       Up 3 seconds        2375/tcp, 0.0.0.0:34791->22/tcp   otheruserdockername

$ ssh -p 34791 root@<HOST_EXTERNAL_IP>

$ ssh root@<OTHERUSERDOCKER_CONTAINER_IP>

```

#### Removing any Other User Docker Service

We recommend using `ros engine rm` to remove any Other User Docker service. 

```
$ ros engine rm otheruserdockername
```
