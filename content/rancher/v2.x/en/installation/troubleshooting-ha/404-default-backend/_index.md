---
title: 404 - default backend
weight: 30
---

To debug issues around this error, you will need to download the command-line tool `kubectl`. See [Install and Set Up kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) how to download `kubectl` for your platform.

When you have made changes to `rancher-cluster.yml`, you will have to run `rke remove --config rancher-cluster.yml` to clean the nodes, so it cannot conflict with previous configuration errors.

### Possible causes

The nginx ingress controller is not able to serve the configured host in `rancher-cluster.yml`. This should be the FQDN you configured to access Rancher. The logging of the nginx ingress controller will show why it cannot serve the requested host. To view the logs, you can run the following command

```
kubectl --kubeconfig kube_config_rancher-cluster.yml logs -l app=ingress-nginx -n ingress-nginx
```

<b>Errors</b>

* `x509: certificate is valid for fqdn, not your_configured_fqdn`

The used certificates do not contain the correct hostname. Generate new certificates that contain the chosen FQDN to access Rancher and redeploy.

* `Port 80 is already in use. Please check the flag --http-port`

There is a process on the node occupying port 80, this port is needed for the nginx ingress controller to route requests to Rancher. You can find the process by running the command: `netstat -plant | grep \:80`.

Stop/kill the process and redeploy.
