---
title: GlusterFS Volumes
weight: 5000
---

> This section only applies to [RKE clusters.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/)

In clusters that store data on GlusterFS volumes, you may experience an issue where pods fail to mount volumes after restarting the `kubelet`. The logging of the `kubelet` will show: `transport endpoint is not connected`. To prevent this from happening, you can configure your cluster to mount the `systemd-run` binary in the `kubelet` container. There are two requirements before you can change the cluster configuration:

- The node needs to have the `systemd-run` binary installed (this can be checked by using the command `which systemd-run` on each cluster node)
- The `systemd-run` binary needs to be compatible with Debian OS on which the hyperkube image is based (this can be checked using the following command on each cluster node, replacing the image tag with the Kubernetes version you want to use)

```
docker run -v /usr/bin/systemd-run:/usr/bin/systemd-run --entrypoint /usr/bin/systemd-run rancher/hyperkube:v1.16.2-rancher1 --version
```

>**Note:**
>
>Before updating your Kubernetes YAML to mount the `systemd-run` binary, make sure the `systemd` package is installed on your cluster nodes. If this package isn't installed _before_ the bind mounts are created in your Kubernetes YAML, Docker will automatically create the directories and files on each node and will not allow the package install to succeed.

```
services:
  kubelet:
    extra_binds:
      - "/usr/bin/systemd-run:/usr/bin/systemd-run"
```

After the cluster has finished provisioning, you can check the `kubelet` container logging to see if the functionality is activated by looking for the following logline:

```
Detected OS with systemd
```