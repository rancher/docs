---
title: "Advanced Options"
weight: 40
aliases:
  - /k3s/latest/en/running/
---

This section contains advanced information describing the different ways you can run and manage K3s.

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

[k3d](https://github.com/rancher/k3d) is a utility designed to easily run K3s in Docker. It can be installed via the [brew](https://brew.sh/) utility for MacOS.

`rancher/k3s` images are also available to run K3s server and agent from Docker.  A `docker-compose.yml` is in the root of the K3s repo that
serves as an example of how to run K3s from Docker.  To run from `docker-compose` from this repo run:

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

