---
title: SSL Configuration
weight: 325
---

# SSL Configuration

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL encrypts all Rancher communications: login, cluster interaction, and so on.

By default, Rancher generates a self-signed certificate that's used to encrypt communication over port 443 (HTTPS). Any traffic directed to port 80 (HTTP) is automatically forwarded to 443.

If you want to use your own certificate that's self-signed or signed by a commercial certificate authority (CA), refer to the documentation below.

## Before You Start: Choose a Certificate Host

There are two locations that can host your own certificates. Choose one.

- Inside the Rancher container.
- Using an external load balancer or proxy.

## Certificate Host: Inside the Rancher Container

### Automatically Generated Default Self-Signed Certificate

By running the `rancher/rancher` container without any additional parameters or configuration, a self-signed certificate is automatically created on startup.

**Example**

```
docker run -d -p 80:80 -p 443:443 rancher/rancher:v2.0.0
```

### Self-Signed Certificate

You can use your own certificates and let Rancher use them to provide SSL. You can provide them by mounting the certificate files when running the container. The certificate files should be in `.pem` format. Make sure that your certificate file includes all the intermediate certificates in the chain.

| Type                         |        Location in container |
| ---------------------------- | ---------------------------: |
| Certificate file             |    /etc/rancher/ssl/cert.pem |
| Certificate key file         |     /etc/rancher/ssl/key.pem |
| CA certificates file         | /etc/rancher/ssl/cacerts.pem |
<br/>

**Example**
```
docker run -d -p 80:80 -p 443:443 \
  -v /etc/your_certificate_directory/fullchain.pem:/etc/rancher/ssl/cert.pem \
  -v /etc/your_certificate_directory/privkey.pem:/etc/rancher/ssl/key.pem \
  -v /etc/your_certificate_directory/cacerts.pem:/etc/rancher/ssl/cacerts.pem \
  rancher/rancher:v2.0.0
```

### Providing your own certificates from a recognized CA to the container

If the certificates you want to use are signed by a recognized CA, you only have to provide the certificate file and the certificate key file to the container. In this case, mounting an additional CA certificate file is not needed as it is signed by a recognized CA.

| Type                         |        Location in container |
| ---------------------------- | ---------------------------: |
| Certificate file             |    /etc/rancher/ssl/cert.pem |
| Certificate key file         |     /etc/rancher/ssl/key.pem |
<br/>
**Example**

```
docker run -d -p 80:80 -p 443:443 \
  -v /etc/your_certificate_directory/fullchain.pem:/etc/rancher/ssl/cert.pem \
  -v /etc/your_certificate_directory/privkey.pem:/etc/rancher/ssl/key.pem \
  rancher/rancher:v2.0.0
```

### Using Automatically Requested Let's Encrypt Certificates

Rancher supports requesting Let's Encrypt certificates out-of-the-box. This request uses **HTTP-01 challenge**, which means that the hostname you choose for accessing Rancher (for example, `rancher.mydomain.com`) must point to the IP address of the host that Rancher runs on. Therefore, you must bind your hostname to the Rancher host IP address on your DNS.

Because the Let's Encrypt challenge can originate from any source IP address, port **TCP/80** must be open for every source IP address. You enable the Let's Encrypt functionality by passing the parameter `--acme-domain rancher.mydomain.com` when running the `rancher/rancher` container.

**Example**

```
docker run -d -p 80:80 -p 443:443 rancher/rancher:v2.0.0 --acme-domain rancher.mydomain.com
```

>**Note:** Let's Encrypt provides rate limits for requesting new certificates, keep this in mind when creating and destroying the container multiple times. Read more on this in the [Let's Encrypt documentation on rate limits](https://letsencrypt.org/docs/rate-limits/).

## Options When Using an External Load Balancer or Proxy

### Terminating SSL at Load Balancer or Proxy

#### Instructions for the `rancher/rancher` Container

**Self-Signed Certificates**

When using self-signed certificates, you must add the CA certificate to the `rancher/rancher` container. This cerrtificate is used to validate connections to Rancher.

| Type                         |        Location in container |
| ---------------------------- | ---------------------------: |
| CA certificates file         | /etc/rancher/ssl/cacerts.pem |

**Example**

```
docker run -d -p 80:80 -p 443:443 \
  -v /etc/your_certificate_directory/cacerts.pem:/etc/rancher/ssl/cacerts.pem \
  rancher/rancher:v2.0.0
```

**Certificates from a Commercial CA**

If the certificates you want to use are signed by a commercial CA (like GoDaddy or digicert), you must remove the certificate information that the CA generates by default. You can remove this information by selecting **Settings** in the Rancher UI. From the **cacerts** section, select **...** > **Edit**, remove the contents, and then click **Save**.

#### Instructions for the Load Balancer or Proxy

When using a load balancer or proxy in front of the `rancher/rancher` container, there is no need for the `rancher/rancher` container to redirect port **TCP/80** (HTTP) to port **TCP/443** (HTTPS). By passing the `X-Forwarded-Proto: https` header, this redirect is disabled.

You must configure the load balancer or proxy has to support:

- **WebSocket** connections

- **SPDY** / **HTTP/2**

- passing/setting the following headers:

| Header              | Value                                     | Description                                                                                                                                                             |
|---------------------|-------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Host`              | Domain name used to reach Rancher | To identify the server requested by the client.                                                                                                                          |
| `X-Forwarded-Proto` | `https`                                   | To identify the protocol that a client used to connect to the load balancer or proxy.<br /><br/>**Note**: If this header is present, `rancher/rancher` cannot redirect HTTP to HTTPS. |
| `X-Forwarded-Port`  | Port used to reach Rancher                | To identify the protocol that a client used to connect to the load balancer or proxy.                                                                                       |
| `X-Forwarded-For`   | IP of the client connection               | To identify the originating IP address of a client.                                                                                                                      |
<br/>

**Example Configuration: Nginx 1.12 / 1.13**

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

## FAQ / Troubleshooting

#### How do I validate my certificate chain?

You can validate the certificate chain by using the `openssl` binary. If the output ends with `Verify return code: 0 (ok)`, your certificate chain is valid. The `ca.pem` file should be the same as you supplied to the `rancher/rancher` container. When using a certificate signed by a well known CA, you can omit the `-CAfile` parameter.

**Example**
```
openssl s_client -CAfile ca.pem -connect rancher.yourdomain.com:443
...
    Verify return code: 0 (ok)
```

#### How do I know if my certificates are in **PEM** format?

You can recognize the **PEM** format by the header:

```-----BEGIN CERTIFICATE-----```

And the footer:

```-----END CERTIFICATE-----```
