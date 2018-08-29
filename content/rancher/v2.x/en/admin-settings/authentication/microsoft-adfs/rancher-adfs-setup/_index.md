---
title: 2 — Configuring Rancher for Microsoft AD FS
weight: 1205
---
_Available as of v2.0.7_

After you complete [Configuring Microsoft AD FS for Rancher]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup/), enter your AD FS information into Rancher to allow AD FS users to authenticate with Rancher.

>**Important Notes For Configuring Your AD FS Server:**
> 
>- The SAML 2.0 WebSSO Protocol Service URL is: `https://<RANCHER_SERVER>/v1-saml/adfs/saml/acs`
>- The Relying Party Trust identifier URL is: `https://<RANCHER_SERVER>/v1-saml/adfs/saml/metadata`
>- You must export the `federationmetadata.xml` file from your AD FS server. This can be found at: `https://<AD_SERVER>/federationmetadata/2007-06/federationmetadata.xml`


1.	From the **Global** view, select **Security > Authentication** from the main menu.

1.	Select **Microsoft Active Directory Federation Services**.

1.	Complete the **Configure AD FS Account** form. Microsoft AD FS lets you specify an existing Active Directory (AD) server. The examples below describe how you can map AD attributes to fields within Rancher.
	
    1. **Display Name Field**: Enter the AD attribute that contains the display name of users. 
    
        Example: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname`

	1. **User Name Field**: Enter the AD attribute that contains the user name/given name. 
    
        Example: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`
	
    1. **UID Field**: Enter an AD attribute that is unique to every user.
    
        Example: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn`
	
    1. **Groups Field**: Make entries for managing group memberships. 
    
        Example: `http://schemas.xmlsoap.org/claims/Group`
	
    1. **Rancher API Host**: Enter the URL for your Rancher Server.

	1. **Private Key** and **Certificate**: This is a key-certificate pair to create a secure shell between Rancher and your AD FS. Ensure you set the Common Name (CN) to your Rancher Server URL.
    
        You can generate one using an openssl command. For example:
    
        ```
        openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
        ```
    1. **Metadata XML**: The `federationmetadata.xml` file exported from your AD FS server. You can find this file at `https://<AD_SERVER>/federationmetadata/2007-06/federationmetadata.xml`.

 
1. After you complete the **Configure AD FS Account** form, click **Authenticate with AD FS**, which is at the bottom of the page.

    Rancher redirects you to the AD FS login page. Enter credentials that authenticate with Microsoft AD FS to validate your Rancher AD FS configuration.

    >**Note:** You may have to disable your popup blocker to see the AD FS login page.

**Result:** Rancher is configured to work with MS FS. Your users can now sign into Rancher using their MS FS logins.
