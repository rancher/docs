---
title: Adding/Managing Cluster Members
weight: 3525
---

<h3> Adding a member to a cluster </h3>

You can manage multiple clusters with Rancher. In that, cluster membership lets you specify which users or groups should have access to a particular cluster, and also what permissions they should have within the cluster. 
Adding a group of users as a cluster member, provides cluster access to all users within that groups. For example, if you have separate developers and QA teams, you can create separate clusters for them, and add them to those clusters respectively.

1. Select a cluster and go to the `Members` tab in the topmost menu bar.
2. Click on `Add Member` in the top right corner
3. Start typing the user/group name you want to add as a member
	1. If local auth is turned on, you will see a list of previously added global `Users`
	2. If some external auth provider is configured (any auth provider other than local), the configured auth provider will use your input to perform a search and return a list of users/groups that your provider has.
	3. There is a dropdown to the right of the text box. If external auth provider is configured, this dropdown will be pre-populated with a list of groups that the current logged in user belongs to.  Use the text box to search for and add any other groups.
4. Once the user/group is selected from the text box, right below it is the `Cluster Permissions` section. Use this to assign users/groups cluster permissions as required while adding them as a member. If a group is added as a member, all users in that group will share the cluster permissions. There are three builtin options:
	1. **Owner**
	Owner permission gives full control over the Cluster and all resources inside it. 
	2. **Member**
	Members can manage the resources inside the Cluster but not change the Cluster itself. This is the default option
	3. **Custom**
	This option allows customization in terms of individual roles. For example, you can choose whether the member should be able to create projects or only view projects, or can manage cluster memberships
	
Any **Roles** added previously also show up in the list of available `Cluster Permissions`

<h3> Managing cluter members </h3>

1. Select a cluster and go to the `Members` tab in the topmost menu bar. This page shows all members added so far to the cluster.
2. If you don't want to give cluster access to some of the members, you can select and delete those members from this list.
3. If you want to edit the permissions assigned to a member, the only way to do that right now is by deleting and adding back the member with the new desire permissions.
4. There is an vertical ellipsis (3 dots) next to each cluster member. Clicking on it will show two options, `View in API` to see the member in API, and `Delete`, which will let you remove the member
