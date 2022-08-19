---
title: Rancher AWS Quick Start Guide
description: Read this step by step Rancher AWS guide to quickly deploy a Rancher server with a single-node downstream Kubernetes cluster attached.
weight: 100
---
The following steps will quickly deploy a Rancher server on AWS in a single-node K3s Kubernetes cluster, with a single-node downstream Kubernetes cluster attached.

>**Note:** The intent of these guides is to quickly launch a sandbox that you can use to evaluate Rancher. These guides are not intended for production environments. For comprehensive setup instructions, see [Installation](../../../pages-for-subheaders/installation-and-upgrade.md).

## Prerequisites

>**Note**
>Deploying to Amazon AWS will incur charges.

- [Amazon AWS Account](https://aws.amazon.com/account/): An Amazon AWS Account is required to create resources for deploying Rancher and Kubernetes.
- [Amazon AWS Access Key](https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html): Use this link to follow a tutorial to create an Amazon AWS Access Key if you don't have one yet.
- [IAM Policy created](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html#access_policies_create-start): Defines the permissions an account attached with this policy has.
- Install [Terraform](https://www.terraform.io/downloads.html): Used to provision the server and cluster in Amazon AWS.

### Example IAM Policy

The AWS module just creates an EC2 KeyPair, an EC2 SecurityGroup and an EC2 instance. A simple policy would be:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "ec2:*",
            "Resource": "*"
        }
    ]
}
```

## Getting Started

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

2. Go into the AWS folder containing the terraform files by executing `cd quickstart/aws`.

3. Rename the `terraform.tfvars.example` file to `terraform.tfvars`.

4. Edit `terraform.tfvars` and customize the following variables:
    - `aws_access_key` - Amazon AWS Access Key
    - `aws_secret_key` - Amazon AWS Secret Key
    - `rancher_server_admin_password` - Admin password for created Rancher server

5. **Optional:** Modify optional variables within `terraform.tfvars`.
See the [Quickstart Readme](https://github.com/rancher/quickstart) and the [AWS Quickstart Readme](https://github.com/rancher/quickstart/tree/master/aws) for more information.
Suggestions include:
    - `aws_region` - Amazon AWS region, choose the closest instead of the default (`us-east-1`)
    - `prefix` - Prefix for all created resources
    - `instance_type` - EC2 instance size used, minimum is `t3a.medium` but `t3a.large` or `t3a.xlarge` could be used if within budget
    - `add_windows_node` - If true, an additional Windows worker node is added to the workload cluster

6. Run `terraform init`.

7. To initiate the creation of the environment, run `terraform apply --auto-approve`. Then wait for output similar to the following:

    ```
    Apply complete! Resources: 16 added, 0 changed, 0 destroyed.

    Outputs:

    rancher_node_ip = xx.xx.xx.xx
    rancher_server_url = https://rancher.xx.xx.xx.xx.sslip.io
    workload_node_ip = yy.yy.yy.yy
    ```

8. Paste the `rancher_server_url` from the output above into the browser. Log in when prompted (default username is `admin`, use the password set in `rancher_server_admin_password`).
9. ssh to the Rancher server using the `id_rsa` key generated in `quickstart/aws`.

#### Result

Two Kubernetes clusters are deployed into your AWS account, one running Rancher Server and the other ready for experimentation deployments. Please note that while this setup is a great way to explore Rancher functionality, a production setup should follow our high availability setup guidelines. SSH keys for the VMs are auto-generated and stored in the module directory.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments](../../../pages-for-subheaders/deploy-rancher-workloads.md).

## Destroying the Environment

1. From the `quickstart/aws` folder, execute `terraform destroy --auto-approve`.

2. Wait for confirmation that all resources have been destroyed.
