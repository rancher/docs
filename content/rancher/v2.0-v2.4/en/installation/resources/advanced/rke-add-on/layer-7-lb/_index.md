---
title: Kubernetes Install with External Load Balancer (HTTPS/Layer 7)
weight: 276
aliases:
- /rancher/v2.0-v2.4/en/installation/ha/rke-add-on/layer-7-lb
- /rancher/v2.0-v2.4/en/installation/options/rke-add-on/layer-7-lb/
- /rancher/v2.0-v2.4/en/installation/options/rke-add-on/layer-7-lb
---

> #### **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
>Please use the Rancher Helm chart to install Rancher on a Kubernetes cluster. For details, see the [Kubernetes Install]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/).
>
>If you are currently using the RKE add-on install method, see [Migrating from a Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.

This procedure walks you through setting up a 3-node cluster using the Rancher Kubernetes Engine (RKE). The cluster's sole purpose is running pods for Rancher. The setup is based on:

- Layer 7 load balancer with SSL termination (HTTPS)
- [NGINX Ingress controller (HTTP)](https://kubernetes.github.io/ingress-nginx/)

In an HA setup that uses a layer 7 load balancer, the load balancer accepts Rancher client connections over the HTTP protocol (i.e., the application level). This application-level access allows the load balancer to read client requests and then redirect to them to cluster nodes using logic that optimally distributes load.

<sup>Rancher installed on a Kubernetes cluster with layer 7 load balancer, depicting SSL termination at load balancer</sup>
![Rancher HA]({{<baseurl>}}/img/rancher/ha/rancher2ha-l7.svg)

## Installation Outline

Installation of Rancher in a high-availability configuration involves multiple procedures. Review this outline to learn about each procedure you need to complete.

<!-- TOC -->

- [1. Provision Linux Hosts](#1-provision-linux-hosts)
- [2. Configure Load Balancer](#2-configure-load-balancer)
- [3. Configure DNS](#3-configure-dns)
- [4. Install RKE](#4-install-rke)
- [5. Download RKE Config File Template](#5-download-rke-config-file-template)
- [6. Configure Nodes](#6-configure-nodes)
- [7. Configure Certificates](#7-configure-certificates)
- [8. Configure FQDN](#8-configure-fqdn)
- [9. Configure Rancher version](#9-configure-rancher-version)
- [10. Back Up Your RKE Config File](#10-back-up-your-rke-config-file)
- [11. Run RKE](#11-run-rke)
- [12. Back Up Auto-Generated Config File](#12-back-up-auto-generated-config-file)


<!-- /TOC -->
## 1. Provision Linux Hosts

Provision three Linux hosts according to our [Requirements]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/requirements).

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

* [Amazon ELB configuration]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nlb/)
* [NGINX configuration]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nginx/)

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

## 4. Install RKE

RKE (Rancher Kubernetes Engine) is a fast, versatile Kubernetes installer that you can use to install Kubernetes on your Linux hosts. We will use RKE to setup our cluster and run Rancher.

1. Follow the [RKE Install]({{<baseurl>}}/rke/latest/en/installation) instructions.

2. Confirm that RKE is now executable by running the following command:

    ```
    rke --version
    ```

## 5. Download RKE Config File Template

RKE uses a YAML config file to install and configure your Kubernetes cluster. There are 2 templates to choose from, depending on the SSL certificate you want to use.

1. Download one of following templates, depending on the SSL certificate you're using.

	- [Template for self-signed certificate<br/> `3-node-externalssl-certificate.yml`]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/cluster-yml-templates/3-node-externalssl-certificate)
	- [Template for certificate signed by recognized CA<br/> `3-node-externalssl-recognizedca.yml`]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/cluster-yml-templates/3-node-externalssl-recognizedca)



2. Rename the file to `rancher-cluster.yml`.

## 6. Configure Nodes

Once you have the `rancher-cluster.yml` config file template, edit the nodes section to point toward your Linux hosts.

1. Open `rancher-cluster.yml` in your favorite text editor.

1. Update the `nodes` section with the information of your [Linux hosts](#1-provision-linux-hosts).

    For each node in your cluster, update the following placeholders: `IP_ADDRESS_X` and `USER`. The specified user should be able to access the Docker socket, you can test this by logging in with the specified user and run `docker ps`.

    >**Note:**
    >
    >When using RHEL/CentOS, the SSH user can't be root due to https://bugzilla.redhat.com/show_bug.cgi?id=1527565. See [Operating System Requirements]({{<baseurl>}}/rke/latest/en/installation/os#redhat-enterprise-linux-rhel-centos) for RHEL/CentOS specific requirements.

        nodes:
            # The IP address or hostname of the node
        - address: IP_ADDRESS_1
            # User that can login to the node and has access to the Docker socket (i.e. can execute `docker ps` on the node)
            # When using RHEL/CentOS, this can't be root due to https://bugzilla.redhat.com/show_bug.cgi?id=1527565
            user: USER
            role: [controlplane,etcd,worker]
            # Path the SSH key that can be used to access to node with the specified user
            ssh_key_path: ~/.ssh/id_rsa
        - address: IP_ADDRESS_2
            user: USER
            role: [controlplane,etcd,worker]
            ssh_key_path: ~/.ssh/id_rsa
        - address: IP_ADDRESS_3
            user: USER
            role: [controlplane,etcd,worker]
            ssh_key_path: ~/.ssh/id_rsa

1. **Optional:** By default, `rancher-cluster.yml` is configured to take backup snapshots of your data. To disable these snapshots, change the `backup` directive setting to `false`, as depicted below.

        services:
          etcd:
            backup: false

## 7. Configure Certificates

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

Choose from the following options:

{{% accordion id="option-a" label="Option A—Bring Your Own Certificate: Self-Signed" %}}
>**Prerequisites:**
>Create a self-signed certificate.
>
>- The certificate files must be in PEM format.
>- The certificate files must be encoded in [base64](#base64).
>- In your certificate file, include all intermediate certificates in the chain. Order your certificates with your certificate first, followed by the intermediates. For an example, see [Certificate Troubleshooting.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/troubleshooting)

In `kind: Secret` with `name: cattle-keys-ingress`, replace `<BASE64_CA>` with the base64 encoded string of the CA Certificate file (usually called `ca.pem` or `ca.crt`)

>**Note:** The base64 encoded string should be on the same line as `cacerts.pem`, without any newline at the beginning, in between or at the end.

After replacing the values, the file should look like the example below (the base64 encoded strings should be different):

        ---
        apiVersion: v1
        kind: Secret
        metadata:
            name: cattle-keys-server
            namespace: cattle-system
        type: Opaque
        data:
            cacerts.pem: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNvRENDQVlnQ0NRRHVVWjZuMEZWeU16QU5CZ2txaGtpRzl3MEJBUXNGQURBU01SQXdEZ1lEVlFRRERBZDAKWlhOMExXTmhNQjRYRFRFNE1EVXdOakl4TURRd09Wb1hEVEU0TURjd05USXhNRFF3T1Zvd0VqRVFNQTRHQTFVRQpBd3dIZEdWemRDMWpZVENDQVNJd0RRWUpLb1pJaHZjTkFRRUJCUUFEZ2dFUEFEQ0NBUW9DZ2dFQkFNQmpBS3dQCndhRUhwQTdaRW1iWWczaTNYNlppVmtGZFJGckJlTmFYTHFPL2R0RUdmWktqYUF0Wm45R1VsckQxZUlUS3UzVHgKOWlGVlV4Mmo1Z0tyWmpwWitCUnFiZ1BNbk5hS1hocmRTdDRtUUN0VFFZdGRYMVFZS0pUbWF5NU45N3FoNTZtWQprMllKRkpOWVhHWlJabkdMUXJQNk04VHZramF0ZnZOdmJ0WmtkY2orYlY3aWhXanp2d2theHRUVjZlUGxuM2p5CnJUeXBBTDliYnlVcHlad3E2MWQvb0Q4VUtwZ2lZM1dOWmN1YnNvSjhxWlRsTnN6UjVadEFJV0tjSE5ZbE93d2oKaG41RE1tSFpwZ0ZGNW14TU52akxPRUc0S0ZRU3laYlV2QzlZRUhLZTUxbGVxa1lmQmtBZWpPY002TnlWQUh1dApuay9DMHpXcGdENkIwbkVDQXdFQUFUQU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FRRUFHTCtaNkRzK2R4WTZsU2VBClZHSkMvdzE1bHJ2ZXdia1YxN3hvcmlyNEMxVURJSXB6YXdCdFJRSGdSWXVtblVqOGo4T0hFWUFDUEthR3BTVUsKRDVuVWdzV0pMUUV0TDA2eTh6M3A0MDBrSlZFZW9xZlVnYjQrK1JLRVJrWmowWXR3NEN0WHhwOVMzVkd4NmNOQQozZVlqRnRQd2hoYWVEQmdma1hXQWtISXFDcEsrN3RYem9pRGpXbi8walI2VDcrSGlaNEZjZ1AzYnd3K3NjUDIyCjlDQVZ1ZFg4TWpEQ1hTcll0Y0ZINllBanlCSTJjbDhoSkJqa2E3aERpVC9DaFlEZlFFVFZDM3crQjBDYjF1NWcKdE03Z2NGcUw4OVdhMnp5UzdNdXk5bEthUDBvTXl1Ty82Tm1wNjNsVnRHeEZKSFh4WTN6M0lycGxlbTNZQThpTwpmbmlYZXc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==

{{% /accordion %}}
{{% accordion id="option-b" label="Option B—Bring Your Own Certificate: Signed by Recognized CA" %}}
If you are using a Certificate Signed By A Recognized Certificate Authority, you don't need to perform any step in this part.
{{% /accordion %}}

## 8. Configure FQDN

There is one reference to `<FQDN>` in the RKE config file. Replace this reference with the FQDN you chose in [3. Configure DNS](#3-configure-dns).

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

## 9. Configure Rancher version

The last reference that needs to be replaced is `<RANCHER_VERSION>`. This needs to be replaced with a Rancher version which is marked as stable. The latest stable release of Rancher can be found in the [GitHub README](https://github.com/rancher/rancher/blob/master/README.md). Make sure the version is an actual version number, and not a named tag like `stable` or `latest`. The example below shows the version configured to `v2.0.6`.

```
      spec:
        serviceAccountName: cattle-admin
        containers:
        - image: rancher/rancher:v2.0.6
          imagePullPolicy: Always
```

## 10. Back Up Your RKE Config File

After you close your RKE config file, `rancher-cluster.yml`, back it up to a secure location. You can use this file again when it's time to upgrade Rancher.

## 11. Run RKE

With all configuration in place, use RKE to launch Rancher. You can complete this action by running the `rke up` command and using the `--config` parameter to point toward your config file.

1. From your workstation, make sure `rancher-cluster.yml` and the downloaded `rke` binary are in the same directory.

2. Open a Terminal instance. Change to the directory that contains your config file and `rke`.

3. Enter one of the `rke up` commands listen below.

    ```
    rke up --config rancher-cluster.yml
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

## 12. Back Up Auto-Generated Config File

During installation, RKE automatically generates a config file named `kube_config_rancher-cluster.yml` in the same directory as the `rancher-cluster.yml` file. Copy this file and back it up to a safe location. You'll use this file later when upgrading Rancher Server.

## What's Next?

- **Recommended:** Review [Creating Backups—High Availability Back Up and Restoration]({{<baseurl>}}/rancher/v2.0-v2.4/en/backups/backups/ha-backups/) to learn how to backup your Rancher Server in case of a disaster scenario.
- Create a Kubernetes cluster: [Creating a Cluster]({{<baseurl>}}/rancher/v2.0-v2.4/en/tasks/clusters/creating-a-cluster/).

<br/>

## FAQ and Troubleshooting

{{< ssl_faq_ha >}}
