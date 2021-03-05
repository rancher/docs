---
title: Adding Ingresses to Your Project
description: Ingresses can be added for workloads to provide load balancing, SSL termination and host/path-based routing. Learn how to add Rancher ingress to your project
weight: 3042
aliases:
  - /rancher/v2.5/en/tasks/workloads/add-ingress/
  - /rancher/v2.5/en/k8s-in-rancher/load-balancers-and-ingress/ingress  
---

Ingress can be added for workloads to provide load balancing, SSL termination and host/path based routing. When using ingresses in a project, you can program the ingress hostname to an external DNS by setting up a Global DNS entry.

1. From the **Global** view, open the project that you want to add ingress to.
1. Click **Resources** in the main navigation bar. Click the **Load Balancing** tab. Then click **Add Ingress**.
1. Enter a **Name** for the ingress.
1. Select an existing **Namespace** from the drop-down list. Alternatively, you can create a new namespace on the fly by clicking **Add to a new namespace**.
1. Create ingress forwarding **Rules**. For help configuring the rules, refer to [this section.](#ingress-rule-configuration) If any of your ingress rules handle requests for encrypted ports, add a certificate to encrypt/decrypt communications.
1. **Optional:** click **Add Rule** to create additional ingress rules. For example, after you create ingress rules to direct requests for your hostname, you'll likely want to create a default backend to handle 404s. 

**Result:** Your ingress is added to the project. The ingress begins enforcing your ingress rules.


# Ingress Rule Configuration

- [Automatically generate a xip.io hostname](#automatically-generate-a-xip-io-hostname)
- [Specify a hostname to use](#specify-a-hostname-to-use)
- [Use as the default backend](#use-as-the-default-backend)
- [Certificates](#certificates)
- [Labels and Annotations](#labels-and-annotations)

### Automatically generate a xip.io hostname

If you choose this option, ingress routes requests to hostname to a DNS name that's automatically generated. Rancher uses [xip.io](http://xip.io/) to automatically generates the DNS name. This option is best used for testing, _not_ production environments.

>**Note:** To use this option, you must be able to resolve to `xip.io` addresses.

1. Add a **Target Backend**. By default, a workload is added to the ingress, but you can add more targets by clicking either **Service** or **Workload**.
1. **Optional:** If you want specify a workload or service when a request is sent to a particular hostname path, add a **Path** for the target. For example, if you want requests for `www.mysite.com/contact-us` to be sent to a different service than `www.mysite.com`, enter `/contact-us` in the **Path** field. Typically, the first rule that you create does not include a path.
1. Select a workload or service from the **Target** drop-down list for each target you've added.
1. Enter the **Port** number that each target operates on.

### Specify a hostname to use

If you use this option, ingress routes requests for a hostname to the service or workload that you specify.

1. Enter the hostname that your ingress will handle request forwarding for. For example, `www.mysite.com`.
1. Add a **Target Backend**. By default, a workload is added to the ingress, but you can add more targets by clicking either **Service** or **Workload**.
1. **Optional:** If you want specify a workload or service when a request is sent to a particular hostname path, add a **Path** for the target. For example, if you want requests for `www.mysite.com/contact-us` to be sent to a different service than `www.mysite.com`, enter `/contact-us` in the **Path** field. Typically, the first rule that you create does not include a path.
1. Select a workload or service from the **Target** drop-down list for each target you've added.
1. Enter the **Port** number that each target operates on.

### Use as the default backend

Use this option to set an ingress rule for handling requests that don't match any other ingress rules. For example, use this option to route requests that can't be found to a `404` page.

>**Note:** If you deployed Rancher using RKE, a default backend for 404s and 202s is already configured.

1. Add a **Target Backend**. Click either **Service** or **Workload** to add the target.
1. Select a service or workload from the **Target** drop-down list.

### Certificates
>**Note:** You must have an SSL certificate that the ingress can use to encrypt/decrypt communications. For more information see [Adding SSL Certificates]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/certificates/).

1. Click **Add Certificate**.
1. Select a **Certificate** from the drop-down list.
1. Enter the **Host** using encrypted communication.
1. To add additional hosts that use the certificate, click **Add Hosts**.

### Labels and Annotations

Add [Labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) and/or [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) to provide metadata for your ingress.

For a list of annotations available for use, see the [Nginx Ingress Controller Documentation](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/).