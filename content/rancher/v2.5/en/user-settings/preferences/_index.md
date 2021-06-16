---
title: User Preferences
weight: 7012
---

Each user can choose preferences to personalize their Rancher experience. To change preference settings, open the **User Settings** menu and then select **Preferences**.

The preferences available will differ depending on whether the **User Settings** menu was accessed while on the Cluster Manager UI or the Cluster Explorer UI.

{{% tabs %}}
{{% tab "Cluster Manager" %}}
## Theme

Choose your background color for the Rancher UI. If you choose **Auto**, the background color changes from light to dark at 6 PM, and then changes back at 6 AM.

## My Account

This section displays the **Name** (your display name) and **Username** (your login) used for your session. To change your login's current password, click the **Change Password** button.

## Table Row per Page

On pages that display system objects like clusters or deployments in a table, you can set the number of objects that display on the page before you must paginate. The default setting is `50`.

{{% /tab %}}
{{% tab "Cluster Explorer" %}}
## Theme

Choose your background color for the Rancher UI. If you choose **Auto**, the background color changes from light to dark at 6 PM, and then changes back at 6 AM.

## Login Landing Page

Choose the default page to display after logging in.

## Date Format

Choose your preferred format to display dates. By default, dates are displayed in the form `Wed, Jun 9 2021`.

## Time Format

Choose your preferred format to display time. By default, the 12-hour format is used.

## Table Row per Page

On pages that display system objects like clusters or deployments in a table, you can set the number of objects that display on the page before you must paginate. The default setting is `50`.

## YAML Editor Key Mapping

Choose the editor used when editing YAML configurations. When Emacs or Vim is chosen, the editor's shortcut commands can also be used.

## Enable Developer Tools & Features

Enables developer tools and features to be used.

## Hide All Type Description Boxes

Hides all description boxes.

## Helm Charts

When deploying applications from the "Apps & Marketplace", choose whether to show only released versions of the Helm chart or to include prerelease versions as well.

{{% /tab %}}
{{% /tabs %}}
