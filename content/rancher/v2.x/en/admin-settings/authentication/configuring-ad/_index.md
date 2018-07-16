---
title: Configuring Active Directory (AD)
weight: 50
aliases:
    -/rancher/v2.x/en/tasks/global-configuration/authentication/active-directory/
---

In environments using Microsoft AD, you can configure Rancher to allow sign on using AD credentials.

>**Prerequisites:**
>
>- Have an AD server configured.
>- Create a service account in AD with `read-only` access. Rancher uses this account to verify group membership when a user makes a request using an API key.
>- Read [External Authentication Configuration and Principal Users]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/authentication/#external-authentication-configuration-and-principal-users).

1.  Sign into Rancher using a local user assigned `administrator` global permissions (i.e., the _local principal_).

2.	From the **Global** view, select **Security > Authentication** from the main menu.

3.	Select **AD**.

4.	Complete the **Configure an AD server** form.

	You may need to log in to your domain controller to find the information requested in the form.

	>**Using TLS?**
 	>If the certificate is self-signed or not from a recognized certificate authority, make sure you provide the complete chain. That chain is needed to verify the server's certificate.
	<br/>
	<br/>
	>**User Search Base vs. Group Search Base**
	>
	>Search base allows Rancher to search for users and groups that are in your AD.  These fields are only for search bases and not for search filters.
	>
	>* If your users and groups are in the same search base, complete only the User Search Base.
	>* If your groups are in a different search base, you can optionally complete the Group Search Base. This field is dedicated to searching groups, but is not required.

5.	If your AD deviates from the standard AD schema, complete the **Customize Schema** form to match it. Otherwise, skip this step.

	>**Search Attribute** As of Rancher v2.0.1, the Search Attribute field defaults with three specific values: `sAMAccountName|sn|givenName`. After AD is configured, when a user enters text to add users or groups, Rancher automatically queries the AD server and attempts to match fields by sAMAccountName, last name, or first name. Rancher specifically searches for users/groups that begin with the text entered in the search field.
	>
	>The default field value `sAMAccountName|sn|givenName`, but you can configure this field to a subset of these fields. The pipe (`|`) between the fields separates these fields.
	>
	> * `sAMAccountName`: Username
	> * `sn`: Last Name
	> * `givenName`: First Name
	>
	> With this search attribute, Rancher creates search filters for users and groups, but you *cannot* add your own search filters in this field.

6.	Enter your AD username and password in **Authenticate with AD** to confirm that Rancher is configured to use AD authentication.

**Result:**

- AD authentication is configured.
- You are signed into Rancher with your AD account (i.e., the _external principal_).
