#!/bin/sh

if [ -z "$1" ]; then
  echo Usage: $0 [REGISTRY]
  exit 1
fi

set -e -x
REGISTRY=$1

docker load --input rancher-images.tar.gz


docker tag busybox ${REGISTRY}/busybox
docker push ${REGISTRY}/busybox
docker tag rancher/alertmanager-helper:v0.0.2 ${REGISTRY}/rancher/alertmanager-helper:v0.0.2
docker push ${REGISTRY}/rancher/alertmanager-helper:v0.0.2
docker tag rancher/alpine-git:1.0.4 ${REGISTRY}/rancher/alpine-git:1.0.4
docker push ${REGISTRY}/rancher/alpine-git:1.0.4
docker tag rancher/calico-cni:v3.1.1 ${REGISTRY}/rancher/calico-cni:v3.1.1
docker push ${REGISTRY}/rancher/calico-cni:v3.1.1
docker tag rancher/calico-ctl:v2.0.0 ${REGISTRY}/rancher/calico-ctl:v2.0.0
docker push ${REGISTRY}/rancher/calico-ctl:v2.0.0
docker tag rancher/calico-node:v3.1.1 ${REGISTRY}/rancher/calico-node:v3.1.1
docker push ${REGISTRY}/rancher/calico-node:v3.1.1
docker tag rancher/cluster-proportional-autoscaler-amd64:1.0.0 ${REGISTRY}/rancher/cluster-proportional-autoscaler-amd64:1.0.0
docker push ${REGISTRY}/rancher/cluster-proportional-autoscaler-amd64:1.0.0
docker tag rancher/coreos-etcd:v3.1.12 ${REGISTRY}/rancher/coreos-etcd:v3.1.12
docker push ${REGISTRY}/rancher/coreos-etcd:v3.1.12
docker tag rancher/coreos-etcd:v3.2.18 ${REGISTRY}/rancher/coreos-etcd:v3.2.18
docker push ${REGISTRY}/rancher/coreos-etcd:v3.2.18
docker tag rancher/coreos-flannel-cni:v0.2.0 ${REGISTRY}/rancher/coreos-flannel-cni:v0.2.0
docker push ${REGISTRY}/rancher/coreos-flannel-cni:v0.2.0
docker tag rancher/coreos-flannel:v0.9.1 ${REGISTRY}/rancher/coreos-flannel:v0.9.1
docker push ${REGISTRY}/rancher/coreos-flannel:v0.9.1
docker tag rancher/docker-elasticsearch-kubernetes:5.6.2 ${REGISTRY}/rancher/docker-elasticsearch-kubernetes:5.6.2
docker push ${REGISTRY}/rancher/docker-elasticsearch-kubernetes:5.6.2
docker tag rancher/fluentd-helper:v0.1.2 ${REGISTRY}/rancher/fluentd-helper:v0.1.2
docker push ${REGISTRY}/rancher/fluentd-helper:v0.1.2
docker tag rancher/fluentd:v0.1.10 ${REGISTRY}/rancher/fluentd:v0.1.10
docker push ${REGISTRY}/rancher/fluentd:v0.1.10
docker tag rancher/hyperkube:v1.10.5-rancher1 ${REGISTRY}/rancher/hyperkube:v1.10.5-rancher1
docker push ${REGISTRY}/rancher/hyperkube:v1.10.5-rancher1
docker tag rancher/hyperkube:v1.11.2-rancher1 ${REGISTRY}/rancher/hyperkube:v1.11.2-rancher1
docker push ${REGISTRY}/rancher/hyperkube:v1.11.2-rancher1
docker tag rancher/hyperkube:v1.9.7-rancher2 ${REGISTRY}/rancher/hyperkube:v1.9.7-rancher2
docker push ${REGISTRY}/rancher/hyperkube:v1.9.7-rancher2
docker tag rancher/jenkins-jenkins:2.107-slim ${REGISTRY}/rancher/jenkins-jenkins:2.107-slim
docker push ${REGISTRY}/rancher/jenkins-jenkins:2.107-slim
docker tag rancher/jenkins-jnlp-slave:3.10-1-alpine ${REGISTRY}/rancher/jenkins-jnlp-slave:3.10-1-alpine
docker push ${REGISTRY}/rancher/jenkins-jnlp-slave:3.10-1-alpine
docker tag rancher/jenkins-plugins-docker:17.12 ${REGISTRY}/rancher/jenkins-plugins-docker:17.12
docker push ${REGISTRY}/rancher/jenkins-plugins-docker:17.12
docker tag rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.10 ${REGISTRY}/rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.10
docker push ${REGISTRY}/rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.10
docker tag rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.7 ${REGISTRY}/rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.7
docker push ${REGISTRY}/rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.7
docker tag rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.8 ${REGISTRY}/rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.8
docker push ${REGISTRY}/rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.8
docker tag rancher/k8s-dns-kube-dns-amd64:1.14.10 ${REGISTRY}/rancher/k8s-dns-kube-dns-amd64:1.14.10
docker push ${REGISTRY}/rancher/k8s-dns-kube-dns-amd64:1.14.10
docker tag rancher/k8s-dns-kube-dns-amd64:1.14.7 ${REGISTRY}/rancher/k8s-dns-kube-dns-amd64:1.14.7
docker push ${REGISTRY}/rancher/k8s-dns-kube-dns-amd64:1.14.7
docker tag rancher/k8s-dns-kube-dns-amd64:1.14.8 ${REGISTRY}/rancher/k8s-dns-kube-dns-amd64:1.14.8
docker push ${REGISTRY}/rancher/k8s-dns-kube-dns-amd64:1.14.8
docker tag rancher/k8s-dns-sidecar-amd64:1.14.10 ${REGISTRY}/rancher/k8s-dns-sidecar-amd64:1.14.10
docker push ${REGISTRY}/rancher/k8s-dns-sidecar-amd64:1.14.10
docker tag rancher/k8s-dns-sidecar-amd64:1.14.7 ${REGISTRY}/rancher/k8s-dns-sidecar-amd64:1.14.7
docker push ${REGISTRY}/rancher/k8s-dns-sidecar-amd64:1.14.7
docker tag rancher/k8s-dns-sidecar-amd64:1.14.8 ${REGISTRY}/rancher/k8s-dns-sidecar-amd64:1.14.8
docker push ${REGISTRY}/rancher/k8s-dns-sidecar-amd64:1.14.8
docker tag rancher/kibana:5.6.4 ${REGISTRY}/rancher/kibana:5.6.4
docker push ${REGISTRY}/rancher/kibana:5.6.4
docker tag rancher/log-aggregator:v0.1.3 ${REGISTRY}/rancher/log-aggregator:v0.1.3
docker push ${REGISTRY}/rancher/log-aggregator:v0.1.3
docker tag rancher/metrics-server-amd64:v0.2.1 ${REGISTRY}/rancher/metrics-server-amd64:v0.2.1
docker push ${REGISTRY}/rancher/metrics-server-amd64:v0.2.1
docker tag rancher/nginx-ingress-controller-defaultbackend:1.4 ${REGISTRY}/rancher/nginx-ingress-controller-defaultbackend:1.4
docker push ${REGISTRY}/rancher/nginx-ingress-controller-defaultbackend:1.4
docker tag rancher/nginx-ingress-controller:0.16.2-rancher1 ${REGISTRY}/rancher/nginx-ingress-controller:0.16.2-rancher1
docker push ${REGISTRY}/rancher/nginx-ingress-controller:0.16.2-rancher1
docker tag rancher/pause-amd64:3.0 ${REGISTRY}/rancher/pause-amd64:3.0
docker push ${REGISTRY}/rancher/pause-amd64:3.0
docker tag rancher/pause-amd64:3.1 ${REGISTRY}/rancher/pause-amd64:3.1
docker push ${REGISTRY}/rancher/pause-amd64:3.1
docker tag rancher/prom-alertmanager:v0.11.0 ${REGISTRY}/rancher/prom-alertmanager:v0.11.0
docker push ${REGISTRY}/rancher/prom-alertmanager:v0.11.0
docker tag rancher/rke-tools:v0.1.13 ${REGISTRY}/rancher/rke-tools:v0.1.13
docker push ${REGISTRY}/rancher/rke-tools:v0.1.13
docker tag rancher/rancher:v2.0.8 ${REGISTRY}/rancher/rancher:v2.0.8
docker push ${REGISTRY}/rancher/rancher:v2.0.8
docker tag rancher/rancher-agent:v2.0.8 ${REGISTRY}/rancher/rancher-agent:v2.0.8
docker push ${REGISTRY}/rancher/rancher-agent:v2.0.8
