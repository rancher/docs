---
title: Rancher Hetzner Cloud Quick Start Guide
description: Read this step by step Rancher Hetzner Cloud guide to quickly deploy a Rancher server with a single-node downstream Kubernetes cluster attached.
weight: 140
---
The following steps will quickly deploy a Rancher server on Hetzner Cloud in a single-node K3s Kubernetes cluster, with a single-node downstream Kubernetes cluster attached.

>**Note:** The intent of these guides is to quickly launch a sandbox that you can use to evaluate Rancher. These guides are not intended for production environments. For comprehensive setup instructions, see [Installation]({{<baseurl>}}/rancher/v2.6/en/installation/).

## Prerequisites

>**Note**
>Deploying to Hetzner Cloud will incur charges.

- [Hetzner Cloud Account](https://www.hetzner.com): You will require an account on Hetzner as this is where the server and cluster will run.
- [Hetzner API Access Key](https://docs.hetzner.cloud/#getting-started): Use these instructions to create a Hetzner Cloud API Key if you don't have one.
- [Terraform](https://www.terraform.io/downloads.html): Used to provision the server and cluster to Hetzner.


## Getting Started

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

2. Go into the Hetzner folder containing the terraform files by executing `cd quickstart/hcloud`.

3. Rename the `terraform.tfvars.example` file to `terraform.tfvars`.

4. Edit `terraform.tfvars` and customize the following variables:
    - `hcloud_token` - Hetzner API access key
    - `rancher_server_admin_password` - Admin password for created Rancher server

5. **Optional:** Modify optional variables within `terraform.tfvars`.
See the [Quickstart Readme](https://github.com/rancher/quickstart) and the [Hetzner Quickstart Readme](https://github.com/rancher/quickstart/tree/master/hcloud) for more information.
Suggestions include:
    - `prefix` - Prefix for all created resources
    - `instance_type` - Instance type, minimum required is `cx21`
    - `hcloud_location` - Hetzner Cloud location, choose the closest instead of the default (`fsn1`)

6. Run `terraform init`.

7. To initiate the creation of the environment, run `terraform apply --auto-approve`. Then wait for output similar to the following:

    ```
    Apply complete! Resources: 15 added, 0 changed, 0 destroyed.

    Outputs:

    rancher_node_ip = xx.xx.xx.xx
    rancher_server_url = https://rancher.xx.xx.xx.xx.sslip.io
    workload_node_ip = yy.yy.yy.yy
    ```

8. Paste the `rancher_server_url` from the output above into the browser. Log in when prompted (default username is `admin`, use the password set in `rancher_server_admin_password`).
9. ssh to the Rancher Server using the `id_rsa` key generated in `quickstart/hcloud`.

#### Result

Two Kubernetes clusters are deployed into your Hetzner account, one running Rancher Server and the other ready for experimentation deployments. Please note that while this setup is a great way to explore Rancher functionality, a production setup should follow our high availability setup guidelines. SSH keys for the VMs are auto-generated and stored in the module directory.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments]({{<baseurl>}}/rancher/v2.6/en/quick-start-guide/workload).

## Destroying the Environment

1. From the `quickstart/hcloud` folder, execute `terraform destroy --auto-approve`.

2. Wait for confirmation that all resources have been destroyed.
