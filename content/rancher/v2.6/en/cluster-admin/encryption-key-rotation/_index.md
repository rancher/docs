---
title: Encryption Key Rotation
weight: 2043
---

### RKE1 Encryption Key Rotation

1. Enable encryption key rotation with either of the following two options:

    - Select the `Enabled` radio button in the Rancher UI under **Cluster Options > Advanced Options > Secrets Encryption**:

    ![Enable Encryption Key Rotation]({{< baseurl >}}/img/rancher/rke1-enable-secrets-encryption.png)

    - OR, apply the following YAML:

    ```
    rancher_kubernetes_engine_config:
      services:
        kube_api:
          secrets_encryption_config:
            enabled: true
    ```        

2. Rotate keys in the Rancher UI:

    2.1. Click **☰ > Cluster Management**.

    2.2. Select **⋮ > Rotate Encryption Keys** on the far right of the screen next to your chosen cluster:

    ![Encryption Key Rotation]({{< baseurl >}}/img/rancher/rke1-encryption-key.png)

   

### RKE2 Encryption Key Rotation

_**New in v2.6.7**_

>**Important:** Encryption key rotation is enabled by default and cannot be disabled. 

To rotate keys in the Rancher UI:

1. Click **☰ > Cluster Management**.

1. Select **⋮ > Rotate Encryption Keys** on the far right of the screen next to your chosen cluster:

    ![Encryption Key Rotation]({{< baseurl >}}/img/rancher/rke2-encryption-key.png)


>**Note:** For more information on RKE2 secrets encryption config, please see the [RKE2 docs](https://docs.rke2.io/security/secrets_encryption/).