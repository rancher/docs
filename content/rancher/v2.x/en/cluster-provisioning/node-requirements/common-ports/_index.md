---
title: Commonly Used Ports
weight: 5
---

These ports are typically opened on your Kubernetes nodes, regardless of what type of cluster it is.

If security isn't a large concern and you're okay with opening a few additional ports, you can use the below table as a reference when opening ports in your cluster.

| Protocol 	|       Port       	| Description                                     	|
|:--------:	|:----------------:	|-------------------------------------------------	|
|    TCP   	|        22        	| Node driver SSH provisioning                    	|
|    TCP   	|       2376       	| Node driver Docker daemon TLS port              	|
|    TCP   	|       2379       	| etcd client requests                           	|
|    TCP   	|       2380       	| etcd peer communication                         	|
|    UDP   	|       8472       	| Canal/Flannel VXLAN overlay networking          	|
|    UDP   	|       4789       	| Flannel VXLAN overlay networking on Windows cluster |
|    TCP   	|       9099       	| Canal/Flannel livenessProbe/readinessProbe      	|
|    TCP   	|       6783       	| Weave Port      	|
|    UDP   	|       6783-6784   | Weave UDP Ports      	|
|    TCP   	|       10250      	| kubelet API                                     	|
|    TCP   	|       10254      	| Ingress controller livenessProbe/readinessProbe 	|
| TCP/UDP  	| 30000-</br>32767 	| NodePort port range                             	|
