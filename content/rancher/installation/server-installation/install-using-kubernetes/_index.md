---
title: Install Using Kubernetes
weight: 275
---
# Install Using Kubernetes

You can deploy Rancher using the Rancher Kubernetes Engine (RKE). RKE is Rancher's own fast and light-weight Kubernetes installer. Rancher installation using RKE is the best install option for two different use cases:

- When installing Rancher on a Kubernettes cluster that is already running.

- When you want to set up a new production Kubernettes cluster running in a high-availablity configuration.


## Objectives

We've broken installation of Rancher by RKE into a series of smaller tasks. Here's what you'll do during your RKE install.

1. [Provision Linux Hosts](#provision-linux-hosts)

	Begin by provisioning Linux hosts or an existing Kubernettes cluster. Make sure your hosts meet Rancher requirements.

2. [Get RKE](#get-rke)

	Download the RKE installer from GitHub.

3. [Get YAML Template](#get-yaml-template)

	During installation, the RKE uploads a `.yml` config file containing specifications for your cluster. You'll have to configure this file. We have a variety of config file templates available for download.

4. [Edit YAML Template](#edit-yaml-template)

	After you download a config file template, edit it according to how you want to configure Rancher and your Kubernetes cluster.

5. [Run RKE](#run-rke)

	Finally, run the RKE installer with it pointing toward your config file.

### Provision Linux Hosts

Before you install Rancher, confirm you meet the requirements.

- If you want to install Rancher on a Kubernettes cluster that's already running, make sure its nodes meet the requirements below.

- If you want to install Rancher on a new Kubernettes cluster in a high-availabilty configuration, provision three new Linux hosts using the requirements below.

#### Requirements

{{< requirements_os >}}

{{< requirements_hardware >}}

{{< requirements_software >}}

{{< requirements_ports >}}

{{< requirements_ha >}}

### Get RKE

Rancher Kubernetes Engine (RKE) is a fast, versatile Kubernetes installer you can use to install Kubernetes on your Linux hosts. You can download RKE from GitHub.

1. From your workstation, open a web browser and navigate to [https://github.com/rancher/rke/releases](https://github.com/rancher/rke/releases). Download the latest RKE installer.

2. Make the RKE binary that you just downloaded executable. Open Terminal, change directory to the location of the RKE binary, and then run the following command:

    ```
    $ chmod +x rke
    ```

    >**Note:** adjust the command for the version of RKE that you downloaded (e.g., `rke_darwin-amd64`)

3.  Confirm that RKE is now executable by running the following command:

    ```
    $ ./rke -version
    ```

**Result:** You receive output similar to what follows:
```
rke version v<N.N.N>
```

### Get YAML Template

During installation, RKE uploads a `.yml` config file to install and configure your Kubernetes cluster. Download one of the `.yml` templates that we provide to get you started. Choose a template based on how many nodes are in your cluster and the type of certificate you plan on using:

- Auto-Generated Self-Signed Certifcates (i.e. SSL passthrough):

	- [3-node-passthrough.yml]({{< baseurl >}}/rke-yml/3-node-passthrough.yml)
	- [5-node-passthrough.yml]({{< baseurl >}}/rke-yml/5-node-passthrough.yml)
	- [7-node-passthrough.yml]({{< baseurl >}}/rke-yml/7-node-passthrough.yml)
<br/>
<br/>
- Bring Your Own Certificate (either CA- or Self-Signed):

	- [3-node-certificate.yml]({{< baseurl >}}/rke-yml/3-node-certificate.yml)
	- [5-node-certificate.yml]({{< baseurl >}}/rke-yml/5-node-certificate.yml)
	- [7-node-certificate.yml]({{< baseurl >}}/rke-yml/7-node-certificate.yml)

### Edit YAML Template

Once you have a template, customize it to suit your needs.

1. Open the `.yml` file that you just downloaded.

2. Update the `nodes` section with your [Linux hosts](#provision-linux-hosts).

	1. For each node in your cluster, update the following placeholders:

		- `<IP>`: The IP address or hostname of the node.
		- `<USER>`: The node root user (usually `root`).
		- `<PEM_FILE>`: The path of the `.pem` file used to authenticate.

	2. For each node in your cluster, choose what roles each node should fill. Delete any roles that aren't needed on the node.

    **Example YAML**

		nodes:
		  - address: <IP> # IP to access nodes
			user: <USER> # root user (usually 'root')
			role: [controlplane,etcd,worker] # K8s roles for node
			ssh_key_path: <PEM_FILE> # path to PEM file
		  - address: <IP>
			user: <USER>
			role: [controlplane,etcd,worker]
			ssh_key_path: <PEM_FILE>
		  - address: <IP>
			user: <USER>
			role: [controlplane,etcd,worker]
			ssh_key_path: <PEM_FILE>

3. Scroll to `kind: Ingress`. Replace the two `<FQDN>` placeholders with the FQDN mapped to each IP address for `controlplane` and/or `worker` nodes on your DNS. On your DNS Server, each node should be added to the DNS entry for the FQDN.

	**Example YAML**

		spec:
		  rules:
		  - host: <FQDN>  # FQDN to access cattle server
			http:
			  paths:
			  - backend:
				  serviceName: cattle-service
				  servicePort: 80
		  tls:
		  - secretName: cattle-keys-ingress
			hosts:
			- <FQDN>      # FQDN to access cattle server


    >**Using Auto-Generated Self-Signed Certificates?**
    >
    >The next two steps don't apply to you. Save the `.yml` config file and continue to [Run RKE](#run-rke).

4. **Bring Your Own Certificate only:** Scroll to the codeblock that follows.

    ```
    apiVersion: v1
    kind: Secret
    metadata:
      name: cattle-keys-server
      namespace: cattle-system
    type: Opaque
    data:
      cert.pem: <BASE64_CRT>    # ssl cert for cattle server.
      key.pem: <BASE64_KEY>     # ssl key for cattle server.
      cacerts.pem: <BASE64_CA>  # CA cert used to sign cattle server cert and key
    ```

    Replace each placeholder with the applicable `.pem`.

    - `<BASE64_CRT>`
    - `<BASE64_KEY>`
    - `<BASE64_CA>`

	>**Important:**
    >
    >   - Each `.pem` must be in base-64: `cat <PEM_FILE> | base64`
    >   - If you're using a self-signed certificate, the `cattle-keys-server` in this step and `cattle-keys-ingress` in the next step must use certificates and keys signed by the same CA.

5. **Bring Your Own Certificate only:** Scroll to the codeblock that follows.

    ```
    apiVersion: v1
    kind: Secret
    metadata:
      name: cattle-keys-ingress
      namespace: cattle-system
    type: Opaque
    data:
      tls.crt: <BASE64_CRT>  # ssl cert for ingress. If selfsigned, must be signed by same CA as cattle server
      tls.key: <BASE64_KEY>  # ssl key for ingress. If selfsigned, must be signed by same CA as cattle server
    ```

    Replace each placeholder with the applicable `.pem`.

    - `<BASE64_CRT>`
    - `<BASE64_KEY>`


    >**Reminder:**
    >
    >   - Each `.pem` must be in base-64: `cat <PEM_FILE> | base64`
    >   If you're using a self-signed certificate, the `cattle-keys-server` from last step and `cattle-keys-ingress` from this step must use certificates and keys signed by the same CA.

6. Save the `.yml` file and close it.

### Run RKE

Enter the command to run RKE while pointing to your `.yml` file. RKE will install Kubernetes and Rancher using your parameters.

1. From your workstation, make sure your `.yml` config file and RKE are in the same directory.

2. Open a Terminal instance. Change to the directory that contains your config file and RKE.

3. Enter the following command, replacing the placeholder name with the name of the `.yml` config template that you used.

	```
	rke up --config <YAML_TEMPLATE>
	```

### What's Next?

Log in to Rancher to make sure it deployed successfully. Open a web browser and navigate to the FQDN used earlier in this procedure.
