---
title: Configuring OpenLDAP
weight: 1113
aliases:
    - /rancher/v2.x/en/tasks/global-configuration/authentication/openldap/
---

_Available as of v2.0.5_

If your organization uses LDAP for user authentication, you can configure Rancher to communicate with an OpenLDAP server to authenticate users. This allows Rancher admins to control access to clusters and projects based on users and groups managed externally in the organisation's central user repository, while allowing end-users to authenticate with their LDAP credentials when logging in to the Rancher UI. 
 
## OpenLDAP Authentication Flow 
 
1. When a user attempts to login with his LDAP credentials, Rancher creates an initial bind to the LDAP server using a service account with permissions to search the directory and read user/group attributes. 
2. Rancher then searches the directory for the user by using a search filter based on the provided username and configured attribute mappings. 
3. Once the user has been found, he is authenticated with another LDAP bind request using the user's DN and provided password. 
4. Once authentication succeeded, Rancher then resolves the group memberships both from the membership attribute in the user's object and by performing a group search based on the configured user mapping attribute.

> **Note:**
> 
> Before you proceed with the configuration, please familiarise yourself with the concepts of [External Authentication Configuration and Principal Users]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/#external-authentication-configuration-and-principal-users).

## Prerequisites

Rancher must be configured with a LDAP bind account (aka service account) to search and retrieve LDAP entries pertaining to users and groups that should have access. It is recommended to not use an admin account or personal account for this purpose and instead create a dedicated account in OpenLDAP with read-only access to users and groups under the configured search base (see below).

> **Using TLS?**
>
> If the certificate used by the OpenLDAP server is self-signed or not from a recognised certificate authority, make sure have at hand the CA certificate (concatenated with any intermediate certificates) in PEM format. You will have to paste in this certificate during the configuration so that Rancher is able to validate the certificate chain.

## Configuration Steps
### Open OpenLDAP Configuration

1. Log into the Rancher UI using the initial local `admin` account.
2. From the **Global** view, navigate to **Security** > **Authentication**
3. Select **OpenLDAP**. The **Configure an OpenLDAP server** form will be displayed.

### Configure OpenLDAP Server Settings

In the section titled `1. Configure an OpenLDAP server`,   complete the fields with the information specific to your server. Please refer to the following table for detailed information on the required values for each parameter.

> **Note:**
>
> If you are in doubt about the correct values to enter in the user/group Search Base configuration fields, consult your LDAP administrator or refer to the section [Identify Search Base and Schema using ldapsearch]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/ad/#annex-identify-search-base-and-schema-using-ldapsearch) in the Active Directory authentication documentation.

**Table 1: OpenLDAP server parameters**

| Parameter | Description |
|:--|:--|
| Hostname | Specify the hostname or IP address of the OpenLDAP server |
| Port | Specify the port at which the OpenLDAP server is listening for connections. Unencrypted LDAP normally uses the standard port of 389, while LDAPS uses port 636.|
| TLS | Check this box to enable LDAP over SSL/TLS (commonly known as LDAPS). You will also need to paste in the CA certificate if the server uses a self-signed/enterprise-signed certificate. |
| Server Connection Timeout | 	The duration in number of seconds that Rancher waits before considering the server unreachable. |
| Service Account Distinguished Name | Enter the Distinguished Name (DN) of the user that should be used to bind, search and retrieve LDAP entries. (see [Prerequisites](#prerequisites)). |
| Service Account Password | The password for the service account.  |
| User Search Base | Enter the Distinguished Name of the node in your directory tree from which to start searching for user objects. All users must be descendents of this base DN. For example: "ou=people,dc=acme,dc=com".|
| Group Search Base | If your groups live under a different node than the one configured under `User Search Base` you will need to provide the Distinguished Name here. Otherwise leave this field empty. For example: "ou=groups,dc=acme,dc=com".|

---

### Configure User/Group Schema

If your OpenLDAP directory deviates from the standard OpenLDAP schema, you must complete the **Customize Schema** section to match it.
Note that the attribute mappings configured in this section are used by Rancher to construct search filters and resolve group membership. It is therefore always recommended to verify that the configuration here matches the schema used in your OpenLDAP.

> **Note:**
>
> If you are unfamiliar with the user/group schema used in the OpenLDAP server, consult your LDAP administrator or refer to the section [Identify Search Base and Schema using ldapsearch]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/ad/#annex-identify-search-base-and-schema-using-ldapsearch) in the Active Directory authentication documentation.

#### User Schema

The table below details the parameters for the user schema configuration.

**Table 2: User schema configuration parameters**

| Parameter | Description |
|:--|:--|
| Object Class | The name of the object class used for user objects in your domain. If defined, only specify the name of the object class - *don't* include it in an LDAP wrapper such as &(objectClass=xxxx) |
| Username Attribute | The user attribute whose value is suitable as a display name. |
| Login Attribute | The attribute whose value matches the username part of credentials entered by your users when logging in to Rancher. This is typically `uid`. |
| User Member Attribute | The user attribute containing the Distinguished Name of groups a user is member of. Usually this is one of `memberOf` or `isMemberOf`. |
| Search Attribute | When a user enters text to add users or groups in the UI, Rancher queries the LDAP server and attempts to match users by the attributes provided in this setting. Multiple attributes can be specified by separating them with the pipe ("\|") symbol. |
| User Enabled Attribute | If the schema of your OpenLDAP server supports a user attribute whose value can be evaluated to determine if the account is disabled or locked, enter the name of that attribute. The default OpenLDAP schema does not support this and the field should usually be left empty. |
| Disabled Status Bitmask | This is the value for a disabled/locked user account. The parameter is ignored if `User Enabled Attribute` is empty. |

---

#### Group Schema

The table below details the parameters for the group schema configuration.

**Table 3: Group schema configuration parameters**

| Parameter | Description |
|:--|:--|
| Object Class | The name of the object class used for group entries in your domain. If defined, only specify the name of the object class - *don't* include it in an LDAP wrapper such as &(objectClass=xxxx) |
| Name Attribute | The group attribute whose value is suitable for a display name. |
| Group Member User Attribute | The name of the **user attribute** whose format matches the group members in the `Group Member Mapping Attribute`. |
| Group Member Mapping Attribute | The name of the group attribute containing the members of a group. |
| Search Attribute | Attribute used to construct search filters when adding groups to clusters or projects in the UI. See description of user schema `Search Attribute`. |
| Group DN Attribute | The name of the group attribute whose format matches the values in the user's group membership attribute. See  `User Member Attribute`. |
| Nested Group Membership | This settings defines whether Rancher should resolve nested group memberships. Use only if your organisation makes use of these nested memberships (ie. you have groups that contain other groups as members). |

---

### Test Authentication

Once you have completed the configuration, proceed by testing  the connection to the OpenLDAP server. Authentication with OpenLDAP will be enabled implicitly if the test is successful.

> **Note:**
>
> The OpenLDAP user pertaining to the credentials entered in this step will be mapped to the local principal account and assigned admin privileges in Rancher. You should therefore make a conscious decision on which LDAP account you use to perform this step.

1. Enter the **username** and **password** for the OpenLDAP account that should be mapped to the local principal account.
2. Click **Authenticate With OpenLDAP** to test the OpenLDAP connection and finalise the setup.

**Result:**

- OpenLDAP authentication is configured.
- The LDAP user pertaining to the entered credentials is mapped to the local principal (administrative) account.

> **Note:**
>
> You will still be able to login using the locally configured `admin` account and password in case of a disruption of LDAP services.

## Annex: Troubleshooting

If you are experiencing issues while testing the connection to the OpenLDAP server, first double-check the credentials entered for the service account as well as the search base configuration. You may also inspect the Rancher logs to help pinpointing the problem cause. Debug logs may contain more detailed information about the error. Please refer to [How can I enable debug logging]({{< baseurl >}}/rancher/v2.x/en/faq/technical/#how-can-i-enable-debug-logging) in this documentation.
