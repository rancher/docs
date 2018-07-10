---
title: Configuring FreeIPA
weight: 55
---

_Available as of v2.0.5_

If your organization uses FreeIPA for user authentication, you can configure Rancher to allow your users to login using their FreeIPA credentials.

>**Prerequisites:**
>
>- You must have a [FreeIPA Server](https://www.freeipa.org/) configured.
>- Create a service account in FreeIPA with `read-only` access. Rancher uses this account to verify group membership when a user makes a request using an API key.
>- Read [External Authentication Configuration and Principal Users]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/authentication/#external-authentication-configuration-and-principal-users).

1.  Sign into Rancher using a local user assigned the `administrator` role (i.e., the _local principal_).

2.	From the **Global** view, select **Security > Authentication** from the main menu.

3.	Select **FreeIPA**.

4.	Complete the **Configure an FreeIPA server** form.

	You may need to log in to your domain controller to find the information requested in the form.

	>**Using TLS?**
 	>Make sure you have an LDAP certificate installed.
	<br/>
	<br/>
	>**User Search Base vs. Group Search Base**
	>
	>When configuring FreeIPA authentication, you must enter a search base for your users. This search base allows Rancher to search for users that are in your FreeIPA.
    <br/>
	<br/>
  	> **Note:** This field is only for search bases and not for search filters.
	>
	>- If your users and groups are in the search base, complete only the User Search Base.
	>- If your groups are in a different search base, you can optionally complete the Group Search Base. This field is dedicated to searching groups, but is not required.

5.	If your FreeIPA deviates from the standard AD schema, complete the **Customize Schema** form to match it. Otherwise, skip this step.

	>**Search Attribute** The Search Attribute field defaults with three specific values by default: `sAMAccountName|sn|givenName`. After FreeIPA is configured, when a user enters text to add users or groups, Rancher automatically queries the FreeIPA server and attempts to match fields by sAMAccountName, last name, or first name. Rancher specifically searches for users/groups that begin with the text entered in the search field.
	>
	>The default field value `sAMAccountName|sn|givenName`, but you can configure this field to a subset of these fields. The pipe (`|`) between the fields separates these fields.
	>
	> * `sAMAccountName`: Username
	> * `sn`: Last Name
	> * `givenName`: First Name
	>
	> With this search attribute, Rancher creates search filters for users and groups, but you *cannot* add your own search filters in this field.

6.	Enter your FreeIPA username and password in **Test and enable authentication** to confirm that Rancher is configured to use FreeIPA authentication.

**Result:**

- FreeIPA authentication is configured.
- You are signed into Rancher with your FreeIPA account (i.e., the _external principal_).
