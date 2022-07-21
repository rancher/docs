---
title: Role-Based Access Control
shortTitle: RBAC
weight: 2
---

This section describes the expectations for Role-Based Access Control (RBAC) for Prometheus Federator.

As described in the section on [namespaces](monitoring-alerting/prometheus-federator/prometheus-federator#namespaces), Prometheus Federator expects that Project Owners, Project Members, and other users in the cluster with Project-level permissions (e.g. permissions in a certain set of namespaces identified by a single label selector) have minimal permissions in any namespaces except the Project Registration Namespace (which is imported into the project by default) and those that already comprise their projects. Therefore, in order to allow Project Owners to assign specific chart permissions to other users in their Project namespaces, the Helm Project Operator will automatically watch the following bindings:

- ClusterRoleBindings
- RoleBindings in the Project Release Namespace

On observing a change to one of those types of bindings, the Helm Project Operator will check whether the `roleRef` that the the binding points to matches a ClusterRole with the name provided under:

- `helmProjectOperator.releaseRoleBindings.clusterRoleRefs.admin`
- `helmProjectOperator.releaseRoleBindings.clusterRoleRefs.edit`
- `helmProjectOperator.releaseRoleBindings.clusterRoleRefs.view`

By default, these roleRefs will correspond to `admin`, `edit`, and `view` respectively, which are the [default Kubernetes user-facing roles](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles).

:::note

For Rancher RBAC users, these [default Kubernetes user-facing roles](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) directly correlate to the `Project Owner`, `Project Member`, and `Read-Only` default Project Role Templates.

:::

If the `roleRef` matches, the Helm Project Operator will filter the `subjects` of the binding for all Users and Groups and use that to automatically construct a RoleBinding for each Role in the Project Release Namespace with the same name as the role and the following labels:

- `helm.cattle.io/project-helm-chart-role: {{ .Release.Name }}`
- `helm.cattle.io/project-helm-chart-role-aggregate-from: <admin|edit|view>`

By default, `rancher-project-monitoring`, the underlying chart deployed by Prometheus Federator, creates three default Roles per Project Release Namespace that provide `admin`, `edit`, and `view` users to permissions to view the Prometheus, Alertmanager, and Grafana UIs of the Project Monitoring Stack to provide least privilege. However, if a Cluster Admin would like to assign additional permissions to certain users, they can either directly assign RoleBindings in the Project Release Namespace to certain users or create Roles with the above two labels on them to allow Project Owners to control assigning those RBAC roles to users in their Project Registration namespaces.