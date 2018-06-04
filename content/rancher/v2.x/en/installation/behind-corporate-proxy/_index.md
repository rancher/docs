---
title: Operating Rancher behind a corporate proxy
weight: 275
---
If you operate Rancher behind a corporate proxy, and you need to reach the Internet to perform tasks (such as using Helm catalogs), you must provide Rancher information about your proxy.

## Set http_proxy environment variable ##

### Ubuntu ###

1. Check if *http_proxy* is still defined:

  ```bash
  echo $http_proxy
  ```

  If it is empty, you should set and store it in your account's environment like this:


  ```bash
  echo "export http_proxy=http://<username>:<password>@<proxy url>:<proxy port>/" >> .profile
  ```

2. Logout and relogin to make this change effective.

## Start Rancher Container with Proxy Information ##

Ensure that your `http_proxy` environment variable is visible inside of Rancher's Docker container:

```bash
sudo docker run -d --restart=unless-stopped --volumes-from rancher-data -p 80:80 -p 443:443 -e HTTP_PROXY=$http_proxy -e HTTPS_PROXY=$http_proxy -e http_proxy=$http_proxy -e https_proxy=$http_proxy -e NO_PROXY="localhost,127.0.0.1" -e no_proxy="localhost,127.0.0.1" rancher/rancher
```
