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

Coming Soon

## Adding SSL Certificates

Coming Soon

## Adding Configuration Maps

(todomark Link to concept of ConfigMaps under Resources for an introduction) 

<h3> Adding Config Maps </h3>

Currently, Config Maps can only be added at Namespace Level. 

1.  Select the project you want to add Config Maps in UI under **Global** dropdown.  
2. Under **Resources** dropdown, select **Config Maps**.
3. Click on **Add Config Map** option and give it a name. 
4. Select the Namespace you want to add Config Map in. You can also add a new namespace by clicking on **Add to a new namespace** on the top of the namespace bar. 
5. Enter key-value pairs and Save. 

<h3> Using Config Maps in workload </h3> 

Config Maps can now be used as an environment variable or can be volume mounted by a workload - 

1. Go to Workloads option under Workloads dropdown. 
2. Click on Deploy to deploy a new workload. 
3. Add Config Maps 

	1. To add as **environment variable**
		1. Click on **Environment Variables** dropdown 
		2. Select **Add From Source** and Choose Config Map 
		3. Select all or a specific key you require 
		4. Give prefix or alias, unless mentioned 

			- default prefix would be "" if all keys are selected 
			- default prefix would be key name if specific key is selected 
		5. Click on Launch at the bottom of page

	2. To use **volume mount** 
		1. Click on **Volumes** dropdown 
		2. Click on **Add Volume** dropdown and select **Use a config map** under it 
		3. Select the config map you want by name under **Config Map Name** 
		4. Mention the required Mount Point
		5. Click on Launch at the bottom of page

<h3> Checking value of Config Maps in workload </h3>

1. Go to Workloads option under Workloads dropdown. 
2. List of workloads will be shown in UI. 
3. For the workload you want, select vertical ellipsis at its right. 
4. Select **Execute Shell**, this will open up a shell. 
	1. To see environment variables, type "env". 
	2. To see the mounted config map keys, use "cd `mountPath`" to navigate to required directory and use "ls" to see them. 

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

