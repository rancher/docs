---
title: Configuring Keycloak (SAML)
weight: 1200
---
_Available as of v2.1.0_

If your organization uses Keycloak Identity Provider (IdP) for user authentication, you can configure Rancher to allow your users to log in using their IdP credentials.

>**Prerequisites:**
>
>- You must have a [Keycloak IdP Server](https://www.keycloak.org/docs/latest/server_installation/) configured.
>- In Keycloak, create a new SAML client, with the following parameters:
>   * Make sure either "Sign Documents" or "Sign assertions" is set to ON. Both can be turned ON too.
>   * All other options set to OFF
>   * Client ID: https://yourRancherHostURL/v1-saml/keycloak/saml/metadata
>   * Client Name: yourClientName (e.g. "rancher")
>   * Client Protocol: saml
>   * Valid Redirect URI: https://yourRancherHostURL/v1-saml/keycloak/saml/acs
>- Export a `metadata.xml` file from your Keycloak client. Under Installation tab, select "SAML Metadata IDPSSODescriptor" as "Format Option" and download your file
>
> For more information, see the [Keycloak documentation](https://www.keycloak.org/docs/latest/server_admin/#saml-clients) to create a SAML Client.


1.	From the **Global** view, select **Security > Authentication** from the main menu.

1.	Select **Keycloak**.

1.	Complete the **Configure Keycloak Account** form. Keycloak IdP lets you specify what data store you want to use. You can either add a database or use an existing LDAP server. For example, if you select your Active Directory (AD) server, the examples below describe how you can map AD attributes to fields within Rancher.


    | Field                     | Description                                                                   |
    | ------------------------- | ----------------------------------------------------------------------------- |
    | Display Name Field        | The AD attribute that contains the display name of users.                     |
    | User Name Field           | The AD attribute that contains the user name/given name.                      |
    | UID Field                 | An AD attribute that is unique to every user.                                 |
    | Groups Field              | Make entries for managing group memberships.                                  |
    | Rancher API Host          | The URL for your Rancher Server.                                              |
    | Private Key / Certificate | A key/certificate pair to create a secure shell between Rancher and your IdP. |
    | IDP-metadata              | The `metadata.xml` file that you exported from your IdP server.               |

    >**Tip:** You can generate a key/certificate pair using an openssl command. For example:
    >    
    >        openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout myservice.key -out myservice.cert


1. After you complete the **Configure Keycloak Account** form, click **Authenticate with Keycloak**, which is at the bottom of the page.

    Rancher redirects you to the IdP login page. Enter credentials that authenticate with Keycloak IdP to validate your Rancher Keycloak configuration.

    >**Note:** You may have to disable your popup blocker to see the IdP login page.

**Result:** Rancher is configured to work with Keycloak. Your users can now sign into Rancher using their Keycloak logins.

>**Keycloak Identity Provider Caveats:**
>
>- SAML Protocol does not support search or lookup for users or groups. Therefore, there is no validation on users or groups when adding them to Rancher.
>- When adding users, the exact user IDs (i.e. `UID Field`) must be entered correctly. As you type the user ID, there will be no search for other  user IDs that may match.
>- When adding groups, you *must* select the group from the drop-down that is next to the text box. Rancher assumes that any input from the text box is a user.
>   - The group drop-down shows *only* the groups that you are a member of. You will not be able to add groups that you are not a member of.

## Annex: Troubleshooting

If you are experiencing issues while testing the connection to the Keycloak server, first double-check the confiuration option of your SAML client. You may also inspect the Rancher logs to help pinpointing the problem cause. Debug logs may contain more detailed information about the error. Please refer to [How can I enable debug logging]({{< baseurl >}}/rancher/v2.x/en/faq/technical/#how-can-i-enable-debug-logging) in this documentation.

### You are not redirected to Keycloak

When you click on "Authenticate with Keycloak", your are not redirected to your IdP.

  * Verify your Keycloak client configuration
  * Make sure "Force Post Binding" set to OFF


### Forbidden message displayed after IdP login

You are correctly redirected to your IdP login page and you are able to enter your credentials, however you get a "Forbidden" message afterwards.

  * Check Rancher debug log.
  * If "ERROR: either the Response or Assertion must be signed" pops up, make sure either "Sign Documents" or "Sign assertions" is set to ON in your Keycloak client

### Keycloak error "We're sorry, failed to process response"

  * Check your Keycloak log
  * If "failed: org.keycloak.common.VerificationException: Client does not have a public key." in the log, you probably turned ON "Encrypt Assertions" in your Keycloak client. Make sure to turn it OFF.

### Keycloak error "We're sorry, invalid requester"

  * Check your Keycloak log
  * If "request validation failed: org.keycloak.common.VerificationException: SigAlg was null." in the log, you probably turned ON "Client Signature Required" in your Keycloak client. Make sure to turn it OFF.
