---
title: Elasticsearch
weight: 200
aliases:
  - /rancher/v2.x/en/tools/logging/elasticsearch/
---

If your organization uses [Elasticsearch](https://www.elastic.co/), either on premise or in the cloud, you can configure Rancher to send it Kubernetes logs. Afterwards, you can log into your Elasticsearch deployment to view logs.

>**Prerequisites:** Configure an [Elasticsearch deployment](https://www.elastic.co/guide/en/cloud/saas-release/ec-create-deployment.html).

## Elasticsearch Configuration

1. In the **Endpoint** field, enter the IP address and port of your Elasticsearch instance. You can find this information from the dashboard of your Elasticsearch deployment.

    * Elasticsearch usually uses port `9200` for HTTP and `9243` for HTTPS.

1. If you are using [X-Pack Security](https://www.elastic.co/guide/en/x-pack/current/xpack-introduction.html), enter your Elasticsearch **Username** and **Password** for authentication.

1. Enter an [Index Pattern](https://www.elastic.co/guide/en/kibana/current/index-patterns.html).

## SSL Configuration

If your instance of Elasticsearch uses SSL, your **Endpoint** will need to begin with `https://`. With the correct endpoint, the **SSL Configuration** form is enabled and ready to be completed.

1. Provide the **Client Private Key** and **Client Certificate**. You can either copy and paste them or upload them by using the **Read from a file** button.

    - You can use either a self-signed certificate or one provided by a certificate authority.

    - You can generate a self-signed certificate using an openssl command. For example:

         ```
         openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
         ```
         
1. Enter your **Client Key Password**.

1. Enter your **SSL Version**. The default version is `TLSv1_2`.

1. Select whether or not you want to verify your SSL. If the **Enabled - Input trusted server certificate** option is selected, a certificate section is enabled. You can copy and paste the certificate or upload it using the **Read from a file** button.

    * If you are using a self-signed certificate, provide the **CA Certificate PEM**.  
    * If you are using a certificate from a certificate authority, provide your **Trusted Server Certificate Chain**.
