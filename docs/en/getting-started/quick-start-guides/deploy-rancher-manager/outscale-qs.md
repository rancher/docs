---
title: Rancher Outscale Quick Start Guide
description: Read this step by step Rancher Outscale guide to quickly deploy a Rancher server with a single-node downstream Kubernetes cluster attached.
weight: 140
---
The following steps will quickly deploy a Rancher server on Outscale in a single-node K3s Kubernetes cluster, with a single-node downstream Kubernetes cluster attached.

:::note

The intent of these guides is to quickly launch a sandbox that you can use to evaluate Rancher. These guides are not intended for production environments. For comprehensive setup instructions, see [Installation](../../../pages-for-subheaders/installation-and-upgrade.md).

:::

## Prerequisites

:::caution

Deploying to Outscale will incur charges.

:::

- [Outscale Account](https://en.outscale.com/): You will require an account on Outscale as this is where the server and cluster will run.
- [Outscale Access Key](https://docs.outscale.com/en/userguide/About-Access-Keys.html): Use these instructions to create an Outscale Access Key if you don't have one.
- [Terraform](https://www.terraform.io/downloads.html): Used to provision the server and cluster in Outscale.


## Getting Started

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

2. Go into the Outscale folder containing the terraform files by executing `cd quickstart/rancher/outscale`.

3. Rename the `terraform.tfvars.example` file to `terraform.tfvars`.

4. Edit `terraform.tfvars` and customize the following variables:
    - `access_key_id` - Outscale access key
    - `secret_key_id` - Outscale secret key
    - `rancher_server_admin_password` - Admin password for created Rancher server

5. **Optional:** Modify optional variables within `terraform.tfvars`.
See the [Quickstart Readme](https://github.com/rancher/quickstart) and the [Outscale Quickstart Readme](https://github.com/rancher/quickstart/tree/master/rancher/outscale) for more information.
Suggestions include:
    - `region` - Outscale region, choose the closest instead of the default (`eu-west-2`)
    - `prefix` - Prefix for all created resources
    - `instance_type` - Instance type, minimum required is `tinav3.c2r4p3`

6. Run `terraform init`.

7. To initiate the creation of the environment, run `terraform apply --auto-approve`. Then wait for output similar to the following:

    ```
    Apply complete! Resources: 21 added, 0 changed, 0 destroyed.

    Outputs:

    rancher_node_ip = xx.xx.xx.xx
    rancher_server_url = https://rancher.xx.xx.xx.xx.sslip.io
    workload_node_ip = yy.yy.yy.yy
    ```

8. Paste the `rancher_server_url` from the output above into the browser. Log in when prompted (default username is `admin`, use the password set in `rancher_server_admin_password`).
9. ssh to the Rancher Server using the `id_rsa` key generated in `quickstart/rancher/outscale`.

#### Result

Two Kubernetes clusters are deployed into your Outscale account, one running Rancher Server and the other ready for experimentation deployments. Please note that while this setup is a great way to explore Rancher functionality, a production setup should follow our high availability setup guidelines. SSH keys for the VMs are auto-generated and stored in the module directory.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments](../../../pages-for-subheaders/deploy-rancher-workloads.md).

## Destroying the Environment

1. From the `quickstart/rancher/outscale` folder, execute `terraform destroy --auto-approve`.

2. Wait for confirmation that all resources have been destroyed.
