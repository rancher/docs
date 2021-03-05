---
title: Creating a Huawei CCE Cluster
shortTitle: Huawei Cloud Kubernetes Service
weight: 2130
---

You can use Rancher to create a cluster hosted in Huawei Cloud Container Engine (CCE). Rancher has already implemented and packaged the [cluster driver]({{<baseurl>}}/rancher/v2.5/en/admin-settings/drivers/cluster-drivers/) for CCE, but by default, this cluster driver is `inactive`. In order to launch CCE clusters, you will need to [enable the CCE cluster driver]({{<baseurl>}}/rancher/v2.5/en/admin-settings/drivers/cluster-drivers/#activating-deactivating-cluster-drivers). After enabling the cluster driver, you can start provisioning CCE clusters.

## Prerequisites in Huawei

>**Note**
>Deploying to CCE will incur charges.

1. Find your project ID in Huawei CCE portal. See the CCE documentation on how to [manage your projects](https://support.huaweicloud.com/en-us/usermanual-iam/en-us_topic_0066738518.html).

2. Create an [Access Key ID and Secret Access Key](https://support.huaweicloud.com/en-us/usermanual-iam/en-us_topic_0079477318.html).

## Limitations

Huawei CCE service doesn't support the ability to create clusters with public access through their API. You are required to run Rancher in the same VPC as the CCE clusters that you want to provision.

## Create the CCE Cluster

1. From the **Clusters** page, click **Add Cluster**.
1. Choose **Huawei CCE**.
1. Enter a **Cluster Name**.
1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. Enter **Project Id**, Access Key ID as **Access Key** and Secret Access Key **Secret Key**. Then Click **Next: Configure cluster**. Fill in the cluster configuration. For help filling out the form, refer to [Huawei CCE Configuration.](#huawei-cce-configuration)
1. Fill the following node configuration of the cluster. For help filling out the form, refer to [Node Configuration.](#node-configuration)
1. Click **Create** to create the CCE cluster.

**Result:** 

Your cluster is created and assigned a state of **Provisioning.** Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active.**

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces

# Huawei CCE Configuration

|Settings|Description|
|---|---|
| Cluster Type | Which type or node you want to include into the cluster, `VirtualMachine` or `BareMetal`. |
| Description | The description of the cluster. |
| Master Version | The Kubernetes version. |
| Management Scale Count | The max node count of the cluster. The options are 50, 200 and 1000. The larger of the scale count, the more the cost. |
| High Availability | Enable master node high availability. The cluster with high availability enabled will have more cost. |
| Container Network Mode | The network mode used in the cluster. `overlay_l2` and `vpc-router` is supported in `VirtualMachine` type and `underlay_ipvlan` is supported in `BareMetal` type |
| Container Network CIDR | Network CIDR for the cluster. |
| VPC Name | The VPC name which the cluster is going to deploy into. Rancher will create one if it is blank. |
| Subnet Name | The Subnet name which the cluster is going to deploy into. Rancher will create one if it is blank. |
| External Server | This option is reserved for the future we can enable CCE cluster public access via API. For now, it is always disabled. |
| Cluster Label | The labels for the cluster. |
| Highway Subnet | This option is only supported in `BareMetal` type. It requires you to select a VPC with high network speed for the bare metal machines. |

**Note:** If you are editing the cluster in the `cluster.yml` instead of the Rancher UI, note that cluster configuration directives must be nested under the `rancher_kubernetes_engine_config` directive in `cluster.yml`. For more information, refer to the section on [the config file structure.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/options/#config-file-structure-in-rancher-v2-3-0)

# Node Configuration

|Settings|Description|
|---|---|
| Zone | The available zone at where the node(s) of the cluster is deployed. |
| Billing Mode | The bill mode for the cluster node(s). In `VirtualMachine` type, only `Pay-per-use` is supported. in `BareMetal`, you can choose `Pay-per-use` or `Yearly/Monthly`. |
| Validity Period | This option only shows in `Yearly/Monthly` bill mode. It means how long you want to pay for the cluster node(s). |
| Auto Renew | This option only shows in `Yearly/Monthly` bill mode. It means that the cluster node(s) will renew the `Yearly/Monthly` payment automatically or not. |
| Data Volume Type | Data volume type for the cluster node(s). `SATA`, `SSD` or `SAS` for this option. |
| Data Volume Size | Data volume size for the cluster node(s) |
| Root Volume Type | Root volume type for the cluster node(s). `SATA`, `SSD` or `SAS` for this option. |
| Root Volume Size | Root volume size for the cluster node(s) |
| Node Flavor | The node flavor of the cluster node(s). The flavor list in Rancher UI is fetched from Huawei Cloud. It includes all the supported node flavors. |
| Node Count | The node count of the cluster |
| Node Operating System | The operating system for the cluster node(s). Only `EulerOS 2.2` and `CentOS 7.4` are supported right now. |
| SSH Key Name | The ssh key for the cluster node(s) |
| EIP | The public IP options for the cluster node(s). `Disabled` means that the cluster node(s) are not going to bind a public IP. `Create EIP` means that the cluster node(s) will bind one or many newly created Eips after provisioned and more options will be shown in the UI to set the to-create EIP parameters. And `Select Existed EIP` means that the node(s) will bind to the EIPs you select.  |
| EIP Count | This option will only be shown when `Create EIP` is selected. It means how many EIPs you want to create for the node(s). |
| EIP Type | This option will only be shown when `Create EIP` is selected. The options are `5_bgp` and `5_sbgp`. |
| EIP Share Type | This option will only be shown when `Create EIP` is selected. The only option is `PER`. |
| EIP Charge Mode | This option will only be shown when `Create EIP` is selected. The options are pay by `BandWidth` and pay by `Traffic`. |
| EIP Bandwidth Size | This option will only be shown when `Create EIP` is selected. The BandWidth of the EIPs. |
| Authentication Mode | It means enabling `RBAC` or also enabling `Authenticating Proxy`. If you select `Authenticating Proxy`, the certificate which is used for authenticating proxy will be also required. |
| Node Label | The labels for the cluster node(s). |