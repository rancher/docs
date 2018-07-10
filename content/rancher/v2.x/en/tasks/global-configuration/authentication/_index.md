---
title: Authentication
weight: 50
---

You have multiple options for user authentication in Rancher:

-   [Active Directory](./active-directory/)

    Enterprises can use Active Directory (AD) for authentication, allowing users to sign in using their corporate credentials.

-   [Azure AD](./azure-ad/)

   	If you have an instance of Active Directory (AD) hosted in Azure, you can configure Rancher to allow your users to log in using their AD accounts. Configuration of Azure AD external authentication requires you to make configurations in both Azure and Rancher.

-   [GitHub](./github/)

    Open source projects or organizations that use GitHub for source control may prefer that users sign in using their GitHub accounts.

-   [OpenLDAP](./openlap/)

    Organizations can use OpenLDAP for authentication, allowing users to sign in using their corporate credentials.

-	  [FreeIPA](./freeipa/)

    Organizations can use FreeIPA for authentication, allowing users to sign in using their corporate credentials.


-   [Local Authentication](./local-authentication/)

    If you don't want to use external authentication, you can always add users directly to Rancher. We recommend using external authentication over local authentication.
