---
title: 3. Add Deployments and Services with the Istio Sidecar
weight: 4
aliases:
  - /rancher/v2.5/en/cluster-admin/tools/istio/setup/deploy-workloads
  - /rancher/v2.5/en/istio/v2.5/setup/deploy-workloads
---

> **Prerequisite:** To enable Istio for a workload, the cluster and namespace must have the Istio app installed.  

Enabling Istio in a namespace only enables automatic sidecar injection for new workloads. To enable the Envoy sidecar for existing workloads, you need to enable it manually for each workload.

To inject the Istio sidecar on an existing workload in the namespace, from the **Cluster Explorer** go to the workload, click the **&#8942;,** and click **Redeploy.** When the workload is redeployed, it will have the Envoy sidecar automatically injected.

Wait a few minutes for the workload to upgrade to have the istio sidecar. Click it and go to the Containers section. You should be able to see `istio-proxy` alongside your original workload. This means the Istio sidecar is enabled for the workload. Istio is doing all the wiring for the sidecar envoy. Now Istio can do all the features automatically if you enable them in the yaml.

### Add Deployments and Services

There are a few ways to add new **Deployments** in your namespace

1. From the **Cluster Explorer** click on **Workload > Overview.**
1. Click **Create.**
1. Select **Deployment** from the various workload options.
1. Fill out the form, or **Edit as Yaml.**
1. Click **Create.** 

Alternatively, you can select the specific workload you want to deploy from the **Workload** section of the left navigation bar and create it from there.

To add a **Service** to your namespace

1. From the **Cluster Explorer** click on **Service Discovery > Services**
1. Click **Create**
1. Select the type of service you want to create from the various options
1. Fill out the form, or **Edit as Yaml**
1. Click **Create** 

You can also create deployments and services using the kubectl **shell**

1. Run `kubectl create -f <name of service/deployment file>.yaml` if your file is stored locally in the cluster
1. Or run `cat<< EOF | kubectl apply -f -`, paste the file contents into the terminal, then run `EOF` to complete the command. 

### Example Deployments and Services

Next we add the Kubernetes resources for the sample deployments and services for the BookInfo app in Istio's documentation.

1. From the **Cluster Explorer**, open the kubectl **shell**
1. Run `cat<< EOF | kubectl apply -f -`
1. Copy the below resources into the the shell
1. Run `EOF`

This will set up the following sample resources from Istio's example BookInfo app:

Details service and deployment:

- A `details` Service
- A ServiceAccount for `bookinfo-details`
- A `details-v1` Deployment

Ratings service and deployment:

- A `ratings` Service
- A ServiceAccount for `bookinfo-ratings`
- A `ratings-v1` Deployment

Reviews service and deployments (three versions):

- A `reviews` Service
- A ServiceAccount for `bookinfo-reviews`
- A `reviews-v1` Deployment
- A `reviews-v2` Deployment
- A `reviews-v3` Deployment

Productpage service and deployment:

This is the main page of the app, which will be visible from a web browser. The other services will be called from this page.

- A `productpage` service
- A ServiceAccount for `bookinfo-productpage`
- A `productpage-v1` Deployment

### Resource YAML

```yaml
# Copyright 2017 Istio Authors
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

##################################################################################################
# Details service
##################################################################################################
apiVersion: v1
kind: Service
metadata:
  name: details
  labels:
    app: details
    service: details
spec:
  ports:
  - port: 9080
    name: http
  selector:
    app: details
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: bookinfo-details
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: details-v1
  labels:
    app: details
    version: v1
spec:
  replicas: 1
  selector:
    matchLabels:
      app: details
      version: v1
  template:
    metadata:
      labels:
        app: details
        version: v1
    spec:
      serviceAccountName: bookinfo-details
      containers:
      - name: details
        image: docker.io/istio/examples-bookinfo-details-v1:1.15.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 9080
---
##################################################################################################
# Ratings service
##################################################################################################
apiVersion: v1
kind: Service
metadata:
  name: ratings
  labels:
    app: ratings
    service: ratings
spec:
  ports:
  - port: 9080
    name: http
  selector:
    app: ratings
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: bookinfo-ratings
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ratings-v1
  labels:
    app: ratings
    version: v1
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ratings
      version: v1
  template:
    metadata:
      labels:
        app: ratings
        version: v1
    spec:
      serviceAccountName: bookinfo-ratings
      containers:
      - name: ratings
        image: docker.io/istio/examples-bookinfo-ratings-v1:1.15.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 9080
---
##################################################################################################
# Reviews service
##################################################################################################
apiVersion: v1
kind: Service
metadata:
  name: reviews
  labels:
    app: reviews
    service: reviews
spec:
  ports:
  - port: 9080
    name: http
  selector:
    app: reviews
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: bookinfo-reviews
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: reviews-v1
  labels:
    app: reviews
    version: v1
spec:
  replicas: 1
  selector:
    matchLabels:
      app: reviews
      version: v1
  template:
    metadata:
      labels:
        app: reviews
        version: v1
    spec:
      serviceAccountName: bookinfo-reviews
      containers:
      - name: reviews
        image: docker.io/istio/examples-bookinfo-reviews-v1:1.15.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 9080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: reviews-v2
  labels:
    app: reviews
    version: v2
spec:
  replicas: 1
  selector:
    matchLabels:
      app: reviews
      version: v2
  template:
    metadata:
      labels:
        app: reviews
        version: v2
    spec:
      serviceAccountName: bookinfo-reviews
      containers:
      - name: reviews
        image: docker.io/istio/examples-bookinfo-reviews-v2:1.15.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 9080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: reviews-v3
  labels:
    app: reviews
    version: v3
spec:
  replicas: 1
  selector:
    matchLabels:
      app: reviews
      version: v3
  template:
    metadata:
      labels:
        app: reviews
        version: v3
    spec:
      serviceAccountName: bookinfo-reviews
      containers:
      - name: reviews
        image: docker.io/istio/examples-bookinfo-reviews-v3:1.15.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 9080
---
##################################################################################################
# Productpage services
##################################################################################################
apiVersion: v1
kind: Service
metadata:
  name: productpage
  labels:
    app: productpage
    service: productpage
spec:
  ports:
  - port: 9080
    name: http
  selector:
    app: productpage
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: bookinfo-productpage
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: productpage-v1
  labels:
    app: productpage
    version: v1
spec:
  replicas: 1
  selector:
    matchLabels:
      app: productpage
      version: v1
  template:
    metadata:
      labels:
        app: productpage
        version: v1
    spec:
      serviceAccountName: bookinfo-productpage
      containers:
      - name: productpage
        image: docker.io/istio/examples-bookinfo-productpage-v1:1.15.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 9080
---
```

### [Next: Set up the Istio Gateway]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/setup/gateway)
