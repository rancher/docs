---
title: DigitalOcean Quick Start
weight: 100
---
The following steps will quickly deploy a Rancher Server with a single node cluster attached.

## Prerequisites

>**Note**
>Deploying to DigitalOcean will incur charges.

- [DigitalOcean Account](https://www.digitalocean.com): You will require an account on DigitalOcean as this is where the server and cluster will run.
- [DigitalOcean Access Key](https://www.digitalocean.com/community/tutorials/how-to-create-a-digitalocean-space-and-api-key): Use this link to create a DigitalOcean Access Key if you don't have one.
- [Terraform](https://www.terraform.io/downloads.html): Used to provision the server and cluster to DigitalOcean.


## Getting Started

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

2. Go into the DigitalOcean folder containing the terraform file by executing `cd quickstart/do`.

3. Rename the `terraform.tfvars.example` file to `terraform.tfvars`.

4. Edit `terraform.tfvars` to include your DigitalOcean Access Key.

5. **Optional:** Edit `terraform.tfvars` to:

    - Change the number of nodes. (`count_agent_all_nodes`)
    - Change the password of the `admin` user for logging into Rancher. (`admin_password`)

6. Run `terraform init`.

7. To initiate the creation of the environment, run `terraform apply`. Then wait for the the following output:

	```
	Apply complete! Resources: 2 added, 0 changed, 0 destroyed. 
	  Outputs: 
	  rancher-url = [ 
              https://xxx.xxx.xxx.xxx 
      ]
	```

8. Paste the `rancher-url` from the output above into the browser. Log in when prompted (default password is `admin`).

**Result:** Rancher Server and your Kubernetes cluster is installed on DigitalOcean.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments]({{< baseurl >}}/rancher/v2.x/en/quick-start-guide/workload).

## Destroying the Environment

1. From the `quickstart/do` folder, execute `terraform destroy --force`.

2. Wait for confirmation that all resources have been destroyed.
