---
title: "Rolling back to v2.0.0-v2.1.5"
weight: 1
---

> Rolling back to Rancher v2.0-v2.1 is no longer supported. The instructions for rolling back to these versions are preserved here and are intended to be used only in cases where upgrading to Rancher v2.2+ is not feasible.

If you are rolling back to versions in either of these scenarios, you must follow some extra instructions in order to get your clusters working.

- Rolling back from v2.1.6+ to any version between v2.1.0 - v2.1.5 or v2.0.0 - v2.0.10.
- Rolling back from v2.0.11+ to any version between v2.0.0 - v2.0.10.  

Because of the changes necessary to address [CVE-2018-20321](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-20321), special steps are necessary if the user wants to roll back to a previous version of Rancher where this vulnerability exists. The steps are as follows:

1. Record the `serviceAccountToken` for each cluster.  To do this, save the following script on a machine with `kubectl` access to the Rancher management plane and execute it.  You will need to run these commands on the machine where the rancher container is running. Ensure JQ is installed before running the command. The commands will vary depending on how you installed Rancher.

    **Rancher Installed with Docker**
    ```
    docker exec <NAME OF RANCHER CONTAINER> kubectl get clusters -o json | jq '[.items[] | select(any(.status.conditions[]; .type == "ServiceAccountMigrated")) | {name: .metadata.name, token: .status.serviceAccountToken}]' > tokens.json
    ```

    **Rancher Installed on a Kubernetes Cluster**
    ```
    kubectl get clusters -o json | jq '[.items[] | select(any(.status.conditions[]; .type == "ServiceAccountMigrated")) | {name: .metadata.name, token: .status.serviceAccountToken}]' > tokens.json
    ```

2. After executing the command a `tokens.json` file will be created.  Important! Back up this file in a safe place.** You will need it to restore functionality to your clusters after rolling back Rancher.  **If you lose this file, you may lose access to your clusters.**

3. Rollback Rancher following the [normal instructions]({{<baseurl>}}/rancher/v2.x/en/upgrades/rollbacks/).

4. Once Rancher comes back up, every cluster managed by Rancher (except for Imported clusters) will be in an `Unavailable` state.

5. Apply the backed up tokens based on how you installed Rancher.

    **Rancher Installed with Docker**

    Save the following script as `apply_tokens.sh` to the machine where the Rancher docker container is running. Also copy the `tokens.json` file created previously to the same directory as the script.
    ```
    set -e

    tokens=$(jq .[] -c tokens.json)
    for token in $tokens; do
        name=$(echo $token | jq -r .name)
        value=$(echo $token | jq -r .token)

        docker exec $1 kubectl patch --type=merge clusters $name -p "{\"status\": {\"serviceAccountToken\": \"$value\"}}"
    done
    ```
     the script to allow execution (`chmod +x apply_tokens.sh`) and execute the script as follows:
    ```
    ./apply_tokens.sh <DOCKER CONTAINER NAME>
    ```
    After a few moments the clusters will go from Unavailable back to Available.

    **Rancher Installed on a Kubernetes Cluster**

    Save the following script as `apply_tokens.sh` to a machine with kubectl access to the Rancher management plane. Also copy the `tokens.json` file created previously to the same directory as the script.
    ```
    set -e

    tokens=$(jq .[] -c tokens.json)
    for token in $tokens; do
        name=$(echo $token | jq -r .name)
        value=$(echo $token | jq -r .token)

       kubectl patch --type=merge clusters $name -p "{\"status\": {\"serviceAccountToken\": \"$value\"}}"
    done
    ```
    Set the script to allow execution (`chmod +x apply_tokens.sh`) and execute the script as follows:
    ```
    ./apply_tokens.sh
    ```
    After a few moments the clusters will go from `Unavailable` back to `Available`.

6. Continue using Rancher as normal.