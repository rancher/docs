---
title: Kubernetes in Rancher
weight: 3000
aliases:
  - /rancher/v2.x/en/concepts/
  - /rancher/v2.x/en/tasks/
  - /rancher/v2.x/en/concepts/resources/
---

After you provision a Kubernetes cluster in Rancher, you can begin using powerful Kubernetes features from the Rancher UI to manage the cluster, allowing you to deploy and scale your containerized applications in development, testing, or production environments.

## Advanced Cluster Interaction

Although the primary method of interacting with your Kubernetes clusters is the Rancher UI, you have additional options for controlling your clusters:

- **kubectl**

    You can use the Kubernetes command-line tool, [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/), to control your clusters. You have two options for using kubectl:

    - **Rancher kubectl shell**
    
        You can interact with your clusters by launching the kubectl shell available in the Rancher UI. This option requires no configuration actions on your part. 
        
        For more information, see [Accessing Clusters with kubectl Shell]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/kubectl/#accessing-clusters-with-kubectl-shell).
    
    - **Terminal remote connection**
    
        You can also interact with your clusters by installing [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) and then copying your cluster's kubeconfig file from the Rancher UI to your local `~/.kube/config` directory.
        
        For more information, see [Accessing Clusters with kubectl and a kubeconfig File]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/kubectl/#accessing-clusters-with-kubectl-and-a-kubeconfig-file).

- **Rancher CLI**

    You can interact with your clusters by downloading Rancher's own command-line interface, [Rancher CLI]({{< baseurl >}}/rancher/v2.x/en/cli/).

- **Rancher API**

    Finally, you can interact with your clusters over the Rancher API. However, before you use the API, you must obtain an [API key]({{< baseurl >}}/rancher/v2.x/en/user-settings/api-keys/) using the Rancher UI.

## Node Management

After you launch a cluster, you can edit many of the settings you configured during its initial launch, including:

- The users that can access the cluster, using [members]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#membership-and-role-assignment) and [roles]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles).
- Its [Kubernetes options]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/), including:

    - The version of Kubernetes installed.
    - Whether the cluster allows unsupported versions of Docker to run.
    - Whether the cluster uses a cloud provider.
    - Whether the cluster applies a pod security policy.

    >**Note:** You cannot edit the cluster's Network Provider after its initial launch.

- The [node pools]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-pools) configured for the cluster.

For instructions on how to edit a cluster's settings, see [Editing Clusters]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/editing-clusters).

Additionally, you can also edit individual nodes using the **Nodes** tab, from which you can complete the following actions:

- Enter custom names and descriptions for each node.
- Add [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) to each node.
- Pause nodes using the **Cordon** button.
- **Delete** nodes.
- Scale the number of nodes in the cluster up or down.
- Download the access keys for each node.

## Projects and Namespaces

In use cases where many users share use of a cluster, you can divide it into different [namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) and [projects]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/projects-and-namespaces/) to prevent conflicts.

- [Namespaces]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/projects-and-namespaces/#namespaces)

    Namespaces are objects you can use to restrict cluster resources among groups of users and applications. Using namesspaces, you can limit the cluster objects that users can access, including:

    - **[Workloads](#workloads)**: standard workloads, load balancers, service discovery records, and storage.
    - **[Resources](#kubernetes-resources)**: certificates, ConfigMaps, registries, and secrets.

- [Projects]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/projects-and-namespaces/)

    Projects are a feature available in Rancher, but not the base version of Kubernetes. Projects allows you to group different namespaces into a single object. You can then use your project to set user access and pod security policies using a single object (the project) rather than many (namespaces).

    You can also assign the workloads and resources mentioned above to a project. Therefore, any resources available within a project are available for all namespaces within that project.

For more information on creating projects and attaching objects and membership to them, see:

- [Projects and Namespaces]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/projects-and-namespaces/)
- [Project Members]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/projects-and-namespaces/project-members/)

## Workloads

Deploy applications to your cluster nodes using [workloads]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/workloads/), which are objects that contain pods that run your apps, along with metadata that set rules for the deployment's behavior. Workloads can deployed within the scope of the entire clusters, or within a namespace.

When deploying a workload, you can deploy any application hosted on [Docker Hub](https://hub.docker.com/). There are variety of [workload types]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/workloads/#workload-types) to choose from.

Following a workload deployment, you can continue working with it. You can:

- [Upgrade]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/workloads/upgrade-workloads) the workload to a newer version of the application it's running.
- [Roll back]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/workloads/rollback-workloads) a workload to a previous version, if an issue occurs during upgrade.
- [Add a sidecar]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/workloads/add-a-sidecar), which is a workload that supports a primary workload.

## Load Balancing and Ingress

### Load Balancers

After you launch an application, the app is only available within the cluster. It can't be reached from outside the cluster.

If you want your applications to be externally accessible, you must add a load balancer to your cluster. Load balancers create a gateway for external connections to access your cluster, provided that the user knows the load balancer's IP address and the application's port number.

Rancher supports two types of load balancers:

- [Layer-4 Load Balancers]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/load-balancers/#layer-4-load-balancer)
- [Layer-7 Load Balancers]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/load-balancers/#layer-7-load-balancer)

For more information, see [load balancers]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/load-balancers).

#### Ingress

Load Balancers can only handle one IP address per service, which means if you run multiple services in your cluster, you must have a load balancer for each service. Running multiples load balancers can be expensive.

To address this issue, you can set up an ingress. Ingress is a controller that sits behind a load balancer. When the load balancer receives a request for one of the services running in your cluster, the load balancer passes it to your Ingress. Ingress then routes the request to the correct service based on service subdomains or path rules that you've configured.

For more information, see [Ingress]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/ingress).

## Service Discovery

After you expose your cluster to external requests using a load balancer and/or ingress, it's only available by IP address. To create a resolveable hostname, you must create a service record, which is a record that maps an IP address, external hostname, DNS record alias, workload(s), or labled pods to a specific hostname.

For more information, see [Service Discovery]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/service-discovery).

## Volumes and Storage

For workloads that need to retain their state, you must add external storage for the workload. Storage volumes are locations outside your of your pods where applications can store their data. Because the storage is external to the workload, if a container fails, the container that replaces it can restore the external data, making recovery appear seamless.

Within Rancher, you can create persistent storage using one of two methods:

- [Persistent Volumes]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/volumes-and-storage/#persistent-volumes)

    Persistent volumes are pre-provisioned storage volumes that you can bind to pods later using Persistent Volume Claims.

- [Storage Classes]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/volumes-and-storage/#storage-classes)

    Storage classes are objects that provision storage volumes upon request. When a pod submits a Persistent Volume Claim to the storage class, the class creates a storage volume for the pod.

After you deploy a workload, they request storage using a [Persistent Volume Claim]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/volumes-and-storage/persistent-volume-claims), which is like a voucher used to claim storage space available within the cluster.

## Kubernetes Resources

Within the context of a Rancher project or namespace, _resources_ are files and data that support operation of your pods. Within Rancher, certificates, registries, and secrets are all considered resources. However Kubernetes considers resources as different types of [secrets](https://kubernetes.io/docs/concepts/configuration/secret/). Therefore, within a single project or namespace, individual resources must have unique names to avoid conflicts. Although resources are primarily used to carry sensitive information, they have other uses as well.

Resources include:

- [Certificates]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/certificates/): Files used to encrypt/decrypt data entering or leaving the cluster.
- [ConfigMaps]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/configmaps/): Files that store general configuration information, such as a group of config files.
- [Secrets]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/secrets/): Files that store sensitive data like passwords, tokens, or keys.
- [Registries]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/registries/): Files that carry credentials used to authenticate with private registries.
