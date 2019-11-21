---
title: Overview
weight: 1
---
Rancher is a container management platform built for organizations that deploy containers in production. Rancher makes it easy to run Kubernetes everywhere, meet IT requirements, and empower DevOps teams.

## Run Kubernetes Everywhere

Kubernetes has become the container orchestration standard. Most cloud and virtualization vendors now offer it as standard infrastructure. Rancher users have the choice of creating Kubernetes clusters with Rancher Kubernetes Engine (RKE) or cloud Kubernetes services, such as GKE, AKS, and EKS. Rancher users can also import and manage their existing Kubernetes clusters created using any Kubernetes distribution or installer.

## Meet IT requirements

Rancher supports centralized authentication, access control, and monitoring for all Kubernetes clusters under its control. For example, you can:

- Use your Active Directory credentials to access Kubernetes clusters hosted by cloud vendors, such as GKE.
- Setup and enforce access control and security policies across all users, groups, projects, clusters, and clouds.
- View the health and capacity of your Kubernetes clusters from a single-pane-of-glass.

## Empower DevOps Teams

Rancher provides an intuitive user interface for DevOps engineers to manage their application workload. The user does not need to have in-depth knowledge of Kubernetes concepts to start using Rancher. Rancher catalog contains a set of useful DevOps tools. Rancher is certified with a wide selection of cloud native ecosystem products, including, for example, security tools, monitoring systems, container registries, and storage and networking drivers.

The following figure illustrates the role Rancher plays in IT and DevOps organizations. Each team deploys their applications on the public or private clouds they choose. IT administrators gain visibility and enforce policies across all users, clusters, and clouds.

![Platform]({{< baseurl >}}/img/rancher/platform.png)

## Features of the Rancher API Server

The Rancher API server is built on top of an embedded Kubernetes API server and an etcd database. It implements the following functionalities:

-  **User management:** The Rancher API server [manages user identities]({{<baseurl>}}/rancher/v2.x/en/admin-settings/authentication/) that correspond to external authentication providers like Active Directory or GitHub, in addition to local users.
-	**Authorization:** The Rancher API server manages [access control]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/) and [security]({{<baseurl>}}/rancher/v2.x/en/admin-settings/pod-security-policies/) policies.
-	**Managing projects:** A project is a group of multiple namespaces and access control policies within a cluster. A project is a Rancher concept, not a Kubernetes concept, and it allows you manage multiple namespaces as a group. The Rancher UI provides features for [project administration]({{<baseurl>}}/rancher/v2.x/en/project-admin/) and for [managing applications within projects.]({{<baseurl>}}/rancher/v2.x/en/k8s-in-rancher/)
-  **Tracking nodes:** The Rancher API server tracks identities of all the [nodes]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/nodes/) in all clusters.
- **Provisioning Kubernetes clusters:** The Rancher API server can [provision Kubernetes]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/) on existing nodes, [import existing Kubernetes clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/) into Rancher, or perform [Kubernetes upgrades.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/editing-clusters/#upgrading-kubernetes)
- **Setting up infrastructure:**  When configured to use a cloud provider, Rancher can dynamically provision [new nodes]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/) and [persistent storage]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/) in the cloud.
- **Catalog management:** Rancher provides the ability to use a [catalog of Helm charts]({{<baseurl>}}/rancher/v2.x/en/catalog/) that make it easy to repeatedly deploy applications.
- **Logging:** Rancher can integrate with a variety of popular logging services and tools that exist outside of your Kubernetes clusters. Logging can be set up [at the cluster level]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/logging/) or [at the project level.]({{<baseurl>}}/rancher/v2.x/en/project-admin/tools/logging/)
- **Monitoring:** Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with Prometheus, a leading open-source monitoring solution. Monitoring can be configured [at the cluster level]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/monitoring/) or [at the project level.]({{<baseurl>}}/rancher/v2.x/en/project-admin/tools/monitoring/)
- **Alerting:** To keep your clusters and applications healthy and driving your organizational productivity forward, you need to stay informed of events occurring in your clusters and projects, both planned and unplanned. To help you stay informed of these events, you can configure alerts [at the cluster level]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/alerts/) or [at the project level.]({{<baseurl>}}/rancher/v2.x/en/project-admin/tools/alerts/)
- **Pipelines:** Setting up a [pipeline]({{<baseurl>}}/rancher/v2.x/en/project-admin/tools/pipelines/) can help developers deliver new software as quickly and efficiently as possible. Within Rancher, you can configure pipelines for each of your Rancher projects.
- **Istio:** Our [integration with Istio]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/) is designed so that a Rancher operator, such as an administrator or cluster owner, can deliver Istio to developers. Then developers can use Istio to enforce security policies, troubleshoot problems, or manage traffic for green/blue deployments, canary deployments, or A/B testing.