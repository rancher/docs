---
title: Configuring Microsoft Active Directory Federation Service (SAML)
weight: 1205
---

If your organization uses Microsoft Active Directory Federation Services (AD FS) for user authentication, you can configure Rancher to allow your users to log in using their AD FS credentials.

## Prerequisites

You must have Rancher installed.

- Obtain your Rancher Server URL. During AD FS configuration, substitute this URL for the `<RANCHER_SERVER>` placeholder.
- You must have a global administrator account on your Rancher installation.

You must have a [Microsoft AD FS Server](https://docs.microsoft.com/en-us/windows-server/identity/active-directory-federation-services) configured.

- Obtain your AD FS Server IP/DNS name. During AD FS configuration, substitute this IP/DNS name for the `<AD_SERVER>` placeholder.
- You must have access to add [Relying Party Trusts](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-relying-party-trust) on your AD FS Server.

## Setup Outline

Setting up Microsoft AD FS with Rancher Server requires configuring AD FS on your Active Directory server, and configuring Rancher to utilize your AD FS server. The following pages serve as guides for setting up Microsoft AD FS authentication on your Rancher installation.

- [1. Configuring Microsoft AD FS for Rancher]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup)
- [2. Configuring Rancher for Microsoft AD FS]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/microsoft-adfs/rancher-adfs-setup)

{{< saml_caveats >}}


### [Next: Configuring Microsoft AD FS for Rancher]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup)
