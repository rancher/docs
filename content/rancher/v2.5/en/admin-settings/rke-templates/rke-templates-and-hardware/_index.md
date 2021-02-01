---
title: RKE Templates and Infrastructure
weight: 90
---

In Rancher, RKE templates are used to provision Kubernetes and define Rancher settings, while node templates are used to provision nodes.

Therefore, even if RKE template enforcement is turned on, the end user still has flexibility when picking the underlying hardware when creating a Rancher cluster. The end users of an RKE template can still choose an infrastructure provider and the nodes they want to use.

If you want to standardize the hardware in your clusters, use RKE templates conjunction with node templates or with a server provisioning tool such as Terraform.

### Node Templates

[Node templates]({{<baseurl>}}/rancher/v2.5/en/user-settings/node-templates) are responsible for node configuration and node provisioning in Rancher. From your user profile, you can set up node templates to define which templates are used in each of your node pools. With node pools enabled, you can make sure you have the required number of nodes in each node pool, and ensure that all nodes in the pool are the same.

### Terraform

Terraform is a server provisioning tool. It uses infrastructure-as-code that lets you create almost every aspect of your infrastructure with Terraform configuration files. It can automate the process of server provisioning in a way that is self-documenting and easy to track in version control.

This section focuses on how to use Terraform with the [Rancher 2 Terraform provider](https://www.terraform.io/docs/providers/rancher2/), which is a recommended option to standardize the hardware for your Kubernetes clusters. If you use the Rancher Terraform provider to provision hardware, and then use an RKE template to provision a Kubernetes cluster on that hardware, you can quickly create a comprehensive, production-ready cluster.

Terraform allows you to:

- Define almost any kind of infrastructure-as-code, including servers, databases, load balancers, monitoring, firewall settings, and SSL certificates
- Leverage catalog apps and multi-cluster apps
- Codify infrastructure across many platforms, including Rancher and major cloud providers
- Commit infrastructure-as-code to version control
- Easily repeat configuration and setup of infrastructure
- Incorporate infrastructure changes into standard development practices
- Prevent configuration drift, in which some servers become configured differently than others

# How Does Terraform Work?

Terraform is written in files with the extension `.tf`. It is written in HashiCorp Configuration Language, which is a declarative language that lets you define the infrastructure you want in your cluster, the cloud provider you are using, and your credentials for the provider. Then Terraform makes API calls to the provider in order to efficiently create that infrastructure.

To create a Rancher-provisioned cluster with Terraform, go to your Terraform configuration file and define the provider as Rancher 2. You can set up your Rancher 2 provider with a Rancher API key. Note: The API key has the same permissions and access level as the user it is associated with.

Then Terraform calls the Rancher API to provision your infrastructure, and Rancher calls the infrastructure provider. As an example, if you wanted to use Rancher to provision infrastructure on AWS, you would provide both your Rancher API key and your AWS credentials in the Terraform configuration file or in environment variables so that they could be used to provision the infrastructure.

When you need to make changes to your infrastructure, instead of manually updating the servers, you can make changes in the Terraform configuration files. Then those files can be committed to version control, validated, and reviewed as necessary. Then when you run `terraform apply`, the changes would be deployed.

# Tips for Working with Terraform

- There are examples of how to provide most aspects of a cluster in the [documentation for the Rancher 2 provider.](https://www.terraform.io/docs/providers/rancher2/)

- In the Terraform settings, you can install Docker Machine by using the Docker Machine node driver.

- You can also modify auth in the Terraform provider.

- You can reverse engineer how to do define a setting in Terraform by changing the setting in Rancher, then going back and checking your Terraform state file to see how it maps to the current state of your infrastructure.

- If you want to manage Kubernetes cluster settings, Rancher settings, and hardware settings all in one place, use [Terraform modules](https://github.com/rancher/terraform-modules). You can pass a cluster configuration YAML file or an RKE template configuration file to a Terraform module so that the Terraform module will create it. In that case, you could use your infrastructure-as-code to manage the version control and revision history of both your Kubernetes cluster and its underlying hardware.

# Tip for Creating CIS Benchmark Compliant Clusters

This section describes one way that you can make security and compliance-related config files standard in your clusters.

When you create a [CIS benchmark compliant cluster,]({{<baseurl>}}/rancher/v2.5/en/security/) you have an encryption config file and an audit log config file.

Your infrastructure provisioning system can write those files to disk. Then in your RKE template, you would specify where those files will be, then add your encryption config file and audit log config file as extra mounts to the `kube-api-server`.

Then you would make sure that the `kube-api-server` flag in your RKE template uses your CIS-compliant config files.

In this way, you can create flags that comply with the CIS benchmark.

# Resources

- [Terraform documentation](https://www.terraform.io/docs/)
- [Rancher2 Terraform provider documentation](https://www.terraform.io/docs/providers/rancher2/)
- [The RanchCast - Episode 1: Rancher 2 Terraform Provider](https://youtu.be/YNCq-prI8-8): In this demo, Director of Community Jason van Brackel walks through using the Rancher 2 Terraform Provider to provision nodes and create a custom cluster.