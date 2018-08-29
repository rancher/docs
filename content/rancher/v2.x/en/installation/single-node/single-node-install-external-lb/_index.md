---
title: Single Node Install with External Load Balancer
weight: 252
aliases:
- /rancher/v2.x/en/installation/single-node-install-external-lb/
---
For development environments, we recommend installing Rancher by running a single Docker container. In this installation scenario, you'll deploy Rancher to a Linux host using a single Docker container. Then you will configure an external load balancer to work with Rancher.


>**Want to skip the external load balancer?**
> See [Single Node Installation]({{< baseurl >}}/rancher/v2.x/en/installation/single-node) instead.

## Installation Outline
<!-- TOC -->

- [1. Provision Linux Host](#1-provision-linux-host)
- [2. Choose an SSL Option and Install Rancher](#2-choose-an-ssl-option-and-install-rancher)
- [3. Configure Load Balancer](#3-configure-load-balancer)

<!-- /TOC -->

## 1. Provision Linux Host

Provision a single Linux host to launch your {{< product >}} Server.

### Host Requirements

{{% tabs %}}
{{% tab "Operating System" %}}
{{< requirements_os >}}
{{% /tab %}}
{{% tab "Hardware" %}}
{{< requirements_hardware >}}
{{% /tab %}}
{{% tab "Software" %}}
{{< requirements_software >}}
{{< note_server-tags >}}
{{% /tab %}}
{{% tab "Ports" %}}
The following diagram depicts the basic port requirements for Rancher. For a comprehensive list, see [Port Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/references/).

![Basic Port Requirements]({{< baseurl >}}/img/rancher/port-communications.png)
{{% /tab %}}
{{% /tabs %}}

## 2. Choose an SSL Option and Install Rancher

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

>**Do you want to...**
>
>- Complete an Air Gap Installation?
>- Record all transactions with the Rancher API?
>
>See [Advanced Options](#advanced-options) below before continuing.

Choose from the following options:

{{% accordion id="option-a" label="Option A-Bring Your Own Certificate: Self-Signed" %}}
If you elect to use a self-signed certificate to encrypt communication, you must install the certificate on your load balancer (which you'll do later) and your Rancher container. Run the docker command to deploy Rancher, pointing it toward your certificate.

>**Prerequisites:**
>Create a self-signed certificate.
>
>- The certificate files must be in [PEM format](#pem).

**To Install Rancher Using a Self-Signed Cert:**

1. While running the Docker command to deploy Rancher, point Docker toward your CA certificate file.

    ```
    docker run -d --restart=unless-stopped \
      -p 80:80 -p 443:443 \
      -v /etc/your_certificate_directory/cacerts.pem:/etc/rancher/ssl/cacerts.pem \
      rancher/rancher:latest
    ```
 
{{% /accordion %}}
{{% accordion id="option-b" label="Option B-Bring Your Own Certificate: Signed by Recognized CA" %}}
If your cluster is public facing, it's best to use a certificate signed by a recognized CA.

>**Prerequisites:**
>
>- The certificate files must be in [PEM format](#pem).

**To Install Rancher Using a Cert Signed by a Recognized CA:**

If you use a certificate signed by a recognized CA, installing your certificate in the Rancher container isn't necessary. We do have to make sure there is no default CA certificate generated and stored, you can do this by passing the `--no-cacerts` parameter to the container.

1. Enter the following command.

    ```
    docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    rancher/rancher:latest --no-cacerts
    ``` 
{{% /accordion %}}

## 3. Configure Load Balancer

When using a load balancer in front of your Rancher container, there's no need for the container to redirect port communication from port 80 or port 443. By passing the header `X-Forwarded-Proto:
 https` header, this redirect is disabled.

The load balancer or proxy has to be configured to support the following:

* **WebSocket** connections
* **SPDY** / **HTTP/2** protocols
* Passing / setting the following headers:

    | Header | Value | Description |
    |--------|-------|-------------|
    | `Host`                | Hostname used to reach Rancher.          | To identify the server requested by the client.
    | `X-Forwarded-Proto`   | `https`                                  | To identify the protocol that a client used to connect to the load balancer or proxy.<br /><br/>**Note:** If this header is present, `rancher/rancher` does not redirect HTTP to HTTPS.
    | `X-Forwarded-Port`    | Port used to reach Rancher.              | To identify the protocol that client used to connect to the load balancer or proxy.
    | `X-Forwarded-For`     | IP of the client connection.             | To identify the originating IP address of a client.


### Example Nginx configuration

This Nginx configuration is tested on Nginx version 1.13 (mainline) and 1.14 (stable).

 >**Note:** This Nginx configuration is only an example and may not suit your environment. For complete documentation, see [NGINX Load Balancing - TCP and UDP Load Balancer](https://docs.nginx.com/nginx/admin-guide/load-balancer/tcp-udp-load-balancer/).

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
        proxy_buffering off;
    }
}

server {
    listen 80;
    server_name rancher.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

<br/>

## What's Next?

- **Recommended:** Review [Single Node Backup and Restoration]({{< baseurl >}}/rancher/v2.x/en/installation/backups-and-restoration/single-node-backup-and-restoration/). Although you don't have any data you need to back up right now, we recommend creating backups after regular Rancher use.
- Create a Kubernetes cluster: [Provisioning Kubernetes Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/).

<br/>

## FAQ and Troubleshooting

{{< ssl_faq_single >}}

## Advanced Options

### API Auditing

If you want to record all transations with the Rancher API, enable the [API Auditing]({{< baseurl >}}/rancher/v2.x/en/installation/api-auditing) feature by adding the flags below into your install command.

	-e AUDIT_LEVEL=1 \
	-e AUDIT_LOG_PATH=/var/log/auditlog/rancher-api-audit.log \
	-e AUDIT_LOG_MAXAGE=20 \
	-e AUDIT_LOG_MAXBACKUP=20 \
	-e AUDIT_LOG_MAXSIZE=100 \

### Air Gap

If you are visiting this page to complete an [Air Gap Installation]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/), you must pre-pend your private registry URL to the server tag when running the installation command in the option that you choose. Add `<REGISTRY.DOMAIN.COM:PORT>` with your private registry URL in front of `rancher/rancher:latest`.

**Example:**
 	
	 <REGISTRY.DOMAIN.COM:PORT>/rancher/rancher:latest

### Persistent Data

{{< persistentdata >}}
