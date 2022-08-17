---
title: 1. Configuring Microsoft AD FS for Rancher
weight: 1205
---

Before configuring Rancher to support AD FS users, you must add Rancher as a [relying party trust](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/technical-reference/understanding-key-ad-fs-concepts) in AD FS. 

1. Log into your AD server as an administrative user.

1. Open the **AD FS Management** console. Select **Add Relying Party Trust...** from the **Actions** menu and click **Start**.
  
    {{< img "/img/rancher/adfs/adfs-overview.png" "">}}

1. Select **Enter data about the relying party manually** as the option for obtaining data about the relying party.

    {{< img "/img/rancher/adfs/adfs-add-rpt-2.png" "">}}
    
1. Enter your desired **Display name** for your Relying Party Trust. For example, `Rancher`.

    {{< img "/img/rancher/adfs/adfs-add-rpt-3.png" "">}}
  
1. Select **AD FS profile** as the configuration profile for your relying party trust.
  
    {{< img "/img/rancher/adfs/adfs-add-rpt-4.png" "">}}
  
1. Leave the **optional token encryption certificate** empty, as Rancher AD FS will not be using one.
  
    {{< img "/img/rancher/adfs/adfs-add-rpt-5.png" "">}}
  
1. Select **Enable support for the SAML 2.0 WebSSO protocol**
  and enter `https://<rancher-server>/v1-saml/adfs/saml/acs` for the service URL.
  
    {{< img "/img/rancher/adfs/adfs-add-rpt-6.png" "">}}
  
1. Add `https://<rancher-server>/v1-saml/adfs/saml/metadata` as the **Relying party trust identifier**.
  
    {{< img "/img/rancher/adfs/adfs-add-rpt-7.png" "">}}
  
1. This tutorial will not cover multi-factor authentication; please refer to the [Microsoft documentation](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/configure-additional-authentication-methods-for-ad-fs) if you would like to configure multi-factor authentication.
  
    {{< img "/img/rancher/adfs/adfs-add-rpt-8.png" "">}}
  
1. From **Choose Issuance Authorization RUles**, you may select either of the options available according to use case. However, for the purposes of this guide, select **Permit all users to access this relying party**.
  
    {{< img "/img/rancher/adfs/adfs-add-rpt-9.png" "">}}

1. After reviewing your settings, select **Next** to add the relying party trust.
  
    {{< img "/img/rancher/adfs/adfs-add-rpt-10.png" "">}}

  
1. Select **Open the Edit Claim Rules...** and click **Close**.
  
    {{< img "/img/rancher/adfs/adfs-add-rpt-11.png" "">}}
  
1. On the **Issuance Transform Rules** tab, click **Add Rule...**.
  
    {{< img "/img/rancher/adfs/adfs-edit-cr.png" "">}}
  
1. Select **Send LDAP Attributes as Claims** as the **Claim rule template**.

    {{< img "/img/rancher/adfs/adfs-add-tcr-1.png" "">}}
  
1. Set the **Claim rule name** to your desired name (for example, `Rancher Attributes`) and select **Active Directory** as the **Attribute store**. Create the following mapping to reflect the table below:

    | LDAP Attribute                               | Outgoing Claim Type |
    | -------------------------------------------- | ------------------- |
    | Given-Name                                   | Given Name          |
    | User-Principal-Name                          | UPN                 |
    | Token-Groups - Qualified by Long Domain Name | Group               |
    | SAM-Account-Name                             | Name                |
    <br/>
    {{< img "/img/rancher/adfs/adfs-add-tcr-2.png" "">}}

1. Download the `federationmetadata.xml` from your AD server at: 
```
https://<AD_SERVER>/federationmetadata/2007-06/federationmetadata.xml
```

**Result:** You've added Rancher as a relying trust party. Now you can configure Rancher to leverage AD.

### [Next: Configuring Rancher for Microsoft AD FS]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/microsoft-adfs/rancher-adfs-setup/)
