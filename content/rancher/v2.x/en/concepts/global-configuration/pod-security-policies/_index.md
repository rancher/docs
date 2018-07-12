---
title: Pod Security Policies
weight: 75
---

_Pod Security Policies_ (or PSPs) are objects that control security-sensitive aspects of pod specification (like root privileges). If a pod does not meet the conditions specified in the PSP, Kubernetes will not allow it to start, and Rancher will display an error message of `Pod <NAME> is forbidden: unable to validate...`.

- You can assign PSPs at the cluster or project level.
- PSPs work through inheritance.

    - By default, PSPs assigned to a cluster are inherited by its projects, as well as any namespaces added to those projects.
    - **Exception:** Namespaces that are not assigned to projects do not inherit PSPs, regardless of whether the PSP is assigned to a cluster or project. Because these namespaces have no PSPs, workload deployments to these namespaces will fail, which is the default Kubernetes behavior.
    - You can override the default PSP by assigning a different PSP directly to the project.
- Any workloads that are already running in a cluster or project before a PSP is assigned will not be checked if it complies with the PSP. Workloads would need to be cloned or upgraded to see if they pass the PSP.

Read more about Pod Security Policies in the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/policy/pod-security-policy/).

>**Best Practice:**
>Set Pod Security at the cluster level.

## Related Links

### External Links

- [Pod Security Policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/)

### Tutorials

- [Creating Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/adding-a-pod-security-policy)
