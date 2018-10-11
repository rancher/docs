---
title: Amazon AWS Quick Start
weight: 100
---
The following steps will quickly deploy a Rancher Server with a single node cluster attached.

## Prerequisites

>**Note**
>Deploying to Amazon AWS will incur charges.

- [Amazon AWS Account](https://aws.amazon.com/account/): An Amazon AWS Account is required to create resources for deploying Rancher and Kubernetes.
- [Amazon AWS Access Key](https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html): Use this link to follow a tutorial to create an Amazon AWS Access Key if you don't have one yet.
- [Amazon AWS Key Pair](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair) Use this link and follow instructions to create a Key Pair.
- [Terraform](https://www.terraform.io/downloads.html): Used to provision the server and cluster in Amazon AWS.


## Getting Started

1. Clone [Rancher Quickstart](https://github.com/rancher/quickstart) to a folder using `git clone https://github.com/rancher/quickstart`.

2. Go into the AWS folder containing the terraform file by executing `cd quickstart/aws`.

3. Rename the `terraform.tfvars.example` file to `terraform.tfvars`.

4. Edit `terraform.tfvars` and customize the following variables at minimum. To change node counts and sizes, see `node sizes`.

  - `aws_access_key` - Amazon AWS Access Key 
  - `aws_secret_key` - Amazon AWS Secret Key
  - `ssh_key_name` - Amazon AWS Key Pair Name
  - `prefix` - Resource Prefix
  
5. **Optional:** Modify the count of the various node types within `terraform.tfvars`. See the [Quickstart Readme](https://github.com/rancher/quickstart) for more information on the variables.

6. Run `terraform init`.

7. To initiate the creation of the environment, run `terraform apply`. Then wait for the following output:

	```
	Apply complete! Resources: 3 added, 0 changed, 0 destroyed. 
	  Outputs: 
	  rancher-url = [ 
              https://xxx.xxx.xxx.xxx 
      ]
	```

8. Paste the `rancher-url` from the output above into the browser. Log in when prompted (default password is `admin`).

**Result:** Rancher Server and your Kubernetes cluster is installed in Amazon AWS.

### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments]({{< baseurl >}}/rancher/v2.x/en/quick-start-guide/workload).

## Destroying the Environment

1. From the `quickstart/aws` folder, execute `terraform destroy --auto-approve`.

2. Wait for confirmation that all resources have been destroyed.
