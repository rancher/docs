---
title: 1 - Microsoft AD FS Setup
weight: 1205
---

## Microsoft AD FS Setup

1. Open the **AD FS Management** console.
  ![AD FS Management Console Screenshot]({{< baseurl >}}/img/rancher/adfs/adfs-overview.png)

1. Select **Add Relying Party Trust...** in the right actions menu.
  ![ADFS Add RPT Wizard Step 1]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-1.png)

1. Select **Enter data about the relying party manually** as the option for obtaining data about the relying party.
  ![ADFS Add RPT Wizard Step 2]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-2.png)
  
1. Enter your desired **Display name** for your Relying Party Trust. For example, `Rancher`.
  ![ADFS Add RPT Wizard Step 3]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-3.png)
  
1. Select **AD FS profile** as the configuration profile for your relying party trust.
  ![ADFS Add RPT Wizard Step 4]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-4.png)
  
1. Leave the **optional token encryption certificate** empty, as Rancher ADFS will not be using one.
  ![ADFS Add RPT Wizard Step 5]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-5.png)
  
1. Select **Enable support for the SAML 2.0 WebSSO protocol**
  and enter `https://<rancher-server>/v1-saml/adfs/saml/acs` for the service URL.
  ![ADFS Add RPT Wizard Step 6]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-6.png)  
  
1. Add `https://<rancher-server>/v1-saml/adfs/saml/metadata` as the **Relying party trust identifier**
  ![ADFS Add RPT Wizard Step 7]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-7.png)
  
1. This tutorial will not cover multi-factor authentication; please refer to the Microsoft documentation if you would like to configure multi-factor authentication.
  ![ADFS Add RPT Wizard Step 8]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-8.png)
  
1. You may select either of these options depending on your desired use case. However, for the purposes of this guide, select **Permit all users to access this relying party**.
  ![ADFS Add RPT Wizard Step 9]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-9.png)

1. After reviewing your settings, select **Next** to add the relying party trust.
  ![ADFS Add RPT Wizard Step 10]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-10.png)
  
1. Select **Open the Edit Claim Rules...** and click **Close**.
  ![ADFS Add RPT Wizard Step 11]({{< baseurl >}}/img/rancher/adfs/adfs-add-rpt-11.png)
  
1. On the **Issuance Transform Rules** tab, click **Add Rule...**.
  ![ADFS Edit Claim Rules]({{< baseurl >}}/img/rancher/adfs/adfs-edit-cr.png)
  
1. Select **Send LDAP Attributes as Claims** as the Claim rule template.
  ![ADFS Add Transform Claim Rule Step 1]({{< baseurl >}}/img/rancher/adfs/adfs-add-tcr-1.png)
  
1. Set the **Claim rule name** to your desired name (for example, `Rancher Attributes`) and select **Active Directory** as the Attribute store. Create the following mapping to reflect the table below:

    | LDAP Attribute                               | Outgoing Claim Type |
    | -------------------------------------------- | ------------------- |
    | Given-Name                                   | Given Name          |
    | User-Principal-Name                          | UPN                 |
    | Token-Groups - Qualified by Long Domain Name | Group               |
    | SAM-Account-Name                             | Name                |
  ![ADFS Add Transform Claim Rule Step 2]({{< baseurl >}}/img/rancher/adfs/adfs-add-tcr-2.png)

1. Download the `federationmetadata.xml` from your AD server at: 
```
https://<ad-server>/federationmetadata/2007-06/federationmetadata.xml
```

### [Next: Rancher AD FS Setup]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/microsoft-adfs/rancher-adfs-setup/)
