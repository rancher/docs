---
title: Single Node Installation
weight: 250
---
For development environments, we recommend installing Rancher by running a single Docker container. In this installation scenario, you'll install Docker on a single Linux host, and then install Rancher on your host using a single Docker container.

>**Note:**
> If you want to use an external load balancer, see [Single Node Installation with an External Loadbalancer]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install-external-lb/).

## Overview

Installation of Rancher on a single node involves multiple procedures. Review this overview to learn about each procedure you need to complete.

1. [Provision Linux Host](#part-1-provision-linux-host)

	Provision a single Linux host to launch your {{< product >}} Server.

2. [Choose an SSL Option and Install Rancher](#part-2-choose-an-ssl-option-and-install-rancher)

	Choose an SSL option for Rancher communication encryption. After choosing an option, run the command that accompanies it to deploy Rancher.

## Part 1-Provision Linux Host

Provision a single Linux host to launch your {{< product >}} Server.

### Requirements

{{< requirements_os >}}

{{< requirements_hardware >}}

{{< requirements_software >}}

{{< note_server-tags >}}

## Part 2-Choose an SSL Option and Install Rancher

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

Choose from the following options:

- [Option A-Default Self-Signed Certificate](#option-a-default-self-signed-certificate)
- [Option B-Bring Your Own Certificate: Self-Signed](#option-b-bring-your-own-certificate-self-signed)
- [Option C-Bring Your Own Certificate: Signed by Recognized CA](#option-c-bring-your-own-certificate-signed-by-recognized-ca)
- [Option D-Let's Encrypt Certificates](#option-d-let-s-encrypt-certificate)

### Option A-Default Self-Signed Certificate

If you install Rancher without specifying your own certificate, Rancher generates a self-signed certificate that's used for encryption. If you're satisfied with this certificate, there's no need to obtain your own.

**To Install Rancher Using the Default Certificate:**

1. From your Linux host, run the Docker command to install Rancher without any additional parameters:

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  rancher/rancher:latest
```

### Option B-Bring Your Own Certificate: Self-Signed

Your Rancher install can use a self-signed certificate that you provide to encrypt communications.

>**Prerequisites:**
>Create a self-signed certificate.
>
>- The certificate files must be in [PEM format](#ssl-faq-troubleshooting).
>- The certificate files must be in base64.
>- Make sure that your certificate file includes all the intermediate certificates in the chain. The order of certificates in this case is your own certificate first, followed by the intermediates. For an example, refer to the [SSL FAQ / Troubleshooting](#ssl-faq-troubleshooting).


**To Install Rancher Using a Self-Signed Cert:**

Your Rancher install can use a self-signed certificate that you provide to encrypt communications.

1. After creating your certificate, run the Docker command to install Rancher, pointing toward your certificate files.

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /etc/<CERT_DIRECTORY>/fullchain.pem:/etc/rancher/ssl/cert.pem \
  -v /etc/<CERT_DIRECTORY>/privkey.pem:/etc/rancher/ssl/key.pem \
  -v /etc/<CERT_DIRECTORY>/cacerts.pem:/etc/rancher/ssl/cacerts.pem \
  rancher/rancher:latest
```

### Option C-Bring Your Own Certificate: Signed by Recognized CA

If you're publishing your app publically, you should ideally be using a certificate signed by a recognized CA.

**Before You Start:**

>**Prerequisites:**
>Create a self-signed certificate.
>
>- The certificate files must be in [PEM format](#ssl-faq-troubleshooting).
>- The certificate files must be in base64.
>- Make sure that the container includes your certificate file and the key file. In this case, mounting an additional CA certificate file is unnecessary because the cert is signed by a recognized CA.

**To Install Rancher Using a Certificate Signed by a Recognized CA:**

After obtaining your certificate, run the Docker command to deploy Rancher, pointing toward your certificate files.

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /etc/your_certificate_directory/fullchain.pem:/etc/rancher/ssl/cert.pem \
  -v /etc/your_certificate_directory/privkey.pem:/etc/rancher/ssl/key.pem \
  rancher/rancher:latest
```

### Option D-Let's Encrypt Certificate

Rancher supports Let's Encrypt certificates. Let's Encrypt uses an http-01 challenge to verify that you have control over your domain. You can confirm that you control the domain by pointing the hostname that you want to use for Rancher access (for example, `rancher.mydomain.com`) to the IP of the machine it is running on. You can bind the hostname to the IP address by creating an A record in DNS.

>**Prerequisites:**
>
>- Let's Encrypt is an internet service, this cannot be used out of the box on an internal/airgapped network.
>- Create a record in your DNS that binds your Linux host IP address to the hostname that you want to use for Rancher access (`rancher.mydomain.com` for example).
>- Open port `TCP/80` on your Linux host. The Let's Encrypt http-01 challenge can come from any source IP address, so port `TCP/80` must be open to all IP addresses.


**To Install Rancher Using a Let's Encrypt Certificate:**

Run the following commands from your Linux host.

1. Run the Docker command

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  rancher/rancher:latest \
  --acme-domain rancher.mydomain.com
```

>**Remember:** Let's Encrypt provides rate limits for requesting new certificates. Therefore, limit how often you create or destroy the container. For more information, see [Let's Encrypt documentation on rate limits](https://letsencrypt.org/docs/rate-limits/).

## SSL FAQ / Troubleshooting

{{< ssl_faq >}}


## Persistent data

{{< persistentdata >}}
