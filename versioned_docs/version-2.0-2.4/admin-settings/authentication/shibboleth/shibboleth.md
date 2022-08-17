---
title: Configuring Shibboleth (SAML)
weight: 1210
---

_Available as of v2.4.0_

If your organization uses Shibboleth Identity Provider (IdP) for user authentication, you can configure Rancher to allow your users to log in to Rancher using their Shibboleth credentials.

In this configuration, when Rancher users log in, they will be redirected to the Shibboleth IdP to enter their credentials. After authentication, they will be redirected back to the Rancher UI.

If you also configure OpenLDAP as the back end to Shibboleth, it will return a SAML assertion to Rancher with user attributes that include groups. Then the authenticated user will be able to access resources in Rancher that their groups have permissions for.

> The instructions in this section assume that you understand how Rancher, Shibboleth, and OpenLDAP work together. For a more detailed explanation of how it works, refer to [this page.](./about)

This section covers the following topics:

- [Setting up Shibboleth in Rancher](#setting-up-shibboleth-in-rancher)
  - [Shibboleth Prerequisites](#shibboleth-prerequisites)
  - [Configure Shibboleth in Rancher](#configure-shibboleth-in-rancher)
  - [SAML Provider Caveats](#saml-provider-caveats)
- [Setting up OpenLDAP in Rancher](#setting-up-openldap-in-rancher)
  - [OpenLDAP Prerequisites](#openldap-prerequisites)
  - [Configure OpenLDAP in Rancher](#configure-openldap-in-rancher)
  - [Troubleshooting](#troubleshooting)

# Setting up Shibboleth in Rancher

### Shibboleth Prerequisites
>
>- You must have a Shibboleth IdP Server configured.
>- Following are the Rancher Service Provider URLs needed for configuration:
Metadata URL: `https://<rancher-server>/v1-saml/shibboleth/saml/metadata`
Assertion Consumer Service (ACS) URL: `https://<rancher-server>/v1-saml/shibboleth/saml/acs`
>- Export a `metadata.xml` file from your IdP Server. For more information, see the [Shibboleth documentation.](https://wiki.shibboleth.net/confluence/display/SP3/Home)

### Configure Shibboleth in Rancher
If your organization uses Shibboleth for user authentication, you can configure Rancher to allow your users to log in using their IdP credentials.

1.	From the **Global** view, select **Security > Authentication** from the main menu.

1.	Select **Shibboleth**.

1.	Complete the **Configure Shibboleth Account** form. Shibboleth IdP lets you specify what data store you want to use. You can either add a database or use an existing ldap server. For example, if you select your Active Directory (AD) server, the examples below describe how you can map AD attributes to fields within Rancher.

    1. **Display Name Field**: Enter the AD attribute that contains the display name of users (example: `displayName`).

	1. **User Name Field**: Enter the AD attribute that contains the user name/given name (example: `givenName`).

    1. **UID Field**: Enter an AD attribute that is unique to every user (example: `sAMAccountName`, `distinguishedName`).

    1. **Groups Field**: Make entries for managing group memberships (example: `memberOf`).

    1. **Rancher API Host**: Enter the URL for your Rancher Server.

	1. **Private Key** and **Certificate**: This is a key-certificate pair to create a secure shell between Rancher and your IdP.

        You can generate one using an openssl command. For example:

        ```
        openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
        ```
    1. **IDP-metadata**: The `metadata.xml` file that you exported from your IdP server.


1. After you complete the **Configure Shibboleth Account** form, click **Authenticate with Shibboleth**, which is at the bottom of the page.

    Rancher redirects you to the IdP login page. Enter credentials that authenticate with Shibboleth IdP to validate your Rancher Shibboleth configuration.

    >**Note:** You may have to disable your popup blocker to see the IdP login page.

**Result:** Rancher is configured to work with Shibboleth. Your users can now sign into Rancher using their Shibboleth logins.

### SAML Provider Caveats

If you configure Shibboleth without OpenLDAP, the following caveats apply due to the fact that SAML Protocol does not support search or lookup for users or groups.

- There is no validation on users or groups when assigning permissions to them in Rancher.
- When adding users, the exact user IDs (i.e. UID Field) must be entered correctly. As you type the user ID, there will be no search for other user IDs that may match.
- When adding groups, you must select the group from the drop-down that is next to the text box. Rancher assumes that any input from the text box is a user.
- The group drop-down shows only the groups that you are a member of. You will not be able to add groups that you are not a member of.

To enable searching for groups when assigning permissions in Rancher, you will need to configure a back end for the SAML provider that supports groups, such as OpenLDAP.

# Setting up OpenLDAP in Rancher

If you also configure OpenLDAP as the back end to Shibboleth, it will return a SAML assertion to Rancher with user attributes that include groups. Then authenticated users will be able to access resources in Rancher that their groups have permissions for.

### OpenLDAP Prerequisites

Rancher must be configured with a LDAP bind account (aka service account) to search and retrieve LDAP entries pertaining to users and groups that should have access. It is recommended to not use an administrator account or personal account for this purpose and instead create a dedicated account in OpenLDAP with read-only access to users and groups under the configured search base (see below).

> **Using TLS?**
>
> If the certificate used by the OpenLDAP server is self-signed or not from a recognized certificate authority, make sure have at hand the CA certificate (concatenated with any intermediate certificates) in PEM format. You will have to paste in this certificate during the configuration so that Rancher is able to validate the certificate chain.

### Configure OpenLDAP in Rancher

Configure the settings for the OpenLDAP server, groups and users. For help filling out each field, refer to the [configuration reference.]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/openldap/openldap-config) Note that nested group membership is not available for Shibboleth.

> Before you proceed with the configuration, please familiarise yourself with the concepts of [External Authentication Configuration and Principal Users]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/#external-authentication-configuration-and-principal-users).

1. Log into the Rancher UI using the initial local `admin` account.
2. From the **Global** view, navigate to **Security** > **Authentication**
3. Select **OpenLDAP**. The **Configure an OpenLDAP server** form will be displayed.

# Troubleshooting

If you are experiencing issues while testing the connection to the OpenLDAP server, first double-check the credentials entered for the service account as well as the search base configuration. You may also inspect the Rancher logs to help pinpointing the problem cause. Debug logs may contain more detailed information about the error. Please refer to [How can I enable debug logging]({{<baseurl>}}/rancher/v2.0-v2.4/en/faq/technical/#how-can-i-enable-debug-logging) in this documentation.
