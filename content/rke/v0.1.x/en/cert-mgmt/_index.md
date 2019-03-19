---
title: Certificate Management
weight: 150
---

_Available as of v0.2.0_

Certificates are an important part of Kubernetes clusters and are used for all Kubernetes cluster components. RKE has added a `rke cert` command to help manage these certificates.

* [Ability to generate certificate sign requests for the Kubernetes components](#generating-certificate-signing-requests-csrs-and-keys)
* [Rotate Auto-Generated Cluster Certificates](#certifiate-rotation)

## Generating Certificate Signing Requests (CSRs) and Keys

If you want to create and sign the certificates by a real Certificate Authority (CA), you can use RKE to [generate a set of Certificate Signing Requests (CSRs) and keys]({{< baseurl >}}/rke/v0.1.x/en/installation/certs/#generating-certificate-signing-requests-csrs-and-keys). Using the `rke cert generate-csr` command, you will be able to generate the CRSs and keys.

You can use the CSRs and keys to sign the certificates by a real CA. After the certificates are signed, they can be used by RKE to use [custom certificates]({{< baseurl >}}/rke/v0.1.x/en/installation/certs/).

## Certificate Rotation

By default, Kubernetes clusters require certificates and RKE will automatically generate certificates for the clusters. When generating certificates, the cluster certificates will automatically expire after 1 year and the CA certificate will expire after 10 years. Before your certificates expire, Rancher recommends rotating the cluster certificates.

After the certificates are rotated, the Kubernetes components are automatically restarted. Certificates can be rotated for the following Kubernetes cluster components:

- etcd
- kubelet
- kube-apiserver
- kube-proxy
- kube-scheduler
- kube-controller-manager

RKE has the ability to rotate these auto-generated certificates with some simple commands:

* Rotating Cluster Certificates for All Kubernetes Cluster Components
* Rotating Cluster Certificates for a Single Kubernetes Component
* Rotating the CA Certificate and Cluster Certificates

Whenever you're trying to rotate certificates, the `cluster.yml` that was used to deploy the Kubernetes cluster is required. You can reference a different location for this file by using the `--config` option when running `rke cert rotate`.



```
$ rke cert rotate --help
NAME:
   rke cert rotate - Rotate RKE cluster certificates

USAGE:
   rke cert rotate [command options] [arguments...]

OPTIONS:
   --config value   Specify an alternate cluster YAML file (default: "cluster.yml") [$RKE_CONFIG]
   --service value  Specify a k8s service to rotate certs, (allowed values: kube-apiserver, kube-controller-manager, kube-scheduler, kubelet, kube-proxy, etcd)
   --rotate-ca      Rotate all certificates including CA certs
```

### Rotating Cluster Certificates for All Components

To rotate the cluster certificates for all the Kubernetes cluster components, run the following command, i.e. `rke cert rotate`. After all the cluster certificates are rotated, the Kubernetes components will automatically be restarted.

```
$ rke cert rotate
INFO[0000] Initiating Kubernetes cluster                
INFO[0000] Rotating Kubernetes cluster certificates     
INFO[0000] [certificates] Generating Kubernetes API server certificates
INFO[0000] [certificates] Generating Kube Controller certificates
INFO[0000] [certificates] Generating Kube Scheduler certificates
INFO[0001] [certificates] Generating Kube Proxy certificates
INFO[0001] [certificates] Generating Node certificate   
INFO[0001] [certificates] Generating admin certificates and kubeconfig
INFO[0001] [certificates] Generating Kubernetes API server proxy client certificates
INFO[0001] [certificates] Generating etcd-xxxxx certificate and key
INFO[0001] [certificates] Generating etcd-yyyyy certificate and key
INFO[0002] [certificates] Generating etcd-zzzzz certificate and key
INFO[0002] Successfully Deployed state file at [./cluster.rkestate]
INFO[0002] Rebuilding Kubernetes cluster with rotated certificates
.....
INFO[0050] [worker] Successfully restarted Worker Plane..
```

### Rotating Cluster Certificates for a Specific Component

To rotate certificates for individual Kubernetes components, use the `--service` option when rotating certificates to specify which component. As always, the specified Kubernetes component is automatically restarted after the certificate is rotated.

Example of rotating the certificate for only the `kubelet` component.

```
$ rke cert rotate --service kubelet
INFO[0000] Initiating Kubernetes cluster                
INFO[0000] Rotating Kubernetes cluster certificates     
INFO[0000] [certificates] Generating Node certificate   
INFO[0000] Successfully Deployed state file at [./cluster.rkestate]
INFO[0000] Rebuilding Kubernetes cluster with rotated certificates
.....
INFO[0033] [worker] Successfully restarted Worker Plane..
```

### Rotating CA Certificate and all Cluster Certificates

If the CA certificate needs to be rotated, you are required to rotate all the cluster certificates for all components as they need to be signed with the newly rotated CA certificate. To include rotating the CA certificate with the cluster certificates, add the `--rotate-ca` option. As always, all Kubernetes components are automatically restarted after the certificates are rotated.


```
$ rke cert rotate --rotate-ca      
INFO[0000] Initiating Kubernetes cluster                
INFO[0000] Rotating Kubernetes cluster certificates     
INFO[0000] [certificates] Generating CA kubernetes certificates
INFO[0000] [certificates] Generating Kubernetes API server aggregation layer requestheader client CA certificates
INFO[0000] [certificates] Generating Kubernetes API server certificates
INFO[0000] [certificates] Generating Kube Controller certificates
INFO[0000] [certificates] Generating Kube Scheduler certificates
INFO[0000] [certificates] Generating Kube Proxy certificates
INFO[0000] [certificates] Generating Node certificate   
INFO[0001] [certificates] Generating admin certificates and kubeconfig
INFO[0001] [certificates] Generating Kubernetes API server proxy client certificates
INFO[0001] [certificates] Generating etcd-xxxxx certificate and key
INFO[0001] [certificates] Generating etcd-yyyyy certificate and key
INFO[0001] [certificates] Generating etcd-zzzzz certificate and key
INFO[0001] Successfully Deployed state file at [./cluster.rkestate]
INFO[0001] Rebuilding Kubernetes cluster with rotated certificates
```
