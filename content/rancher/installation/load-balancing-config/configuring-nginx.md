---
title: Option 3—NGINX
weight: 315
---
# Option 3-NGINX

NGINX is a popular application platform that can be used as a load balancer. Rancher supports use of NGINX with ngx_http_v2_module enabled, which isn't enabled by default. Use the following parameter when setting up NGINX to enable the module: `--with-http_v2_module`.

>**Note:**
>- NGINX is not supported if you are using SSL passthrough.
>- If you are using self-signed certificates, the certificate and key must be signed by same certificate authority as `cattle-keys-server`.

After the server is running, use the code sample below as a template when setting up your NGINX config file. Replace the variables with host names or IP addresses from your environment.

```
upstream rancher {
    server <rancher_server_ip1>;
    server <rancher_server_ip2>;
}

map $http_upgrade $connection_upgrade {
    default Upgrade;
    ''      close;
}

server {
    listen 443 ssl http2 default_server;
    server_name <FQDN>;

    if ($host != $server_name) {
        return 301 https://$server_name$request_uri;
    }

    ssl_certificate <CERT_FILE>;
    ssl_certificate_key <KEY_FILE>;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        # mitigate HTTPoxy Vulnerability
        # https://www.nginx.com/blog/mitigating-the-httpoxy-vulnerability-with-nginx/
        proxy_set_header Proxy "";

        proxy_http_version 1.1;

        # This allows the ability for the execute shell window to remain open for up to 30 minutes. Without this parameter, the default is 1 minute and will automatically close.
        proxy_connect_timeout 30s;
        proxy_send_timeout 1800s;
        proxy_read_timeout 1800s;

        proxy_pass http://rancher;
    }
}

server {
    listen 80;
    server_name <FQDN>;
    return 301 https://$server_name$request_uri;
}

```
