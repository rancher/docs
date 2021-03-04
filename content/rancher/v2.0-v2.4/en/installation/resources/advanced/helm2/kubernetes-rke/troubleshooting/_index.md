---
title: Troubleshooting
weight: 276
aliases:
  - /rancher/v2.0-v2.4/en/installation/options/helm2/kubernetes-rke/troubleshooting
---

### canal Pods show READY 2/3

The most common cause of this issue is port 8472/UDP is not open between the nodes. Check your local firewall, network routing or security groups.

Once the network issue is resolved, the `canal` pods should timeout and restart to establish their connections.

### nginx-ingress-controller Pods show RESTARTS

The most common cause of this issue is the `canal` pods have failed to establish the overlay network. See [canal Pods show READY `2/3`](#canal-pods-show-ready-2-3) for troubleshooting.

### Failed to set up SSH tunneling for host [xxx.xxx.xxx.xxx]: Can't retrieve Docker Info

#### Failed to dial to /var/run/docker.sock: ssh: rejected: administratively prohibited (open failed)

* User specified to connect with does not have permission to access the Docker socket. This can be checked by logging into the host and running the command `docker ps`:

```
$ ssh user@server
user@server$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
```

See [Manage Docker as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user) how to set this up properly.

* When using RedHat/CentOS as operating system, you cannot use the user `root` to connect to the nodes because of [Bugzilla #1527565](https://bugzilla.redhat.com/show_bug.cgi?id=1527565). You will need to add a separate user and configure it to access the Docker socket. See [Manage Docker as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user) how to set this up properly.

* SSH server version is not version 6.7 or higher. This is needed for socket forwarding to work, which is used to connect to the Docker socket over SSH. This can be checked using `sshd -V` on the host you are connecting to, or using netcat:
```
$ nc xxx.xxx.xxx.xxx 22
SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.10
```

#### Failed to dial ssh using address [xxx.xxx.xxx.xxx:xx]: Error configuring SSH: ssh: no key found

* The key file specified as `ssh_key_path` cannot be accessed. Make sure that you specified the private key file (not the public key, `.pub`), and that the user that is running the `rke` command can access the private key file.

#### Failed to dial ssh using address [xxx.xxx.xxx.xxx:xx]: ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey], no supported methods remain

* The key file specified as `ssh_key_path` is not correct for accessing the node. Double-check if you specified the correct `ssh_key_path` for the node and if you specified the correct user to connect with.

#### Failed to dial ssh using address [xxx.xxx.xxx.xxx:xx]: Error configuring SSH: ssh: cannot decode encrypted private keys

* If you want to use encrypted private keys, you should use `ssh-agent` to load your keys with your passphrase. If the `SSH_AUTH_SOCK` environment variable is found in the environment where the `rke` command is run, it will be used automatically to connect to the node.

#### Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

* The node is not reachable on the configured `address` and `port`.
