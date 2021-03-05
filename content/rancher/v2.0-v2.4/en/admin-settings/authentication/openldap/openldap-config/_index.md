---
title: OpenLDAP Configuration Reference
weight: 2
---

This section is intended to be used as a reference when setting up an OpenLDAP authentication provider in Rancher.

For further details on configuring OpenLDAP, refer to the [official documentation.](https://www.openldap.org/doc/)

> Before you proceed with the configuration, please familiarize yourself with the concepts of [External Authentication Configuration and Principal Users]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/#external-authentication-configuration-and-principal-users).

- [Background: OpenLDAP Authentication Flow](#background-openldap-authentication-flow)
- [OpenLDAP server configuration](#openldap-server-configuration)
- [User/group schema configuration](#user-group-schema-configuration)
  - [User schema configuration](#user-schema-configuration)
  - [Group schema configuration](#group-schema-configuration)

## Background: OpenLDAP Authentication Flow 
 
1. When a user attempts to login with his LDAP credentials, Rancher creates an initial bind to the LDAP server using a service account with permissions to search the directory and read user/group attributes. 
2. Rancher then searches the directory for the user by using a search filter based on the provided username and configured attribute mappings. 
3. Once the user has been found, he is authenticated with another LDAP bind request using the user's DN and provided password. 
4. Once authentication succeeded, Rancher then resolves the group memberships both from the membership attribute in the user's object and by performing a group search based on the configured user mapping attribute.

# OpenLDAP Server Configuration

You will need to enter the address, port, and protocol to connect to your OpenLDAP server. `389` is the standard port for insecure traffic, `636` for TLS traffic.

> **Using TLS?**
>
> If the certificate used by the OpenLDAP server is self-signed or not from a recognized certificate authority, make sure have at hand the CA certificate (concatenated with any intermediate certificates) in PEM format. You will have to paste in this certificate during the configuration so that Rancher is able to validate the certificate chain.

If you are in doubt about the correct values to enter in the user/group Search Base configuration fields, consult your LDAP administrator or refer to the section [Identify Search Base and Schema using ldapsearch]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/ad/#annex-identify-search-base-and-schema-using-ldapsearch) in the Active Directory authentication documentation.

<figcaption>OpenLDAP Server Parameters</figcaption>

| Parameter | Description |
|:--|:--|
| Hostname | Specify the hostname or IP address of the OpenLDAP server |
| Port | Specify the port at which the OpenLDAP server is listening for connections. Unencrypted LDAP normally uses the standard port of 389, while LDAPS uses port 636.|
| TLS | Check this box to enable LDAP over SSL/TLS (commonly known as LDAPS). You will also need to paste in the CA certificate if the server uses a self-signed/enterprise-signed certificate. |
| Server Connection Timeout | 	The duration in number of seconds that Rancher waits before considering the server unreachable. |
| Service Account Distinguished Name | Enter the Distinguished Name (DN) of the user that should be used to bind, search and retrieve LDAP entries. |
| Service Account Password | The password for the service account.  |
| User Search Base | Enter the Distinguished Name of the node in your directory tree from which to start searching for user objects. All users must be descendents of this base DN. For example: "ou=people,dc=acme,dc=com".|
| Group Search Base | If your groups live under a different node than the one configured under `User Search Base` you will need to provide the Distinguished Name here. Otherwise leave this field empty. For example: "ou=groups,dc=acme,dc=com".|

# User/Group Schema Configuration

If your OpenLDAP directory deviates from the standard OpenLDAP schema, you must complete the **Customize Schema** section to match it.

Note that the attribute mappings configured in this section are used by Rancher to construct search filters and resolve group membership. It is therefore always recommended to verify that the configuration here matches the schema used in your OpenLDAP.

If you are unfamiliar with the user/group schema used in the OpenLDAP server, consult your LDAP administrator or refer to the section [Identify Search Base and Schema using ldapsearch]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/ad/#annex-identify-search-base-and-schema-using-ldapsearch) in the Active Directory authentication documentation.

### User Schema Configuration

The table below details the parameters for the user schema configuration.

<figcaption>User Schema Configuration Parameters</figcaption>

| Parameter | Description |
|:--|:--|
| Object Class | The name of the object class used for user objects in your domain. If defined, only specify the name of the object class - *don't* include it in an LDAP wrapper such as &(objectClass=xxxx) |
| Username Attribute | The user attribute whose value is suitable as a display name. |
| Login Attribute | The attribute whose value matches the username part of credentials entered by your users when logging in to Rancher. This is typically `uid`. |
| User Member Attribute | The user attribute containing the Distinguished Name of groups a user is member of. Usually this is one of `memberOf` or `isMemberOf`. |
| Search Attribute | When a user enters text to add users or groups in the UI, Rancher queries the LDAP server and attempts to match users by the attributes provided in this setting. Multiple attributes can be specified by separating them with the pipe ("\|") symbol. |
| User Enabled Attribute | If the schema of your OpenLDAP server supports a user attribute whose value can be evaluated to determine if the account is disabled or locked, enter the name of that attribute. The default OpenLDAP schema does not support this and the field should usually be left empty. |
| Disabled Status Bitmask | This is the value for a disabled/locked user account. The parameter is ignored if `User Enabled Attribute` is empty. |

### Group Schema Configuration

The table below details the parameters for the group schema configuration.

<figcaption>Group Schema Configuration Parameters<figcaption>

| Parameter | Description |
|:--|:--|
| Object Class | The name of the object class used for group entries in your domain. If defined, only specify the name of the object class - *don't* include it in an LDAP wrapper such as &(objectClass=xxxx) |
| Name Attribute | The group attribute whose value is suitable for a display name. |
| Group Member User Attribute | The name of the **user attribute** whose format matches the group members in the `Group Member Mapping Attribute`. |
| Group Member Mapping Attribute | The name of the group attribute containing the members of a group. |
| Search Attribute | Attribute used to construct search filters when adding groups to clusters or projects in the UI. See description of user schema `Search Attribute`. |
| Group DN Attribute | The name of the group attribute whose format matches the values in the user's group membership attribute. See  `User Member Attribute`. |
| Nested Group Membership | This settings defines whether Rancher should resolve nested group memberships. Use only if your organization makes use of these nested memberships (ie. you have groups that contain other groups as members). This option is disabled if you are using Shibboleth. |