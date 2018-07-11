---
title: Digital Ocean Quick Start
weight: 100
---
The following steps will allow you to quickly deploy a Rancher Server with a 3-node cluster attached.

>**Note**
>Deploying to Digital Ocean will incur charges.

## Prerequisites

- [Digital Ocean Account](https://www.digitalocean.com) - You will require an account on Digital Ocean as this is where the server and cluster will run.
- [Digital Ocean Access Key](https://www.digitalocean.com/community/tutorials/how-to-create-a-digitalocean-space-and-api-key) - Use this link to create a Digital Ocean Access Key if you don't have one.
- [Terraform](https://www.terraform.io/downloads.html) - Used to provision the server and cluster to Digital Ocean.


## Getting Going

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

2. Go into the folder containing the terraform file by executing `cd quickstart/do`.

3. Rename file `terraform.tfvars.example` to `terraform.tfvars`.

4. Edit `terraform.tfvars` to include your Digital Ocean Access Key.

5. For the first time run you will need to run `terraform init`.

6. To initiate the creation of the environment run `terraform apply`.

    >**Wait for the the following**
	> ```
	Apply complete! Resources: 4 added, 0 changed, 0 destroyed. 
	  Outputs: 
	  rancher-url = [ 
              https://xxx.xxx.xxx.xxx 
      ]
	```

6. Paste the URL into the browser and log in (default password is `admin`).

## Destroying the Environment

1. From the `quickstart/do` folder execute `terraform destroy --force` .

2. Wait for confirmation that all resources have been destroyed.