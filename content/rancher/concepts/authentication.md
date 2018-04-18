# Authentication

One of the key features that {{< product >}} adds to Kubernetes is enhanced user authentication.

By default, Kubernetes has some authentication shortcomings. Namely, users and groups are tied to the two scopes that Kubernetes uses to group resources: global and namespace. These scopes make it difficult to manage users and groups across different clusters and namespaces. Kubenetes allows integration with other authentication providers that work around these issues using plugins. However, this integration is not available to those leveraging cloud-based Kubenetes offerings such as Google Container Engine (GKE).

Rancher improves on Kubernetes authentication by integrating external authentication. Out-of-the-box, Rancher provides integration with the following authentication services:

	-	Microsoft Active Directory
	-	GitHub

## External vs. Local Authentication
