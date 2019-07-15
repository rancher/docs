---
title: Deployment Types
weight: 100
---

For production and any installation deemed as "important" should use a three-node installation. Having multiple Rancher instances running on multiple nodes ensures high availability that cannot be accomplished with a single node environment. It's also strongly recommended to have a "staging" or "pre-production" Rancher HA environment that mirrors your production environment as closely as possible in terms of software and hardware configuration. Also consider the following points for your Rancher HA setup:
 - For best performance, run all three of your nodes in the same geographic datacenter. If you are running nodes in the cloud, such as AWS, run each node in a separate Availability Zone. For example, launch node 1 in us-west-2a, node 2 in us-west-2b, and node 3 in us-west-2c.
 - Don't run other workloads / microservices in your Rancher HA cluster.
 - Run Rancher HA within the system and hardware requirements as closely as possible. The more you deviate from this, the more risk you take. However metrics-driven capacity planning analysis should be the ultimate guidance for scaling Rancher as published requirements take into account a variety of workload types. You can use the including Prometheus and Grafana monitoring framework to establish a baseline for key metrics as you scale. 
 - Don't run Rancher HA in a hosted Kubernetes environment such as GKE, EKS, or AKS. Rancher upgrades and rollbacks are not supported due to etcd snapshot support

