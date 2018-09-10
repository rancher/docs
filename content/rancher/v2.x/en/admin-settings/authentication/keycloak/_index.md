---
title: Configuring KeyCloak (SAML)
weight: 1200
draft: true
---
_Available as of v2.0.1_

If your organization uses KeyCloak Identity Provider (IdP) for user authentication, you can configure Rancher to allow your users to log in using their IdP credentials.

>**Prerequisites:**
>
>- You must have a [KeyCloak IdP Server](https://www.keycloak.org/docs/3.2/server_installation/index.html) configured.
>- Export a `metadata.xml` file from your IdP Server. For more information, see the [KeyCloak documentation](https://www.keycloak.org/docs/3.2/server_admin/topics/clients/client-saml.html) to create a SAML Client, under Installation tab, you can find your metadata.

1.	From the **Global** view, select **Security > Authentication** from the main menu.

1.	Select **KeyCloak**.

1.	Complete the **Configure KeyCloak Account** form. KeyCloak IdP lets you specify what data store you want to use. You can either add a database or use an existing LDAP server. For example, if you select your Active Directory (AD) server, the examples below describe how you can map AD attributes to fields within Rancher.


    | Field                     | Description                                                                   |
    | ------------------------- | ----------------------------------------------------------------------------- |
    | Display Name Field        | The AD attribute that contains the display name of users.                     |
    | User Name Field           | The AD attribute that contains the user name/given name.                      |
    | UID Field                 | An AD attribute that is unique to every user.                                 |
    | Groups Field              | Make entries for managing group memberships.                                  |
    | Rancher API Host          | The URL for your Rancher Server.                                              |
    | Private Key / Certificate | A key-certificate pair to create a secure shell between Rancher and your IdP. |
    | IDP-metadata              | The `metadata.xml` file that you exported from your IdP server.               |
    
    >**Tip:** You can generate one using an openssl command. For example:
    >    
    >        openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout myservice.key -out myservice.cert

 
1. After you complete the **Configure KeyCloak Account** form, click **Authenticate with KeyCloak**, which is at the bottom of the page. 

    Rancher redirects you to the IdP login page. Enter credentials that authenticate with KeyCloak IdP to validate your Rancher KeyCloak configuration.

    >**Note:** You may have to disable your popup blocker to see the IdP login page.

**Result:** Rancher is configured to work with KeyCloak. Your users can now sign into Rancher using their KeyCloak logins.

>**KeyCloak Identity Provider Caveats:** 
>
>- IdP does not support search or lookup. When adding users to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), the exact IDs must be entered correctly.
>- When adding users to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), group IDs are not supported unless the admin who turned on access control is a member of the group.
>- When adding a group that includes an admin to clusters or projects, add it from the drop-down rather than the search bar. If you add the group using the search bar, the group will not get added.