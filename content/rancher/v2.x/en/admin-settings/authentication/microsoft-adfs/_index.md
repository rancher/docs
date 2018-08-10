---
title: Configuring Microsoft Active Directory Federation Service (SAML)
weight: 1205
draft: true
---
_Available as of v2.0.7_

If your organization uses Microsoft Active Directory Federation Services (AD FS) for user authentication, you can configure Rancher to allow your users to log in using their AD FS credentials.

>**Prerequisites:**
>
>- You must have a [Microsoft AD FS Server](https://docs.microsoft.com/en-us/windows-server/identity/active-directory-federation-services) configured.
>- Export a `federationmetadata.xml` file from your AD FS Server. For more information, see the [PingIdentity video](https://docs.pingidentity.com/bundle/ping_sm_videoLibrary/page/p1_IdentityBridgeADFS.html).

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