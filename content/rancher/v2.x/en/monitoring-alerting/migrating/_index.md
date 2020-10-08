---
title: Migrating to Rancher v2.5 Monitoring
weight: 5
---

If you previously enabled monitoring in Rancher prior to v2.5, there is no upgrade path for the monitoring application. You will need to disable monitoring and re-enable monitoring in Rancher.

### Major Changes

The new version of Rancher's monitoring application is powered by the Prometheus operator, and it now relies less on Rancher's in-house monitoring tools.

This change allows Rancher to automatically support new features of the Prometheus operator API. Now all of the features exposed by the upstream Prometheus operator are available in the monitoring application, and you have more flexibility to configure monitoring.

Previously, you would use the Rancher UI to configure monitoring. The Rancher UI created CRDs that were maintained by Rancher and updated the Prometheus state. In Rancher v2.5, you directly create CRDs for the monitoring application, and those CRDs are exposed in the Rancher UI.

Other important changes include:

- In the older version of monitoring, an Ingress  was created outside of the Helm chart deployment, whereas in the new version, an Ingress is created as part of the Helm chart deployment.
- The monitoring application has the ability to create Prometheus ServiceMonitors and PodMonitors.
- We exposed a [PushProx](https://github.com/prometheus-community/PushProx) exporter, based on the Prometheus project called PushProx. This [`rancher-pushprox` chart](https://github.com/rancher/dev-charts/tree/master/packages/rancher-pushprox/charts) sets up a Deployment of a PushProx proxy and a DaemonSet of PushProx clients. It monitors internal Kubernetes components for K3s, RKE, and kubeAdm clusters.
- One aspect of alerting moved into the monitoring application, specifically the ability to create Prometheus rules. Now alerts are created in monitoring, and you configure how you get notified about the alerts.
- In Rancher v2.4, alerts were configured separately from notifiers. Both alerts and notifiers are configured in the alert configuration.
- To create alerts, you will create Prometheus alert custom resources.
- Instead of having a notifier UI where you can add notifiers, notifications should be configured within the Alertmanager secret exposed in the rancher UI. This will let you configure routes, which is something that couldn't be done with Rancher v2.4. 
- Ingresses need to be set up during the chart deployment or upgrade. You can configure an Ingress for Alertmanager, Prometheus and Grafana. To access each of those services from outside the cluster, they each would need separate Ingresses. Each Ingress would take in the same fields. If you want to use your own custom Ingress, we recommend setting the fields during the `rancher-monitoring` Helm chart deployment because it ensures the fields are as expected.
- A [PushProx exporter](https://github.com/prometheus-community/PushProx) was exposed. PushProx exporters are created on the cluster where `rancher-monitoring` is installed. etcd, controlplane, proxy, and controller-manager metrics will all use the PushProx exporter.

A list of differences between Rancher's monitoring feature and the upstream Prometheus operator can be found in the [changelog.](https://github.com/rancher/charts/blob/dev-v2.5/packages/rancher-monitoring/overlay/CHANGELOG.md)

### Prometheus Operator Helm Chart Changes

Rancher used to use the [Prometheus operator.](https://github.com/prometheus-operator/prometheus-operator) Some parts of the Prometheus operator were included in the [kube-prometheus-stack.](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)

The operator that manages Prometheus is still called the Prometheus operator, but it is now deployed as part of the `kube-prometheus-stack` Helm chart.