---
title: NGINX Configuration
weight: 277
aliases:
- /rancher/v2.x/en/installation/ha-server-install-external-lb/nginx/
---

> #### **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
>Please use the Rancher helm chart to install HA Rancher. For details, see the [HA Install - Installation Outline]({{< baseurl >}}/rancher/v2.x/en/installation/ha/#installation-outline).
>
>If you are currently using the RKE add-on install method, see [Migrating from an HA RKE Add-on Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.

## Install NGINX

Start by installing NGINX on your load balancer host. NGINX has packages available for all known operating systems.

For help installing NGINX, refer to their [install documentation](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/).

## Create NGINX Configuration

See [Example NGINX config]({{< baseurl >}}/rancher/v2.x/en/installation/resources-for-ha/chart-options/#example-nginx-config).

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
