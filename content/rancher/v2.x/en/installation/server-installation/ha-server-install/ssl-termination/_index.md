---
title: SSL Termination
weight: 275
---
# High Availability Install with SSL Temination

In this scenario, your Load Balancer handles all SSL decryption, and then forwards the decrypted communications to your cluster.

## Objectives

We've broken installation of Rancher with SSL termination into a series of smaller tasks. Here's what you'll do during your install.

1. [Provision Linux Hosts](#provision-linux-hosts)

	Begin by provisioning Linux hosts. Make sure your hosts meet Rancher requirements.

2. [Get RKE](#get-rke)

	Download the Rancher Kubernetes Engine (RKE) installer from GitHub.

3. [Get YAML Template](#get-yaml-template)

	During installation, RKE uses a `.yml` config file containing specifications for your cluster. Download our template from GitHub.

4. [Edit YAML Template](#edit-yaml-template)

	Edit the `.yml` config file so that it's pointing toward your Linux hosts.

5. [Run RKE](#run-rke)

	Finally, run the RKE installer with it pointing toward your `.yml` config file.

### Provision Linux Hosts

Before you install Rancher, confirm you meet the requirements. Provision three new Linux hosts using the requirements below.

#### Requirements

{{< requirements_os >}}

{{< requirements_hardware >}}

{{< requirements_software >}}

{{< requirements_ports >}}

##### Certificate Requirements

Before starting this procedure, you should generate or obtain your own certificate.

The certificate can either be:

- Self-signed
- Signed by a certificate authority (CA)

>**Note:**
>-If you use a self-signed certificate, all certificates and keys must be signed by the same CA.<br/>
>-Each `.pem` must be in base-64: `cat <PEM_FILE> | base64`.



### Get RKE

Rancher Kubernetes Engine (RKE) is a fast, versatile Kubernetes installer that you can use to install Kubernetes on your Linux hosts. You can download RKE from GitHub.

1. From your workstation, open a web browser and navigate to our [RKE Releases](https://github.com/rancher/rke/releases) page. Download the latest RKE installer.

2. Make the RKE binary that you just downloaded executable. Open Terminal, change directory to the location of the RKE binary, and then run the following command:

    ```
    $ chmod +x rke
    ```

    >**Note:** Adjust the command for the version of RKE that you downloaded (e.g., `rke_darwin-amd64`)

3.  Confirm that RKE is now executable by running the following command:

    ```
    $ ./rke -version
    ```

**Result:** You receive output similar to what follows:
```
rke version v<N.N.N>
```

### Get YAML Template

During installation, RKE uses a `.yml` config file to install and configure your Kubernetes cluster. Download the `3-node-certificate.yml` config file linked below to get you started.

[Download 3-node-certificate.yml](https://github.com/rancher/rancher/tree/master/rke-templates)

### Edit YAML Template

Once you have the `.yml` config file template, edit the nodes section to point toward your Linux hosts.

1. Open `3-node-certificate.yml`, which you just downloaded.

2. Update the `nodes` section with your [Linux hosts](#provision-linux-hosts).

	For each node in your cluster, update the following placeholders:

	- `<IP>`: The IP address or hostname of the node.
	- `<USER>`: The node root user (usually `root`).
	- `<PEM_FILE>`: The path of the `.pem` file used to authenticate.

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

3. Scroll to `kind: Ingress`. Replace the two `<FQDN>` placeholders with the FQDN mapped to each of your nodes. On your DNS Server, each node should be added to the DNS entry for the FQDN.

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

4. Scroll to the codeblock that follows.

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

    Replace each placeholder with the applicable certificate `.pem`.

    - `<BASE64_CRT>`
    - `<BASE64_KEY>`
    - `<BASE64_CA>`

    >**Reminder:** Each `.pem` must be in base-64: `cat <PEM_FILE> | base64`.

5. Scroll to the codeblock that follows.

    ```
    apiVersion: v1
    kind: Secret
    metadata:
      name: cattle-keys-ingress
      namespace: cattle-system
    type: Opaque
    data:
      tls.crt: <BASE64_CRT>  # ssl cert for ingress. If self-signed, must be signed by same CA as cattle server
      tls.key: <BASE64_KEY>  # ssl key for ingress. If self-signed, must be signed by same CA as cattle server
    ```

    Replace each placeholder with the applicable `.pem`.

    - `<BASE64_CRT>`
    - `<BASE64_KEY>`


    >**Reminder:** Each `.pem` must be in base-64: `cat <PEM_FILE> | base64`.

6. Save the `.yml` file and close it.

### Run RKE

Enter the command to run RKE while pointing to `3-node-certificate.yml`. RKE installs Kubernetes and Rancher using your parameters.

1. From your workstation, make sure `3-node-certificate.yml` and RKE are in the same directory.

2. Open a Terminal instance. Change to the directory that contains `3-node-certificate.yml` and RKE.

3. Enter the following command.

	```
	rke up --config 3-node-certificate.yml
	```

### What's Next?

Log in to Rancher to make sure it deployed successfully. Open a web browser and navigate to the FQDN used earlier in this procedure.
