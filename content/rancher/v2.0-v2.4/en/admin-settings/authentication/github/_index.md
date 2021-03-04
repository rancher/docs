---
title: Configuring GitHub
weight: 1116
aliases:
    - /rancher/v2.0-v2.4/en/tasks/global-configuration/authentication/github/
---

In environments using GitHub, you can configure Rancher to allow sign on using GitHub credentials.

>**Prerequisites:** Read [External Authentication Configuration and Principal Users]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/#external-authentication-configuration-and-principal-users).

1.  Sign into Rancher using a local user assigned the `administrator` role (i.e., the _local principal_).

2.	From the **Global** view, select **Security > Authentication** from the main menu.

3.	Select **GitHub**.

4.	Follow the directions displayed to **Setup a GitHub Application**. Rancher redirects you to GitHub to complete registration.

	>**What's an Authorization Callback URL?**
	>
	>The Authorization Callback URL is the URL where users go to begin using your application (i.e. the splash screen).

	>When you use external authentication, authentication does not actually take place in your application. Instead, authentication takes place externally (in this case, GitHub). After this external authentication completes successfully, the Authorization Callback URL is the location where the user re-enters your application.

5. From GitHub, copy the **Client ID** and **Client Secret**. Paste them into Rancher.

	>**Where do I find the Client ID and Client Secret?**
	>
	>From GitHub, select Settings > Developer Settings > OAuth Apps. The Client ID and Client Secret are displayed prominently.

6.	Click **Authenticate with GitHub**.

7.	Use the **Site Access** options to configure the scope of user authorization.

	-	**Allow any valid Users**

		_Any_ GitHub user can access Rancher. We generally discourage use of this setting!

	-	**Allow members of Clusters, Projects, plus Authorized Users and Organizations**

		Any GitHub user or group added as a **Cluster Member** or **Project Member** can log in to Rancher. Additionally, any GitHub user or group you add to the **Authorized Users and Organizations** list may log in to Rancher.

	-	**Restrict access to only Authorized Users and Organizations**

		Only GitHub users or groups added to the Authorized Users and Organizations can log in to Rancher.
		<br/>
8.	Click **Save**.

**Result:**

- GitHub authentication is configured.
- You are signed into Rancher with your GitHub account (i.e., the _external principal_).
