---
title: Workloads
weight: 3675
draft: true
---
Coming Soon

## Deploying Workloads

To deploy a workload, navigate to the cluster where you want your workload to be deployed. Select the project, and you'll be automatically brought to the workload page. Click "Deploy".

On the opened dialog, pick:

1. Workload name
2. Workload type - Scalable Deployment, StatefulSet, etc - that would suit your application needs. You can read more on the workload types [here] ({{< baseurl >}}/rancher/v2.x/en/concepts/workloads/).
3. A namespace where the application is going to be deployed.
4. The image used for the workload deployment
5. The port mapping to enable access to the application inside and outside of the cluster leveraging Kuberntes services. More details on services types can be found [here] ({{< baseurl >}}/rancher/v2.x/en/concepts/workloads/).

More parameters like node environment variables, scheduling, healthcheck, volumes can be defined along. More advanced options are made available by clicking "Show advanced options". 

## Upgrading Workloads

To upgrade the workload, some planning has to be done on a creating stage by picking an Upgrade policy. The options are displayed as radio buttons choice under "Scaling/Upgrade Policy" depending on the workload type. For example, for scalable deployment, you can chose whether you want to stop old pods before deploying new ones, and vice versa, as well as the upgrade batch size.

Then after the workload is created, and you decide to update the application by clicking "Edit" and modifying workload setting like image/ports, Kuberntes will perform the upgrade recreating underlying pods using the strategy defined during the creation. Note that scaling up the deployment, or updating the upgrade/scaling policy won't result in the pods recreation.

## Rolling Back Workloads

Sometimes there is a need to rollback to the previous version of the application - either for debugging purposes, or when something goes wrong with the upgraded version. You can do it by picking "Rollback" action for the desired workload. On the opened dialog, there will be a drop down menu with the previous revisions to pick from (up to 10 revision are kept in the history). Once the revision to rollback to is picked, Rancher UI would present you with the differences between the current revision and the revision you are about to rollback to. You can review the difference, and make the final call by hitting "Rollback".

## Adding a Sidecar

Coming Soon

## Adding Ingress

Coming Soon

## Adding a DNS Record

Coming Soon

## Adding a Persistent Volume Claim

Coming Soon
