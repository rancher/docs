---
title: Telemetry
weight: 8008
---

### What is Telemetry?

Telemetry collects aggregate information about the size of Rancher installations, versions of components used, and which features are used.  This information is used by Rancher Labs to help make the product better and is not shared with third-parties.

### What information is collected?

No specific identifying information like usernames, passwords, or the names or addresses of user resources will ever be collected.

The primary things collected include:

  - Aggregate counts (smallest, average, largest, total) of nodes per-cluster and their size (e.g. CPU cores & RAM).
  - Aggregate counts of logical resources like Clusters, Projects, Namespaces, and Pods.
  - Counts of what driver was used to deploy clusters and nodes (e.g. GKE vs EC2 vs Imported vs Custom).
  - Versions of Kubernetes components, Operating Systems and Docker that are deployed on nodes.
  - Whether some optional components are enabled or not (e.g. which auth providers are used).
  - The image name & version of Rancher that is running.
  - A unique randomly-generated identifier for this installation.

### Can I see the information that is being sent?

If Telemetry is enabled, you can go to `https://<your rancher server>/v1-telemetry` in your installation to see the current data.

If Telemetry is not enabled, the process that collects the data is not running, so there is nothing being collected to look at.

### How do I turn it on or off?

After initial setup, an administrator can go to the `Settings` page in the `Global` section of the UI and click Edit to change the `telemetry-opt` setting to either `in` or `out`.
