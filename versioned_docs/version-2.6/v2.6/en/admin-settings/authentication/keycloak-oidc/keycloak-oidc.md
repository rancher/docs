---
title: Configuring Keycloak (OIDC)
description: Create a Keycloak OpenID Connect (OIDC) client and configure Rancher to work with Keycloak. By the end your users will be able to sign into Rancher using their Keycloak logins
weight: 1200
---
If your organization uses [Keycloak Identity Provider (IdP)](https://www.keycloak.org) for user authentication, you can configure Rancher to allow your users to log in using their IdP credentials. Rancher supports integration with Keycloak using the OpenID Connect (OIDC) protocol and the SAML protocol. Both implementations are functionally equivalent when used with Rancher. This page describes the process to configure Rancher to work with Keycloak using the OIDC protocol.

If you prefer to use Keycloak with the SAML protocol instead, refer to [this page]({{<baseurl>}}/rancher/v2.6/en/admin-settings/authentication/keycloak-saml/).

If you have an existing configuration using the SAML protocol and want to switch to the OIDC protocol, refer to [this section](#migrating-from-saml-to-oidc).

## Prerequisites

- On Rancher, Keycloak (SAML) is disabled.
- You must have a [Keycloak IdP Server](https://www.keycloak.org/docs/latest/server_installation/) configured.
- In Keycloak, create a [new OIDC client](https://www.keycloak.org/docs/latest/server_admin/#oidc-clients), with the settings below. See the [Keycloak documentation](https://www.keycloak.org/docs/latest/server_admin/#oidc-clients) for help.

     Setting | Value
     ------------|------------
     `Client ID` | &lt;CLIENT_ID> (e.g. `rancher`)
     `Name` | &lt;CLIENT_NAME> (e.g. `rancher`)
     `Client Protocol` | `openid-connect`
     `Access Type` | `confidential`
     `Valid Redirect URI` | `https://yourRancherHostURL/verify-auth`
 
- In the new OIDC client, create [Mappers](https://www.keycloak.org/docs/latest/server_admin/#_protocol-mappers) to expose the users fields.
  - Create a new "Groups Mapper" with the settings below.

    Setting | Value
    ------------|------------
    `Name` | `Groups Mapper`
    `Mapper Type` | `Group Membership`
    `Token Claim Name` | `groups`
    `Add to ID token` | `OFF`
    `Add to access token` | `OFF`
    `Add to user info` | `ON`

  - Create a new "Client Audience" with the settings below.

    Setting | Value
    ------------|------------
    `Name` | `Client Audience`
    `Mapper Type` | `Audience`
    `Included Client Audience` | &lt;CLIENT_NAME>
    `Add to access token` | `ON`

  - Create a new "Groups Path" with the settings below.

    Setting | Value
    ------------|------------
    `Name` | `Group Path`
    `Mapper Type` | `Group Membership`
    `Token Claim Name` | `full_group_path`
    `Full group path` | `ON`
    `Add to user info` | `ON`

## Configuring Keycloak in Rancher

1. In the Rancher UI, click **☰ > Users & Authentication**.
1. In the left navigation bar, click **Auth Provider**.
1. Select **Keycloak (OIDC)**.
1. Complete the **Configure a Keycloak OIDC account** form. For help with filling the form, see the [configuration reference](#configuration-reference).
1. After you complete the **Configure a Keycloak OIDC account** form, click **Enable**.

    Rancher redirects you to the IdP login page. Enter credentials that authenticate with Keycloak IdP to validate your Rancher Keycloak configuration.

    >**Note:** You may need to disable your popup blocker to see the IdP login page.

**Result:** Rancher is configured to work with Keycloak using the OIDC protocol. Your users can now sign into Rancher using their Keycloak logins.

## Configuration Reference

| Field                     | Description                                                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client ID                 | The `Client ID` of your Keycloak client.                                                                                                                 |
| Client Secret             | The generated `Secret` of your Keycloak client. In the Keycloak console, select **Clients**, select the client you created, select the **Credentials** tab and copy the value of the `Secret` field. |
| Private Key / Certificate | A key/certificate pair to create a secure shell between Rancher and your IdP. Required if HTTPS/SSL is enabled on your Keycloak server.                  |
| Endpoints                 | Choose whether to use the generated values for the `Rancher URL`, `Issue`, and `Auth Endpoint` fields or to provide manual overrides if incorrect.       |
| Keycloak URL              | The URL for your Keycloak server.                                                                                                                        |
| Keycloak Realm            | The name of the realm in which the Keycloak client was created in.                                                                                       |
| Rancher URL               | The URL for your Rancher Server.                                                                                                                         |
| Issuer                    | The URL of your IdP. |
| Auth Endpoint             | The URL where users are redirected to authenticate. |

## Migrating from SAML to OIDC

This section describes the process to transition from using Rancher with Keycloak (SAML) to Keycloak (OIDC).

### Reconfigure Keycloak

1. Change the existing client to use the OIDC protocol. In the Keycloak console, select **Clients**, select the SAML client to migrate, select the **Settings** tab, change `Client Protocol` from `saml` to `openid-connect`, and click **Save**

1. Verify the `Valid Redirect URIs` are still valid.

1. Select the **Mappers** tab and create a new Mapper with the settings below.

    Setting | Value
    ------------|------------
    `Name` | `Groups Mapper`
    `Mapper Type` | `Group Membership`
    `Token Claim Name` | `groups`
    `Add to ID token` | `ON`
    `Add to access token` | `ON`
    `Add to user info` | `ON`

### Reconfigure Rancher

Before configuring Rancher to use Keycloak (OIDC), Keycloak (SAML) must be first disabled. 

1. In the Rancher UI, click **☰ > Users & Authentication**.
1. In the left navigation bar, click **Auth Provider**.
1. Select **Keycloak (SAML)**.
1. Click **Disable**.

Configure Rancher to use Keycloak (OIDC) by following the steps in [this section](#configuring-keycloak-in-rancher).

> **Note:** After configuration is completed, Rancher user permissions will need to be reapplied as they are not automatically migrated.

## Annex: Troubleshooting

If you are experiencing issues while testing the connection to the Keycloak server, first double-check the configuration options of your OIDC client. You may also inspect the Rancher logs to help pinpoint what's causing issues. Debug logs may contain more detailed information about the error. Please refer to [How can I enable debug logging]({{<baseurl>}}/rancher/v2.6/en/faq/technical/#how-can-i-enable-debug-logging) in this documentation.

All Keycloak related log entries will be prepended with either `[generic oidc]` or `[keycloak oidc]`.

### You are not redirected to Keycloak

When you fill the **Configure a Keycloak OIDC account** form and click on **Enable**, you are not redirected to your IdP.

  * Verify your Keycloak client configuration.

### The generated `Issuer` and `Auth Endpoint` are incorrect

  * On the **Configure a Keycloak OIDC account** form, change **Endpoints** to `Specify (advanced)` and override the `Issuer` and `Auth Endpoint` values. To find the values, go to the Keycloak console and select **Realm Settings**, select the **General** tab, and click **OpenID Endpoint Configuration**. The JSON output will display values for `issuer` and `authorization_endpoint`.

### Keycloak Error: "Invalid grant_type"

  * In some cases, this error message may be misleading and is actually caused by setting the `Valid Redirect URI` incorrectly.
