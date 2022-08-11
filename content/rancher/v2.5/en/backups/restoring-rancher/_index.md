---
title: Restoring Rancher
weight: 2
aliases:
  - /rancher/v2.x/en/installation/backups/restores
  - /rancher/v2.x/en/backups/restoring-rancher
  - /rancher/v2.x/en/backups/v2.5/restoring-rancher/
---

A restore is performed by creating a Restore custom resource. 

> **Important**
>
> * Follow the instructions from this page for restoring rancher on the same cluster where it was backed up from. In order to migrate rancher to a new cluster, follow the steps to [migrate rancher.]({{<baseurl>}}/rancher/v2.5/en/backups/migrating-rancher)
> * While restoring rancher on the same setup, the operator will scale down the rancher deployment when restore starts, and it will scale back up the deployment once restore completes. So Rancher will be unavailable during the restore.
> * When restoring a backup into a new Rancher setup, the version of the new setup should be the same as the one where the backup is made.

### Create the Restore Custom Resource

1. In the **Cluster Explorer,** go to the dropdown menu in the upper left corner and click **Rancher Backups.**
1. Click **Restore.**
1. Create the Restore with the form, or with YAML.  For creating the Restore resource using form, refer to the [configuration reference]({{<baseurl>}}/rancher/v2.5/en/backups/configuration/restore-config) and to the [examples.]({{<baseurl>}}/rancher/v2.5/en/backups/examples)
1. For using the YAML editor, we can click **Create > Create from YAML.** Enter the Restore YAML.

    ```yaml
    apiVersion: resources.cattle.io/v1
	kind: Restore
	metadata:
	  name: restore-migration
	spec:
	  backupFilename: backup-b0450532-cee1-4aa1-a881-f5f48a007b1c-2020-09-15T07-27-09Z.tar.gz
	  encryptionConfigSecretName: encryptionconfig
	  storageLocation:
	    s3:
	      credentialSecretName: s3-creds
	      credentialSecretNamespace: default
	      bucketName: rancher-backups
	      folder: rancher
	      region: us-west-2
	      endpoint: s3.us-west-2.amazonaws.com
      ```

      For help configuring the Restore, refer to the [configuration reference]({{<baseurl>}}/rancher/v2.5/en/backups/configuration/restore-config) and to the [examples.]({{<baseurl>}}/rancher/v2.5/en/backups/examples)

1. Click **Create.**

**Result:** The rancher-operator scales down the rancher deployment during restore, and scales it back up once the restore completes. The resources are restored in this order:

1. Custom Resource Definitions (CRDs)
2. Cluster-scoped resources
3. Namespaced resources

### Logs

To check how the restore is progressing, you can check the logs of the operator. Run this command to follow the logs:

```
kubectl logs -n cattle-resources-system -l app.kubernetes.io/name=rancher-backup -f
```

### Cleanup

If you created the restore resource with kubectl, remove the resource to prevent a naming conflict with future restores.

### Known Issues
In some cases, after restoring the backup, Rancher logs will show errors similar to the following:
```
2021/10/05 21:30:45 [ERROR] error syncing 'c-89d82/m-4067aa68dd78': handler rke-worker-upgrader: clusters.management.cattle.io "c-89d82" not found, requeuing
```
This happens because one of the resources that was just restored has finalizers but the related resources have been deleted so the handler cannot find it.

To eliminate the errors, we need to find and delete the resource that causes the error. See more information [here](https://github.com/rancher/rancher/issues/35050#issuecomment-937968556)

In Rancher 2.5, under certain circumstances after restoring the backup, Rancher creates two default-tokens in each namespace:

```
kubectl get secret -A|grep default-token
c-gt5hn default-token-jmck8 kubernetes.io/service-account-token 3 85m
c-gt5hn default-token-ss54l kubernetes.io/service-account-token 3 85m
c-plt7m default-token-qnwxt kubernetes.io/service-account-token 3 85m
c-plt7m default-token-v75f7 kubernetes.io/service-account-token 3 85m
```

This has been fixed in Rancher 2.6.4. See more information [here]
(https://github.com/rancher/backup-restore-operator/issues/165#issuecomment-1079475984)

As a workound, you can use the following script, which removes the redundant restored default-token- secrets from restored Namespaces.

```bash
#!/bin/bash
#Get namespace list
namespaces=$(kubectl get namespaces --no-headers=true -o custom-columns=":metadata.name")
#For namespace in list
for namespace in $namespaces; do
  #Get default-token- secrets
  defaultTokens=$(kubectl -n $namespace get secrets --field-selector type=kubernetes.io/service-account-token --no-headers=true -o custom-columns=":metadata.name" | grep default-token)
  #Get default service account tokens
  defaultServiceAccountTokens=$(kubectl -n $namespace get serviceaccount default -o jsonpath={.secrets} | jq -r .[].name)
  #For secret in default-token- secret list
  for token in $defaultTokens; do
    #if secret not in default service account tokens
    if ! grep -q "$token" <<< $defaultServiceAccountTokens; then
      # delete service account token
      echo "Deleting $token in $namespace"
      kubectl -n $namespace delete secret $token
    fi
  done
done
```


