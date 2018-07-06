---
title: Digital Ocean Quick Start
weight: 100
---
The following steps will allow you to quickly deploy a Rancher Server with a 3 node cluster attached in about 5 minutes

>**Note**
>Using this will incur charges at Digital Ocean

## Prerequisites

- [Digital Ocean Account](https://www.digitalocean.com) - You will require an account on Digital Ocean as this is where the server and cluster will run
- [Terraform](https://www.terraform.io/downloads.html) - This is used to provision the server and cluster to Digital Ocean


## Getting going

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`

2. Go into the folder containing the terraform file by executing `cd quickstart/do`

3. Move the file `terraform.tfvars.example` to `terraform.tfvars` and edit (see inline explanation, the minimum you will need to do is add your Digital Ocean Access Key)

4. For the first time run you will need to run `terraform init`

5. To initiate the creation of the environment run `terraform apply`

    >**Wait for the the following**
	> ```
	Apply complete! Resources: 4 added, 0 changed, 0 destroyed. 
	  Outputs: 
	  rancher-url = [ 
              https://xxx.xxx.xxx.xxx 
      ]
	```

6. Paste the URL into the browser and log in (default password is `admin`)

## Destroying the environment

1. From the `quickstart/do` folder execute `terraform destroy --force` 

2. Wait for it to confirm that all resources have been destroyed