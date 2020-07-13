---
title: User Preferences
weight: 7000
---

> This page is under construction.

Within Rancher, each user has a number of settings associated with their login: personal preferences, API keys, etc. You can configure these settings by choosing from the **User Settings** menu. You can open this menu by clicking your avatar, located within the main menu.

![User Settings Menu]({{<baseurl>}}/img/rancher/user-settings.png)

The available user settings are:

- [API & Keys]({{<baseurl>}}/rancher/v2.x/en/user-settings/api-keys/): If you want to interact with Rancher programmatically, you need an API key. Follow the directions in this section to obtain a key.
- [Cloud Credentials]({{<baseurl>}}/rancher/v2.x/en/user-settings/cloud-credentials/): Manage cloud credentials [used by node templates]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-templates) to [provision nodes for clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters). Note: Available as of v2.2.0. 
- [Node Templates]({{<baseurl>}}/rancher/v2.x/en/user-settings/node-templates): Manage templates [used by Rancher to provision nodes for clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters).
- [Preferences]({{<baseurl>}}/rancher/v2.x/en/user-settings/preferences): Sets superficial preferences for the Rancher UI.
- Log Out: Ends your user session.

# Preferences

Each user can choose preferences to personalize their Rancher experience. To change preference settings, open the **User Settings** menu and then select **Preferences**.

## Theme

Choose your background color for the Rancher UI. If you choose **Auto**, the background color changes from light to dark at 6 PM, and then changes back at 6 AM.

## My Account

This section displays the **Name** (your display name) and **Username** (your login) used for your session. To change your login's current password, click the **Change Password** button.

## Table Row per Page

On pages that display system objects like clusters or deployments in a table, you can set the number of objects that display on the page before you must paginate. The default setting is `50`.
