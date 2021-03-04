---
title: 404 - default backend
weight: 30
aliases:
- /rancher/v2.0-v2.4/en/installation/troubleshooting-ha/404-default-backend/
- /rancher/v2.0-v2.4/en/installation/options/helm2/rke-add-on/troubleshooting/404-default-backend
- /404-default-backend/
---

> #### **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
>Please use the Rancher Helm chart to install Rancher on a Kubernetes cluster. For details, see the [Kubernetes Install ]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/).
>
>If you are currently using the RKE add-on install method, see [Migrating from a Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.

To debug issues around this error, you will need to download the command-line tool `kubectl`. See [Install and Set Up kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) how to download `kubectl` for your platform.

When you have made changes to `rancher-cluster.yml`, you will have to run `rke remove --config rancher-cluster.yml` to clean the nodes, so it cannot conflict with previous configuration errors.

### Possible causes

The nginx ingress controller is not able to serve the configured host in `rancher-cluster.yml`. This should be the FQDN you configured to access Rancher. You can check if it is properly configured by viewing the ingress that is created by running the following command:

```
kubectl --kubeconfig kube_config_rancher-cluster.yml get ingress -n cattle-system -o wide
```

Check if the `HOSTS` column is displaying the FQDN you configured in the template, and that the used nodes are listed in the `ADDRESS` column. If that is configured correctly, we can check the logging of the nginx ingress controller.

The logging of the nginx ingress controller will show why it cannot serve the requested host. To view the logs, you can run the following command

```
kubectl --kubeconfig kube_config_rancher-cluster.yml logs -l app=ingress-nginx -n ingress-nginx
```

<b>Errors</b>

* `x509: certificate is valid for fqdn, not your_configured_fqdn`

The used certificates do not contain the correct hostname. Generate new certificates that contain the chosen FQDN to access Rancher and redeploy.

* `Port 80 is already in use. Please check the flag --http-port`

There is a process on the node occupying port 80, this port is needed for the nginx ingress controller to route requests to Rancher. You can find the process by running the command: `netstat -plant | grep \:80`.

Stop/kill the process and redeploy.

* `unexpected error creating pem file: no valid PEM formatted block found`

The base64 encoded string configured in the template is not valid. Please check if you can decode the configured string using `base64 -D STRING`, this should return the same output as the content of the file you used to generate the string. If this is correct, please check if the base64 encoded string is placed directly after the key, without any newlines before, in between or after. (For example: `tls.crt: LS01..`)
