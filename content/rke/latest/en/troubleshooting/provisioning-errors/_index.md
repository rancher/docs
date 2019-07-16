---
title: Provisioning Errors
weight: 200
---

### Failed to get job complete status

Most common reason for this error is that a node is having issues that block the deploy job from completing successfully. See [Get node conditions]({{< baseurl >}}/rancher/v2.x/en/troubleshooting/kubernetes-resources/#get-node-conditions) how to check node conditions.

You can also retrieve the log from the job to see if it has an indication of the error, make sure you replace `rke-network-plugin-deploy-job` with the job name from the error:

Example command to get logs for error `Failed to get job complete status for job rke-network-plugin-deploy-job`:
```
kubectl -n kube-system get pods -l job-name=rke-network-plugin-deploy-job --no-headers -o custom-columns=NAME:.metadata.name | xargs -L1 kubectl -n kube-system logs
```

### Failed to apply the ServiceAccount needed for job execution

Because this action requires connectivity from the host running `rke up` to the controlplane nodes, this is usually caused by incorrect proxy configuration on the host running `rke up`. The message printed after this error usually is the response from the proxy that is blocking the request. Please verify the `HTTP_PROXY`, `HTTPS_PROXY` and `NO_PROXY` environment variables are correctly configured, especially `NO_PROXY` if the host cannot reach the controlplane nodes via the configured proxy. (this IP range then needs to be added to `NO_PROXY` to make it work)
