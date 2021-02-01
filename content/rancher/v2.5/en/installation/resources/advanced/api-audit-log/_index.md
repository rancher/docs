---
title: Enabling the API Audit Log to Record System Events
weight: 4
aliases:
  - /rancher/v2.5/en/installation/options/api-audit-log/
  - /rancher/v2.5/en/installation/api-auditing
---

You can enable the API audit log to record the sequence of system events initiated by individual users. You can know what happened, when it happened, who initiated it, and what cluster it affected. When you enable this feature, all requests to the Rancher API and all responses from it are written to a log.

You can enable API Auditing during Rancher installation or upgrade.

## Enabling API Audit Log

The Audit Log is enabled and configured by passing environment variables to the Rancher server container. See the following to enable on your installation.

- [Docker Install]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/advanced/#api-audit-log)

- [Kubernetes Install]({{<baseurl>}}/rancher/v2.5/en/installation/install-rancher-on-k8s/chart-options/#api-audit-log)

## API Audit Log Options

The usage below defines rules about what the audit log should record and what data it should include:

| Parameter                             | Description                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="audit-level"></a>`AUDIT_LEVEL` | `0` - Disable audit log (default setting).<br/>`1` - Log event metadata.<br/>`2` - Log event metadata and request body.</br>`3` - Log event metadata, request body, and response body. Each log transaction for a request/response pair uses the same `auditID` value.<br/><br/>See [Audit Level Logging](#audit-log-levels) for a table that displays what each setting logs. |
| `AUDIT_LOG_PATH`                      | Log path for Rancher Server API. Default path is `/var/log/auditlog/rancher-api-audit.log`. You can mount the log directory to host. <br/><br/>Usage Example: `AUDIT_LOG_PATH=/my/custom/path/`<br/>                                                                                                                                                                           |
| `AUDIT_LOG_MAXAGE`                    | Defined the maximum number of days to retain old audit log files. Default is 10 days.                                                                                                                                                                                                                                                                                          |
| `AUDIT_LOG_MAXBACKUP`                 | Defines the maximum number of audit log files to retain. Default is 10.                                                                                                                                                                                                                                                                                                        |
| `AUDIT_LOG_MAXSIZE`                   | Defines the maximum size in megabytes of the audit log file before it gets rotated. Default size is 100M.                                                                                                                                                                                                                                                                      |

<br/>

### Audit Log Levels

The following table displays what parts of API transactions are logged for each [`AUDIT_LEVEL`](#audit-level) setting.

| `AUDIT_LEVEL` Setting | Request Metadata | Request Body | Response Metadata | Response Body |
| --------------------- | ---------------- | ------------ | ----------------- | ------------- |
| `0`                   |                  |              |                   |               |
| `1`                   | ✓                |              |                   |               |
| `2`                   | ✓                | ✓            |                   |               |
| `3`                   | ✓                | ✓            | ✓                 | ✓             |

## Viewing API Audit Logs

### Docker Install

Share the `AUDIT_LOG_PATH` directory (Default: `/var/log/auditlog`) with the host system. The log can be parsed by standard CLI tools or forwarded on to a log collection tool like Fluentd, Filebeat, Logstash, etc.

### Kubernetes Install

Enabling the API Audit Log with the Helm chart install will create a `rancher-audit-log` sidecar container in the Rancher pod. This container will stream the log to standard output (stdout). You can view the log as you would any container log.

The `rancher-audit-log` container is part of the `rancher` pod in the `cattle-system` namespace.

#### CLI

```bash
kubectl -n cattle-system logs -f rancher-84d886bdbb-s4s69 rancher-audit-log
```

#### Rancher Web GUI

1. From the context menu, select **Cluster: local > System**.
1. From the main navigation bar, choose **Resources > Workloads.** Find the `cattle-system` namespace. Open the `rancher` workload by clicking its link.
1. Pick one of the `rancher` pods and select **&#8942; > View Logs**.
1. From the **Logs** drop-down, select `rancher-audit-log`.

#### Shipping the Audit Log

You can enable Rancher's built in log collection and shipping for the cluster to ship the audit and other services logs to a supported collection endpoint. See [Rancher Tools - Logging]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/logging) for details.

## Audit Log Samples

After you enable auditing, each API request or response is logged by Rancher in the form of JSON. Each of the following code samples provide examples of how to identify each API transaction.

### Metadata Level

If you set your `AUDIT_LEVEL` to `1`, Rancher logs the metadata header for every API request, but not the body. The header provides basic information about the API transaction, such as the transaction's ID, who initiated the transaction, the time it occurred, etc.

```json
{
  "auditID": "30022177-9e2e-43d1-b0d0-06ef9d3db183",
  "requestURI": "/v3/schemas",
  "sourceIPs": ["::1"],
  "user": {
    "name": "user-f4tt2",
    "group": ["system:authenticated"]
  },
  "verb": "GET",
  "stage": "RequestReceived",
  "stageTimestamp": "2018-07-20 10:22:43 +0800"
}
```

### Metadata and Request Body Level

If you set your `AUDIT_LEVEL` to `2`, Rancher logs the metadata header and body for every API request.

The code sample below depicts an API request, with both its metadata header and body.

```json
{
  "auditID": "ef1d249e-bfac-4fd0-a61f-cbdcad53b9bb",
  "requestURI": "/v3/project/c-bcz5t:p-fdr4s/workloads/deployment:default:nginx",
  "sourceIPs": ["::1"],
  "user": {
    "name": "user-f4tt2",
    "group": ["system:authenticated"]
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
        "addresses": ["10.64.3.58"],
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

If you set your `AUDIT_LEVEL` to `3`, Rancher logs:

- The metadata header and body for every API request.
- The metadata header and body for every API response.

#### Request

The code sample below depicts an API request, with both its metadata header and body.

```json
{
  "auditID": "a886fd9f-5d6b-4ae3-9a10-5bff8f3d68af",
  "requestURI": "/v3/project/c-bcz5t:p-fdr4s/workloads/deployment:default:nginx",
  "sourceIPs": ["::1"],
  "user": {
    "name": "user-f4tt2",
    "group": ["system:authenticated"]
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
        "addresses": ["10.64.3.58"],
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

The code sample below depicts an API response, with both its metadata header and body.

```json
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
        "addresses": ["10.64.3.58"],
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
