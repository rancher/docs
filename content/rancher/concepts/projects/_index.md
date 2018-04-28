---
title: Projects
weight: 2150
---

# Projects

## What's a Project?

Project is a new concept introduced by Rancher. It is not a native Kubernetes construct. A project captures a set of policies for a set of namespaces. A user can be assigned a specific role in a project. A role can be owner, member, read-only, or custom. Policies include Kubernetes Role-Based Access Control (RBAC) policies and pod security policies. Rancher 2.0 also implements a canned network policy that isolated containers in different projects. Future version of Rancher will implement more flexible network policies.

### Authorization

Coming Soon

### Pod Security Policies

Coming Soon

## Namespaces

Kubernetes resources belong to specific namespaces. Rancher 2.0 relies on namespaces to isolate resources among users and apps. When the user deploys an app from the catalog, for example, he can choose to deploy that app into its own namespace, so that resource names in one app will not conflict with resource names in another. Namespaces must be globally unique. It is often difficult for users to pick unique namespace names. Rancher therefore encourages the pattern where users work with projects, and the system generates unique namespace names automatically.
