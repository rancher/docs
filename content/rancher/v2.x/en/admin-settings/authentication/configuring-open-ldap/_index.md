---
title: Configuring OpenLDAP
weight: 125
aliases:
	-/rancher/v2.x/en/tasks/global-configuration/authentication/openLDAP
---

_Available as of v2.0.5_

If your organization uses OpenLDAP for user authentication, you can configure Rancher to allow your users to login using their OpenLDAP credentials.

>**Prerequisites:**
>
>- You must have an [OpenLDAP Server](https://www.openldap.org/) configured.
>- Create a service account in OpenLDAP with `read-only` access. Rancher uses this account to verify group membership when a user makes a request using an API key.
>- Read [External Authentication Configuration and Principal Users]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/authentication/#external-authentication-configuration-and-principal-users).

1.  Sign into Rancher using a local user assigned the `administrator` role (i.e., the _local principal_).

2.	From the **Global** view, select **Security > Authentication** from the main menu.

3.	Select **OpenLDAP**.

4.	Complete the **Configure an OpenLDAP server** form.

	You may need to log in to your domain controller to find the information requested in the form.

	>**Using TLS?**
 	>If the certificate is self-signed or not from a recognized certificate authority, make sure you provide the complete chain. That chain is needed to verify the server's certificate.
	<br/>
	<br/>
	>**User Search Base vs. Group Search Base**
	>
	>Search base allows Rancher to search for users and groups that are in your openLDAP.  These fields are only for search bases and not for search filters.
	>
	>* If your users and groups are in the same search base, complete only the User Search Base.
	>* If your groups are in a different search base, you can optionally complete the Group Search Base. This field is dedicated to searching groups, but is not required.


5.	If your OpenLDAP deviates from the standard OpenLDAP schema, complete the **Customize Schema** form to match it. Otherwise, skip this step.

	>**Search Attribute** The Search Attribute field defaults with three specific values: `uid|sn|givenName`. After openLDAP is configured, when a user enters text to add users or groups, Rancher automatically queries the openLDAP server and attempts to match fields by user id, last name, or first name. Rancher specifically searches for users/groups that begin with the text entered in the search field.
	>
	>The default field value `uid|sn|givenName`, but you can configure this field to a subset of these fields. The pipe (`|`) between the fields separates these fields.
	>
	> * `uid`: User ID
	> * `sn`: Last Name
	> * `givenName`: First Name
	>
	> With this search attribute, Rancher creates search filters for users and groups, but you *cannot* add your own search filters in this field.

6.	Enter your OpenLDAP username and password in **Authenticate with OpenLDAP** to confirm that Rancher is configured to use OpenLDAP authentication.

**Result:**

- OpenLDAP authentication is configured.
- You are signed into Rancher with your OpenLDAP account (i.e., the _external principal_).
