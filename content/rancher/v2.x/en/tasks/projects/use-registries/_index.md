---
title: Using Registries
weight: 
draft: true
---
## Using Private Registries
Private registries allow us to have repositories to hold containers that need to be private.
Private registries can be added in the UI and images in the registry can be used
while creating workloads. Registry can be added by providing a name, specifying
the scope and credentials for the chosen repositry. The scope of the registry can 
be the one which is available to all namespaces or which is available to a 
single namespace. 

In the UI,   
1. Click on 'Add registry'  
2. Provide a name  
3. Choose the scope of the registry    
4. Choose the Address [DockerHub, Quay.io, Custom]   
5. Provide credentials of the registry chosen   
6. Click 'Save'  

Once a registry is added in rancher, the images in the registry can be chosen to
create a workload

a. From the workloads section, click on deploy a workload  
b. Provide an image which is in the registry and choose the namespace    
   Ex: quay.io/username/testubuntu   
c. Click on 'Launch'. The workload should get deployed successfully


## Adding a Secret

Secrets are used to hold sensitive information such as passwords.
Secret can be created in rancher by providing a name along with a keyvalue pair. 

The scope of the secret can be the one which is available to all namespaces or
which is available to a single namespace. 
A secret which is created as available to all namespaces can be used to create 
a workload in any namespace
A secret which is created as available to a single namespace can be used to 
create to a workload in that single namespace


In the UI,   
1. Click on 'Add secret'   
2. Provide a name     
3. Choose the scope of the secret     
4. Fill in the key value pair     
5. Click 'Save'     

Once a secret is created, it can be used in a workload. 
A secret can be used in a workload in two ways:

1. A workload can be created by using secret as a volume   

a. From the workloads section, click on 'Deploy'    
b. Provide a docker image and choose the namespace  
c. Click on volumes   
d. Provide a volume name and default mode   
e. Choose a secret which has been added   
f. Add a mount point (Eg: /test) and subpath if required   
g. Launch the workload   


Once the workload is deployed, right click on the workload and execute the shell.
In the mount point provided while creating the workload, the secret keys can be
seen as files. The contents of the file will be the value of the secret

2. A workload can be created by using secret as an env variable

a. From the workloads section, click on 'Deploy'   
b. Provide a docker image and choose the namespace   
c. Click on 'Environment variables' and 'add from source'
d. Choose the type secret, source and keys. All keys or specific keys can be chosen   
e. Prefix or alias can also be provided   
g. Launch the workload   
