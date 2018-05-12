---
title: Single Node Installation with External Load Balancer
weight: 260
---
# Single Node Installation with External Load Balancer

For development environments, we recommend installing Rancher by running a single Docker container. In this installation scenario, you'll deploy Rancher to a Linux host using a single Docker container. Then you will configure an external load balancer to work with Rancher.

>**Note:**
> If you want don't want to use an external load balancer, see [Single Node Installation]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install/).

## Overview

Installation of Rancher on a single node with an external load balancer involves multiple procedures. Review this overview to learn about each procedure you need to complete.

1. [Provision Linux Host](#part-1-provision-linux-host)
2. [Choose an SSL Option and Install Rancher](#part-2-choose-an-ssl-option-and-install-rancher)
3. [Configure Load Balancer](#part-3-configure-load-balancer)
4. **For those using a certificate signed by a recognized CA:**

	[Remove Default Certificates](#part-4-remove-default-certificates)



## Part 1—Provision Linux Host

Provision a single Linux host to launch your {{< product >}} Server.

### Requirements

{{< requirements_os >}}

{{< requirements_hardware >}}

{{< requirements_software >}}

{{< note_server-tags >}}

## Part 2—Choose an SSL Option and Install Rancher

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

You can choose from the following scenarios:

- [Option A—Bring Your Own Certificate: Self-Signed](#option-a-bring-your-own-certificate-self-signed)
- [Option B—Bring Your Own Certificate: Signed by Recognized CA](#option-b-bring-your-own-certificate-signed-by-recognized-ca)

### Option A—Bring Your Own Certificate: Self-Signed

If you elect to use a self-signed certificate to encrypt communication, you must install the certificate on your load balancer (which you'll do later) and your Rancher container. Run the docker command to deploy Rancher, pointing it toward your certificate.

**Before you Start:**

Create a self-signed certificate.

- The certificate files must be in [PEM format](#ssl-faq-troubleshooting).

- The certificate files must be in base64.

| Type                         |        Location in container |
| ---------------------------- | ---------------------------: |
| CA certificates file         | /etc/rancher/ssl/cacerts.pem |


**To Install Rancher Using a Self-Signed Cert:**

While running the Docker command to deploy Rancher, point Docker toward your CA certificate file.

```
docker run -d -p 80:80 -p 443:443 \
  -v /etc/your_certificate_directory/cacerts.pem:/etc/rancher/ssl/cacerts.pem \
  rancher/rancher
```

### Option B—Bring Your Own Certificate: Signed by Recognized CA

If your cluster is public facing, it's best to use a certificate signed by a recognized CA.

**Before you Start:**

Obtain a certificate signed by a recognized CA, like GoDaddy or DigiCert.

- The certificate files must be in [PEM format](#ssl-faq-troubleshooting).

- The certificate files must be in base64.

**To Install Rancher Using a Cert Signed by a Recognized CA:**

If you use a certificate signed by a recognized CA, installing your certificate in the Rancher container isn't necessary. Just run the basic install command below.

```
docker run -d -p 80:80 -p 443:443 rancher/rancher
```

## Part 3—Configure Load Balancer

When using a load balancer in front of your Rancher container, there's no need for the container to redirect port communication from port 80 or port 443. By passing the header `X-Forwarded-Proto:
 https` header, this redirect is disabled.

The load balancer or proxy has to be configured to support the following:

* **WebSocket** connections
* **SPDY** / **HTTP/2** protocols
* Passing / setting the following headers:

	| Header              | Value                                  | Description                                                                                                                                                              |
	|---------------------|----------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
	| `Host`              | Hostname used to reach Rancher. | To identify the server requested by the client.                                                                                                                           |
	| `X-Forwarded-Proto` | `https`                                | To identify the protocol that a client used to connect to the load balancer or proxy.<br /><br/>**Note:** If this header is present, `rancher/rancher` does not redirect HTTP to HTTPS. |
	| `X-Forwarded-Port`  | Port used to reach Rancher.             | To identify the protocol that client used to connect to the load balancer or proxy.                                                                                       |
	| `X-Forwarded-For`   | IP of the client connection.            | To identify the originating IP address of a client.                                                                                                                       |

### Example Nginx configuration

This Nginx configuration is tested on Nginx 1.13 (mainline) and 1.14 (stable).

```
upstream rancher {
    server rancher-server:80;
}

map $http_upgrade $connection_upgrade {
    default Upgrade;
    ''      close;
}

server {
    listen 443 ssl http2;
    server_name rancher.yourdomain.com;
    ssl_certificate /etc/your_certificate_directory/fullchain.pem;
    ssl_certificate_key /etc/your_certificate_directory/privkey.pem;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://rancher;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        # This allows the ability for the execute shell window to remain open for up to 15 minutes. Without this parameter, the default is 1 minute and will automatically close.
        proxy_read_timeout 900s;
    }
}

server {
    listen 80;
    server_name rancher.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

<!-- #### Example HAProxy configuration

#### Example Amazon ELB configuration -->

## Part 4—Remove Default Certificates

By default, Rancher automatically generates self-signed certificates for itself after installation. However, since you've provided your own certificates, you must disable the certificates that Rancher generated for itself.

**To Remove the Default Certificates:**

1. Log into Rancher.
2. Select  **Settings** > **cacerts**.
3. Choose `Edit` and remove the contents. Then click `Save`.

## SSL FAQ / Troubleshooting

{{< ssl_faq >}}

## Persisent data

{{< persistentdata >}}
