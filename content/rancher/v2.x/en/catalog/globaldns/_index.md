---
title: Global DNS
weight: 5010
---

_Available as of v2.2.0_

Rancher's Global DNS feature provides a way to program an external DNS provider to route traffic to your Kubernetes applications. Since the DNS programming supports spanning applications across different Kubernetes clusters, Global DNS is configured at a global level. An application can become highly available as it allows you to have one application run on different Kubernetes clusters. If one of your Kubernetes clusters goes down, the application would still be accessible.

> **Note:** Global DNS is only available in [HA setups]({{< baseurl >}}/rancher/v2.x/en/installation/ha/) with the [`local` cluster enabled]({{< baseurl >}}/rancher/v2.x/en/installation/resources-for-ha/chart-options/#import-local-cluster).

## Global DNS Providers

Prior to adding in Global DNS entries, you will need to configure access to an external provider.

The following table lists the first version of Rancher each provider debuted.

| DNS Provider | Available as of  |
| --- | --- |
| [AWS Route53](https://aws.amazon.com/route53/)  | v2.2.0 |
| [CloudFlare](https://www.cloudflare.com/dns/) | v2.2.0 |
| [AliDNS](https://www.alibabacloud.com/product/dns) | v2.2.0 |

## Global DNS Entries

For each application that you want to route traffic to, you will need to create a Global DNS Entry. This entry will use a fully qualified domain name (a.k.a FQDN) from a global DNS provider to target applications. The applications can either resolve to a single [multi-cluster application]({{< baseurl >}}/rancher/v2.x/en/catalog/multi-cluster-apps/) or to specific projects. You must [add specific annotation labels](#adding-annotations-to-ingresses-to-program-the-external-dns) to the ingresses in order for traffic to be routed correctly to the applications. Without this annotation, the programming for the DNS entry will not work.

## Permissions for Global DNS Providers/Entries

By default, only [global administrators]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) and the creator of the Global DNS provider or Global DNS entry have access to use, edit and delete them. When creating the provider or entry, the creator can add additional users in order for those users to access and manage them. By default, these members will get `Owner` role to manage them.

## Setting up Global DNS for Applications

### Add a Global DNS Provider

1. From the **Global View**, select **Tools > Global DNS Providers**.
1. To add a provider, choose from the available provider options and configure the Global DNS Provider with necessary credentials and an optional domain.
1. (Optional) Add additional users so they could  use the provider when creating Globel DNS entries as well as manage the Global DNS provider.

{{% accordion id="route53" label="Route53" %}}
1. Enter a **Name** for the provider.
1. (Optional) Enter the **Root Domain** of the hosted zone on AWS Route53. If this is not provided, Rancher's Global DNS Provider will work with all hosted zones that the AWS keys can access.
1. Enter the AWS **Access Key**.
1. Enter the AWS **Secret Key**.
1. Under **Member Access**, search for any users that you want to have the ability to use this provider. By adding this user, they will also be able to manage the Global DNS Provider entry.
1. Click **Create**.
{{% /accordion %}}
{{% accordion id="cloudflare" label="CloudFlare" %}}
1. Enter a **Name** for the provider.
1. Enter the **Root Domain**, this field is optional, in case this is not provided, Rancher's Global DNS Provider will work with all domains that the keys can access.
1. Enter the CloudFlare **API Email**.
1. Enter the CloudFlare **API Key**.
1. Under **Member Access**, search for any users that you want to have the ability to use this provider. By adding this user, they will also be able to manage the Global DNS Provider entry.
1. Click **Create**.
{{% /accordion %}}
{{% accordion id="alidns" label="AliDNS" %}}
1. Enter a **Name** for the provider.
1. Enter the **Root Domain**, this field is optional, in case this is not provided, Rancher's Global DNS Provider will work with all domains that the keys can access.
1. Enter the **Access Key**.
1. Enter the **Secret Key**.
1. Under **Member Access**, search for any users that you want to have the ability to use this provider. By adding this user, they will also be able to manage the Global DNS Provider entry.
1. Click **Create**.

>**Notes:**
>
>- Alibaba Cloud SDK uses TZ data. It needs to be present on `/usr/share/zoneinfo` path of the nodes running [`local` cluster]({{< baseurl >}}/rancher/v2.x/en/installation/resources-for-ha/chart-options/#import-local-cluster), and it is mounted to the external DNS pods. If it is not available on the nodes, please follow the [instruction](https://www.ietf.org/timezones/tzdb-2018f/tz-link.html) to prepare it.
>- Different versions of AliDNS have different allowable TTL range, where the default TTL for a global DNS entry may not be valid. Please see the [reference](https://www.alibabacloud.com/help/doc-detail/34338.htm) before adding an AliDNS entry.
{{% /accordion %}}

### Add a Global DNS Entry

1. From the **Global View**, select **Tools > Global DNS Entries**.
1. Click on **Add DNS Entry**.
1. Enter the **FQDN** you wish to program on the external DNS.
1. Select a Global DNS **Provider** from the list.
1. Select if this DNS entry will be for a [multi-cluster application]({{< baseurl >}}/rancher/v2.x/en/catalog/multi-cluster-apps/) or for workloads in different [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/).  You will need to ensure that [annotations are added to any ingresses](#adding-annotations-to-ingresses-to-program-the-external-dns) for the applications that you want to target.
1. Configure the **DNS TTL** value in seconds. By default, it will be 300 seconds.
1. Under **Member Access**, search for any users that you want to have the ability to manage this Global DNS entry.

## Adding Annotations to Ingresses to program the External DNS

In order for Global DNS entries to be programmed, you will need to add a specific annotation on an ingress in your application or target project and this ingress needs to use a specific `hostname` and an annotation that should match the FQDN of the Global DNS entry.

1. For any application that you want targetted for your Global DNS entry, find an ingress associated with the application.
1. In order for the DNS to be programmed, the following requirements must be met:
   * The ingress routing rule must be set to use a `hostname` that matches the FQDN of the Global DNS entry.
   * The ingress must have an annotation (`rancher.io/globalDNS.hostname`) and the value of this annotation should match the FQDN of the Global DNS entry.
1. Once the ingress in your [multi-cluster application]({{< baseurl >}}/rancher/v2.x/en/catalog/multi-cluster-apps/) or in your target projects are in `active` state, the FQDN will be programmed on the external DNS against the Ingress IP addresses.

## Editing a Global DNS Provider

The [global administrators]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/), creator of the Global DNS provider and any users added as `members` to a Global DNS provider, have _owner_ access to that provider. Any members can edit the following fields:

- Root Domain
- Access Key & Secret Key
- Members

1. From the **Global View**, select **Tools > Global DNS Providers**.

1. For the Global DNS provider that you want to edit, click the **Vertical Ellipsis (...) > Edit**.

## Editing a Global DNS Entry

The [global administrators]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/), creator of the Global DNS entry and any users added as `members` to a Global DNS entry, have _owner_ access to that DNS entry. Any members can edit the following fields:

- FQDN
- Global DNS Provider
- Target Projects or Multi-Cluster App
- DNS TTL
- Members

Any users who can access the Global DNS entry can **only** add target projects that they have access to. However, users can remove **any** target project as there is no check to confirm if that user has access to the target project.

Permission checks are relaxed for removing target projects in order to support situations where the user's permissions might have changed before they were able to delete the target project. Another use case could be that the target project was removed from the cluster before being removed from a target project of the Global DNS entry.

1. From the **Global View**, select **Tools > Global DNS Entries**.

1. For the Global DNS entry that you want to edit, click the **Vertical Ellipsis (...) > Edit**.
