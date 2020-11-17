---
headless: true
---
| Protocol 	|       Port       	| Description                                     	                                |
|:--------:	|:----------------:	|----------------------------------------------------------------------------------	|
|    TCP   	|         22      	| Node driver SSH provisioning                    	                                |
|    TCP    |        179        | Calico BGP Port                                                                   |
|    TCP   	|       2376       	| Node driver Docker daemon TLS port              	                                |
|    TCP   	|       2379       	| etcd client requests                           	                                |
|    TCP   	|       2380       	| etcd peer communication                         	                                |
|    UDP   	|       8472       	| Canal/Flannel VXLAN overlay networking          	                                |
|    UDP   	|       4789       	| Flannel VXLAN overlay networking on Windows cluster                               |
|    TCP   	|       8443       	| Rancher webhook                                                                   |
|    TCP   	|       9099       	| Canal/Flannel livenessProbe/readinessProbe      	                                |
|    TCP    |       9100        | Default port required by Monitoring to scrape metrics from Linux node-exporters   |
|    TCP   	|       9443       	| Rancher webhook                                                                   |
|    TCP    |       9796        | Default port required by Monitoring to scrape metrics from Windows node-exporters |
|    TCP   	|       6783       	| Weave Port      	                                                                |
|    UDP   	|       6783-6784   | Weave UDP Ports      	                                                            |
|    TCP   	|       10250      	| kubelet API                                     	                                |
|    TCP   	|       10254      	| Ingress controller livenessProbe/readinessProbe 	                                |
| TCP/UDP	| 30000-</br>32767 	| NodePort port range                             	                                |
