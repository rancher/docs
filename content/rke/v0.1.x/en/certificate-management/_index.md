---
title: Certificate Management
weight: 150
aliases:
  - /rke/v0.1.x/en/installation/certificate-management/
---

## Certificate Rotation

As of v0.2.0, RKE can be used to rotate the cluster certificates. The certificate rotation is one of the subcommands of `./rke cert` command, and can be called with a several options:

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

### Certificate rotation for all components

Certificates can be rotated for the following kubernetes cluster components:

- etcd
- kubelet
- kube-apiserver
- kube-proxy
- kube-scheduler
- kube-controller-manager

To rotate the certificates for all the components listed above, run the following command:

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

The command will rotate all the certificates followed by the kubernetes components restart. This way they can start working with the new rotated certificates.


### Certificate rotation for specific component

To rotate certificates for an individual component, use `--service` option. The example below triggers cert rotation for a kubelet component: 

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

### Certificate rotation for CA

To rotate Kubernetes CA certificate, use `--rotate-ca` option.Note that rotating this certificate will trigger rotating all components' certificates as they need to be signed with the new rotated CA:
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

## Custom Certificates

By default RKE auto generates the certificates for all the cluster components. As of v0.2.0, RKE can be configured to use custom certificates. To use custom certificates, use the following option with any rke operation:

```
$ rke up --custom-certs
```
This option will make RKE use the certificates from a certificate directory `./cluster_certs`. To change the default certificate directly, pass `--cert-dir` flag to the command.

The following certificates must exist in the certificate directory:

|            Name            |                 Cert                |                   Key                   | Optional |
|:--------------------------:|:-----------------------------------:|:---------------------------------------:|:--------:|
|          Master CA         |             kube-ca.pem             |                    -                    |   false  |
|          Kube API          |          kube-apiserver.pem         |          kube-apiserver-key.pem         |   false  |
|   Kube Controller Manager  |     kube-controller-manager.pem     |     kube-controller-manager-key.pem     |   false  |
|       Kube Scheduler       |          kube-scheduler.pem         |          kube-scheduler-key.pem         |   false  |
|         Kube Proxy         |            kube-proxy.pem           |            kube-proxy-key.pem           |   false  |
|         Kube Admin         |            kube-admin.pem           |            kube-admin-key.pem           |   false  |
| Kube Api Request Header CA | kube-apiserver-requestheader-ca.pem | kube-apiserver-requestheader-ca-key.pem |   true   |
|   Apiserver Proxy Client   |   kube-apiserver-proxy-client.pem   |   kube-apiserver-proxy-client-key.pem   |   false  |
|         Etcd Nodes         |        kube-etcd-x-x-x-x.pem        |        kube-etcd-x-x-x-x-key.pem        |   false  |
|    Service Account Token   |                  -                  |    kube-service-account-token-key.pem   |   true   |

The next section of the doc goes over the process of custom certificates generation.


### CSR Generation

If you want to create and sign the certificates by a real Certificate Authority (CA), you can use rke to generate a set of Certificate Signing Requests (CSRs) and Keys. Here is an example on how to generate CSRs for one node cluster:

```
nodes:
  - address: x.x.x.x
    hostname_override: node-1
    user: ubuntu
    role: [controlplane,etcd,worker]
```

Run the following command:
```
$ rke cert generate-csr     
INFO[0000] Generating Kubernetes cluster CSR certificates
INFO[0000] [certificates] Generating Kubernetes API server csr
INFO[0000] [certificates] Generating Kube Controller csr
INFO[0000] [certificates] Generating Kube Scheduler csr
INFO[0000] [certificates] Generating Kube Proxy csr     
INFO[0001] [certificates] Generating Node csr and key   
INFO[0001] [certificates] Generating admin csr and kubeconfig
INFO[0001] [certificates] Generating Kubernetes API server proxy client csr
INFO[0001] [certificates] Generating etcd-x.x.x.x csr and key
INFO[0001] Successfully Deployed certificates at [./cluster_certs]
```
The CSRs and keys will be deployed in `./cluster_certs` directory by default. To use a different directory, pass `--cert-dir` option.

```
$ tree cluster_certs

cluster_certs
├── kube-admin-csr.pem
├── kube-admin-key.pem
├── kube-apiserver-csr.pem
├── kube-apiserver-key.pem
├── kube-apiserver-proxy-client-csr.pem
├── kube-apiserver-proxy-client-key.pem
├── kube-controller-manager-csr.pem
├── kube-controller-manager-key.pem
├── kube-etcd-x-x-x-x-csr.pem
├── kube-etcd-x-x-x-x-key.pem
├── kube-node-csr.pem
├── kube-node-key.pem
├── kube-proxy-csr.pem
├── kube-proxy-key.pem
├── kube-scheduler-csr.pem
└── kube-scheduler-key.pem

0 directories, 16 files

```

These CSR files will contain the right Alternative DNS and IP Names for the certificates. You can use them then to sign the certificates by a real CA, and then upload to the cluster_certs directory for rke use.
