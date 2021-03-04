---
title: Setting up a MySQL Database in Amazon RDS
weight: 4
aliases:
  - /rancher/v2.5/en/installation/options/rds
---
This tutorial describes how to set up a MySQL database in Amazon's RDS.

This database can later be used as an external datastore for a high-availability K3s Kubernetes cluster.

1. Log into the [Amazon AWS RDS Console](https://console.aws.amazon.com/rds/) to get started. Make sure to select the **Region** where your EC2 instances (Linux nodes) are created.
1. In the left panel, click **Databases.**
1. Click **Create database.**
1. In the **Engine type** section, click **MySQL.**
1. In the **Version** section, choose **MySQL 5.7.22.**
1. In **Settings** section, under **Credentials Settings,** enter a master password for the **admin** master username. Confirm the password.
1. Expand the **Additional configuration** section. In the **Initial database name** field, enter a name. The name can have only letters, numbers, and underscores. This name will be used to connect to the database.
1. Click **Create database.**

You'll need to capture the following information about the new database so that the K3s Kubernetes cluster can connect to it.

To see this information in the Amazon RDS console, click **Databases,** and click the name of the database that you created.

- **Username:** Use the admin username.
- **Password:** Use the admin password.
- **Hostname:** Use the **Endpoint** as the hostname. The endpoint is available in the **Connectivity & security** section.
- **Port:** The port should be 3306 by default. You can confirm it in the **Connectivity & security** section.
- **Database name:** Confirm the name by going to the **Configuration** tab. The name is listed under **DB name.**

This information will be used to connect to the database in the following format:

```
mysql://username:password@tcp(hostname:3306)/database-name
```

For more information on configuring the datastore for K3s, refer to the [K3s documentation.]({{<baseurl>}}/k3s/latest/en/installation/datastore/)
