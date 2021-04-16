---
title: Networking
weight: 102
---

The commands/steps listed on this page can be used to check networking related issues in your cluster.

Make sure you configured the correct kubeconfig (for example, `export KUBECONFIG=$PWD/kube_config_rancher-cluster.yml` for Rancher HA) or are using the embedded kubectl via the UI.

### Double check if all the required ports are opened in your (host) firewall

Double check if all the [required ports]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/node-requirements/#networking-requirements) are opened in your (host) firewall. The overlay network uses UDP in comparison to all other required ports which are TCP.
### Check if overlay network is functioning correctly

The pod can be scheduled to any of the hosts you used for your cluster, but that means that the NGINX ingress controller needs to be able to route the request from `NODE_1` to `NODE_2`. This happens over the overlay network. If the overlay network is not functioning, you will experience intermittent TCP/HTTP connection failures due to the NGINX ingress controller not being able to route to the pod.

To test the overlay network, you can launch the following `DaemonSet` definition. This will run a `swiss-army-knife` container on every host (image was developed by Rancher engineers and can be found here: https://github.com/rancherlabs/swiss-army-knife), which we will use to run a `ping` test between containers on all hosts.

1. Save the following file as `overlaytest.yml`

    ```
    apiVersion: apps/v1
    kind: DaemonSet
    metadata:
      name: overlaytest
    spec:
      selector:
          matchLabels:
            name: overlaytest
      template:
        metadata:
          labels:
            name: overlaytest
        spec:
          tolerations:
          - operator: Exists
          containers:
          - image: rancher/swiss-army-knife
            imagePullPolicy: Always
            name: overlaytest
            command: ["sh", "-c", "tail -f /dev/null"]
            terminationMessagePath: /dev/termination-log

    ```

2. Launch it using `kubectl create -f overlaytest.yml`
3. Wait until `kubectl rollout status ds/overlaytest -w` returns: `daemon set "overlaytest" successfully rolled out`.
4. Run the following script, from the same location.  It will have each `overlaytest` container on every host ping each other:
    ```
    #!/bin/bash
    echo "=> Start network overlay test"
      kubectl get pods -l name=overlaytest -o jsonpath='{range .items[*]}{@.metadata.name}{" "}{@.spec.nodeName}{"\n"}{end}' |
      while read spod shost 
        do kubectl get pods -l name=overlaytest -o jsonpath='{range .items[*]}{@.status.podIP}{" "}{@.spec.nodeName}{"\n"}{end}' |
        while read tip thost
          do kubectl --request-timeout='10s' exec $spod -c overlaytest -- /bin/sh -c "ping -c2 $tip > /dev/null 2>&1"
            RC=$?
            if [ $RC -ne 0 ]
              then echo FAIL: $spod on $shost cannot reach pod IP $tip on $thost
              else echo $shost can reach $thost
            fi
        done
      done
    echo "=> End network overlay test"
    ```

5. When this command has finished running, it will output the state of each route:

    ```
    => Start network overlay test
    Error from server (NotFound): pods "wk2" not found
    FAIL: overlaytest-5bglp on wk2 cannot reach pod IP 10.42.7.3 on wk2
    Error from server (NotFound): pods "wk2" not found
    FAIL: overlaytest-5bglp on wk2 cannot reach pod IP 10.42.0.5 on cp1
    Error from server (NotFound): pods "wk2" not found
    FAIL: overlaytest-5bglp on wk2 cannot reach pod IP 10.42.2.12 on wk1
    command terminated with exit code 1
    FAIL: overlaytest-v4qkl on cp1 cannot reach pod IP 10.42.7.3 on wk2
    cp1 can reach cp1
    cp1 can reach wk1
    command terminated with exit code 1
    FAIL: overlaytest-xpxwp on wk1 cannot reach pod IP 10.42.7.3 on wk2
    wk1 can reach cp1
    wk1 can reach wk1
    => End network overlay test
    ```
    If you see error in the output, there is some issue with the route between the pods on the two hosts.  In the above output the node `wk2` has no connectivity over the overlay network. This could be because the [required ports]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/node-requirements/#networking-requirements) for overlay networking are not opened for `wk2`.
6. You can now clean up the DaemonSet by running `kubectl delete ds/overlaytest`.


### Check if MTU is correctly configured on hosts and on peering/tunnel appliances/devices

When the MTU is incorrectly configured (either on hosts running Rancher, nodes in created/imported clusters or on appliances/devices in between), error messages will be logged in Rancher and in the agents, similar to:

* `websocket: bad handshake`
* `Failed to connect to proxy`
* `read tcp: i/o timeout`

See [Google Cloud VPN: MTU Considerations](https://cloud.google.com/vpn/docs/concepts/mtu-considerations#gateway_mtu_vs_system_mtu) for an example how to configure MTU correctly when using Google Cloud VPN between Rancher and cluster nodes.

### Resolved issues

#### Overlay network broken when using Canal/Flannel due to missing node annotations

| | |
|------------|------------|
| GitHub issue | [#13644](https://github.com/rancher/rancher/issues/13644) |
| Resolved in |  v2.1.2 |

To check if your cluster is affected, the following command will list nodes that are broken (this command requires `jq` to be installed):

```
kubectl get nodes -o json | jq '.items[].metadata | select(.annotations["flannel.alpha.coreos.com/public-ip"] == null or .annotations["flannel.alpha.coreos.com/kube-subnet-manager"] == null or .annotations["flannel.alpha.coreos.com/backend-type"] == null or .annotations["flannel.alpha.coreos.com/backend-data"] == null) | .name'
```

If there is no output, the cluster is not affected.
