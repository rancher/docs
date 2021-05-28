---
title: Configuring Keycloak (SAML)
description: Create a Keycloak SAML client and configure Rancher to work with Keycloak. By the end your users will be able to sign into Rancher using their Keycloak logins
weight: 1200
---

If your organization uses Keycloak Identity Provider (IdP) for user authentication, you can configure Rancher to allow your users to log in using their IdP credentials.

## Prerequisites

- You must have a [Keycloak IdP Server](https://www.keycloak.org/docs/latest/server_installation/) configured.
- In Keycloak, create a [new SAML client](https://www.keycloak.org/docs/latest/server_admin/#saml-clients), with the settings below. See the [Keycloak documentation](https://www.keycloak.org/docs/latest/server_admin/#saml-clients) for help.

     Setting | Value
     ------------|------------
      `Sign Documents` | `ON` <sup>1</sup>
      `Sign Assertions` | `ON` <sup>1</sup>
      All other `ON/OFF` Settings | `OFF`
      `Client ID` | Either `https://yourRancherHostURL/v1-saml/keycloak/saml/metadata` or the value configured in the `Entry ID Field` of the Rancher Keycloak configuration<sup>2</sup>
      `Client Name` | <CLIENT_NAME> (e.g. `rancher`)
      `Client Protocol` | `SAML`
      `Valid Redirect URI` | `https://yourRancherHostURL/v1-saml/keycloak/saml/acs`

      ><sup>1</sup>: Optionally, you can enable either one or both of these settings.
      ><sup>2</sup>: Rancher SAML metadata won't be generated until a SAML provider is configured and saved.
  
  {{< img "/img/rancher/keycloak/keycloak-saml-client-configuration.png" "">}}
      
- In the new SAML client, create Mappers to expose the users fields
  - Add all "Builtin Protocol Mappers"
    {{< img "/img/rancher/keycloak/keycloak-saml-client-builtin-mappers.png" "">}}
  - Create a new "Group list" mapper to map the member attribute to a user's groups
    {{< img "/img/rancher/keycloak/keycloak-saml-client-group-mapper.png" "">}}       
- Export a `metadata.xml` file from your Keycloak client:
  From the `Installation` tab, choose the `SAML Metadata IDPSSODescriptor` format option and download your file.
  
  >**Note**
  > Keycloak versions 6.0.0 and up no longer provide the IDP metadata under the `Installation` tab.
  > You can still get the XML from the following url:
  >  
  > `https://{KEYCLOAK-URL}/auth/realms/{REALM-NAME}/protocol/saml/descriptor`
  >  
  > The XML obtained from this URL contains `EntitiesDescriptor` as the root element. Rancher expects the root element to be `EntityDescriptor` rather than `EntitiesDescriptor`. So before passing this XML to Rancher, follow these steps to adjust it:
  >  
  >    * Copy all the attributes from `EntitiesDescriptor` to the `EntityDescriptor` that are not present.
  >    * Remove the `<EntitiesDescriptor>` tag from the beginning.
  >    * Remove the `</EntitiesDescriptor>` from the end of the xml.
  >  
  > You are left with something similar as the example below:
  >  
  > ```
  > <EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:dsig="http://www.w3.org/2000/09/xmldsig#" entityID="https://{KEYCLOAK-URL}/auth/realms/{REALM-NAME}">
  >   .... 
  > </EntityDescriptor>
  > ```

## Configuring Keycloak in Rancher


1.	From the **Global** view, select **Security > Authentication** from the main menu.

1.	Select **Keycloak**.

1.	Complete the **Configure Keycloak Account** form.


    | Field                     | Description                                                                                                                                              |
    | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Display Name Field        | The attribute that contains the display name of users. <br/><br/>Example: `givenName`                                                                    |
    | User Name Field           | The attribute that contains the user name/given name. <br/><br/>Example: `email`                                                                         |
    | UID Field                 | An attribute that is unique to every user. <br/><br/>Example: `email`                                                                                    |
    | Groups Field              | Make entries for managing group memberships. <br/><br/>Example: `member`                                                                                 |
    | Entity ID Field           | The ID that needs to be configured as a client ID in the Keycloak client. <br/><br/>Default: `https://yourRancherHostURL/v1-saml/keycloak/saml/metadata` |
    | Rancher API Host          | The URL for your Rancher Server.                                                                                                                         |
    | Private Key / Certificate | A key/certificate pair to create a secure shell between Rancher and your IdP.                                                                            |
    | IDP-metadata              | The `metadata.xml` file that you exported from your IdP server.                                                                                          |

    >**Tip:** You can generate a key/certificate pair using an openssl command. For example:
    >
    >        openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout myservice.key -out myservice.cert


1. After you complete the **Configure Keycloak Account** form, click **Authenticate with Keycloak**, which is at the bottom of the page.

    Rancher redirects you to the IdP login page. Enter credentials that authenticate with Keycloak IdP to validate your Rancher Keycloak configuration.

    >**Note:** You may have to disable your popup blocker to see the IdP login page.

**Result:** Rancher is configured to work with Keycloak. Your users can now sign into Rancher using their Keycloak logins.

{{< saml_caveats >}}

## Annex: Troubleshooting

If you are experiencing issues while testing the connection to the Keycloak server, first double-check the configuration option of your SAML client. You may also inspect the Rancher logs to help pinpointing the problem cause. Debug logs may contain more detailed information about the error. Please refer to [How can I enable debug logging]({{<baseurl>}}/rancher/v2.5/en/faq/technical/#how-can-i-enable-debug-logging) in this documentation.

### You are not redirected to Keycloak

When you click on **Authenticate with Keycloak**, your are not redirected to your IdP.

  * Verify your Keycloak client configuration.
  * Make sure `Force Post Binding` set to `OFF`.


### Forbidden message displayed after IdP login

You are correctly redirected to your IdP login page and you are able to enter your credentials, however you get a `Forbidden` message afterwards.

  * Check the Rancher debug log.
  * If the log displays `ERROR: either the Response or Assertion must be signed`, make sure either `Sign Documents` or `Sign assertions` is set to `ON` in your Keycloak client.

### HTTP 502 when trying to access /v1-saml/keycloak/saml/metadata

This is usually due to the metadata not being created until a SAML provider is configured.
Try configuring and saving keycloak as your SAML provider and then accessing the metadata.

### Keycloak Error: "We're sorry, failed to process response"

  * Check your Keycloak log.
  * If the log displays `failed: org.keycloak.common.VerificationException: Client does not have a public key`, set `Encrypt Assertions` to `OFF` in your Keycloak client.

### Keycloak Error: "We're sorry, invalid requester"

  * Check your Keycloak log.
  * If the log displays `request validation failed: org.keycloak.common.VerificationException: SigAlg was null`, set `Client Signature Required` to `OFF` in your Keycloak client.
