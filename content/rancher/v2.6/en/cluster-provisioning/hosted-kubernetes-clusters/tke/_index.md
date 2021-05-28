---
title: Creating a Tencent TKE Cluster
shortTitle: Tencent Kubernetes Engine
weight: 2125
---

You can use Rancher to create a cluster hosted in Tencent Kubernetes Engine (TKE). Rancher has already implemented and packaged the [cluster driver]({{<baseurl>}}/rancher/v2.5/en/admin-settings/drivers/cluster-drivers/) for TKE, but by default, this cluster driver is `inactive`. In order to launch TKE clusters, you will need to [enable the TKE cluster driver]({{<baseurl>}}/rancher/v2.5/en/admin-settings/drivers/cluster-drivers/#activating-deactivating-cluster-drivers). After enabling the cluster driver, you can start provisioning TKE clusters.

## Prerequisites in Tencent

>**Note**
>Deploying to TKE will incur charges.

1. Make sure that the account you will be using to create the TKE cluster has the appropriate permissions by referring to the  [Cloud Access Management](https://intl.cloud.tencent.com/document/product/598/10600) documentation for details.

2. Create a [Cloud API Secret ID and Secret Key](https://console.cloud.tencent.com/capi).

3. Create a [Private Network and Subnet](https://intl.cloud.tencent.com/document/product/215/4927) in the region that you want to deploy your Kubernetes cluster.

4. Create a [SSH key pair](https://intl.cloud.tencent.com/document/product/213/6092). This key is used to access the nodes in the Kubernetes cluster.

## Create a TKE Cluster

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Tencent TKE**.

3. Enter a **Cluster Name**.

4. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.

5. Configure **Account Access** for the TKE cluster. Complete each drop-down and field using the information obtained in [Prerequisites](#prerequisites-in-tencent).

    | Option    | Description                                                                                                          |
    | ---------- | -------------------------------------------------------------------------------------------------------------------- |
    | Region     | From the drop-down chooses the geographical region in which to build your cluster.                                    |
    | Secret ID  | Enter the Secret ID that you obtained from the Tencent Cloud Console. |
    | Secret Key | Enter the Secret key that you obtained from Tencent Cloud Console. |

6. Click `Next: Configure Cluster` to set your TKE cluster configurations.

    | Option | Description                                                                                                          |
    | ---------- | -------------------------------------------------------------------------------------------------------------------- |
    | Kubernetes Version | The TKE only supports Kubernetes version 1.10.5 now.  |
    | Node Count  | Enter the amount of worker node you want to purchase for your Kubernetes cluster, up to 100. |
    | VPC | Select the VPC name that you have created in the Tencent Cloud Console. |
    | Container Network CIDR | Enter the CIDR range of your Kubernetes cluster, you may check the available range of the CIDR in the VPC service of the Tencent Cloud Console. Default to 172.16.0.0/16. |

    **Note:** If you are editing the cluster in the `cluster.yml` instead of the Rancher UI, note that, cluster configuration directives must be nested under the `rancher_kubernetes_engine_config` directive in `cluster.yml`. For more information, refer to the section on [the config file structure in Rancher v2.3.0+.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/options/#config-file-structure-in-rancher-v2-3-0)

7. Click `Next: Select Instance Type` to choose the instance type that will use for your TKE cluster.

    | Option | Description                                                                                                          |
    | ---------- | -------------------------------------------------------------------------------------------------------------------- |
    | Availability Zone | Choose the availability zone of the VPC region.  |
    | Subnet  | Select the Subnet that you have created within the VPC, and add a new one if you don't have it in the chosen availability zone. |
    | Instance Type | From the drop-down chooses the VM instance type that you want to use for the TKE cluster, default to S2.MEDIUM4 (CPU 2 Memory 4 GiB). |

8. Click `Next: Configure Instance` to configure the VM instance that will use for your TKE cluster.

    Option | Description
    -------|------------
    Operating System | The name of the operating system, currently supports Centos7.2x86_64 or ubuntu16.04.1 LTSx86_64
    Security Group | Security group ID, default does not bind any security groups.
    Root Disk Type | System disk type. System disk type restrictions are detailed in the [CVM instance configuration](https://cloud.tencent.com/document/product/213/11518).
    Root Disk Size | System disk size. Linux system adjustment range is 20 - 50G, step size is 1.
    Data Disk Type | Data disk type, default value to the SSD cloud drive
    Data Disk Size | Data disk size (GB), the step size is 10
    Band Width Type | Type of bandwidth, PayByTraffic or PayByHour
    Band Width | Public network bandwidth (Mbps)
    Key Pair | Key id, after associating the key can be used to logging to the VM node

9. Click **Create**.

**Result:** 

Your cluster is created and assigned a state of **Provisioning.** Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active.**

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces
