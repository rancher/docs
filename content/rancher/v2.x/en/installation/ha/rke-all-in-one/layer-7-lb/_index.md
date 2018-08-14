---
title: High Availability Installation with External Load Balancer (HTTPS/Layer 7)
weight: 276
aliases:
- /rancher/v2.x/en/installation/ha-server-install-external-lb/
---
This set of instructions creates a new Kubernetes cluster that's dedicated to running Rancher in a high-availability (HA) configuration. This procedure walks you through setting up a 3-node cluster using the Rancher Kubernetes Engine (RKE). The cluster's sole purpose is running pods for Rancher. The setup is based on:

- Layer 7 Loadbalancer with SSL termination (HTTPS)
- NGINX Ingress controller (HTTP)

![Rancher HA]({{< baseurl >}}/img/rancher/ha/rancher2ha-l7.svg)

## Installation Outline

Installation of Rancher in a high-availability configuration involves multiple procedures. Review this outline to learn about each procedure you need to complete.

1. [Provision Linux Hosts](#1-provision-linux-hosts)

	Provision three Linux hosts to serve as your Kubernetes cluster.

2. [Configure Load Balancer](#2-configure-load-balancer)

	Configure your load balancer to have a highly available single point of entry to your Rancher cluster.

3. [Configure DNS](#3-configure-dns)

	Make your setup accessible using a DNS name by configuring the DNS to point to your loadbalancer.

4. [Download RKE](#4-download-rke)

	[RKE](https://github.com/rancher/rke/releases) is a fast, versatile Kubernetes installer that you can use to install Kubernetes on your Linux hosts.

5. [Download RKE Config File Template](#5-download-config-file-template)

	RKE uses a YAML config file to install and configure your Kubernetes cluster. Download one of our RKE config file templates to get started.

6. [Configure Nodes](#6-configure-nodes)

	Configure the **Nodes** section of the RKE config template.

7. [Configure Certificates](#7-configure-certificates)

	Configure the **Certificates** part of the template too.

8. [Configure FQDN](#8-configure-fqdn)

	And the **FQDN** part.

9. [Back Up Your RKE Config File](#9-back-up-your-rke-config-file)

	After you've completed configuration of the RKE config file: 1. it's no longer a template since you'll be using it, and 2. you should back up the RKE config file to a safe place. You will reuse this file for upgrades later.

10. [Run RKE](#10-run-rke)

	Run RKE to deploy Rancher to your cluster.

11. [Back Up Auto-Generated Config File](#11-back-up-auto-generated-config-file)

	During installation, RKE generates a config file that you'll use later for upgrades. Back it up to a safe location.

<br/>
## 1. Provision Linux Hosts

Before you install Rancher, confirm you meet the host requirements. Provision 3 new Linux hosts using the requirements below.

### Requirements

#### Operating System 

{{< requirements_os >}}

#### Hardware 

{{< requirements_hardware >}}

#### Software 

{{< requirements_software >}}

{{< note_server-tags >}}

#### Ports

The following diagram depicts the basic port requirements for Rancher. For a comprehensive list, see [Port Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/references/).

![Basic Port Requirements]({{< baseurl >}}/img/rancher/port-communications.png)

## 2. Configure Load Balancer

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

* [Amazon ALB configuration](alb/)
* [NGINX configuration](nginx/)

## 3. Configure DNS

Choose a fully qualified domain name (FQDN) that you want to use to access Rancher (e.g., `rancher.yourdomain.com`).<br/><br/>

1. Log into your DNS server a create a `DNS A` record that points to the IP address of your [load balancer](#2-configure-load-balancer).

2. Validate that the `DNS A` is working correctly. Run the following command from any terminal, replacing `HOSTNAME.DOMAIN.COM` with your chosen FQDN:

    `nslookup HOSTNAME.DOMAIN.COM`

    **Step Result:** Terminal displays output similar to the following:

    ```
    $ nslookup rancher.yourdomain.com
    Server:         YOUR_HOSTNAME_IP_ADDRESS
    Address:        YOUR_HOSTNAME_IP_ADDRESS#53

    Non-authoritative answer:
    Name:   rancher.yourdomain.com
    Address: HOSTNAME.DOMAIN.COM
    ```

<br/>

## 4. Download RKE

RKE is a fast, versatile Kubernetes installer that you can use to install Kubernetes on your Linux hosts. We will be using RKE to setup our cluster and run Rancher.

1. From your workstation, open a web browser and navigate to our [RKE Releases](https://github.com/rancher/rke/releases/latest) page. Download the latest RKE installer applicable to your Operating System:

    - **MacOS**: `rke_darwin-amd64`
    - **Linux**: `rke_linux-amd64`
    - **Windows**: `rke_windows-amd64.exe`

2. Make the RKE binary that you just downloaded executable. Open Terminal, change directory to the location of the RKE binary, and then run one of the commands below.

    >**Using Windows?**
    >The file is already an executable. Skip to [Download Config File Template](#5-download-config-file-template).

    ```
    # MacOS
    $ chmod +x rke_darwin-amd64
    # Linux
    $ chmod +x rke_linux-amd64
    ```

3.  Confirm that RKE is now executable by running the following command:

    ```
    # MacOS
    $ ./rke_darwin-amd64 --version
    # Linux
    $ ./rke_linux-amd64 --version
    ```

    **Step Result:** You receive output similar to what follows:
    ```
    rke version v<N.N.N>
    ```

## 5. Download RKE Config File Template

RKE uses a YAML config file to install and configure your Kubernetes cluster. There are 2 templates to choose from, depending on the SSL certificate you want to use.

1. Download one of following templates, depending on the SSL certificate you're using.

	- [Template for self-signed certificate<br/> `3-node-externalssl-certificate.yml`](https://raw.githubusercontent.com/rancher/rancher/58e695b51096b1f404188379cea6f6a35aea9e4c/rke-templates/3-node-externalssl-certificate.yml)
	- [Template for certificate signed by recognized CA<br/> `3-node-externalssl-recognizedca.yml`](https://raw.githubusercontent.com/rancher/rancher/7f60dc3afe1b45287ac36ba6bde6f7c6e35c11fe/rke-templates/3-node-externalssl-recognizedca.yml)

2. Rename the file to `rancher-cluster.yml`.

## 6. Configure Nodes

Once you have the `rancher-cluster.yml` config file template, edit the nodes section to point toward your Linux hosts.

1. Open `rancher-cluster.yml` in your favorite text editor.

2. Update the `nodes` section with the information of your [Linux hosts](#provision-linux-hosts).

    For each node in your cluster, update the following placeholders: `IP_ADDRESS_X` and `USER`.

```
nodes:
  - address: IP_ADDRESS_1
    # THE IP ADDRESS OR HOSTNAME OF THE NODE
	user: USER
    # USER WITH ADMIN ACCESS. USUALLY `root`
	role: [controlplane,etcd,worker]
	ssh_key_path: ~/.ssh/id_rsa
    # PATH TO SSH KEY THAT AUTHENTICATES ON YOUR WORKSTATION
    # USUALLY THE VALUE ABOVE
  - address: IP_ADDRESS_2
	user: USER
	role: [controlplane,etcd,worker]
	ssh_key_path: ~/.ssh/id_rsa
  - address: IP_ADDRESS_3
	user: USER
	role: [controlplane,etcd,worker]
	ssh_key_path: ~/.ssh/id_rsa
```

## 7. Configure Certificates

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

Choose from the following options:

- [Option A—Bring Your Own Certificate: Self-Signed](#option-a-bring-your-own-certificate-self-signed)
- [Option B—Bring Your Own Certificate: Signed by Recognized CA](#option-b-bring-your-own-certificate-signed-by-recognized-ca)

### Option A—Bring Your Own Certificate: Self-Signed

>**Prerequisites:**
>Create a self-signed certificate.
>
>- The certificate files must be in [PEM format](#pem).
>- The certificate files must be encoded in [base64](#base64).
>- In your certificate file, include all intermediate certificates in the chain. Order your certificates with your certificate first, followed by the intermediates. For an example, see [SSL FAQ / Troubleshooting](#cert-order).

1. In `kind: Secret` with `name: cattle-keys-ingress`:

    * Replace `<BASE64_CA>` with the base64 encoded string of the CA Certificate file (usually called `ca.pem` or `ca.crt`)

    >**Note:**
    > The base64 encoded string should be on the same line as `cacerts.pem`, without any newline at the beginning, in between or at the end.

    **Result:** After replacing the values, the file should look like the example below (the base64 encoded strings should be different):

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

### Option B—Bring Your Own Certificate: Signed by Recognized CA

If you are using a Certificate Signed By A Recognized Certificate Authority, you don't need to perform any step in this part.

## 8. Configure FQDN

There is one reference to `<FQDN>` in the RKE config file. Replace this reference with the FQDN you chose in in [3. Configure DNS](#part-3-configure-dns).

1. Open `rancher-cluster.yml`.

2. In the `kind: Ingress` with `name: cattle-ingress-http:`

    Replace `<FQDN>` with the FQDN chosen in [3. Configure DNS](#3-configure-dns).

    **Step Result:** After replacing the values, the file should look like the example below (the base64 encoded strings should be different):

    ```
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


3. Save the file and close it.

## 9. Back Up Your RKE Config File

After you close your RKE config file, `rancher-cluster.yml`, back it up to a secure location. You can use this file again when it's time to upgrade Rancher.

## 10. Run RKE

With all configuration in place, use RKE to launch Rancher. You can complete this action by running the `rke up` command and using the `--config` parameter to point toward your config file.

1. From your workstation, make sure `rancher-cluster.yml` and the downloaded `rke` binary are in the same directory.

2. Open a Terminal instance. Change to the directory that contains your config file and `rke`.

3. Enter one of the `rke up` commands listen below.

    ```
    # MacOS
    ./rke_darwin-amd64 up --config rancher-cluster.yml
    # Linux
    ./rke_linux-amd64 up --config rancher-cluster.yml
    ```

    **Step Result:** The output should be similar to the snippet below:

    ```
    INFO[0000] Building Kubernetes cluster
    INFO[0000] [dialer] Setup tunnel for host [1.1.1.1]
    INFO[0000] [network] Deploying port listener containers
    INFO[0000] [network] Pulling image [alpine:latest] on host [1.1.1.1]
    ...
    INFO[0101] Finished building Kubernetes cluster successfully
    ```

## 11. Back Up Auto-Generated Config File

During installation, RKE automatically generates a config file named `kube_config_rancher-cluster.yml` in the same directory as the `rancher-cluster.yml` file. Copy this file and back it up to a safe location. You'll use this file later when upgrading Rancher Server.

## What's Next?

You have a couple of options:

- Create a backup of your Rancher Server in case of a disaster scenario: [High Availablility Back Up and Restoration]({{< baseurl >}}/rancher/v2.x/en/backups/ha-backups/).
- Create a Kubernetes cluster: [Creating a Cluster]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/creating-a-cluster/).

<br/>

## FAQ and Troubleshooting

{{< ssl_faq_ha >}}
