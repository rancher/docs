---
title: Projects
weight: 3650
draft: true
---
Project is a new Rancher concept that provides a way to encapsulate a set of policies for a set of namespaces. Users can be added as members to the project and the project owner can assign a role to each member to control what they can access within the project.

## Creating a Project

1. Within the Rancher UI, navigate to the Cluster view and choose the Cluster under which Projects need to be created
2. Click on the **Projects/Namespaces** tab
3. Click on **Add Project**
4. On the **Add Project** UI, enter the following:
  * Project Name: Provide a name, this is a required field
  * Description: Add a description for the project by clicking **Add a Description**
  * Pod Security Policy: Apply any available pod security policies to the project. By default, None is selected.
  * Members:
    Add other users as members to the projects and assign roles to them to configure what permissions they have to access the project resources.

      - User creating the project becomes _Owner_ of the project
      - Click on **Add Member** and to add more members either:    
          - You can start typing in name of the user or group you wish to add. Rancher will search for the user or group starting with that name and show the search results.
          - One can also list his own groups by clicking on the dropdown and choose the groups to add as members
      - Assign a **Role** to each member by choosing the role from the dropdown
        - Following are the default roles available: Owner, Member, Read Only
        - Custom roles can also be created by choosing _Custom_
        - More information on Roles can be found here (Link to Role Concepts) todomark
  * Lastly, click on the **Create** button to save the project

## Switching Projects

Coming Soon

## Adding / Managing Project Members

Coming Soon

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

