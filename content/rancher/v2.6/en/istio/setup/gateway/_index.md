---
title: 4. Set up the Istio Gateway
weight: 5
aliases:
  - /rancher/v2.5/en/cluster-admin/tools/istio/setup/gateway
  - /rancher/v2.5/en/istio/v2.5/setup/gateway
---

The gateway to each cluster can have its own port or load balancer, which is unrelated to a service mesh. By default, each Rancher-provisioned cluster has one NGINX ingress controller allowing traffic into the cluster. 

You can use the Nginx Ingress controller with or without Istio installed. If this is the only gateway to your cluster, Istio will be able to route traffic from service to service, but Istio will not be able to receive traffic from outside the cluster.

To allow Istio to receive external traffic, you need to enable Istio's gateway, which works as a north-south proxy for external traffic. When you enable the Istio gateway, the result is that your cluster will have two Ingresses.

You will also need to set up a Kubernetes gateway for your services. This Kubernetes resource points to Istio's implementation of the ingress gateway to the cluster.

You can route traffic into the service mesh with a load balancer or use Istio's NodePort gateway. This section describes how to set up the NodePort gateway.

For more information on the Istio gateway, refer to the [Istio documentation.](https://istio.io/docs/reference/config/networking/v1alpha3/gateway/) 

![In an Istio-enabled cluster, you can have two Ingresses: the default Nginx Ingress, and the default Istio controller.]({{<baseurl>}}/img/rancher/istio-ingress.svg)

# Enable an Istio Gateway

The ingress gateway is a Kubernetes service that will be deployed in your cluster. The Istio Gateway allows for more extensive customization and flexibility.  

1. From the **Cluster Explorer**, select **Istio** from the nav dropdown. 
1. Click **Gateways** in the side nav bar.
1. Click **Create from Yaml**.
1. Paste your Istio Gateway yaml, or **Read from File**.
1. Click **Create**.

**Result:** The gateway is deployed, and will now route traffic with applied rules

# Example Istio Gateway

We add the BookInfo app deployments in services when going through the Workloads example. Next we add an Istio Gateway so that the app is accessible from outside your cluster.

1. From the **Cluster Explorer**, select **Istio** from the nav dropdown. 
1. Click **Gateways** in the side nav bar.
1. Click **Create from Yaml**.
1. Copy and paste the Gateway yaml provided below.
1. Click **Create**.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: bookinfo-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
```

Then to deploy the VirtualService that provides the traffic routing for the Gateway

1. Click **VirtualService** in the side nav bar.
1. Click **Create from Yaml**.
1. Copy and paste the VirtualService yaml provided below.
1. Click **Create**.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: bookinfo
spec:
  hosts:
  - "*"
  gateways:
  - bookinfo-gateway
  http:
  - match:
    - uri:
        exact: /productpage
    - uri:
        prefix: /static
    - uri:
        exact: /login
    - uri:
        exact: /logout
    - uri:
        prefix: /api/v1/products
    route:
    - destination:
        host: productpage
        port:
          number: 9080
```

**Result:** You have configured your gateway resource so that Istio can receive traffic from outside the cluster.

Confirm that the resource exists by running:
```
kubectl get gateway -A
```

The result should be something like this:
```
NAME               AGE
bookinfo-gateway   64m
```

### Access the ProductPage Service from a Web Browser

To test and see if the BookInfo app deployed correctly, the app can be viewed a web browser using the Istio controller IP and port, combined with the request name specified in your Kubernetes gateway resource:

`http://<IP of Istio controller>:<Port of istio controller>/productpage`

To get the ingress gateway URL and port,

1. From the **Cluster Explorer**, Click on **Workloads > Overview**. 
1. Scroll down to the `istio-system` namespace. 
1. Within `istio-system`, there is a workload named `istio-ingressgateway`. Under the name of this workload, you should see links, such as `80/tcp`.
1. Click one of those links. This should show you the URL of the ingress gateway in your web browser. Append `/productpage` to the URL.

**Result:** You should see the BookInfo app in the web browser.

For help inspecting the Istio controller URL and ports, try the commands the [Istio documentation.](https://istio.io/docs/tasks/traffic-management/ingress/ingress-control/#determining-the-ingress-ip-and-ports)

# Troubleshooting

The [official Istio documentation](https://istio.io/docs/tasks/traffic-management/ingress/ingress-control/#troubleshooting) suggests `kubectl` commands to inspect the correct ingress host and ingress port for external requests.

### Confirming that the Kubernetes Gateway Matches Istio's Ingress Controller

You can try the steps in this section to make sure the Kubernetes gateway is configured properly.

In the gateway resource, the selector refers to Istio's default ingress controller by its label, in which the key of the label is `istio` and the value is `ingressgateway`.  To make sure the label is appropriate for the gateway, do the following:

1. From the **Cluster Explorer**, Click on **Workloads > Overview**. 
1. Scroll down to the `istio-system` namespace. 
1. Within `istio-system`, there is a workload named `istio-ingressgateway`. Click the name of this workload and go to the **Labels and Annotations** section. You should see that it has the key `istio` and the value `ingressgateway`. This confirms that the selector in the Gateway resource matches Istio's default ingress controller.

### [Next: Set up Istio's Components for Traffic Management]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/setup/set-up-traffic-management)
