---
title: Authentication
weight: 1115
aliases:
    - /rancher/v2.5/en/concepts/global-configuration/authentication/
    - /rancher/v2.5/en/tasks/global-configuration/authentication/
---

One of the key features that Rancher adds to Kubernetes is centralized user authentication. This feature allows your users to use one set of credentials to authenticate with any of your Kubernetes clusters.

This centralized user authentication is accomplished using the Rancher authentication proxy, which is installed along with the rest of Rancher. This proxy authenticates your users and forwards their requests to your Kubernetes clusters using a service account.

## External vs. Local Authentication

The Rancher authentication proxy integrates with the following external authentication services. The following table lists the first version of Rancher each service debuted.

| Auth Service                                                                                     |
| ------------------------------------------------------------------------------------------------ |
| [Microsoft Active Directory]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/ad/)  |
| [GitHub]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/github/)                  |
| [Microsoft Azure AD]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/azure-ad/)    |
| [FreeIPA]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/freeipa/)                |
| [OpenLDAP]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/openldap/)              |
| [Microsoft AD FS]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/microsoft-adfs/) |
| [PingIdentity]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/ping-federate/)     |
| [Keycloak]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/keycloak/)              |
| [Okta]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/okta/)                      | 
| [Google OAuth]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/google/)            | 
| [Shibboleth]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/shibboleth)           |

<br/>
However, Rancher also provides [local authentication]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/local/).

In most cases, you should use an external authentication service over local authentication, as external authentication allows user management from a central location. However, you may want a few local authentication users for managing Rancher under rare circumstances, such as if your external authentication provider is unavailable or undergoing maintenance.

## Users and Groups

Rancher relies on users and groups to determine who is allowed to log in to Rancher and which resources they can access. When authenticating with an external provider, groups are provided from the external provider based on the user. These users and groups are given specific roles to resources like clusters, projects, multi-cluster apps, and global DNS providers and entries. When you give access to a group, all users who are a member of that group in the authentication provider will be able to access the resource with the permissions that you've specified. For more information on roles and permissions, see [Role Based Access Control]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/).

> **Note:** Local authentication does not support creating or managing groups.

For more information, see [Users and Groups]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/user-groups/)

## Scope of Rancher Authorization

After you configure Rancher to allow sign on using an external authentication service, you should configure who should be allowed to log in and use Rancher. The following options are available:

| Access Level | Description |
|----------------------------------------------|-------------|
| Allow any valid Users                   | _Any_ user in the authorization service can access Rancher. We generally discourage use of this setting! |
| Allow members of Clusters, Projects, plus Authorized Users and Organizations | Any user in the authorization service and any group added as a **Cluster Member** or **Project Member** can log in to Rancher. Additionally, any user in the authentication service or group you add to the **Authorized Users and Organizations** list may log in to Rancher. |
| Restrict access to only Authorized Users and Organizations | Only users in the authentication service or groups added to the Authorized Users and Organizations can log in to Rancher. |

To set the Rancher access level for users in the authorization service, follow these steps:

1. From the **Global** view, click **Security > Authentication.**

1. Use the **Site Access** options to configure the scope of user authorization. The table above explains the access level for each option.

1. Optional: If you choose an option other than **Allow any valid Users,** you can add users to the list of authorized users and organizations by searching for them in the text field that appears.

1. Click **Save.**

**Result:** The Rancher access configuration settings are applied.

{{< saml_caveats >}}

## External Authentication Configuration and Principal Users

Configuration of external authentication requires:

- A local user assigned the administrator role, called hereafter the _local principal_.
- An external user that can authenticate with your external authentication service, called hereafter the _external principal_.

Configuration of external authentication affects how principal users are managed within Rancher. Follow the list below to better understand these effects.

1. Sign into Rancher as the local principal and complete configuration of external authentication.

	![Sign In]({{<baseurl>}}/img/rancher/sign-in.png)

2. Rancher associates the external principal with the local principal. These two users share the local principal's user ID.

	![Principal ID Sharing]({{<baseurl>}}/img/rancher/principal-ID.png)

3. After you complete configuration, Rancher automatically signs out the local principal.

	![Sign Out Local Principal]({{<baseurl>}}/img/rancher/sign-out-local.png)

4. Then, Rancher automatically signs you back in as the external principal.

	![Sign In External Principal]({{<baseurl>}}/img/rancher/sign-in-external.png)

5. Because the external principal and the local principal share an ID, no unique object for the external principal displays on the Users page.

	![Sign In External Principal]({{<baseurl>}}/img/rancher/users-page.png)

6. The external principal and the local principal share the same access rights.
