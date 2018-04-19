# Authentication

One of the key features that {{< product >}} adds to Kubernetes is centralized user authentication. This feature allows your users to use one set of credentials to authenticate with any of your Kubernetes clusters.

This centralized user authentication is accomplished using the {{< product >}} authentication proxy, which is installed with the rest of {{< product >}}. This proxy authenticates your users and forwards their requests to your Kubernetes clusters using a service account.

## External vs. Local Authentication

The {{< product >}} authentication proxy integrates with the following external authentication services.

	-	Microsoft Active Directory
	-	GitHub

However, {{< product >}} also provides local authentication.

In most cases, you should use an external authentication service over local, as external authentication allows user management from a central location. However, you may want a few local authentication accounts for managing {{< product >}} under rare circumstances, such as if Active Directory is down.
