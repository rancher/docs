---
title: Rancher AWS Quick Start Guide
description: Read this step by step Rancher AWS guide to quickly deploy a Rancher Server with a single node cluster attached.
weight: 100
---
The following steps will quickly deploy a Rancher Server on AWS with a single node cluster attached.

## Prerequisites

>**Note**
>Deploying to Amazon AWS will incur charges.

- [Amazon AWS Account](https://aws.amazon.com/account/): An Amazon AWS Account is required to create resources for deploying Rancher and Kubernetes.
- [Amazon AWS Access Key](https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html): Use this link to follow a tutorial to create an Amazon AWS Access Key if you don't have one yet.
- Install [Terraform](https://www.terraform.io/downloads.html): Used to provision the server and cluster in Amazon AWS.


## Getting Started

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

1. Go into the AWS folder containing the terraform files by executing `cd quickstart/aws`.

1. Rename the `terraform.tfvars.example` file to `terraform.tfvars`.

1. Edit `terraform.tfvars` and customize the following variables:
    - `aws_access_key` - Amazon AWS Access Key 
    - `aws_secret_key` - Amazon AWS Secret Key
    - `rancher_server_admin_password` - Admin password for created Rancher server

1. **Optional:** Modify optional variables within `terraform.tfvars`.
See the [Quickstart Readme](https://github.com/rancher/quickstart) and the [AWS Quickstart Readme](https://github.com/rancher/quickstart/tree/master/aws) for more information.
Suggestions include:
    - `aws_region` - Amazon AWS region, choose the closest instead of the default
    - `prefix` - Prefix for all created resources
    - `instance_type` - EC2 instance size used, minimum is `t3a.medium` but `t3a.large` or `t3a.xlarge` could be used if within budget

1. Run `terraform init`.

1. To initiate the creation of the environment, run `terraform apply --auto-approve`. Then wait for output similar to the following:

    ```
    Apply complete! Resources: 16 added, 0 changed, 0 destroyed.

    Outputs:

    rancher_node_ip = xx.xx.xx.xx
    rancher_server_url = https://rancher.xx.xx.xx.xx.xip.io
    workload_node_ip = yy.yy.yy.yy
    ```

1. Paste the `rancher_server_url` from the output above into the browser. Log in when prompted (default username is `admin`, use the password set in `rancher_server_admin_password`).

#### Result

Two Kubernetes clusters are deployed into your AWS account, one running Rancher Server and the other ready for experimentation deployments. Please note that while this setup is a great way to explore Rancher functionality, a production setup should follow our high availability setup guidelines.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments]({{<baseurl>}}/rancher/v2.0-v2.4/en/quick-start-guide/workload).

## Destroying the Environment

1. From the `quickstart/aws` folder, execute `terraform destroy --auto-approve`.

2. Wait for confirmation that all resources have been destroyed.
