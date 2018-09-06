---
title: Rancher Server URL
weight: 1105
aliases:
    - /rancher/v2.x/en/concepts/global-configuration/server-url/
    - /rancher/v2.x/en/tasks/global-configuration/server-url/
---

This is the URL of your Rancher Server. All nodes in your cluster must resolve to this URL. This is also the URL that serves the Rancher API.

You are prompted for this URL upon the very first Rancher login. You should set the URL to the main entry point to the Rancher Server. When a load balancer fronts a Rancher Server cluster, the URL should resolve to the load balancer. The system will automatically try to infer the Rancher Server URL from the IP address or host name of the host running the Rancher Server. This is only correct if you are running a single node Rancher Server installation. In most cases, therefore, you need to set the Rancher Server URL to the correct value yourself.

Even though you can edit the Rancher Server URL later in the **Settings** UI from the **Global** view, updating the Rancher Server URL must be done with extreme care.

- You must also update the SSL certificates to match the new URL.
- Unless you make sure the old URL continues to work, you will have to re-register all the nodes and clusters so that they point to the new Rancher Server URL.


