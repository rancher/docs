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
	Make sure you have an LDAP certificate installed.

	>**User Search Base vs. Group Search Base**
	>
	>When configuring AD authentication, you must enter a search base for your users. This search base allows Rancher to search for users that are in your Active Directory. 
  
  > **Note:** This field is only for search bases and not for search filters. 
  
		- If your users and groups are in the search base, complete only the User Search Base.
		- If you want to search for groups in a different search base, you can _optionally_ complete the Group Search Base. This field is dedicated to searching groups, and is **not** required.

4.	If your Active Directory deviates from the standard AD schema, complete the **Customize Schema** form to match it. Otherwise, skip this step. 
  >**Search Attribute** As of v2.0.1, the search attribute is defaulted with three specific search fields `sAMAccountName|sn|givenName`. After AD is configured, whenver a user enters text to add users or groups, Rancher automatically queries the AD server and attempts to match fields by sAMAccountName, last name, or first name. Rancher specifically searches for users/groups that begin with the text inputted in the search field. 
  >
  > The default field is `sAMAccountName|sn|givenName`, but this field can be configured to a subset of these fields. The pipe (`|`) between the fields separates these fields. 
  > * `sAMAccountName`: Username
  > * `sn`: Last Name
  > * `givenName`: First Name
  >
  > With this search attribute, Rancher creates search filters for users and groups, but you *cannot* add your own search filters in this field. 

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

<!-- ### Configuring SAML

Rajashree! Content here. -->

<!-- ### Configuring OpenLDAP

Carolyn! Content here -->

<!-- ### Configuring Azure AD

Dan! Content here -->

### Configuring Local Authentication

1.	From the **Global** view, select **Users** from the main menu.

2.	Click **Add User**. Then complete the **Add User** form. Click **Create** when you're done.

