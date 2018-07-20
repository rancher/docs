---
title: Configuring Active Directory (AD)
weight: 1112
aliases:
    - /rancher/v2.x/en/tasks/global-configuration/authentication/active-directory/
---

Rancher can be configured to communicate with an existing Microsoft Active Directory server for the purpose user authentication. This allows users to use their AD account credentials for login into the Rancher UI as well as managing access to clusters and projects based on AD user identity or group membership.

> **Note:**
> 
> Before you start, please familiarise yourself with the concepts of [External Authentication Configuration and Principal Users]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/#external-authentication-configuration-and-principal-users).

## Prerequisites

You'll need to create or obtain from your AD administrator a new AD user to use as service account for Rancher. This user must have sufficient permissions to perform searches and read attributes of users and groups under your AD domain.

Usually a (non-admin) **Domain User** account should be used for this purpose, as by default such user has privileges to view, but not modify other objects in the domain partition. 

Note however, that in some locked-down Active Directory configurations this default behaviour may not apply. In such case you will need to ensure that the service account user has both **Read** and **List Content** permissions granted either on the Base OU (enclosing users and groups) or globally for the domain.

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
| Service Account Username | Enter the username of an AD account with read(-only) access to your domain partition that will be used by Rancher to lookup users and groups (see [Prerequisites](#prerequisites)). You must specify this username in the logon (slashed) format, e.g. "mydomain\rancheruser". |
| Service Account Password | The password for the service account.  |
| Default Login Domain | Enter your AD domain, e.g. "acme". |
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
| Object Class | The name of the object class used for user objects in your domain. |
| Username Attribute | The user attribute whose value is suitable as a display name. |
| Login Attribute | The attribute whose value matches the username part of your users AD credentials, ie. what they would enter when logging in to Rancher. |
| User Member Attribute | The attribute containing the groups that a user is a member of. |
| Search Attribute | When a user enters text to add users or groups, Rancher queries the AD server and attempts to match fields by the attributes provided in this setting. Multiple attributes can be specified by separating them with the pipe ("\|") symbol. As of Rancher v2.0.1, this parameter defaults to: "sAMAccountName\|sn\|givenName".|
| User Enabled Attribute | The attribute containing an integer value representing a bitwise enumeration of user account flags. Rancher uses this to determine if a user account is disabled. You should normally leave this set to the AD standard `userAccountControl`. |
| Disabled Status Bitmask | This is the value of the `User Enabled Attribute` designating a disabled user account. You should normally leave this set to the default value of "2" as specified in the Microsoft Active Directory schema (see [here](https://docs.microsoft.com/en-us/windows/desktop/adschema/a-useraccountcontrol#remarks)). |

---

#### Group Schema

The table below details the parameters for the group schema configuration.

**Table 3: Group schema configuration parameters**

| Parameter | Description |
|:--|:--|
| Object Class | The name of the object class used for group objects in your domain. |
| Name Attribute | The group attribute whose value is suitable for a display name. |
| Group Member User Attribute | The name of the **user attribute** whose format matches the group members in the `Group Member Mapping Attribute`. |
| Group Member Mapping Attribute | The name of the group attribute containing the members of a group. |
| Search Attribute | Attribute used to construct search filters when adding groups to clusters or projects. See description of user schema `Search Attribute`. |
| Group DN Attribute | The name of the group attribute whose format matches the values in the user attribute describing a the user's memberships. See  `User Member Attribute`. |
| Nested Group Membership | This settings defines whether Rancher should resolve nested group memberships. Use only if your organisation makes use of these nested memberships (ie. you have groups that contain other groups as members). |

---

### Test Authentication

When you have completed the configuration, proceed by testing the connection to the AD server with your own AD credentials.

> **Note:**
>
> On completing this step of the configuration, the AD user pertaining to the credentials entered here will be mapped to the local principal account. You should therefore ensure to specifically enter credentials of an AD account that you want to be assigned the administrative role in Rancher going forward.

1. Enter the **username** and **password** for your AD account.
2. Click **Authenticate with Active Directory** to test the Active Directory connection and map this user to the local admin account.

**Result:**

- AD authentication is configured.
- You are signed into Rancher with your AD account (mapped to the local user assigned the administrator role, ie. the local principal account).

> **Note:**
>
> You will still be able to login using the locally configured `admin` account and password in case of a disruption of AD services.

## Annex: Identify Search Base and Schema using ldapsearch

In order to successfully configure AD authentication it is crucial that you provide the correct configuration pertaining to the hirarchy and schema of your AD server.

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

This command performs an LDAP search with the search base set to the domain root (`-b "dc=acme,dc=com"`) and a filter targeting the the user account (`sAMAccountNam=jdoe`), returning the attributes for said user:

![LDAP User]({{< baseurl >}}/img/rancher/ldapsearch-user.png)

Since in this case the user's DN is `CN=John Doe,CN=Users,DC=acme,DC=com` [5], we should configure the **User Search Base** with the parent node DN `CN=Users,DC=acme,DC=com`.

Similarly, based on the DN of the group referenced in the **memberOf** attribute [4], the correct value for the **Group Search Base** would be the parent node of that value, ie. `OU=Groups,DC=acme,DC=com`.

### Identify User Schema

The output of the above `ldapsearch` query also allows to determine the correct values to use in the user schema configuration:

- `Object Class`: **person** [1]
- `Username Attribute`: **name** [2]
- `Login Attribute`: **sAMAccountName** [3]
- `User Member Attribute`: **memberOf** [4]

With regards to the `Search Attribute` parameter, it makes sense here to set it to **sAMAccountName|name**. This will allow users to be added in the Rancher UI both by entering their username or full name.

### Identify Group Schema

Next, we'll query one of the groups associated with this user, in this case `CN=examplegroup,OU=Groups,DC=acme,DC=com`:

```
$ ldapsearch -x -D "acme\jdoe" -w "secret" -p 389 \
-h ad.acme.com -b "ou=groups,dc=acme,dc=com" \
-s sub "CN=examplegroup"
```

This command will inform us on the attributes used for group objects:

![LDAP Group]({{< baseurl >}}/img/rancher/ldapsearch-group.png)

Again, this allows us to determine the correct values to enter in the group schema configuration:

- `Object Class`: **group** [1]
- `Name Attribute`: **name** [2]
- `Group Member Mapping Attribute`: **member** [3]
- `Search Attribute`: **sAMAccountName** [4]

Looking  at the value of the  **member** attribute, we can see that it contains the DN of the referenced user. This  corresponds to the **distinguishedName** attribute in our user object. Accordingly will have to set the value of the `Group Member User Attribute` parameter to this attribute.

In the same way, we can observe that the value in the **memberOf** attribute in the user object corresponds to the **distinguishedName** [5] of the group. We therefore need to set the value for the `Group DN Attribute` parameter to this attribute.

## Annex: Troubleshooting

If you are experiencing issues while testing the connection to the Active Directory server, first double-check the credentials entered for the service account as well as the search base configuration. You may also inspect the Rancher logs to help pinpointing the issue cause. Please refer to [How can I enable debug logging]({{< baseurl >}}/rancher/v2.x/en/faq/technical/#how-can-i-enable-debug-logging) in this documentation.