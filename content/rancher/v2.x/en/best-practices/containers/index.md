---
title: Container Best Practices 
layout: bpg-default-v1.0
version: v1.0
lang: en
---

Running well built containers can greatly impact the overall performance and security of your environment. Few tips:

- When possible, try to standardize on a common container base OS. Smaller distributions such as Alpine and BusyBox reduce container image size and generally have a smaller attack/vulnerability surface. Popular distributions such as Ubuntu, Fedora, and CentOS are more field tested and offer more functionality.
- If your microservice is a standalone static binary, use a FROM scratch container. This will have the smallest attack surface and smallest image size.
- When possible, use a non-privileged user when running processes within your container. While container runtimes provide isolation, vulnerabilities and attacks are still possible. Inadvertent or accidental host mounts can also be impacted if the container is running as root.
- Apply CPU and memory limits to your pods. This can help manage the resources on your worker nodes and avoid a malfunctioning microservice from impacting other microservices.
- Also apply CPU and memory requirements to your pods. This is crucial for informing the scheduler which type of compute node your pod needs to be placed on, and ensuring it does not overprovision that node. Without this the scheduler makes assumptions that will likely not be helpful to your application once the cluster experiences load. 
- Set up liveness and readiness probes for your container. Unless your container completely crashes, Kubernetes will not know it's unhealthy unless you create an endpoint or mechanism that can report container status. Alternatively, make sure you container halts and crashes if unhealthy.
