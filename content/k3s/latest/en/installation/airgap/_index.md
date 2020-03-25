---
title: "Air-Gap Install"
weight: 60
---

You can install K3s in an air-gapped environment using two different methods. You can either deploy a private registry and mirror docker.io or you can manually deploy images such as for small clusters.

# Private Registry Method

This document assumes you have already created your nodes in your air-gap environment and have a secure Docker private registry on your bastion host.
If you have not yet set up a private Docker registry, refer to the official documentation [here](https://docs.docker.com/registry/deploying/#run-an-externally-accessible-registry).

### Create the Registry YAML

Follow the [Private Registry Configuration]({{< baseurl >}}/k3s/latest/en/installation/private-registry) guide to create and configure the registry.yaml file.

Once you have completed this, you may now go to the [Install K3s](#install-k3s) section below.


# Manually Deploy Images Method

We are assuming you have created your nodes in your air-gap environment.
This method requires you to manually deploy the necessary images to each node and is appropriate for edge deployments where running a private registry is not practical.

### Prepare the Images Directory and K3s Binary
Obtain the images tar file for your architecture from the [releases](https://github.com/rancher/k3s/releases) page for the version of K3s you will be running.

Place the tar file in the `images` directory, for example:

```sh
sudo mkdir -p /var/lib/rancher/k3s/agent/images/
sudo cp ./k3s-airgap-images-$ARCH.tar /var/lib/rancher/k3s/agent/images/
```

Place the k3s binary at /usr/local/bin/k3s and ensure it is executable.

Follow the steps in the next section to install K3s.

# Install K3s

Only after you have completed either the [Private Registry Method](#private-registry-method) or the [Manually Deploy Images Method](#manually-deploy-images-method) above should you install K3s.

Obtain the K3s binary from the [releases](https://github.com/rancher/k3s/releases) page, matching the same version used to get the airgap images.
Obtain the K3s install script at https://get.k3s.io

Place the binary in `/usr/local/bin` on each node and ensure it is executable.
Place the install script anywhere on each node, and name it `install.sh`.


### Install Options
You can install K3s on one or more servers as described below.

{{% tabs %}}
{{% tab "Single Server Configuration" %}}

To install K3s on a single server simply do the following on the server node.

```
INSTALL_K3S_SKIP_DOWNLOAD=true ./install.sh
```

Then, to optionally add additional agents do the following on each agent node. Take care to ensure you replace `myserver` with the IP or valid DNS of the server and replace `mynodetoken` with the node token from the server typically at `/var/lib/rancher/k3s/server/node-token`

```
INSTALL_K3S_SKIP_DOWNLOAD=true K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken ./install.sh
```

{{% /tab %}}
{{% tab "High Availability Configuration" %}}

Reference the [High Availability with an External DB]({{< baseurl >}}/k3s/latest/en/installation/ha) or [High Availability with Embedded DB (Experimental)]({{< baseurl >}}/k3s/latest/en/installation/ha-embedded) guides. You will be tweaking install commands so you specify `INSTALL_K3S_SKIP_DOWNLOAD=true` and run your install script locally instead of via curl. You will also utilize `INSTALL_K3S_EXEC='args'` to supply any arguments to k3s.

For example, step two of the High Availability with an External DB guide mentions the following:

```
curl -sfL https://get.k3s.io | sh -s - server \
  --datastore-endpoint="mysql://username:password@tcp(hostname:3306)/database-name"
```

Instead, you would modify such examples like below:

```
INSTALL_K3S_SKIP_DOWNLOAD=true INSTALL_K3S_EXEC='server --datastore-endpoint="mysql://username:password@tcp(hostname:3306)/database-name"' ./install.sh
```

{{% /tab %}}
{{% /tabs %}}

>**Note:** K3s additionally provides a `--resolv-conf` flag for kubelets, which may help with configuring DNS in air-gap networks.

# Upgrading

### Install Script Method

Upgrading an air-gap environment can be accomplished in the following manner:

1. Download the new air-gap images (tar file) from the [releases](https://github.com/rancher/k3s/releases) page for the version of K3s you will be upgrading to. Place the tar in the `/var/lib/rancher/k3s/agent/images/` directory on each
node. Delete the old tar file.
2. Copy and replace the old K3s binary in `/usr/local/bin` on each node. Copy over the install script at https://get.k3s.io (as it is possible it has changed since the last release). Run the script again just as you had done in the past
with the same environment variables.
3. Restart the K3s service (if not restarted automatically by installer).


### System Upgrade Controller Method

As of v1.17.4+k3s1 the [System Upgrade Controller](https://github.com/rancher/system-upgrade-controller/blob/master/README.md) is supported. The system upgrade controller can be utilized in an environment that has a private registry to rollout upgrades to your cluster as directed in a new CRD the controller introduces called a **Plan**. 

First, push necessary (newer) images to the registry. Take care to replace TAG with the newer tag, using the latest stable release (tag) for each image.

```
rancher/k3s-upgrade:TAG
rancher/system-upgrade-controller:TAG
rancher/kubectl:TAG
```

Then, install the system upgrade controller by applying the manifest yaml. For example v0.3.1 is at https://github.com/rancher/system-upgrade-controller/blob/v0.3.1/manifests/system-upgrade-controller.yaml 
You will need to obtain the latest release of the yaml before you apply it.

Now, configure your system upgrade controller YAML (Plan) to your liking. Refer to the [readme](https://github.com/rancher/system-upgrade-controller/blob/master/README.md) for more information.
Below, we have provided an example for server nodes and agent nodes. You should take care to ensure each Plan you will utilize meets your needs. Please note, before you apply your Plans, ensure you have set your labels appropriately for each node and if using the examples below that you have plugged in the K3s version for each instance of `VERSION_HERE`.

```
---
# Example server upgrade plan
# Always upgrade server nodes first
apiVersion: upgrade.cattle.io/v1
kind: Plan
metadata:
  name: k3s-server-plan
  namespace: system-upgrade
spec:
  concurrency: 1
  version: VERSION_HERE
  nodeSelector:
    matchExpressions:
      - {key: k3s-server-upgrade, operator: Exists}
  serviceAccountName: system-upgrade
  drain:
    force: true
  upgrade:
    image: k3s-upgrade
```

```
---
# Example agent upgrade plan
# Always upgrade any agent nodes last
apiVersion: upgrade.cattle.io/v1
kind: Plan
metadata:
  name: k3s-agent-plan
  namespace: system-upgrade
spec:
  prepare:
     image: rancher/k3s-upgrade:latest
     args: ["prepare","k3s-server-plan"]
  concurrency: 1
  version: VERSION_HERE
  nodeSelector:
    matchExpressions:
      - {key: k3s-agent-upgrade, operator: Exists}
  serviceAccountName: system-upgrade
  drain:
    force: true
  upgrade:
    image: k3s-upgrade
```

Once you have applied the necessary labels to each node you can apply your Plans. Always take care to deploy the plan for servers first before applying the plan to agents.
Based on our examples provided above, we would need to set the `k3s-server-upgrade` label for our server plan and the `k3s-agent-upgrade` label for our agent plan.

The System Upgrade Controller will rollout the upgrade plan as per the spec for each plan. Please be patient as the rollout can take time in large clusters depending on the concurrency value.

