---
title: Using an External Ceph Driver
weight: 10
---

These instructions are about using the external Ceph driver in an RKE2 cluster. If you are using RKE, additional steps are required. For details, refer to [this section.](#using-the-ceph-driver-with-rke)

- [Requirements](#requirements)
- [Using the Ceph Driver with RKE](#using-the-ceph-driver-with-rke)
- [Installing the ceph-csi driver on an RKE2 cluster](#installing-the-ceph-csi-driver-on-an-rke2-cluster)
- [Install the ceph-csi driver using Helm](#install-the-ceph-csi-driver-using-helm)
- [Creating RBD Ceph Resources](#creating-rbd-ceph-resources)
- [Configure RBD Ceph Access Secrets](#configure-rbd-ceph-access-secrets)
  - [User Account](#user-account)
  - [Admin Account](#admin-account)
- [Create RBD Testing Resources](#create-rbd-testing-resources)
  - [Using RBD in Pods](#using-rbd-in-pods)
  - [Using RBD in Persistent Volumes](#using-rbd-in-persistent-volumes)
  - [Using RBD in Storage Classes](#using-rbd-in-storage-classes)
  - [RKE2 Server/Master Provisioning](#rke2-server-master-provisioning)
  - [RKE2 Agent/Worker provisioning](#rke2-agent-worker-provisioning)
- [Tested Versions](#tested-versions)
- [Troubleshooting](#troubleshooting)

# Requirements

Make sure ceph-common and xfsprogs packages are installed on SLE worker nodes.

# Using the Ceph Driver with RKE

The resources below are fully compatible with RKE based clusters, but there is a need to do an additional kubelet configuration for RKE.

On RKE clusters, the kubelet component is running in a Docker container and doesn't have access to the host's kernel modules as rbd and libceph by default.

To solve this limitation, you can either run `modprobe rbd` on worker nodes, or configure the kubelet containers to automatically mount the `/lib/modules` directory from the host into the container.

For the kubelet configuration, put the following lines into the `cluster.yml` file prior to RKE cluster provisioning. You can also modify the `cluster.yml` later in the Rancher UI by clicking on **Edit Cluster > Edit as YAML** and restarting the worker nodes.

```yaml
services:
  kubelet:
    extra_binds:
      - '/lib/modules:/lib/modules:ro'
```

For more information about the `extra_binds` directive, refer to [this section.]({{<baseurl>}}/rke/latest/en/config-options/services/services-extras/#extra-binds)

# Installing the ceph-csi driver on an RKE2 cluster

> **Note:** These steps are needed for dynamic RBD provisioning only.

For more information about the `ceph-csi-rbd` chart, refer to [this page.](https://github.com/ceph/ceph-csi/blob/devel/charts/ceph-csi-rbd/README.md)

To get details about your SES cluster, run:

```
ceph mon dump
```

Read its output:

```
dumped monmap epoch 3
epoch 3
fsid 79179d9d-98d8-4976-ab2e-58635caa7235
last_changed 2021-02-11T10:56:42.110184+0000
created 2021-02-11T10:56:22.913321+0000
min_mon_release 15 (octopus)
0: [v2:10.85.8.118:3300/0,v1:10.85.8.118:6789/0] mon.a
1: [v2:10.85.8.123:3300/0,v1:10.85.8.123:6789/0] mon.b
2: [v2:10.85.8.124:3300/0,v1:10.85.8.124:6789/0] mon.c
```

Later you'll need the fsid and mon addresses values.

# Install the ceph-csi Driver Using Helm

Run these commands:

```
helm repo add ceph-csi https://ceph.github.io/csi-charts
helm repo update
helm search repo ceph-csi -l
helm inspect values ceph-csi/ceph-csi-rbd > ceph-csi-rbd-values.yaml
```

Modify the `ceph-csi-rbd-values.yaml` file and keep there only the required changes:

```yaml
# ceph-csi-rbd-values.yaml
csiConfig:
  - clusterID: "79179d9d-98d8-4976-ab2e-58635caa7235"
    monitors:
      - "10.85.8.118:6789"
      - "10.85.8.123:6789"
      - "10.85.8.124:6789"
provisioner:
  name: provisioner
  replicaCount: 2
```

Make sure the ceph monitors are reachable from the RKE2 cluster, for example, by ping.

```
kubectl create namespace ceph-csi-rbd
helm install --namespace ceph-csi-rbd ceph-csi-rbd ceph-csi/ceph-csi-rbd --values ceph-csi-rbd-values.yaml
kubectl rollout status deployment ceph-csi-rbd-provisioner -n ceph-csi-rbd
helm status ceph-csi-rbd -n ceph-csi-rbd
```

in case you'd like to modify the configuration directly via Helm, you may adapt the `ceph-csi-rbd-values.yaml` file and call:

```
helm upgrade \
  --namespace ceph-csi-rbd ceph-csi-rbd ceph-csi/ceph-csi-rbd --values ceph-csi-rbd-values.yaml
```

# Creating RBD Ceph Resources

```
# Create a ceph pool:
ceph osd pool create myPool 64 64

# Create a block device pool:
rbd pool init myPool

# Create a block device image:
rbd create -s 2G myPool/image

# Create a block device user and record the key:
ceph auth get-or-create-key client.myPoolUser mon "allow r" osd "allow class-read object_prefix rbd_children, allow rwx pool=myPool" | tr -d '\n' | base64
QVFDZ0R5VmdyRk9KREJBQTJ5b2s5R1E2NUdSWExRQndhVVBwWXc9PQ==

# Encode the ceph user myPoolUser into a bash64 hash:
echo "myPoolUser" | tr -d '\n' | base64
bXlQb29sVXNlcg==

# Create a block device admin user and record the key:
ceph auth get-or-create-key client.myPoolAdmin mds 'allow *' mgr 'allow *' mon 'allow *' osd 'allow * pool=myPool' | tr -d '\n' | base64
QVFCK0hDVmdXSjQ1T0JBQXBrc0VtcVhlZFpjc0JwaStIcmU5M3c9PQ==

# Encode the ceph user myPoolAdmin into a bash64 hash:
echo "myPoolAdmin" | tr -d '\n' | base64
bXlQb29sQWRtaW4=
```
# Configure RBD Ceph Access Secrets

### User Account

For static RBD provisioning (the image within the ceph pool must exist), run these commands:

```
cat > ceph-user-secret.yaml << EOF
apiVersion: v1
kind: Secret
metadata:
  name: ceph-user
  namespace: default
type: kubernetes.io/rbd
data:
  userID: bXlQb29sVXNlcg==
  userKey: QVFDZ0R5VmdyRk9KREJBQTJ5b2s5R1E2NUdSWExRQndhVVBwWXc9PQ==
EOF

kubectl apply -f ceph-user-secret.yaml
```

### Admin Account

For dynamic RBD provisioning (used for automatic image creation within a given ceph pool), run these commands:

```
cat > ceph-admin-secret.yaml << EOF
apiVersion: v1
kind: Secret
metadata:
  name: ceph-admin
  namespace: default
type: kubernetes.io/rbd
data:
  userID: bXlQb29sQWRtaW4=
  userKey: QVFCK0hDVmdXSjQ1T0JBQXBrc0VtcVhlZFpjc0JwaStIcmU5M3c9PQ==
EOF

kubectl apply -f ceph-admin-secret.yaml
```

# Create RBD Testing Resources

### Using RBD in Pods

```
# pod
cat > ceph-rbd-pod-inline.yaml << EOF
apiVersion: v1
kind: Pod
metadata:
  name: ceph-rbd-pod-inline
spec:
  containers:
  - name: ceph-rbd-pod-inline
    image: busybox
    command: ["sleep", "infinity"]
    volumeMounts:
    - mountPath: /mnt/ceph_rbd
      name: volume
  volumes:
  - name: volume
    rbd:
      monitors:
      - 10.85.8.118:6789
      - 10.85.8.123:6789
      - 10.85.8.124:6789
      pool: myPool
      image: image
      user: myPoolUser
      secretRef:
        name: ceph-user
      fsType: ext4
      readOnly: false
EOF
 
kubectl apply -f ceph-rbd-pod-inline.yaml
kubectl get pod
kubectl exec pod/ceph-rbd-pod-inline -- df -k | grep rbd
```

### Using RBD in Persistent Volumes

```
# pod-pvc-pv
cat > ceph-rbd-pod-pvc-pv-allinone.yaml << EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: ceph-rbd-pv
spec:
  capacity:
    storage: 2Gi
  accessModes:
    - ReadWriteOnce
  rbd:
    monitors:
    - 10.85.8.118:6789
    - 10.85.8.123:6789
    - 10.85.8.124:6789
    pool: myPool 
    image: image
    user: myPoolUser 
    secretRef:
      name: ceph-user
    fsType: ext4
    readOnly: false
---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: ceph-rbd-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 2Gi
---
apiVersion: v1
kind: Pod
metadata:
  name: ceph-rbd-pod-pvc-pv
spec:
  containers:
  - name: ceph-rbd-pod-pvc-pv
    image: busybox
    command: ["sleep", "infinity"]
    volumeMounts:
    - mountPath: /mnt/ceph_rbd
      name: volume
  volumes:
  - name: volume
    persistentVolumeClaim:
      claimName: ceph-rbd-pvc
EOF
 
kubectl apply -f ceph-rbd-pod-pvc-pv-allinone.yaml
kubectl get pv,pvc,pod
kubectl exec pod/ceph-rbd-pod-pvc-pv -- df -k | grep rbd
```

### Using RBD in Storage Classes 

This example is for dynamic provisioning. The ceph-csi driver is needed.

```
# pod-pvc-sc
cat > ceph-rbd-pod-pvc-sc-allinone.yaml <<EOF
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ceph-rbd-sc
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: rbd.csi.ceph.com
parameters:
   clusterID: 79179d9d-98d8-4976-ab2e-58635caa7235
   pool: myPool
   imageFeatures: layering
   csi.storage.k8s.io/provisioner-secret-name: ceph-admin
   csi.storage.k8s.io/provisioner-secret-namespace: default
   csi.storage.k8s.io/controller-expand-secret-name: ceph-admin
   csi.storage.k8s.io/controller-expand-secret-namespace: default
   csi.storage.k8s.io/node-stage-secret-name: ceph-admin
   csi.storage.k8s.io/node-stage-secret-namespace: default
reclaimPolicy: Delete
allowVolumeExpansion: true
mountOptions:
   - discard
---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: ceph-rbd-sc-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 2Gi
  storageClassName: ceph-rbd-sc
---    
apiVersion: v1
kind: Pod
metadata:
  name: ceph-rbd-pod-pvc-sc
spec:
  containers:
  - name:  ceph-rbd-pod-pvc-sc
    image: busybox
    command: ["sleep", "infinity"]
    volumeMounts:
    - mountPath: /mnt/ceph_rbd
      name: volume
  volumes:
  - name: volume
    persistentVolumeClaim:
      claimName: ceph-rbd-sc-pvc
EOF
 
kubectl apply -f ceph-rbd-pod-pvc-sc-allinone.yaml
kubectl get pv,pvc,sc,pod
kubectl exec pod/ceph-rbd-pod-pvc-sc -- df -k | grep rbd
```

### RKE2 Server/Master Provisioning

```
sudo su
curl -sfL https://get.rke2.io | sh -
systemctl enable --now rke2-server

cat > /root/.bashrc << EOF
export PATH=$PATH:/var/lib/rancher/rke2/bin/
export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
EOF

cat /var/lib/rancher/rke2/server/node-token
token: K10ca0c38d4ff90d8b80319ab34092e315a8b732622e6adf97bc9eb0536REDACTED::server:ec0308000b8a6b595da000efREDACTED
```

### RKE2 Agent/Worker provisioning

```
mkdir -p /etc/rancher/rke2/

cat > /etc/rancher/rke2/config.yaml << EOF
server: https://10.100.103.23:9345
token: K10ca0c38d4ff90d8b80319ab34092e315a8b732622e6adf97bc9eb0536REDACTED::server:ec0308000b8a6b595da000efREDACTED
EOF

curl -sfL https://get.rke2.io | INSTALL_RKE2_TYPE="agent" sh -
systemctl enable --now rke2-agent.service
```

The cluster can be imported into Rancher from the Rancher UI by clicking **Global/Add Cluster > Other Cluster.** Then run the provided kubectl command on the server/master node.

# Tested Versions

OS for running RKE2 nodes: JeOS SLE15-SP2 with installed kernel-default-5.3.18-24.49

```
kubectl version
Client Version: version.Info{Major:"1", Minor:"18", GitVersion:"v1.18.4", GitCommit:"c96aede7b5205121079932896c4ad89bb93260af", GitTreeState:"clean", BuildDate:"2020-06-22T12:00:00Z", GoVersion:"go1.13.11", Compiler:"gc", Platform:"linux/amd64"}
Server Version: version.Info{Major:"1", Minor:"19", GitVersion:"v1.19.7+rke2r1", GitCommit:"1dd5338295409edcfff11505e7bb246f0d325d15", GitTreeState:"clean", BuildDate:"2021-01-20T01:50:52Z", GoVersion:"go1.15.5b5", Compiler:"gc", Platform:"linux/amd64"}

helm version
version.BuildInfo{Version:"3.4.1", GitCommit:"c4e74854886b2efe3321e185578e6db9be0a6e29", GitTreeState:"clean", GoVersion:"go1.14.12"}
```

Kubernetes version on RKE2 cluster: v1.19.7+rke2r1

# Troubleshooting

In case you are using SUSE's ceph-rook based on SES7, it might be useful to expose the monitors on hostNetwork by editing `rook-1.4.5/ceph/cluster.yaml` and setting `spec.network.hostNetwork=true`.

Also for operating the ceph-rook cluster, it is useful to deploy a toolbox on the Kubernetes cluster where ceph-rook is provisioned by `kubectl apply -f rook-1.4.5/ceph/toolbox.yaml` Then all the ceph related commands can be executed in the toolbox pod, for example, by running `kubectl exec -it -n rook-ceph rook-ceph-tools-686d8b8bfb-2nvqp -- bash`

Operating with the ceph - basic commands:

```
ceph osd pool stats
ceph osd pool delete myPool myPool --yes-i-really-really-mean-it
rbd list -p myPool
> csi-vol-f5d3766c-7296-11eb-b32a-c2b045952d38
> image
```

Delete the image: `rbd rm csi-vol-f5d3766c-7296-11eb-b32a-c2b045952d38 -p myPool`

CephFS commands in rook toolbox:

```
ceph -s
ceph fs ls
ceph fs fail cephfs
ceph fs rm cephfs --yes-i-really-mean-it
ceph osd pool delete cephfs_data cephfs_data --yes-i-really-really-mean-it
ceph osd pool delete cephfs_metadata cephfs_metadata --yes-i-really-really-mean-it
```

To prepare a cephfs filesystem, you can run this command on a rook cluster:

```
kubectl apply -f rook-1.4.5/ceph/filesystem.yaml
```