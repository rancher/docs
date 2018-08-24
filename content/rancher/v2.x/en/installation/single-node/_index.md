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


## 1. Provision Linux Host

Provision a single Linux host to launch your {{< product >}} Server.

### Requirements


{{% accordion id="os" label="Operating Systems" %}}
{{< requirements_os >}}
{{% /accordion %}}
{{% accordion id="hardware" label="Hardware" %}}
{{< requirements_hardware >}}
{{% /accordion %}}
{{% accordion id="software" label="Software" %}}
{{< requirements_software >}}
{{< note_server-tags >}}
{{% /accordion %}}
{{% accordion id="ports" label="Ports" %}}
The following diagram depicts the basic port requirements for Rancher. For a comprehensive list, see [Port Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/references/).

![Basic Port Requirements]({{< baseurl >}}/img/rancher/port-communications.png)
{{% /accordion %}}

## 2. Choose an SSL Option and Install Rancher

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

>**Attention Air Gap Users:**				   
> If you are visiting this page to complete an [Air Gap Installation]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/), you must pre-pend your private registry URL to the server tag when running the installation command in the option that you choose. Add `<REGISTRY.DOMAIN.COM:PORT>` with your private registry URL in front of `rancher/rancher:latest`.
>
> Example:
```
<REGISTRY.DOMAIN.COM:PORT>/rancher/rancher:latest
```


>**Want records of all transactions with the Rancher API?** 
>
>Enable the [API Auditing]({{< baseurl >}}/rancher/v2.x/en/installation/api-auditing) feature by adding the flags below into your install command.
>```
-e AUDIT_LEVEL=1 \
-e AUDIT_LOG_PATH=/var/log/auditlog/rancher-api-audit.log \
-e AUDIT_LOG_MAXAGE=20 \
-e AUDIT_LOG_MAXBACKUP=20 \
-e AUDIT_LOG_MAXSIZE=100 \
```

Choose from the following options:

{{% accordion id="option-a" label="Option A—Default Self-Signed Certificate" %}}

If you are installing Rancher in a development or testing environment where identity verification isn't a concern, install Rancher using the self-signed certificate that it generates. This installation option omits the hassle of generating a certificate yourself.

Log into your Linux host, and then run the minimum installation command below.

	docker run -d --restart=unless-stopped \
	-p 80:80 -p 443:443 \
	rancher/rancher:latest

{{% /accordion %}}
{{% accordion id="option-b" label="Option B—Bring Your Own Certificate: Self-Signed" %}}
In development or testing environments where your team will access your Rancher server, create a self-signed certificate for use with your install so that your team can verify they're connecting to your instance of Rancher.

>**Prerequisites:**
>Create a self-signed certificate using [OpenSSL](https://www.openssl.org/) or another method of your choice.
>
>- The certificate files must be in [PEM format](#pem).
>- In your certificate file, include all intermediate certificates in the chain. Order your certificates with your certificate first, followed by the intermediates. For an example, see [SSL FAQ / Troubleshooting](#cert-order).

After creating your certificate, run the Docker command below to install Rancher. Use the `-v` flag and provide the path to your certificates to mount them in your container.

- Replace `<CERT_DIRECTORY>` with the directory path to your certificate file.
- Replace `<FULL_CHAIN.pem>`,'<PRIVATE_KEY.pem>', and `<CA_CERTS>` with your certificate names.

```	
docker run -d --restart=unless-stopped \
	-p 80:80 -p 443:443 \
	-v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
	-v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
	-v /<CERT_DIRECTORY>/<CA_CERTS.pem>:/etc/rancher/ssl/cacerts.pem \
	rancher/rancher:latest
```
{{% /accordion %}}
{{% accordion id="option-c" label="Option C—Bring Your Own Certificate: Signed by Recognized CA" %}}

In production environments where you're exposing an app publicly, use a certificate signed by a recognized CA so that your user base doesn't encounter security warnings.

>**Prerequisite:** The certificate files must be in [PEM format](#pem).

After obtaining your certificate, run the Docker command below.

- Use the `-v` flag and provide the path to your certificates to mount them in your container. Because your certificate is signed by a recognized CA, mounting an additional CA certificate file is unnecessary.

	- Replace `<CERT_DIRECTORY>` with the directory path to your certificate file.
	- Replace `<FULL_CHAIN.pem>` and '<PRIVATE_KEY.pem>' with your certificate names.

- Use the `--no-cacerts` as argument to the container to disable the default CA certificate generated by Rancher.

```
docker run -d --restart=unless-stopped \
	-p 80:80 -p 443:443 \
	-v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
	-v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
	rancher/rancher:latest --no-cacerts
```	
{{% /accordion %}}
{{% accordion id="option-d" label="Option D—Bring Your Own Certificate: Private CA Root Certificate" %}}

If you're using Rancher in a internal production environment where you aren't exposing apps publicly, use a certificate from a private certificate authority (CA). 

Services that Rancher needs to access are sometimes configured with a certificate from an custom/internal CA root, also known as self signed certificate. If the presented certificate from the service cannot be validated by Rancher, the following error displays: `x509: certificate signed by unknown authority`.

To validate the certificate, the CA root certificates need to be added to Rancher. As Rancher is written in Go, we can use the environment variable `SSL_CERT_DIR` to point to the directory where the CA root certificates are located in the container. The CA root certificates directory can be mounted using the Docker volume option (`-v host-source-directory:container-destination-directory`) when starting the Rancher container.

Examples of services that Rancher can access:

* Catalogs
* Authentication providers
* Accessing hosting/cloud API when using Node Drivers

Use the the command example to start a Rancher container with you private CA certificates mounted.

- The volume option (`-v`) should specify the host directory containing the CA root certificates.
- The `e` flag in combination with `SSL_CERT_DIR` declares an environment variable that specifies the mounted CA root certificates directory location inside the container.
	- Passing environment variables to the Rancher container can be done using `-e KEY=VALUE` or `--env KEY=VALUE`.
	- Mounting a host directory inside the container can be done using `-v host-source-directory:container-destination-directory` or `--volume host-source-directory:container-destination-directory`.

The example below is based on having the CA root certificates in the `/host/certs` directory on the host and mounting this directory on `/container/certs` inside the Rancher container.

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /host/certs:/container/certs \
  -e SSL_CERT_DIR="/container/certs" \
  rancher/rancher:latest
```
{{% /accordion %}}
{{% accordion id="option-e" label="Option E—Let's Encrypt Certificate" %}}

For production environments, you also have the options of using [Let's Encrypt](https://letsencrypt.org/) certificates. Let's Encrypt uses an http-01 challenge to verify that you have control over your domain. You can confirm that you control the domain by pointing the hostname that you want to use for Rancher access (for example, `rancher.mydomain.com`) to the IP of the machine it is running on. You can bind the hostname to the IP address by creating an A record in DNS.

>**Prerequisites:**
>
>- Let's Encrypt is an Internet service. Therefore, this option cannot be used in an internal/air gapped network.
>- Create a record in your DNS that binds your Linux host IP address to the hostname that you want to use for Rancher access (`rancher.mydomain.com` for example).
>- Open port `TCP/80` on your Linux host. The Let's Encrypt http-01 challenge can come from any source IP address, so port `TCP/80` must be open to all IP addresses.


After you fulfill the prerequisites, you can install Rancher using a Let's Encrypt certificate by running the following command. Replace `<YOUR.DNS.NAME>` with your your domain.


<<<<<<< HEAD
    ```
    docker run -d --restart=unless-stopped \
      -p 80:80 -p 443:443 \
      rancher/rancher:latest \
      --acme-domain rancher.mydomain.com
    ```
=======
	docker run -d --restart=unless-stopped \
	  -p 80:80 -p 443:443 \
	  rancher/rancher:latest \
	  --acme-domain <YOUR.DNS.NAME>
>>>>>>> clarifying command line for single-node install

>**Remember:** Let's Encrypt provides rate limits for requesting new certificates. Therefore, limit how often you create or destroy the container. For more information, see [Let's Encrypt documentation on rate limits](https://letsencrypt.org/docs/rate-limits/).
{{% /accordion %}}


## What's Next?

- **Recommended First:** Create a backup of your Rancher Server in case of a disaster scenario: [Single Node Backup and Restoration]({{< baseurl >}}/rancher/v2.x/en/installation/backups-and-restoration/single-node-backup-and-restoration/).
- Create a Kubernetes cluster: [Provisioning Kubernetes Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/).

<br/>

## FAQ and Troubleshooting

{{< ssl_faq_single >}}

## Persistent Data

{{< persistentdata >}}

## Running `rancher/rancher` and `rancher/rancher-agent` on the Same Node

In the situation where you want to use a single node to run Rancher and to be able to add the same node to a cluster, you have to adjust the host ports mapped for the `rancher/rancher` container.

If a node is added to a cluster, it deploys the nginx ingress controller which will use port 80 and 443. This will conflict with the default ports we advice to expose for the `rancher/rancher` container.

Please note that this setup is not recommended for production use, but can be convenient for development/demo purposes.

To change the host ports mapping, replace the following part `-p 80:80 -p 443:443` with `-p 8080:80 -p 8443:443`:

```
docker run -d --restart=unless-stopped \
  -p 8080:80 -p 8443:443 \
  rancher/rancher:latest
```
