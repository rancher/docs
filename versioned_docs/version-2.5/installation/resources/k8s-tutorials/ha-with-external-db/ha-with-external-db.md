---
title: Setting up a High-availability K3s Kubernetes Cluster for Rancher
shortTitle: Set up K3s for Rancher
weight: 2
---

This section describes how to install a Kubernetes cluster according to the [best practices for the Rancher server environment.]({{<baseurl>}}/rancher/v2.5/en/overview/architecture-recommendations/#environment-for-kubernetes-installations)

For systems without direct internet access, refer to the air gap installation instructions.

> **Single-node Installation Tip:**
> In a single-node Kubernetes cluster, the Rancher server does not have high availability, which is important for running Rancher in production. However, installing Rancher on a single-node cluster can be useful if you want to save resources by using a single node in the short term, while preserving a high-availability migration path.
>
> To set up a single-node K3s cluster, run the Rancher server installation command on just one node instead of two nodes.
>
> In both single-node setups, Rancher can be installed with Helm on the Kubernetes cluster in the same way that it would be installed on any other cluster.

# Prerequisites

These instructions assume you have set up two nodes, a load balancer, a DNS record, and an external MySQL database as described in [this section.]({{<baseurl>}}/rancher/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha-with-external-db/)

Rancher needs to be installed on a supported Kubernetes version. To find out which versions of Kubernetes are supported for your Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/) To specify the K3s version, use the INSTALL_K3S_VERSION environment variable when running the K3s installation script.
# Installing Kubernetes

### 1. Install Kubernetes and Set up the K3s Server

When running the command to start the K3s Kubernetes API server, you will pass in an option to use the external datastore that you set up earlier.

1. Connect to one of the Linux nodes that you have prepared to run the Rancher server.
1. On the Linux node, run this command to start the K3s server and connect it to the external datastore:
  ```
  curl -sfL https://get.k3s.io | sh -s - server \
    --datastore-endpoint="mysql://username:password@tcp(hostname:3306)/database-name"
  ```
  To specify the K3s version, use the INSTALL_K3S_VERSION environment variable:
  ```sh
  curl -sfL https://get.k3s.io |  INSTALL_K3S_VERSION=vX.Y.Z sh -s - server \
    --datastore-endpoint="mysql://username:password@tcp(hostname:3306)/database-name"
    ```
  Note: The datastore endpoint can also be passed in using the environment variable `$K3S_DATASTORE_ENDPOINT`.

1. Repeat the same command on your second K3s server node.

### 2. Confirm that K3s is Running

To confirm that K3s has been set up successfully, run the following command on either of the K3s server nodes:
```
sudo k3s kubectl get nodes
```

Then you should see two nodes with the master role:
```
ubuntu@ip-172-31-60-194:~$ sudo k3s kubectl get nodes
NAME               STATUS   ROLES    AGE    VERSION
ip-172-31-60-194   Ready    master   44m    v1.17.2+k3s1
ip-172-31-63-88    Ready    master   6m8s   v1.17.2+k3s1  
```

Then test the health of the cluster pods:
```
sudo k3s kubectl get pods --all-namespaces
```

**Result:** You have successfully set up a K3s Kubernetes cluster.

### 3. Save and Start Using the kubeconfig File

When you installed K3s on each Rancher server node, a `kubeconfig` file was created on the node at `/etc/rancher/k3s/k3s.yaml`. This file contains credentials for full access to the cluster, and you should save this file in a secure location.

To use this `kubeconfig` file, 

1. Install [kubectl,](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) a Kubernetes command-line tool.
2. Copy the file at `/etc/rancher/k3s/k3s.yaml` and save it to the directory `~/.kube/config` on your local machine.
3. In the kubeconfig file, the `server` directive is defined as localhost. Configure the server as the DNS of your load balancer, referring to port 6443. (The Kubernetes API server will be reached at port 6443, while the Rancher server will be reached at ports 80 and 443.) Here is an example `k3s.yaml`:

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

**Result:** You can now use `kubectl` to manage your K3s cluster. If you have more than one kubeconfig file, you can specify which one you want to use by passing in the path to the file when using `kubectl`:

```
kubectl --kubeconfig ~/.kube/config/k3s.yaml get pods --all-namespaces
```

For more information about the `kubeconfig` file, refer to the [K3s documentation]({{<baseurl>}}/k3s/latest/en/cluster-access/) or the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) about organizing cluster access using `kubeconfig` files.

### 4. Check the Health of Your Cluster Pods

Now that you have set up the `kubeconfig` file, you can use `kubectl` to access the cluster from your local machine.

Check that all the required pods and containers are healthy are ready to continue:

```
ubuntu@ip-172-31-60-194:~$ sudo kubectl get pods --all-namespaces
NAMESPACE       NAME                                      READY   STATUS    RESTARTS   AGE
kube-system     metrics-server-6d684c7b5-bw59k            1/1     Running   0          8d
kube-system     local-path-provisioner-58fb86bdfd-fmkvd   1/1     Running   0          8d
kube-system     coredns-d798c9dd-ljjnf                    1/1     Running   0          8d
```

**Result:** You have confirmed that you can access the cluster with `kubectl` and the K3s cluster is running successfully. Now the Rancher management server can be installed on the cluster.
