---
title: Kubernetes Security Best Practices
weight: 5
---

### Restricting cloud metadata API access

Cloud providers such as AWS, Azure, DigitalOcean or GCP often expose metadata services locally to instances. By default, this endpoint is accessible by pods running on a cloud instance, including pods in hosted Kubernetes providers such as EKS, AKS, DigitalOcean Kubernetes or GKE, and can contain cloud credentials for that node, provisioning data such as kubelet credentials, or other sensitive data. To mitigate this risk when running on a cloud platform, follow the [Kubernetes security recommendations](https://kubernetes.io/docs/tasks/administer-cluster/securing-a-cluster/#restricting-cloud-metadata-api-access): limit permissions given to instance credentials, use network policies to restrict pod access to the metadata API, and avoid using provisioning data to deliver secrets.

Below is an example of a network policy for Kubernetes to restrict access to cloud metadata API, but allowing access to everything else `0.0.0.0/0`.

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all-egress-except-metadata-api
spec:
  podSelector: {}
  policyTypes:
  - Egress
  egress:
  - to:
    - ipBlock:
        cidr: 0.0.0.0/0
        except:
        - 169.254.169.254/32
```

A similar global network policy (`GlobalNetworkPolicy`) can be created using Calico.

```
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: allow-all-egress-except-metadata-api
spec:
  selector: all()
  egress:
  - action: Deny
    protocol: TCP
    destination:
      nets:
      - 169.254.169.254/32
  - action: Allow
    destination:
      nets:
      - 0.0.0.0/0
```

Identical policies can be created with Canal and Weave. For the list of approved CNI (Container Network Interface) providers in Rancher, please consult this [list]({{<baseurl>}}/rancher/v2.6/en/faq/networking/cni-providers).

The provided policies are just examples and must be tailored to your security needs and environment, since they may conflict with other network policies in place in your cluster.

Removing unnecessary packages and using reduced base images is also a good defense in depth strategy to reduce the attack surface against possible abuses of the cloud metadata API. As well as following the principle of least privilege and using instances profiles and roles with the least amount of required permissions for the services to fully function.

It is advised to consult your cloud provider's security best practices for further recommendations and specific details on how to restrict access to cloud instance metadata API.

Further references: MITRE ATT&CK knowledge base on - [Unsecured Credentials: Cloud Instance Metadata API](https://attack.mitre.org/techniques/T1552/005/).
