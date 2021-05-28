---
title: Setting up a High-availability RKE2 Kubernetes Cluster for Rancher
shortTitle: Set up RKE2 for Rancher
weight: 2
aliases:
  - /rancher/v2.x/en/installation/resources/k8s-tutorials/ha-RKE2
---
_Tested on v2.5.6_

This section describes how to install a Kubernetes cluster according to the [best practices for the Rancher server environment.]({{<baseurl>}}/rancher/v2.x/en/overview/architecture-recommendations/#environment-for-kubernetes-installations)

# Prerequisites

These instructions assume you have set up three nodes, a load balancer, and a DNS record, as described in [this section.]({{<baseurl>}}/rancher/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-rke2-ha)

Note that in order for RKE2 to work correctly with the load balancer, you need to set up two listeners: one for the supervisor on port 9345, and one for the Kubernetes API on port 6443.

Rancher needs to be installed on a supported Kubernetes version. To find out which versions of Kubernetes are supported for your Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/) To specify the RKE2 version, use the INSTALL_RKE2_VERSION environment variable when running the RKE2 installation script.
# Installing Kubernetes

### 1. Install Kubernetes and Set up the RKE2 Server

RKE2 server runs with embedded etcd so you will not need to set up an external datastore to run in HA mode.

1. On the first node, you should set up the configuration file with your own pre-shared secret as the token. The token argument can be set on startup.

If you do not specify a pre-shared secret, RKE2 will generate one and place it at /var/lib/rancher/rke2/server/node-token.

To avoid certificate errors with the fixed registration address, you should launch the server with the tls-san parameter set. This option adds an additional hostname or IP as a Subject Alternative Name in the server's TLS cert, and it can be specified as a list if you would like to access via both the IP and the hostname.

Here is an example of what the RKE2 config file (at /etc/rancher/rke2/config.yaml) would look like if you are following this guide:

```
token: my-shared-secret
tls-san:
  - my-kubernetes-domain.com
  - another-kubernetes-domain.com
```
After that you need to run the install command and enable and start rke2:
```
curl -sfL https://get.rke2.io | sh -
systemctl enable rke2-server.service
systemctl start rke2-server.service
```
1. To join the rest of the nodes, you need to configure each additional node with the same shared token or the one generated automatically. Here is an example of the configuration file:
```
token: my-shared-secret
server: https://<DNS-DOMAIN>:9345
tls-san:
  - my-kubernetes-domain.com
  - another-kubernetes-domain.com
```
After that you need to run the installer and enable then start rke2
```
curl -sfL https://get.rke2.io | sh -
systemctl enable rke2-server.service
systemctl start rke2-server.service
```

1. Repeat the same command on your third RKE2 server node.

### 2. Confirm that RKE2 is Running

Once you've launched the rke2 server process on all server nodes, ensure that the cluster has come up properly with

```
/var/lib/rancher/rke2/bin/kubectl \
        --kubeconfig /etc/rancher/rke2/rke2.yaml get nodes
You should see your server nodes in the Ready state.
```

Then test the health of the cluster pods:
```
/var/lib/rancher/rke2/bin/kubectl \
        --kubeconfig /etc/rancher/rke2/rke2.yaml get pods --all-namespaces
```

**Result:** You have successfully set up a RKE2 Kubernetes cluster.

### 3. Save and Start Using the kubeconfig File

When you installed RKE2 on each Rancher server node, a `kubeconfig` file was created on the node at `/etc/rancher/rke2/rke2.yaml`. This file contains credentials for full access to the cluster, and you should save this file in a secure location.

To use this `kubeconfig` file, 

1. Install [kubectl,](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) a Kubernetes command-line tool.
2. Copy the file at `/etc/rancher/rke2/rke2.yaml` and save it to the directory `~/.kube/config` on your local machine.
3. In the kubeconfig file, the `server` directive is defined as localhost. Configure the server as the DNS of your load balancer, referring to port 6443. (The Kubernetes API server will be reached at port 6443, while the Rancher server will be reached at ports 80 and 443.) Here is an example `rke2.yaml`:

```yml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: [CERTIFICATE-DATA]
    server: [LOAD-BALANCER-DNS]:6443 # Edit this line
  name: default
contexts:
- context:
    cluster: default
    user: default
  name: default
current-context: default
kind: Config
preferences: {}
users:
- name: default
  user:
    password: [PASSWORD]
    username: admin
```

**Result:** You can now use `kubectl` to manage your RKE2 cluster. If you have more than one kubeconfig file, you can specify which one you want to use by passing in the path to the file when using `kubectl`:

```
kubectl --kubeconfig ~/.kube/config/rke2.yaml get pods --all-namespaces
```

For more information about the `kubeconfig` file, refer to the [RKE2 documentation](https://docs.rke2.io/cluster_access/) or the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) about organizing cluster access using `kubeconfig` files.

### 4. Check the Health of Your Cluster Pods

Now that you have set up the `kubeconfig` file, you can use `kubectl` to access the cluster from your local machine.

Check that all the required pods and containers are healthy are ready to continue:

```
 /var/lib/rancher/rke2/bin/kubectl         --kubeconfig /etc/rancher/rke2/rke2.yaml get pods -A
NAMESPACE     NAME                                                 READY   STATUS      RESTARTS   AGE
kube-system   etcd-ip-172-31-18-145                                1/1     Running     0          4m37s
kube-system   etcd-ip-172-31-25-73                                 1/1     Running     0          20m
kube-system   etcd-ip-172-31-31-210                                1/1     Running     0          9m12s
kube-system   helm-install-rke2-canal-th9k9                        0/1     Completed   0          21m
kube-system   helm-install-rke2-coredns-6njr6                      0/1     Completed   0          21m
kube-system   helm-install-rke2-ingress-nginx-vztsd                0/1     Completed   0          21m
kube-system   helm-install-rke2-kube-proxy-6std5                   0/1     Completed   0          21m
kube-system   helm-install-rke2-metrics-server-9sl7m               0/1     Completed   0          21m
kube-system   kube-apiserver-ip-172-31-18-145                      1/1     Running     0          4m22s
kube-system   kube-apiserver-ip-172-31-25-73                       1/1     Running     0          20m
kube-system   kube-apiserver-ip-172-31-31-210                      1/1     Running     0          9m8s
kube-system   kube-controller-manager-ip-172-31-18-145             1/1     Running     0          4m8s
kube-system   kube-controller-manager-ip-172-31-25-73              1/1     Running     0          21m
kube-system   kube-controller-manager-ip-172-31-31-210             1/1     Running     0          8m55s
kube-system   kube-proxy-57twm                                     1/1     Running     0          10m
kube-system   kube-proxy-f7pc6                                     1/1     Running     0          5m24s
kube-system   kube-proxy-rj4t5                                     1/1     Running     0          21m
kube-system   kube-scheduler-ip-172-31-18-145                      1/1     Running     0          4m15s
kube-system   kube-scheduler-ip-172-31-25-73                       1/1     Running     0          21m
kube-system   kube-scheduler-ip-172-31-31-210                      1/1     Running     0          8m48s
kube-system   rke2-canal-4x972                                     2/2     Running     0          10m
kube-system   rke2-canal-flh8m                                     2/2     Running     0          5m24s
kube-system   rke2-canal-zfhkr                                     2/2     Running     0          21m
kube-system   rke2-coredns-rke2-coredns-6cd96645d6-cmstq           1/1     Running     0          21m
kube-system   rke2-ingress-nginx-controller-54946dd48f-6mp76       1/1     Running     0          20m
kube-system   rke2-ingress-nginx-default-backend-5795954f8-p92xx   1/1     Running     0          20m
kube-system   rke2-metrics-server-5f9b5757dc-k5sgh                 1/1     Running     0          20m
```

**Result:** You have confirmed that you can access the cluster with `kubectl` and the RKE2 cluster is running successfully. Now the Rancher management server can be installed on the cluster.

### 5. Configure nginx to be a daemonset

Currently, RKE2 deploys nginx-ingress as a deployment, and that can impact the Rancher deployment so that you cannot use all servers to proxy requests to the Rancher pods.

To rectify that, place the following file in /var/lib/rancher/rke2/server/manifests on any of the server nodes:

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChartConfig
metadata:
  name: rke2-ingress-nginx
  namespace: kube-system
spec:
  valuesContent: |-
    controller:
      kind: DaemonSet
      daemonset:
        useHostPort: true
```
