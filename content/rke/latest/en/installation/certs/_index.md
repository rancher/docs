---
title: Custom Certificates
weight: 150
---

_Available as of v0.2.0_

By default, Kubernetes clusters require certificates and RKE auto-generates the certificates for all the Kubernetes services. RKE can also use custom certificates for these Kubernetes services.

When [deploying Kubernetes with RKE]({{< baseurl >}}/rke/latest/en/installation/#deploying-kubernetes-with-rke), there are two additional options that can be used with `rke up` so that RKE uses custom certificates.

| Option | Description |
| --- | --- |
| `--custom-certs` | Use custom certificates from a cert dir. The default directory is `/cluster_certs`. |
| `--cert-dir` value |  Specify a certificate dir path |

## Using Custom Certificates

```
# Use certificates located in the default directory `/cluster_certs`
$ rke up --custom-certs

# Use certificates located in your own directory
$ rke up --custom-certs --cert-dir ~/my/own/certs
```

If you want add an extra SAN (Subject Alternative Name) to the Kube API Server, add to `cluster.yml`:

```
authentication:
    strategy: x509
    sans:
      - "10.18.160.10"
      - "my-custom-hostname.domain.com"
```

See [authentication]({{< baseurl >}}/rke/latest/en/config-options/authentication/) for more details.

## Certificates

The following certificates must exist in the certificate directory.

| Name |  Certificate | Key |
|---|---|---|
|          Master CA         |             kube-ca.pem             |                    -                    |
|          Kube API          |          kube-apiserver.pem         |          kube-apiserver-key.pem         |
|   Kube Controller Manager  |     kube-controller-manager.pem     |     kube-controller-manager-key.pem     |
|       Kube Scheduler       |          kube-scheduler.pem         |          kube-scheduler-key.pem         |
|         Kube Proxy         |            kube-proxy.pem           |            kube-proxy-key.pem           |
|         Kube Admin         |            kube-admin.pem           |            kube-admin-key.pem           |
|   Apiserver Proxy Client   |   kube-apiserver-proxy-client.pem   |   kube-apiserver-proxy-client-key.pem   |
|         Etcd Nodes         |        kube-etcd-x-x-x-x.pem        |        kube-etcd-x-x-x-x-key.pem        |
| Kube Api Request Header CA | kube-apiserver-requestheader-ca.pem | kube-apiserver-requestheader-ca-key.pem |
|    Service Account Token   |                  -                  |    kube-service-account-token-key.pem   |

## Generating Certificate Signing Requests (CSRs) and Keys

If you want to create and sign the certificates by a real Certificate Authority (CA), you can use RKE to generate a set of Certificate Signing Requests (CSRs) and keys. Using the `rke cert generate-csr` command, you can generate the CSRs and keys.

1. Set up your `cluster.yml` with the [node information]({{< baseurl >}}/rke/latest/en/config-options/nodes/).

2. Run `rke cert generate-csr` to generate certificates for the node(s) in the `cluster.yml`. By default, the CSRs and keys will be saved in `./cluster_certs`. To have them saved in a different directory, use `--cert-dir` to define what directory to have them saved in.

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

3. In addition to the CSRs, you also need to generate the kube-service-account-token-key.pem key. To do this, run the following:
    ```
    $ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./cluster_certs/kube-service-account-token-key.pem -out ./cluster_certs/kube-service-account-token.pem
    ```

**Result:** The CSRs and keys will be deployed in `./cluster_certs` directory, assuming you didn't specify a `--cert-dir`. The CSR files will contain the right Alternative DNS and IP Names for the certificates. You can use them to sign the certificates by a real CA. After the certificates are signed, those certificates can be used by RKE as custom certificates.

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
├── kube-service-account-token-key.pem
├── kube-service-account-token.pem
└── kube-scheduler-key.pem

0 directories, 18 files

```
