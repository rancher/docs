---
title: Configuring SambaBox
weight: 1112
aliases:
    - /rancher/v2.x/en/tasks/global-configuration/authentication/sambabox/
---

SambaBox is all in one appliance based on Samba project. So it is compatible and best alternative for Microsoft Active directory. SambaBox can work bidirectional with Microsoft Active Directory. 

If your organization uses SambaBox as central user repository, you can configure Rancher to communicate with an SambaBox server to authenticate users. This allows Rancher admins to control access to clusters and projects based on users and groups managed externally in the SambaBox, while allowing end-users to authenticate with their SambaBox credentials when logging in to the Rancher UI.

Rancher uses LDAP to communicate with the SambaBox server. The authentication flow for SambaBox is therefore the same as for the [OpenLDAP authentication]({{<baseurl>}}/rancher/v2.x/en/admin-settings/authentication/openldap) integration.

> **Note:**
>
> Before you start, please familiarise yourself with the concepts of [External Authentication Configuration and Principal Users]({{<baseurl>}}/rancher/v2.x/en/admin-settings/authentication/#external-authentication-configuration-and-principal-users).

## Prerequisites

You'll need to create or obtain from your SambaBox or AD administrator a new SambaBox or AD user to use as service account for Rancher. This user must have sufficient permissions to perform LDAP searches and read attributes of users and groups under your SambaBox or AD domain.

Usually a (non-admin) **Domain User** account should be used for this purpose, as by default such user has read-only privileges for most objects in the domain partition.

If you would like to use a service account user, you will need to ensure that the service account user has at least **Read** and **List Content** permissions granted either on the Base OU (enclosing users and groups) or globally for the domain.

> **Using TLS?**
>
> If the certificate used by the SambaBox server is self-signed or not from a recognised certificate authority, make sure have at hand the CA certificate (concatenated with any intermediate certificates) in PEM format. You will have to paste in this certificate during the configuration so that Rancher is able to validate the certificate chain.

## Configuration Steps
### Open SambaBox Configuration

1. Log into the Rancher UI using the initial local `admin` account.
2. From the **Global** view, navigate to **Security** > **Authentication**
3. Select **SambaBox**. The **Configure an SambaBox server** form will be displayed.

### Configure SambaBox Server Settings

In the section titled `1. Configure an SambaBox server`,   complete the fields with the information specific to your SambaBox server. Please refer to the following table for detailed information on the required values for each parameter.

> **Note:**
>
> If you are unsure about the correct values to enter in the  user/group Search Base field, please refer to [Identify Search Base and Schema using ldapsearch](#annex-identify-search-base-and-schema-using-ldapsearch).

**Table 1: SambaBox Server parameters**

| Parameter | Description |
|:--|:--|
| Hostname | Specify the hostname or IP address of the SambaBox server |
| Port | Specify the port at which the SambaBox server is listening for connections. Unencrypted LDAP normally uses the standard port of 389, while LDAPS uses port 636.|
| TLS | Check this box to enable LDAP over SSL/TLS (commonly known as LDAPS).|
| Server Connection Timeout | 	The duration in number of seconds that Rancher waits before considering the SambaBox server unreachable. |
| Service Account Username | Enter the username of an SambaBox or AD account with read-only access to your domain partition (see [Prerequisites](#prerequisites)). The username can be entered in NetBIOS format (e.g. "DOMAIN\serviceaccount") or UPN format (e.g. "serviceaccount@domain.com"). |
| Service Account Password | The password for the service account.  |
| Default Login Domain | When you configure this field with the NetBIOS name of your SambaBox or AD domain, usernames entered without a domain (e.g. "jdoe") will automatically be converted to a slashed,  NetBIOS logon (e.g. "LOGIN_DOMAIN\jdoe") when binding to the AD server. If your users authenticate with the UPN (e.g. "jdoe@acme.com") as username then this field **must** be left empty. |
| User Search Base | The Distinguished Name of the node in your directory tree from which to start searching for user objects. All users must be descendents of this base DN. For example: "ou=people,dc=acme,dc=com".|
| Group Search Base | If your groups live under a different node than the one configured under `User Search Base` you will need to provide the Distinguished Name here. Otherwise leave it empty. For example: "ou=groups,dc=acme,dc=com".|

---

### Test Authentication

Once you have completed the configuration, proceed by testing the connection to the SambaBox server **using your SambaBox admin account**. If the test is successful, authentication with the configured SambaBox will be enabled implicitly with the account you test with set as admin.

> **Note:**
>
> The SambaBox user pertaining to the credentials entered in this step will be mapped to the local principal account and assigned administrator privileges in Rancher. You should therefore make a conscious decision on which SambaBox account you use to perform this step.

1. Enter the **username** and **password** for the AD account that should be mapped to the local principal account.
2. Click **Authenticate with SambaBox** to finalise the setup.

**Result:**

- SambaBox authentication has been enabled.
- You have been signed into Rancher as administrator using the provided SambaBox credentials.

> **Note:**
>
> You will still be able to login using the locally configured `admin` account and password in case of a disruption of LDAP services.
