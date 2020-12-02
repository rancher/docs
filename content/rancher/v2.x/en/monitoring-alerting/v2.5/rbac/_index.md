---
title: RBAC
weight: 3
aliases:
  - /rancher/v2.x/en/cluster-admin/tools/monitoring/rbac
  - /rancher/v2.x/en/monitoring-alerting/rbac
---
This section describes the expectations for RBAC for Rancher Monitoring.

## Cluster Admins

By default, only those with the cluster-admin `ClusterRole` should be able to:

- Install the `rancher-monitoring` App onto a cluster and all other relevant configuration performed on the chart deploy
  - e.g. whether default dashboards are created, what exporters are deployed onto the cluster to collect metrics, etc.
- Create / modify / delete Prometheus deployments in the cluster via Prometheus CRs
- Create / modify / delete Alertmanager deployments in the cluster via Alertmanager CRs
- Persist new Grafana dashboards or datasources via creating ConfigMaps in the appropriate namespace
- Expose certain Prometheus metrics to the k8s Custom Metrics API for HPA via a Secret in the `cattle-monitoring-system` namespace

## Users with k8s ClusterRole-based Permissions

The `rancher-monitoring` chart installs the following three `ClusterRoles`. By default, they aggregate into the corresponding k8s `ClusterRoles`:

| ClusterRole | Aggregates To Default K8s ClusterRole  |
| ------------------------------| ---------------------------|
| `monitoring-admin` | `admin`|
| `monitoring-edit` | `edit` |
| `monitoring-view` | `view ` |

These `ClusterRoles` provide different levels of access to the Monitoring CRDs based on the actions that can be performed:

| CRDs (monitoring.coreos.com) | Admin | Edit | View |
| ------------------------------| ---------------------------| ---------------------------| ---------------------------|
| <ul><li>`prometheuses`</li><li>`alertmanagers`</li></ul>| Get, List, Watch | Get, List, Watch | Get, List, Watch |
| <ul><li>`servicemonitors`</li><li>`podmonitors`</li><li>`prometheusrules`</li></ul>| * | * | Get, List, Watch |

On a high level, the following permissions are assigned by default as a result.

### Users with k8s Admin / Edit Permissions

Only those with the the cluster-admin / admin / edit `ClusterRole` should be able to:

- Modify the scrape configuration of Prometheus deployments via ServiceMonitor and PodMonitor CRs
- Modify the alerting / recording rules of a Prometheus deployment via PrometheusRules CRs

### Users with k8s View Permissions

Only those with who have some k8s `ClusterRole` should be able to:

- View the configuration of Prometheuses that are deployed within the cluster
- View the configuration of Alertmanagers that are deployed within the cluster
- View the scrape configuration of Prometheus deployments via ServiceMonitor and PodMonitor CRs
- View the alerting / recording rules of a Prometheus deployment via PrometheusRules CRs

## Additional Monitoring Roles

Monitoring also creates six additional `Roles` that are not assigned to users by default but are created within the cluster. Admins should use these roles to provide more fine-grained access to users:

| Role | Purpose  |
| ------------------------------| ---------------------------|
| monitoring-config-admin | Allow admins to assign roles to users to be able to view / modify Secrets and ConfigMaps within the cattle-monitoring-system namespace. Modifying Secrets / ConfigMaps in this namespace could allow users to alter the cluster's Alertmanager configuration, Prometheus Adapter configuration, additional Grafana datasources, TLS secrets, etc. |
| monitoring-config-edit | Allow admins to assign roles to users to be able to view / modify Secrets and ConfigMaps within the cattle-monitoring-system namespace. Modifying Secrets / ConfigMaps in this namespace could allow users to alter the cluster's Alertmanager configuration, Prometheus Adapter configuration, additional Grafana datasources, TLS secrets, etc. |
| monitoring-config-view | Allow admins to assign roles to users to be able to view Secrets and ConfigMaps within the cattle-monitoring-system namespace. Viewing Secrets / ConfigMaps in this namespace could allow users to observe the cluster's Alertmanager configuration, Prometheus Adapter configuration, additional Grafana datasources, TLS secrets, etc. |
| monitoring-dashboard-admin | Allow admins to assign roles to users to be able to edit / view ConfigMaps within the cattle-dashboards namespace. ConfigMaps in this namespace will correspond to Grafana Dashboards that are persisted onto the cluster. |
| monitoring-dashboard-edit | Allow admins to assign roles to users to be able to edit / view ConfigMaps within the cattle-dashboards namespace. ConfigMaps in this namespace will correspond to Grafana Dashboards that are persisted onto the cluster. |
| monitoring-dashboard-view | Allow admins to assign roles to users to be able to view ConfigMaps within the cattle-dashboards namespace. ConfigMaps in this namespace will correspond to Grafana Dashboards that are persisted onto the cluster. |

## Users with Rancher Cluster Manager Based Permissions

The relationship between the default roles deployed by Rancher Cluster Manager (i.e. cluster-owner, cluster-member, project-owner, project-member), the default k8s roles, and the roles deployed by the rancher-monitoring chart are detailed in the table below:

| Cluster Manager Role | k8s Role | Monitoring ClusterRole / Role | ClusterRoleBinding or RoleBinding? |
| --------- | --------- | --------- | --------- |
| cluster-owner | cluster-admin | N/A | ClusterRoleBinding |
| cluster-member | admin | monitoring-admin | ClusterRoleBinding |
| project-owner | edit | monitoring-admin | RoleBinding within Project namespace |
| project-member | view | monitoring-edit | RoleBinding within Project namespace |

### Differences in 2.5.x

Users with the project-member or project-owners roles assigned will not be given access to either Prometheus or Grafana in Rancher 2.5.x since we only create Grafana or Prometheus on a cluster-level.

In addition, while project owners will still be only able to add ServiceMonitors / PodMonitors that scrape resources within their project's namespace by default, PrometheusRules are not scoped to a single namespace / project. Therefore, any alert rules or recording rules created by project-owners within their project namespace will be applied across the entire cluster, although they will be unable to view / edit / delete any rules that were created outside the project's namespace.

### Assigning Additional Access

If cluster-admins would like to provide additional admin/edit access to users outside of the roles offered by the rancher-monitoring chart, the following table identifies the potential impact:

|CRDs (monitoring.coreos.com) | Can it cause impact outside of a namespace / project? | Impact |
|----------------------------| ------| ----------------------------|
| `prometheuses`| Yes, this resource can scrape metrics from any targets across the entire cluster (unless the Operator itself is otherwise configured). | User will be able to define the configuration of new cluster-level Prometheus deployments that should be created in the cluster. |
| `alertmanagers`| No | User will be able to define the configuration of new cluster-level Alertmanager deployments that should be created in the cluster. Note: if you just want to allow users to configure settings like Routes and Receivers, you should just provide access to the Alertmanager Config Secret instead. |
| <ul><li>`servicemonitors`</li><li>`podmonitors`</li></ul>| No, not by default; this is configurable via `ignoreNamespaceSelectors` on the Prometheus CR. | User will be able to set up scrapes by Prometheus on endpoints exposed by Services / Pods within the namespace they are given this permission in. |
| `prometheusrules`| Yes, PrometheusRules are cluster-scoped. | User will be able to define alert or recording rules on Prometheus based on any series collected across the entire cluster. |

| k8s Resources | Namespace | Can it cause impact outside of a namespace / project? | Impact |
|----------------------------| ------| ------| ----------------------------|
| <ul><li>`secrets`</li><li>`configmaps`</li></ul>| `cattle-monitoring-system` | Yes, Configs and Secrets in this namespace can impact the entire monitoring / alerting pipeline. | User will be able to create or edit Secrets / ConfigMaps such as the Alertmanager Config, Prometheus Adapter Config, TLS secrets, additional Grafana datasources, etc. This can have broad impact on all cluster monitoring / alerting. |
| <ul><li>`secrets`</li><li>`configmaps`</li></ul>| `cattle-dashboards` | Yes, Configs and Secrets in this namespace can create dashboards that make queries on all metrics collected at a cluster-level. | User will be able to create Secrets / ConfigMaps that persist new Grafana Dashboards only. |
