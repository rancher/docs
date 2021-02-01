---
title: Configuring Active Directory (AD)
weight: 1112
aliases:
    - /rancher/v2.5/en/tasks/global-configuration/authentication/active-directory/
---

If your organization uses Microsoft Active Directory as central user repository, you can configure Rancher to communicate with an Active Directory server to authenticate users. This allows Rancher admins to control access to clusters and projects based on users and groups managed externally in the Active Directory, while allowing end-users to authenticate with their AD credentials when logging in to the Rancher UI.

Rancher uses LDAP to communicate with the Active Directory server. The authentication flow for Active Directory is therefore the same as for the [OpenLDAP authentication]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/openldap) integration.

> **Note:**
>
> Before you start, please familiarise yourself with the concepts of [External Authentication Configuration and Principal Users]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/#external-authentication-configuration-and-principal-users).

## Prerequisites

You'll need to create or obtain from your AD administrator a new AD user to use as service account for Rancher. This user must have sufficient permissions to perform LDAP searches and read attributes of users and groups under your AD domain.

Usually a (non-admin) **Domain User** account should be used for this purpose, as by default such user has read-only privileges for most objects in the domain partition.

Note however, that in some locked-down Active Directory configurations this default behaviour may not apply. In such case you will need to ensure that the service account user has at least **Read** and **List Content** permissions granted either on the Base OU (enclosing users and groups) or globally for the domain.

> **Using TLS?**
>
> If the certificate used by the AD server is self-signed or not from a recognised certificate authority, make sure have at hand the CA certificate (concatenated with any intermediate certificates) in PEM format. You will have to paste in this certificate during the configuration so that Rancher is able to validate the certificate chain.

## Configuration Steps
### Open Active Directory Configuration

1. Log into the Rancher UI using the initial local `admin` account.
2. From the **Global** view, navigate to **Security** > **Authentication**
3. Select **Active Directory**. The **Configure an AD server** form will be displayed.

### Configure Active Directory Server Settings

In the section titled `1. Configure an Active Directory server`,   complete the fields with the information specific to your Active Directory server. Please refer to the following table for detailed information on the required values for each parameter.

> **Note:**
>
> If you are unsure about the correct values to enter in the  user/group Search Base field, please refer to [Identify Search Base and Schema using ldapsearch](#annex-identify-search-base-and-schema-using-ldapsearch).

**Table 1: AD Server parameters**

| Parameter | Description |
|:--|:--|
| Hostname | Specify the hostname or IP address of the AD server |
| Port | Specify the port at which the Active Directory server is listening for connections. Unencrypted LDAP normally uses the standard port of 389, while LDAPS uses port 636.|
| TLS | Check this box to enable LDAP over SSL/TLS (commonly known as LDAPS).|
| Server Connection Timeout | 	The duration in number of seconds that Rancher waits before considering the AD server unreachable. |
| Service Account Username | Enter the username of an AD account with read-only access to your domain partition (see [Prerequisites](#prerequisites)). The username can be entered in NetBIOS format (e.g. "DOMAIN\serviceaccount") or UPN format (e.g. "serviceaccount@domain.com"). |
| Service Account Password | The password for the service account.  |
| Default Login Domain | When you configure this field with the NetBIOS name of your AD domain, usernames entered without a domain (e.g. "jdoe") will automatically be converted to a slashed,  NetBIOS logon (e.g. "LOGIN_DOMAIN\jdoe") when binding to the AD server. If your users authenticate with the UPN (e.g. "jdoe@acme.com") as username then this field **must** be left empty. |
| User Search Base | The Distinguished Name of the node in your directory tree from which to start searching for user objects. All users must be descendents of this base DN. For example: "ou=people,dc=acme,dc=com".|
| Group Search Base | If your groups live under a different node than the one configured under `User Search Base` you will need to provide the Distinguished Name here. Otherwise leave it empty. For example: "ou=groups,dc=acme,dc=com".|

---

### Configure User/Group Schema

In the section titled `2. Customize Schema` you must provide Rancher with a correct mapping of user and group attributes corresponding to the schema used in your directory.

Rancher uses LDAP queries to search for and retrieve information about users and groups within the Active Directory. The attribute mappings configured in this section are used to construct search filters and resolve group membership. It is therefore paramount that the provided settings reflect the reality of your AD domain.

> **Note:**
>
> If you are unfamiliar with the schema used in your Active Directory domain, please refer to [Identify Search Base and Schema using ldapsearch](#annex-identify-search-base-and-schema-using-ldapsearch) to determine the correct configuration values.

#### User Schema

The table below details the parameters for the user schema section configuration.

**Table 2: User schema configuration parameters**

| Parameter | Description |
|:--|:--|
| Object Class | The name of the object class used for user objects in your domain. If defined, only specify the name of the object class - *don't* include it in an LDAP wrapper such as &(objectClass=xxxx) |
| Username Attribute | The user attribute whose value is suitable as a display name. |
| Login Attribute | The attribute whose value matches the username part of credentials entered by your users when logging in to Rancher. If your users authenticate with their UPN (e.g. "jdoe@acme.com") as username then this field must normally be set to `userPrincipalName`. Otherwise for the old, NetBIOS-style logon names (e.g. "jdoe") it's usually `sAMAccountName`. |
| User Member Attribute | The attribute containing the groups that a user is a member of. |
| Search Attribute | When a user enters text to add users or groups in the UI, Rancher queries the AD server and attempts to match users by the attributes provided in this setting. Multiple attributes can be specified by separating them with the pipe ("\|") symbol. To match UPN usernames (e.g. jdoe@acme.com) you should usually set the value of this field to `userPrincipalName`. |
| Search Filter | This filter gets applied to the list of users that is searched when Rancher attempts to add users to a site access list or tries to add members to clusters or projects. For example, a user search filter could be <code>(&#124;(memberOf=CN=group1,CN=Users,DC=testad,DC=rancher,DC=io)(memberOf=CN=group2,CN=Users,DC=testad,DC=rancher,DC=io))</code>. Note: If the search filter does not use [valid AD search syntax,](https://docs.microsoft.com/en-us/windows/win32/adsi/search-filter-syntax) the list of users will be empty.  |
| User Enabled Attribute | The attribute containing an integer value representing a bitwise enumeration of user account flags. Rancher uses this to determine if a user account is disabled. You should normally leave this set to the AD standard `userAccountControl`. |
| Disabled Status Bitmask | This is the value of the `User Enabled Attribute` designating a disabled user account. You should normally leave this set to the default value of "2" as specified in the Microsoft Active Directory schema (see [here](https://docs.microsoft.com/en-us/windows/desktop/adschema/a-useraccountcontrol#remarks)). |

---

#### Group Schema

The table below details the parameters for the group schema configuration.

**Table 3: Group schema configuration parameters**

| Parameter | Description |
|:--|:--|
| Object Class | The name of the object class used for group objects in your domain. If defined, only specify the name of the object class - *don't* include it in an LDAP wrapper such as &(objectClass=xxxx)  |
| Name Attribute | The group attribute whose value is suitable for a display name. |
| Group Member User Attribute | The name of the **user attribute** whose format matches the group members in the `Group Member Mapping Attribute`. |
| Group Member Mapping Attribute | The name of the group attribute containing the members of a group. |
| Search Attribute | Attribute used to construct search filters when adding groups to clusters or projects. See description of user schema `Search Attribute`. |
| Search Filter | This filter gets applied to the list of groups that is searched when Rancher attempts to add groups to a site access list or tries to add groups to clusters or projects. For example, a group search filter could be <code>(&#124;(cn=group1)(cn=group2))</code>. Note: If the search filter does not use [valid AD search syntax,](https://docs.microsoft.com/en-us/windows/win32/adsi/search-filter-syntax) the list of groups will be empty. |
| Group DN Attribute | The name of the group attribute whose format matches the values in the user attribute describing a the user's memberships. See  `User Member Attribute`. |
| Nested Group Membership | This settings defines whether Rancher should resolve nested group memberships. Use only if your organisation makes use of these nested memberships (ie. you have groups that contain other groups as members. We advise avoiding nested groups when possible). |

---

### Test Authentication

Once you have completed the configuration, proceed by testing the connection to the AD server **using your AD admin account**. If the test is successful, authentication with the configured Active Directory will be enabled implicitly with the account you test with set as admin.

> **Note:**
>
> The AD user pertaining to the credentials entered in this step will be mapped to the local principal account and assigned administrator privileges in Rancher. You should therefore make a conscious decision on which AD account you use to perform this step.

1. Enter the **username** and **password** for the AD account that should be mapped to the local principal account.
2. Click **Authenticate with Active Directory** to finalise the setup.

**Result:**

- Active Directory authentication has been enabled.
- You have been signed into Rancher as administrator using the provided AD credentials.

> **Note:**
>
> You will still be able to login using the locally configured `admin` account and password in case of a disruption of LDAP services.

## Annex: Identify Search Base and Schema using ldapsearch

In order to successfully configure AD authentication it is crucial that you provide the correct configuration pertaining to the hierarchy and schema of your AD server.

The [`ldapsearch`](http://manpages.ubuntu.com/manpages/artful/man1/ldapsearch.1.html) tool allows you to query your AD server to learn about the schema used for user and group objects.

For the purpose of the example commands provided below we will assume:

- The Active Directory server has a hostname of `ad.acme.com`
- The server is listening for unencrypted connections on port `389`
- The Active Directory domain is `acme`
- You have a valid AD account with the username `jdoe` and password `secret`

### Identify Search Base

First we will use `ldapsearch` to identify the Distinguished Name (DN) of the parent node(s) for users and groups:

```
$ ldapsearch -x -D "acme\jdoe" -w "secret" -p 389 \
-h ad.acme.com -b "dc=acme,dc=com" -s sub "sAMAccountName=jdoe"
```

This command performs an LDAP search with the search base set to the domain root (`-b "dc=acme,dc=com"`) and a filter targeting the user account (`sAMAccountNam=jdoe`), returning the attributes for said user:

{{< img "/img/rancher/ldapsearch-user.png" "LDAP User">}}

Since in this case the user's DN is `CN=John Doe,CN=Users,DC=acme,DC=com` [5], we should configure the **User Search Base** with the parent node DN `CN=Users,DC=acme,DC=com`.

Similarly, based on the DN of the group referenced in the **memberOf** attribute [4], the correct value for the **Group Search Base** would be the parent node of that value, ie. `OU=Groups,DC=acme,DC=com`.

### Identify User Schema

The output of the above `ldapsearch` query also allows to determine the correct values to use in the user schema configuration:

- `Object Class`: **person** [1]
- `Username Attribute`: **name** [2]
- `Login Attribute`: **sAMAccountName** [3]
- `User Member Attribute`: **memberOf** [4]

> **Note:**
>
> If the AD users in our organisation were to authenticate with their UPN (e.g. jdoe@acme.com) instead of the short logon name, then we would have to set the `Login Attribute` to **userPrincipalName** instead.

We'll also set the `Search Attribute` parameter to **sAMAccountName|name**. That way users can be added to clusters/projects in the Rancher UI either by entering their username or full name.

### Identify Group Schema

Next, we'll query one of the groups associated with this user, in this case `CN=examplegroup,OU=Groups,DC=acme,DC=com`:

```
$ ldapsearch -x -D "acme\jdoe" -w "secret" -p 389 \
-h ad.acme.com -b "ou=groups,dc=acme,dc=com" \
-s sub "CN=examplegroup"
```

This command will inform us on the attributes used for group objects:

{{< img "/img/rancher/ldapsearch-group.png" "LDAP Group">}}

Again, this allows us to determine the correct values to enter in the group schema configuration:

- `Object Class`: **group** [1]
- `Name Attribute`: **name** [2]
- `Group Member Mapping Attribute`: **member** [3]
- `Search Attribute`: **sAMAccountName** [4]

Looking  at the value of the  **member** attribute, we can see that it contains the DN of the referenced user. This  corresponds to the **distinguishedName** attribute in our user object. Accordingly will have to set the value of the `Group Member User Attribute` parameter to this attribute.

In the same way, we can observe that the value in the **memberOf** attribute in the user object corresponds to the **distinguishedName** [5] of the group. We therefore need to set the value for the `Group DN Attribute` parameter to this attribute.

## Annex: Troubleshooting

If you are experiencing issues while testing the connection to the Active Directory server, first double-check the credentials entered for the service account as well as the search base configuration. You may also inspect the Rancher logs to help pinpointing the problem cause. Debug logs may contain more detailed information about the error. Please refer to [How can I enable debug logging]({{<baseurl>}}/rancher/v2.5/en/faq/technical/#how-can-i-enable-debug-logging) in this documentation.
