---
title: API Keys
weight: 7005
aliases:
  - /rancher/v2.x/en/concepts/api-keys/
  - /rancher/v2.x/en/tasks/user-settings/api-keys/
---

Some users may want to access their Rancher clusters and projects through the Rancher API. Before you can access Rancher through the API, you must generate API keys so that you can authenticate with Rancher externally.

Before you can use the Rancher CLI or write a program that calls the Rancher API, you must obtain API keys using the Rancher UI.

### API Keys and User Authentication

After logging into Rancher, you can generate API keys for accessing Rancher externally using your user settings. If you need to revoke access to the Rancher API, you can delete the API key.

### Creating an API Key
Create a Rancher API key so that other applications can make requests to the Rancher API. You can create API keys using the Rancher UI.

1. From any Rancher view, select **User Avatar** > **API & Keys** from the menu on the upper-right.

2. Click **Add Key**.

3. **Optional:** Enter a description for the API key and select an expiration period. We recommend setting an expiration date.

    The API key won't be valid after expiration. Shorter expiration periods are more secure.

4. Click **Create**.

    **Step Result:** Your API Key is created. Your API **Endpoint**, **Access Key**, **Secret Key**, and **Bearer Token** are displayed. The **Bearer Token** is your **Access Key** and **Secret Key** concatenated together.

    Use the **Bearer Token** to authenticate with Rancher CLI.

5. Copy the information displayed to a secure location. This information is only displayed once, so if you lose your key, you'll have to make a new one.

### Deleting API Keys

You should delete API keys:

- That may have been compromised.
- That have expired.

To delete an API, select the stale key and click **Delete**.
