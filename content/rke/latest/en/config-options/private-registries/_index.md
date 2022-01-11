---
title: Private Registries
weight: 215
---

RKE supports the ability to configure multiple private Docker registries in the `cluster.yml`. By passing in your registry and credentials, it allows the nodes to pull images from these private registries.  

```yaml
private_registries:
    - url: registry.com
      user: Username
      password: password
    - url: myregistry.com
      user: myuser
      password: mypassword
```

If you are using a Docker Hub registry, you can omit the `url` or set it to `docker.io`.

> **Note:** Although the directive is named `url`, there is no need to prefix the host or IP address with `https://`.

Valid `url` examples include:

```yaml
url: registry.com
url: registry.com:5555
url: 1.1.1.1
url: 1.1.1.1:5555/artifactory
```

### Default Registry

As of v0.1.10, RKE supports specifying a default registry from the list of private registries to be used with all [system images]({{<baseurl>}}/rke/latest/en/config-options/system-images/) . In this example .RKE will use `registry.com` as the default registry for all system images, e.g. `rancher/rke-tools:v0.1.14` will become `registry.com/rancher/rke-tools:v0.1.14`.

```yaml
private_registries:
    - url: registry.com
      user: Username
      password: password
      is_default: true # All system images will be pulled using this registry. 
```

### Air-gapped Setups

By default, all system images are being pulled from DockerHub. If you are on a system that does not have access to DockerHub, you will need to create a private registry that is populated with all the required [system images]({{<baseurl>}}/rke/latest/en/config-options/system-images/). 

As of v0.1.10, you have to configure your private registry credentials, but you can specify this registry as a default registry so that all [system images]({{<baseurl>}}/rke/latest/en/config-options/system-images/) are pulled from the designated private registry. You can use the command `rke config --system-images` to get the list of default system images to populate your private registry. 

Before v0.1.10, you had to configure your private registry credentials **and** update the names of all the [system images]({{<baseurl>}}/rke/latest/en/config-options/system-images/) in the `cluster.yml` so that the image names would have the private registry URL appended before each image name. 


### Amazon Elastic Container Registry (ECR) Private Registry Setup

[Amazon ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html) is an AWS managed container image registry service that is secure, scalable, and reliable. There are two ways in which to provide ECR credentials to set up your ECR private registry: using an instance profile or adding a configuration snippet, which are hard-coded credentials in environment variables for the `kubelet` and credentials under the `ecrCredentialPlugin`. 

  - **Instance Profile**: An instance profile is the preferred and more secure approach to provide ECR credentials (when running in EC2, etc.). The instance profile will be autodetected and used by default. For more information on configuring an instance profile with ECR permissions, go [here](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security-iam.html).

  - **Configuration Snippet**: You will use the configuration snippet below rather than an instance profile only if the following conditions exist in your node:

    - Node is not an EC2 instance
    - Node is an EC2 instance but does not have an instance profile configured
    - Node is an EC2 instance and has an instance profile configured but has no permissions for ECR

>  **Note:** The ECR credentials are only used in the `kubelet` and `ecrCredentialPlugin` areas. This is important to remember if you have issues while creating a new cluster or when pulling images during reconcile/upgrades.
>
>  - Kubelet: For add-ons, custom workloads, etc., the instance profile or credentials are used by the 
>    downstream cluster nodes
>  - Pulling system images (directly via Docker): For bootstrap, upgrades, reconcile, etc., the instance profile 
>    or credentials are used by nodes running RKE or running the Rancher pods.

```
  # Configuration snippet to be used when the instance profile is unavailable.
  services:
    kubelet:
      extra_env:
        - "AWS_ACCESS_KEY_ID=ACCESSKEY"
        - "AWS_SECRET_ACCESS_KEY=SECRETKEY"
  private_registries:
       - url: ACCOUNTID.dkr.ecr.REGION.amazonaws.com
         is_default: true
         ecrCredentialPlugin: 
          aws_access_key_id: "ACCESSKEY"
          aws_secret_access_key: "SECRETKEY"
``` 
    