---
title: Users and Groups
weight: 1215
---


## Managing Users and Groups

When you configure an authentication provider, users from that provider will be able to log into your Rancher server. When a user logs in, the authentication provider will supply your Rancher server with a list of groups to which the user belongs.

Access to cluster, projects, multi-cluster apps, and global DNS providers and entries can be controlled by adding either individual users or groups to the resource. When you add a group to a resources, all users who are a member of that group in the authentication provider will be able to access the resource with the permissions that you've specified. For more information on roles and permissions, see  [Role Based Access Control]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/).

When adding a new member to a resource, you can search for users or groups by beginning to type their name. The Rancher server will query the authentication provider to find users and groups that match what you've entered.

> **NOTE:** SAML-based authentication providers do not support user or group search. The only groups that you will see with these providers are the ones to which you belong. The only users you will see are ones that have already logged into your Rancher server.

> **NOTE:** Searching is limited to the authentication provider you are currently logged in with. For example, if you've enabled GitHub authentication but are logged in using a local user account, you will not be able to search for GitHub users or groups.

All users, whether they are local or from an authentication provider, can be viewed and managed from the **Global** **Users** page. New local users can be added from this page as well.


> **NOTE:** Local authentication does not support creating or managing groups.

## Refreshing User Information

_Available as of v2.2.0_

Rancher maintains information about each user that logs in through an authentication provider. This information includes a list of groups that the user belongs to and whether the user is allowed to access your Rancher server. Rancher does this so that the CLI, API, and kubectl can accurately reflect the access that the user has based on their group membership in the authentication provider.

When a user logs into the UI using an authentication provider, Rancher automatically updates this user information. Additionally, Rancher will periodically refresh this user information. You can contol how often Rancher performs this refresh by navigating to the **Global** **Settings** page. Two settings control this behavior:

- **auth-user-info-max-age-seconds**

    This setting controls how old a user's information can be before Rancher refreshes it. If a user makes an API call (either directly or by using the Rancher CLI or kubectl) and the time since the user's last refresh is greater than this setting, then Rancher will trigger a refresh. This settting defaults to `3600` seconds (1 hour).

- **auth-user-info-resync-cron**

    This setting controls a recurring schedule for resyncing authentication provider information for all users. Regardless of whether a user has logged in or used the API recently, this will cause the user to be refreshed at the specified interval. This setting defaults to `0 0 * * *` (once a day at midnight). See the [Cron documentation](https://en.wikipedia.org/wiki/Cron) for more information on valid values for this setting.

It is also possible to manually refresh user information from the **Global** **Users** page.

> **NOTE:** Since SAML does not support user lookup, SAML-based authentication providers do not support periodically refreshing user information. User information will only be refreshed when the user logs into the Rancher UI.
