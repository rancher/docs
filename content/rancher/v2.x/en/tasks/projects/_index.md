---
title: Projects
weight: 3650
draft: true
---
Coming Soon

## Creating a Project

Coming Soon

## Switching Projects

Coming Soon

## Adding / Managing Project Members

You can create multiple projects within a Cluster and add members to the projects. The Project owner can decide who should have access to a particular project resource, and also what permissions they should have within the project. 

Adding a group of users as a project member, provides project access to all users within that groups. For example, say you have to assign separate resources to different groups of users say developers and testers. Then you can create separate projects and add them to those respective projects to provide access to separate resources.

<h3> Add members to an existing project</h3>

1. Select a project and go to the `Members` tab in the topmost menu bar.
2. Click on `Add Member` in the top right corner
3. Start typing the user/group name you want to add as a member
	1. If local auth is turned on, you will see a list of previously added global `Users`
	2. If some external auth provider like AD/Github is configured, the configured auth provider will use your input to perform a search and return a list of users/groups that your auth provider has.
	3. There is a dropdown to the right of the text box. If external auth provider is configured, this dropdown will be pre-populated with a list of groups that the current logged in user belongs to.  
	4. To add any other groups, use the text box to search the group by name.
4. Once the user/group is selected from the text box, assign a role to the member using `Project Permissions` section.  If a group is added as a member, all users in that group will share the project permissions. 
There are following builtin options:
	1. **Owner**
	Owner permission gives full control over the Project and all resources inside it. 
	2. **Member**
	Members can manage the resources inside the Project but not change the Project itself.. This is the default option
	3. **Read Only**
	Members can view the resources inside the Project but not change the Project itself.
	4. **Custom**
	This option allows one to create a custom role by choosing individual permissions. For example, you can choose whether the member should be able to create namespaces in the project or can manage project memberships etc.
    5. Any custom **Roles** added previously also show up in the list of available `Project Permissions`
5. Click on the **Create** button to save the project memberships.    

<h3> Managing project memberships </h3>

1. Select a project from the top left dropdown and go to the `Members` tab in the topmost menu bar within that project. This page shows all members added so far to the project.
2. If you don't want to give access to some of the members, you can select and delete those members from this list.
3. If you want to edit the permissions assigned to a member, delete the member and add them back with the new desired permissions.
4. There is an **Elipsis icon** (3 dots) next to each project member. Clicking on it will show two options, `View in API` to see the member in API, and `Delete`, which will let you remove the project member.

## Adding SSL Certificates

Coming Soon

## Adding Configuration Maps

Coming Soon

## Enabling Project Logging

Coming Soon

## Adding Project Alerts

Coming Soon

## Using Private Registries

Coming Soon

## Adding a Secret

Coming Soon

## Launching a Catalog App

Coming Soon

## Creating a Pod Security Policy

Coming Soon

