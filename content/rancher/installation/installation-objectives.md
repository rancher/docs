---
title: Installation Objectives
weight: 75
---
# Installation Checklist

1. [Installation Scenarios]({{< ref "installation-scenarios.md" >}})

	You can install {{< product >}} and Kubernetes in virtually any network environement in a variety of configurations. Before you start installation, review the different use cases we've identified and choose the install solution best for you.

2.	[Review {{< product >}} Server Requirements]({{< ref "requirements/_index.md" >}})

	Depending on your install scenario, you'll have a different set of requirements you must meet. [Installation Scenarios]({{< ref "installation-scenarios.md" >}}) lists which set of requirements applies to you.

3.	Provision Your Linux Host(s)

	Provision your Linux host or cluster according to the [requirements]
	({{< ref "requirements/_index.md" >}}).

4.	[Install {{< product >}}]({{< ref "server-installation/_index.md" >}})

	Complete the install procedure for your installation scenario.

5.	[Configure Load Balancing]({{< ref "config-load-balancing.md" >}})

	Configure a solution for balancing loads between the different nodes in your Kubernetes clusters.

6.	[Configure SSL]({{< ref "config-ssl" >}})

	Finally, you must configure your nodes for SSL communication. Obtain an SSL certificate and install it on your {{< product >}} nodes.
