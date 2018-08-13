---
title: API Auditing
weight: 10000
---

Rancher ships with API Auditing to record the sequence of system events initiated by individual users. You can know what happened, when it happened, who initiated it, and what cluster it affected. API auditing records all requests and responses to and from the Rancher API, which includes use of the Rancher UI and any other use of the Rancher API through programmatic use.

## Enabling API Auditing

To enable API auditing, stop the Docker container that's running Rancher, and then restart it using the following command. This command includes parameters that turns on API auditing. For more information about usage for each switch related to API auditing, see [API Auditing Usage](#api-auditing-usage).


```
  docker run -d --restart=unless-stopped \
   -p 80:80 -p 443:443 \
   -v /root/var/log/auditlog:/var/log/auditlog \
   -e AUDIT_LEVEL=1 \
   -e AUDIT_LOG_PATH=/var/log/auditlog/rancher-api-audit.log \
   -e AUDIT_LOG_MAXAGE=20 \
   -e AUDIT_LOG_MAXBACKUP=20 \
   -e AUDIT_LOG_MAXSIZE=100 \
   rancher/rancher:latest
```

## API Auditing Usage

Each API request creates two entries for it in the audit log, one for reception and one for fulfillment: `RequestReceived` and `ResponseComplete`. Each status for a single request use the same `auditID` value.
The usage below defines rules about what the audit log should record and what data it should include:


Parameter | Description |
---------|----------|
 `AUDIT_LEVEL` | `0` - Disable audit log.<br/>`1` - Log event metadata.<br/>`2` - Log event metadata and request body.</br>`3` - Log event metadata, request body, and response body. | 
 `AUDIT_LOG_PATH` | Log path for Rancher Server API. Default path is `/var/log/auditlog/rancher-api-audit.log`. You can mount the log directory to host. | 
 `AUDIT_LOG_MAXAGE` | Defined the maximum number of days to retain old audit log files. Default is 10 days. |
 `AUDIT_LOG_MAXBACKUP` | Defines the maximum number of audit log files to retain. Default is 10.
 `AUDIT_LOG_MAXSIZE` | Defines the maximum size in megabytes of the audit log file before it gets rotated. Default size is 100M.


## Viewing API Audit Logs

By default, you can view your audit logs on any of your cluster nodes at `root/var/log/auditlog/rancher-api-audit.log` using your favorite text editor. For example:

```
less /var/log/auditlog/rancher-api-audit.log
```

If you changed the `AUDIT_LOG_PATH` parameter, look in that location for `rancher-api-audit.log` instead.

## Audit Log Samples

After you enable auditing, each API request or response is logged by Rancher in the form of JSON. Each of the following code samples provide examples of how to identify each API transaction.

### Metadata Level

If you set your `AUDIT_LEVEL` to `1`, Rancher logs the metadata header for every API request and response, but not the body. The header provides basic information about the API transaction, such as the transaction's ID, who initiated the transaction, the time it occurred, etc.

```
{
    "auditID": "30022177-9e2e-43d1-b0d0-06ef9d3db183",
    "requestURI": "/v3/schemas",
    "sourceIPs": [
        "::1"
    ],
    "user": {
        "name": "user-f4tt2",
        "group": [
            "system:authenticated"
        ]
    },
    "verb": "GET",
    "stage": "RequestReceived",
    "stageTimestamp": "2018-07-20 10:22:43 +0800"
}
```

### Metadata and Request Body Level

```
{
    "auditID": "ef1d249e-bfac-4fd0-a61f-cbdcad53b9bb",
    "requestURI": "/v3/project/c-bcz5t:p-fdr4s/workloads/deployment:default:nginx",
    "sourceIPs": [
        "::1"
    ],
    "user": {
        "name": "user-f4tt2",
        "group": [
            "system:authenticated"
        ]
    },
    "verb": "PUT",
    "stage": "RequestReceived",
    "stageTimestamp": "2018-07-20 10:28:08 +0800",
    "requestBody": {
        "hostIPC": false,
        "hostNetwork": false,
        "hostPID": false,
        "paused": false,
        "annotations": {},
        "baseType": "workload",
        "containers": [
            {
                "allowPrivilegeEscalation": false,
                "image": "nginx",
                "imagePullPolicy": "Always",
                "initContainer": false,
                "name": "nginx",
                "ports": [
                    {
                        "containerPort": 80,
                        "dnsName": "nginx-nodeport",
                        "kind": "NodePort",
                        "name": "80tcp01",
                        "protocol": "TCP",
                        "sourcePort": 0,
                        "type": "/v3/project/schemas/containerPort"
                    }
                ],
                "privileged": false,
                "readOnly": false,
                "resources": {
                    "type": "/v3/project/schemas/resourceRequirements",
                    "requests": {},
                    "limits": {}
                },
                "restartCount": 0,
                "runAsNonRoot": false,
                "stdin": true,
                "stdinOnce": false,
                "terminationMessagePath": "/dev/termination-log",
                "terminationMessagePolicy": "File",
                "tty": true,
                "type": "/v3/project/schemas/container",
                "environmentFrom": [],
                "capAdd": [],
                "capDrop": [],
                "livenessProbe": null,
                "volumeMounts": []
            }
        ],
        "created": "2018-07-18T07:34:16Z",
        "createdTS": 1531899256000,
        "creatorId": null,
        "deploymentConfig": {
            "maxSurge": 1,
            "maxUnavailable": 0,
            "minReadySeconds": 0,
            "progressDeadlineSeconds": 600,
            "revisionHistoryLimit": 10,
            "strategy": "RollingUpdate"
        },
        "deploymentStatus": {
            "availableReplicas": 1,
            "conditions": [
                {
                    "lastTransitionTime": "2018-07-18T07:34:38Z",
                    "lastTransitionTimeTS": 1531899278000,
                    "lastUpdateTime": "2018-07-18T07:34:38Z",
                    "lastUpdateTimeTS": 1531899278000,
                    "message": "Deployment has minimum availability.",
                    "reason": "MinimumReplicasAvailable",
                    "status": "True",
                    "type": "Available"
                },
                {
                    "lastTransitionTime": "2018-07-18T07:34:16Z",
                    "lastTransitionTimeTS": 1531899256000,
                    "lastUpdateTime": "2018-07-18T07:34:38Z",
                    "lastUpdateTimeTS": 1531899278000,
                    "message": "ReplicaSet \"nginx-64d85666f9\" has successfully progressed.",
                    "reason": "NewReplicaSetAvailable",
                    "status": "True",
                    "type": "Progressing"
                }
            ],
            "observedGeneration": 2,
            "readyReplicas": 1,
            "replicas": 1,
            "type": "/v3/project/schemas/deploymentStatus",
            "unavailableReplicas": 0,
            "updatedReplicas": 1
        },
        "dnsPolicy": "ClusterFirst",
        "id": "deployment:default:nginx",
        "labels": {
            "workload.user.cattle.io/workloadselector": "deployment-default-nginx"
        },
        "name": "nginx",
        "namespaceId": "default",
        "projectId": "c-bcz5t:p-fdr4s",
        "publicEndpoints": [
            {
                "addresses": [
                    "10.64.3.58"
                ],
                "allNodes": true,
                "ingressId": null,
                "nodeId": null,
                "podId": null,
                "port": 30917,
                "protocol": "TCP",
                "serviceId": "default:nginx-nodeport",
                "type": "publicEndpoint"
            }
        ],
        "restartPolicy": "Always",
        "scale": 1,
        "schedulerName": "default-scheduler",
        "selector": {
            "matchLabels": {
                "workload.user.cattle.io/workloadselector": "deployment-default-nginx"
            },
            "type": "/v3/project/schemas/labelSelector"
        },
        "state": "active",
        "terminationGracePeriodSeconds": 30,
        "transitioning": "no",
        "transitioningMessage": "",
        "type": "deployment",
        "uuid": "f998037d-8a5c-11e8-a4cf-0245a7ebb0fd",
        "workloadAnnotations": {
            "deployment.kubernetes.io/revision": "1",
            "field.cattle.io/creatorId": "user-f4tt2"
        },
        "workloadLabels": {
            "workload.user.cattle.io/workloadselector": "deployment-default-nginx"
        },
        "scheduling": {
            "node": {}
        },
        "description": "my description",
        "volumes": []
    }
}
```
### Metadata, Request Body, and Response Body Level

#### Request
```
{
    "auditID": "a886fd9f-5d6b-4ae3-9a10-5bff8f3d68af",
    "requestURI": "/v3/project/c-bcz5t:p-fdr4s/workloads/deployment:default:nginx",
    "sourceIPs": [
        "::1"
    ],
    "user": {
        "name": "user-f4tt2",
        "group": [
            "system:authenticated"
        ]
    },
    "verb": "PUT",
    "stage": "RequestReceived",
    "stageTimestamp": "2018-07-20 10:33:06 +0800",
    "requestBody": {
        "hostIPC": false,
        "hostNetwork": false,
        "hostPID": false,
        "paused": false,
        "annotations": {},
        "baseType": "workload",
        "containers": [
            {
                "allowPrivilegeEscalation": false,
                "image": "nginx",
                "imagePullPolicy": "Always",
                "initContainer": false,
                "name": "nginx",
                "ports": [
                    {
                        "containerPort": 80,
                        "dnsName": "nginx-nodeport",
                        "kind": "NodePort",
                        "name": "80tcp01",
                        "protocol": "TCP",
                        "sourcePort": 0,
                        "type": "/v3/project/schemas/containerPort"
                    }
                ],
                "privileged": false,
                "readOnly": false,
                "resources": {
                    "type": "/v3/project/schemas/resourceRequirements",
                    "requests": {},
                    "limits": {}
                },
                "restartCount": 0,
                "runAsNonRoot": false,
                "stdin": true,
                "stdinOnce": false,
                "terminationMessagePath": "/dev/termination-log",
                "terminationMessagePolicy": "File",
                "tty": true,
                "type": "/v3/project/schemas/container",
                "environmentFrom": [],
                "capAdd": [],
                "capDrop": [],
                "livenessProbe": null,
                "volumeMounts": []
            }
        ],
        "created": "2018-07-18T07:34:16Z",
        "createdTS": 1531899256000,
        "creatorId": null,
        "deploymentConfig": {
            "maxSurge": 1,
            "maxUnavailable": 0,
            "minReadySeconds": 0,
            "progressDeadlineSeconds": 600,
            "revisionHistoryLimit": 10,
            "strategy": "RollingUpdate"
        },
        "deploymentStatus": {
            "availableReplicas": 1,
            "conditions": [
                {
                    "lastTransitionTime": "2018-07-18T07:34:38Z",
                    "lastTransitionTimeTS": 1531899278000,
                    "lastUpdateTime": "2018-07-18T07:34:38Z",
                    "lastUpdateTimeTS": 1531899278000,
                    "message": "Deployment has minimum availability.",
                    "reason": "MinimumReplicasAvailable",
                    "status": "True",
                    "type": "Available"
                },
                {
                    "lastTransitionTime": "2018-07-18T07:34:16Z",
                    "lastTransitionTimeTS": 1531899256000,
                    "lastUpdateTime": "2018-07-18T07:34:38Z",
                    "lastUpdateTimeTS": 1531899278000,
                    "message": "ReplicaSet \"nginx-64d85666f9\" has successfully progressed.",
                    "reason": "NewReplicaSetAvailable",
                    "status": "True",
                    "type": "Progressing"
                }
            ],
            "observedGeneration": 2,
            "readyReplicas": 1,
            "replicas": 1,
            "type": "/v3/project/schemas/deploymentStatus",
            "unavailableReplicas": 0,
            "updatedReplicas": 1
        },
        "dnsPolicy": "ClusterFirst",
        "id": "deployment:default:nginx",
        "labels": {
            "workload.user.cattle.io/workloadselector": "deployment-default-nginx"
        },
        "name": "nginx",
        "namespaceId": "default",
        "projectId": "c-bcz5t:p-fdr4s",
        "publicEndpoints": [
            {
                "addresses": [
                    "10.64.3.58"
                ],
                "allNodes": true,
                "ingressId": null,
                "nodeId": null,
                "podId": null,
                "port": 30917,
                "protocol": "TCP",
                "serviceId": "default:nginx-nodeport",
                "type": "publicEndpoint"
            }
        ],
        "restartPolicy": "Always",
        "scale": 1,
        "schedulerName": "default-scheduler",
        "selector": {
            "matchLabels": {
                "workload.user.cattle.io/workloadselector": "deployment-default-nginx"
            },
            "type": "/v3/project/schemas/labelSelector"
        },
        "state": "active",
        "terminationGracePeriodSeconds": 30,
        "transitioning": "no",
        "transitioningMessage": "",
        "type": "deployment",
        "uuid": "f998037d-8a5c-11e8-a4cf-0245a7ebb0fd",
        "workloadAnnotations": {
            "deployment.kubernetes.io/revision": "1",
            "field.cattle.io/creatorId": "user-f4tt2"
        },
        "workloadLabels": {
            "workload.user.cattle.io/workloadselector": "deployment-default-nginx"
        },
        "scheduling": {
            "node": {}
        },
        "description": "my decript",
        "volumes": []
    }
}
```

#### Response
```
{
    "auditID": "a886fd9f-5d6b-4ae3-9a10-5bff8f3d68af",
    "responseStatus": "200",
    "stage": "ResponseComplete",
    "stageTimestamp": "2018-07-20 10:33:06 +0800",
    "responseBody": {
        "actionLinks": {
            "pause": "https://localhost:8443/v3/project/c-bcz5t:p-fdr4s/workloads/deployment:default:nginx?action=pause",
            "resume": "https://localhost:8443/v3/project/c-bcz5t:p-fdr4s/workloads/deployment:default:nginx?action=resume",
            "rollback": "https://localhost:8443/v3/project/c-bcz5t:p-fdr4s/workloads/deployment:default:nginx?action=rollback"
        },
        "annotations": {},
        "baseType": "workload",
        "containers": [
            {
                "allowPrivilegeEscalation": false,
                "image": "nginx",
                "imagePullPolicy": "Always",
                "initContainer": false,
                "name": "nginx",
                "ports": [
                    {
                        "containerPort": 80,
                        "dnsName": "nginx-nodeport",
                        "kind": "NodePort",
                        "name": "80tcp01",
                        "protocol": "TCP",
                        "sourcePort": 0,
                        "type": "/v3/project/schemas/containerPort"
                    }
                ],
                "privileged": false,
                "readOnly": false,
                "resources": {
                    "type": "/v3/project/schemas/resourceRequirements"
                },
                "restartCount": 0,
                "runAsNonRoot": false,
                "stdin": true,
                "stdinOnce": false,
                "terminationMessagePath": "/dev/termination-log",
                "terminationMessagePolicy": "File",
                "tty": true,
                "type": "/v3/project/schemas/container"
            }
        ],
        "created": "2018-07-18T07:34:16Z",
        "createdTS": 1531899256000,
        "creatorId": null,
        "deploymentConfig": {
            "maxSurge": 1,
            "maxUnavailable": 0,
            "minReadySeconds": 0,
            "progressDeadlineSeconds": 600,
            "revisionHistoryLimit": 10,
            "strategy": "RollingUpdate"
        },
        "deploymentStatus": {
            "availableReplicas": 1,
            "conditions": [
                {
                    "lastTransitionTime": "2018-07-18T07:34:38Z",
                    "lastTransitionTimeTS": 1531899278000,
                    "lastUpdateTime": "2018-07-18T07:34:38Z",
                    "lastUpdateTimeTS": 1531899278000,
                    "message": "Deployment has minimum availability.",
                    "reason": "MinimumReplicasAvailable",
                    "status": "True",
                    "type": "Available"
                },
                {
                    "lastTransitionTime": "2018-07-18T07:34:16Z",
                    "lastTransitionTimeTS": 1531899256000,
                    "lastUpdateTime": "2018-07-18T07:34:38Z",
                    "lastUpdateTimeTS": 1531899278000,
                    "message": "ReplicaSet \"nginx-64d85666f9\" has successfully progressed.",
                    "reason": "NewReplicaSetAvailable",
                    "status": "True",
                    "type": "Progressing"
                }
            ],
            "observedGeneration": 2,
            "readyReplicas": 1,
            "replicas": 1,
            "type": "/v3/project/schemas/deploymentStatus",
            "unavailableReplicas": 0,
            "updatedReplicas": 1
        },
        "dnsPolicy": "ClusterFirst",
        "hostIPC": false,
        "hostNetwork": false,
        "hostPID": false,
        "id": "deployment:default:nginx",
        "labels": {
            "workload.user.cattle.io/workloadselector": "deployment-default-nginx"
        },
        "links": {
            "remove": "https://localhost:8443/v3/project/c-bcz5t:p-fdr4s/workloads/deployment:default:nginx",
            "revisions": "https://localhost:8443/v3/project/c-bcz5t:p-fdr4s/workloads/deployment:default:nginx/revisions",
            "self": "https://localhost:8443/v3/project/c-bcz5t:p-fdr4s/workloads/deployment:default:nginx",
            "update": "https://localhost:8443/v3/project/c-bcz5t:p-fdr4s/workloads/deployment:default:nginx",
            "yaml": "https://localhost:8443/v3/project/c-bcz5t:p-fdr4s/workloads/deployment:default:nginx/yaml"
        },
        "name": "nginx",
        "namespaceId": "default",
        "paused": false,
        "projectId": "c-bcz5t:p-fdr4s",
        "publicEndpoints": [
            {
                "addresses": [
                    "10.64.3.58"
                ],
                "allNodes": true,
                "ingressId": null,
                "nodeId": null,
                "podId": null,
                "port": 30917,
                "protocol": "TCP",
                "serviceId": "default:nginx-nodeport"
            }
        ],
        "restartPolicy": "Always",
        "scale": 1,
        "schedulerName": "default-scheduler",
        "selector": {
            "matchLabels": {
                "workload.user.cattle.io/workloadselector": "deployment-default-nginx"
            },
            "type": "/v3/project/schemas/labelSelector"
        },
        "state": "active",
        "terminationGracePeriodSeconds": 30,
        "transitioning": "no",
        "transitioningMessage": "",
        "type": "deployment",
        "uuid": "f998037d-8a5c-11e8-a4cf-0245a7ebb0fd",
        "workloadAnnotations": {
            "deployment.kubernetes.io/revision": "1",
            "field.cattle.io/creatorId": "user-f4tt2"
        },
        "workloadLabels": {
            "workload.user.cattle.io/workloadselector": "deployment-default-nginx"
        }
    }
}
```