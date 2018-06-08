---
title: Creating an API Key
weight: 3726
---

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
