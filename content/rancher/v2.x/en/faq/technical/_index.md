---
  title: Technical
  weight: 5000
---

#### How can I reset the admin password?

Single node install:
```
$ docker exec -ti <container_id> reset-password
New password for default admin user (user-xxxxx):
<new_password>
```

High Availability install:
```
$ KUBECONFIG=./kube_config_rancher-cluster.yml
$ kubectl --kubeconfig $KUBECONFIG exec -n cattle-system $(kubectl --kubeconfig $KUBECONFIG get pods -n cattle-system -o json | jq -r '.items[] | select(.spec.containers[].name=="cattle-server") | .metadata.name') -- reset-password
New password for default admin user (user-xxxxx):
<new_password>
```

#### How can I enable debug logging?

Single node install:
```
$ docker exec -ti <container_id> loglevel --set debug
OK
$ docker logs -f <container_id>
```

High Availability install:
```
$ KUBECONFIG=./kube_config_rancher-cluster.yml
$ kubectl --kubeconfig $KUBECONFIG exec -n cattle-system $(kubectl --kubeconfig $KUBECONFIG get pods -n cattle-system -o json | jq -r '.items[] | select(.spec.containers[].name=="cattle-server") | .metadata.name') -- loglevel --set debug
OK
$ kubectl --kubeconfig $KUBECONFIG logs -n cattle-system -f $(kubectl --kubeconfig $KUBECONFIG get pods -n cattle-system -o json | jq -r '.items[] | select(.spec.containers[].name="cattle-server") | .metadata.name')
```

#### My ClusterIP does not respond to ping

ClusterIP is a virtual IP, which will not respond to ping. Best way to test if the ClusterIP is configured correctly, is by using `curl` to access the IP and port to see if it responds.

#### Where can I manage Node Templates?

Node Templates can be accessed by opening your account menu (top right) and selecting `Node Templates`.

#### Why is my Layer-4 Load Balancer in `Pending` state?

The Layer-4 Load Balancer is created as `type: LoadBalancer`. In Kubernetes, this needs a cloud provider or controller that can satisfy these requests, otherwise these will be in `Pending` state forever. More information can be on [Cloud Providers]({{< baseurl >}}/rancher/v2.x/en/concepts/clusters/cloud-providers/) or [Create External Load Balancer](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/)
