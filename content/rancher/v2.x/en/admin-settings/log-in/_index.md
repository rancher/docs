---
title: First Log In
weight: 1105
aliases:
    - /rancher/v2.x/en/concepts/global-configuration/server-url/
    - /rancher/v2.x/en/tasks/global-configuration/server-url/
    - /rancher/v2.x/en/admin-settings/server-url
---

After you log into Rancher for the first time, Rancher will prompt you for a **Rancher Server URL**.You should set the URL to the main entry point to the Rancher Server. When a load balancer sits in front a Rancher Server cluster, the URL should resolve to the load balancer. The system will automatically try to infer the Rancher Server URL from the IP address or host name of the host running the Rancher Server. This is only correct if you are running a single node Rancher Server installation. In most cases, therefore, you need to set the Rancher Server URL to the correct value yourself.

>**Important!** After you set the Rancher Server URL, we do not support updating it. Set the URL with extreme care.
