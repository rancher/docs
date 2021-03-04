---
title: Template for an RKE Cluster with a Self-signed Certificate and Layer 4 Load Balancer
weight: 2
aliases:	
  - /rancher/v2.0-v2.4/en/installation/options/cluster-yml-templates/3-node-certificate
---
RKE uses a cluster.yml file to install and configure your Kubernetes cluster.

This template is intended to be used for RKE add-on installs, which are only supported up to Rancher v2.0.8. Please use the Rancher Helm chart if you are installing a newer Rancher version.

The following template can be used for the cluster.yml if you have a setup with:

- Self-signed SSL
- Layer 4 load balancer
- [NGINX Ingress controller](https://kubernetes.github.io/ingress-nginx/)

> For more options, refer to [RKE Documentation: Config Options]({{<baseurl>}}/rke/latest/en/config-options/).

```yaml
nodes:
  - address: <IP> # hostname or IP to access nodes
    user: <USER> # root user (usually 'root')
    role: [controlplane,etcd,worker] # K8s roles for node
    ssh_key_path: <PEM_FILE> # path to PEM file
  - address: <IP>
    user: <USER>
    role: [controlplane,etcd,worker]
    ssh_key_path: <PEM_FILE>
  - address: <IP>
    user: <USER>
    role: [controlplane,etcd,worker]
    ssh_key_path: <PEM_FILE>

services:
  etcd:
    snapshot: true
    creation: 6h
    retention: 24h

addons: |-
  ---
  kind: Namespace
  apiVersion: v1
  metadata:
    name: cattle-system
  ---
  kind: ServiceAccount
  apiVersion: v1
  metadata:
    name: cattle-admin
    namespace: cattle-system
  ---
  kind: ClusterRoleBinding
  apiVersion: rbac.authorization.k8s.io/v1
  metadata:
    name: cattle-crb
    namespace: cattle-system
  subjects:
  - kind: ServiceAccount
    name: cattle-admin
    namespace: cattle-system
  roleRef:
    kind: ClusterRole
    name: cluster-admin
    apiGroup: rbac.authorization.k8s.io
  ---
  apiVersion: v1
  kind: Secret
  metadata:
    name: cattle-keys-ingress
    namespace: cattle-system
  type: Opaque
  data:
    tls.crt: <BASE64_CRT>  # ssl cert for ingress. If selfsigned, must be signed by same CA as cattle server
    tls.key: <BASE64_KEY>  # ssl key for ingress. If selfsigned, must be signed by same CA as cattle server
  ---
  apiVersion: v1
  kind: Secret
  metadata:
    name: cattle-keys-server
    namespace: cattle-system
  type: Opaque
  data:
    cacerts.pem: <BASE64_CA>  # CA cert used to sign cattle server cert and key
  ---
  apiVersion: v1
  kind: Service
  metadata:
    namespace: cattle-system
    name: cattle-service
    labels:
      app: cattle
  spec:
    ports:
    - port: 80
      targetPort: 80
      protocol: TCP
      name: http
    - port: 443
      targetPort: 443
      protocol: TCP
      name: https
    selector:
      app: cattle
  ---
  apiVersion: extensions/v1beta1
  kind: Ingress
  metadata:
    namespace: cattle-system
    name: cattle-ingress-http
    annotations:
      nginx.ingress.kubernetes.io/proxy-connect-timeout: "30"
      nginx.ingress.kubernetes.io/proxy-read-timeout: "1800"   # Max time in seconds for ws to remain shell window open
      nginx.ingress.kubernetes.io/proxy-send-timeout: "1800"   # Max time in seconds for ws to remain shell window open
  spec:
    rules:
    - host: <FQDN>  # FQDN to access cattle server
      http:
        paths:
        - backend:
            serviceName: cattle-service
            servicePort: 80
    tls:
    - secretName: cattle-keys-ingress
      hosts:
      - <FQDN>      # FQDN to access cattle server
  ---
  kind: Deployment
  apiVersion: extensions/v1beta1
  metadata:
    namespace: cattle-system
    name: cattle
  spec:
    replicas: 1
    template:
      metadata:
        labels:
          app: cattle
      spec:
        serviceAccountName: cattle-admin
        containers:
        # Rancher install via RKE addons is only supported up to v2.0.8
        - image: rancher/rancher:v2.0.8
          imagePullPolicy: Always
          name: cattle-server
  #       env:
  #       - name: HTTP_PROXY
  #         value: "http://your_proxy_address:port"
  #       - name: HTTPS_PROXY
  #         value: "http://your_proxy_address:port"
  #       - name: NO_PROXY
  #         value: "localhost,127.0.0.1,0.0.0.0,10.43.0.0/16,your_network_ranges_that_dont_need_proxy_to_access"
          livenessProbe:
            httpGet:
              path: /ping
              port: 80
            initialDelaySeconds: 60
            periodSeconds: 60
          readinessProbe:
            httpGet:
              path: /ping
              port: 80
            initialDelaySeconds: 20
            periodSeconds: 10
          ports:
          - containerPort: 80
            protocol: TCP
          - containerPort: 443
            protocol: TCP
          volumeMounts:
          - mountPath: /etc/rancher/ssl
            name: cattle-keys-volume
            readOnly: true
        volumes:
        - name: cattle-keys-volume
          secret:
            defaultMode: 420
            secretName: cattle-keys-server
```