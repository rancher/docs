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
>- SAML Protocol does not support search or lookup for users or groups. Therefore, there is no validation on users or groups when adding them to Rancher.
>- When adding users, the exact user IDs (i.e. `UID Field`) must be entered correctly. As you type the user ID, there will be no search for other  user IDs that may match.
>- When adding groups, you *must* select the group from the drop-down that is next to the text box. Rancher assumes that any input from the text box is a user.
>   - The group drop-down shows *only* the groups that you are a member of. You will not be able to add groups that you are not a member of.


### [Next: Configuring Microsoft AD FS for Rancher]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup)
