---
title: Create a Custom Benchmark Version for Running a Cluster Scan
weight: 9
--- 
 
There could be some Kubernetes cluster setups that require custom configurations of the Benchmark tests. For example, the path to the Kubernetes config files or certs might be different than the standard location where the upstream CIS Benchmarks look for them.

It is now possible to create a custom Benchmark Version for running a cluster scan using the `rancher-cis-benchmark` application.

For details, see [this page.](../explanations/integrations-in-rancher/cis-scans/custom-benchmark.md)