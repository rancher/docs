---
title: Technical
weight: 8005
---

### How can I reset the admin password?

Single node install:
```
$ docker exec -ti <container_id> reset-password
New password for default admin user (user-xxxxx):
<new_password>
```

High Availability install:
```
$ KUBECONFIG=./kube_config_rancher-cluster.yml
$ kubectl --kubeconfig $KUBECONFIG exec -n cattle-system $(kubectl --kubeconfig $KUBECONFIG get pods -n cattle-system -o json | jq -r '.items[] | select(.spec.containers[].name=="cattle-server") | .metadata.name') -- reset-password
New password for default admin user (user-xxxxx):
<new_password>
```

### I deleted/deactivated the last admin, how can I fix it?
Single node install:
```
$ docker exec -ti <container_id> ensure-default-admin
New default admin user (user-xxxxx)
New password for default admin user (user-xxxxx):
<new_password>
```

High Availability install:
```
$ KUBECONFIG=./kube_config_rancher-cluster.yml
$ kubectl --kubeconfig $KUBECONFIG exec -n cattle-system $(kubectl --kubeconfig $KUBECONFIG get pods -n cattle-system -o json | jq -r '.items[] | select(.spec.containers[].name=="cattle-server") | .metadata.name') -- ensure-default-admin
New password for default admin user (user-xxxxx):
<new_password>
```


### How can I enable debug logging?

* Single node install
 * Enable
```
$ docker exec -ti <container_id> loglevel --set debug
OK
$ docker logs -f <container_id>
```

 * Disable
```
$ docker exec -ti <container_id> loglevel --set info
OK
```


* High Availability install
 * Enable
```
$ KUBECONFIG=./kube_config_rancher-cluster.yml
$ kubectl --kubeconfig $KUBECONFIG exec -n cattle-system $(kubectl --kubeconfig $KUBECONFIG get pods -n cattle-system -o json | jq -r '.items[] | select(.spec.containers[].name=="cattle-server") | .metadata.name') -- loglevel --set debug
OK
$ kubectl --kubeconfig $KUBECONFIG logs -n cattle-system -f $(kubectl --kubeconfig $KUBECONFIG get pods -n cattle-system -o json | jq -r '.items[] | select(.spec.containers[].name="cattle-server") | .metadata.name')
```

 * Disable
```
$ KUBECONFIG=./kube_config_rancher-cluster.yml
$ kubectl --kubeconfig $KUBECONFIG exec -n cattle-system $(kubectl --kubeconfig $KUBECONFIG get pods -n cattle-system -o json | jq -r '.items[] | select(.spec.containers[].name=="cattle-server") | .metadata.name') -- loglevel --set info
OK
```


### My ClusterIP does not respond to ping

ClusterIP is a virtual IP, which will not respond to ping. Best way to test if the ClusterIP is configured correctly, is by using `curl` to access the IP and port to see if it responds.

### Where can I manage Node Templates?

Node Templates can be accessed by opening your account menu (top right) and selecting `Node Templates`.

### Why is my Layer-4 Load Balancer in `Pending` state?

The Layer-4 Load Balancer is created as `type: LoadBalancer`. In Kubernetes, this needs a cloud provider or controller that can satisfy these requests, otherwise these will be in `Pending` state forever. More information can be found on [Cloud Providers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/) or [Create External Load Balancer](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/)

### Where is the state of Rancher stored?

- Single node install: in the embedded etcd of the `rancher/rancher` container, located at `/var/lib/rancher`.
- High Availability install: in the etcd of the RKE cluster created to run Rancher.

### How are the supported Docker versions determined?

We follow the validated Docker versions for upstream Kubernetes releases. The validated versions can be found under [External Dependencies](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG-1.10.md#external-dependencies) in the Kubernetes release CHANGELOG.md.

### How can I access nodes created by Rancher?

SSH keys to access the nodes created by Rancher can be downloaded via the **Nodes** view. Choose the node which you want to access and click on the vertical ellipsis button at the end of the row, and choose **Download Keys** as shown in the picture below.

![Download Keys]({{< baseurl >}}/img/rancher/downloadsshkeys.png)

Unzip the downloaded zip file, and use the file `id_rsa` to connect to you host. Be sure to use the correct username (`rancher` for RancherOS, `ubuntu` for Ubuntu, `ec2-user` for Amazon Linux)

```
$ ssh -i id_rsa user@ip_of_node
```

### How can I automate task X in Rancher?

The UI consists of static files, and works based on responses of the API. That means every action/task that you can execute in the UI, can be automated via the API. There are 2 ways to do this:

* Visit `https://your_rancher_ip/v3` and browse the API options.
* Capture the API calls when using the UI (Most commonly used for this is [Chrome Developer Tools](https://developers.google.com/web/tools/chrome-devtools/#network) but you can use anything you like)

### The IP address of a node changed, how can I recover?

A node is required to have a static IP configured (or a reserved IP via DHCP). If the IP of a node has changed, you will have to remove it from the cluster and readd it. After it is removed, Rancher will update the cluster to the correct state. If the cluster is no longer in `Provisioning` state, the node is removed from the cluster.

When the IP address of the node changed, Rancher lost connection to the node, so it will be unable to clean the node properly. See [Cleaning cluster nodes]({{< baseurl >}}/rancher/v2.x/en/faq/cleaning-cluster-nodes/) to clean the node.

When the node is removed from the cluster, and the node is cleaned, you can readd the node to the cluster.

### How can I add additional arguments/binds/environment variables to Kubernetes components in a Rancher Launched Kubernetes cluster?

You can add additional arguments/binds/environment variables via the [Config File]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/#config-file) option in Cluster Options. For more information, see the [Extra Args, Extra Binds, and Extra Environment Variables]({{< baseurl >}}/rke/v0.1.x/en/config-options/services/services-extras/) in the RKE documentation or browse the [Example Cluster.ymls]({{< baseurl >}}/rke/v0.1.x/en/example-yamls/).

### Why does it take 5+ minutes for a pod to be rescheduled when a node has failed?

This is due to a combination of the following default Kubernetes settings:

* kubelet
  * `node-status-update-frequency`: Specifies how often kubelet posts node status to master (default 10s)
* kube-controller-manager
  * `node-monitor-period`: The period for syncing NodeStatus in NodeController (default 5s)
  * `node-monitor-grace-period`: Amount of time which we allow running Node to be unresponsive before marking it unhealthy (default 40s)
  * `pod-eviction-timeout`: The grace period for deleting pods on failed nodes (default 5m0s)

See [Kubernetes: kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) and [Kubernetes: kube-controller-manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/) for more information on these settings.
### How do I check `Common Name` and `Subject Alternative Names` in my server certificate?

Although technically an entry in `Subject Alternative Names` is required, having the hostname in both `Common Name` and as entry in `Subject Alternative Names` gives you maximum compatibility with older browser/applications.

Check `Common Name`:

```
openssl x509 -noout -subject -in cert.pem
subject= /CN=rancher.my.org
```

Check `Subject Alternative Names`:

```
openssl x509 -noout -in cert.pem -text | grep DNS
                DNS:rancher.my.org
```
