---
title: Kubernetes Install with External Load Balancer (TCP/Layer 4)
weight: 275
aliases:
- /rancher/v2.0-v2.4/en/installation/ha/rke-add-on/layer-4-lb
- /rancher/v2.0-v2.4/en/installation/options/helm2/rke-add-on/layer-4-lb
- /rancher/v2.0-v2.4/en/installation/options/rke-add-on/layer-4-lb
---

> #### **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
>Please use the Rancher helm chart to install Rancher on a Kubernetes cluster. For details, see the [Kubernetes Install]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/).
>
>If you are currently using the RKE add-on install method, see [Migrating from a Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.

This procedure walks you through setting up a 3-node cluster using the Rancher Kubernetes Engine (RKE). The cluster's sole purpose is running pods for Rancher. The setup is based on:

- Layer 4 load balancer (TCP)
- [NGINX ingress controller with SSL termination (HTTPS)](https://kubernetes.github.io/ingress-nginx/)

In an HA setup that uses a layer 4 load balancer, the load balancer accepts Rancher client connections over the TCP/UDP protocols (i.e., the transport level). The load balancer then forwards these connections to individual cluster nodes without reading the request itself. Because the load balancer cannot read the packets it's forwarding, the routing decisions it can make are limited.

<sup>Rancher installed on a Kubernetes cluster with layer 4 load balancer, depicting SSL termination at ingress controllers</sup>
![Rancher HA]({{<baseurl>}}/img/rancher/ha/rancher2ha.svg)

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

<br/>

## 1. Provision Linux Hosts

Provision three Linux hosts according to our [Requirements]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/requirements).

## 2. Configure Load Balancer

We will be using NGINX as our Layer 4 Load Balancer (TCP). NGINX will forward all connections to one of your Rancher nodes. If you want to use Amazon NLB, you can skip this step and use [Amazon NLB configuration]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nlb)

>**Note:**
> In this configuration, the load balancer is positioned in front of your Linux hosts. The load balancer can be any host that you have available that's capable of running NGINX.
>
>One caveat: do not use one of your Rancher nodes as the load balancer.

### A. Install NGINX

Start by installing NGINX on your load balancer host. NGINX has packages available for all known operating systems. For help installing NGINX, refer to their [install documentation](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/).

The `stream` module is required, which is present when using the official NGINX packages. Please refer to your OS documentation how to install and enable the NGINX `stream` module on your operating system.

### B. Create NGINX Configuration

After installing NGINX, you need to update the NGINX config file, `nginx.conf`, with the IP addresses for your nodes.

1. Copy and paste the code sample below into your favorite text editor. Save it as `nginx.conf`.

2. From `nginx.conf`, replace `IP_NODE_1`, `IP_NODE_2`, and `IP_NODE_3` with the IPs of your [Linux hosts](#1-provision-linux-hosts).

    >**Note:** This Nginx configuration is only an example and may not suit your environment. For complete documentation, see [NGINX Load Balancing - TCP and UDP Load Balancer](https://docs.nginx.com/nginx/admin-guide/load-balancer/tcp-udp-load-balancer/).

    **Example NGINX config:**
    ```
    worker_processes 4;
    worker_rlimit_nofile 40000;

    events {
        worker_connections 8192;
    }

    http {
        server {
            listen         80;
            return 301 https://$host$request_uri;
        }
    }

    stream {
        upstream rancher_servers {
            least_conn;
            server IP_NODE_1:443 max_fails=3 fail_timeout=5s;
            server IP_NODE_2:443 max_fails=3 fail_timeout=5s;
            server IP_NODE_3:443 max_fails=3 fail_timeout=5s;
        }
        server {
            listen     443;
            proxy_pass rancher_servers;
        }
    }
    ```

3. Save `nginx.conf` to your load balancer at the following path: `/etc/nginx/nginx.conf`.

4. Load the updates to your NGINX configuration by running the following command:

    ```
    # nginx -s reload
    ```

### Option - Run NGINX as Docker container

Instead of installing NGINX as a package on the operating system, you can rather run it as a Docker container. Save the edited **Example NGINX config** as `/etc/nginx.conf` and run the following command to launch the NGINX container:

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /etc/nginx.conf:/etc/nginx/nginx.conf \
  nginx:1.14
```

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

RKE uses a `.yml` config file to install and configure your Kubernetes cluster. There are 2 templates to choose from, depending on the SSL certificate you want to use.

1. Download one of following templates, depending on the SSL certificate you're using.

	- [Template for self-signed certificate<br/>]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/cluster-yml-templates/3-node-certificate)
	- [Template for certificate signed by recognized CA<br/> ]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/cluster-yml-templates/3-node-certificate-recognizedca)



2. Rename the file to `rancher-cluster.yml`.

## 6. Configure Nodes

Once you have the `rancher-cluster.yml` config file template, edit the nodes section to point toward your Linux hosts.

1. Open `rancher-cluster.yml` in your favorite text editor.

1. Update the `nodes` section with the information of your [Linux hosts](#1-provision-linux-hosts).

    For each node in your cluster, update the following placeholders: `IP_ADDRESS_X` and `USER`. The specified user should be able to access the Docker socket, you can test this by logging in with the specified user and run `docker ps`.

    >**Note:**
    > When using RHEL/CentOS, the SSH user can't be root due to https://bugzilla.redhat.com/show_bug.cgi?id=1527565. See [Operating System Requirements]({{<baseurl>}}/rke/latest/en/installation/os#redhat-enterprise-linux-rhel-centos) >for RHEL/CentOS specific requirements.

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

1. In `kind: Secret` with `name: cattle-keys-ingress`:

    * Replace `<BASE64_CRT>` with the base64 encoded string of the Certificate file (usually called `cert.pem` or `domain.crt`)
    * Replace `<BASE64_KEY>` with the base64 encoded string of the Certificate Key file (usually called `key.pem` or `domain.key`)

    >**Note:**
    > The base64 encoded string should be on the same line as `tls.crt` or `tls.key`, without any newline at the beginning, in between or at the end.

    **Step Result:** After replacing the values, the file should look like the example below (the base64 encoded strings should be different):

    ```yaml
    ---
    apiVersion: v1
    kind: Secret
    metadata:
        name: cattle-keys-ingress
        namespace: cattle-system
    type: Opaque
    data:
        tls.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUM1RENDQWN5Z0F3SUJBZ0lKQUlHc25NeG1LeGxLTUEwR0NTcUdTSWIzRFFFQkN3VUFNQkl4RURBT0JnTlYKQkFNTUIzUmxjM1F0WTJFd0hoY05NVGd3TlRBMk1qRXdOREE1V2hjTk1UZ3dOekExTWpFd05EQTVXakFXTVJRdwpFZ1lEVlFRRERBdG9ZUzV5Ym1Ob2NpNXViRENDQVNJd0RRWUpLb1pJaHZjTkFRRUJCUUFEZ2dFUEFEQ0NBUW9DCmdnRUJBTFJlMXdzekZSb2Rib2pZV05DSHA3UkdJaUVIMENDZ1F2MmdMRXNkUUNKZlcrUFEvVjM0NnQ3bSs3TFEKZXJaV3ZZMWpuY2VuWU5JSGRBU0VnU0ducWExYnhUSU9FaE0zQXpib3B0WDhjSW1OSGZoQlZETGdiTEYzUk0xaQpPM1JLTGdIS2tYSTMxZndjbU9zWGUwaElYQnpUbmxnM20vUzlXL3NTc0l1dDVwNENDUWV3TWlpWFhuUElKb21lCmpkS3VjSHFnMTlzd0YvcGVUalZrcVpuMkJHazZRaWFpMU41bldRV0pjcThTenZxTTViZElDaWlwYU9hWWQ3RFEKYWRTejV5dlF0YkxQNW4wTXpnOU43S3pGcEpvUys5QWdkWDI5cmZqV2JSekp3RzM5R3dRemN6VWtLcnZEb05JaQo0UFJHc01yclFNVXFSYjRSajNQOEJodEMxWXNDQXdFQUFhTTVNRGN3Q1FZRFZSMFRCQUl3QURBTEJnTlZIUThFCkJBTUNCZUF3SFFZRFZSMGxCQll3RkFZSUt3WUJCUVVIQXdJR0NDc0dBUVVGQndNQk1BMEdDU3FHU0liM0RRRUIKQ3dVQUE0SUJBUUNKZm5PWlFLWkowTFliOGNWUW5Vdi9NZkRZVEJIQ0pZcGM4MmgzUGlXWElMQk1jWDhQRC93MgpoOUExNkE4NGNxODJuQXEvaFZYYy9JNG9yaFY5WW9jSEg5UlcvbGthTUQ2VEJVR0Q1U1k4S292MHpHQ1ROaDZ6Ci9wZTNqTC9uU0pYSjRtQm51czJheHFtWnIvM3hhaWpYZG9kMmd3eGVhTklvRjNLbHB2aGU3ZjRBNmpsQTM0MmkKVVlCZ09iN1F5KytRZWd4U1diSmdoSzg1MmUvUUhnU2FVSkN6NW1sNGc1WndnNnBTUXhySUhCNkcvREc4dElSYwprZDMxSk1qY25Fb1Rhc1Jyc1NwVmNGdXZyQXlXN2liakZyYzhienBNcE1obDVwYUZRcEZzMnIwaXpZekhwakFsCk5ZR2I2OHJHcjBwQkp3YU5DS2ErbCtLRTk4M3A3NDYwCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K
        tls.key: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBdEY3WEN6TVZHaDF1aU5oWTBJZW50RVlpSVFmUUlLQkMvYUFzU3gxQUlsOWI0OUQ5ClhmanEzdWI3c3RCNnRsYTlqV09keDZkZzBnZDBCSVNCSWFlcHJWdkZNZzRTRXpjRE51aW0xZnh3aVkwZCtFRlUKTXVCc3NYZEV6V0k3ZEVvdUFjcVJjamZWL0J5WTZ4ZDdTRWhjSE5PZVdEZWI5TDFiK3hLd2k2M21uZ0lKQjdBeQpLSmRlYzhnbWlaNk4wcTV3ZXFEWDJ6QVgrbDVPTldTcG1mWUVhVHBDSnFMVTNtZFpCWWx5cnhMTytvemx0MGdLCktLbG81cGgzc05CcDFMUG5LOUMxc3MvbWZRek9EMDNzck1Xa21oTDcwQ0IxZmIydCtOWnRITW5BYmYwYkJETnoKTlNRcXU4T2cwaUxnOUVhd3l1dEF4U3BGdmhHUGMvd0dHMExWaXdJREFRQUJBb0lCQUJKYUErOHp4MVhjNEw0egpwUFd5bDdHVDRTMFRLbTNuWUdtRnZudjJBZXg5WDFBU2wzVFVPckZyTnZpK2xYMnYzYUZoSFZDUEN4N1RlMDVxClhPa2JzZnZkZG5iZFQ2RjgyMnJleVByRXNINk9TUnBWSzBmeDVaMDQwVnRFUDJCWm04eTYyNG1QZk1vbDdya2MKcm9Kd09rOEVpUHZZekpsZUd0bTAwUm1sRysyL2c0aWJsOTVmQXpyc1MvcGUyS3ZoN2NBVEtIcVh6MjlpUmZpbApiTGhBamQwcEVSMjNYU0hHR1ZqRmF3amNJK1c2L2RtbDZURDhrSzFGaUtldmJKTlREeVNXQnpPbXRTYUp1K01JCm9iUnVWWG4yZVNoamVGM1BYcHZRMWRhNXdBa0dJQWxOWjRHTG5QU2ZwVmJyU0plU3RrTGNzdEJheVlJS3BWZVgKSVVTTHM0RUNnWUVBMmNnZUE2WHh0TXdFNU5QWlNWdGhzbXRiYi9YYmtsSTdrWHlsdk5zZjFPdXRYVzkybVJneQpHcEhUQ0VubDB0Z1p3T081T1FLNjdFT3JUdDBRWStxMDJzZndwcmgwNFZEVGZhcW5QNTBxa3BmZEJLQWpmanEyCjFoZDZMd2hLeDRxSm9aelp2VkowV0lvR1ZLcjhJSjJOWGRTUVlUanZUZHhGczRTamdqNFFiaEVDZ1lFQTFBWUUKSEo3eVlza2EvS2V2OVVYbmVrSTRvMm5aYjJ1UVZXazRXSHlaY2NRN3VMQVhGY3lJcW5SZnoxczVzN3RMTzJCagozTFZNUVBzazFNY25oTTl4WE4vQ3ZDTys5b2t0RnNaMGJqWFh6NEJ5V2lFNHJPS1lhVEFwcDVsWlpUT3ZVMWNyCm05R3NwMWJoVDVZb2RaZ3IwUHQyYzR4U2krUVlEWnNFb2lFdzNkc0NnWUVBcVJLYWNweWZKSXlMZEJjZ0JycGkKQTRFalVLMWZsSjR3enNjbGFKUDVoM1NjZUFCejQzRU1YT0kvSXAwMFJsY3N6em83N3cyMmpud09mOEJSM0RBMwp6ZTRSWDIydWw4b0hGdldvdUZOTTNOZjNaNExuYXpVc0F0UGhNS2hRWGMrcEFBWGthUDJkZzZ0TU5PazFxaUNHCndvU212a1BVVE84b1ViRTB1NFZ4ZmZFQ2dZQUpPdDNROVNadUlIMFpSSitIV095enlOQTRaUEkvUkhwN0RXS1QKajVFS2Y5VnR1OVMxY1RyOTJLVVhITXlOUTNrSjg2OUZPMnMvWk85OGg5THptQ2hDTjhkOWN6enI5SnJPNUFMTApqWEtBcVFIUlpLTFgrK0ZRcXZVVlE3cTlpaHQyMEZPb3E5OE5SZDMzSGYxUzZUWDNHZ3RWQ21YSml6dDAxQ3ZHCmR4VnVnd0tCZ0M2Mlp0b0RLb3JyT2hvdTBPelprK2YwQS9rNDJBOENiL29VMGpwSzZtdmxEWmNYdUF1QVZTVXIKNXJCZjRVYmdVYndqa1ZWSFR6LzdDb1BWSjUvVUxJWk1Db1RUNFprNTZXWDk4ZE93Q3VTVFpZYnlBbDZNS1BBZApTZEpuVVIraEpnSVFDVGJ4K1dzYnh2d0FkbWErWUhtaVlPRzZhSklXMXdSd1VGOURLUEhHCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==
    ```

2. In `kind: Secret` with `name: cattle-keys-server`, replace `<BASE64_CA>` with the base64 encoded string of the CA Certificate file (usually called `ca.pem` or `ca.crt`).

    >**Note:**
    > The base64 encoded string should be on the same line as `cacerts.pem`, without any newline at the beginning, in between or at the end.


    **Step Result:** The file should look like the example below (the base64 encoded string should be different):

    ```yaml
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

{{% /accordion %}}

{{% accordion id="option-b" label="Option B—Bring Your Own Certificate: Signed by Recognized CA" %}}

If you are using a Certificate Signed By A Recognized Certificate Authority, you will need to generate a base64 encoded string for the Certificate file and the Certificate Key file. Make sure that your certificate file includes all the intermediate certificates in the chain, the order of certificates in this case is first your own certificate, followed by the intermediates. Please refer to the documentation of your CSP (Certificate Service Provider) to see what intermediate certificate(s) need to be included.

In the `kind: Secret` with `name: cattle-keys-ingress`:

* Replace `<BASE64_CRT>` with the base64 encoded string of the Certificate file (usually called `cert.pem` or `domain.crt`)
* Replace `<BASE64_KEY>` with the base64 encoded string of the Certificate Key file (usually called `key.pem` or `domain.key`)

After replacing the values, the file should look like the example below (the base64 encoded strings should be different):

>**Note:**
> The base64 encoded string should be on the same line as `tls.crt` or `tls.key`, without any newline at the beginning, in between or at the end.

```yaml
---
apiVersion: v1
kind: Secret
metadata:
  name: cattle-keys-ingress
  namespace: cattle-system
type: Opaque
data:
  tls.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUM1RENDQWN5Z0F3SUJBZ0lKQUlHc25NeG1LeGxLTUEwR0NTcUdTSWIzRFFFQkN3VUFNQkl4RURBT0JnTlYKQkFNTUIzUmxjM1F0WTJFd0hoY05NVGd3TlRBMk1qRXdOREE1V2hjTk1UZ3dOekExTWpFd05EQTVXakFXTVJRdwpFZ1lEVlFRRERBdG9ZUzV5Ym1Ob2NpNXViRENDQVNJd0RRWUpLb1pJaHZjTkFRRUJCUUFEZ2dFUEFEQ0NBUW9DCmdnRUJBTFJlMXdzekZSb2Rib2pZV05DSHA3UkdJaUVIMENDZ1F2MmdMRXNkUUNKZlcrUFEvVjM0NnQ3bSs3TFEKZXJaV3ZZMWpuY2VuWU5JSGRBU0VnU0ducWExYnhUSU9FaE0zQXpib3B0WDhjSW1OSGZoQlZETGdiTEYzUk0xaQpPM1JLTGdIS2tYSTMxZndjbU9zWGUwaElYQnpUbmxnM20vUzlXL3NTc0l1dDVwNENDUWV3TWlpWFhuUElKb21lCmpkS3VjSHFnMTlzd0YvcGVUalZrcVpuMkJHazZRaWFpMU41bldRV0pjcThTenZxTTViZElDaWlwYU9hWWQ3RFEKYWRTejV5dlF0YkxQNW4wTXpnOU43S3pGcEpvUys5QWdkWDI5cmZqV2JSekp3RzM5R3dRemN6VWtLcnZEb05JaQo0UFJHc01yclFNVXFSYjRSajNQOEJodEMxWXNDQXdFQUFhTTVNRGN3Q1FZRFZSMFRCQUl3QURBTEJnTlZIUThFCkJBTUNCZUF3SFFZRFZSMGxCQll3RkFZSUt3WUJCUVVIQXdJR0NDc0dBUVVGQndNQk1BMEdDU3FHU0liM0RRRUIKQ3dVQUE0SUJBUUNKZm5PWlFLWkowTFliOGNWUW5Vdi9NZkRZVEJIQ0pZcGM4MmgzUGlXWElMQk1jWDhQRC93MgpoOUExNkE4NGNxODJuQXEvaFZYYy9JNG9yaFY5WW9jSEg5UlcvbGthTUQ2VEJVR0Q1U1k4S292MHpHQ1ROaDZ6Ci9wZTNqTC9uU0pYSjRtQm51czJheHFtWnIvM3hhaWpYZG9kMmd3eGVhTklvRjNLbHB2aGU3ZjRBNmpsQTM0MmkKVVlCZ09iN1F5KytRZWd4U1diSmdoSzg1MmUvUUhnU2FVSkN6NW1sNGc1WndnNnBTUXhySUhCNkcvREc4dElSYwprZDMxSk1qY25Fb1Rhc1Jyc1NwVmNGdXZyQXlXN2liakZyYzhienBNcE1obDVwYUZRcEZzMnIwaXpZekhwakFsCk5ZR2I2OHJHcjBwQkp3YU5DS2ErbCtLRTk4M3A3NDYwCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K
  tls.key: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBdEY3WEN6TVZHaDF1aU5oWTBJZW50RVlpSVFmUUlLQkMvYUFzU3gxQUlsOWI0OUQ5ClhmanEzdWI3c3RCNnRsYTlqV09keDZkZzBnZDBCSVNCSWFlcHJWdkZNZzRTRXpjRE51aW0xZnh3aVkwZCtFRlUKTXVCc3NYZEV6V0k3ZEVvdUFjcVJjamZWL0J5WTZ4ZDdTRWhjSE5PZVdEZWI5TDFiK3hLd2k2M21uZ0lKQjdBeQpLSmRlYzhnbWlaNk4wcTV3ZXFEWDJ6QVgrbDVPTldTcG1mWUVhVHBDSnFMVTNtZFpCWWx5cnhMTytvemx0MGdLCktLbG81cGgzc05CcDFMUG5LOUMxc3MvbWZRek9EMDNzck1Xa21oTDcwQ0IxZmIydCtOWnRITW5BYmYwYkJETnoKTlNRcXU4T2cwaUxnOUVhd3l1dEF4U3BGdmhHUGMvd0dHMExWaXdJREFRQUJBb0lCQUJKYUErOHp4MVhjNEw0egpwUFd5bDdHVDRTMFRLbTNuWUdtRnZudjJBZXg5WDFBU2wzVFVPckZyTnZpK2xYMnYzYUZoSFZDUEN4N1RlMDVxClhPa2JzZnZkZG5iZFQ2RjgyMnJleVByRXNINk9TUnBWSzBmeDVaMDQwVnRFUDJCWm04eTYyNG1QZk1vbDdya2MKcm9Kd09rOEVpUHZZekpsZUd0bTAwUm1sRysyL2c0aWJsOTVmQXpyc1MvcGUyS3ZoN2NBVEtIcVh6MjlpUmZpbApiTGhBamQwcEVSMjNYU0hHR1ZqRmF3amNJK1c2L2RtbDZURDhrSzFGaUtldmJKTlREeVNXQnpPbXRTYUp1K01JCm9iUnVWWG4yZVNoamVGM1BYcHZRMWRhNXdBa0dJQWxOWjRHTG5QU2ZwVmJyU0plU3RrTGNzdEJheVlJS3BWZVgKSVVTTHM0RUNnWUVBMmNnZUE2WHh0TXdFNU5QWlNWdGhzbXRiYi9YYmtsSTdrWHlsdk5zZjFPdXRYVzkybVJneQpHcEhUQ0VubDB0Z1p3T081T1FLNjdFT3JUdDBRWStxMDJzZndwcmgwNFZEVGZhcW5QNTBxa3BmZEJLQWpmanEyCjFoZDZMd2hLeDRxSm9aelp2VkowV0lvR1ZLcjhJSjJOWGRTUVlUanZUZHhGczRTamdqNFFiaEVDZ1lFQTFBWUUKSEo3eVlza2EvS2V2OVVYbmVrSTRvMm5aYjJ1UVZXazRXSHlaY2NRN3VMQVhGY3lJcW5SZnoxczVzN3RMTzJCagozTFZNUVBzazFNY25oTTl4WE4vQ3ZDTys5b2t0RnNaMGJqWFh6NEJ5V2lFNHJPS1lhVEFwcDVsWlpUT3ZVMWNyCm05R3NwMWJoVDVZb2RaZ3IwUHQyYzR4U2krUVlEWnNFb2lFdzNkc0NnWUVBcVJLYWNweWZKSXlMZEJjZ0JycGkKQTRFalVLMWZsSjR3enNjbGFKUDVoM1NjZUFCejQzRU1YT0kvSXAwMFJsY3N6em83N3cyMmpud09mOEJSM0RBMwp6ZTRSWDIydWw4b0hGdldvdUZOTTNOZjNaNExuYXpVc0F0UGhNS2hRWGMrcEFBWGthUDJkZzZ0TU5PazFxaUNHCndvU212a1BVVE84b1ViRTB1NFZ4ZmZFQ2dZQUpPdDNROVNadUlIMFpSSitIV095enlOQTRaUEkvUkhwN0RXS1QKajVFS2Y5VnR1OVMxY1RyOTJLVVhITXlOUTNrSjg2OUZPMnMvWk85OGg5THptQ2hDTjhkOWN6enI5SnJPNUFMTApqWEtBcVFIUlpLTFgrK0ZRcXZVVlE3cTlpaHQyMEZPb3E5OE5SZDMzSGYxUzZUWDNHZ3RWQ21YSml6dDAxQ3ZHCmR4VnVnd0tCZ0M2Mlp0b0RLb3JyT2hvdTBPelprK2YwQS9rNDJBOENiL29VMGpwSzZtdmxEWmNYdUF1QVZTVXIKNXJCZjRVYmdVYndqa1ZWSFR6LzdDb1BWSjUvVUxJWk1Db1RUNFprNTZXWDk4ZE93Q3VTVFpZYnlBbDZNS1BBZApTZEpuVVIraEpnSVFDVGJ4K1dzYnh2d0FkbWErWUhtaVlPRzZhSklXMXdSd1VGOURLUEhHCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==
```

{{% /accordion %}}



## 8. Configure FQDN

There are two references to `<FQDN>` in the config file (one in this step and one in the next). Both need to be replaced with the FQDN chosen in [Configure DNS](#3-configure-dns).

In the `kind: Ingress` with `name: cattle-ingress-http`:

* Replace `<FQDN>` with the FQDN chosen in [Configure DNS](#3-configure-dns).

After replacing `<FQDN>` with the FQDN chosen in [Configure DNS](#3-configure-dns), the file should look like the example below (`rancher.yourdomain.com` is the FQDN used in this example):

```yaml
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
    tls:
    - secretName: cattle-keys-ingress
      hosts:
      - rancher.yourdomain.com
```

Save the `.yml` file and close it.

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

After you close your `.yml` file, back it up to a secure location. You can use this file again when it's time to upgrade Rancher.

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

During installation, RKE automatically generates a config file named `kube_config_rancher-cluster.yml` in the same directory as the RKE binary. Copy this file and back it up to a safe location. You'll use this file later when upgrading Rancher Server.

## What's Next?

You have a couple of options:

- Create a backup of your Rancher Server in case of a disaster scenario: [High Availability Back Up and Restore]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/backups-and-restoration/ha-backup-and-restoration).
- Create a Kubernetes cluster: [Provisioning Kubernetes Clusters]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/).

<br/>

## FAQ and Troubleshooting

{{< ssl_faq_ha >}}
