---
title: Kubernetes Security Best Practices
weight: 5
---

### Restricting cloud metadata API access

Cloud providers such as AWS, Azure, DigitalOcean or GCP often expose metadata services locally to instances. By default, this endpoint is accessible by pods running on a cloud instance, including pods in hosted Kubernetes providers such as EKS, AKS, DigitalOcean Kubernetes or GKE, and can contain cloud credentials for that node, provisioning data such as kubelet credentials, or other sensitive data. To mitigate this risk when running on a cloud platform, follow the [Kubernetes security recommendations](https://kubernetes.io/docs/tasks/administer-cluster/securing-a-cluster/#restricting-cloud-metadata-api-access): limit permissions given to instance credentials, use network policies to restrict pod access to the metadata API, and avoid using provisioning data to deliver secrets.

It is advised to consult your cloud provider's security best practices for further recommendations and specific details on how to restrict access to cloud instance metadata API.

Further references: MITRE ATT&CK knowledge base on - [Unsecured Credentials: Cloud Instance Metadata API](https://attack.mitre.org/techniques/T1552/005/).
