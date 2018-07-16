---
title: Admin Settings
weight: 1100
aliases:
  - /rancher/v2.x/en/concepts/global-configuration
---

After installing Rancher 2.0, you should

1. Set a Rancher Server URL, which your cluster nodes will use to resolve with Rancher. You'll be prompted to set this URL upon your first log in.

2. Set up external user authentication and permissions so that your organization can log into Rancher.

After making these initial configurations, you might also want to configure one or more _pod security policies_, which are sets of conditions that your pods must meet for Kubernetes to allow them to run.