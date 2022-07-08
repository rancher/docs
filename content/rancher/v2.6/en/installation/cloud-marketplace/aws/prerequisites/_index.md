---
title: Prerequisites
weight: 1
---

### 1. Setting Up License Manager and Purchasing Support

First, complete the [first step](https://docs.aws.amazon.com/license-manager/latest/userguide/getting-started.html) of the license manager one-time setup.
Next, go to the AWS Marketplace. Locate the "Rancher Premium Support Billing Container Starter Pack". Purchase at least one entitlement.

If you have installed Rancher using the "Rancher Setup" AWS Marketplace offering, skip to [Step 4](#create-an-oidc-provider).

> **Note:** Each entitlement grants access to support for a certain amount of nodes. You can purchase more licenses as necessary later on.

### 2. Create an EKS Cluster
Follow the [Rancher docs]({{<baseurl>}}/rancher/v2.6/en/installation/resources/k8s-tutorials/amazon-eks/) to create an EKS cluster. When you get to the [final step to install Rancher]({{<baseurl>}}/rancher/v2.6/en/installation/resources/k8s-tutorials/amazon-eks/#8-install-the-rancher-helm-chart), **stop and return to this page**. This cluster will need to meet the following requirements:

- EKS version 1.22.
- Each node in the cluster has access to the registry containing Rancher and its related images.
- Each node in the cluster has access to the ECR repo storing the CSP Adapter.
- Each node in the cluster has access to the license manager service.
- Each node in the cluster has access to global endpoints for the STS service.

### 3. Install Rancher

In addition to the options specified to install Rancher in the [Rancher docs]({{<baseurl>}}/rancher/v2.6/en/installation/resources/k8s-tutorials/amazon-eks/#8-install-the-rancher-helm-chart), you will also need to enable extra metrics. 
This can be done through the Helm CLI through the following options: 

```bash 
--set extraEnv\[0\].name="CATTLE_PROMETHEUS_METRICS" --set-string extraEnv\[0\].value=true
``` 

You can also use a values.yaml like the below:

```yaml
extraEnv:
  - name: "CATTLE_PROMETHEUS_METRICS"
    value: "true"
```

You will also need to install Rancher version 2.6.7 or higher.

### 4. Create an OIDC Provider 

Follow the [AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html) to create an OIDC provider for the cluster specified in the previous section.

### 5. Create an IAM Role

An IAM role is required for the CSP adapter to check-in/check-out entitlements. 

First, configure the trust policy as below. Replace `MY_AWS_ACC` with your AWS account number, `MY_AWS_REGION` with your AWS region, and `MY_OIDC_PROVIDER` with the id of your OIDC provider:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::${MY_AWS_ACC}:oidc-provider/oidc.eks.${MY_AWS_REGION}.amazonaws.com/id/${MY_OIDC_PROVIDER}"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "oidc.eks.${MY_AWS_REGION}.amazonaws.com/id/${MY_OIDC_PROVIDER}:sub": "system:serviceaccount:cattle-csp-adapter-system:rancher-csp-adapter",
                    "oidc.eks.${MY_AWS_REGION}.amazonaws.com/id/${MY_OIDC_PROVIDER}:aud": "sts.amazonaws.com"
                }
            }
        }
    ]
}
```

Next, use a policy for the role which has the following permissions: 

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "RancherCSPAdapterPermissions",
            "Effect": "Allow",
            "Action": [
                "license-manager:ListReceivedLicenses",
                "license-manager:CheckoutLicense",
                "license-manager:ExtendLicenseConsumption",
                "license-manager:CheckInLicense",
                "license-manager:GetLicense",
                "license-manager:GetLicenseUsage"
            ],
            "Resource": "*"
        }
    ]
}
```

Save the name of the role. You will need it later on when installing the CSP adapter.
