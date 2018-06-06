---
title: Enabling Cluster Logging
weight: 3600
draft: true
---
Cluster level logging allows us to obtain logs related to all containers in a cluster.
Once cluster level logging is enabled, the standard output and standard error for each container,
log files are available under path `/var/log/containers/` on each host.

The log will be shipped to the any of the targets chosen. The targets are :

 * Embedded elasticsearch
 * Elasticsearch
 * Splunk
 * Kafka
 * Syslog


## Embedded elastic search

1. Choose 'Embedded elastic search'
2. Specify the CPU and Memory configuration
3. In the prefix field (Index Patterns section), specify the cluster
name for which we need to enable logging
4. Add any custom log fields as required
5. Click 'Save'
6. Deploy workloads and observe elastic search for any logs
