---
title: "Advanced Options"
weight: 3
aliases:
  - /rancher.com/docs/k3s/latest/en/running/
---

This section contains advanced information describing the different ways you can run and manage k3s.

Starting the Server
------------------

The installation script will auto-detect if your OS is using systemd or openrc and start the service.
When running with openrc logs will be created at `/var/log/k3s.log`, or with systemd in `/var/log/syslog` and viewed using `journalctl -u k3s`. An example of installing and auto-starting with the install script:

```bash
curl -sfL https://get.k3s.io | sh -
```

When running the server manually you should get an output similar to:

```
$ k3s server
INFO[2019-01-22T15:16:19.908493986-07:00] Starting k3s dev                             
INFO[2019-01-22T15:16:19.908934479-07:00] Running kube-apiserver --allow-privileged=true --authorization-mode Node,RBAC --service-account-signing-key-file /var/lib/rancher/k3s/server/tls/service.key --service-cluster-ip-range 10.43.0.0/16 --advertise-port 6445 --advertise-address 127.0.0.1 --insecure-port 0 --secure-port 6444 --bind-address 127.0.0.1 --tls-cert-file /var/lib/rancher/k3s/server/tls/localhost.crt --tls-private-key-file /var/lib/rancher/k3s/server/tls/localhost.key --service-account-key-file /var/lib/rancher/k3s/server/tls/service.key --service-account-issuer k3s --api-audiences unknown --basic-auth-file /var/lib/rancher/k3s/server/cred/passwd --kubelet-client-certificate /var/lib/rancher/k3s/server/tls/token-node.crt --kubelet-client-key /var/lib/rancher/k3s/server/tls/token-node.key 
Flag --insecure-port has been deprecated, This flag will be removed in a future version.
INFO[2019-01-22T15:16:20.196766005-07:00] Running kube-scheduler --kubeconfig /var/lib/rancher/k3s/server/cred/kubeconfig-system.yaml --port 0 --secure-port 0 --leader-elect=false 
INFO[2019-01-22T15:16:20.196880841-07:00] Running kube-controller-manager --kubeconfig /var/lib/rancher/k3s/server/cred/kubeconfig-system.yaml --service-account-private-key-file /var/lib/rancher/k3s/server/tls/service.key --allocate-node-cidrs --cluster-cidr 10.42.0.0/16 --root-ca-file /var/lib/rancher/k3s/server/tls/token-ca.crt --port 0 --secure-port 0 --leader-elect=false 
Flag --port has been deprecated, see --secure-port instead.
INFO[2019-01-22T15:16:20.273441984-07:00] Listening on :6443                           
INFO[2019-01-22T15:16:20.278383446-07:00] Writing manifest: /var/lib/rancher/k3s/server/manifests/coredns.yaml 
INFO[2019-01-22T15:16:20.474454524-07:00] Node token is available at /var/lib/rancher/k3s/server/node-token 
INFO[2019-01-22T15:16:20.474471391-07:00] To join node to cluster: k3s agent -s https://10.20.0.3:6443 -t ${NODE_TOKEN} 
INFO[2019-01-22T15:16:20.541027133-07:00] Wrote kubeconfig /etc/rancher/k3s/k3s.yaml
INFO[2019-01-22T15:16:20.541049100-07:00] Run: k3s kubectl                             
```

The output will likely be much longer as the agent will create a lot of logs. By default the server
will register itself as a node (run the agent).

Alpine Linux
------------

In order to pre-setup Alpine Linux you have to go through the following steps:

```bash
echo "cgroup /sys/fs/cgroup cgroup defaults 0 0" >> /etc/fstab

cat >> /etc/cgconfig.conf <<EOF
mount {
cpuacct = /cgroup/cpuacct;
memory = /cgroup/memory;
devices = /cgroup/devices;
freezer = /cgroup/freezer;
net_cls = /cgroup/net_cls;
blkio = /cgroup/blkio;
cpuset = /cgroup/cpuset;
cpu = /cgroup/cpu;
}
EOF
```

Then update **/etc/update-extlinux.conf** by adding:

```
default_kernel_opts="...  cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory"
```

Then update the config and reboot:

```bash
update-extlinux
reboot
```

After rebooting:

- download **k3s** to **/usr/local/bin/k3s**
- create an openrc file in **/etc/init.d**

Running in Docker (and docker-compose)
-----------------

[k3d](https://github.com/rancher/k3d) is a utility designed to easily run k3s in Docker. It can be installed via the [brew](https://brew.sh/) utility for MacOS.

`rancher/k3s` images are also available to run k3s server and agent from Docker.  A `docker-compose.yml` is in the root of the k3s repo that
serves as an example of how to run k3s from Docker.  To run from `docker-compose` from this repo run:

    docker-compose up --scale node=3
    # kubeconfig is written to current dir
    kubectl --kubeconfig kubeconfig.yaml get node

    NAME           STATUS   ROLES    AGE   VERSION
    497278a2d6a2   Ready    <none>   11s   v1.13.2-k3s2
    d54c8b17c055   Ready    <none>   11s   v1.13.2-k3s2
    db7a5a5a5bdd   Ready    <none>   12s   v1.13.2-k3s2

To run the agent only in Docker, use `docker-compose up node`. Alternatively the Docker run command can also be used;

    sudo docker run \
            -d --tmpfs /run \
            --tmpfs /var/run \
            -e K3S_URL=${SERVER_URL} \
            -e K3S_TOKEN=${NODE_TOKEN} \
            --privileged rancher/k3s:vX.Y.Z

Air-Gap Support
---------------

k3s supports pre-loading of containerd images by placing them in the `images` directory for the agent before starting, for example:
```sh
sudo mkdir -p /var/lib/rancher/k3s/agent/images/
sudo cp ./k3s-airgap-images-$ARCH.tar /var/lib/rancher/k3s/agent/images/
```
Images needed for a base install are provided through the releases page, additional images can be created with the `docker save` command.

Offline Helm charts are served from the `/var/lib/rancher/k3s/server/static` directory, and Helm chart manifests may reference the static files with a `%{KUBERNETES_API}%` templated variable. For example, the default traefik manifest chart installs from `https://%{KUBERNETES_API}%/static/charts/traefik-X.Y.Z.tgz`.

If networking is completely disabled k3s may not be able to start (ie ethernet unplugged or wifi disconnected), in which case it may be necessary to add a default route. For example:
```sh
sudo ip -c address add 192.168.123.123/24 dev eno1
sudo ip route add default via 192.168.123.1
```

k3s additionally provides a `--resolv-conf` flag for kubelets, which may help with configuring DNS in air-gap networks.

Upgrades
--------

To upgrade k3s from an older version you can re-run the installation script using the same flags, for example:

```sh
curl -sfL https://get.k3s.io | sh -
```

If you want to upgrade to specific version you can run the following command:

```sh
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=vX.Y.Z-rc1 sh -
```

Or to manually upgrade k3s:

1. Download the desired version of k3s from [releases](https://github.com/rancher/k3s/releases/latest)
2. Install to an appropriate location (normally `/usr/local/bin/k3s`)
3. Stop the old version
4. Start the new version

Restarting k3s is supported by the installation script for systemd and openrc.
To restart manually for systemd use:
```sh
sudo systemctl restart k3s
```

To restart manually for openrc use:
```sh
sudo service k3s restart
```

Upgrading an air-gap environment can be accomplished in the following manner:

1. Download air-gap images and install if changed
2. Install new k3s binary (from installer or manual download)
3. Restart k3s (if not restarted automatically by installer)

Uninstalling
------------

If you installed k3s with the help of `install.sh` script an uninstall script is generated during installation, which will be created on your server node at `/usr/local/bin/k3s-uninstall.sh` (or as `k3s-agent-uninstall.sh`).

Hyperkube
---------

k3s is bundled in a nice wrapper to remove the majority of the headache of running k8s. If
you don't want that wrapper and just want a smaller k8s distro, the releases includes
the `hyperkube` binary you can use.  It's then up to you to know how to use `hyperkube`. If
you want individual binaries you will need to compile them yourself from source.
