---
title: Rancher DigitalOcean Quick Start Guide
description: Read this step by step Rancher DigitalOcean guide to quickly deploy a Rancher Server with a single node cluster attached.
weight: 100
---
The following steps will quickly deploy a Rancher Server on DigitalOcean with a single node cluster attached.

## Prerequisites

>**Note**
>Deploying to DigitalOcean will incur charges.

- [DigitalOcean Account](https://www.digitalocean.com): You will require an account on DigitalOcean as this is where the server and cluster will run.
- [DigitalOcean Access Key](https://www.digitalocean.com/community/tutorials/how-to-create-a-digitalocean-space-and-api-key): Use this link to create a DigitalOcean Access Key if you don't have one.
- [Terraform](https://www.terraform.io/downloads.html): Used to provision the server and cluster to DigitalOcean.


## Getting Started

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

1. Go into the DigitalOcean folder containing the terraform files by executing `cd quickstart/do`.

1. Rename the `terraform.tfvars.example` file to `terraform.tfvars`.

1. Edit `terraform.tfvars` and customize the following variables:
    - `do_token` - DigitalOcean access key
    - `rancher_server_admin_password` - Admin password for created Rancher server

1. **Optional:** Modify optional variables within `terraform.tfvars`.
See the [Quickstart Readme](https://github.com/rancher/quickstart) and the [DO Quickstart Readme](https://github.com/rancher/quickstart/tree/master/do) for more information.
Suggestions include:
    - `do_region` - DigitalOcean region, choose the closest instead of the default
    - `prefix` - Prefix for all created resources
    - `droplet_size` - Droplet size used, minimum is `s-2vcpu-4gb` but `s-4vcpu-8gb` could be used if within budget
    - `ssh_key_file_name` - Use a specific SSH key instead of `~/.ssh/id_rsa` (public key is assumed to be `${ssh_key_file_name}.pub`)

1. Run `terraform init`.

1. To initiate the creation of the environment, run `terraform apply --auto-approve`. Then wait for output similar to the following:

    ```
    Apply complete! Resources: 15 added, 0 changed, 0 destroyed.

    Outputs:

    rancher_node_ip = xx.xx.xx.xx
    rancher_server_url = https://rancher.xx.xx.xx.xx.xip.io
    workload_node_ip = yy.yy.yy.yy
    ```

1. Paste the `rancher_server_url` from the output above into the browser. Log in when prompted (default username is `admin`, use the password set in `rancher_server_admin_password`).

#### Result

Two Kubernetes clusters are deployed into your DigitalOcean account, one running Rancher Server and the other ready for experimentation deployments.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments]({{<baseurl>}}/rancher/v2.5/en/quick-start-guide/workload).

## Destroying the Environment

1. From the `quickstart/do` folder, execute `terraform destroy --auto-approve`.

2. Wait for confirmation that all resources have been destroyed.
