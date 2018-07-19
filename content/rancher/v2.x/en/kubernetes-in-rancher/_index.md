---
title: Kubernetes in Rancher
weight: 3000
aliases:
  - /rancher/v2.x/en/concepts/
  - /rancher/v2.x/en/tasks/
  - /rancher/v2.x/en/concepts/resources/
---

After you provision a Kubernetes (K8s) cluster in Rancher, you can begin using powerful K8s features from the Rancher UI to manage the cluster, allowing you to deploy and scale your containerized applications in development, testing, or production environments.

Do Lorem ut et quis laboris dolore enim ad voluptate. Veniam reprehenderit mollit id anim in labore ipsum voluptate anim ut nostrud. Nulla laborum voluptate culpa veniam ullamco ad laboris enim. Sint qui proident laboris aliquip veniam in enim reprehenderit officia nostrud pariatur pariatur.

Magna est sint irure adipisicing dolor. Pariatur duis sunt commodo esse ex do deserunt. Et adipisicing velit mollit nisi do commodo. Velit do anim aliqua consectetur.

Occaecat esse amet nulla cupidatat Lorem velit. Quis eu ex dolor pariatur id sit aliqua. Ex enim elit voluptate sint deserunt proident veniam occaecat occaecat velit exercitation deserunt dolore.

## Advanced Cluster Interaction

Although the primary method of interacting with your Kubernetes clusters created using Rancher is the Rancher UI, you have additional options for controlling your clusters:

- **kubectl**

    You can use the Kubernetes command-line tool, [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/), to control your clusters. You have two options for using kubectl:

    - **Rancher kubectl shell**
    
        You can interact with your clusters by launching the kubectl shell available in the Rancher UI. This option requires no configuration actions on your part. 
        
        For more information, see [Accessing Clusters with kubectl Shell]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/kubectl/#accessing-clusters-with-kubectl-shell).
    
    - **Terminal remote connection**:
    
        You can also interact with your clusters by installing [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) and then copying your cluster's kubeconfig file from the Rancher UI to your local `~/.kube/config` directory.
        
        For more information, see [Accessing Clusters with kubectl and a kubeconfig File]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/kubectl/#accessing-clusters-with-kubectl-and-a-kubeconfig-file).

- **Rancher CLI**

    You can interact with your clusters by downloading Rancher's own command-line interface, [Rancher CLI]({{< baseurl >}}/rancher/v2.x/en/cli/).

- **Rancher API**

    Finally, you can interact with your clusters over the Rancher API. However, before you use the API, you must obtain an [API key]({{< baseurl >}}/rancher/v2.x/en/user-settings/api-keys/) using the Rancher UI.

## Node Management

After you launch a Rancher cluster, you can edit many of the settings you configured during its initial launch, including:

- The cluster's [members]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#membership-and-role-assignment) and [roles]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles).
- Its [Kubernetes options]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/), including:

    - The version of Kubernetes installed.
    - Whether the cluster allows unsupported versions of Docker to run.
    - Whether the cluster uses a cloud provider.
    - Whether the cluster applies a pod security policy.

    >**Note:** You cannot edit the clusters Network Provider after its initial launch.

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

    Projects are a feature available in Rancher, but not the base version of Kubernetes. Projects allows you to group different namespaces a single object. You can then use your project to set user access and pod security policies using a single object (the project) rather than many (namespaces).

    You can also assign the workloads and resources mentioned above to a project. Therefore, any resources available within a project are available for all namespaces within that project.

For more information on creating project and attaching objects and membership to them, see:

- [Projects and Namespaces]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/projects-and-namespaces/)
- [Project Members]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/projects-and-namespaces/project-members/)

## Workloads

Deploy applications to your cluster nodes using [workloads]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/workloads/), which are objects that contain pods that run your apps, along with metadata that set rules for the deployment's behavior. Workloads can deployed within the scope of the entire clusters, or within a namespace.

When deploying a workload, you can deploy any application hosted on [Docker Hub](https://hub.docker.com/). There are variety of [workload types]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/workloads/#workload-types) to choose from.

Following a workload deployment, you can continue working with it. You can:

    - [Upgrade]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/workloads/upgrade-workloads) the workload to a newer version of the application it's running.
    - [Roll back]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/workloads/rollback-workloads) a workload, if an issue occurs during upgrade.
    - [Add a sidecar]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/workloads/add-a-sidecar), which is a workload that supports a primary workload.

## Load Balancing and Ingress

## Service Discovery

## Volumes and Storage

## Kubernetes Resources

Within the context of a Rancher project or namespace, _resources_ are files and data that support operation of your pods. Within Kubernetes, certificates, registries, and secrets are all considered [secrets](https://kubernetes.io/docs/concepts/configuration/secret/). Therefore, within a single project or namespace, these resources must have unique names to avoid conflicts. Although secrets are primarily used to carry sensitive information, they have other uses as well.

Resources include:

- [Certificates]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/certificates/): files used to encrypt/decrypt data entering or leaving the cluster.
- [ConfigMaps]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/configmaps/): files that store general configuration information, such as a group of config files.
- [Secrets]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/secrets/): files that store sensitive data like passwords, tokens, or keys
- [Registries]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/registries/): files that carry credentials used to authenticate with private registries.


## Cluster Resources

  - node management
  - storage
  - load balancing
  - service discovery
  - volumes


