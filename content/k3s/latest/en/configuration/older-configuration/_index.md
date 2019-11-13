---
title: "Configuration Info Prior to v1.0.0"
weight: 10
---

>**Note:** Running k3s v1.0.0 or newer is recommended.

This page outlines any configuration info that is relevant to versions older than v1.0.0 but was removed or no longer needed in v1.0.0 and newer.

Metrics Server	
--------------

>**Note:** k3s v1.0.0 includes the metrics-server by default.

To add functionality for commands such as `k3s kubectl top nodes` metrics-server must be installed, 
to install see the instructions located at https://github.com/kubernetes-incubator/metrics-server/.	

**NOTE** : By default the image used in `metrics-server-deployment.yaml` is valid only for **amd64** devices,	
this should be edited as appropriate for your architecture. As of this writing metrics-server provides	
the following images relevant to k3s: `amd64:v0.3.3`, `arm64:v0.3.2`, and `arm:v0.3.2`. Further information	
on the images provided through gcr.io can be found at https://console.cloud.google.com/gcr/images/google-containers/GLOBAL.