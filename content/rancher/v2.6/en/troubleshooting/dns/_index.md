---
title: DNS
weight: 103
---

The commands/steps listed on this page can be used to check name resolution issues in your cluster.

Make sure you configured the correct kubeconfig (for example, `export KUBECONFIG=$PWD/kube_config_rancher-cluster.yml` for Rancher HA) or are using the embedded kubectl via the UI.

Before running the DNS checks, check the [default DNS provider]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/options/#default-dns-provider) for your cluster and make sure that [the overlay network is functioning correctly]({{<baseurl>}}/rancher/v2.5/en/troubleshooting/networking/#check-if-overlay-network-is-functioning-correctly) as this can also be the reason why DNS resolution (partly) fails.

### Check if DNS pods are running

```
kubectl -n kube-system get pods -l k8s-app=kube-dns
```

Example output when using CoreDNS:
```
NAME                       READY   STATUS    RESTARTS   AGE
coredns-799dffd9c4-6jhlz   1/1     Running   0          76m
```

Example output when using kube-dns:
```
NAME                        READY   STATUS    RESTARTS   AGE
kube-dns-5fd74c7488-h6f7n   3/3     Running   0          4m13s
```

### Check if the DNS service is present with the correct cluster-ip

```
kubectl -n kube-system get svc -l k8s-app=kube-dns
```

```
NAME               TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)         AGE
service/kube-dns   ClusterIP   10.43.0.10   <none>        53/UDP,53/TCP   4m13s
```

### Check if domain names are resolving

Check if internal cluster names are resolving (in this example, `kubernetes.default`), the IP shown after `Server:` should be the same as the `CLUSTER-IP` from the `kube-dns` service.

```
kubectl run -it --rm --restart=Never busybox --image=busybox:1.28 -- nslookup kubernetes.default
```

Example output:
```
Server:    10.43.0.10
Address 1: 10.43.0.10 kube-dns.kube-system.svc.cluster.local

Name:      kubernetes.default
Address 1: 10.43.0.1 kubernetes.default.svc.cluster.local
pod "busybox" deleted
```

Check if external names are resolving (in this example, `www.google.com`)

```
kubectl run -it --rm --restart=Never busybox --image=busybox:1.28 -- nslookup www.google.com
```

Example output:
```
Server:    10.43.0.10
Address 1: 10.43.0.10 kube-dns.kube-system.svc.cluster.local

Name:      www.google.com
Address 1: 2a00:1450:4009:80b::2004 lhr35s04-in-x04.1e100.net
Address 2: 216.58.211.100 ams15s32-in-f4.1e100.net
pod "busybox" deleted
```

If you want to check resolving of domain names on all of the hosts, execute the following steps:

1. Save the following file as `ds-dnstest.yml`

    ```
    apiVersion: apps/v1
    kind: DaemonSet
    metadata:
      name: dnstest
    spec:
      selector:
          matchLabels:
            name: dnstest
      template:
        metadata:
          labels:
            name: dnstest
        spec:
          tolerations:
          - operator: Exists
          containers:
          - image: busybox:1.28
            imagePullPolicy: Always
            name: alpine
            command: ["sh", "-c", "tail -f /dev/null"]
            terminationMessagePath: /dev/termination-log
    ```

2. Launch it using `kubectl create -f ds-dnstest.yml`
3. Wait until `kubectl rollout status ds/dnstest -w` returns: `daemon set "dnstest" successfully rolled out`.
4. Configure the environment variable `DOMAIN` to a fully qualified domain name (FQDN) that the host should be able to resolve (`www.google.com` is used as an example) and run the following command to let each container on every host resolve the configured domain name (it's a single line command).

    ```
    export DOMAIN=www.google.com; echo "=> Start DNS resolve test"; kubectl get pods -l name=dnstest --no-headers -o custom-columns=NAME:.metadata.name,HOSTIP:.status.hostIP | while read pod host; do kubectl exec $pod -- /bin/sh -c "nslookup $DOMAIN > /dev/null 2>&1"; RC=$?; if [ $RC -ne 0 ]; then echo $host cannot resolve $DOMAIN; fi; done; echo "=> End DNS resolve test"
    ```

5. When this command has finished running, the output indicating everything is correct is:

    ```
    => Start DNS resolve test
    => End DNS resolve test
    ```

If you see error in the output, that means that the mentioned host(s) is/are not able to resolve the given FQDN.

Example error output of a situation where host with IP 209.97.182.150 had the UDP ports blocked.

```
=> Start DNS resolve test
command terminated with exit code 1
209.97.182.150 cannot resolve www.google.com
=> End DNS resolve test
```

Cleanup the alpine DaemonSet by running `kubectl delete ds/dnstest`.

### CoreDNS specific

#### Check CoreDNS logging

```
kubectl -n kube-system logs -l k8s-app=kube-dns
```

#### Check configuration

CoreDNS configuration is stored in the configmap `coredns` in the `kube-system` namespace.

```
kubectl -n kube-system get configmap coredns -o go-template={{.data.Corefile}}
```

#### Check upstream nameservers in resolv.conf

By default, the configured nameservers on the host (in `/etc/resolv.conf`) will be used as upstream nameservers for CoreDNS. You can check this file on the host or run the following Pod with `dnsPolicy` set to `Default`, which will inherit the `/etc/resolv.conf` from the host it is running on.

```
kubectl run -i --restart=Never --rm test-${RANDOM} --image=ubuntu --overrides='{"kind":"Pod", "apiVersion":"v1", "spec": {"dnsPolicy":"Default"}}' -- sh -c 'cat /etc/resolv.conf'
```

#### Enable query logging

Enabling query logging can be done by enabling the [log plugin](https://coredns.io/plugins/log/) in the Corefile configuration in the configmap `coredns`. You can do so by using `kubectl -n kube-system edit configmap coredns` or use the command below to replace the configuration in place:

```
kubectl get configmap -n kube-system coredns -o json |  kubectl get configmap -n kube-system coredns -o json | sed -e 's_loadbalance_log\\n    loadbalance_g' | kubectl apply -f -
```

All queries will now be logged and can be checked using the command in [Check CoreDNS logging](#check-coredns-logging).

### kube-dns specific

#### Check upstream nameservers in kubedns container

By default, the configured nameservers on the host (in `/etc/resolv.conf`) will be used as upstream nameservers for kube-dns. Sometimes the host will run a local caching DNS nameserver, which means the address in `/etc/resolv.conf` will point to an address in the loopback range (`127.0.0.0/8`) which will be unreachable by the container. In case of Ubuntu 18.04, this is done by `systemd-resolved`. We detect if `systemd-resolved` is running, and will automatically use the `/etc/resolv.conf` file with the correct upstream nameservers (which is located at `/run/systemd/resolve/resolv.conf`).

Use the following command to check the upstream nameservers used by the kubedns container:

```
kubectl -n kube-system get pods -l k8s-app=kube-dns --no-headers -o custom-columns=NAME:.metadata.name,HOSTIP:.status.hostIP | while read pod host; do echo "Pod ${pod} on host ${host}"; kubectl -n kube-system exec $pod -c kubedns cat /etc/resolv.conf; done
```

Example output:
```
Pod kube-dns-667c7cb9dd-z4dsf on host x.x.x.x
nameserver 1.1.1.1
nameserver 8.8.4.4
```

If the output shows an address in the loopback range (`127.0.0.0/8`), you can correct this in two ways:

* Make sure the correct nameservers are listed in `/etc/resolv.conf` on your nodes in the cluster, please consult your operating system documentation on how to do this. Make sure you execute this before provisioning a cluster, or reboot the nodes after making the modification.
* Configure the `kubelet` to use a different file for resolving names, by using `extra_args` as shown below (where `/run/resolvconf/resolv.conf` is the file with the correct nameservers):

```
services:
  kubelet:
    extra_args:
      resolv-conf: "/run/resolvconf/resolv.conf"
```

> **Note:** As the `kubelet` is running inside a container, the path for files located in `/etc` and `/usr` are in `/host/etc` and `/host/usr` inside the `kubelet` container.

See [Editing Cluster as YAML]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/editing-clusters/#editing-clusters-with-yaml) how to apply this change. When the provisioning of the cluster has finished, you have to remove the kube-dns pod to activate the new setting in the pod:

```
kubectl delete pods -n kube-system -l k8s-app=kube-dns
pod "kube-dns-5fd74c7488-6pwsf" deleted
```

Try to resolve name again using [Check if domain names are resolving](#check-if-domain-names-are-resolving).

If you want to check the kube-dns configuration in your cluster (for example, to check if there are different upstream nameservers configured), you can run the following command to list the kube-dns configuration:

```
kubectl -n kube-system get configmap kube-dns -o go-template='{{range $key, $value := .data}}{{ $key }}{{":"}}{{ $value }}{{"\n"}}{{end}}'
```

Example output:
```
upstreamNameservers:["1.1.1.1"]
```
