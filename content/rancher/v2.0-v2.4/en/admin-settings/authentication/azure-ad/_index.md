---
title: Configuring Azure AD
weight: 1115
aliases:
    - /rancher/v2.0-v2.4/en/tasks/global-configuration/authentication/azure-ad/
---

_Available as of v2.0.3_

If you have an instance of Active Directory (AD) hosted in Azure, you can configure Rancher to allow your users to log in using their AD accounts. Configuration of Azure AD external authentication requires you to make configurations in both Azure and Rancher.

>**Note:** Azure AD integration only supports Service Provider initiated logins.

>**Prerequisite:** Have an instance of Azure AD configured.

>**Note:** Most of this procedure takes place from the [Microsoft Azure Portal](https://portal.azure.com/).

## Azure Active Directory Configuration Outline

Configuring Rancher to allow your users to authenticate with their Azure AD accounts involves multiple procedures. Review the outline below before getting started.

<a id="tip"></a>

>**Tip:** Before you start, we recommend creating an empty text file. You can use this file to copy values from Azure that you'll paste into Rancher later.

<!-- TOC -->

- [1. Register Rancher with Azure](#1-register-rancher-with-azure)
- [2. Create a new client secret](#2-create-a-new-client-secret)
- [3. Set Required Permissions for Rancher](#3-set-required-permissions-for-rancher)
- [4. Add a Reply URL](#4-add-a-reply-url)
- [5. Copy Azure Application Data](#5-copy-azure-application-data)
- [6. Configure Azure AD in Rancher](#6-configure-azure-ad-in-rancher)

<!-- /TOC -->

### 1. Register Rancher with Azure

Before enabling Azure AD within Rancher, you must register Rancher with Azure.

1. Log in to [Microsoft Azure](https://portal.azure.com/) as an administrative user. Configuration in future steps requires administrative access rights.

1. Use search to open the **App registrations** service.

    ![Open App Registrations]({{<baseurl>}}/img/rancher/search-app-registrations.png)

1. Click **New registrations** and complete the **Create** form.

    ![New App Registration]({{<baseurl>}}/img/rancher/new-app-registration.png)

    1. Enter a **Name** (something like `Rancher`).

    1. From **Supported account types**, select "Accounts in this organizational directory only (AzureADTest only - Single tenant)" This corresponds to the legacy app registration options.

    1. In the **Redirect URI** section, make sure **Web** is selected from the dropdown and enter the URL of your Rancher Server in the text box next to the dropdown. This Rancher server URL should be appended with the verification path: `<MY_RANCHER_URL>/verify-auth-azure`.

       >**Tip:** You can find your personalized Azure reply URL in Rancher on the Azure AD Authentication page (Global View > Security Authentication > Azure AD).

    1. Click **Register**.

>**Note:** It can take up to five minutes for this change to take affect, so don't be alarmed if you can't authenticate immediately after Azure AD configuration.

### 2. Create a new client secret

From the Azure portal, create a client secret. Rancher will use this key to authenticate with Azure AD.

1. Use search to open **App registrations** services. Then open the entry for Rancher that you created in the last procedure.

     ![Open Rancher Registration]({{<baseurl>}}/img/rancher/open-rancher-app.png)

1. From the navigation pane on left, click **Certificates and Secrets**.

1. Click **New client secret**.

     ![Create new client secret]({{< baseurl >}}/img/rancher/select-client-secret.png)

    1. Enter a **Description** (something like `Rancher`).

    1. Select duration for the key from the options under **Expires**. This drop-down sets the expiration date for the key. Shorter durations are more secure, but require you to create a new key after expiration.

    1. Click **Add** (you don't need to enter a value—it will automatically populate after you save).
<a id="secret"></a>

1.  Copy the key value and save it to an [empty text file](#tip).

    You'll enter this key into the Rancher UI later as your **Application Secret**.

    You won't be able to access the key value again within the Azure UI.

### 3. Set Required Permissions for Rancher

Next, set API permissions for Rancher within Azure.

1. From the navigation pane on left, select **API permissions**.

    ![Open Required Permissions]({{<baseurl>}}/img/rancher/select-required-permissions.png)

1. Click **Add a permission**.

1. From the **Azure Active Directory Graph**, select the following **Delegated Permissions**:

    ![Select API Permissions]({{< baseurl >}}/img/rancher/select-required-permissions-2.png)

    <br/>
    <br/>
    - **Access the directory as the signed-in user**
    - **Read directory data**
    - **Read all groups**
    - **Read all users' full profiles**
    - **Read all users' basic profiles**
    - **Sign in and read user profile**

1. Click **Add permissions**.

1. From **API permissions**, click **Grant admin consent**. Then click **Yes**.

    >**Note:** You must be signed in as an Azure administrator to successfully save your permission settings.


### 4. Add a Reply URL

To use Azure AD with Rancher you must whitelist Rancher with Azure. You can complete this whitelisting by providing Azure with a reply URL for Rancher, which is your Rancher Server URL followed with a verification path.


1. From the **Setting** blade, select **Reply URLs**.

    ![Azure: Enter Reply URL]({{<baseurl>}}/img/rancher/enter-azure-reply-url.png)

1. From the **Reply URLs** blade, enter the URL of your Rancher Server, appended with the verification path: `<MY_RANCHER_URL>/verify-auth-azure`.

       >**Tip:** You can find your personalized Azure reply URL in Rancher on the Azure AD Authentication page (Global View > Security Authentication > Azure AD).

1. Click **Save**.

**Result:** Your reply URL is saved.

>**Note:** It can take up to five minutes for this change to take affect, so don't be alarmed if you can't authenticate immediately after Azure AD configuration.

### 5. Copy Azure Application Data

As your final step in Azure, copy the data that you'll use to configure Rancher for Azure AD authentication and paste it into an empty text file.

1. Obtain your Rancher **Tenant ID**.

    1. Use search to open the **Azure Active Directory** service.

         ![Open Azure Active Directory]({{<baseurl>}}/img/rancher/search-azure-ad.png)

    1. From the left navigation pane, open **Overview**.

    2. Copy the **Directory ID** and paste it into your [text file](#tip).

        You'll paste this value into Rancher as your **Tenant ID**.

1. Obtain your Rancher **Application ID**.

    1. Use search to open **App registrations**.

         ![Open App Registrations]({{<baseurl>}}/img/rancher/search-app-registrations.png)

    1. Find the entry you created for Rancher.

    1. Copy the **Application ID** and paste it to your [text file](#tip).

1. Obtain your Rancher **Graph Endpoint**, **Token Endpoint**, and **Auth Endpoint**.

    1. From **App registrations**, click **Endpoints**.

        ![Click Endpoints]({{<baseurl>}}/img/rancher/click-endpoints.png)

    2. Copy the following endpoints to your clipboard and paste them into your [text file](#tip) (these values will be your Rancher endpoint values).
    
        - **Microsoft Graph API endpoint** (Graph Endpoint)
        - **OAuth 2.0 token endpoint (v1)** (Token Endpoint)
        - **OAuth 2.0 authorization endpoint (v1)** (Auth Endpoint)
        
>**Note:** Copy the v1 version of the endpoints

### 6. Configure Azure AD in Rancher

From the Rancher UI, enter information about your AD instance hosted in Azure to complete configuration.

Enter the values that you copied to your [text file](#tip).

1. Log into Rancher. From the **Global** view, select **Security > Authentication**.

1. Select **Azure AD**.

1. Complete the **Configure Azure AD Account** form using the information you copied while completing [Copy Azure Application Data](#5-copy-azure-application-data).

    >**Important:** When entering your Graph Endpoint, remove the tenant ID from the URL, like below.
    >
    ><code>http<span>s://g</span>raph.windows.net/<del>abb5adde-bee8-4821-8b03-e63efdc7701c</del></code>

    The following table maps the values you copied in the Azure portal to the fields in Rancher.

    | Rancher Field      | Azure Value                           |
    | ------------------ | ------------------------------------- |
    | Tenant ID          | Directory ID                          |
    | Application ID     | Application ID                        |
    | Application Secret | Key Value                             |
    | Endpoint           | https://login.microsoftonline.com/    |
    | Graph Endpoint     | Microsoft Azure AD Graph API Endpoint |
    | Token Endpoint     | OAuth 2.0 Token Endpoint              |
    | Auth Endpoint      | OAuth 2.0 Authorization Endpoint      |

1. Click **Authenticate with Azure**.

**Result:** Azure Active Directory authentication is configured.
