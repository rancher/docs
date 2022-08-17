---
title: OPA Gatekeeper
weight: 17
aliases:
 - /rancher/v2.0-v2.4/en/cluster-admin/tools/opa-gatekeeper
 - /rancher/v2.0-v2.4/en/opa-gatekeper/Open%20Policy%20Agent
 - /rancher/v2.0-v2.4/en/opa-gatekeper
---
_Available as of v2.4.0_

To ensure consistency and compliance, every organization needs the ability to define and enforce policies in its environment in an automated way. [OPA (Open Policy Agent)](https://www.openpolicyagent.org/) is a policy engine that facilitates policy-based control for cloud native environments. Rancher provides the ability to enable OPA Gatekeeper in Kubernetes clusters, and also installs a couple of built-in policy definitions, which are also called constraint templates. 

OPA provides a high-level declarative language that lets you specify policy as code and ability to extend simple APIs to offload policy decision-making.

[OPA Gatekeeper](https://github.com/open-policy-agent/gatekeeper) is a project that provides integration between OPA and Kubernetes. OPA Gatekeeper provides:

- An extensible, parameterized policy library.
- Native Kubernetes CRDs for instantiating the policy library, also called “constraints."
- Native Kubernetes CRDs for extending the policy library, also called "constraint templates."
- Audit functionality.

To read more about OPA, please refer to the [official documentation.](https://www.openpolicyagent.org/docs/latest/)

# How the OPA Gatekeeper Integration Works

Kubernetes provides the ability to extend API server functionality via admission controller webhooks, which are invoked whenever a resource is created, updated or deleted. Gatekeeper is installed as a validating webhook and enforces policies defined by Kubernetes custom resource definitions. In addition to the admission control usage, Gatekeeper provides the capability to audit existing resources in Kubernetes clusters and mark current violations of enabled policies.

OPA Gatekeeper is made available via Rancher's Helm system chart, and it is installed in a namespace named `gatekeeper-system.`

# Enabling OPA Gatekeeper in a Cluster

> **Prerequisites:** 
> 
> - Only administrators and cluster owners can enable OPA Gatekeeper.
> - The dashboard needs to be enabled using the `dashboard` feature flag. For more information, refer to the [section on enabling experimental features.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/feature-flags/)

1. Navigate to the cluster's **Dashboard** view.
1. On the left side menu, expand the cluster menu and click on **OPA Gatekeeper.**
1. To install Gatekeeper with the default configuration, click on **Enable Gatekeeper (v0.1.0) with defaults.**
1. To change any default configuration, click on **Customize Gatekeeper yaml configuration.**

# Constraint Templates

[Constraint templates](https://github.com/open-policy-agent/gatekeeper#constraint-templates) are Kubernetes custom resources that define the schema and Rego logic of the OPA policy to be applied by Gatekeeper. For more information on the Rego policy language, refer to the [official documentation.](https://www.openpolicyagent.org/docs/latest/policy-language/)

When OPA Gatekeeper is enabled, Rancher installs some templates by default.

To list the constraint templates installed in the cluster, go to the left side menu under OPA Gatekeeper and click on **Templates.**

Rancher also provides the ability to create your own constraint templates by importing YAML definitions.
   
# Creating and Configuring Constraints

[Constraints](https://github.com/open-policy-agent/gatekeeper#constraints) are Kubernetes custom resources that define the scope of objects to which a specific constraint template applies to. The complete policy is defined by constraint templates and constraints together.

> **Prerequisites:** OPA Gatekeeper must be enabled in the cluster.

To list the constraints installed, go to the left side menu under OPA Gatekeeper, and click on **Constraints.**

New constraints can be created from a constraint template.

Rancher provides the ability to create a constraint by using a convenient form that lets you input the various constraint fields.

The **Edit as yaml** option is also available to configure the the constraint's yaml definition.

### Exempting Rancher's System Namespaces from Constraints

When a constraint is created, ensure that it does not apply to any Rancher or Kubernetes system namespaces. If the system namespaces are not excluded, then it is possible to see many resources under them marked as violations of the constraint.

To limit the scope of the constraint only to user namespaces, always specify these namespaces under the **Match** field of the constraint.

Also, the constraint may interfere with other Rancher functionality and deny system workloads from being deployed. To avoid this, exclude all Rancher-specific namespaces from your constraints.
   
# Enforcing Constraints in your Cluster

When the **Enforcement Action** is **Deny,** the constraint is immediately enabled and will deny any requests that violate the policy defined. By default, the enforcement value is **Deny.**

When the **Enforcement Action** is **Dryrun,** then any resources that violate the policy are only recorded under the constraint's status field.

To enforce constraints, create a constraint using the form. In the **Enforcement Action** field, choose **Deny.** 

# Audit and Violations in your Cluster

OPA Gatekeeper runs a periodic audit to check if any existing resource violates any enforced constraint. The audit-interval (default 300s) can be configured while installing Gatekeeper.

On the Gatekeeper page, any violations of the defined constraints are listed.

Also under **Constraints,** the number of violations of the constraint can be found.

The detail view of each constraint lists information about the resource that violated the constraint.

# Disabling Gatekeeper

1. Navigate to the cluster's Dashboard view
1. On the left side menu, expand the cluster menu and click on **OPA Gatekeeper.**
1. Click the **&#8942; > Disable**.

**Result:** Upon disabling OPA Gatekeeper, all constraint templates and constraints will also be deleted.

