---
title: Workloads
weight: 3675
draft: true
---

Coming Soon

## Deploying Workloads

Coming Soon

## Upgrading Workloads

Coming Soon

## Rolling Back Workloads

Coming Soon

## Adding a Sidecar

Sidecar can be added to existing workloads by using the **Add a Sidecar** option.
1. From the workloads list view , locate the workload that you want to add the sidecar to.
2. click the **Ellipsis icon** (...)  and pick **Deploy Sidecar** option.

3. When this option is used , user is presented with **Deploy Sidecar** page which has all the options from the workload deployment page.
4. Set the **SideCar Type** to **Standard Container** or **Init Container** option which will determine the order in which 
the sidecar container get deployed with respect to the main workload container.
5. After entering the workload options, click on **Launch**

## Adding Ingress

Ingress can be added for workloads to provide load balancing, SSL termination and host/path based routing.

1. To add Ingress, navigate to the cluster where you want the ingress to be created.
2. Select the project and navigate to **Load Balancing** option.
3. Use **Add Ingress** option to launch the **Add Ingress** page.
4. Provide a **Name** 
5. Use **Add a Description** to add description which is optional.
6. Choose an existing **Namespace** from the drop down list.
7. Choose from the following 3 Rules:
    1. **Automatically generate a .xip.io hostname**
    
        When this option is used, rancher will automatically generate an FQDN to access this ingress rule.
         
        Users can add rules pointing to **Service** or **Workload** by choosing the **Target Backend** **+ Service** or **+ Workload**.
        
        For each rule , User has to add **Path**(optional) ,**Target** and **Port**
        
        Additional rules can added by choosing the **+ Add Rule** option.

    2. **Specify a hostname to use**
    
        User needs to specify the **Request Host**.
        
        Users can add rules pointing to **Service** or **Workload** by choosing the **Target Backend** **+ Service** or **+ Workload**
        
        For each rule , User has to add **Path**(optional) ,**Target** and **Port**
        
        Additional rules can added by choosing the **+ Add Rule** option.
        
    3. **Use as the default backend**
        Users can add rules pointing to **Service** or **Workload** by choosing the **Target Backend** **+ Service** or **+ Workload**
        
        For each rule , User has to add **Target** and **Port**
        
        Additional rules can added by choosing the **+ Add Rule** option.
        
8. **SSL/TLS Certificates**

    If SSL termination is required then expand on the **SSL/TLS Certificates** section.

    All certificates available in the projects will be listed in **Certificate**. 

    Select one of the certificates from the list and using **+ Add Host** option add a **Host** associated with the certificates.

9. **Labels & Annotations**

    **+ Add Label** option can be used to **Key** and **Value** for labels.

    **+ Add Annotation** can be used to **Key** and **Value** for annotations.

10. Click on **Save**
11. User will be brought back to the **Load Balancing** page where the newly created ingress will be listed.
12. For every ingress rules created in the ingress , there will be a url link provided under **Targets** 
which when clicked will direct traffic to the target pods associated with the ingress rule.

## Adding a DNS Record

For every workload created , there is already a Service Discovery entry created which enables DNS resolution of workload pods using 
`<workload>.<namespace>.svc.cluster.local`.
Additional Service Discovery records can be created for DNS resolutions of One or more external IP addresses , external hostname, 
Alias of another DNS record's value, One or more workloads, The set of pods which match a selector.

1. To add DNS record, navigate to the cluster where you want ingress to be created.
2. Select the project and navigate to **Service Discovery** option.
3. Use **Add Record** option to launch the **Add Record** page.
4. Provide a **Name** 
5. Choose an existing **Namespace** from the drop down list.
6. Choose from the following options for "Resolves To":
    1. **One or more external IP addresses**

        User needs to specify at least one **Target IP Addresses**. 

        More target ips can be added using "+ Add Target IP"
    2. **An external hostname**

        User needs to specify **Target Hostname**
    3. **Alias of another DNS record's value**

        User can add one or more DNS records using **+ Add Target Record**
    4. **One or more workloads**

        User can add one or more existing Workloads using **+ Add Target Workload**
    5. **The set of pods which match a selector**

        User needs to specify at least one selector using **Label and **value.

        Additional selectors can be added using **+ Add Selector**   
7. Click on **Create**
8. User will be brought back to the **Service Discovery** page where the newly created DNS record will be listed.
9. For the DNS record created , using FQDN `<recordname>.<namespace>.svc.cluster.local` from containers will resolve to the entries added to the DNS records.

## Adding a Persistent Volume Claim

Coming Soon
