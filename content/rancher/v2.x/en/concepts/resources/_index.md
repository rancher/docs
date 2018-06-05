---
title: Resources
weight: 2275
---
## Introduction

Kubernetes resources listed below belong to specific namespaces. Except Configuration Maps, Rancher 2.0 extends Kubernetes to allow their application at two levels - project and namespace. A project level resource is available for all its namespaces. Thus their names need to be unique within a namespace. 
Also Certificates, Secrets and Registries in rancher are all Kubernetes secrets, so their names need to be unique.

## Certificates

In Kubernetes, you can secure ingress by specifying a secret that contains TLS private key and cert. In rancher 2.0, you can add add private key and cert under Certificates and it creates a secret of type TLS for users. Users can then make reference to this certificate while creating an ingress. 

## Configuration Maps

While secrets are used for using sensitive information, [config maps](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/) are useful to store general configuration information, for example storing config files for your tools. Also, while secrets don't get updated with an update in secret (pod restart is required), config maps get updated automatically - so use config maps when information needs to reflect without restarting the containers. 

Config maps take values in key-value pairs, values can be any string format like config files or JSON blobs. Any workload can then reference to config maps either as environment variable or volume mount. 

## Secrets

Similar to Kubernetes [secrets](https://kubernetes.io/docs/concepts/configuration/secret/#overview-of-secrets), secrets are helpful to store sensitive data. A secret may have multiple key-value pairs. 
User thus has ability to decide if workload will use all or few keys of this secret. Just like config maps, Any workload can then reference to secrets either as environment variable or volume mount. 
Any update to secrets won't reflect automatically inside pods, until the pods are restarted. 

## Registries

Registries are secrets too, but you'd want to use registries when you want rancher 2.0 to automatically set it under imagePullSecrets. 

To pull the image from [private registries](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/), Kubernetes needs credentials. The imagePullSecrets field in the pod spec tells Kubernetes to pull these credentials from a secret. 

Rancher 2.0 makes this process easy by automatically setting imagePullSecrets if you have added credentials as Registries before creating workload. Currently, credentials will be pulled automatically only if the workload is created via UI, not via kubectl. ([known enhancement](https://github.com/rancher/rancher/issues/13332#issuecomment-387163843))

