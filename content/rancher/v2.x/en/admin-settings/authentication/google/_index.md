---
title: Configuring Google OAuth
---

_Available as of v2.3_

If your organization uses G Suite for user authentication, you can configure Rancher to allow your users to login using their G Suite credentials.

>**Prerequisites:**
>
>- You must have a [G Suite admin account](https://admin.google.com) configured.
>- You must have "Admin SDK" API enabled for your G Suite domain. You can enable it using [these](https://support.google.com/a/answer/60757?hl=en) steps  
Once enabled, this is how your GSuite domain's API screen would look like
![Enable Admin APIs]({{< baseurl >}}/img/rancher/Google-Enable-APIs-Screen.png)  
>- G Suite requires a [top private domain FQDN](https://github.com/google/guava/wiki/InternetDomainNameExplained#public-suffixes-and-private-domains) as an authorized domain. So you need to have an FQDN, for instance by creating an A-record in route53 for your rancher server. You do not need to update your Rancher Server URL setting with that, since there could be clusters using that URL.  
NOTE: Only admins of the G Suite domain have access to the Admin SDK, and hence only admins can configure Google OAuth for Rancher

### Setting up G Suite for OAuth with Rancher
You need to configure your G Suite account and generate OAuth credentials and service account key for your Rancher Server.

#### Adding Rancher as an Authorized Domain
1. Click [here](https://console.developers.google.com/apis/credentials) to go to credentials page of your google domain and select your Project  
2. Go to the **OAuth Consent Screen** tab.  
![OAuth Consent Screen]({{< baseurl >}}/img/rancher/Google-OAuth-consent-screen-tab.png)  
3. Go to **Authorized Domains** and enter the top private domain of your rancher server URL in the  list.  
*As per [this](https://github.com/google/guava/wiki/InternetDomainNameExplained#public-suffixes-and-private-domains) article*  
>"The top private domain is simply the rightmost superdomain preceding the public suffix. So for example, www.foo.co.uk
>has a public suffix of co.uk, and a top private domain of foo.co.uk."  
4. Go to **Scopes for Google APIs** and make sure "email", "profile" and "openid" are enabled.  
5. Click on **Save**.  

#### Creating OAuth2 credentials for Rancher server  

1. Click [here](https://console.developers.google.com/apis/credentials) to go to credentials page of your google domain and select your Project  
2. Go to **Credentials** tab  
![Credentials]({{< baseurl >}}/img/rancher/Google-Credentials-tab.png)   
3. Click on the **Create Credentials** dropdown and select **OAuth client ID** option  
	1. Select **Web application** option.  
    2. Provide a name.  
	3. Under **Authorized JavaScript origins** enter your rancher server URL.  
	4. Under **Authorized redirect URIs** enter your rancher server URL appended with path "verify-auth". So if your url is `https://rancherServer`, you will enter `https://rancherServer/verify-auth`.  
	Once you go to the Rancher UI page for setting up Google OAuth, it will provide you the exact links to enter for the above two steps  
	5. Click on **Create**  
4. Once the credential is created, you are back to the screen listing all credentials.
5. Choose the credential you just created, and in that row on right most side click on **Download JSON**
6. Above step downloads a JSON file containing your OAuth creds which you provide to Rancher

#### Creating Service Account credentials

Since the google admin SDK is available only to admins, regular users cannot use it to retrieve profiles of other users or their groups. Regular user cannot even retrieve their own groups. Since Rancher provides group based membership access, we require the users to be able to get their own groups, and lookup other users and groups when needed. As a workaround for this, G Suite recommends creating a service account and delegating authority of your G Suite domain to that service account. You also need to grant some permissions to this service account. Rancher requires you to grant only read-only permissions for users and groups.

1. Click [here](https://console.developers.google.com/iam-admin/serviceaccounts) and select your project for which you generated oauth creds.  
2. Click on **Create Service Account**  
3. Enter a name, click **Create**  
![Service account creation Step 1]({{< baseurl >}}/img/rancher/Google-svc-acc-step1.png)   
4. Don't provide any roles on the **Service account permissions** page and click **Continue**  
![Service account creation Step 2]({{< baseurl >}}/img/rancher/Google-svc-acc-step2.png)  
5. Click on **Create Key**, select JSON option,this will download a JSON file which you will provide as the service account credentials to Rancher  
![Service account creation Step 3]({{< baseurl >}}/img/rancher/Google-svc-acc-step3-key-creation.png)  
6. Using the Unique ID of this key, register it as an Oauth Client using the following steps
	1.  Get the Unique ID of the key you just created. This is a numeric key, if it's not displayed in the list of keys right next to the one you created, you will have to enable it to be listed by doing the following  
	![Service account Unique ID]({{< baseurl >}}/img/rancher/Google-Select-UniqueID-column.png)  
	2.  Select the `Unique ID` check box, and then click on OK. This will add a column to the list of service account keys for Unique ID. Save the one listed for the service account you created.  
	**NOTE**: This is a numeric key, not to be confused with the alpha numeric field `Key ID`  
	3. Go to [Manage OAuth client access](https://admin.google.com/AdminHome?chromeless=1#OGX:ManageOauthClients) page  
	Add the Unique ID obtained in previous step as `Client Name`, and add these scopes for `One or More API Scopes`:  
	```
	openid,profile,email,https://www.googleapis.com/auth/admin.directory.user.readonly,https://www.googleapis.com/auth/admin.directory.group.readonly
	```  
	  Click on `Authorize`.


### Configuring Google OAuth in Rancher
1.  Sign into Rancher using a local user assigned the `administrator` role (i.e., the _local principal_).

2.	From the **Global** view, select **Security > Authentication** from the main menu.

3.  Select **Google**

4.  Step One tells how to add your domain to list of authorized domains. For detailed steps refer [this section]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/google/#adding-rancher-as-an-authorized-domain)

5.  Step Two describes creation of OAuth credentials. For details on how to generate this file, refer [this]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/google/#creating-oauth2-credentials-for-rancher-server)

6.  Step Three requires generation of Service Account credentials and registering the service account unique ID as an OAuth client in your GSuite account. Refer [this section]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/google/#creating-service-account-credentials) for detailed steps.

7.	Click **Authenticate with Google**.  
**Result:** Google authentication is configured.