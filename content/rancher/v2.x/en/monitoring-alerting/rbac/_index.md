---
title: RBAC
weight: 3
aliases:
  - /rancher/v2.x/en/cluster-admin/tools/monitoring/rbac
---

This section describes the permissions required to access Monitoring features.

The `rancher-monitoring` chart installs three `ClusterRoles`.

# Cluster-Admin Access

By default, only those with the cluster-admin `ClusterRole` can:

- Install the `rancher-monitoring` App onto a cluster and all other relevant configuration performed on the chart deploy
  - e.g. whether default dashboards are created, what exporters are deployed onto the cluster to collect metrics, etc.
- Create / modify / delete Prometheus deployments in the cluster via Prometheus CRs
- Create / modify / delete Alertmanager deployments in the cluster via Alertmanager CRs
- Persist new Grafana dashboards or datasources via creating ConfigMaps in the appropriate namespace
- Expose certain Prometheus metrics to the k8s Custom Metrics API for HPA via a Secret in the `cattle-monitoring-system` namespace

## Admin and Edit access

By default, only Admin and Edit roles can:

- View the configuration of Prometheuses that are deployed within the cluster
- View the configuraiton of Alertmanagers that are deployed within the cluster
- Modify the scrape configuration of Prometheus deployments via ServiceMonitor and PodMonitor CRs
- Modify the alerting / recording rules of a Prometheus deployment via PrometheusRules CRs

# Summary of Default Permissions for Kubernetes Default Roles

Monitoring creates three `ClusterRoles` and adds Monitoring CRD access to the following default K8s `ClusterRoles`:

| ClusterRole created by chart | Default K8s ClusterRole  | 
| ------------------------------| ---------------------------|
| `monitoring-admin` | `admin`|
| `monitoring-edit`| `edit` |
| `monitoring-view` | `view `| 

Rancher will continue to use cluster-owner, cluster-member, project-owner, project-member, etc as role names, but will utilize default roles to determine access. For each default K8s `ClusterRole` there are different Istio CRD permissions and K8s actions (Create (C), Get (G), List (L), Update (U), Patch (P), Delete(D), All (*)) that can be performed. 


|CRDs                        | Admin | Edit | View | 
|----------------------------| ------| -----| -----|
| <ul><li>`monitoring.coreos.com`</li><ul><li>`prometheuses`</li><li>`alertmanagers`</li></ul></ul>| GLW | GLW | GLW|
| <ul><li>`monitoring.coreos.com`</li><ul><li>`servicemonitors`</li><li>`podmonitors`</li><li>`prometheusrules`</li></ul></ul>| * | * | GLW|

# Additional Roles

Monitoring also creates six `Roles` to enable admins to assign more fine-grained access to monitoring within a cluster:

| Role created by chart | Purpose  | 
| ------------------------------| ---------------------------|
monitoring-config-admin | Allow admins to assign roles to users to be able to view / modify Secrets and ConfigMaps within the cattle-monitoring-system namespace. Modifying Secrets / ConfigMaps in this namespace could allow users to alter the cluster's Alertmanager configuration, Prometheus Adapter configuration, additional Grafana datasources, TLS secrets, etc. |
monitoring-config-edit | Allow admins to assign roles to users to be able to view / modify Secrets and ConfigMaps within the cattle-monitoring-system namespace. Modifying Secrets / ConfigMaps in this namespace could allow users to alter the cluster's Alertmanager configuration, Prometheus Adapter configuration, additional Grafana datasources, TLS secrets, etc. |
monitoring-config-view | Allow admins to assign roles to users to be able to view Secrets and ConfigMaps within the cattle-monitoring-system namespace. Viewing Secrets / ConfigMaps in this namespace could allow users to observe the cluster's Alertmanager configuration, Prometheus Adapter configuration, additional Grafana datasources, TLS secrets, etc. |
monitoring-dashboard-admin | Allow admins to assign roles to users to be able to edit / view ConfigMaps within the cattle-dashboards namespace. ConfigMaps in this namespace will correspond to Grafana Dashboards that are persisted onto the cluster. |
monitoring-dashboard-edit | Allow admins to assign roles to users to be able to edit / view ConfigMaps within the cattle-dashboards namespace. ConfigMaps in this namespace will correspond to Grafana Dashboards that are persisted onto the cluster. |
monitoring-dashboard-view | Allow admins to assign roles to users to be able to view ConfigMaps within the cattle-dashboards namespace. ConfigMaps in this namespace will correspond to Grafana Dashboards that are persisted onto the cluster. |

These Roles are not assigned by default but will be created in the cluster.