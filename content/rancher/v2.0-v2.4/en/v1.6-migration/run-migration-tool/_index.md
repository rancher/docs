---
title: 2. Migrate Your Services
weight: 100
---

Although your services from v1.6 won't work in Rancher v2.x by default, that doesn't mean you have to start again from square one, manually rebuilding your applications in v2.x. To help with migration from v1.6 to v2.x, Rancher has developed a migration tool. The migration-tools CLI is a utility that helps you recreate your applications in Rancher v2.x. This tool exports your Rancher v1.6 services as Compose files and converts them to a Kubernetes manifest that Rancher v2.x can consume.

Additionally, for each Rancher v1.6-specific Compose directive that cannot be consumed by Kubernetes, migration-tools CLI provides instructions on how to manually recreate them in Rancher v2.x.

This command line interface tool will:

- Export Compose files (i.e., `docker-compose.yml` and `rancher-compose.yml`) for each stack in your v1.6 Cattle environment. For every stack, files are exported to a unique folder: `<EXPORT_DIR>/<ENV_NAME>/<STACK_NAME>`.

- Parse Compose files that you’ve exported from your Rancher v1.6 stacks and converts them to Kubernetes manifests that Rancher v2.x can consume. The tool also outputs a list of directives present in the Compose files that cannot be converted automatically to Rancher v2.x. These are directives that you’ll have to manually configure using the Rancher v2.x UI.

## Outline

<!-- TOC -->

- [A. Download the migration-tools CLI](#a-download-the-migration-tools-cli)
- [B. Configure the migration-tools CLI](#b-configure-the-migration-tools-cli)
- [C. Run the migration-tools CLI](#c-run-the-migration-tools-cli)
- [D. Deploy Services Using Rancher CLI](#d-re-deploy-services-as-kubernetes-manifests)
- [What Now?](#what-now)


<!-- /TOC -->


## A. Download the migration-tools CLI

The migration-tools CLI for your platform can be downloaded from our [GitHub releases page](https://github.com/rancher/migration-tools/releases). The tools are available for Linux, Mac, and Windows platforms.


## B. Configure the migration-tools CLI

After you download migration-tools CLI, rename it and make it executable.

1. Open a terminal window and change to the directory that contains the migration-tool file.

1. Rename the file to `migration-tools` so that it no longer includes the platform name.

1. Enter the following command to make `migration-tools` executable:

    ```
    chmod +x migration-tools
    ```

## C. Run the migration-tools CLI

Next, use the migration-tools CLI to export all stacks in all of the Cattle environments into Compose files. Then, for stacks that you want to migrate to Rancher v2.x, convert the Compose files into Kubernetes manifest.

>**Prerequisite:** Create an [Account API Key]({{<baseurl>}}/rancher/v1.6/en/api/v2-beta/api-keys/#account-api-keys) to authenticate with Rancher v1.6 when using the migration-tools CLI.

1. Export the Docker Compose files for your Cattle environments and stacks from Rancher v1.6.

    In the terminal window, execute the following command, replacing each placeholder with your values.

    ```
    migration-tools export --url http://<RANCHER_URL:PORT> --access-key <RANCHER_ACCESS_KEY> --secret-key <RANCHER_SECRET_KEY> --export-dir <EXPORT_DIR> --all
    ```

    **Step Result:** migration-tools exports Compose files (`docker-compose.yml` and `rancher-compose.yml`) for each stack in the `--export-dir` directory. If you omitted this option, Compose files are output to your current directory.

    A unique directory is created for each environment and stack. For example, if we export each [environment/stack]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/#migration-example-files) from Rancher v1.6, the following directory structure is created:

    ```
    export/                            # migration-tools --export-dir
    |--<ENVIRONMENT>/                  # Rancher v1.6 ENVIRONMENT
        |--<STACK>/                    # Rancher v1.6 STACK
             |--docker-compose.yml     # STANDARD DOCKER DIRECTIVES FOR ALL STACK SERVICES
             |--rancher-compose.yml    # RANCHER-SPECIFIC DIRECTIVES FOR ALL STACK SERVICES
             |--README.md              # README OF CHANGES FROM v1.6 to v2.x
    ```



1. Convert the exported Compose files to Kubernetes manifest.

    Execute the following command, replacing each placeholder with the absolute path to your Stack's Compose files. If you want to migrate multiple stacks, you'll have to re-run the command for each pair of Compose files that you exported.

    ```
    migration-tools parse --docker-file <DOCKER_COMPOSE_ABSOLUTE_PATH> --rancher-file <RANCHER_COMPOSE_ABSOLUTE_PATH>
    ```

    >**Note:** If you omit the `--docker-file` and `--rancher-file` options from your command, migration-tools uses the current working directory to find Compose files.

>**Want full usage and options for the migration-tools CLI?** See the [Migration Tools CLI Reference]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/run-migration-tool/migration-tools-ref/).

### migration-tools CLI Output

After you run the migration-tools parse command, the following files are output to your target directory.

| Output                | Description                                                                                                                                                                                                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `output.txt`          | This file lists how to recreate your Rancher v1.6-specific functionality in Kubernetes. Each listing links to the relevant blog articles on how to implement it in Rancher v2.x. |
| Kubernetes manifest specs | Migration-tools internally invokes [Kompose](https://github.com/kubernetes/kompose) to generate a Kubernetes manifest for each service you're migrating to v2.x. Each YAML spec file is named for the service you're migrating.

#### Why are There Separate Deployment and Service Manifests?

To make an application publicly accessible by URL, a Kubernetes service is required in support of the deployment. A Kubernetes service is a REST object that abstracts access to the pods in the workload. In other words, a service provides a static endpoint to the pods by mapping a URL to pod(s) Therefore, even if the pods change IP address, the public endpoint remains unchanged. A service object points to its corresponding deployment (workload) by using selector labels.

When a you export a service from Rancher v1.6 that exposes public ports, migration-tools CLI parses those ports to a Kubernetes service spec that links to a deployment YAML spec.

#### Migration Example File Output

If we parse the two example files from [Migration Example Files]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/#migration-example-files), `docker-compose.yml` and `rancher-compose.yml`, the following files are output:

File | Description
-----|------------
`web-deployment.yaml` | A file containing Kubernetes container specs for a Let's Chat deployment.
`web-service.yaml` | A file containing specs for the Let's Chat service.
`database-deployment.yaml` | A file containing container specs for the MongoDB deployment in support of Let's Chat.
`webLB-deployment.yaml` | A file containing container specs for an HAProxy deployment that's serving as a load balancer.<sup>1</sup>
`webLB-service.yaml` | A file containing specs for the HAProxy service.<sup>1</sup>

><sup>1</sup> Because Rancher v2.x uses Ingress for load balancing, we won't be migrating our Rancher v1.6 load balancer to v2.x.

<!--
The following tabs display the contents of each parsed file. We've omitted `webLB-deployment.yaml` and `webLB-service.yaml` because we aren't migrating them to v2.x.

{{% tabs %}}
{{% tab "web-deployment.yaml" %}}

```YAML
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  annotations:
    io.rancher.container.pull_image: always
    io.rancher.scheduler.global: "true"
    kompose.cmd: ./migration-tools parse --docker-file docker-compose.yml --rancher-file
      rancher-compose.yml
    kompose.version: 1.16.0 ()
  creationTimestamp: null
  labels:
    io.kompose.service: web
  name: web
spec:
  replicas: 0
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        io.kompose.service: web
    spec:
      containers:
      - image: sdelements/lets-chat
        name: web
        ports:
        - containerPort: 8080
        resources: {}
        stdin: true
        tty: true
      restartPolicy: Always
status: {}
```

{{% /tab %}}
{{% tab "web-service.yaml" %}}

```YAML
apiVersion: v1
kind: Service
metadata:
  annotations:
    io.rancher.container.pull_image: always
    io.rancher.scheduler.global: "true"
    kompose.cmd: ./migration-tools parse --docker-file docker-compose.yml --rancher-file
      rancher-compose.yml
    kompose.version: 1.16.0 ()
  creationTimestamp: null
  labels:
    io.kompose.service: web
  name: web
spec:
  ports:
  - name: "9890"
    port: 9890
    targetPort: 8080
  selector:
    io.kompose.service: web
status:
  loadBalancer: {}
```

{{% /tab %}}
{{% tab "database-deployment.yaml" %}}

```YAML
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  annotations:
    io.rancher.container.pull_image: always
    io.rancher.scheduler.affinity:host_label_soft: db=true
    kompose.cmd: ./migration-tools parse --docker-file docker-compose.yml --rancher-file
      rancher-compose.yml
    kompose.version: 1.16.0 ()
  creationTimestamp: null
  labels:
    io.kompose.service: database
  name: database
spec:
  replicas: 0
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        io.kompose.service: database
    spec:
      containers:
      - image: mongo
        name: database
        resources: {}
        stdin: true
        tty: true
      restartPolicy: Always
status: {}

```

{{% /tab %}}


{{% /tabs %}}

-->

## D. Re-Deploy Services as Kubernetes Manifests

>**Note:** Although these instructions deploy your v1.6 services in Rancher v2.x, they will not work correctly until you adjust their Kubernetes manifests.

{{% tabs %}}
{{% tab "Rancher UI" %}}

You can deploy the Kubernetes manifests created by migration-tools by importing them into Rancher v2.x.

>**Receiving an `ImportYaml Error`?**
>
>Delete the YAML directive listed in the error message. These are YAML directives from your v1.6 services that Kubernetes can't read.

<figcaption>Deploy Services: Import Kubernetes Manifest</figcaption>

![Deploy Services]({{<baseurl>}}/img/rancher/deploy-service.gif)

{{% /tab %}}
{{% tab "Rancher CLI" %}}


>**Prerequisite:** [Install Rancher CLI]({{<baseurl>}}/rancher/v2.0-v2.4/en/cli/) for Rancher v2.x.

Use the following Rancher CLI commands to deploy your application using Rancher v2.x. For each Kubernetes manifest output by migration-tools CLI, enter one of the commands below to import it into Rancher v2.x.

```
./rancher kubectl create -f <DEPLOYMENT_YAML_FILE> # DEPLOY THE DEPLOYMENT YAML

./rancher kubectl create -f <SERVICE_YAML_FILE> # DEPLOY THE SERVICE YAML
```

{{% /tab %}}
{{% /tabs %}}

Following importation, you can view your v1.6 services in the v2.x UI as Kubernetes manifests by using the context menu to select `<CLUSTER> > <PROJECT>` that contains your services. The imported manifests will display on the **Resources > Workloads** and on the tab at **Resources > Workloads > Service Discovery.** (In Rancher v2.x before v2.3.0, these are on the **Workloads** and **Service Discovery** tabs in the top navigation bar.)

<figcaption>Imported Services</figcaption>

![Imported Services]({{<baseurl>}}/img/rancher/imported-workloads.png)

## What Now?

Although the migration-tool CLI parses your Rancher v1.6 Compose files to Kubernetes manifests, there are discrepancies between v1.6 and v2.x that you must address by manually editing your parsed [Kubernetes manifests](#output). In other words, you need to edit each workload and service imported into Rancher v2.x, as displayed below.

<figcaption>Edit Migrated Services</figcaption>

![Edit Migrated Workload]({{<baseurl>}}/img/rancher/edit-migration-workload.gif)

As mentioned in [Migration Tools CLI Output](#migration-tools-cli-output), the `output.txt` files generated during parsing lists the manual steps you must make for each deployment. Review the upcoming topics for more information on manually editing your Kubernetes specs.

Open your `output.txt` file and take a look at its contents. When you parsed your Compose files into Kubernetes manifests, migration-tools CLI output a manifest for each workload that it creates for Kubernetes. For example, our when our [Migration Example Files]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/#migration-example-files) are parsed into Kubernetes manifests, `output.txt` lists each resultant parsed [Kubernetes manifest file](#migration-example-file-output) (i.e., workloads). Each workload features a list of action items to restore operations for the workload in v2.x.

<figcaption>Output.txt Example</figcaption>

![output.txt]({{<baseurl>}}/img/rancher/output-dot-text.png)

The following table lists possible directives that may appear in `output.txt`, what they mean, and links on how to resolve them.

Directive | Instructions
----------|--------------
[ports][4] | Rancher v1.6 _Port Mappings_ cannot be migrated to v2.x. Instead, you must manually declare either a HostPort or NodePort, which are similar to Port Mappings.
[health_check][1] | The Rancher v1.6 health check microservice has been replaced with native Kubernetes health checks, called _probes_. Recreate your v1.6 health checks in v2.0 using probes.
[labels][2]  | Rancher v1.6 uses labels to implement a variety of features in v1.6. In v2.x, Kubernetes uses different mechanisms to implement these features. Click through on the links here for instructions on how to address each label.<br/><br/>[io.rancher.container.pull_image][7]: In v1.6, this label instructed deployed containers to pull a new version of the image upon restart. In v2.x, this functionality is replaced by the  `imagePullPolicy` directive.<br/><br/>[io.rancher.scheduler.global][8]: In v1.6, this label scheduled a container replica on every cluster host. In v2.x, this functionality is replaced by [Daemon Sets](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/).<br/><br/>[io.rancher.scheduler.affinity][9]: In v2.x, affinity is applied in a different way.
[links][3] | During migration, you must create links between your Kubernetes workloads and services for them to function properly in v2.x.
[scale][5] | In v1.6, scale refers to the number of container replicas running on a single node. In v2.x, this feature is replaced by replica sets.
start_on_create | No Kubernetes equivalent. No action is required from you.

[1]:{{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/monitor-apps/#configuring-probes-in-rancher-v2-x
[2]:{{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/schedule-workloads/#scheduling-using-labels
[3]:{{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/discover-services
[4]:{{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/expose-services
[5]:{{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/schedule-workloads/#scheduling-pods-to-a-specific-node

<!-- MB: oops, skipped 6 -->

[7]:{{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/schedule-workloads/#scheduling-using-labels
[8]:{{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/schedule-workloads/#scheduling-global-services
[9]:{{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/schedule-workloads/#label-affinity-antiaffinity

### [Next: Expose Your Services]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/expose-services/)
