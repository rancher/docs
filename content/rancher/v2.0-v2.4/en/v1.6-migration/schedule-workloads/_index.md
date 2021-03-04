---
title: "5. Schedule Your Services"
weight: 500
---

In v1.6, objects called _services_ were used to schedule containers to your cluster hosts. Services included the Docker image for an application, along with configuration settings for a desired state.

In Rancher v2.x, the equivalent object is known as a _workload_. Rancher v2.x retains all scheduling functionality from v1.6, but because of the change from Cattle to Kubernetes as the default container orchestrator, the terminology and mechanisms for scheduling workloads has changed.

Workload deployment is one of the more important and complex aspects of container orchestration. Deploying pods to available shared cluster resources helps maximize performance under optimum compute resource use.

You can schedule your migrated v1.6 services while editing a deployment. Schedule services by using **Workload Type** and **Node Scheduling** sections, which are shown below.

<figcaption>Editing Workloads: Workload Type and Node Scheduling Sections</figcaption>

![Workload Type and Node Scheduling Sections]({{<baseurl>}}/img/rancher/migrate-schedule-workloads.png)

## In This Document

<!-- NEED DOCS ABOUT CHANGING DEPLOYMENTS TO DAEMONSETS -->

<!-- TOC -->

- [What's Different for Scheduling Services?](#whats-different-for-scheduling-services)
- [Node Scheduling Options](#node-scheduling-options)
- [Scheduling Pods to a Specific Node](#scheduling-pods-to-a-specific-node)
- [Scheduling Using Labels](#scheduling-using-labels)
- [Scheduling Pods Using Resource Constraints](#scheduling-pods-using-resource-constraints)
- [Preventing Scheduling Specific Services to Specific Nodes](#preventing-scheduling-specific-services-to-specific-nodes)
- [Scheduling Global Services](#scheduling-global-services)


<!-- /TOC -->

## What's Different for Scheduling Services?


Rancher v2.x retains _all_ methods available in v1.6 for scheduling your services. However, because the default container orchestration system has changed from Cattle to Kubernetes, the terminology and implementation for each scheduling option has changed.

In v1.6, you would schedule a service to a host while adding a service to a Stack. In Rancher v2.x., the equivalent action is to schedule a workload for deployment. The following composite image shows a comparison of the UI used for scheduling in Rancher v2.x versus v1.6.

![Node Scheduling: Rancher v2.x vs v1.6]({{<baseurl>}}/img/rancher/node-scheduling.png)

## Node Scheduling Options

Rancher offers a variety of options when scheduling nodes to host workload pods (i.e., scheduling hosts for containers in Rancher v1.6).

You can choose a scheduling option as you deploy a workload. The term _workload_ is synonymous with adding a service to a Stack in Rancher v1.6). You can deploy a workload by using the context menu to browse to a cluster project (`<CLUSTER> > <PROJECT> > Workloads`).

The sections that follow provide information on using each scheduling options, as well as any notable changes from Rancher v1.6. For full instructions on deploying a workload in Rancher v2.x beyond just scheduling options, see [Deploying Workloads]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/workloads/deploy-workloads/).

Option | v1.6 Feature | v2.x Feature
-------|------|------
[Schedule a certain number of pods?](#schedule-a-certain-number-of-pods) | ✓ | ✓
[Schedule pods to specific node?](#scheduling-pods-to-a-specific-node) | ✓ | ✓
[Schedule to nodes using labels?](#applying-labels-to-nodes-and-pods) | ✓ | ✓
[Schedule to nodes using label affinity/anti-affinity rules?](#label-affinity-antiaffinity) | ✓ | ✓
[Schedule based on resource constraints?](#scheduling-pods-using-resource-constraints) | ✓ | ✓
[Preventing scheduling specific services to specific hosts?](#preventing-scheduling-specific-services-to-specific-nodes) | ✓ | ✓
[Schedule services globally?](#scheduling-global-services) | ✓ | ✓


### Schedule a certain number of pods

In v1.6, you could control the number of container replicas deployed for a service. You can schedule pods the same way in v2.x, but you'll have to set the scale manually while editing a workload.

![Resolve Scale]({{<baseurl>}}/img/rancher/resolve-scale.png)

During migration, you can resolve `scale` entries in `output.txt` by setting a value for the **Workload Type** option **Scalable deployment** depicted below.

<figcaption>Scalable Deployment Option</figcaption>

![Workload Scale]({{<baseurl>}}/img/rancher/workload-type-option.png)

### Scheduling Pods to a Specific Node

Just as you could schedule containers to a single host in Rancher v1.6, you can schedule pods to single node in Rancher v2.x

As you deploy a workload, use the **Node Scheduling** section to choose a node to run your pods on. The workload below is being scheduled to deploy an Nginx image with a scale of two pods on a specific node.
<!-- Question: What would be a good use case for use of a scheduling pods on the same node?-->

<figcaption>Rancher v2.x: Workload Deployment</figcaption>

![Workload Tab and Group by Node Icon]({{<baseurl>}}/img/rancher/schedule-specific-node.png)

Rancher schedules pods to the node you select if 1) there are compute resource available for the node and 2) you've configured port mapping to use the HostPort option, that there are no port conflicts.

If you expose the workload using a NodePort that conflicts with another workload, the deployment gets created successfully, but no NodePort service is created. Therefore, the workload isn't exposed outside of the cluster.

After the workload is created, you can confirm that the pods are scheduled to your chosen node. From the project view, click **Resources > Workloads.** (In versions before v2.3.0, click the **Workloads** tab.) Click the **Group by Node** icon to sort your workloads by node. Note that both Nginx pods are scheduled to the same node.

![Pods Scheduled to Same Node]({{<baseurl>}}/img/rancher/scheduled-nodes.png)

<!--

If you export the workload's manifest for Rancher v2.x, you can see in the pod spec that the workload is scheduled to the node that you selected (`nodeName: mark-do1`).

<figcaption>Kubernetes manifest: All Pods Scheduled to Single Node</figcaption>

```YAML
...
    spec:
      containers:
      - image: nginx
        imagePullPolicy: Always
        name: nginx
        ports:
        - containerPort: 80
          name: 80tcp01
          protocol: TCP
        resources: {}
        securityContext:
          allowPrivilegeEscalation: false
          capabilities: {}
          privileged: false
          readOnlyRootFilesystem: false
          runAsNonRoot: false
        stdin: true
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        tty: true
      dnsPolicy: ClusterFirst
      nodeName: mark-do1         # Scheduled Node
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
...

```
-->

### Scheduling Using Labels

In Rancher v2.x, you can constrain pods for scheduling to specific nodes (referred to as hosts in v1.6). Using [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/), which are key/value pairs that you can attach to different Kubernetes objects, you can configure your workload so that pods you've labeled are assigned to specific nodes (or nodes with specific labels are automatically assigned workload pods).

<figcaption>Label Scheduling Options</figcaption>

Label Object | Rancher v1.6 | Rancher v2.x
-------------|--------------|---------------
Schedule by Node? | ✓       | ✓
Schedule by Pod?  | ✓       | ✓

#### Applying Labels to Nodes and Pods

Before you can schedule pods based on labels, you must first apply labels to your pods or nodes.

>**Hooray!**
>All the labels that you manually applied in Rancher v1.6 (but _not_ the ones automatically created by Rancher) are parsed by migration-tools CLI, meaning you don't have to manually reapply labels.

To apply labels to pods, make additions to the **Labels and Annotations** section as you configure your workload. After you complete workload configuration, you can view the label by viewing each pod that you've scheduled. To apply labels to nodes, edit your node and make additions to the **Labels** section.


#### Label Affinity/AntiAffinity

Some of the most-used scheduling features in v1.6 were affinity and anti-affinity rules.

<figcaption><code>output.txt</code> Affinity Label</figcaption>

![Affinity Label]({{<baseurl>}}/img/rancher/resolve-affinity.png)

- **Affinity**

    Any pods that share the same label are scheduled to the same node. Affinity can be configured in one of two ways:

    Affinity | Description
    ---------|------------
    **Hard** |  A hard affinity rule means that the host chosen must satisfy all the scheduling rules. If no such host can be found, the workload will fail to deploy. In the Kubernetes manifest, this rule translates to the `nodeAffinity` directive.<br/><br/>To use hard affinity, configure a rule using the **Require ALL of** section (see figure below).
    **Soft** | Rancher v1.6 user are likely familiar with soft affinity rules, which try to schedule the deployment per the rule, but can deploy even if the rule is not satisfied by any host.<br/><br/>To use soft affinity, configure a rule using the **Prefer Any of** section (see figure below).

    <br/>

<figcaption>Affinity Rules: Hard and Soft</figcaption>

    ![Affinity Rules]({{<baseurl>}}/img/rancher/node-scheduling-affinity.png)

- **AntiAffinity**

    Any pods that share the same label are scheduled to different nodes. In other words, while affinity _attracts_ a specific label to each other, anti-affinity _repels_ a label from itself, so that pods are scheduled to different nodes.

    You can create an anti-affinity rules using either hard or soft affinity. However, when creating your rule, you must use either the `is not set` or `not in list` operator.

    For anti-affinity rules, we recommend using labels with phrases like `NotIn` and `DoesNotExist`, as these terms are more intuitive when users are applying anti-affinity rules.

    <figcaption>AntiAffinity Operators</figcaption>

    ![AntiAffinity ]({{<baseurl>}}/img/rancher/node-schedule-antiaffinity.png)

Detailed documentation for affinity/anti-affinity is available in the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity).

Affinity rules that you create in the UI update your workload, adding pod affinity/anti-affinity directives to the workload Kubernetes manifest specs.


### Preventing Scheduling Specific Services to Specific Nodes

In Rancher v1.6 setups, you could prevent services from being scheduled to specific nodes with the use of labels. In Rancher v2.x, you can reproduce this behavior using native Kubernetes scheduling options.

In Rancher v2.x, you can prevent pods from being scheduled to specific nodes by applying _taints_ to a node. Pods will not be scheduled to a tainted node unless it has special permission, called a _toleration_. A toleration is a special label that allows a pod to be deployed to a tainted node. While editing a workload, you can apply tolerations using the **Node Scheduling** section. Click **Show advanced options**.

<figcaption>Applying Tolerations</figcaption>

![Tolerations]({{<baseurl>}}/img/rancher/node-schedule-advanced-options.png)

For more information, see the Kubernetes documentation on [taints and tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/).

### Scheduling Global Services

Rancher v1.6 included the ability to deploy [global services]({{<baseurl>}}/rancher/v1.6/en/cattle/scheduling/#global-service), which are services that deploy duplicate containers to each host in the environment (i.e.,  nodes in your cluster using Rancher v2.x terms). If a service has the `io.rancher.scheduler.global: 'true'` label declared, then Rancher v1.6 schedules a service container on each host in the environment.

<figcaption><code>output.txt</code> Global Service Label</figcaption>

![Global Service Label]({{<baseurl>}}/img/rancher/resolve-global.png)

In Rancher v2.x, you can schedule a pod to each node using a [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/), which is a specific type of workload <!-- link -->). A _DaemonSet_ functions exactly like a Rancher v1.6 global service. The Kubernetes scheduler deploys a pod on each node of the cluster, and as new nodes are added, the scheduler will start new pods on them provided they match the scheduling requirements of the workload. Additionally, in v2.x, you can also limit a DaemonSet to be deployed to nodes that have a specific label.

To create a daemonset while configuring a workload, choose **Run one pod on each node** from the **Workload Type** options.

<figcaption>Workload Configuration: Choose run one pod on each node to configure daemonset</figcaption>

![choose Run one pod on each node]({{<baseurl>}}/img/rancher/workload-type.png)

### Scheduling Pods Using Resource Constraints

While creating a service in the Rancher v1.6 UI, you could schedule its containers to hosts based on hardware requirements that you choose. The containers are then scheduled to hosts based on which ones have bandwidth, memory, and CPU capacity.

In Rancher v2.x, you can still specify the resources required by your pods. However, these options are unavailable in the UI. Instead, you must edit your workload's manifest file to declare these resource constraints.  

To declare resource constraints, edit your migrated workloads, editing the **Security & Host** sections.

- To reserve a minimum hardware reservation available for your pod(s), edit the following sections:

    - Memory Reservation
    - CPU Reservation
    - NVIDIA GPU Reservation

- To set a maximum hardware limit for your pods, edit:

    - Memory Limit
    - CPU Limit

<figcaption>Scheduling: Resource Constraint Settings</figcaption>

![Resource Constraint Settings]({{<baseurl>}}/img/rancher/resource-constraint-settings.png)

You can find more detail about these specs and how to use them in the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#resource-requests-and-limits-of-pod-and-container).

### [Next: Service Discovery]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/discover-services/)
