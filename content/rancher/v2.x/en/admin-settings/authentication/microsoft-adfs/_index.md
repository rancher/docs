---
title: Configuring Microsoft Active Directory Federation Service (SAML)
weight: 1205
---
_Available as of v2.0.7_

If your organization uses Microsoft Active Directory Federation Services (AD FS) for user authentication, you can configure Rancher to allow your users to log in using their AD FS credentials.

## Prerequisites


- You must have Rancher installed.

  - Obtain your Rancher Server URL. During AD FS configuration, substitute this URL for the `<RANCHER_SERVER>` placeholder.

  - You must have a global administrator account on your Rancher installation.

- You must have a [Microsoft AD FS Server](https://docs.microsoft.com/en-us/windows-server/identity/active-directory-federation-services) configured.

	- Obtain your AD FS Server IP/DNS name. During AD FS configuration, substitute this IP/DNS name for the `<AD_SERVER>` placeholder.

	- You must have access to add [Relying Party Trusts](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-relying-party-trust) on your AD FS Server.



## Setup Outline

Setting up Microsoft AD FS with Rancher Server requires configuring AD FS on your Active Directory server, and configuring Rancher to utilize your AD FS server. The following pages serve as guides for setting up Microsoft AD FS authentication on your Rancher installation.

- [1 — Configuring Microsoft AD FS for Rancher]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup)
- [2 — Configuring Rancher for Microsoft AD FS]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/microsoft-adfs/rancher-adfs-setup)

>**Active Directory Federation Service Caveats:**
>
>- AD FS does not support search or lookup. When adding users to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), the exact IDs must be entered correctly.
>- When adding users to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), group IDs are not supported unless the admin who turned on access control is a member of the group.
>- When adding a group that includes an admin to [clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/) or [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/), add it from the drop-down rather than the search bar. If you add the group using the search bar, the group will not get added.

### [Next: Configuring Microsoft AD FS for Rancher]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup)
