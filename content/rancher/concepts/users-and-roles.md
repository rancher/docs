# Users and Roles

Every user in {{< product >}} is assigned a _role_, which is a set of permissions that determine what Kubernetes API endpoints that the user can access. Let's use this metaphor: a user account is like getting access to an entire office building; however, the user's role determine what rooms the user can access within the building.

Within {{< product >}} there are two types of user roles:

-	[Default roles](#default-roles)
-	[Custom roles](#custom-roles)

In addition, [_Membership_](#membership) plays a part in user access. Membership determines the scope of a user's role.

## Default Roles

Out-of-the-box, {{< product >}} comes with two default roles that fulfill most use cases:

-	**Administrators**

	Admins have global access to all Rancher clusters and projects, as well as all permissions. Admins are the "Cow Bosses" of {{< product >}}.

-	**Standard Users**

	If Administrators are the "Cow Bosses" of {{< product >}}, then Standard Users are the "Cowboys."

	Standard users can:

	-	Create new clusters
	-	Manage clusters and projects they hold membership in.<br/>

	>**Note:** To authorize Standard Users for existing clusters and projects, you must explicitly add the user as a cluster/project member.



## Custom Roles

If neither of the default roles suit your use case, you can create a _custom role_. While creating a custom role, you can choose the individual roles and permissions for a user within {{< product >}}. Custom roles are helpful when you need to give a user one specific permission without giving them access to the entire system.

## Membership

Within {{< product >}}, users and roles are further refined with _membership_. Each cluster and project includes a pool of users who hold membership in that object. Membership allows you to define a scope where a given user's permissions are authorized.

-	All users assigned the Administrator role hold membership in all clusters and projects.

-	Before a user assigned either the standard user or custom role can work in an existing cluster or project, the user must be explicitly added as a member.
