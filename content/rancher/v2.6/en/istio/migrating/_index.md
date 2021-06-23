---
title: Migrating from Previous Istio Version
weight: 7
---

- [New in Rancher v2.5](#new-in-rancher-v2-5)
- [Migrating Istio](#migrating-istio)

# New in Rancher v2.5

The overall architecture of Istio has been simplified. A single component, Istiod, has been created by combining Pilot, Citadel, Galley and the sidecar injector. Node Agent functionality has also been merged into istio-agent.

Addons that were previously installed by Istio (cert-manager, Grafana, Jaeger, Kiali, Prometheus, Zipkin) will now need to be installed separately. Istio will support installation of integrations that are from the Istio Project and will maintain compatibility with those that are not.

A Prometheus integration will still be available through an installation of [Rancher Monitoring]({{<baseurl>}}/rancher/v2.6/en/monitoring-alerting/), or by installing your own Prometheus operator. Rancher's Istio chart will also install Kiali by default to ensure you can get a full picture of your microservices out of the box.

Istio has migrated away from Helm as a way to install Istio and now provides installation through the istioctl binary or Istio Operator. To ensure the easiest interaction with Istio, Rancher's Istio will maintain a Helm chart that utilizes the istioctl binary to manage your Istio installation.

This Helm chart will be available via the Apps and Marketplace in the UI. A user that has access to the Rancher Chart's catalog will need to set up Istio before it can be used in the project.

# Migrating Istio

There is no upgrade path for Istio versions less than 1.7.x. To successfully install Istio in the **Cluster Explorer**, you will need to disable your existing Istio in the **Cluster Manager**.

If you have a significant amount of additional Istio CRDs you might consider manually migrating CRDs that are supported in both versions of Istio. You can do this by running `kubectl get <resource> -n istio-system -o yaml`, save the output yaml and re-apply in the new version. 

Another option is to manually uninstall istio resources one at a time, but leave the resources that are supported in both versions of Istio and that will not be installed by the newest version. This method is more likely to result in issues installing the new version, but could be a good option depending on your situation.