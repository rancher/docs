---
title: Configuring Keycloak (SAML)
weight: 1200
---
_Available as of v2.1.0_

If your organization uses Keycloak Identity Provider (IdP) for user authentication, you can configure Rancher to allow your users to log in using their IdP credentials.

>**Prerequisites:**
>
>- You must have a [Keycloak IdP Server](https://www.keycloak.org/docs/3.2/server_installation/index.html) configured.
>- Export a `metadata.xml` file from your IdP Server. For more information, see the [Keycloak documentation](https://www.keycloak.org/docs/3.2/server_admin/topics/clients/client-saml.html) to create a SAML Client, under Installation tab, you can find your metadata.

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
