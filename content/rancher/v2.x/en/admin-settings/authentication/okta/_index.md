---
title: Configuring Okta (SAML)
weight: 1210
---

_Available as of v2.2.0_

If your organization uses Okta Identity Provider (IdP) for user authentication, you can configure Rancher to allow your users to log in using their IdP credentials.

## Prerequisites


In Okta, create a SAML Application with the settings below. See the [Okta documentation](https://developer.okta.com/standards/SAML/setting_up_a_saml_application_in_okta) for help.
   
     Setting | Value    
     ------------|------------
      `Single Sign on URL` | `https://yourRancherHostURL/v1-saml/okta/saml/acs` 
      `Audience URI (SP Entity ID)` | `https://yourRancherHostURL/v1-saml/okta/saml/metadata`
 

## Configuring Okta in Rancher


1.	From the **Global** view, select **Security > Authentication** from the main menu.

1.	Select **Okta**.

1.	Complete the **Configure Okta Account** form. The examples below describe how you can map Okta attributes to fields within Rancher. 


    | Field                     | Description                                                                   |
    | ------------------------- | ----------------------------------------------------------------------------- |
    | Display Name Field        | The attribute that contains the display name of users.                    |
    | User Name Field           | The attribute that contains the user name/given name.                     |
    | UID Field                 | An attribute that is unique to every user.                 |
    | Groups Field              | Make entries for managing group memberships.                                 |
    | Rancher API Host          | The URL for your Rancher Server.                                              |
    | Private Key / Certificate | A key/certificate pair to create a secure shell between Rancher and your IdP. |
    | Metadata XML              | The `Identity Provider metadata` file that you find in the application `Sign On` section.  |

    >**Tip:** You can generate a key/certificate pair using an openssl command. For example:
    >    
    >        openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout myservice.key -out myservice.crt


1. After you complete the **Configure Okta Account** form, click **Authenticate with Okta**, which is at the bottom of the page.

    Rancher redirects you to the IdP login page. Enter credentials that authenticate with Okta IdP to validate your Rancher Okta configuration.

    >**Note:** If nothing seems to happen, it's likely because your browser blocked the pop-up. Make sure you disable the pop-up blocker for your rancher domain and whitelist it in any other extensions you might utilize.

**Result:** Rancher is configured to work with Okta. Your users can now sign into Rancher using their Okta logins.

>**Okta Identity Provider Caveats:**
>
>- SAML Protocol does not support search or lookup for users or groups. Therefore, there is no validation on users or groups when adding them to Rancher.
>- When adding users, the exact user IDs (i.e. `UID Field`) must be entered correctly. As you type the user ID, there will be no search for other  user IDs that may match.
>- When adding groups, you *must* select the group from the drop-down that is next to the text box. Rancher assumes that any input from the text box is a user.
>
>   - The group drop-down shows *only* the groups that you are a member of. You will not be able to add groups that you are not a member of.
