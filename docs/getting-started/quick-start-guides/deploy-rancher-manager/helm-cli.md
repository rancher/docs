---
title: Helm CLI Quick Start
weight: 300
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

These instructions capture a quick way to set up a proof-of-concept Rancher installation.

These instructions assume you have a Linux virtual machine that you will communicate with from your local workstation. Rancher will be installed on the Linux machine. You will need to retrieve the IP address of that machine so that you can access Rancher from your local workstation. Rancher is designed to manage Kubernetes clusters remotely, so any Kubernetes cluster that Rancher manages in the future will also need to be able to reach this IP address.

We don't recommend installing Rancher locally because it creates a networking problem. Installing Rancher on localhost does not allow Rancher to communicate with downstream Kubernetes clusters, so on localhost you wouldn't be able to test Rancher's cluster provisioning or cluster management functionality.

Your Linux machine can be anywhere. It could be an Amazon EC2 instance, a Digital Ocean droplet, or an Azure virtual machine, to name a few examples. Other Rancher docs often use 'node' as a generic term for all of these. One possible way to deploy a Linux machine is by setting up an Amazon EC2 instance as shown in [this tutorial](../../../how-to-guides/new-user-guides/infrastructure-setup/nodes-in-amazon-ec2.md).

The full installation requirements are [here](../../../pages-for-subheaders/installation-requirements.md).


## Install K3s on Linux

Install a K3s cluster by running this command on the Linux machine:

```
curl -sfL https://get.k3s.io | sh -s - server
```

Save the IP of the Linux machine.

## Save the kubeconfig to your workstation

The kubeconfig file is important for accessing the Kubernetes cluster. Copy the file at `/etc/rancher/k3s/k3s.yaml` from the Linux machine and save it to your local workstation in the directory `~/.kube/config`. One way to do this is by using the `scp` tool and run this command on your local machine:

<Tabs>
<TabItem value="Mac and Linux">

```
scp root@<IP_OF_LINUX_MACHINE>:/etc/rancher/k3s/k3s.yaml ~/.kube/config
```

</TabItem>
<TabItem value="Windows">

By default, "scp" is not a recognized command, so we need to install a module first.

In Windows Powershell:

```
Find-Module Posh-SSH
Install-Module Posh-SSH

## Get the remote kubeconfig file
scp root@<IP_OF_LINUX_MACHINE>:/etc/rancher/k3s/k3s.yaml $env:USERPROFILE\.kube\config
```

</TabItem>
</Tabs>

## Edit the Rancher server URL in the kubeconfig

In the kubeconfig file, you will need to change the value of the `server` field to `<IP_OF_LINUX_NODE>:6443`. The Kubernetes API server will be reached at port 6443, while the Rancher server will be reached at ports 80 and 443. This edit is needed so that when you run Helm or kubectl commands from your local workstation, you will be able to communicate with the Kubernetes cluster that Rancher will be installed on.

<Tabs>
<TabItem value="Mac and Linux">

One way to open the kubeconfig file for editing is to use Vim:

```
vi ~/.kube/config
```

Press `i` to put Vim in insert mode. To save your work, press `Esc`. Then press `:wq` and press `Enter`.


</TabItem>
<TabItem value="Windows">

In Windows Powershell, you can use `notepad.exe` for editing the kubeconfig file:

```
notepad.exe $env:USERPROFILE\.kube\config
```

Once edited, either press `ctrl+s` or go to `File > Save` to save your work.

</TabItem>
</Tabs>

## Install Rancher with Helm

Then from your local workstation, run the following commands. You will need to have [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) and [helm.](https://helm.sh/docs/intro/install/) installed.

```
helm repo add rancher-latest https://releases.rancher.com/server-charts/latest

kubectl create namespace cattle-system

kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.7.2/cert-manager.crds.yaml

helm repo add jetstack https://charts.jetstack.io

helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.7.1

# Windows Powershell
helm install cert-manager jetstack/cert-manager `
  --namespace cert-manager `
  --create-namespace `
  --version v1.7.1
```

The final command to install Rancher is below. The command requires a domain name that forwards traffic to the Linux machine. For the sake of simplicity in this tutorial, you can use a fake domain name to create your proof-of-concept. An example of a fake domain name would be `<IP_OF_LINUX_NODE>.sslip.io`.

```
helm install rancher rancher-latest/rancher \
  --namespace cattle-system \
  --set hostname=<IP_OF_LINUX_NODE>.sslip.io \
  --set replicas=1 \
  --set bootstrapPassword=<PASSWORD_FOR_RANCHER_ADMIN>

# Windows Powershell
helm install rancher rancher-latest/rancher `
  --namespace cattle-system `
  --set hostname=<IP_OF_LINUX_NODE>.sslip.io `
  --set replicas=1 `
  --set bootstrapPassword=<PASSWORD_FOR_RANCHER_ADMIN>
```

Now if you navigate to `<IP_OF_LINUX_NODE>.sslip.io` in a web browser, you should see the Rancher UI.

To make these instructions simple, we used a fake domain name and self-signed certificates to do this installation. Therefore, you will probably need to add a security exception to your web browser to see the Rancher UI. Note that for production installs, you would need a high-availability setup with a load balancer, a real domain name and real certificates.

These instructions also left out the full installation requirements and other installation options. If you have any issues with these steps, refer to the full [Helm CLI installation docs.](../../../pages-for-subheaders/install-upgrade-on-a-kubernetes-cluster.md)

To launch new Kubernetes clusters with your new Rancher server, you may need to set up cloud credentials in Rancher. For more information, see [Launching Kubernetes clusters with Rancher.](../../../pages-for-subheaders/launch-kubernetes-with-rancher.md)
