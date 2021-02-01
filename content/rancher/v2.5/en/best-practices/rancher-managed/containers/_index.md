---
title: Tips for Setting Up Containers
weight: 100
aliases:
  - /rancher/v2.5/en/best-practices/containers
  - /rancher/v2.5/en/best-practices/v2.5/rancher-managed/containers
---

Running well-built containers can greatly impact the overall performance and security of your environment.

Below are a few tips for setting up your containers.

For a more detailed discussion of security for containers, you can also refer to Rancher's [Guide to Container Security.](https://rancher.com/complete-guide-container-security)

### Use a Common Container OS

When possible, you should try to standardize on a common container base OS. 

Smaller distributions such as Alpine and BusyBox reduce container image size and generally have a smaller attack/vulnerability surface.

Popular distributions such as Ubuntu, Fedora, and CentOS are more field-tested and offer more functionality.

### Start with a FROM scratch container
If your microservice is a standalone static binary, you should use a FROM scratch container. 

The FROM scratch container is an [official Docker image](https://hub.docker.com/_/scratch) that is empty so that you can use it to design minimal images.

This will have the smallest attack surface and smallest image size.

### Run Container Processes as Unprivileged
When possible, use a non-privileged user when running processes within your container. While container runtimes provide isolation, vulnerabilities and attacks are still possible. Inadvertent or accidental host mounts can also be impacted if the container is running as root. For details on configuring a security context for a pod or container, refer to the [Kubernetes docs](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/).

### Define Resource Limits
Apply CPU and memory limits to your pods. This can help manage the resources on your worker nodes and avoid a malfunctioning microservice from impacting other microservices.

In standard Kubernetes, you can set resource limits on the namespace level. In Rancher, you can set resource limits on the project level and they will propagate to all the namespaces within the project. For details, refer to the Rancher docs.

When setting resource quotas, if you set anything related to CPU or Memory (i.e. limits or reservations) on a project or namespace, all containers will require a respective CPU or Memory field set during creation. To avoid setting these limits on each and every container during workload creation, a default container resource limit can be specified on the namespace.

The Kubernetes docs have more information on how resource limits can be set at the [container level](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#resource-requests-and-limits-of-pod-and-container) and the namespace level.

### Define Resource Requirements
You should apply CPU and memory requirements to your pods. This is crucial for informing the scheduler which type of compute node your pod needs to be placed on, and ensuring it does not over-provision that node. In Kubernetes, you can set a resource requirement by defining `resources.requests` in the resource requests field in a pod's container spec. For details, refer to the [Kubernetes docs](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#resource-requests-and-limits-of-pod-and-container).

> **Note:** If you set a resource limit for the namespace that the pod is deployed in, and the container doesn't have a specific resource request, the pod will not be allowed to start. To avoid setting these fields on each and every container during workload creation, a default container resource limit can be specified on the namespace.

It is recommended to define resource requirements on the container level because otherwise, the scheduler makes assumptions that will likely not be helpful to your application when the cluster experiences load.

### Liveness and Readiness Probes
Set up liveness and readiness probes for your container. Unless your container completely crashes, Kubernetes will not know it's unhealthy unless you create an endpoint or mechanism that can report container status. Alternatively, make sure your container halts and crashes if unhealthy.

The Kubernetes docs show how to [configure liveness and readiness probes for containers.](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/)
