---
title: Creating a Custom Benchmark Version for Running a Cluster Scan
weight: 4
---

Each Benchmark Version defines a set of test configuration files that define the CIS tests to be run by the <a href="https://github.com/aquasecurity/kube-bench" target="_blank">kube-bench</a> tool.
The `rancher-cis-benchmark` application installs a few default Benchmark Versions which are listed under CIS Benchmark application menu.
 
But there could be some Kubernetes cluster setups that require custom configurations of the Benchmark tests. For example, the path to the Kubernetes config files or certs might be different than the standard location where the upstream CIS Benchmarks look for them.

It is now possible to create a custom Benchmark Version for running a cluster scan using the `rancher-cis-benchmark` application.

When a cluster scan is run, you need to select a Profile which points to a specific Benchmark Version. 

Follow all the steps below to add a custom Benchmark Version and run a scan using it.

1. [Prepare the Custom Benchmark Version ConfigMap](#1-prepare-the-custom-benchmark-version-configmap)
2. [Add a Custom Benchmark Version to a Cluster](#2-add-a-custom-benchmark-version-to-a-cluster)
3. [Create a New Profile for the Custom Benchmark Version](#3-create-a-new-profile-for-the-custom-benchmark-version)
4. [Run a Scan Using the Custom Benchmark Version](#4-run-a-scan-using-the-custom-benchmark-version)

### 1. Prepare the Custom Benchmark Version ConfigMap

To create a custom benchmark version, first you need to create a ConfigMap containing the benchmark version's config files and upload it to your Kubernetes cluster where you want to run the scan.

To prepare a custom benchmark version ConfigMap, suppose we want to add a custom Benchmark Version named `foo`.

1. Create a directory named `foo` and inside this directory, place all the config YAML files that the <a href="https://github.com/aquasecurity/kube-bench" target="_blank">kube-bench</a> tool looks for. For example, here are the config YAML files for a Generic CIS 1.5 Benchmark Version https://github.com/aquasecurity/kube-bench/tree/master/cfg/cis-1.5
1. Place the complete `config.yaml` file, which includes all the components that should be tested. 
1. Add the Benchmark version name to the `target_mapping` section of the `config.yaml`:

    ```yaml
    target_mapping:
      "foo":
        - "master"
        - "node"
        - "controlplane"
        - "etcd"
        - "policies"
    ```
1. Upload this directory to your Kubernetes Cluster by creating a ConfigMap:

    ```yaml
    kubectl create configmap -n <namespace> foo --from-file=<path to directory foo>
    ```

### 2. Add a Custom Benchmark Version to a Cluster

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to add a custom benchmark and click **Explore**.
1. In the left navigation bar, click **CIS Benchmark > Benchmark Version**.
1. Click **Create**.
1. Enter the **Name** and a description for your custom benchmark version.
1. Choose the cluster provider that your benchmark version applies to.
1. Choose the ConfigMap you have uploaded from the dropdown.
1. Add the minimum and maximum Kubernetes version limits applicable, if any.
1. Click **Create**.

### 3. Create a New Profile for the Custom Benchmark Version

To run a scan using your custom benchmark version, you need to add a new Profile pointing to this benchmark version.

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to add a custom benchmark and click **Explore**.
1. In the left navigation bar, click **CIS Benchmark > Profile**.
1. Click **Create**.
1. Provide a **Name** and description. In this example, we name it `foo-profile`.
1. Choose the Benchmark Version from the dropdown.
1. Click **Create**.

### 4. Run a Scan Using the Custom Benchmark Version

Once the Profile pointing to your custom benchmark version `foo` has been created, you can create a new Scan to run the custom test configs in the Benchmark Version.

To run a scan,

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to add a custom benchmark and click **Explore**.
1. In the left navigation bar, click **CIS Benchmark > Scan**.
1. Click **Create**.
1. Choose the new cluster scan profile.
1. Click **Create**.

**Result:** A report is generated with the scan results. To see the results, click the name of the scan that appears.
