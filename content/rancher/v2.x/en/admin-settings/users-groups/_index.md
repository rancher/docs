---
title: Users and Groups
weight: 1111
---

## Managing Users and Groups

After an authentication provider is added you will have the opportunity to configure which users or groups are allowed access using that provider.

You are able to add users to the local authentication from the **Global** **Users** page, or manage users that have logged in from the authentication provider. 

When adding members to a cluster or project any groups which are available through the authentication provider will be available to manage as a member.

> **NOTE:** Local authentication does not allow creating or managing groups.

## Auth Provider Refresh

_Available as of v2.2.0_

If you are using an authentication provider, you can configure Rancher to periodically refresh membership information from the provider.

1.	From the **Global** view, select **Settings** from the main menu.

1.	Configuring **auth-user-info-max-age-seconds** will set the maximum age of a user's auth token before an auth provider group membership sync will be performed. Defaults to `3600` seconds (1 hour).

1.  Configuring **auth-user-info-resync-cron** will set the cron schedule for resyncing auth provider group memberships for all users. Defaults to `0 0 * * *` (once per day at midnight), see [Cron documentation](https://en.wikipedia.org/wiki/Cron) for more information.

It is also possible to manually refresh group memberships from the **Global** **Users** page.

>**Note:** If you are using an RKE cluster configured as an _authorized cluster endpoint_, Rancher will sync auth changes to the cluster, and be notified of tokens which need resyncing according to the _auth-user-info-max-age-seconds_ setting. See [RKE cluster provisioning]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/) for more information.

