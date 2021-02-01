---
title: Configuring Google OAuth
---
_Available as of v2.3.0_

If your organization uses G Suite for user authentication, you can configure Rancher to allow your users to log in using their G Suite credentials.

Only admins of the G Suite domain have access to the Admin SDK. Therefore, only G Suite admins can configure Google OAuth for Rancher.

Within Rancher, only administrators or users with the **Manage Authentication** [global role]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/) can configure authentication.

# Prerequisites
- You must have a [G Suite admin account](https://admin.google.com) configured.
- G Suite requires a [top private domain FQDN](https://github.com/google/guava/wiki/InternetDomainNameExplained#public-suffixes-and-private-domains) as an authorized domain. One way to get an FQDN is by creating an A-record in Route53 for your Rancher server. You do not need to update your Rancher Server URL setting with that record, because there could be clusters using that URL.
- You must have the Admin SDK API enabled for your G Suite domain. You can enable it using the steps on [this page.](https://support.google.com/a/answer/60757?hl=en)

After the Admin SDK API is enabled, your G Suite domain's API screen should look like this:
![Enable Admin APIs]({{<baseurl>}}/img/rancher/Google-Enable-APIs-Screen.png)

# Setting up G Suite for OAuth with Rancher
Before you can set up Google OAuth in Rancher, you need to log in to your G Suite account and do the following:

1. [Add Rancher as an authorized domain in G Suite](#1-adding-rancher-as-an-authorized-domain)
1. [Generate OAuth2 credentials for the Rancher server](#2-creating-oauth2-credentials-for-the-rancher-server)
1. [Create service account credentials for the Rancher server](#3-creating-service-account-credentials)
1. [Register the service account key as an OAuth Client](#4-register-the-service-account-key-as-an-oauth-client)

### 1. Adding Rancher as an Authorized Domain
1. Click [here](https://console.developers.google.com/apis/credentials) to go to credentials page of your Google domain.
1. Select your project and click **OAuth consent screen.**
![OAuth Consent Screen]({{<baseurl>}}/img/rancher/Google-OAuth-consent-screen-tab.png)
1. Go to **Authorized Domains** and enter the top private domain of your Rancher server URL in the list. The top private domain is the rightmost superdomain. So for example, www.foo.co.uk a top private domain of foo.co.uk. For more information on top-level domains, refer to [this article.](https://github.com/google/guava/wiki/InternetDomainNameExplained#public-suffixes-and-private-domains)
1. Go to **Scopes for Google APIs** and make sure **email,** **profile** and **openid** are enabled.

**Result:** Rancher has been added as an authorized domain for the Admin SDK API.

### 2. Creating OAuth2 Credentials for the Rancher Server
1. Go to the Google API console, select your project, and go to the [credentials page.](https://console.developers.google.com/apis/credentials)
![Credentials]({{<baseurl>}}/img/rancher/Google-Credentials-tab.png)
1. On the **Create Credentials** dropdown, select **OAuth client ID.**
1. Click **Web application.**
1. Provide a name.
1. Fill out the **Authorized JavaScript origins** and **Authorized redirect URIs.** Note: The Rancher UI page for setting up Google OAuth (available from the Global view under **Security > Authentication > Google**) provides you the exact links to enter for this step.
 - Under **Authorized JavaScript origins,** enter your Rancher server URL.
 - Under **Authorized redirect URIs,** enter your Rancher server URL appended with the path `verify-auth`. For example, if your URI is `https://rancherServer`, you will enter `https://rancherServer/verify-auth`.
1. Click on **Create.**
1. After the credential is created, you will see a screen with a list of your credentials. Choose the credential you just created, and in that row on rightmost side, click **Download JSON.** Save the file so that you can provide these credentials to Rancher.

**Result:** Your OAuth credentials have been successfully created.

### 3. Creating Service Account Credentials
Since the Google Admin SDK is available only to admins, regular users cannot use it to retrieve profiles of other users or their groups. Regular users cannot even retrieve their own groups.

Since Rancher provides group-based membership access, we require the users to be able to get their own groups, and look up other users and groups when needed.

As a workaround to get this capability, G Suite recommends creating a service account and delegating authority of your G Suite domain to that service account.

This section describes how to:

- Create a service account
- Create a key for the service account and download the credentials as JSON

1. Click [here](https://console.developers.google.com/iam-admin/serviceaccounts) and select your project for which you generated OAuth credentials.
1. Click on **Create Service Account.**
1. Enter a name and click **Create.**
![Service account creation Step 1]({{<baseurl>}}/img/rancher/Google-svc-acc-step1.png)
1. Don't provide any roles on the **Service account permissions** page and click **Continue**
![Service account creation Step 2]({{<baseurl>}}/img/rancher/Google-svc-acc-step2.png)
1. Click on **Create Key** and select the JSON option. Download the JSON file and save it so that you can provide it as the service account credentials to Rancher.
![Service account creation Step 3]({{<baseurl>}}/img/rancher/Google-svc-acc-step3-key-creation.png)

**Result:** Your service account is created.

### 4. Register the Service Account Key as an OAuth Client

You will need to grant some permissions to the service account you created in the last step. Rancher requires you to grant only read-only permissions for users and groups.

Using the Unique ID of the service account key, register it as an Oauth Client using the following steps:

1. Get the Unique ID of the key you just created. If it's not displayed in the list of keys right next to the one you created, you will have to enable it. To enable it, click **Unique ID** and click **OK.** This will add a **Unique ID** column to the list of service account keys. Save the one listed for the service account you created. NOTE: This is a numeric key, not to be confused with the alphanumeric field **Key ID.**

	![Service account Unique ID]({{<baseurl>}}/img/rancher/Google-Select-UniqueID-column.png)
1. Go to the [**Manage OAuth Client Access** page.](https://admin.google.com/AdminHome?chromeless=1#OGX:ManageOauthClients)
1. Add the Unique ID obtained in the previous step in the **Client Name** field.
1. In the **One or More API Scopes** field, add the following scopes:
	```
	openid,profile,email,https://www.googleapis.com/auth/admin.directory.user.readonly,https://www.googleapis.com/auth/admin.directory.group.readonly
	```
1. Click **Authorize.**

**Result:** The service account is registered as an OAuth client in your G Suite account.

# Configuring Google OAuth in Rancher
1. Sign into Rancher using a local user assigned the [administrator]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions) role. This user is also called the local principal.
1.	From the **Global** view, click **Security > Authentication** from the main menu.
1. Click **Google.** The instructions in the UI cover the steps to set up authentication with Google OAuth.
	1. Admin Email: Provide the email of an administrator account from your GSuite setup. In order to perform user and group lookups, google apis require an administrator's email in conjunction with the service account key.
	1. Domain: Provide the domain on which you have configured GSuite. Provide the exact domain and not any aliases.
	1. Nested Group Membership: Check this box to enable nested group memberships. Rancher admins can disable this at any time after configuring auth.
   - **Step One** is about adding Rancher as an authorized domain, which we already covered in [this section.](#1-adding-rancher-as-an-authorized-domain)
   - For **Step Two,** provide the OAuth credentials JSON that you downloaded after completing [this section.](#2-creating-oauth2-credentials-for-the-rancher-server) You can upload the file or paste the contents into the **OAuth Credentials** field.
   - For **Step Three,** provide the service account credentials JSON that downloaded at the end of [this section.](#3-creating-service-account-credentials) The credentials will only work if you successfully [registered the service account key](#4-register-the-service-account-key-as-an-oauth-client) as an OAuth client in your G Suite account.
1.	Click **Authenticate with Google**.
1.	Click **Save**.

**Result:** Google authentication is successfully configured.
