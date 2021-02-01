---
title: Troubleshooting the Rancher Server Kubernetes Cluster
weight: 276
aliases:
  - /rancher/v2.5/en/installation/k8s-install/helm-rancher/troubleshooting
  - /rancher/v2.5/en/installation/ha/kubernetes-rke/troubleshooting
  - /rancher/v2.5/en/installation/k8s-install/kubernetes-rke/troubleshooting
  - /rancher/v2.5/en/installation/options/troubleshooting
---

This section describes how to troubleshoot an installation of Rancher on a Kubernetes cluster.

### Relevant Namespaces

Most of the troubleshooting will be done on objects in these 3 namespaces.

- `cattle-system` - `rancher` deployment and pods.
- `ingress-nginx` - Ingress controller pods and services.
- `cert-manager` - `cert-manager` pods.

### "default backend - 404"

A number of things can cause the ingress-controller not to forward traffic to your rancher instance. Most of the time its due to a bad ssl configuration.

Things to check

- [Is Rancher Running](#check-if-rancher-is-running)
- [Cert CN is "Kubernetes Ingress Controller Fake Certificate"](#cert-cn-is-kubernetes-ingress-controller-fake-certificate)

### Check if Rancher is Running

Use `kubectl` to check the `cattle-system` system namespace and see if the Rancher pods are in a Running state.

```
kubectl -n cattle-system get pods

NAME                           READY     STATUS    RESTARTS   AGE
pod/rancher-784d94f59b-vgqzh   1/1       Running   0          10m
```

If the state is not `Running`, run a `describe` on the pod and check the Events.

```
kubectl -n cattle-system describe pod

...
Events:
  Type     Reason                 Age   From                Message
  ----     ------                 ----  ----                -------
  Normal   Scheduled              11m   default-scheduler   Successfully assigned rancher-784d94f59b-vgqzh to localhost
  Normal   SuccessfulMountVolume  11m   kubelet, localhost  MountVolume.SetUp succeeded for volume "rancher-token-dj4mt"
  Normal   Pulling                11m   kubelet, localhost  pulling image "rancher/rancher:v2.0.4"
  Normal   Pulled                 11m   kubelet, localhost  Successfully pulled image "rancher/rancher:v2.0.4"
  Normal   Created                11m   kubelet, localhost  Created container
  Normal   Started                11m   kubelet, localhost  Started container
```

### Check the Rancher Logs

Use `kubectl` to list the pods.

```
kubectl -n cattle-system get pods

NAME                           READY     STATUS    RESTARTS   AGE
pod/rancher-784d94f59b-vgqzh   1/1       Running   0          10m
```

Use `kubectl` and the pod name to list the logs from the pod.

```
kubectl -n cattle-system logs -f rancher-784d94f59b-vgqzh
```

### Cert CN is "Kubernetes Ingress Controller Fake Certificate"

Use your browser to check the certificate details. If it says the Common Name is "Kubernetes Ingress Controller Fake Certificate", something may have gone wrong with reading or issuing your SSL cert.

> **Note:** if you are using LetsEncrypt to issue certs it can sometimes take a few minutes to issue the cert.

### Checking for issues with cert-manager issued certs (Rancher Generated or LetsEncrypt)

`cert-manager` has 3 parts.

- `cert-manager` pod in the `cert-manager` namespace.
- `Issuer` object in the `cattle-system` namespace.
- `Certificate` object in the `cattle-system` namespace.

Work backwards and do a `kubectl describe` on each object and check the events. You can track down what might be missing.

For example there is a problem with the Issuer:

```
kubectl -n cattle-system describe certificate
...
Events:
  Type     Reason          Age                 From          Message
  ----     ------          ----                ----          -------
  Warning  IssuerNotReady  18s (x23 over 19m)  cert-manager  Issuer rancher not ready
```

```
kubectl -n cattle-system describe issuer
...
Events:
  Type     Reason         Age                 From          Message
  ----     ------         ----                ----          -------
  Warning  ErrInitIssuer  19m (x12 over 19m)  cert-manager  Error initializing issuer: secret "tls-rancher" not found
  Warning  ErrGetKeyPair  9m (x16 over 19m)   cert-manager  Error getting keypair for CA issuer: secret "tls-rancher" not found
```

### Checking for Issues with Your Own SSL Certs

Your certs get applied directly to the Ingress object in the `cattle-system` namespace.

Check the status of the Ingress object and see if its ready.

```
kubectl -n cattle-system describe ingress
```

If its ready and the SSL is still not working you may have a malformed cert or secret.

Check the nginx-ingress-controller logs. Because the nginx-ingress-controller has multiple containers in its pod you will need to specify the name of the container.

```
kubectl -n ingress-nginx logs -f nginx-ingress-controller-rfjrq nginx-ingress-controller
...
W0705 23:04:58.240571       7 backend_ssl.go:49] error obtaining PEM from secret cattle-system/tls-rancher-ingress: error retrieving secret cattle-system/tls-rancher-ingress: secret cattle-system/tls-rancher-ingress was not found
```

### No matches for kind "Issuer"

The SSL configuration option you have chosen requires cert-manager to be installed before installing Rancher or else the following error is shown:

```
Error: validation failed: unable to recognize "": no matches for kind "Issuer" in version "certmanager.k8s.io/v1alpha1"
```

Install cert-manager and try installing Rancher again.


### Canal Pods show READY 2/3

The most common cause of this issue is port 8472/UDP is not open between the nodes. Check your local firewall, network routing or security groups.

Once the network issue is resolved, the `canal` pods should timeout and restart to establish their connections.

### nginx-ingress-controller Pods show RESTARTS

The most common cause of this issue is the `canal` pods have failed to establish the overlay network. See [canal Pods show READY `2/3`](#canal-pods-show-ready-2-3) for troubleshooting.


### Failed to dial to /var/run/docker.sock: ssh: rejected: administratively prohibited (open failed)

Some causes of this error include:

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

### Failed to dial ssh using address [xxx.xxx.xxx.xxx:xx]: Error configuring SSH: ssh: no key found

The key file specified as `ssh_key_path` cannot be accessed. Make sure that you specified the private key file (not the public key, `.pub`), and that the user that is running the `rke` command can access the private key file.

### Failed to dial ssh using address [xxx.xxx.xxx.xxx:xx]: ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey], no supported methods remain

The key file specified as `ssh_key_path` is not correct for accessing the node. Double-check if you specified the correct `ssh_key_path` for the node and if you specified the correct user to connect with.

### Failed to dial ssh using address [xxx.xxx.xxx.xxx:xx]: Error configuring SSH: ssh: cannot decode encrypted private keys

If you want to use encrypted private keys, you should use `ssh-agent` to load your keys with your passphrase. If the `SSH_AUTH_SOCK` environment variable is found in the environment where the `rke` command is run, it will be used automatically to connect to the node.

### Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

The node is not reachable on the configured `address` and `port`.
