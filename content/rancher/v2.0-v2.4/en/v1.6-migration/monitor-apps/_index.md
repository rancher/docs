---
title: "4. Configure Health Checks"
weight: 400
---

Rancher v1.6 provided TCP and HTTP health checks on your nodes and services using its own health check microservice. These health checks monitored your containers to confirm they're operating as intended. If a container failed a health check, Rancher would destroy the unhealthy container and then replicates a healthy one to replace it.

For Rancher v2.x, we've replaced the health check microservice, leveraging instead Kubernetes' native health check support.

Use this document to correct Rancher v2.x workloads and services that list `health_check` in `output.txt`. You can correct them by configuring a liveness probe (i.e., a health check).

For example, for the image below, we would configure liveness probes for the `web` and `weblb` workloads (i.e., the Kubernetes manifests output by migration-tools CLI).

<figcaption>Resolve <code>health_check</code> for the <code>web</code> and <code>webLB</code> Workloads</figcaption>

![Resolve health_check]({{<baseurl>}}/img/rancher/resolve-health-checks.png)

## In This Document

<!-- TOC -->

- [Rancher v1.6 Health Checks](#rancher-v1-6-health-checks)
- [Rancher v2.x Health Checks](#rancher-v2-x-health-checks)
- [Configuring Probes in Rancher v2.x](#configuring-probes-in-rancher-v2-x)

<!-- /TOC -->

## Rancher v1.6 Health Checks

In Rancher v1.6, you could add health checks to monitor a particular service's operations. These checks were performed by the Rancher health check microservice, which is launched in a container on a node separate from the node hosting the monitored service (however, Rancher v1.6.20 and later also runs a local health check container as a redundancy for the primary health check container on another node). Health check settings were stored in the `rancher-compose.yml` file for your stack.

The health check microservice features two types of health checks, which have a variety of options for timeout, check interval, etc.:

- **TCP health checks**:

    These health checks check if a TCP connection opens at the specified port for the monitored service. For full details, see the [Rancher v1.6 documentation]({{<baseurl>}}/rancher/v1.6/en/cattle/health-checks/).

- **HTTP health checks**:

    These health checks monitor HTTP requests to a specified path and check whether the response is expected response (which is configured along with the health check).

The following diagram displays the health check microservice evaluating a container running Nginx. Notice that the microservice is making its check across nodes.

![Rancher v1.6 Health Checks]({{<baseurl>}}/img/rancher/healthcheck.svg)

## Rancher v2.x Health Checks

In Rancher v2.x, the health check microservice is replaced with Kubernetes's native health check mechanisms, called _probes_. These probes, similar to the Rancher v1.6 health check microservice, monitor the health of pods over TCP and HTTP.

However, probes in Rancher v2.x have some important differences, which are described below. For full details about probes, see the [Kubernetes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes).


### Local Health Checks

Unlike the Rancher v1.6 health checks performed across hosts, probes in Rancher v2.x occur on _same_ host, performed by the kubelet.


### Multiple Probe Types

Kubernetes includes two different _types_ of probes: liveness checks and readiness checks.

- **Liveness Check**:

    Checks if the monitored container is running. If the probe reports failure, Kubernetes kills the pod, and then restarts it according to the deployment [restart policy](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy).

- **Readiness Check**:

    Checks if the container is ready to accept and serve requests. If the probe reports failure, the pod is sequestered from the public until it self heals.

The following diagram displays kubelets running probes on containers they are monitoring ([kubelets](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) are the primary "agent" running on each node). The node on the left is running a liveness probe, while the one of the right is running a readiness check. Notice that the kubelet is scanning containers on its host node rather than across nodes, as in Rancher v1.6.

![Rancher v2.x Probes]({{<baseurl>}}/img/rancher/probes.svg)

## Configuring Probes in Rancher v2.x

The [migration-tool CLI]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/run-migration-tool/) cannot parse health checks from Compose files to Kubernetes manifest. Therefore, if want you to add health checks to your Rancher v2.x workloads, you'll have to add them manually.

Using the Rancher v2.x UI, you can add TCP or HTTP health checks to Kubernetes workloads. By default, Rancher asks you to configure a readiness check for your workloads and applies a liveness check using the same configuration. Optionally, you can define a separate liveness check.

If the probe fails, the container is restarted per the restartPolicy defined in the workload specs. This setting is equivalent to the strategy parameter for health checks in Rancher v1.6.

Configure probes by using the **Health Check** section while editing deployments called out in `output.txt`.

<figcaption>Edit Deployment: Health Check Section</figcaption>

![Health Check Section]({{<baseurl>}}/img/rancher/health-check-section.png)

### Configuring Checks

While you create a workload using Rancher v2.x, we recommend configuring a check that monitors the health of the deployment's pods.

{{% tabs %}}

{{% tab "TCP Check" %}}

TCP checks monitor your deployment's health by attempting to open a connection to the pod over a specified port. If the probe can open the port, it's considered healthy. Failure to open it is considered unhealthy, which notifies Kubernetes that it should kill the pod and then replace it according to its [restart policy](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy). (this applies to Liveness probes, for Readiness probes, it will mark the pod as Unready).

You can configure the probe along with values for specifying its behavior by selecting the **TCP connection opens successfully** option in the **Health Check** section. For more information, see [Deploying Workloads]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/workloads/deploy-workloads/). For help setting probe timeout and threshold values, see [Health Check Parameter Mappings](#health-check-parameter-mappings).

![TCP Check]({{<baseurl>}}/img/rancher/readiness-check-tcp.png)

When you configure a readiness check using Rancher v2.x, the `readinessProbe` directive and the values you've set are added to the deployment's Kubernetes manifest. Configuring a readiness check also automatically adds a liveness check (`livenessProbe`) to the deployment.

<!--

```YAML
...
    - image: nginx
      imagePullPolicy: Always
      readinessProbe:           # ADDED DIRECTIVE
        failureThreshold: 3
        initialDelaySeconds: 10
        periodSeconds: 2
        successThreshold: 1
        tcpSocket:
          port: 80
        timeoutSeconds: 2
      livenessProbe:            # ADDED DIRECTIVE
        failureThreshold: 3
        initialDelaySeconds: 10
        periodSeconds: 2
        successThreshold: 1
        tcpSocket:
          port: 80
        timeoutSeconds: 2
 ```

-->

{{% /tab %}}

{{% tab "HTTP Check" %}}

HTTP checks monitor your deployment's health by sending an HTTP GET request to a specific URL path that you define. If the pod responds with a message range of `200`-`400`, the health check is considered successful. If the pod replies with any other value, the check is considered unsuccessful, so Kubernetes kills and replaces the pod according to its [restart policy](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy). (this applies to Liveness probes, for Readiness probes, it will mark the pod as Unready).

You can configure the probe along with values for specifying its behavior by selecting the **HTTP returns successful status** or **HTTPS returns successful status**. For more information, see [Deploying Workloads]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/workloads/deploy-workloads/).  For help setting probe timeout and threshold values, see [Health Check Parameter Mappings](#healthcheck-parameter-mappings).

![HTTP Check]({{<baseurl>}}/img/rancher/readiness-check-http.png)

When you configure a readiness check using Rancher v2.x, the `readinessProbe` directive and the values you've set are added to the deployment's Kubernetes manifest. Configuring a readiness check also automatically adds a liveness check (`livenessProbe`) to the deployment.

{{% /tab %}}

{{% /tabs %}}

### Configuring Separate Liveness Checks

While configuring a readiness check for either the TCP or HTTP protocol, you can configure a separate liveness check by clicking the **Define a separate liveness check**. For help setting probe timeout and threshold values, see [Health Check Parameter Mappings](#health-check-parameter-mappings).

![Separate Liveness Check]({{<baseurl>}}/img/rancher/separate-check.png)

### Additional Probing Options

Rancher v2.x, like v1.6, lets you perform health checks using the TCP and HTTP protocols. However, Rancher v2.x also lets you check the health of a pod by running a command inside of it. If the container exits with a code of `0` after running the command, the pod is considered healthy.

You can configure a liveness or readiness check that executes a command that you specify by selecting the `Command run inside the container exits with status 0` option from **Health Checks** while [deploying a workload]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/workloads/deploy-workloads/).

![Healthcheck Execute Command]({{<baseurl>}}/img/rancher/healthcheck-cmd-exec.png)

#### Health Check Parameter Mappings

While configuring readiness checks and liveness checks, Rancher prompts you to fill in various timeout and threshold values that determine whether the probe is a success or failure. The reference table below shows you the equivalent health check values from Rancher v1.6.

Rancher v1.6 Compose Parameter | Rancher v2.x Kubernetes Parameter
-------------------------------|-----------------------------------
`port`                         | `tcpSocket.port`
`response_timeout`             | `timeoutSeconds`
`healthy_threshold`            | `failureThreshold`
`unhealthy_threshold`          | `successThreshold`
`interval`                     | `periodSeconds`
`initializing_timeout`         | `initialDelaySeconds`
`strategy`                     | `restartPolicy`

### [Next: Schedule Your Services]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/schedule-workloads/)
