---
title: Rancher Server URL
weight: 25
aliases:
    -/rancher/v2.x/en/concepts/global-configuration/server-url
    -/rancher/v2.x/en/tasks/global-configuration/server-url
---

The first time that you log into {{< product >}}, the system prompts you for the Rancher Server URL, which is the IP address or host name that your Kubernetes nodes register with. All nodes in your cluster must resolve to this URL.

If you need to update this URL, select **Settings** from the **Global** view.

### When Should I Update the Rancher Server URL?

If the URL of your {{< product >}} Server changes, you must update the {{< product >}} Server URL so that your nodes can continue communicating with the {{< product >}} Server.
