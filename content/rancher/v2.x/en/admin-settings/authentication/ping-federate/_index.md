---
title: Configuring PingIdentity (SAML)
weight: 1200
draft: true
---
_Available as of v2.0.7_

If your organization uses Ping Identity Provider (IdP) for user authentication, you can configure Rancher to allow your users to log in using their IdP credentials.

>**Prerequisites:**
>
>- You must have a [Ping IdP Server](https://www.pingidentity.com/) configured.
>- Export a `metadata.xml` file from your IdP Server. For more information, see the [PingIdentity documentation](https://documentation.pingidentity.com/pingfederate/pf83/index.shtml#concept_exportingMetadata.html).

1.	From the **Global** view, select **Security > Authentication** from the main menu.

1.	Select **PingIdentity**.

1.	Complete the **Configure Ping Account** form. Ping IdP lets you specify what data store you want to use. You can either add a database or use an existing ldap server. For example, if you select your Active Directory (AD) server, the examples below describe how you can map AD attributes to fields within Rancher.
	
    1. **Display Name Field**: Enter the AD attribute that contains the display name of users (example: `displayName`).

	1. **User Name Field**: Enter the AD attribute that contains the user name/given name (example: `givenName`).
	
    1. **UID Field**: Enter an AD attribute that is unique to every user (example: `sAMAccountName`, `distinguishedName`).
	
    1. **Groups Field**: Make entries for managing group memberships (example: `memberOf`).
	
    1. **Rancher API Host**: Enter the URL for your Rancher Server.

	1. **Private Key** and **Certificate**: This is a key-certificate pair to create a secure shell between Rancher and your IdP. 
    
        You can generate one using an openssl command. For example:
    
        ```
        openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
        ```
    1. **IDP-metadata**: The `metadata.xml` file that you [exported from your IdP server](https://documentation.pingidentity.com/pingfederate/pf83/index.shtml#concept_exportingMetadata.html).

 
1. After you complete the **Configure Ping Account** form, click **Authenticate with Ping**, which is at the bottom of the page. 

    Rancher redirects you to the IdP login page. Enter credentials that authenticate with Ping IdP to validate your Rancher PingIdentity configuration.

    >**Note:** You may have to disable your popup blocker to see the IdP login page.

**Result:** Rancher is configured to work with PingIdentity. Your users can now sign into Rancher using their PingIdentity logins.

>**Ping Identity Provider Caveats:** 
>
>- IdP does not support search or lookup. When adding users to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), the exact IDs must be entered correctly.
>- When adding users to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), group IDs are not supported unless the admin who turned on access control is a member of the group.
>- When adding a group that includes an admin to clusters or projects, add it from the drop-down rather than the search bar. If you add the group using the search bar, the group will not get added.