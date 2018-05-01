---
title: Catalogs
weight: 2250
---
# Catalogs

Rancher catalog builds on an enhanced version of Helm. All upstream Helm charts can work on Rancher, but Rancher adds several enhancements to make the user experience better.

## Catalog Git Repositories

Rancher stores Helm charts in git repositories to expedite the fetch and update of charts. In Rancher 2.0, only global catalogs are supported. Support for cluster-level and project-level charts will be added in the future.

## Enhanced Revision Tracking

While Helm supports versioned deployments, Rancher added capabilities to track and display what exactly changed between different revisions.

## Streamlined Application Launch

Rancher supports simplified README files and questions files to streamline the application launch process. Users need not read through the entire list of Helm variables to understand how to launch an application.

## Application Resource Management

Rancher tracks all the resources created by a specific application. Users can easily navigate to and troubleshoot on a page listing all the workload objects used to power an application.
