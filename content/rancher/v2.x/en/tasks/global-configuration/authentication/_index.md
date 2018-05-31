---
title: Authentication
weight: 3075
---
You have three options for user authentication in {{< product >}}:

-	**Active Directory**: Enterprises can use Active Directory (AD) for authentication, allowing users to sign in using their corporate credentials.

-	**GitHub**: Open source projects or organizations that use GitHub for source control may prefer that users sign in using their GitHub accounts.

<!-- - **SAML**:

- **OpenLDAP**:

<<<<<<< HEAD
- **Azure AD**: -->

-	**Basic Authentication**: If you don't want to use external authentication, you can always add users directly to {{< product >}}. We recommend using external authentication over basic authentication.

### Configuring Active Directory Authentication

In environments using Microsoft Active Directory (AD), you can configure Rancher to allow sign on using AD credentials.
>>>>>>> documenting user account behavior during external auth setup

>**Prerequisites:** Create a service account in Active Directory with **read-only** access. {{< product >}} uses this account to verify group membership when a user makes a request using an API key.

>**Tip**: This procedure binds the logged-in user [local administrative user account](#to-configrue-local-authentication) to an Active Directory account. Therefore, we recommend creating both a new local administrative user account and a new Active Directory account that mirror each other. Use these accounts solely to integrate Active Directory authetication with Rancher.

1.  Sign into Rancher using a local administrative account (i.e. `Default Admin` or another administrative account that you create).

    In upcoming steps, you'll bind this local account to an Active Directory account.

2.	From the **Global** view, select **Security > Authentication** from the main menu.

3.	Select **Active Directory**.

4.	Complete the **Configure an Active Directory server** form.

	You may need to log in to your domain controller to find the information requested in the form.

	>**Using TLS?**
 	>
	Make sure you have an [LDAP certificate installed](placeholder.md).

	>**User Search Base vs. Group Search Base**
	>
	>When configuring AD authentication, you must enter a search base for your users. This base allows Rancher to search for users that are in your Active Directory.
		- If your users and groups are in the search base, complete only the User Search Base.
		- If your groups are in a different search base, you can optionally complete the Group Search Base. This field is dedicated to searching groups, but is not required.

5.	If your Active Directory deviates from the standard AD schema, complete the **Customize Schema** form to match it. Otherwise, skip this step.

6.	Enter your AD username and password in **Test and enable authentication** to confirm that Rancher is configured to use AD authentication.

**Result:**

- Active Directory authentication is configured.
- You are signed into Rancher with your Active Directory account.
- Your Active Directory account is associated with the local administrator that you used to configure external autentication. Note that your Active Directory account _is not_ listed on the **Users** page. Edit the local user that the Active Directory user is bound to instead.

>**Note:** After successfully configuring Active Directory authentication, Active Directory accounts only display on the **Users** page if you are signed in using an Active Directory account or the local account you used to configure Active Directory authentication. If you are signed in with any other local user account, Active Directory accounts do not display.

### Configuring GitHub Authentication

In environments using GitHub, you can configure Rancher to allow sign on using GitHub credentials.

>**Tip**: This procedure binds a [local administrative user account](#to-configrue-local-authentication) to a GitHub account. Therefore, we recommend creating both a new local administrative user account and a new GitHub account that mirror each other. Use these accounts solely to integrate GitHub authetication with Rancher.


1.  Sign into GitHub using an account you want use to authenticate with Rancher.

2.  Sign into Rancher using a local administrative account (i.e. `Default Admin` or another administrative account that you create).

    In upcoming steps, you'll bind this local account to the GitHub account from the previous step.

3.	From the **Global** view, select **Security > Authentication** from the main menu.

4.	Select **GitHub**.

5.	Follow the directions displayed to **Setup a GitHub Application**. Rancher redirects you to GitHub to complete registration.

	>**What's an Authorization Callback URL?**
	>
	>The Authorization Callback URL is the URL where users to begin using your application (i.e. the splash screen).

	>When you use external authentication, sign on authentication does not actually take place in your application. Instead, authentication takes place externally (in this case, GitHub). After this external authorization completes successfully, the Authorization Callback URL is the location that the user reenters your application.

6. From GitHub, copy the **Client ID** and **Client Secret**. Paste them into {{< product >}}.

	>**Where do I find the Client ID and Client Secret?**
	>
	>From GitHub, select Settings > Developer Settings > OAuth Apps. The Client ID and Client Secret are displayed prominently.

7.	Click **Authenticate with GitHub**.

8.	Use the **Site Access** options to configure the scope of user authorization.

	-	**Allow any valid Users**

		_Any_ GitHub user can access Rancher. We generally discourage use of this setting!

	-	**Allow members of Clusters, Projects, plus Authorized Users and Organizations**

		Any GitHub user or group added as a **Cluster Member** or **Project Member** can log in to Rancher. Additionally, any GitHub user or group you add to the **Authorized Users and Organizations** list may log in to Rancher.

	-	**Restrict access to only Authorized Users and Organizations**

		Only GitHub users or groups added to the Authorized Users and Organizations can log in to Rancher.
		<br/>
9.	Click **Save**.

**Result:**

- GitHub authentication is configured.
- You are signed into Rancher with your GitHub account.
- Your GitHub account is associated with the local administrator that you used. Note that your GitHub account _is not_ listed on the **Users** page. Edit the local user that the GitHub account is bound to instead.

>**Note:** After successfully configuring GitHub authentication, GitHub accounts only display on the **Users** page if you are signed in using a GitHub account or the local account you used to configure GitHub authentication. If you are signed in with any other local user account, GitHub accounts do not display.

<!-- ### Configuring SAML

Rajashree! Content here. -->

<!-- ### Configuring OpenLDAP

Carolyn! Content here -->

<!-- ### Configuring Azure AD

Dan! Content here -->

### Configuring Local Authentication

1.	From the **Global** view, select **Users** from the main menu.

2.	Click **Add User**. Then complete the **Add User** form. Click **Create** when you're done.


<!-- ## Finding User Accounts 

Rajashree! Content here.

-->
