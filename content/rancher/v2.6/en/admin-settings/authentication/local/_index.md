---
title: Local Authentication
weight: 1111
aliases:
    - /rancher/v2.5/en/tasks/global-configuration/authentication/local-authentication/
---

Local authentication is the default until you configure an external authentication provider. Local authentication is where Rancher stores the user information, i.e. names and passwords, of who can log in to Rancher. By default, the `admin` user that logs in to Rancher for the first time is a local user.

## Adding Local Users

Regardless of whether you use external authentication, you should create a few local authentication users so that you can continue using Rancher if your external authentication service encounters issues.

1.	From the **Global** view, select **Users** from the navigation bar.

2.	Click **Add User**. Then complete the **Add User** form. Click **Create** when you're done.
