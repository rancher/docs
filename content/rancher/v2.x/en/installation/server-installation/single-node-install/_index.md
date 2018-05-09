---
title: Single Node Install
weight: 250
description: For development environments, we recommend installing Rancher by deploying a single Docker container.
---


# Single Node Install

For development environments, we recommend installing Rancher by running a single Docker container. In this installation scenario, you'll install Docker on a single Linux host, and then install Rancher on your host using a single Docker container.

>**Note:**
> If you want to use an external loadbalancer, please see [Single Node Install with an External Loadbalancer]({{< baseurl >}}/rancher/v2.x/en/installation/server-installation/single-node-install-external-lb/).

## Provision Linux Host

Provision a single Linux host to launch your {{< product >}} Server.

### Requirements

{{< requirements_os >}}

{{< requirements_hardware >}}

{{< requirements_software >}}

>**Note:**
>- `rancher/rancher` is hosted on [DockerHub](https://hub.docker.com/r/rancher/rancher/tags/). If you don't have access to DockerHub, or you are installing Rancher without an internet connection, refer to [Installing From a Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-from-private-registry/).<br/><br/>
>- For a list of other Rancher Server tags available, refer to [Rancher Server Tags]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/).

## Choose how you want to use SSL

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication which happens when you login or interact with a cluster for example.

You can choose from the following scenarios:

* [Automatically generated self signed certificate](#automatically-generated-default-self-signed-certificate)
* [Bring your own Self-Signed Certificate](#bring-your-own-self-signed-certificate)
* [Bring your own Certificate signed by a well known Certificate Authority](#bring-your-own-certificate-signed-by-a-recognized-certificate-authority)
* [Using automatically requested Let's Encrypt certificates](#using-automatically-requested-let-s-encrypt-certificates)

### Automatically generated default self signed certificate

By default, Rancher generates a self-signed certificate that's used to encrypt communication over port 443 (HTTPS). Any traffic directed to port 80 (HTTP) is automatically forwarded to 443. If you're content with using this certificate, there's no further action required on your part.

By running the `rancher/rancher` container without any additional parameters or configuration, a self-signed certificate will automatically be created on startup.

<u>Command to use:</u>

```
docker run -d -p 80:80 -p 443:443 rancher/rancher
```

### Bring your own Self-Signed Certificate

You can use your own certificate and let Rancher use them to provide SSL. You can provide them by mounting the certificate files when running the container. The certificate files should be in [PEM format](#ssl-faq-troubleshooting). Make sure that your certificate file includes all the intermediate certificates in the chain, the order of certificates in this case is first your own certificate, followed by the intermediates. [example](#ssl-faq-troubleshooting)

| Type                         |        Location in container |
| ---------------------------- | ---------------------------: |
| Certificate file             |    /etc/rancher/ssl/cert.pem |
| Certificate key file         |     /etc/rancher/ssl/key.pem |
| CA certificates file         | /etc/rancher/ssl/cacerts.pem |
<br/>

<u>Command to use:</u>
```
docker run -d -p 80:80 -p 443:443 \
  -v /etc/your_certificate_directory/fullchain.pem:/etc/rancher/ssl/cert.pem \
  -v /etc/your_certificate_directory/privkey.pem:/etc/rancher/ssl/key.pem \
  -v /etc/your_certificate_directory/cacerts.pem:/etc/rancher/ssl/cacerts.pem \
  rancher/rancher
```

### Bring your own Certificate signed by a recognized Certificate Authority

If the certificate you want to use are signed by a recognized Certificate Authority, you only have to provide the certificate file and the certificate key file to the container. In this case, mounting an additional CA certificate file is not needed as it is signed by a recognized Certificate Authority.

| Type                         |        Location in container |
| ---------------------------- | ---------------------------: |
| Certificate file             |    /etc/rancher/ssl/cert.pem |
| Certificate key file         |     /etc/rancher/ssl/key.pem |

<u>Command to use:</u>

```
docker run -d -p 80:80 -p 443:443 \
  -v /etc/your_certificate_directory/fullchain.pem:/etc/rancher/ssl/cert.pem \
  -v /etc/your_certificate_directory/privkey.pem:/etc/rancher/ssl/key.pem \
  rancher/rancher
```

### Using automatically requested Let's Encrypt certificates

Rancher supports requesting Let's Encrypt certificates out-of-the-box. This is done using the **http-01 challenge**, this means that the hostname you want to use for accessing Rancher (for example, `rancher.mydomain.com`) will have to point to the IP of the machine it is running on. This can be done by creating an A record in DNS.

As the Let's Encrypt challenge can come from any source IP address, port **TCP/80** needs to be open for every source IP address. You enable the Let's Encrypt functionality by passing the parameter `--acme-domain rancher.mydomain.com` when running the `rancher/rancher` container.

<u>Command to use:</u>

```
docker run -d -p 80:80 -p 443:443 rancher/rancher --acme-domain rancher.mydomain.com
```


*Note: Let's Encrypt provides rate limits for requesting new certificates, keep this in mind when creating and destroying the container multiple times. Read more on this in the [Let's Encrypt documentation on rate limits](https://letsencrypt.org/docs/rate-limits/).*

```
$ sudo docker run -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher:latest
```

## SSL FAQ / Troubleshooting

{{< ssl_faq >}}



## Persisent data

{{< persistentdata >}}
