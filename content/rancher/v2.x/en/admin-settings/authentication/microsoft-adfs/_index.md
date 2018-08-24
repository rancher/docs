---
title: Configuring Microsoft Active Directory Federation Service (SAML)
weight: 1205
---
_Available as of v2.0.7_

If your organization uses Microsoft Active Directory Federation Services (AD FS) for user authentication, you can configure Rancher to allow your users to log in using their AD FS credentials.

### Setup Outline

Setting up Microsoft AD FS with Rancher Server requires configuring AD FS on your Active Directory server, and configuring Rancher to expect AD FS queries.

- [Microsoft AD FS Setup]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/microsoft-adfs/#microsoft-ad-fs-setup)

	Set up Microsoft AD FS to expect Rancher for authentication

- [Rancher AD FS Setup]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/microsoft-adfs/#rancher-setup)

 	Configure Rancher Server to use Microsoft AD FS for authentication


>**Prerequisites:**
>
>- You must have a [Microsoft AD FS Server](https://docs.microsoft.com/en-us/windows-server/identity/active-directory-federation-services) configured.
>- Export a `federationmetadata.xml` file from your AD FS Server. For more information, see the [PingIdentity video](https://docs.pingidentity.com/bundle/ping_sm_videoLibrary/page/p1_IdentityBridgeADFS.html).

## Microsoft AD FS Setup

1. Open the `AD FS Management Console`
  ![AD FS Management Console Screenshot]({{< baseurl >}}/img/rancher/adfs/adfs-overview.png)

1. Select `Add Relying Party Trust...` in the right actions menu.
  ![ADFS Add RPT Wizard Step 1]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-1.png)

1. Select `Enter data about the relying party manually` as the option for obtaining data about the relying party
  ![ADFS Add RPT Wizard Step 2]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-2.png)
  
1. Enter a `Display name` for your Relying Party Trust
  ![ADFS Add RPT Wizard Step 3]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-3.png)
  
1. Select `AD FS profile` as the configuration profile for your relying party trust
  ![ADFS Add RPT Wizard Step 4]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-4.png)
  
1. Leave the `optional token encryption certificate` empty, as Rancher ADFS will not be using one.
  ![ADFS Add RPT Wizard Step 5]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-5.png)
  
1. Select `Enable support for the SAML 2.0 WebSSO protocol` 
  and enter `https://<rancher-server>/v1-saml/adfs/saml/acs` for the service URL
  ![ADFS Add RPT Wizard Step 6]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-6.png)  
  
1. Add `https://<rancher-server>/v1-saml/adfs/saml/metadata` as the Relying party trust identifier
  ![ADFS Add RPT Wizard Step 7]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-7.png)
  
1. This tutorial will not cover multi-factor authentication; please refer to the Microsoft documentation if you would like to configure mutli-factor authentication.
  ![ADFS Add RPT Wizard Step 8]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-8.png)
  
1. Select `Permit all users to access this relying party`
  ![ADFS Add RPT Wizard Step 9]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-9.png)

1. After reviewing your settings, select `Next` to add the relying party trust
  ![ADFS Add RPT Wizard Step 10]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-10.png)
  
1. Select `Open the Edit Claim Rules...` and click `Close`
  ![ADFS Add RPT Wizard Step 11]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-11.png)
  
1. Click `Add Rule...`
  ![ADFS Edit Claim Rules]({{< baseurl >}}/img/rancher/adfs/adfs-edit-cr.png)
  
1. Select `Send LDAP Attributes as Claims` as the Claim rule template
  ![ADFS Add Transform Claim Rule Step 1]({{< baseurl >}}/img/rancher/adfs/adfs-add-tcr-1.png)
  
1. Set the `Claim rule name` to your desired name, and select `Active Directory` as the Attribute store. Create the following mapping to reflect the table below

    | LDAP Attribute                               | Outgoing Claim Type |
    | -------------------------------------------- | ------------------- |
    | Given-Name                                   | Given Name          |
    | User-Principal-Name                          | UPN                 |
    | Token-Groups - Qualified by Long Domain Name | Group               |
    | SAM-Account-Name                             | Name                |
  ![ADFS Add Transform Claim Rule Step 2]({{< baseurl >}}/img/rancher/adfs/adfs-add-tcr-2.png)

1. Download the `federationmetadata.xml` from your AD server at: 
```
https://<ad-server>/federationmetadata/2007-06/federationmetadata.xml
```
 

## Rancher Setup

1.	From the **Global** view, select **Security > Authentication** from the main menu.

1.	Select **Microsoft Active Directory Federation Services**.

1.	Complete the **Configure AD FS Account** form. Microsoft AD FS lets you specify an existing Active Directory (AD) server. The examples below describe how you can map AD attributes to fields within Rancher.
	
    1. **Display Name Field**: Enter the AD attribute that contains the display name of users (example: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname`).

	1. **User Name Field**: Enter the AD attribute that contains the user name/given name (example: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`).
	
    1. **UID Field**: Enter an AD attribute that is unique to every user (example: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn`).
	
    1. **Groups Field**: Make entries for managing group memberships (example: `http://schemas.xmlsoap.org/claims/Group`).
	
    1. **Rancher API Host**: Enter the URL for your Rancher Server.

	1. **Private Key** and **Certificate**: This is a key-certificate pair to create a secure shell between Rancher and your AD FS.
    
        You can generate one using an openssl command. For example:
    
        ```
        openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
        ```
    1. **Metadata XML**: The `federationmetadata.xml` file exported from your AD FS server. You can find this file at `https://your-AD-Server/federationmetadata/2007-06/federationmetadata.xml`.

 
1. After you complete the **Configure AD FS Account** form, click **Authenticate with AD FS**, which is at the bottom of the page.

    Rancher redirects you to the AD FS login page. Enter credentials that authenticate with Microsoft AD FS to validate your Rancher AD FS configuration.

    >**Note:** You may have to disable your popup blocker to see the AD FS login page.

**Result:** Rancher is configured to work with MS FS. Your users can now sign into Rancher using their MS FS logins.

>**Active Directory Federation Service Caveats:**
>
>- AD FS does not support search or lookup. When adding users to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), the exact IDs must be entered correctly.
>- When adding users to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), group IDs are not supported unless the admin who turned on access control is a member of the group.
>- When adding a group that includes an admin to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), add it from the drop-down rather than the search bar. If you add the group using the search bar, the group will not get added.
