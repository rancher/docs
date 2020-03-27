---
title: OPA Gatekeeper
weight: 1
---
_Available as of v2.4.0_

Rancher v2.4 release provides the ability to enable OPA Gatekeeper in  Kubernetes clusters and also installs a couple of builtin policy definitions aka constraint templates. 
OPA Gatekeeper is made availale via Rancher's helm system chart and installs in a namespace "gatekeeper-system". 
This is an experimental feature for v2.4 release.

To ensure consistency and compliance, every organization needs ability to define and enforce policies in its environment in an automated way.  
OPA [https://www.openpolicyagent.org/] is a policy engine that facilitates policy based control for Cloud native environments. 
OPA provides a high-level declarative language that let’s you specify policy as code and ability to extend simple APIs to offload policy decision-making. 
To read more about OPA, please refer https://www.openpolicyagent.org/docs/latest/
OPA Gatekeeper[https://github.com/open-policy-agent/gatekeeper] is a project that provides integration between OPA and Kubernetes. OPA Gatekeeper provides:

- An extensible, parameterized policy library.
- Native Kubernetes CRDs for instantiating the policy library (aka “constraints”).
- Native Kubernetes CRDs for extending the policy library (aka “constraint templates”).
- Audit functionality.

Kubernetes provides ability to extend API server functionality via admission controller webhooks, which are invoked whenever a resourse is created, updated or deleted.
Gatekeeper is installed as a validating webhook and enforces policies defined via Kubernetes CRDs.
In addition to the admission control usage, Gatekeeper also contains ability to audit existing resources in the Kubernetes clusters and mark current violations of enabled policies.


## Enabling Gatekeeper in your cluster
1. Only Global Admins or Cluster owners can enable Gatekeeper
1. Navigate to the cluster's Dashboard view
1. On the left side menu, Expand the Cluster menu and click on OPA Gatekeeper
1. To install Gatekeeper with default config click on "Enable Gatekeeper (v0.1.0) with defaults".
1. To change any default configuration click on "Customize Gatekeeper yaml configuration"
      
## Constraint templates
[Constraint templates](https://github.com/open-policy-agent/gatekeeper#constraint-templates) are Kubernetes CRs that define the schema and rego logic of the OPA policy to be applied by Gatekeeper.

1. Enable OPA Gatekeeper in your cluster via the Dashboard view
1. After enabling OPA Gatekeeper, on the left side menu under OPA Gatekeeper click on "Templates" to list the constraint templates installed in the cluster.
1. Rancher installs a couple of templates by default.
1. Rancher also provides ability to create your own constraint templates by importing yaml definition.
   
## Constraints
[Constraints](https://github.com/open-policy-agent/gatekeeper#constraints) are Kubernetes CRs that define the scope of objects to which a specific constraint template applies to.
Constraint templates and Constraints together define the complete policy.

1. Enable OPA Gatekeeper in your cluster via the Dashboard view
1. After enabling OPA Gatekeeper, on the left side menu under OPA Gatekeeper click on "Constraints" to list the constraints installed.
1. Users can create new constraints from a constraint template.
1. Rancher provides the ability to create a constraint via a convenient form that lets you input the various constraint fields.
1. Also Edit as yaml option is availble to input the constraint's yaml definition.
   
## Enforcing constraints in your cluster
1. Create constraint using the form 
1. Choose "Deny" for "Enforcement Action" field on the create constraint form
1. When the "Enforcement Action" is "Deny", the constraint is immediately enabled and will deny any requests that violates the policy defined. 
1. By default, the value is "Deny"
1. When the "Enforcement Action" is "Dryrun" then any resources that violates the policy are only recorded under the constraint's status field.

## Audit and violations in your cluster
1. Enable OPA Gatekeeper in your cluster via the Dashboard view. 
1. Gatekeeper runs a periodic audit to check if any existing resource violates any enforced constraint.
1. The audit-interval (default 300s) can be configured while installing Gatekeeper.
1. On the Gatekeeper page, any violations of the defined constraints will be listed.
1. Also under "Constraints", number of violations of the constraint will be found.
1. Detail view of each constraint will list the information of the resource that violated the constraint

## Disabling Gatekeeper
1. Navigate to the cluster's Dashboard view
1. On the left side menu, Expand the Cluster menu and click on OPA Gatekeeper
1. Click the **Vertical Ellipsis (...) > Disable**.
1. Upon disabling, all constraint templates and constraints will also be deleted.

## Exempting Rancher's System Namespaces from Constraints
1. When a Constraint is created, you need to ensure that it does not apply to any Rancher or Kubernetes system namespaces.
1. To limit the scope of the constraint only to user namespaces, always specify these Namespaces under "Match" field of the Constraint
1. If the system namespaces are not excluded, then it is possible to see many resources under them  marked as violations of the constraint.
1. Also the constraint may interfere with any other Rancher functionality and deny any system workloads to get deployed.
1. To avoid this, please ensure to exclude all Rancher specific namespaces from your constraints.

