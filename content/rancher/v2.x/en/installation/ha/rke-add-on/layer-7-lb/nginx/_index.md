---
title: NGINX Configuration
weight: 277
aliases:
- /rancher/v2.x/en/installation/ha-server-install-external-lb/nginx/
---
## Install NGINX

Start by installing NGINX on your load balancer host. NGINX has packages available for all known operating systems.

For help installing NGINX, refer to their [install documentation](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/).

## Create NGINX Configuration

After installing NGINX, you need to create the NGINX config file, `/etc/nginx/conf.d/rancher.conf`, with the IP addresses for your Linux nodes, chosen FQDN and location of the certificate file and certificate key file.

>**Note:** The example configuration below does not include all available Nginx options and may not be suitable for your production environment. For full configuration documentation, see [NGINX Load Balancing - HTTP Load Balancer](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/).

1. Copy and paste the code sample below into your favorite text editor. Save it as `/etc/nginx/conf.d/rancher.conf`.

    **Example NGINX config:**
    ```
    upstream rancher {
        server IP_NODE_1:80;
        server IP_NODE_2:80;
        server IP_NODE_3:80;
    }

    map $http_upgrade $connection_upgrade {
        default Upgrade;
        ''      close;
    }

    server {
        listen 443 ssl http2;
        server_name FQDN;
        ssl_certificate /certs/fullchain.pem;
        ssl_certificate_key /certs/privkey.pem;

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
        server_name FQDN;
        return 301 https://$server_name$request_uri;
    }
    ```

2. In `/etc/nginx/conf.d/rancher.conf`, replace `IP_NODE_1`, `IP_NODE_2`, and `IP_NODE_3` with the IPs of your Linux hosts.
3. In `/etc/nginx/conf.d/rancher.conf`, replace `FQDN` with the FQDN you chose for your Rancher installation.
4. In `/etc/nginx/conf.d/rancher.conf`, replace `/certs/fullchain.pem` with the path to your certificate. If there are intermediates required for you certificate, they should be included in this file.
5. In `/etc/nginx/conf.d/rancher.conf`, replace `/certs/privkey.pem` with the path to your certificate key.



## Run NGINX

* Reload or restart NGINX

    ````
    # Reload NGINX
    nginx -s reload

    # Restart NGINX
    # Depending on your Linux distribution
    service nginx restart
    systemctl restart nginx
    ````

## Browse to Rancher UI

You should now be to able to browse to `https://FQDN`.
