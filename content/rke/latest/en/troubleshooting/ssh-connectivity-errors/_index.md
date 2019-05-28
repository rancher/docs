---
title: SSH Connectivity Errors
weight: 100
aliases:
- /rancher/v2.x/en/installation/ha/rke-add-on/troubleshooting/ssh-tunneling/

---

### Failed to set up SSH tunneling for host [xxx.xxx.xxx.xxx]: Can't retrieve Docker Info

#### Failed to dial to /var/run/docker.sock: ssh: rejected: administratively prohibited (open failed)

* User specified to connect with does not have permission to access the Docker socket. This can be checked by logging into the host and running the command `docker ps`:

```
$ ssh -i ssh_privatekey_file user@server
user@server$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
```

See [Manage Docker as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user) how to set this up properly.

* When using RedHat/CentOS as operating system, you cannot use the user `root` to connect to the nodes because of [Bugzilla #1527565](https://bugzilla.redhat.com/show_bug.cgi?id=1527565). You will need to add a separate user and configure it to access the Docker socket. See [RKE OS Requirements](https://rancher.com/docs/rke/latest/en/os/#red-hat-enterprise-linux-rhel-oracle-enterprise-linux-oel-centos) for more on how to set this up.                                                                                                                              

* SSH server version is not version 6.7 or higher. This is needed for socket forwarding to work, which is used to connect to the Docker socket over SSH. This can be checked using `sshd -V` on the host you are connecting to, or using netcat:
```
$ nc xxx.xxx.xxx.xxx 22
SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.10
```

#### Failed to dial ssh using address [xxx.xxx.xxx.xxx:xx]: Error configuring SSH: ssh: no key found

* The key file specified as `ssh_key_path` cannot be accessed. Make sure that you specified the private key file (not the public key, `.pub`), and that the user that is running the `rke` command can access the private key file.
* The key file specified as `ssh_key_path` is malformed. Check if the key is valid by running `ssh-keygen -y -e -f private_key_file`. This will print the public key of the private key, which will fail if the private key file is not valid.

#### Failed to dial ssh using address [xxx.xxx.xxx.xxx:xx]: ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey], no supported methods remain

* The key file specified as `ssh_key_path` is not correct for accesing the node. Double-check if you specified the correct `ssh_key_path` for the node and if you specified the correct user to connect with.

#### Failed to dial ssh using address [xxx.xxx.xxx.xxx:xx]: Error configuring SSH: ssh: cannot decode encrypted private keys

* If you want to use encrypted private keys, you should use `ssh-agent` to load your keys with your passphrase. You can configure RKE to use that agent by specifying `--ssh-agent-auth` on the command-line, it will use the `SSH_AUTH_SOCK` environment variable in the environment where the `rke` command is run.

#### Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

* The node is not reachable on the configured `address` and `port`.
