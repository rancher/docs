---
title: Certificate Management
weight: 150
---

_Available as of v0.2.0_

Certificates are an important part of Kubernetes clusters and are used for all Kubernetes cluster components. RKE has a `rke cert` command to help work with certificates.

* [Ability to generate certificate sign requests for the Kubernetes components](#generating-certificate-signing-requests-csrs-and-keys)
* [Rotate Auto-Generated Certificates](#certificate-rotation)

## Generating Certificate Signing Requests (CSRs) and Keys

If you want to create and sign the certificates by a real Certificate Authority (CA), you can use RKE to [generate a set of Certificate Signing Requests (CSRs) and keys]({{< baseurl >}}/rke/v0.1.x/en/installation/certs/#generating-certificate-signing-requests-csrs-and-keys).

You can use the CSRs and keys to sign the certificates by a real CA. After the certificates are signed, these custom certificates can be used by RKE to as [custom certificates]({{< baseurl >}}/rke/v0.1.x/en/installation/certs/) for the Kubernetes cluster.

## Certificate Rotation

By default, Kubernetes clusters require certificates and RKE will automatically generate certificates for the clusters. Rotating these certificates are important before the certificates expire as well as if a certificate is compromised.

After the certificates are rotated, the Kubernetes components are automatically restarted. Certificates can be rotated for the following services:

- etcd
- kubelet
- kube-apiserver
- kube-proxy
- kube-scheduler
- kube-controller-manager

RKE has the ability to rotate the auto-generated certificates with some simple commands:

* Rotating all service certificates while using the same CA
* Rotating a certificate on an individual service while using the same CA
* Rotating the CA and all service certificates

Whenever you're trying to rotate certificates, the `cluster.yml` that was used to deploy the Kubernetes cluster is required. You can reference a different location for this file by using the `--config` option when running `rke cert rotate`.

### Rotating all Service Certificates while using the same CA

To rotate the service certificates for all the Kubernetes services, run the following command, i.e. `rke cert rotate`. After all the service certificates are rotated, these services will automatically be restarted to start using the new certificate.

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

### Rotating a Certificate on an Individual Service while using the same CA

To rotate the certificate for an individual Kubernetes service, use the `--service` option when rotating certificates to specify the service. After the specified Kubernetes service has had its certificate rotated, it is automatically restarted to start using the new certificate.

Example of rotating the certificate for only the `kubelet`:

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

### Rotating the CA and all service certificates

If the CA certificate needs to be rotated, you are required to rotate all the services certificates as they need to be signed with the newly rotated CA certificate. To include rotating the CA with the service certificates, add the `--rotate-ca` option. After the the CA and all the service certificates are rotated, these services will automatically be restarted to start using the new certificate.

Rotating the CA certificate will result in restarting other system pods, that will also use the new CA certificate. This includes:

- Networking pods (canal, calico, flannel, and weave)
- Ingress Controller pods
- KubeDNS pods

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
