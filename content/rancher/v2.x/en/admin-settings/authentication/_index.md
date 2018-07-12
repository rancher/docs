---
title: Authentication
weight: 50
aliases:
	-/rancher/v2.x/en/concepts/global-configuration/authentication
---
One of the key features that Rancher adds to Kubernetes is centralized user authentication. This feature allows your users to use one set of credentials to authenticate with any of your Kubernetes clusters.

This centralized user authentication is accomplished using the Rancher authentication proxy, which is installed along with the rest of Rancher. This proxy authenticates your users and forwards their requests to your Kubernetes clusters using a service account.

<!-- todomark add diagram -->

### External vs. Local Authentication

The Rancher authentication proxy integrates with the following external authentication services.

- Microsoft Active Directory
- Microsoft Azure AD
- GitHub
- FreeIPA
- OpenLDAP

However, Rancher also provides local authentication.

In most cases, you should use an external authentication service over local, as external authentication allows user management from a central location. However, you may want a few local authentication users for managing Rancher under rare circumstances, such as if Active Directory is down.

For more information on how to configure external authentication or local authentication, see [Authentication](../../../tasks/global-configuration/authentication/). 

### External Authentication Configuration and Principal Users

Configuration of external authentication requires:

- A local user assigned the administrator role, called hereafter the _local principal_.
- An external user that can authenticate with your external authentication service, called hereafter the _external principal_.

Configuration of external authentication affects how principal users are managed within Rancher. Follow the list below to better understand these effects.

1. Sign into Rancher as the local principal and complete configuration of external authentication.

	![Sign In]({{< baseurl >}}/img/rancher/sign-in.png)

2. Rancher associates the external principal with the local principal. These two users share the local principal's user ID.

	![Principal ID Sharing]({{< baseurl >}}/img/rancher/principal-ID.png)

3. After you complete configuration, Rancher automatically signs out the local principal.

	![Sign Out Local Principal]({{< baseurl >}}/img/rancher/sign-out-local.png)

4. Then, Rancher automatically signs you back in as the external principal.

	![Sign In External Principal]({{< baseurl >}}/img/rancher/sign-in-external.png)

5. Because the external principal and the local principal share an ID, no unique object for the external principal displays on the Users page. 

	![Sign In External Principal]({{< baseurl >}}/img/rancher/users-page.png)

6. The external principal and the local principal share the same access rights.

