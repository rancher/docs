---
title: Rancher Azure Quick Start Guide
description: Read this step by step Rancher Azure guide to quickly deploy a Rancher server with a single-node downstream Kubernetes cluster attached.
weight: 115
---

The following steps will quickly deploy a Rancher server on Azure in a single-node K3s Kubernetes cluster, with a single-node downstream Kubernetes cluster attached.

:::caution

The intent of these guides is to quickly launch a sandbox that you can use to evaluate Rancher. These guides are not intended for production environments. For comprehensive setup instructions, see [Installation](../../../pages-for-subheaders/installation-and-upgrade.md).

:::

## Prerequisites

:::caution

Deploying to Microsoft Azure will incur charges.

:::

- [Microsoft Azure Account](https://azure.microsoft.com/en-us/free/): A Microsoft Azure Account is required to create resources for deploying Rancher and Kubernetes.
- [Microsoft Azure Subscription](https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/create-subscription#create-a-subscription-in-the-azure-portal): Use this link to follow a tutorial to create a Microsoft Azure subscription if you don't have one yet.
- [Micsoroft Azure Tenant](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-create-new-tenant): Use this link and follow instructions to create a Microsoft Azure tenant.
- [Microsoft Azure Client ID/Secret](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal): Use this link and follow instructions to create a Microsoft Azure client and secret.
- [Terraform](https://www.terraform.io/downloads.html): Used to provision the server and cluster in Microsoft Azure.


## Getting Started

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

2. Go into the Azure folder containing the terraform files by executing `cd quickstart/rancher/azure`.

3. Rename the `terraform.tfvars.example` file to `terraform.tfvars`.

4. Edit `terraform.tfvars` and customize the following variables:
    - `azure_subscription_id` - Microsoft Azure Subscription ID
    - `azure_client_id` - Microsoft Azure Client ID
    - `azure_client_secret` - Microsoft Azure Client Secret
    - `azure_tenant_id` - Microsoft Azure Tenant ID
    - `rancher_server_admin_password` - Admin password for created Rancher server

5. **Optional:** Modify optional variables within `terraform.tfvars`.
See the [Quickstart Readme](https://github.com/rancher/quickstart) and the [Azure Quickstart Readme](https://github.com/rancher/quickstart/tree/master/rancher/azure) for more information.
Suggestions include:
    - `azure_location` - Microsoft Azure region, choose the closest instead of the default (`East US`)
    - `prefix` - Prefix for all created resources
    - `instance_type` - Compute instance size used, minimum is `Standard_DS2_v2` but `Standard_DS2_v3` or `Standard_DS3_v2` could be used if within budget
    - `add_windows_node` - If true, an additional Windows worker node is added to the workload cluster
    - `windows_admin_password` - The admin password of the windows worker node

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
9. ssh to the Rancher Server using the `id_rsa` key generated in `quickstart/rancher/azure`.

#### Result

Two Kubernetes clusters are deployed into your Azure account, one running Rancher Server and the other ready for experimentation deployments. Please note that while this setup is a great way to explore Rancher functionality, a production setup should follow our high availability setup guidelines. SSH keys for the VMs are auto-generated and stored in the module directory.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments](../../../pages-for-subheaders/deploy-rancher-workloads.md).

## Destroying the Environment

1. From the `quickstart/rancher/azure` folder, execute `terraform destroy --auto-approve`.

2. Wait for confirmation that all resources have been destroyed.
