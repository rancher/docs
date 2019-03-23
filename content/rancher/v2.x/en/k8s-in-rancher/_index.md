---
title: Working in Projects
weight: 3000
aliases:
  - /rancher/v2.x/en/concepts/
  - /rancher/v2.x/en/tasks/
  - /rancher/v2.x/en/concepts/resources/
---

After you provision a cluster in Rancher, you can begin using powerful Kubernetes features to deploy and scale your containerized applications in development, testing, or production environments.

## Interacting with Clusters

- **Rancher UI**

    Rancher provides an intuitive user interface for interacting with your clusters. All options available in the UI use the Rancher API. Therefore any action possible in the UI is also possible in the Rancher CLI or Rancher API.

- **kubectl**

    You can use the Kubernetes command-line tool, [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/), to manage   your clusters. You have two options for using kubectl:

    - **Rancher kubectl shell**

        Interact with your clusters by launching a kubectl shell available in the Rancher UI. This option requires no configuration actions on your part.

        For more information, see [Accessing Clusters with kubectl Shell]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/kubectl/#accessing-clusters-with-kubectl-shell).

    - **Terminal remote connection**

        You can also interact with your clusters by installing [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) on your local desktop and then copying the cluster's kubeconfig file to your local `~/.kube/config` directory.

        For more information, see [Accessing Clusters with kubectl and a kubeconfig File]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/kubectl/#accessing-clusters-with-kubectl-and-a-kubeconfig-file).

- **Rancher CLI**

    You can control your clusters by downloading Rancher's own command-line interface, [Rancher CLI]({{< baseurl >}}/rancher/v2.x/en/cli/). This CLI tool can interact directly with different clusters and projects or pass them `kubectl` commands.

- **Rancher API**

    Finally, you can interact with your clusters over the Rancher API. Before you use the API, you must obtain an [API key]({{< baseurl >}}/rancher/v2.x/en/user-settings/api-keys/). To view the different resource fields and actions for an API object, open the API UI, which can be accessed by clicking on **View in API** for any Rancher UI object.

## Editing Clusters

After you launch a cluster, you can edit many of its settings configured during its initial launch. All clusters allow you to edit the cluster membership, which is a pool of users that can access the cluster, along with their roles within the cluster. For more information, see [members]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#membership-and-role-assignment) and [roles]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles).

Depending on how you provisioned your clusters, different settings are available for editing their size and options.

- For clusters provisioned in a [hosted kubernetes provider]({{< baseurl>}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/), you can edit the options chosen during cluster provisioning. These options are dependent on your hosted Kubernetes provider.

- For [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) clusters, you can edit the following options.

    - [Kubernetes options]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/), including:

       - The version of Kubernetes installed.
       - Whether the cluster allows unsupported versions of Docker to run.
       - Whether the cluster uses a cloud provider.
       - Whether the cluster applies a pod security policy.

       >**Note:** You cannot edit the cluster's network provider after its initial launch.

   - **[Node pool]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-pools) or [custom node]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/) clusters only:** the scale and [roles of your nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#kubernetes-cluster-node-components).

       - For node pools, you can add/remove/edit cluster node pools. Node pools are set to a specific scale, so removing nodes individually does not change the size of the cluster unless you change the scale of the pool.
       - For custom nodes, you are provided the Docker command to add nodes, but the command can also be used to edit the roles of existing nodes. To remove nodes, browse to the cluster's **Nodes** page and delete the unnecessary nodes.

To view the settings available for your cluster, see [Editing Clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters).

## Projects and Namespaces

To support multi-tenancy on a cluster, create different [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/). Projects allow you to group several [namespaces]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#namespaces) into a single object. You can set user access and pod security policies for each project, which allows groups of users to access different sets of namespaces while using the same cluster. Projects are a feature available in Rancher, but not the base version of Kubernetes.

For more information on how to manage projects, see:

- [Projects and Namespaces]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/)
- [Project Members]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/project-members/)

## Workloads

Deploy applications to your cluster nodes using [workloads]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/), which are objects that contain pods that run your apps, along with metadata that set rules for the deployment's behavior. Workloads can be deployed within the scope of the entire clusters or within a namespace.

When deploying a workload, you can deploy from any image. There are a variety of [workload types]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/#workload-types) to choose from which determine how your application should run.

Following a workload deployment, you can continue working with it. You can:

- [Upgrade]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/upgrade-workloads) the workload to a newer version of the application it's running.
- [Roll back]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/rollback-workloads) a workload to a previous version, if an issue occurs during upgrade.
- [Add a sidecar]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/add-a-sidecar), which is a workload that supports a primary workload.

## Load Balancing and Ingress

### Load Balancers

After you launch an application, it's only available within the cluster. It can't be reached externally.

If you want your applications to be externally accessible, you must add a load balancer to your cluster. Load balancers create a gateway for external connections to access your cluster, provided that the user knows the load balancer's IP address and the application's port number.

Rancher supports two types of load balancers:

- [Layer-4 Load Balancers]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers/#layer-4-load-balancer)
- [Layer-7 Load Balancers]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers/#layer-7-load-balancer)

For more information, see [load balancers]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers).

#### Ingress

Load Balancers can only handle one IP address per service, which means if you run multiple services in your cluster, you must have a load balancer for each service. Running multiples load balancers can be expensive. You can get around this issue by using an ingress.

Ingress is a set or rules that act as a load balancer. Ingress works in conjunction with one or more ingress controllers to dynamically route service requests. When the ingress receives a request, the ingress controller(s) in your cluster program the load balancer to direct the request to the correct service based on service subdomains or path rules that you've configured.

For more information, see [Ingress]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/load-balancers-and-ingress/ingress).

## Service Discovery

After you expose your cluster to external requests using a load balancer and/or ingress, it's only available by IP address. To create a resolveable hostname, you must create a service record, which is a record that maps an IP address, external hostname, DNS record alias, workload(s), or labelled pods to a specific hostname.

For more information, see [Service Discovery]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/service-discovery).

## Volumes and Storage

For workloads that need to retain their state, you must add external storage for the workload. Storage volumes are locations outside of your pods where applications can store their data. Because the storage is external to the workload, if a container fails, the container that replaces it can restore the external data, making recovery appear seamless.

Within Rancher, you can create persistent storage using one of two methods:

- [Persistent Volumes]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#persistent-volumes)

    Persistent volumes are pre-provisioned storage volumes that you can bind to pods later using persistent volume claims.

- [Storage Classes]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#storage-classes)

    Storage classes are objects that provision storage volumes upon request. When a pod submits a persistent volume claim to the storage class, the class creates a storage volume for the pod.

After you deploy a workload, it requests storage using a [persistent volume claim]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/persistent-volume-claims), which is like a voucher used to claim storage space available within the cluster.

## Kubernetes Resources

Within the context of a Rancher project or namespace, _resources_ are files and data that support operation of your pods. Within Rancher, certificates, registries, and secrets are all considered resources. However, Kubernetes classifies resources as different types of [secrets](https://kubernetes.io/docs/concepts/configuration/secret/). Therefore, within a single project or namespace, individual resources must have unique names to avoid conflicts. Although resources are primarily used to carry sensitive information, they have other uses as well.

Resources include:

- [Certificates]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/certificates/): Files used to encrypt/decrypt data entering or leaving the cluster.
- [ConfigMaps]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/configmaps/): Files that store general configuration information, such as a group of config files.
- [Secrets]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/secrets/): Files that store sensitive data like passwords, tokens, or keys.
- [Registries]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/registries/): Files that carry credentials used to authenticate with private registries.
