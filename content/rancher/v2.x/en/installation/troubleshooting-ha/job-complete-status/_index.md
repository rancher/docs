---
title: Failed to get job complete status
weight: 20
---

To debug issues around this error, you will need to download the command-line tool `kubectl`. See [Install and Set Up kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) how to download `kubectl` for your platform.

When you have made changes to `rancher-cluster.yml`, you will have to run `rke remove --config rancher-cluster.yml` to clean the nodes, so it cannot conflict with previous configuration errors.

#### Failed to deploy addon execute job [rke-user-includes-addons]: Failed to get job complete status

* The content in the `addons:` section of your `rancher-cluster.yml` is wrong. You can retrieve the root cause of this issue by running the following command:

```
kubectl --kubeconfig kube_config_rancher-cluster.yml logs -l job-name=rke-user-addon-deploy-job -n kube-system
```

Usually something is printed along the lines of `error: error converting YAML to JSON: yaml: line 9:`, where `line 9` references to the line number of the addon that is causing issues.

<b>Things to check</b>
<ul>
<ul>
<li>Is each of the base64 encoded certificate string placed directly after the key, for example: `tls.crt: LS01...`, there should be no newline/space before, in between or after.</li>
<li>Is the YAML properly formatted, each indentation should be 2 spaces as shown in the template files.</li>
</ul>
</ul>

<b>Other errors</b>

* `The Ingress "cattle-ingress-http" is invalid: spec.rules[0].host: Invalid value: "IP": must be a DNS name, not an IP address`

The host value can only contain a host name, as it is needed by the ingress controller to match the hostname and pass to the correct backend.
