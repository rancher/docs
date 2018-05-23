---
title: High Availability Installation
weight: 275
---
This set of instructions creates a new Kubernetes cluster that's dedicated to running Rancher in a high-availability (HA) configuration. This procedure walks you through setting up a 3-node cluster using the Rancher Kubernetes Engine (RKE). The cluster's sole purpose is running pods for Rancher. The setup is based on:

- Layer 4 Loadbalancer (TCP)
- NGINX Ingress controller with SSL termination (HTTPS)

![Rancher HA]({{< baseurl >}}/img/rancher/ha/rancher2ha.svg)

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

>**Note:**
> The Load Balancer is in front of your Linux hosts. This can be any other host you have available, capable of running NGINX. Do not use one of your Rancher nodes to install the Load Balancer.

We will be using NGINX as our Layer 4 Load Balancer (TCP). NGINX will forward all connections to one of your Rancher nodes.

### Install NGINX

NGINX has packages available for all the known operating systems. You can check out the [NGINX install documentation](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/) to see how to install it for your operating system.

### Create NGINX configuration

Below you can find an example configuration for NGINX. You will need to replace `ip_of_node1`, `ip_of_node2` and `ip_of_node3` with the IPs of your [Linux hosts](#part-1-provision-linux-hosts)


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
        server ip_of_node1:443 max_fails=3 fail_timeout=5s;
        server ip_of_node2:443 max_fails=3 fail_timeout=5s;
        server ip_of_node3:443 max_fails=3 fail_timeout=5s;
    }
    server {
        listen     443;
        proxy_pass rancher_servers;
    }
}
```

### Run NGINX as Docker container

Besides installing NGINX as a package on the operating system, you can also run it as a Docker container. Save the edited **Example NGINX config** as `/etc/nginx.conf` and run the following command to launch the NGINX container:

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /etc/nginx.conf:/etc/nginx/nginx.conf \
  nginx:1.14
```

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

	- [Template for using Self Signed Certificate (3-node-certificate.yml)](https://raw.githubusercontent.com/rancher/rancher/e9d29b3f3b9673421961c68adf0516807d1317eb/rke-templates/3-node-certificate.yml)
	- [Template for using Certificate Signed By A Recognized Certificate Authority (3-node-certificate-recognizedca.yml)](https://raw.githubusercontent.com/rancher/rancher/e9d29b3f3b9673421961c68adf0516807d1317eb/rke-templates/3-node-certificate-recognizedca.yml)
2. Rename the file to `rancher-cluster.yml`.

## Part 6-Configure Nodes

Once you have the `.yml` config file template, edit the nodes section to point toward your Linux hosts.

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

If you are using a Self Signed Certificate, you will need to generate base64 encoded strings for each of your files (Certificate file, Certificate Key file, and CA certificate file). Make sure that your certificate file includes all the intermediate certificates in the chain, the order of certificates in this case is first your own certificate, followed by the intermediates.

In the `kind: Secret` with `name: cattle-keys-ingress`:

* Replace `<BASE64_CRT>` with the base64 encoded string of the Certificate file (usually called `cert.pem` or `domain.crt`)
* Replace `<BASE64_KEY>` with the base64 encoded string of the Certificate Key file (usually called `key.pem` or `domain.key`)

After replacing the values, the file should look like the example below (the base64 encoded strings should be different):

>**Note:**
> The base64 encoded string should be on the same line as `tls.crt` or `tls.key`, without any newline at the beginning, in between or at the end.

```
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

If you are using a Certificate Signed By A Recognized Certificate Authority, you will need to generate a base64 encoded string for the Certificate file and the Certificate Key file.

In the `kind: Secret` with `name: cattle-keys-ingress`:

* Replace `<BASE64_CRT>` with the base64 encoded string of the Certificate file (usually called `cert.pem` or `domain.crt`)
* Replace `<BASE64_KEY>` with the base64 encoded string of the Certificate Key file (usually called `key.pem` or `domain.key`)

After replacing the values, the file should look like the example below (the base64 encoded strings should be different):

>**Note:**
> The base64 encoded string should be on the same line as `tls.crt` or `tls.key`, without any newline at the beginning, in between or at the end.

```
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

## Part 8-Configure FQDN

There are 2 references to `<FQDN>` in the config file. Both need to be replaced with the FQDN chosen in [Configure DNS](#part-3-configure-dns).

In the `kind: Ingress` with `name: cattle-ingress-http`:

* Replace `<FQDN>` with the FQDN chosen in [Configure DNS](#part-3-configure-dns).

After replacing `<FQDN>` wit the FQDN chosen in [Configure DNS](#part-3-configure-dns), the file should look like the example below (`rancher.yourdomain.com` is the FQDN used in this example):

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
    tls:
    - secretName: cattle-keys-ingress
      hosts:
      - rancher.yourdomain.com
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

- Log in to Rancher to make sure it deployed successfully. Open a web browser and navigate to the FQDN chosen in [Configure DNS](#part-3-configure-dns).
- Configure RKE to take snapshots of etcd that you can use as a backup in a disaster scenario. For more information, see [etcd recurring snapshots]({{< baseurl >}}/rancher/v2.x/en/installation/after-installation/etcd-backup-and-restoration/#etcd-recurring-snapshots).
