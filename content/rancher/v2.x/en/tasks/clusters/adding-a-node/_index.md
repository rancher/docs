---
title: Adding a Node
weight: 3475
draft: true
---

## Kubernetes Providers
GKE

For GKE clusters, nodes can be incremented at the provider end. Steps below:   
1. In GCE console, navigate to Kubernetes Engine -> Kubernetes cluster section -> cluster
created in Rancher.   
2. Edit the cluster and increase the number of nodes.   
The nodes incremented should get reflected in Rancher   

AKS

Scaling of nodes is not supported yet


EKS

Scaling of nodes is not supported yet



## Custom

In a custom cluster, nodes can be added by following the steps below:   
1. Create new machines    
2. Install Docker on the machines   
3. From the nodes page, click on 'edit cluster'
4. Copy the node registration command with the appropriate role as required   
5. Run the command on the machines that need to be added to the cluster   
The nodes will be added to the cluster in few minutes   

## Node/Cloud Provider (Driver machine)

Nodes can be added in the nodepool by incrementing the nodes count in the Nodes
page of the cluster (using ''+' sign) in UI.   
Nodes can also be incremented by editing the cluster. The steps are below:   
1. Navigate to edit cluster by doing a right clicking on the desired cluster   
2. Click on 'Add node pool' and provide the appropriate template and role as required.    
3. Click on 'Save'   
4. The node will be added to the cluster in few minutes    
