---
title: Rancher Kubernetes
weight: 1
---

> This page is under construction.

The Rancher CLI comes with a Kubernetes distribution called Rancher Kubernetes, which allows you to set up a Kubernetes cluster more easily as a prerequisite to installing Rancher.

Rancher Kubernetes is based on K3s, and has more secure default settings. It is a new feature in Rancher 2.5.

Rancher Kubernetes clusters can also be imported into Rancher.

Rancher Kubernetes is not to be confused with RKE Kubernetes or K3s Kubernetes, which are separate Kubernetes distributions provided by Rancher. RKE is the oldest of the three distributions. When the Enterprise Cluster Manager is enabled, Rancher can provision RKE Kubernetes clusters, but Rancher Kubernetes clusters and K3s Kubernetes clusters have to be installed separately and imported into Rancher.

In other words, Rancher can only install Rancher Kubernetes when you are using the Rancher CLI  to set up a local Kubernetes cluster for the Rancher server.