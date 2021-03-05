---
title: Global DNS
weight: 5010
aliases:
  - /rancher/v2.0-v2.4/en/catalog/globaldns
  - /rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/globaldns
---

_Available as of v2.2.0_

Rancher's Global DNS feature provides a way to program an external DNS provider to route traffic to your Kubernetes applications. Since the DNS programming supports spanning applications across different Kubernetes clusters, Global DNS is configured at a global level. An application can become highly available as it allows you to have one application run on different Kubernetes clusters. If one of your Kubernetes clusters goes down, the application would still be accessible.

> **Note:** Global DNS is only available in [Kubernetes installations]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/) with the `local` cluster enabled.

- [Global DNS Providers](#global-dns-providers)
- [Global-DNS-Entries](#global-dns-entries)
- [Permissions for Global DNS Providers and Entries](#permissions-for-global-dns-providers-and-entries)
- [Setting up Global DNS for Applications](#setting-up-global-dns-for-applications)
- [Adding a Global DNS Entry](#adding-a-global-dns-entry)
- [Editing a Global DNS Provider](#editing-a-global-dns-provider)
- [Global DNS Entry Configuration](#global-dns-entry-configuration)
- [DNS Provider Configuration](#dns-provider-configuration)
  - [Route53](#route53)
  - [CloudFlare](#cloudflare)
  - [AliDNS](#alidns)
- [Adding Annotations to Ingresses to program the External DNS](#adding-annotations-to-ingresses-to-program-the-external-dns)

# Global DNS Providers

Before adding in Global DNS entries, you will need to configure access to an external provider.

The following table lists the first version of Rancher each provider debuted.

| DNS Provider | Available as of  |
| --- | --- |
| [AWS Route53](https://aws.amazon.com/route53/)  | v2.2.0 |
| [CloudFlare](https://www.cloudflare.com/dns/) | v2.2.0 |
| [AliDNS](https://www.alibabacloud.com/product/dns) | v2.2.0 |

# Global DNS Entries

For each application that you want to route traffic to, you will need to create a Global DNS Entry. This entry will use a fully qualified domain name (a.k.a FQDN) from a global DNS provider to target applications. The applications can either resolve to a single [multi-cluster application]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/multi-cluster-apps/) or to specific projects. You must [add specific annotation labels](#adding-annotations-to-ingresses-to-program-the-external-dns) to the ingresses in order for traffic to be routed correctly to the applications. Without this annotation, the programming for the DNS entry will not work.

# Permissions for Global DNS Providers and Entries

By default, only [global administrators]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/) and the creator of the Global DNS provider or Global DNS entry have access to use, edit and delete them. When creating the provider or entry, the creator can add additional users in order for those users to access and manage them. By default, these members will get `Owner` role to manage them.

# Setting up Global DNS for Applications

1. From the **Global View**, select **Tools > Global DNS Providers**.
1. To add a provider, choose from the available provider options and configure the Global DNS Provider with necessary credentials and an optional domain. For help, see [DNS Provider Configuration.](#dns-provider-configuration)
1. (Optional) Add additional users so they could  use the provider when creating Global DNS entries as well as manage the Global DNS provider.
1. (Optional) Pass any custom values in the Additional Options section.

# Adding a Global DNS Entry

1. From the **Global View**, select **Tools > Global DNS Entries**.
1. Click on **Add DNS Entry**.
1. Fill out the form. For help, refer to [Global DNS Entry Configuration.](#global-dns-entry-configuration)
1. Click **Create.**

# Editing a Global DNS Provider

The [global administrators]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/), creator of the Global DNS provider and any users added as `members` to a Global DNS provider, have _owner_ access to that provider. Any members can edit the following fields:

- Root Domain
- Access Key & Secret Key
- Members
- Custom values

1. From the **Global View**, select **Tools > Global DNS Providers**.

1. For the Global DNS provider that you want to edit, click the **&#8942; > Edit**.

# Editing a Global DNS Entry

The [global administrators]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/), creator of the Global DNS entry and any users added as `members` to a Global DNS entry, have _owner_ access to that DNS entry. Any members can edit the following fields:

- FQDN
- Global DNS Provider
- Target Projects or Multi-Cluster App
- DNS TTL
- Members

Any users who can access the Global DNS entry can **only** add target projects that they have access to. However, users can remove **any** target project as there is no check to confirm if that user has access to the target project.

Permission checks are relaxed for removing target projects in order to support situations where the user's permissions might have changed before they were able to delete the target project. Another use case could be that the target project was removed from the cluster before being removed from a target project of the Global DNS entry.

1. From the **Global View**, select **Tools > Global DNS Entries**.

1. For the Global DNS entry that you want to edit, click the **&#8942; > Edit**.


# Global DNS Entry Configuration 

| Field | Description |
|----------|--------------------|
| FQDN | Enter the **FQDN** you wish to program on the external DNS. |
| Provider | Select a Global DNS **Provider** from the list. |
| Resolves To |   Select if this DNS entry will be for a [multi-cluster application]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/multi-cluster-apps/) or for workloads in different [projects]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/projects-and-namespaces/).   |
| Multi-Cluster App Target | The target for the global DNS entry. You will need to ensure that [annotations are added to any ingresses](#adding-annotations-to-ingresses-to-program-the-external-dns) for the applications that you want to target. |
| DNS TTL | Configure the DNS time to live value in seconds. By default, it will be 300 seconds. |
| Member Access | Search for any users that you want to have the ability to manage this Global DNS entry. |

# DNS Provider Configuration

### Route53

| Field | Explanation |
|---------|---------------------|
| Name |  Enter a **Name** for the provider.   |
| Root Domain |  (Optional) Enter the **Root Domain** of the hosted zone on AWS Route53. If this is not provided, Rancher's Global DNS Provider will work with all hosted zones that the AWS keys can access.   |
| Credential Path |  The [AWS credential path.](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-where)   |
| Role ARN |    An [Amazon Resource Name.](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html)   |
| Region |   An [AWS region.](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Regions)     |
| Zone |  An [AWS zone.](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.AvailabilityZones)      |
| Access Key |    Enter the AWS **Access Key**.  |
| Secret Key |  Enter the AWS **Secret Key**.   |
| Member Access |  Under **Member Access**, search for any users that you want to have the ability to use this provider. By adding this user, they will also be able to manage the Global DNS Provider entry.     |


### CloudFlare

| Field | Explanation |
|---------|---------------------|
| Name |  Enter a **Name** for the provider.   |
| Root Domain | Optional: Enter the **Root Domain**. In case this is not provided, Rancher's Global DNS Provider will work with all domains that the keys can access.     |
| Proxy Setting |  When set to yes, the global DNS entry that gets created for the provider has proxy settings on.    |
| API Email |   Enter the CloudFlare **API Email**.     |
| API Key |     Enter the CloudFlare **API Key**.    |
| Member Access | Search for any users that you want to have the ability to use this provider. By adding this user, they will also be able to manage the Global DNS Provider entry.     |

### AliDNS

>**Notes:**
>
>- Alibaba Cloud SDK uses TZ data. It needs to be present on `/usr/share/zoneinfo` path of the nodes running `local` cluster, and it is mounted to the external DNS pods. If it is not available on the nodes, please follow the [instruction](https://www.ietf.org/timezones/tzdb-2018f/tz-link.html) to prepare it.
>- Different versions of AliDNS have different allowable TTL range, where the default TTL for a global DNS entry may not be valid. Please see the [reference](https://www.alibabacloud.com/help/doc-detail/34338.htm) before adding an AliDNS entry.

| Field | Explanation |
|---------|---------------------|
| Name |  Enter a **Name** for the provider.   |
| Root Domain | Optional: Enter the **Root Domain**. In case this is not provided, Rancher's Global DNS Provider will work with all domains that the keys can access. |
| Access Key | Enter the **Access Key**. |
| Secret Key | Enter the **Secret Key**. |
| Member Access | Search for any users that you want to have the ability to use this provider. By adding this user, they will also be able to manage the Global DNS Provider entry. |

# Adding Annotations to Ingresses to program the External DNS

In order for Global DNS entries to be programmed, you will need to add a specific annotation on an ingress in your application or target project.

For any application that you want targeted for your Global DNS entry, find an ingress associated with the application.

This ingress needs to use a specific `hostname` and an annotation that should match the FQDN of the Global DNS entry.

In order for the DNS to be programmed, the following requirements must be met:

* The ingress routing rule must be set to use a `hostname` that matches the FQDN of the Global DNS entry.
* The ingress must have an annotation (`rancher.io/globalDNS.hostname`) and the value of this annotation should match the FQDN of the Global DNS entry.

Once the ingress in your [multi-cluster application]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/multi-cluster-apps/) or in your target projects is in an `active` state, the FQDN will be programmed on the external DNS against the Ingress IP addresses.