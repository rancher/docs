---
title: Configuring Active Directory (AD)
weight: 51
---

In environments using Microsoft Active Directory (AD), you can configure Rancher to allow sign on using AD credentials.

>**Prerequisites:**
>
>- Have an Active Directory server configured.
>- Create a service account in Active Directory with `read-only` access. Rancher uses this account to verify group membership when a user makes a request using an API key.
>- Read [External Authentication Configuration and Principal Users]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/authentication/#external-authentication-configuration-and-principal-users).

1.  Sign into Rancher using a local user assigned `administrator` global permissions (i.e., the _local principal_).

2.	From the **Global** view, select **Security > Authentication** from the main menu.

3.	Select **Active Directory**.

4.	Complete the **Configure an Active Directory server** form.

	You may need to log in to your domain controller to find the information requested in the form.

	>**Using TLS?**
 	>Make sure you have an LDAP certificate installed.
	<br/>
	<br/>
	>**User Search Base vs. Group Search Base**
	>
	>When configuring AD authentication, you must enter a search base for your users. This search base allows Rancher to search for users that are in your Active Directory.
    <br/>
	<br/>
  	> **Note:** This field is only for search bases and not for search filters.
	>
	>- If your users and groups are in the search base, complete only the User Search Base.
	>- If your groups are in a different search base, you can optionally complete the Group Search Base. This field is dedicated to searching groups, but is not required.

5.	If your Active Directory deviates from the standard AD schema, complete the **Customize Schema** form to match it. Otherwise, skip this step.

	>**Search Attribute** As of Rancher v2.0.1, the Search Attribute field defaults with three specific values by default: `sAMAccountName|sn|givenName`. After AD is configured, when a user enters text to add users or groups, Rancher automatically queries the AD server and attempts to match fields by sAMAccountName, last name, or first name. Rancher specifically searches for users/groups that begin with the text entered in the search field.
	>
	>The default field value `sAMAccountName|sn|givenName`, but you can configure this field to a subset of these fields. The pipe (`|`) between the fields separates these fields.
	>
	> * `sAMAccountName`: Username
	> * `sn`: Last Name
	> * `givenName`: First Name
	>
	> With this search attribute, Rancher creates search filters for users and groups, but you *cannot* add your own search filters in this field.

6.	Enter your AD username and password in **Test and enable authentication** to confirm that Rancher is configured to use AD authentication.

**Result:**

- Active Directory authentication is configured.
- You are signed into Rancher with your Active Directory account (i.e., the _external principal_).
