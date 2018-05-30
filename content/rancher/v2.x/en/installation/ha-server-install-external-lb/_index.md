---
title: High Availability Installation with External Load Balancer
weight: 276
---
This set of instructions creates a new Kubernetes cluster that's dedicated to running Rancher in a high-availability (HA) configuration. This procedure walks you through setting up a 3-node cluster using the Rancher Kubernetes Engine (RKE). The cluster's sole purpose is running pods for Rancher. The setup is based on:

- Layer 7 Loadbalancer with SSL termination (HTTPS)
- NGINX Ingress controller (HTTP)

![Rancher HA]({{< baseurl >}}/img/rancher/ha/rancher2ha-l7.svg)

## Overview

1. [Provision Linux Hosts](#part-1-provision-linux-hosts)

	Provision three Linux hosts to serve as your Kubernetes cluster.

2. [Configure Load Balancer](#part-2-configure-load-balancer)

	Configure your load balancer to have a highly available single point of entry to your Rancher cluster.

3. [Configure DNS](#part-3-configure-dns)

	Make your setup accessible using a DNS name by configuring the DNS to point to your loadbalancer.

4. [Download RKE](#part-4-download-rke)

	Rancher Kubernetes Engine (RKE) is a fast, versatile Kubernetes installer that you can use to install Kubernetes on your Linux hosts.

5. [Download Config File Template](#part-5-download-config-file-template)

	RKE uses a `.yml` config file to install and configure your Kubernetes cluster. Download one of our config file templates to get started.

6. [Configure Nodes](#part-6-configure-nodes)

	Configure the **Nodes** section of the template.

7. [Configure Certificates](#part-7-configure-certificates)

	Configure the **Certificates** part of the template too.

8. [Configure FQDN](#part-8-configure-fqdn)

	You guessed it. Configure the **FQDN** part of the template.

9. [Backup Your YAML File](#part-9-backup-your-yaml-file)

	After you've completed configuration of the config file template, back the config file up in a safe place. You can reuse this file for upgrades later.

10. [Run RKE](#part-10-run-rke)

	Run RKE to deploy Rancher to your cluster.

11. [Backup Config File](#part-11-backup-config-file)

	During installation, RKE generates a config file that you'll use later for upgrades. Back it up to a safe location.

12. **For those using a certificate signed by a recognized CA:**

	[Remove Default Certificates](#part-12-remove-default-certificates)

	If you chose [Option B](#option-b-bring-your-own-certificate-signed-by-recognized-ca) as your SSL option, log into the Rancher UI and remove the certificates that Rancher automatically generates.


## Part 1-Provision Linux Hosts

Before you install Rancher, confirm you meet the host requirements. Provision 3 new Linux hosts using the requirements below.

### Host requirements

{{< requirements_os >}}

{{< requirements_hardware >}}

{{< requirements_software >}}

{{< requirements_ports >}}

## Part 2-Configure Load Balancer

When using a load balancer in front of Rancher, there's no need for the container to redirect port communication from port 80 or port 443. By passing the header `X-Forwarded-Proto: https`, this redirect is disabled. This is the expected configuration when terminating SSL externally.

The load balancer has to be configured to support the following:

* **WebSocket** connections
* **SPDY** / **HTTP/2** protocols
* Passing / setting the following headers:

| Header              | Value                                  | Description                                                                                                                                                              |
|---------------------|----------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Host`              | FQDN used to reach Rancher. | To identify the server requested by the client.                                                                                                                           |
| `X-Forwarded-Proto` | `https`                                | To identify the protocol that a client used to connect to the load balancer.<br /><br/>**Note:** If this header is present, `rancher/rancher` does not redirect HTTP to HTTPS. |
| `X-Forwarded-Port`  | Port used to reach Rancher.             | To identify the protocol that client used to connect to the load balancer.                                                                                       |
| `X-Forwarded-For`   | IP of the client connection.            | To identify the originating IP address of a client.                                                                                                                       |

Health checks can be executed on the `/healthz` endpoint of the node, this will return HTTP 200.

We have example configurations for the following load balancers:

* [Amazon ALB]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install-external-lb/alb)

## Part 3-Configure DNS

Choose a fully qualified domain name (FQDN) you want to use to access Rancher (something like `rancher.yourdomain.com`).<br/><br/>You need to create a DNS A record, pointing to the IP address of your [Load Balancer](#part-2-configure-load-balancer). If the DNS A record is created, you can validate if it's setup correctly by running `nslookup rancher.yourdomain.com`. It should return the IP address of your [Load Balancer](#part-2-configure-load-balancer) like in the example below.

```
$ nslookup rancher.yourdomain.com
Server:         your_nameserver_ip
Address:        your_nameserver_ip#53

Non-authoritative answer:
Name:   rancher.yourdomain.com
Address: ip_of_loadbalancer
```

## Part 4-Download RKE

Rancher Kubernetes Engine (RKE) is a fast, versatile Kubernetes installer that you can use to install Kubernetes on your Linux hosts. We will be using RKE to setup our cluster and run Rancher.

From your workstation, open a web browser and navigate to our [RKE Releases](https://github.com/rancher/rke/releases/latest) page. Download the latest RKE installer applicable to your Operating System:

* **MacOS**: `rke_darwin-amd64`
* **Linux**: `rke_linux-amd64`

Make the RKE binary that you just downloaded executable. Open Terminal, change directory to the location of the RKE binary, and then run the following command:

```
# MacOS
$ chmod +x rke_darwin-amd64
# Linux
$ chmod +x rke_linux-amd64
```

Confirm that RKE is now executable by running the following command:

```
# MacOS
$ ./rke_darwin-amd64 -version
# Linux
$ ./rke_linux-amd64 -version
```

**Result:** You receive output similar to what follows:
```
rke version v<N.N.N>
```

## Part 5-Download Config File Template

RKE uses a `.yml` config file to install and configure your Kubernetes cluster. There are 2 templates to choose from, depending on the SSL certificate you want to use.

1. Download one of following templates, depending on the SSL certificate you're using.

	- [Template for using Self Signed Certificate (3-node-externalssl-certificate.yml)](https://raw.githubusercontent.com/rancher/rancher/58e695b51096b1f404188379cea6f6a35aea9e4c/rke-templates/3-node-externalssl-certificate.yml)
	- [Template for using Certificate Signed By A Recognized Certificate Authority (3-node-externalssl-recognizedca.yml)](https://raw.githubusercontent.com/rancher/rancher/58e695b51096b1f404188379cea6f6a35aea9e4c/rke-templates/3-node-externalssl-recognizedca.yml)
2. Rename the file to `rancher-cluster.yml`.

## Part 6-Configure Nodes

Once you have the `rancher-cluster.yml` config file template, edit the nodes section to point toward your Linux hosts.

Open `rancher-cluster.yml` in your favorite text editor.

Update the `nodes` section with the information of your [Linux hosts](#provision-linux-hosts)

For each node in your cluster, update the following placeholders:

- `<IP>`: The IP address or hostname of the node.
- `<USER>`: The username to use to setup a SSH connection to the node. If the user is not the `root` user, make sure the user has access to the Docker socket. This can be tested by logging in on the node as the configured user and run `docker ps`.
- `<SSHKEY_FILE>`: The path of the SSH private key file used to authenticate to the node.

**Example nodes section YAML**

```
nodes:
  - address: 1.1.1.1
	user: root
	role: [controlplane,etcd,worker]
	ssh_key_path: ~/.ssh/id_rsa
  - address: 2.2.2.2
	user: root
	role: [controlplane,etcd,worker]
	ssh_key_path: ~/.ssh/id_rsa
  - address: 3.3.3.3
	user: root
	role: [controlplane,etcd,worker]
	ssh_key_path: ~/.ssh/id_rsa
```

## Part 7-Configure certificates

Certificates can be configured by using base64 encoded strings in the config file. The base64 encoded string can be generated using the following command:

  - **MacOS**: `cat FILENAME| base64`
  - **Linux**: `cat FILENAME | base64 -w0`
  - **Windows**: `certutil -encode FILENAME FILENAME.base64`

### Option A-Self Signed Certificate

>**Note:**
> If you are using Certificate Signed By A Recognized Certificate Authority, [click here](#option-b-certificate-signed-by-a-recognized-certificate-authority) to proceed.

If you are using a Self Signed Certificate, you will need to generate a base64 encoded string for your CA certificate file.

In the `kind: Secret` with `name: cattle-keys-server`:

* Replace `<BASE64_CA>` with the base64 encoded string of the CA Certificate file (usually called `ca.pem` or `ca.crt`)

After replacing the value, the file should look like the example below (the base64 encoded string should be different):

>**Note:**
> The base64 encoded string should be on the same line as `cacerts.pem`, without any newline at the beginning, in between or at the end.

```
---
apiVersion: v1
kind: Secret
metadata:
  name: cattle-keys-server
  namespace: cattle-system
type: Opaque
data:
  cacerts.pem: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNvRENDQVlnQ0NRRHVVWjZuMEZWeU16QU5CZ2txaGtpRzl3MEJBUXNGQURBU01SQXdEZ1lEVlFRRERBZDAKWlhOMExXTmhNQjRYRFRFNE1EVXdOakl4TURRd09Wb1hEVEU0TURjd05USXhNRFF3T1Zvd0VqRVFNQTRHQTFVRQpBd3dIZEdWemRDMWpZVENDQVNJd0RRWUpLb1pJaHZjTkFRRUJCUUFEZ2dFUEFEQ0NBUW9DZ2dFQkFNQmpBS3dQCndhRUhwQTdaRW1iWWczaTNYNlppVmtGZFJGckJlTmFYTHFPL2R0RUdmWktqYUF0Wm45R1VsckQxZUlUS3UzVHgKOWlGVlV4Mmo1Z0tyWmpwWitCUnFiZ1BNbk5hS1hocmRTdDRtUUN0VFFZdGRYMVFZS0pUbWF5NU45N3FoNTZtWQprMllKRkpOWVhHWlJabkdMUXJQNk04VHZramF0ZnZOdmJ0WmtkY2orYlY3aWhXanp2d2theHRUVjZlUGxuM2p5CnJUeXBBTDliYnlVcHlad3E2MWQvb0Q4VUtwZ2lZM1dOWmN1YnNvSjhxWlRsTnN6UjVadEFJV0tjSE5ZbE93d2oKaG41RE1tSFpwZ0ZGNW14TU52akxPRUc0S0ZRU3laYlV2QzlZRUhLZTUxbGVxa1lmQmtBZWpPY002TnlWQUh1dApuay9DMHpXcGdENkIwbkVDQXdFQUFUQU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FRRUFHTCtaNkRzK2R4WTZsU2VBClZHSkMvdzE1bHJ2ZXdia1YxN3hvcmlyNEMxVURJSXB6YXdCdFJRSGdSWXVtblVqOGo4T0hFWUFDUEthR3BTVUsKRDVuVWdzV0pMUUV0TDA2eTh6M3A0MDBrSlZFZW9xZlVnYjQrK1JLRVJrWmowWXR3NEN0WHhwOVMzVkd4NmNOQQozZVlqRnRQd2hoYWVEQmdma1hXQWtISXFDcEsrN3RYem9pRGpXbi8walI2VDcrSGlaNEZjZ1AzYnd3K3NjUDIyCjlDQVZ1ZFg4TWpEQ1hTcll0Y0ZINllBanlCSTJjbDhoSkJqa2E3aERpVC9DaFlEZlFFVFZDM3crQjBDYjF1NWcKdE03Z2NGcUw4OVdhMnp5UzdNdXk5bEthUDBvTXl1Ty82Tm1wNjNsVnRHeEZKSFh4WTN6M0lycGxlbTNZQThpTwpmbmlYZXc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
```

### Option B-Certificate Signed By A Recognized Certificate Authority

If you are using a Certificate Signed By A Recognized Certificate Authority, you don't need to perform any step in this part.

## Part 8-Configure FQDN

There is 1 reference to `<FQDN>` in the config file. This needs to be replaced with the FQDN chosen in [Configure DNS](#part-3-configure-dns).

In the `kind: Ingress` with `name: cattle-ingress-http`:

* Replace `<FQDN>` with the FQDN chosen in [Configure DNS](#part-3-configure-dns).

After replacing `<FQDN>` with the FQDN chosen in [Configure DNS](#part-3-configure-dns), the file should look like the example below (`rancher.yourdomain.com` is the FQDN used in this example):

```
 ---
  apiVersion: extensions/v1beta1
  kind: Ingress
  metadata:
    namespace: cattle-system
    name: cattle-ingress-http
    annotations:
      nginx.ingress.kubernetes.io/proxy-connect-timeout: "30"
      nginx.ingress.kubernetes.io/proxy-read-timeout: "1800"   # Max time in seconds for ws to remain shell window open
      nginx.ingress.kubernetes.io/proxy-send-timeout: "1800"   # Max time in seconds for ws to remain shell window open
  spec:
    rules:
    - host: rancher.yourdomain.com
      http:
        paths:
        - backend:
            serviceName: cattle-service
            servicePort: 80
```

Save the `.yml` file and close it.

## Part 9-Backup Your YAML File

After you close your `.yml` file, back it up to a secure location. You can use this file again when it's time to upgrade Rancher.

## Part 10-Run RKE

All configuration is in place to run RKE. You can do this by running the `rke up` command and using the `--config` parameter to point to your config file.

From your workstation, make sure `rancher-cluster.yml` and the downloaded `rke` binary are in the same directory.

Open a Terminal instance. Change to the directory that contains your config file and `rke`.

**Example:**

```
# MacOS
./rke_darwin-amd64 up --config rancher-cluster.yml
# Linux
./rke_linux-amd64 up --config rancher-cluster.yml
```

The output should be similar to the snippet below:

```
INFO[0000] Building Kubernetes cluster
INFO[0000] [dialer] Setup tunnel for host [1.1.1.1]
INFO[0000] [network] Deploying port listener containers
INFO[0000] [network] Pulling image [alpine:latest] on host [1.1.1.1]
...
INFO[0101] Finished building Kubernetes cluster successfully
```

## Part 11-Backup Config File

During installation, RKE generates a config file named `kube_config_rancher-cluster.yml` in the same directory as the RKE binary. Copy this file and back it up to a safe location. You'll use this file later when upgrading Rancher Server.

## Part 12-Remove Default Certificates

**For those using a certificate signed by a recognized CA:**

>**Note:** If you're using a self-signed certificate, you don't have to complete this part. Continue to [What's Next?](#what-s-next).

By default, Rancher automatically generates self-signed certificates for itself after installation. However, since you've provided your own certificates, you must disable the certificates that Rancher generated for itself.

**To Remove the Default Certificates:**

1. Log into Rancher.
2. Select  **Settings** > **cacerts**.
3. Choose `Edit` and remove the contents. Then click `Save`.

## What's Next?

<<<<<<< HEAD
- Log in to Rancher to make sure it deployed successfully. Open a web browser and navigate to the FQDN chosen in [Configure DNS](#part-3-configure-dns).
- Configure RKE to take snapshots of etcd that you can use as a backup in a disaster scenario. For more information, see [etcd recurring snapshots]({{< baseurl >}}/rancher/v2.x/en/installation/after-installation/etcd-backup-and-restoration/#etcd-recurring-snapshots).

## SSL FAQ / Troubleshooting
=======
You have a couple of options:

- Create a backup of your Rancher Server in case of a disaster scenario: [High Availablility Backup and Restoration]({{< baseurl >}}/rancher/v2.x/en/installation/backups-and-restoration/ha-backup-and-restoration).
- Create a Kubernettes cluster: [Creating a Cluster]({{ <baseurl> }}/rancher/v2.x/en/tasks/clusters/creating-a-cluster/).

<br/>

## FAQ and Troubleshooting
>>>>>>> major edits to ha install topic

{{< ssl_faq >}}
