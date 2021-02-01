---
title: Overriding Template Settings
weight: 33
---

When a user creates an RKE template, each setting in the template has a switch in the Rancher UI that indicates if users can override the setting. This switch marks those settings as **Allow User Override.**

After a cluster is created with a template, end users can't update any of the settings defined in the template unless the template owner marked them as **Allow User Override.** However, if the template is [updated to a new revision]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/creating-and-revising) that changes the settings or allows end users to change them, the cluster can be upgraded to a new revision of the template and the changes in the new revision will be applied to the cluster.

When any parameter is set as **Allow User Override** on the RKE template, it means that end users have to fill out those fields during cluster creation and they can edit those settings afterward at any time.

The **Allow User Override** model of the RKE template is useful for situations such as:

- Administrators know that some settings will need the flexibility to be frequently updated over time
- End users will need to enter their own access keys or secret keys, for example, cloud credentials or credentials for backup snapshots