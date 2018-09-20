---
title: 3—Configuring Rancher for the Private Registry
weight: 75
draft: true
---

Rancher needs to be configured to use the private registry as source for the needed images.

1. Go into the **Settings** view.
    
    ![Settings]({{< baseurl >}}/img/rancher/airgap/settings.png)

2. Look for the setting called `system-default-registry` and choose **Edit**.
  
    ![Edit]({{< baseurl >}}/img/rancher/airgap/edit-system-default-registry.png)

3. Change the value to your registry (e.g. `registry.yourdomain.com:port`). Do not prefix the registry with `http://` or `https://`.
  
    ![Save]({{< baseurl >}}/img/rancher/airgap/enter-system-default-registry.png)


>**Note:** If you want to configure the setting when starting the rancher/rancher container, you can use the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`.
>
> Example:
> ```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<registry.yourdomain.com:port> \
  <registry.yourdomain.com:port>/rancher/rancher:v2.0.0
```


