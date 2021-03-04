---
title: Rancher GCP Quick Start Guide
description: Read this step by step Rancher GCP guide to quickly deploy a Rancher Server with a single node cluster attached.
weight: 100
---
The following steps will quickly deploy a Rancher server on GCP in a single-node RKE Kubernetes cluster, with a single-node downstream Kubernetes cluster attached.

## Prerequisites

>**Note**
>Deploying to Google GCP will incur charges.

- [Google GCP Account](https://console.cloud.google.com/): A Google GCP Account is required to create resources for deploying Rancher and Kubernetes.
- [Google GCP Project](https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project): Use this link to follow a tutorial to create a GCP Project if you don't have one yet.
- [Google GCP Service Account](https://cloud.google.com/iam/docs/creating-managing-service-account-keys): Use this link and follow instructions to create a GCP service account and token file.
- [Terraform](https://www.terraform.io/downloads.html): Used to provision the server and cluster in Google GCP.


## Getting Started

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

1. Go into the GCP folder containing the terraform files by executing `cd quickstart/gcp`.

1. Rename the `terraform.tfvars.example` file to `terraform.tfvars`.

1. Edit `terraform.tfvars` and customize the following variables:
    - `gcp_account_json` - GCP service account file path and file name 
    - `rancher_server_admin_password` - Admin password for created Rancher server

1. **Optional:** Modify optional variables within `terraform.tfvars`.
See the [Quickstart Readme](https://github.com/rancher/quickstart) and the [GCP Quickstart Readme](https://github.com/rancher/quickstart/tree/master/gcp) for more information.
Suggestions include:
    - `gcp_region` - Google GCP region, choose the closest instead of the default
    - `prefix` - Prefix for all created resources
    - `machine_type` - Compute instance size used, minimum is `n1-standard-1` but `n1-standard-2` or `n1-standard-4` could be used if within budget
    - `ssh_key_file_name` - Use a specific SSH key instead of `~/.ssh/id_rsa` (public key is assumed to be `${ssh_key_file_name}.pub`)

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

Two Kubernetes clusters are deployed into your GCP account, one running Rancher Server and the other ready for experimentation deployments.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments]({{< baseurl >}}/rancher/v2.5/en/quick-start-guide/workload).

## Destroying the Environment

1. From the `quickstart/gcp` folder, execute `terraform destroy --auto-approve`.

2. Wait for confirmation that all resources have been destroyed.
