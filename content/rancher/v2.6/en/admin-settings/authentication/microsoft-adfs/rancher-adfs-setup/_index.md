---
title: 2. Configuring Rancher for Microsoft AD FS
weight: 1205
---

After you complete [Configuring Microsoft AD FS for Rancher]({{<baseurl>}}/rancher/v2.6/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup/), enter your AD FS information into Rancher to allow AD FS users to authenticate with Rancher.

>**Important Notes For Configuring Your ADFS Server:**
> 
>- The SAML 2.0 WebSSO Protocol Service URL is: `https://<RANCHER_SERVER>/v1-saml/adfs/saml/acs`
>- The Relying Party Trust identifier URL is: `https://<RANCHER_SERVER>/v1-saml/adfs/saml/metadata`
>- You must export the `federationmetadata.xml` file from your AD FS server. This can be found at: `https://<AD_SERVER>/federationmetadata/2007-06/federationmetadata.xml`

1.	In the top left corner, click **☰ > Users & Authentication**.
1. In the left navigation menu, click **Auth Provider**.
1. Click **ADFS**.
1.	Complete the **Configure AD FS Account** form. Microsoft AD FS lets you specify an existing Active Directory (AD) server. The [configuration section below](#configuration) describe how you can map AD attributes to fields within Rancher.
1. After you complete the **Configure AD FS Account** form, click **Enable**.

    Rancher redirects you to the AD FS login page. Enter credentials that authenticate with Microsoft AD FS to validate your Rancher AD FS configuration.

    >**Note:** You may have to disable your popup blocker to see the AD FS login page.

**Result:** Rancher is configured to work with MS FS. Your users can now sign into Rancher using their MS FS logins.

# Configuration

| Field | Description                |
|---------------------------|-----------------|
| Display Name Field        | The AD attribute that contains the display name of users. <br/><br/>Example: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`                                                                      |
| User Name Field           | The AD attribute that contains the user name/given name. <br/><br/>Example: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname`                                                                  |
| UID Field                 | An AD attribute that is unique to every user. <br/><br/>Example: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn`                                                                                   |
| Groups Field              | Make entries for managing group memberships. <br/><br/>Example: `http://schemas.xmlsoap.org/claims/Group`                                                                                                      |
| Rancher API Host          | The URL for your Rancher Server.                                                                                                                                                                               |
| Private Key / Certificate | This is a key-certificate pair to create a secure shell between Rancher and your AD FS. Ensure you set the Common Name (CN) to your Rancher Server URL.<br/><br/>[Certificate creation command](#cert-command) |
| Metadata XML              | The `federationmetadata.xml` file exported from your AD FS server. <br/><br/>You can find this file at `https://<AD_SERVER>/federationmetadata/2007-06/federationmetadata.xml`.                                |


<a id="cert-command"></a> 

**Tip:** You can generate a certificate using an openssl command. For example:

```
openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
```
