---
title: Alertmanager Configuration
weight: 1
---

It is usually not necessary to directly edit the Alertmanager custom resource. For most use cases, you will only need to edit the Receivers and Routes to configure notifications.

When Receivers and Routes are updated, the monitoring application will automatically update the Alertmanager custom resource to be consistent with those changes.

> This section assumes familiarity with how monitoring components work together. For more information about Alertmanager, see [this section.](../../../how-monitoring-works/#3-how-alertmanager-works)

# About the Alertmanager Custom Resource

By default, Rancher Monitoring deploys a single Alertmanager onto a cluster that uses a default Alertmanager Config Secret.

You may want to edit the Alertmanager custom resource if you would like to take advantage of advanced options that are not exposed in the Rancher UI forms, such as the ability to create a routing tree structure that is more than two levels deep.

It is also possible to create more than one Alertmanager in a cluster, which may be useful if you want to implement namespace-scoped monitoring. In this case, you should manage the Alertmanager custom resources  using the same underlying Alertmanager Config Secret.

### Deeply Nested Routes

While the Rancher UI only supports a routing tree that is two levels deep, you can configure more deeply nested routing structures by editing the Alertmanager YAML.

### Multiple Alertmanager Replicas

As part of the chart deployment options, you can opt to increase the number of replicas of the Alertmanager deployed onto your cluster. The replicas can all be managed using the same underlying Alertmanager Config Secret.
 
This Secret should be updated or modified any time you want to:
 
- Add in new notifiers or receivers
- Change the alerts that should be sent to specific notifiers or receivers
- Change the group of alerts that are sent out

By default, you can either choose to supply an existing Alertmanager Config Secret (i.e. any Secret in the `cattle-monitoring-system` namespace) or allow Rancher Monitoring to deploy a default Alertmanager Config Secret onto your cluster.

By default, the Alertmanager Config Secret created by Rancher will never be modified or deleted on an upgrade or uninstall of the `rancher-monitoring` chart. This restriction prevents users from losing or overwriting their alerting configuration when executing operations on the chart.

For more information on what fields can be specified in the Alertmanager Config Secret, please look at the [Prometheus Alertmanager docs.](https://prometheus.io/docs/alerting/latest/alertmanager/)

The full spec for the Alertmanager configuration file and what it takes in can be found [here.](https://prometheus.io/docs/alerting/latest/configuration/#configuration-file)