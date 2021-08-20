---
title: Ingress Rule Configuration
description: Ingress configuration 
weight: 9999
---

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
>**Note:** You must have an SSL certificate that the ingress can use to encrypt/decrypt communications. For more information see [Adding SSL Certificates]({{<baseurl>}}/rancher/v2.6/en/k8s-in-rancher/certificates/).

1. Click **Add Certificate**.
1. Select a **Certificate** from the drop-down list.
1. Enter the **Host** using encrypted communication.
1. To add additional hosts that use the certificate, click **Add Hosts**.

### Labels and Annotations

Add [Labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) and/or [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) to provide metadata for your ingress.

For a list of annotations available for use, see the [Nginx Ingress Controller Documentation](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/).