---
title: SSL Configuration
layout: single-docs
weight: 325
---

# SSL Configuration

Rancher is secure by default. This means that SSL is required when interacting with Rancher. Using SSL ensures communication from and to Rancher is encrypted, like logging in to the Rancher UI or when using tools to interact with your Kubernetes clusters (like `kubectl`). By default, Rancher will generate a self-signed certificate that will be used when contacting Rancher on port **TCP/443** (HTTPS). All traffic going to port **TCP/80** (HTTP) will be automatically redirected to port **TCP/443** (HTTPS). There are other options which are described below, first you will need to decide where your certificates will be stored.

## Before You Start: Choose a Certificate Host

There are two places where you certificates can be stored and used:

- Inside the `rancher/server` container 
- Using an external loadbalancer or proxy

## Options for inside the `rancher/server` container

### Automatically generated default self signed certificate

By running the `rancher/server` container without any additional parameters or configuration, a self-signed certificate will automatically be created on startup.

<u>Example command:</u>

```
docker run -d -p 80:80 -p 443:443 rancher/server:v2.0.0
```

### Providing your own self-signed certificates to the container

You can use your own certificates and let Rancher use them to provide SSL. You can provide them by mounting the certificate files when running the container. The certificate files should be in **PEM** format. Make sure that your certificate file includes all the intermediate certificates in the chain.

| Type                         |        Location in container |
| ---------------------------- | ---------------------------: |
| Certificate file             |    /etc/rancher/ssl/cert.pem |
| Certificate key file         |     /etc/rancher/ssl/key.pem |
| CA certificates file         | /etc/rancher/ssl/cacerts.pem |

<u>Example command:</u>

```
docker run -d -p 80:80 -p 443:443 \
  -v /etc/your_certificate_directory/fullchain.pem:/etc/rancher/ssl/cert.pem \
  -v /etc/your_certificate_directory/privkey.pem:/etc/rancher/ssl/key.pem \
  -v /etc/your_certificate_directory/cacerts.pem:/etc/rancher/ssl/cacerts.pem \
  rancher/server:v2.0.0
```

### Providing your own certificates from a recognized Certificate Authority to the container

If the certificates you want to use are signed by a recognized Certificate Authority, you only have to provide the certificate file and the certificate key file to the container. In this case, mounting an additional CA certificate file is not needed as it is signed by a recognized Certificate Authority.

| Type                         |        Location in container |
| ---------------------------- | ---------------------------: |
| Certificate file             |    /etc/rancher/ssl/cert.pem |
| Certificate key file         |     /etc/rancher/ssl/key.pem |

<u>Example command:</u>

```
docker run -d -p 80:80 -p 443:443 \
  -v /etc/your_certificate_directory/fullchain.pem:/etc/rancher/ssl/cert.pem \
  -v /etc/your_certificate_directory/privkey.pem:/etc/rancher/ssl/key.pem \
  rancher/server:v2.0.0
```

### Using automatically requested Let's Encrypt certificates

Rancher supports requesting Let's Encrypt certificates out-of-the-box. This is done using the **http-01 challenge**, this means that the hostname you want to use for accessing Rancher (for example, `rancher.mydomain.com`) will have to point to the IP of the machine it is running on. This can be done by creating an A record in DNS.

As the Let's Encrypt challenge can come from any source IP address, port **TCP/80** needs to be open for every source IP address. You enable the Let's Encrypt functionality by passing the parameter `--acme-domain rancher.mydomain.com` when running the `rancher/server` container.

<u>Example command:</u>

```
docker run -d -p 80:80 -p 443:443 rancher/server:v2.0.0 --acme-domain rancher.mydomain.com
```

*Note: Let's Encrypt provides rate limits for requesting new certificates, keep this in mind when creating and destroying the container multiple times. Read more on this in the [Let's Encrypt documentation on rate limits](https://letsencrypt.org/docs/rate-limits/).*

## Options when using an external loadbalancer or proxy

### Terminating SSL at loadbalancer or proxy

#### Instructions for the `rancher/server` container

**Self signed certificates**

When using self signed certificates, you still need to supply the CA certificate to the `rancher/server` container. This will be used to validate connections to Rancher.

| Type                         |        Location in container |
| ---------------------------- | ---------------------------: |
| CA certificates file         | /etc/rancher/ssl/cacerts.pem |

<u>Example command:</u>

```
docker run -d -p 80:80 -p 443:443 \
  -v /etc/your_certificate_directory/cacerts.pem:/etc/rancher/ssl/cacerts.pem \
  rancher/server:v2.0.0
```

**Certificates by a well known Certificate Authority**

If the certificates you want to use are signed by a recognized Certificate Authority, you will have to remove the default generated CA certificate information. This can be done under `Settings` -> `cacerts`, choose `Edit` and remove the contents and click `Save`.

#### Instructions for the loadbalancer or proxy

When using a loadbalancer or proxy in front of the `rancher/server` container, there is no need for the `rancher/server` container to redirect port **TCP/80** (HTTP) to port **TCP/443** (HTTPS). By passing the header `X-Forwarded-Proto: https` header, this redirect will be disabled.

The loadbalancer or proxy has to be configured to support the following:

* Passing/setting the following headers 

| Header               | Value                                     | Description                                                  |
| -------------------- | ----------------------------------------- | :----------------------------------------------------------- |
| `Host`               | Domain name that is used to reach Rancher | To identify the server requested by the client               |
| `X-Forwarded-Proto`  | `https`                                   | To identify the protocol that a client used to connect to the loadbalancer or proxy<br />*If this Header is present, `rancher/server` will not redirect HTTP to HTTPS* |
| `X-Forwarded-Port`   | Port used to reach Rancher                | To identify the protocol that client used to connect to the loadbalancer or proxy |
| `X-Forwarded-For`    | IP of the client connection               | To identify the originating IP address of a client           |

* Support **WebSocket** connections

* **SPDY** / **HTTP/2** support

<u>Example configs:</u>

- nginx 1.12 / 1.13

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

- How do I validate my certificate chain?

You can validate the certificate chain by using the `openssl` binary. If the output ends with `Verify return code: 0 (ok)`, your certificate chain is valid. The `ca.pem` file should be the same as you supplied to the `rancher/server` container. When using a certificate signed by a well known Certificate Authority, you can omit the `-CAfile` parameter.

<u>Example command:</u>
```
openssl s_client -CAfile ca.pem -connect rancher.yourdomain.com:443
...
    Verify return code: 0 (ok)
```

- How do I know if my certificates are in **PEM** format?

You can recognize the **PEM** format by the header being `-----BEGIN CERTIFICATE-----` and the footer being `-----END CERTIFICATE-----`.
