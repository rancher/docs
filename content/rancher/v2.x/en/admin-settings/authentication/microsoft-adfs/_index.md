---
title: Configuring Microsoft Active Directory Federation Service (SAML)
weight: 1205
---
_Available as of v2.0.7_

If your organization uses Microsoft Active Directory Federation Services (AD FS) for user authentication, you can configure Rancher to allow your users to log in using their AD FS credentials.

>**Prerequisites:**
>
>- You must have Rancher installed.
>  - Your Rancher Server URL will be substituted for `<rancher-server>` in the following guides.
>- You must have a [Microsoft AD FS Server](https://docs.microsoft.com/en-us/windows-server/identity/active-directory-federation-services) configured.
>  - Your AD FS Server IP/DNS Name will be substituted for `<ad-server>` in the following guides.
>- You must be able to add `Relying Party Trusts` on your AD FS Server.
>- You must have a global admin account on your Rancher installation.

### Setup Outline

Setting up Microsoft AD FS with Rancher Server requires configuring AD FS on your Active Directory server, and configuring Rancher to utilize your AD FS server. The following pages serve as guides for setting up Microsoft AD FS authentication on your Rancher installation.

- [Microsoft AD FS Setup]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup)

	Set up Microsoft AD FS to expect Rancher for authentication

- [Rancher AD FS Setup]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/microsoft-adfs/rancher-adfs-setup)

 	Configure Rancher Server to use Microsoft AD FS for authentication

>**Active Directory Federation Service Caveats:**
>
>- AD FS does not support search or lookup. When adding users to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), the exact IDs must be entered correctly.
>- When adding users to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), group IDs are not supported unless the admin who turned on access control is a member of the group.
>- When adding a group that includes an admin to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), add it from the drop-down rather than the search bar. If you add the group using the search bar, the group will not get added.
