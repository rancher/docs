---
title: API Keys
weight: 2400
draft: true
---

## API Keys

Access to the Rancher API requires API keys. You need to first obtain API keys before you can use the Rancher CLI or write a program to call the Rancher API.

### API Keys and User Authentication

After loggin in, authenticated user can generate API keys for accessing Rancher later on. API keys are typically assigned to an application or a project. It is safer to distribute API keys than passwords. The user can revoke access by deleting the API key.

### API Key Creation

You can create an API key from the UI by clicking the user icon on the top right corner and selecting the "API & Keys" menu item.

1. Click the "Add Key" button on the top of the page.
2. Provide a description of the API key and select an expiration period. For maximum security select as short an expiration period as possible.
3. Click "Create" and you will see the API endpoint, access key, secret key, and the bearer token printed on the screen. Bearer token is simply a concatenation of access key and secret key. You need to take note of the information on this screen. Once the screen is dismissed, you will not be able to recover the tokens and keys.

### Delete API Keys

A good practice is to set expiration period as short as possible. You can always delete API keys you no longer need or have been compromised.
