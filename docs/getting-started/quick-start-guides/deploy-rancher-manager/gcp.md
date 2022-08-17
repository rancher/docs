---
title: Rancher GCP Quick Start Guide
description: Read this step by step Rancher GCP guide to quickly deploy a Rancher server with a single-node downstream Kubernetes cluster attached.
weight: 130
---
The following steps will quickly deploy a Rancher server on GCP in a single-node K3s Kubernetes cluster, with a single-node downstream Kubernetes cluster attached.

:::caution

The intent of these guides is to quickly launch a sandbox that you can use to evaluate Rancher. These guides are not intended for production environments. For comprehensive setup instructions, see [Installation](../../../pages-for-subheaders/installation-and-upgrade.md).

:::

## Prerequisites

:::caution

Deploying to Google GCP will incur charges.

:::

- [Google GCP Account](https://console.cloud.google.com/): A Google GCP Account is required to create resources for deploying Rancher and Kubernetes.
- [Google GCP Project](https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project): Use this link to follow a tutorial to create a GCP Project if you don't have one yet.
- [Google GCP Service Account](https://cloud.google.com/iam/docs/creating-managing-service-account-keys): Use this link and follow instructions to create a GCP service account and token file.
- [Terraform](https://www.terraform.io/downloads.html): Used to provision the server and cluster in Google GCP.


## Getting Started

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

2. Go into the GCP folder containing the terraform files by executing `cd quickstart/rancher/gcp`.

3. Rename the `terraform.tfvars.example` file to `terraform.tfvars`.

4. Edit `terraform.tfvars` and customize the following variables:
    - `gcp_account_json` - GCP service account file path and file name
    - `rancher_server_admin_password` - Admin password for created Rancher server

5. **Optional:** Modify optional variables within `terraform.tfvars`.
See the [Quickstart Readme](https://github.com/rancher/quickstart) and the [GCP Quickstart Readme](https://github.com/rancher/quickstart/tree/master/rancher/gcp) for more information.
Suggestions include:
    - `gcp_region` - Google GCP region, choose the closest instead of the default (`us-east4`)
    - `gcp_zone` - Google GCP zone, choose the closest instead of the default (`us-east4-a`)
    - `prefix` - Prefix for all created resources
    - `machine_type` - Compute instance size used, minimum is `n1-standard-1` but `n1-standard-2` or `n1-standard-4` could be used if within budget

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
9. ssh to the Rancher Server using the `id_rsa` key generated in `quickstart/rancher/gcp`.

#### Result

Two Kubernetes clusters are deployed into your GCP account, one running Rancher Server and the other ready for experimentation deployments. Please note that while this setup is a great way to explore Rancher functionality, a production setup should follow our high availability setup guidelines. SSH keys for the VMs are auto-generated and stored in the module directory.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments](../../../pages-for-subheaders/deploy-rancher-workloads.md).

## Destroying the Environment

1. From the `quickstart/rancher/gcp` folder, execute `terraform destroy --auto-approve`.

2. Wait for confirmation that all resources have been destroyed.
