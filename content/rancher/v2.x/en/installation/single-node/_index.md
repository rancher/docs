---
title: Single Node Install
weight: 250
aliases:
  - /rancher/v2.x/en/installation/single-node-install/
  - /rancher/v2.x/en/installation/custom-ca-root-certificate/
---
For development environments, we recommend installing Rancher by running a single Docker container. In this installation scenario, you'll install Docker on a single Linux host, and then install Rancher on your host using a single Docker container.

>**Want to use an external load balancer?**
> See [Single Node Install with an External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/single-node-install-external-lb) instead.

## Installation Outline

Installation of Rancher on a single node involves multiple procedures. Review this outline to learn about each procedure you need to complete.

1. [Provision Linux Host](#1-provision-linux-host)

	Provision a single Linux host to launch your {{< product >}} Server.

2. [Choose an SSL Option and Install Rancher](#2-choose-an-ssl-option-and-install-rancher)

	Choose an SSL option for Rancher communication encryption. After choosing an option, run the command that accompanies it to deploy Rancher.

## 1. Provision Linux Host

Provision a single Linux host to launch your {{< product >}} Server.

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

## 2. Choose an SSL Option and Install Rancher

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

>**Attention Air Gap Users:**
> If you are visiting this page to complete an [Air Gap]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/) Installation, you must pre-pend your private registry URL to the server tag when running the installation command in the option that you choose. Add `<REGISTRY.DOMAIN.COM:PORT>` with your private registry URL in front of `rancher/rancher:latest`.
>
> Example:
```
<REGISTRY.DOMAIN.COM:PORT>/rancher/rancher:latest
```

Choose from the following options:

- [Option A—Default Self-Signed Certificate](#option-a-default-self-signed-certificate)
- [Option B—Bring Your Own Certificate: Self-Signed](#option-b-bring-your-own-certificate-self-signed)
- [Option C—Bring Your Own Certificate: Signed by Recognized CA](#option-c-bring-your-own-certificate-signed-by-recognized-ca)
- [Option D—Bring Your Own Certificate: Private CA Root Certificate CA](#option-d-bring-your-own-certificate-private-ca-root-certificate)
- [Option E—Let's Encrypt Certificate](#option-e-let-s-encrypt-certificate)

### Option A—Default Self-Signed Certificate

If you install Rancher without using your own certificate, Rancher generates a self-signed certificate that's used for encryption. If you're satisfied with this certificate, there's no need to obtain your own.

**To Install Rancher Using the Default Certificate:**

1. From your Linux host, run the Docker command to install Rancher without any additional parameters:

	```
	docker run -d --restart=unless-stopped \
	  -p 80:80 -p 443:443 \
	  rancher/rancher:latest
	```

### Option B—Bring Your Own Certificate: Self-Signed

Your Rancher install can use a self-signed certificate that you provide to encrypt communications.

>**Prerequisites:**
>Create a self-signed certificate.
>
>- The certificate files must be in [PEM format](#pem).
>- In your certificate file, include all intermediate certificates in the chain. Order your certificates with your certificate first, followed by the intermediates. For an example, see [SSL FAQ / Troubleshooting](#cert-order).

**To Install Rancher Using a Self-Signed Cert:**

Your Rancher install can use a self-signed certificate that you provide to encrypt communications.

1. After creating your certificate, run the Docker command to install Rancher, pointing toward your certificate files.

	```
	docker run -d --restart=unless-stopped \
	  -p 80:80 -p 443:443 \
	  -v /etc/<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
	  -v /etc/<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
	  -v /etc/<CERT_DIRECTORY>/<CA_CERTS.pem>:/etc/rancher/ssl/cacerts.pem \
	  rancher/rancher:latest
	```

### Option C—Bring Your Own Certificate: Signed by Recognized CA

If you're publishing your app publicly, you should ideally be using a certificate signed by a recognized CA.

>**Prerequisites:**
>
>- The certificate files must be in [PEM format](#pem).
>- Make sure that the container includes your certificate file and the key file. Because your certificate is signed by a recognized CA, mounting an additional CA certificate file is unnecessary.
>- Add `--no-cacerts` as argument to the container to disable the default CA certificate generated by Rancher.

**To Install Rancher Using a Certificate Signed by a Recognized CA:**

1. After obtaining your certificate, run the Docker command to deploy Rancher while pointing toward your certificate files.

	```
	docker run -d --restart=unless-stopped \
	  -p 80:80 -p 443:443 \
	  -v /etc/your_certificate_directory/fullchain.pem:/etc/rancher/ssl/cert.pem \
	  -v /etc/your_certificate_directory/privkey.pem:/etc/rancher/ssl/key.pem \
	  rancher/rancher:latest --no-cacerts
	```

### Option D—Bring Your Own Certificate: Private CA Root Certificate

Services that Rancher needs to access are sometimes configured with a certificate from an custom/internal Certificate Authority (CA) root, also known as self signed certificate. If the presented certificate from the service cannot be validated by Rancher, the following error will appear: `x509: certificate signed by unknown authority`.

To validate the certificate, the CA root certificates need to be added to Rancher. As Rancher is written in Go, we can use the environment variable `SSL_CERT_DIR` to point to the directory where the CA root certificates are located in the container. The CA root certificates directory can be mounted using the Docker volume option (`-v host-source-directory:container-destination-directory`) when starting the Rancher container.

Examples of services that Rancher can access:

* Catalogs
* Authentication providers
* Accessing hosting/cloud API when using Node Drivers

#### Start Rancher Container with custom CA root certificates

The requirements are:

* Mount the host directory containing the CA root certificates in the container using the volume option.
* Add the environment variable `SSL_CERT_DIR` with as value the mounted CA root certificates directory location inside the container.

Passing environment variables to the Rancher container can be done using `-e KEY=VALUE` or `--env KEY=VALUE`, mounting a host directory inside the container can be done using `-v host-source-directory:container-destination-directory` or `--volume host-source-directory:container-destination-directory`.

The example below is based on having the CA root certificates in the `/host/certs` directory on the host and mounting this directory on `/container/certs` inside the Rancher container.

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /host/certs:/container/certs \
  -e SSL_CERT_DIR="/container/certs" \
  rancher/rancher:latest
```

### Option E—Let's Encrypt Certificate

Rancher supports Let's Encrypt certificates. Let's Encrypt uses an `http-01 challenge` to verify that you have control over your domain. You can confirm that you control the domain by pointing the hostname that you want to use for Rancher access (for example, `rancher.mydomain.com`) to the IP of the machine it is running on. You can bind the hostname to the IP address by creating an A record in DNS.

>**Prerequisites:**
>
>- Let's Encrypt is an Internet service. Therefore, this option cannot be used in an internal/air gapped network.
>- Create a record in your DNS that binds your Linux host IP address to the hostname that you want to use for Rancher access (`rancher.mydomain.com` for example).
>- Open port `TCP/80` on your Linux host. The Let's Encrypt http-01 challenge can come from any source IP address, so port `TCP/80` must be open to all IP addresses.


**To Install Rancher Using a Let's Encrypt Certificate:**

Run the following commands from your Linux host.

1. Run the Docker command.

	```
	docker run -d --restart=unless-stopped \
	  -p 80:80 -p 443:443 \
	  rancher/rancher:latest \
	  --acme-domain rancher.mydomain.com
	```

>
>**Remember:** Let's Encrypt provides rate limits for requesting new certificates. Therefore, limit how often you create or destroy the container. For more information, see [Let's Encrypt documentation on rate limits](https://letsencrypt.org/docs/rate-limits/).

## What's Next?

You have a couple of options:

- Create a backup of your Rancher Server in case of a disaster scenario: [Single Node Backup and Restoration]({{< baseurl >}}/rancher/v2.x/en/installation/backups-and-restoration/single-node-backup-and-restoration/).
- Create a Kubernetes cluster: [Provisioning Kubernetes Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/).

<br/>

## FAQ and Troubleshooting

{{< ssl_faq_single >}}

## Persistent Data

{{< persistentdata >}}

## Running `rancher/rancher` and `rancher/rancher-agent` on the same node

In the situation where you want to use a single node to run Rancher and to be able to add the same node to a cluster, you have to adjust the host ports mapped for the `rancher/rancher` container.

If a node is added to a cluster, it deploys the nginx ingress controller which will use port 80 and 443. This will conflict with the default ports we advice to expose for the `rancher/rancher` container.

Please note that this setup is not recommended for production use, but can be convenient for development/demo purposes.

To change the host ports mapping, replace the following part `-p 80:80 -p 443:443` with `-p 8080:80 -p 8443:443`:

```
docker run -d --restart=unless-stopped \
  -p 8080:80 -p 8443:443 \
  rancher/rancher:latest
```
