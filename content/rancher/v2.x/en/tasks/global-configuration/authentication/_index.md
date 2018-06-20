---
title: Authentication
weight: 50
---
You have three options for user authentication in Rancher:

-	[Active Directory]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/authentication/active-directory/)
	
	Enterprises can use Active Directory (AD) for authentication, allowing users to sign in using their corporate credentials.

-	[GitHub]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/authentication/github/)

	Open source projects or organizations that use GitHub for source control may prefer that users sign in using their GitHub accounts.

<!-- - **SAML**:

- **OpenLDAP**:-->


- [Azure AD]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/authentication/azure-ad/)

	If you have an instance of Active Directory (AD) hosted in Azure, you can configure Rancher to allow your users to log in using their AD accounts. Configuration of Azure AD external authentication requires you to make configurations in both Azure and Rancher.

-	[Local Authentication]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/authentication/local-authentication/)

	If you don't want to use external authentication, you can always add users directly to Rancher. We recommend using external authentication over local authentication.
