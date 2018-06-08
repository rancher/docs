---
title: Miscellaneous Tasks
weight: 3725
draft: true
---
<!-- Coming Soon

## Deleting a Node Template

Coming Soon -->

Because sometimes there's just no logical place `¯\_(ツ)_/¯`.

### Creating an API Key

Create a Rancher API key so that other applications can make requests to the Rancher API. You can create API keys using the Rancher UI.

1. From any Rancher view, select **User Avatar** > **API & Keys** from the menu on the upper-right.

2. Click **Add Key**.

3. **Optional:** Enter a description for the API key and select an expiration period.

    Shorter expiration periods are more secure.

4. Click **Create**.

    **Step Result:** Your API Key is created. Your API **Endpoint**, **Access Key**, **Secret Key**, and **Bearer Token** are displayed. The **Bearer Token** is your **Access Key** and **Secret Key** concatenated together.

5. Copy the information displayed to a secure location. This information is only displayed once, so if you lose your key, you'll have to make a new one.

### Deleting API Keys

As a security best practice, we recommend using the minimum viable expiration period. You should delete API keys:

- That have expired.
- That may have been compromised.

To delete an API, select the stale key and click **Delete**.