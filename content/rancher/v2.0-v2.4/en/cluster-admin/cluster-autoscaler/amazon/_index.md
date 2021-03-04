---
title: Cluster Autoscaler with AWS EC2 Auto Scaling Groups
weight: 1
---

This guide will show you how to install and use [Kubernetes cluster-autoscaler](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/) on Rancher custom clusters using AWS EC2 Auto Scaling Groups.

We are going to install a Rancher RKE custom cluster with a fixed number of nodes with the etcd and controlplane roles, and a variable nodes with the worker role, managed by `cluster-autoscaler`. 

- [Prerequisites](#prerequisites)
- [1. Create a Custom Cluster](#1-create-a-custom-cluster)
- [2. Configure the Cloud Provider](#2-configure-the-cloud-provider)
- [3. Deploy Nodes](#3-deploy-nodes)
- [4. Install cluster-autoscaler](#4-install-cluster-autoscaler)
  - [Parameters](#parameters)
  - [Deployment](#deployment)
- [Testing](#testing)
  - [Generating Load](#generating-load)
  - [Checking Scale](#checking-scale)

# Prerequisites

These elements are required to follow this guide:

* The Rancher server is up and running
* You have an AWS EC2 user with proper permissions to create virtual machines, auto scaling groups, and IAM profiles and roles

### 1. Create a Custom Cluster

On Rancher server, we should create a custom k8s cluster v1.18.x. Be sure that cloud_provider name is set to `amazonec2`. Once cluster is created we need to get:

* clusterID: `c-xxxxx` will be used on EC2 `kubernetes.io/cluster/<clusterID>` instance tag
* clusterName: will be used on EC2 `k8s.io/cluster-autoscaler/<clusterName>` instance tag
* nodeCommand: will be added on EC2 instance user_data to include new nodes on cluster

    ```sh
    sudo docker run -d --restart=unless-stopped --net=host -v /etc/kubernetes:/etc/kubernetes -v /var/run:/var/run rancher/rancher-agent:<RANCHER_VERSION> --server https://<RANCHER_URL> --token <RANCHER_TOKEN> --ca-checksum <RANCHER_CHECKSUM> <roles>
    ```

### 2. Configure the Cloud Provider

On AWS EC2, we should create a few objects to configure our system. We've defined three distinct groups and IAM profiles to configure on AWS.

1. Autoscaling group: Nodes that will be part of the EC2 Auto Scaling Group (ASG). The ASG will be used by `cluster-autoscaler` to scale up and down.
  * IAM profile: Required by k8s nodes where cluster-autoscaler will be running. It is recommended for Kubernetes master nodes. This profile is called `K8sAutoscalerProfile`.

      ```json
      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Effect": "Allow",
                  "Action": [
                      "autoscaling:DescribeAutoScalingGroups",
                      "autoscaling:DescribeAutoScalingInstances",
                      "autoscaling:DescribeLaunchConfigurations",
                      "autoscaling:SetDesiredCapacity",
                      "autoscaling:TerminateInstanceInAutoScalingGroup",
                      "autoscaling:DescribeTags",
                      "autoscaling:DescribeLaunchConfigurations",
                      "ec2:DescribeLaunchTemplateVersions"
                  ],
                  "Resource": [
                      "*"
                  ]
              }
          ]
      }
      ```

2. Master group: Nodes that will be part of the Kubernetes etcd and/or control planes. This will be out of the ASG. 
  * IAM profile: Required by the Kubernetes cloud_provider integration. Optionally, `AWS_ACCESS_KEY` and `AWS_SECRET_KEY` can be used instead [using-aws-credentials.](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md#using-aws-credentials) This profile is called `K8sMasterProfile`.

      ```json
      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Effect": "Allow",
                  "Action": [
                      "autoscaling:DescribeAutoScalingGroups",
                      "autoscaling:DescribeLaunchConfigurations",
                      "autoscaling:DescribeTags",
                      "ec2:DescribeInstances",
                      "ec2:DescribeRegions",
                      "ec2:DescribeRouteTables",
                      "ec2:DescribeSecurityGroups",
                      "ec2:DescribeSubnets",
                      "ec2:DescribeVolumes",
                      "ec2:CreateSecurityGroup",
                      "ec2:CreateTags",
                      "ec2:CreateVolume",
                      "ec2:ModifyInstanceAttribute",
                      "ec2:ModifyVolume",
                      "ec2:AttachVolume",
                      "ec2:AuthorizeSecurityGroupIngress",
                      "ec2:CreateRoute",
                      "ec2:DeleteRoute",
                      "ec2:DeleteSecurityGroup",
                      "ec2:DeleteVolume",
                      "ec2:DetachVolume",
                      "ec2:RevokeSecurityGroupIngress",
                      "ec2:DescribeVpcs",
                      "elasticloadbalancing:AddTags",
                      "elasticloadbalancing:AttachLoadBalancerToSubnets",
                      "elasticloadbalancing:ApplySecurityGroupsToLoadBalancer",
                      "elasticloadbalancing:CreateLoadBalancer",
                      "elasticloadbalancing:CreateLoadBalancerPolicy",
                      "elasticloadbalancing:CreateLoadBalancerListeners",
                      "elasticloadbalancing:ConfigureHealthCheck",
                      "elasticloadbalancing:DeleteLoadBalancer",
                      "elasticloadbalancing:DeleteLoadBalancerListeners",
                      "elasticloadbalancing:DescribeLoadBalancers",
                      "elasticloadbalancing:DescribeLoadBalancerAttributes",
                      "elasticloadbalancing:DetachLoadBalancerFromSubnets",
                      "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
                      "elasticloadbalancing:ModifyLoadBalancerAttributes",
                      "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
                      "elasticloadbalancing:SetLoadBalancerPoliciesForBackendServer",
                      "elasticloadbalancing:AddTags",
                      "elasticloadbalancing:CreateListener",
                      "elasticloadbalancing:CreateTargetGroup",
                      "elasticloadbalancing:DeleteListener",
                      "elasticloadbalancing:DeleteTargetGroup",
                      "elasticloadbalancing:DescribeListeners",
                      "elasticloadbalancing:DescribeLoadBalancerPolicies",
                      "elasticloadbalancing:DescribeTargetGroups",
                      "elasticloadbalancing:DescribeTargetHealth",
                      "elasticloadbalancing:ModifyListener",
                      "elasticloadbalancing:ModifyTargetGroup",
                      "elasticloadbalancing:RegisterTargets",
                      "elasticloadbalancing:SetLoadBalancerPoliciesOfListener",
                      "iam:CreateServiceLinkedRole",
                      "ecr:GetAuthorizationToken",
                      "ecr:BatchCheckLayerAvailability",
                      "ecr:GetDownloadUrlForLayer",
                      "ecr:GetRepositoryPolicy",
                      "ecr:DescribeRepositories",
                      "ecr:ListImages",
                      "ecr:BatchGetImage",
                      "kms:DescribeKey"
                  ],
                  "Resource": [
                      "*"
                  ]
              }
          ]
      }
      ```

    * IAM role: `K8sMasterRole: [K8sMasterProfile,K8sAutoscalerProfile]`
    * Security group: `K8sMasterSg` More info at[RKE ports (custom nodes tab)]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/requirements/ports/#downstream-kubernetes-cluster-nodes)
    * Tags:
      `kubernetes.io/cluster/<clusterID>: owned`
    * User data: `K8sMasterUserData` Ubuntu 18.04(ami-0e11cbb34015ff725), installs docker and add etcd+controlplane node to the k8s cluster

      ```sh
      #!/bin/bash -x

      cat <<EOF > /etc/sysctl.d/90-kubelet.conf
      vm.overcommit_memory = 1
      vm.panic_on_oom = 0
      kernel.panic = 10
      kernel.panic_on_oops = 1
      kernel.keys.root_maxkeys = 1000000
      kernel.keys.root_maxbytes = 25000000
      EOF
      sysctl -p /etc/sysctl.d/90-kubelet.conf

      curl -sL https://releases.rancher.com/install-docker/19.03.sh | sh
      sudo usermod -aG docker ubuntu

      TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
      PRIVATE_IP=$(curl -H "X-aws-ec2-metadata-token: ${TOKEN}" -s http://169.254.169.254/latest/meta-data/local-ipv4)
      PUBLIC_IP=$(curl -H "X-aws-ec2-metadata-token: ${TOKEN}" -s http://169.254.169.254/latest/meta-data/public-ipv4)
      K8S_ROLES="--etcd --controlplane"

      sudo docker run -d --restart=unless-stopped --net=host -v /etc/kubernetes:/etc/kubernetes -v /var/run:/var/run rancher/rancher-agent:<RANCHER_VERSION> --server https://<RANCHER_URL> --token <RANCHER_TOKEN> --ca-checksum <RANCHER_CA_CHECKSUM> --address ${PUBLIC_IP} --internal-address ${PRIVATE_IP} ${K8S_ROLES}
      ```

3. Worker group: Nodes that will be part of the k8s worker plane. Worker nodes will be scaled by cluster-autoscaler using the ASG.
  * IAM profile: Provides cloud_provider worker integration.
  This profile is called `K8sWorkerProfile`.

      ```json
      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Effect": "Allow",
                  "Action": [
                      "ec2:DescribeInstances",
                      "ec2:DescribeRegions",
                      "ecr:GetAuthorizationToken",
                      "ecr:BatchCheckLayerAvailability",
                      "ecr:GetDownloadUrlForLayer",
                      "ecr:GetRepositoryPolicy",
                      "ecr:DescribeRepositories",
                      "ecr:ListImages",
                      "ecr:BatchGetImage"
                  ],
                  "Resource": "*"
              }
          ]
      }
      ```

  * IAM role: `K8sWorkerRole: [K8sWorkerProfile]`
  * Security group: `K8sWorkerSg` More info at [RKE ports (custom nodes tab)]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/requirements/ports/#downstream-kubernetes-cluster-nodes)
  * Tags:
    * `kubernetes.io/cluster/<clusterID>: owned`
    * `k8s.io/cluster-autoscaler/<clusterName>: true`
    * `k8s.io/cluster-autoscaler/enabled: true`
  * User data: `K8sWorkerUserData` Ubuntu 18.04(ami-0e11cbb34015ff725), installs docker and add worker node to the k8s cluster 

      ```sh
      #!/bin/bash -x

      cat <<EOF > /etc/sysctl.d/90-kubelet.conf
      vm.overcommit_memory = 1
      vm.panic_on_oom = 0
      kernel.panic = 10
      kernel.panic_on_oops = 1
      kernel.keys.root_maxkeys = 1000000
      kernel.keys.root_maxbytes = 25000000
      EOF
      sysctl -p /etc/sysctl.d/90-kubelet.conf

      curl -sL https://releases.rancher.com/install-docker/19.03.sh | sh
      sudo usermod -aG docker ubuntu

      TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
      PRIVATE_IP=$(curl -H "X-aws-ec2-metadata-token: ${TOKEN}" -s http://169.254.169.254/latest/meta-data/local-ipv4)
      PUBLIC_IP=$(curl -H "X-aws-ec2-metadata-token: ${TOKEN}" -s http://169.254.169.254/latest/meta-data/public-ipv4)
      K8S_ROLES="--worker"

      sudo docker run -d --restart=unless-stopped --net=host -v /etc/kubernetes:/etc/kubernetes -v /var/run:/var/run rancher/rancher-agent:<RANCHER_VERSION> --server https://<RANCHER_URL> --token <RANCHER_TOKEN> --ca-checksum <RANCHER_CA_CHECKCSUM> --address ${PUBLIC_IP} --internal-address ${PRIVATE_IP} ${K8S_ROLES}
      ```

More info is at [RKE clusters on AWS]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/amazon/) and [Cluster Autoscaler on AWS.](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md)

### 3. Deploy Nodes

Once we've configured AWS, let's create VMs to bootstrap our cluster:

* master (etcd+controlplane): Depending your needs, deploy three master instances with proper size. More info is at [the recommendations for production-ready clusters.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/production/)
  * IAM role: `K8sMasterRole`
  * Security group: `K8sMasterSg`
  * Tags: 
    * `kubernetes.io/cluster/<clusterID>: owned`
  * User data: `K8sMasterUserData`

* worker: Define an ASG on EC2 with the following settings:
  * Name: `K8sWorkerAsg`
  * IAM role: `K8sWorkerRole`
  * Security group: `K8sWorkerSg`
  * Tags: 
    * `kubernetes.io/cluster/<clusterID>: owned`
    * `k8s.io/cluster-autoscaler/<clusterName>: true`
    * `k8s.io/cluster-autoscaler/enabled: true`
  * User data: `K8sWorkerUserData`
  * Instances:
    * minimum: 2
    * desired: 2
    * maximum: 10

Once the VMs are deployed, you should have a Rancher custom cluster up and running with three master and two worker nodes.

### 4. Install Cluster-autoscaler

At this point, we should have rancher cluster up and running. We are going to install cluster-autoscaler on master nodes and `kube-system` namespace, following cluster-autoscaler recommendation. 

#### Parameters

This table shows cluster-autoscaler parameters for fine tuning:

| Parameter | Default | Description |
|---|---|---|
|cluster-name|-|Autoscaled cluster name, if available|
|address|:8085|The address to expose Prometheus metrics|
|kubernetes|-|Kubernetes master location. Leave blank for default|
|kubeconfig|-|Path to kubeconfig file with authorization and master location information|
|cloud-config|-|The path to the cloud provider configuration file.  Empty string for no configuration file|
|namespace|"kube-system"|Namespace in which cluster-autoscaler run|
|scale-down-enabled|true|Should CA scale down the cluster|
|scale-down-delay-after-add|"10m"|How long after scale up that scale down evaluation resumes|
|scale-down-delay-after-delete|0|How long after node deletion that scale down evaluation resumes, defaults to scanInterval|
|scale-down-delay-after-failure|"3m"|How long after scale down failure that scale down evaluation resumes|
|scale-down-unneeded-time|"10m"|How long a node should be unneeded before it is eligible for scale down|
|scale-down-unready-time|"20m"|How long an unready node should be unneeded before it is eligible for scale down|
|scale-down-utilization-threshold|0.5|Sum of cpu or memory of all pods running on the node divided by node's corresponding allocatable resource, below which a node can be considered for scale down|
|scale-down-gpu-utilization-threshold|0.5|Sum of gpu requests of all pods running on the node divided by node's allocatable resource, below which a node can be considered for scale down|
|scale-down-non-empty-candidates-count|30|Maximum number of non empty nodes considered in one iteration as candidates for scale down with drain|
|scale-down-candidates-pool-ratio|0.1|A ratio of nodes that are considered as additional non empty candidates for scale down when some candidates from previous iteration are no longer valid|
|scale-down-candidates-pool-min-count|50|Minimum number of nodes that are considered as additional non empty candidates for scale down when some candidates from previous iteration are no longer valid|
|node-deletion-delay-timeout|"2m"|Maximum time CA waits for removing delay-deletion.cluster-autoscaler.kubernetes.io/ annotations before deleting the node|
|scan-interval|"10s"|How often cluster is reevaluated for scale up or down|
|max-nodes-total|0|Maximum number of nodes in all node groups. Cluster autoscaler will not grow the cluster beyond this number|
|cores-total|"0:320000"|Minimum and maximum number of cores in cluster, in the format <min>:<max>. Cluster autoscaler will not scale the cluster beyond these numbers|
|memory-total|"0:6400000"|Minimum and maximum number of gigabytes of memory in cluster, in the format <min>:<max>. Cluster autoscaler will not scale the cluster beyond these numbers|
cloud-provider|-|Cloud provider type| 
|max-bulk-soft-taint-count|10|Maximum number of nodes that can be tainted/untainted PreferNoSchedule at the same time. Set to 0 to turn off such tainting|
|max-bulk-soft-taint-time|"3s"|Maximum duration of tainting/untainting nodes as PreferNoSchedule at the same time|
|max-empty-bulk-delete|10|Maximum number of empty nodes that can be deleted at the same time|
|max-graceful-termination-sec|600|Maximum number of seconds CA waits for pod termination when trying to scale down a node|
|max-total-unready-percentage|45|Maximum percentage of unready nodes in the cluster.  After this is exceeded, CA halts operations|
|ok-total-unready-count|3|Number of allowed unready nodes, irrespective of max-total-unready-percentage|
|scale-up-from-zero|true|Should CA scale up when there 0 ready nodes|
|max-node-provision-time|"15m"|Maximum time CA waits for node to be provisioned|
|nodes|-|sets min,max size and other configuration data for a node group in a format accepted by cloud provider. Can be used multiple times. Format: <min>:<max>:<other...>|
|node-group-auto-discovery|-|One or more definition(s) of node group auto-discovery. A definition is expressed `<name of discoverer>:[<key>[=<value>]]`|
|estimator|-|"binpacking"|Type of resource estimator to be used in scale up. Available values: ["binpacking"]|
|expander|"random"|Type of node group expander to be used in scale up. Available values: `["random","most-pods","least-waste","price","priority"]`|
|ignore-daemonsets-utilization|false|Should CA ignore DaemonSet pods when calculating resource utilization for scaling down|
|ignore-mirror-pods-utilization|false|Should CA ignore Mirror pods when calculating resource utilization for scaling down|
|write-status-configmap|true|Should CA write status information to a configmap|
|max-inactivity|"10m"|Maximum time from last recorded autoscaler activity before automatic restart|
|max-failing-time|"15m"|Maximum time from last recorded successful autoscaler run before automatic restart|
|balance-similar-node-groups|false|Detect similar node groups and balance the number of nodes between them|
|node-autoprovisioning-enabled|false|Should CA autoprovision node groups when needed|
|max-autoprovisioned-node-group-count|15|The maximum number of autoprovisioned groups in the cluster|
|unremovable-node-recheck-timeout|"5m"|The timeout before we check again a node that couldn't be removed before|
|expendable-pods-priority-cutoff|-10|Pods with priority below cutoff will be expendable. They can be killed without any consideration during scale down and they don't cause scale up. Pods with null priority (PodPriority disabled) are non expendable|
|regional|false|Cluster is regional|
|new-pod-scale-up-delay|"0s"|Pods less than this old will not be considered for scale-up|
|ignore-taint|-|Specifies a taint to ignore in node templates when considering to scale a node group|
|balancing-ignore-label|-|Specifies a label to ignore in addition to the basic and cloud-provider set of labels when comparing if two node groups are similar|
|aws-use-static-instance-list|false|Should CA fetch instance types in runtime or use a static list. AWS only|
|profiling|false|Is debug/pprof endpoint enabled|

#### Deployment

Based on [cluster-autoscaler-run-on-master.yaml](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-run-on-master.yaml) example, we've created our own `cluster-autoscaler-deployment.yaml` to use preferred [auto-discovery setup](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/aws#auto-discovery-setup), updating tolerations, nodeSelector, image version and command config:


```yml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
  name: cluster-autoscaler
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-autoscaler
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
rules:
  - apiGroups: [""]
    resources: ["events", "endpoints"]
    verbs: ["create", "patch"]
  - apiGroups: [""]
    resources: ["pods/eviction"]
    verbs: ["create"]
  - apiGroups: [""]
    resources: ["pods/status"]
    verbs: ["update"]
  - apiGroups: [""]
    resources: ["endpoints"]
    resourceNames: ["cluster-autoscaler"]
    verbs: ["get", "update"]
  - apiGroups: [""]
    resources: ["nodes"]
    verbs: ["watch", "list", "get", "update"]
  - apiGroups: [""]
    resources:
      - "pods"
      - "services"
      - "replicationcontrollers"
      - "persistentvolumeclaims"
      - "persistentvolumes"
    verbs: ["watch", "list", "get"]
  - apiGroups: ["extensions"]
    resources: ["replicasets", "daemonsets"]
    verbs: ["watch", "list", "get"]
  - apiGroups: ["policy"]
    resources: ["poddisruptionbudgets"]
    verbs: ["watch", "list"]
  - apiGroups: ["apps"]
    resources: ["statefulsets", "replicasets", "daemonsets"]
    verbs: ["watch", "list", "get"]
  - apiGroups: ["storage.k8s.io"]
    resources: ["storageclasses", "csinodes"]
    verbs: ["watch", "list", "get"]
  - apiGroups: ["batch", "extensions"]
    resources: ["jobs"]
    verbs: ["get", "list", "watch", "patch"]
  - apiGroups: ["coordination.k8s.io"]
    resources: ["leases"]
    verbs: ["create"]
  - apiGroups: ["coordination.k8s.io"]
    resourceNames: ["cluster-autoscaler"]
    resources: ["leases"]
    verbs: ["get", "update"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: cluster-autoscaler
  namespace: kube-system
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["create","list","watch"]
  - apiGroups: [""]
    resources: ["configmaps"]
    resourceNames: ["cluster-autoscaler-status", "cluster-autoscaler-priority-expander"]
    verbs: ["delete", "get", "update", "watch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-autoscaler
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-autoscaler
subjects:
  - kind: ServiceAccount
    name: cluster-autoscaler
    namespace: kube-system

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: cluster-autoscaler
  namespace: kube-system
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: cluster-autoscaler
subjects:
  - kind: ServiceAccount
    name: cluster-autoscaler
    namespace: kube-system

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
  labels:
    app: cluster-autoscaler
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cluster-autoscaler
  template:
    metadata:
      labels:
        app: cluster-autoscaler
      annotations:
        prometheus.io/scrape: 'true'
        prometheus.io/port: '8085'
    spec:
      serviceAccountName: cluster-autoscaler
      tolerations:
        - effect: NoSchedule
          operator: "Equal"
          value: "true"
          key: node-role.kubernetes.io/controlplane
      nodeSelector:
        node-role.kubernetes.io/controlplane: "true"
      containers:
        - image: eu.gcr.io/k8s-artifacts-prod/autoscaling/cluster-autoscaler:v1.18.1
          name: cluster-autoscaler
          resources:
            limits:
              cpu: 100m
              memory: 300Mi
            requests:
              cpu: 100m
              memory: 300Mi
          command:
            - ./cluster-autoscaler
            - --v=4
            - --stderrthreshold=info
            - --cloud-provider=aws
            - --skip-nodes-with-local-storage=false
            - --expander=least-waste
            - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/<clusterName>
          volumeMounts:
            - name: ssl-certs
              mountPath: /etc/ssl/certs/ca-certificates.crt
              readOnly: true
          imagePullPolicy: "Always"
      volumes:
        - name: ssl-certs
          hostPath:
            path: "/etc/ssl/certs/ca-certificates.crt"

```

Once the manifest file is prepared, deploy it in the Kubernetes cluster (Rancher UI can be used instead):

```sh
kubectl -n kube-system apply -f cluster-autoscaler-deployment.yaml
```

**Note:** Cluster-autoscaler deployment can also be set up using [manual configuration](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/aws#manual-configuration)

# Testing

At this point, we should have a cluster-scaler up and running in our Rancher custom cluster. Cluster-scale should manage `K8sWorkerAsg` ASG to scale up and down between 2 and 10 nodes, when one of the following conditions is true: 

* There are pods that failed to run in the cluster due to insufficient resources. In this case, the cluster is scaled up.
* There are nodes in the cluster that have been underutilized for an extended period of time and their pods can be placed on other existing nodes. In this case, the cluster is scaled down.

### Generating Load

We've prepared a `test-deployment.yaml` just to generate load on the Kubernetes cluster and see if cluster-autoscaler is working properly. The test deployment is requesting 1000m CPU and 1024Mi memory by three replicas. Adjust the requested resources and/or replica to be sure you exhaust the Kubernetes cluster resources:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: hello-world
  name: hello-world
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hello-world
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      containers:
      - image: rancher/hello-world
        imagePullPolicy: Always
        name: hello-world
        ports:
        - containerPort: 80
          protocol: TCP
        resources:
          limits:
            cpu: 1000m
            memory: 1024Mi
          requests:
            cpu: 1000m
            memory: 1024Mi
```

Once the test deployment is prepared, deploy it in the Kubernetes cluster default namespace (Rancher UI can be used instead):

```
kubectl -n default apply -f test-deployment.yaml
```

### Checking Scale

Once the Kubernetes resources got exhausted, cluster-autoscaler should scale up worker nodes where pods failed to be scheduled. It should scale up until up until all pods became scheduled. You should see the new nodes on the ASG and on the Kubernetes cluster. Check the logs on the `kube-system` cluster-autoscaler pod.

Once scale up is checked, let check for scale down. To do it, reduce the replica number on the test deployment until you release enough Kubernetes cluster resources to scale down. You should see nodes disappear on the ASG and on the Kubernetes cluster. Check the logs on the `kube-system` cluster-autoscaler pod.
