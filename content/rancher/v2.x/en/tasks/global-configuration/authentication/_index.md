---
title: Authentication
weight: 3075
---
You have three options for user authentication in {{< product >}}:

-	**Active Directory**: Enterprises can use Active Directory (AD) for authentication, allowing users to sign in using their corporate credentials.

-	**GitHub**: Open source projects or organizations that use GitHub for source control may prefer that users sign in using their GitHub accounts.

<!-- - **SAML**:

- **OpenLDAP**:

- **Azure AD**: -->

-	**Basic Authentication**: If you don't want to use external authentication, you can always add users directly to {{< product >}}. We recommend using external authentication over basic authentication.

### Configuring Active Directory

>**Prerequisites:** Create a service account in Active Directory with **read-only** access. {{< product >}} uses this account to verify group membership when a user makes a request using an API key.

1.	From the **Global** view, select **Security > Authentication** from the main menu.

2.	Select **Active Directory**.

3.	Complete the **Configure an Active Directory server** form.

	You may need to log in to your domain controller to find the information requested in the form.

	>**Using TLS?**
 	>
	Make sure you have an [LDAP certificate installed](placeholder.md).

	>**User Search Base vs. Group Search Base**
	>
	>When configuring AD authentication, you must enter a search base for your users. This base allows Rancher to search for users that are in your Active Directory.
		- If your users and groups are in the search base, complete only the User Search Base.
		- If your groups are in a different search base, you can optionally complete the Group Search Base. This field is dedicated to searching groups, but is not required.

4.	If your Active Directory deviates from the standard AD schema, complete the **Customize Schema** form to match it. Otherwise, skip this step.

5.	Enter your AD username and password in **Test and enable authentication** to confirm that Rancher is configured to use AD authentication.

### Configuring GitHub

1.	From the **Global** view, select **Security > Authentication** from the main menu.

2.	Select **GitHub**.

3.	Follow the directions displayed to **Setup a GitHub Application**. Rancher redirects you to GitHub to complete registration.

	>**What's an Authorization Callback URL?**
	>
	>The Authorization Callback URL is the URL where users to begin using your application (i.e. the splash screen).

	>When you use external authentication, sign on authentication does not actually take place in your application. Instead, authentication takes place externally (in this case, GitHub). After this external authorization completes successfully, the Authorization Callback URL is the location that the user reenters your application.

4. From GitHub, copy the **Client ID** and **Client Secret**. Paste them into {{< product >}}.

	>**Where do I find the Client ID and Client Secret?**
	>
	>From GitHub, select Settings > Developer Settings > OAuth Apps. The Client ID and Client Secret are displayed prominently.

5.	Click **Authenticate with GitHub**.

6.	Use the **Site Access** options to configure the scope of user authorization.

	-	**Allow any valid Users**

		_Any_ GitHub user can access Rancher. We generally discourage use of this setting!

	-	**Allow members of Clusters, Projects, plus Authorized Users and Organizations**

		Any GitHub user or group added as a **Cluster Member** or **Project Member** can log in to Rancher. Additionally, any GitHub user or group you add to the **Authorized Users and Organizations** list may log in to Rancher.

	-	**Restrict access to only Authorized Users and Organizations**

		Only GitHub users or groups added to the Authorized Users and Organizations can log in to Rancher.
		<br/>
7.	Click **Save**.

**Result:**

- GitHub authentication is configured.
- You are signed into Rancher with your GitHub account.
- Your GitHub account is added to Rancher as an administrator.

### Configuring PingFederate (SAML)

1.	From the **Global** view, select **Security > Authentication** from the main menu.

2.	Select **PingFederate**.

3.	Provide all details required for configuring SAML. Rancher's ping provider can work with Ping IdP that has Active Directory to manage the users and groups.
	You will need to input 8 fields, lets see these fields in detail

	>**Display Name Field, User Name Field, UID field, Groups Field**
	> These four attributes need to be mapped to four Active Directory attributes in the following way:
	1. Display Name Field: Provide AD attribute that contains the display name of users, (example: displayName)
	2. User Name Field: Provide AD attribute that contains the user name/given name, (example: givenName)
	3. UID Field: Provide an AD attribute that is unique to every user, (example: sAMAccountName, distinguishedName)
	4. Groups Field: This field is responsible to manage group memberships. (example: memberOf)
	5. Rancher API host: Rancher server's URL
	6. IDP-metadata: Your Ping IdP's metadata
	7. Private Key and Certificate: This is a key-cert pair, that you can generate simply using an openssl command, for example:
	```
	openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
	```

4. After configuring this, Rancher redirects you to the IDP's login form. Enter your AD user creds here (AD that's added to Ping IDP). This will log you in and return back to the Rancher UI.

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
