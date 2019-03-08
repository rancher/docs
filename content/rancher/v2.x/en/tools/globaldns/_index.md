---
title: Global DNS
aliases:
---

Rancher's Global DNS feature provides a way to program an external DNS provider for the kubernetes workloads. It is programmed at a global level in Rancher, and can be used to program DNS for workloads that may be running in multiple kubernetes clusters. 

This feature helps in achieving high availability for an application that may be running on multiple kubernetes clusters, by programming an FQDN for your application against IP addresses from different clusters where the application is running.

Note that, Global DNS feature is only available in HA setups with a local cluster enabled. Refer [here](https://rancher.com/docs/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#import-local-cluster) to see how to enable the local cluster for HA installations.


## External DNS Provider Support

Rancher deploys the provider implementations available under [kubernetes-incubator/external-dns](https://github.com/kubernetes-incubator/external-dns) project.
The External DNS providers supported in Rancher 2.2 release are AWS Route53, CloudFlare and AliDNS. AWS Route53 is the default provider. Support for more providers may be added in future releases.

## Global DNS Workflow

### Add a Global DNS Provider

1. From the **Global View**, select **Tools > Global DNS Providers**
1. To add a provider, choose from the available provider options and configure the Global DNS Provider with necessary credentials and an optional domain
1. You can also assign other users as members to this provider. Members added get 'Owner' role and can manage the Global DNS Provider.
{{% accordion id="route53" label="Route53" %}}
1. Enter a **Name** for the provider.
1. Enter the **Root Domain** of the hosted zone on AWS Route53. This field is optional, in case this is not provided, Rancher's Global DNS Provider will work with all hosted zones that the AWS keys can access.
1. Enter the AWS *Access Key*.
1. Enter the AWS *Secret Key*.
1. Under **Member Access**, add any users you may want to add as "Owner" of this provider. They can edit/delete the Global DNS Provider entry.
1. Click **Create**.
{{% /accordion %}}
{{% accordion id="cloudflare" label="CloudFlare" %}}
1. Enter a **Name** for the provider.
1. Enter the **Root Domain**, this field is optional, in case this is not provided, Rancher's Global DNS Provider will work with all domains that the keys can access.
1. Enter the CloudFlare *API Email*.
1. Enter the CloudFlare *API Key*.
1. Under **Member Access**, add any users you may want to add as "Owner" of this provider. They can edit/delete the Global DNS Provider entry.
1. Click **Create**.
{{% /accordion %}}
{{% accordion id="alidns" label="alidns" %}}
1. Enter a **Name** for the provider.
1. Enter the **Root Domain**, this field is optional, in case this is not provided, Rancher's Global DNS Provider will work with all domains that the keys can access.
1. Enter the *Access Key*.
1. Enter the *Secret Key*.
1. Under **Member Access**, add any users you may want to add as "Owner" of this provider. They can edit/delete the Global DNS Provider entry.
1. Click **Create**.
{{% /accordion %}}


### Add a Global DNS Entry

1. From the **Global View**, select **Tools > Global DNS Entries**
1. Enter the **FQDN** you wish to program on the external DNS.
1. Assign a Global DNS Provider to this entry.
1. Choose whether this DNS entry will be programmed for a Multi-cluster app or for workloads under some Cluster Projects. This defines the scope in which Rancher will search for an ingress having a specific annotation, to be programmed on to the external DNS. Thus when the targets of the DNS entry are set, then ingresses in some other projects or part of another Multi-cluster app will not be programmed on the external DNS.
1. Configure the **DNS TTL** value in seconds - by default it will be 300 seconds.
1. Under **Member Access**, add any users you may want to add as "Owner" of this entry. They can edit/delete the Global DNS entry.


## Add Annotation to an Ingress to program the External DNS

To program an external DNS provider like Route53 or CloudFlare for your workloads, please follow the steps below.

1. Create a Global DNS Provider and configure it with the necessary credentials.
1. Create a Global DNS entry with the FQDN and provider of your choice. Point this entry to a Multi-cluster app or target workloads under some Cluster Projects.
1. Add the annotation label ( rancher.io/globalDNS.hostname ) on an ingress in the Multi-cluster app or the target projects. 
1. Value of this annotation is the host name used in the ingress routing rules and it should match the FQDN on the Global DNS entry.
1. Once the ingress in your Multi-cluster app or target project is in Active state, you will be able to see the FQDN programmed on the external DNS against the Ingress IP addresses.
