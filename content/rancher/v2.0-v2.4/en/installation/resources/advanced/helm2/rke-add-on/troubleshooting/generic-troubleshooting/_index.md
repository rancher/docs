---
title: Generic troubleshooting
weight: 5
aliases:
- /rancher/v2.0-v2.4/en/installation/troubleshooting-ha/generic-troubleshooting/
- /rancher/v2.0-v2.4/en/installation/options/helm2/rke-add-on/troubleshooting/generic-troubleshooting
---

> #### **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
>Please use the Rancher Helm chart to install Rancher on a Kubernetes cluster. For details, see the [Kubernetes Install ]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/).
>
>If you are currently using the RKE add-on install method, see [Migrating from a Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.

Below are steps that you can follow to determine what is wrong in your cluster.

### Double check if all the required ports are opened in your (host) firewall

Double check if all the [required ports]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/node-requirements/#networking-requirements) are opened in your (host) firewall.

### All nodes should be present and in **Ready** state

To check, run the command:

```
kubectl --kubeconfig kube_config_rancher-cluster.yml get nodes
```

If a node is not shown in this output or a node is not in **Ready** state, you can check the logging of the `kubelet` container. Login to the node and run `docker logs kubelet`.

### All pods/jobs should be in **Running**/**Completed** state

To check, run the command:

```
kubectl --kubeconfig kube_config_rancher-cluster.yml get pods --all-namespaces
```

If a pod is not in **Running** state, you can dig into the root cause by running:

#### Describe pod

```
kubectl --kubeconfig kube_config_rancher-cluster.yml describe pod POD_NAME -n NAMESPACE
```

#### Pod container logs</h3>

```
kubectl --kubeconfig kube_config_rancher-cluster.yml logs POD_NAME -n NAMESPACE
```

If a job is not in **Completed** state, you can dig into the root cause by running:

#### Describe job

```
kubectl --kubeconfig kube_config_rancher-cluster.yml describe job JOB_NAME -n NAMESPACE
```

#### Logs from the containers of pods of the job

```
kubectl --kubeconfig kube_config_rancher-cluster.yml logs -l job-name=JOB_NAME -n NAMESPACE
```

### Check ingress

Ingress should have the correct `HOSTS` (showing the configured FQDN) and `ADDRESS` (address(es) it will be routed to).

```
kubectl --kubeconfig kube_config_rancher-cluster.yml get ingress --all-namespaces
```

### List all Kubernetes cluster events

Kubernetes cluster events are stored, and can be retrieved by running:

```
kubectl --kubeconfig kube_config_rancher-cluster.yml get events --all-namespaces
```

### Check Rancher container logging

```
kubectl --kubeconfig kube_config_rancher-cluster.yml logs -l app=cattle -n cattle-system
```

### Check NGINX ingress controller logging

```
kubectl --kubeconfig kube_config_rancher-cluster.yml logs -l app=ingress-nginx -n ingress-nginx
```

### Check if overlay network is functioning correctly

The pod can be scheduled to any of the hosts you used for your cluster, but that means that the NGINX ingress controller needs to be able to route the request from `NODE_1` to `NODE_2`. This happens over the overlay network. If the overlay network is not functioning, you will experience intermittent TCP/HTTP connection failures due to the NGINX ingress controller not being able to route to the pod.

To test the overlay network, you can launch the following `DaemonSet` definition. This will run an `alpine` container on every host, which we will use to run a `ping` test between containers on all hosts.

1. Save the following file as `ds-alpine.yml`

    ```
    apiVersion: apps/v1
    kind: DaemonSet
    metadata:
      name: alpine
    spec:
      selector:
          matchLabels:
            name: alpine
      template:
        metadata:
          labels:
            name: alpine
        spec:
          tolerations:
          - effect: NoExecute
            key: "node-role.kubernetes.io/etcd"
            value: "true"
          - effect: NoSchedule
            key: "node-role.kubernetes.io/controlplane"
            value: "true"
          containers:
          - image: alpine
            imagePullPolicy: Always
            name: alpine
            command: ["sh", "-c", "tail -f /dev/null"]
            terminationMessagePath: /dev/termination-log
    ```

2. Launch it using `kubectl --kubeconfig kube_config_rancher-cluster.yml create -f ds-alpine.yml`
3. Wait until `kubectl --kubeconfig kube_config_rancher-cluster.yml rollout status ds/alpine -w` returns: `daemon set "alpine" successfully rolled out`.
4. Run the following command to let each container on every host ping each other (it's a single line command).

    ```
    echo "=> Start"; kubectl --kubeconfig kube_config_rancher-cluster.yml get pods -l name=alpine -o jsonpath='{range .items[*]}{@.metadata.name}{" "}{@.spec.nodeName}{"\n"}{end}' | while read spod shost; do kubectl --kubeconfig kube_config_rancher-cluster.yml get pods -l name=alpine -o jsonpath='{range .items[*]}{@.status.podIP}{" "}{@.spec.nodeName}{"\n"}{end}' | while read tip thost; do kubectl --kubeconfig kube_config_rancher-cluster.yml --request-timeout='10s' exec $spod -- /bin/sh -c "ping -c2 $tip > /dev/null 2>&1"; RC=$?; if [ $RC -ne 0 ]; then echo $shost cannot reach $thost; fi; done; done; echo "=> End"
    ```

5. When this command has finished running, the output indicating everything is correct is:

    ```
    => Start
    => End
    ```

If you see error in the output, that means that the [required ports]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/node-requirements/#networking-requirements) for overlay networking are not opened between the hosts indicated.

Example error output of a situation where NODE1 had the UDP ports blocked.

```
=> Start
command terminated with exit code 1
NODE2 cannot reach NODE1
command terminated with exit code 1
NODE3 cannot reach NODE1
command terminated with exit code 1
NODE1 cannot reach NODE2
command terminated with exit code 1
NODE1 cannot reach NODE3
=> End
```
