---
title: Configuring OpenLDAP
weight: 1113
aliases:
    - /rancher/v2.0-v2.4/en/tasks/global-configuration/authentication/openldap/
---

_Available as of v2.0.5_

If your organization uses LDAP for user authentication, you can configure Rancher to communicate with an OpenLDAP server to authenticate users. This allows Rancher admins to control access to clusters and projects based on users and groups managed externally in the organisation's central user repository, while allowing end-users to authenticate with their LDAP credentials when logging in to the Rancher UI. 

## Prerequisites

Rancher must be configured with a LDAP bind account (aka service account) to search and retrieve LDAP entries pertaining to users and groups that should have access. It is recommended to not use an administrator account or personal account for this purpose and instead create a dedicated account in OpenLDAP with read-only access to users and groups under the configured search base (see below).

> **Using TLS?**
>
> If the certificate used by the OpenLDAP server is self-signed or not from a recognised certificate authority, make sure have at hand the CA certificate (concatenated with any intermediate certificates) in PEM format. You will have to paste in this certificate during the configuration so that Rancher is able to validate the certificate chain.

## Configure OpenLDAP in Rancher

Configure the settings for the OpenLDAP server, groups and users. For help filling out each field, refer to the [configuration reference.](./openldap-config)

> Before you proceed with the configuration, please familiarise yourself with the concepts of [External Authentication Configuration and Principal Users]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/#external-authentication-configuration-and-principal-users).

1. Log into the Rancher UI using the initial local `admin` account.
2. From the **Global** view, navigate to **Security** > **Authentication**
3. Select **OpenLDAP**. The **Configure an OpenLDAP server** form will be displayed.

### Test Authentication

Once you have completed the configuration, proceed by testing  the connection to the OpenLDAP server. Authentication with OpenLDAP will be enabled implicitly if the test is successful.

> **Note:**
>
> The OpenLDAP user pertaining to the credentials entered in this step will be mapped to the local principal account and assigned administrator privileges in Rancher. You should therefore make a conscious decision on which LDAP account you use to perform this step.

1. Enter the **username** and **password** for the OpenLDAP account that should be mapped to the local principal account.
2. Click **Authenticate With OpenLDAP** to test the OpenLDAP connection and finalise the setup.

**Result:**

- OpenLDAP authentication is configured.
- The LDAP user pertaining to the entered credentials is mapped to the local principal (administrative) account.

> **Note:**
>
> You will still be able to login using the locally configured `admin` account and password in case of a disruption of LDAP services.

## Annex: Troubleshooting

If you are experiencing issues while testing the connection to the OpenLDAP server, first double-check the credentials entered for the service account as well as the search base configuration. You may also inspect the Rancher logs to help pinpointing the problem cause. Debug logs may contain more detailed information about the error. Please refer to [How can I enable debug logging]({{<baseurl>}}/rancher/v2.0-v2.4/en/faq/technical/#how-can-i-enable-debug-logging) in this documentation.
