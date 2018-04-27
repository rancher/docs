---
title: High-Availability Installation
layout: single-docs
weight: 275
---

# High-Availability Installation <br/>(i.e. Multi-Node Installation)

In high-availability installations, Rancher is installed on multiple nodes of a Kubernetes cluster. This multi-node configuration ensures that Rancher server is always available, even if your primary Rancher server goes down.

## Provision Linux Hosts

1. Provision a minimum of three Linux hosts according to our {{ ref "server-requirements.md" }}
2. Add the hosts to your Domain Name System (DNS)—each host requires a fully qualified domain name (FQDN) for something you'll be doing later.

## Get RKE

Rancher Kubernetes Engine (RKE) is a fast, versatile Kubernetes installe you can use to install Kubernetes on your Linux hosts. You can download RKE from GitHub.

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

## Get YAML Template

During installation, RKE reads from a .yml file to install and configure your Kubernetes cluster. Download one of the `.yml` templates that we provide to get you started. Choose a template based on the type of certificate you plan on using:

- Auto-Generated Self-Signed Certifcates (i.e. SSL passthrough):
    [rancher-minimal-passthrough.yml](https://github.com/rancher/rke/blob/master/rancher-minimal-passthrough.yml)

- Bring Your Own Certificate (either CA- or Self-Signed):
    [rancher-minimal-ssl.yml](https://github.com/rancher/rke/blob/master/rancher-minimal-ssl.yml)

## Edit YAML Template

Once you have a template, customize it to suit your needs.

1. Open the `.yml` file that you just downloaded.

2. Update the `Nodes` section with your [Linux hosts](#provision-linux-hosts). Add an entry for each host.

    **Example:**

    ```
    nodes:
      - address: 159.65.99.240
        user: root
        role:
        - controlplane
        - etcd
        - worker
        ssh_key_path: /home/user/.ssh/id_rsa  #PATH TO PUBLIC KEY, I.E. PEM FILE
      - address: 206.189.168.116
        user: root
        role:
        - controlplane
        - etcd
        - worker
        ssh_key_path: /home/user/.ssh/id_rsa  #PATH TO PUBLIC KEY, I.E. PEM FILE
      - address: 206.189.168.31
        user: root
        role:
        - controlplane
        - etcd
        - worker
        ssh_key_path: /home/user/.ssh/id_rsa  #PATH TO PUBLIC KEY, I.E. PEM FILE
    ```

3. Scroll to `- host: <FQDN>  # FQDN to access cattle server`. Replace `<FQDN>` with the fully qualified domain name of each host you assigned the `controlplane` and/or `worker` role.

    **Example**

    ```
    - host: host-one.domain.com
      http:
        paths:
        - backend:
            serviceName: cattle-service
            servicePort: 443
    - host: host-two.domain.com
      http:
        paths:
        - backend:
            serviceName: cattle-service
            servicePort: 443
    - host: host-three.domain.com
      http:
        paths:
        - backend:
            serviceName: cattle-service
            servicePort: 443
    ```

    >**Using Auto-Generated Self-Signed Certificates?**
    >
    >The next two steps don't apply to you. Save the `.yml` file and continue to [Run RKE](#run-rke).

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

    >**Important:**
    >
    >   - Each `.pem` must be in base-64: `cat <PEM_FILE> | base64`
    >   - If you're using a self-signed certificate, both `cattle-keys-server` and `cattle-keys-ingress` must use certificates and keys signed by the same CA.

    - `<BASE64_CRT>`
    - `<BASE64_KEY>`
    - `<BASE64_CA>`

    **Example:**

    ```
    apiVersion: v1
    kind: Secret
    metadata:
      name: cattle-keys-server
      namespace: cattle-system
    type: Opaque
    data:
      cert.pem: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUZYVENDQkVXZ0F3SUJBZ0lKQU5QTE5EZnJoL2gzTUEwR0NTcUdTSWIzRFFFQkN3VUFNSUhHTVFzd0NRWUQKVlFRR0V3SlZVekVRTUE0R0ExVUVDQk1IUVhKcGVtOXVZVEVUTUJFR0ExVUVCeE1LVTJOdmRIUnpaR0ZzWlRFbApNQ01HQTFVRUNoTWNVM1JoY21acFpXeGtJRlJsWTJodWIyeHZaMmxsY3l3Z1NXNWpMakV6TURFR0ExVUVDeE1xCmFIUjBjRG92TDJObGNuUnpMbk4wWVhKbWFXVnNaSFJsWTJndVkyOXRMM0psY0c5emFYUnZjbmt2TVRRd01nWUQKVlFRREV5dFRkR0Z5Wm1sbGJHUWdVMlZqZFhKbElFTmxjblJwWm1sallYUmxJRUYxZEdodmNtbDBlU0F0SUVjeQpNQjRYRFRFM01EZ3hPREU0TVRnd01Wb1hEVEl3TURneE9ERTRNVEV3TUZvd1BURWhNQjhHQTFVRUN4TVlSRzl0CllXbHVJRU52Ym5SeWIyd2dWbUZzYVdSaGRHVmtNUmd3RmdZRFZRUUREQThxTG5KaGJtTm9aWEl1YzNCaFkyVXcKZ2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLQW9JQkFRRFF6aW81TDhMYTFya0ZFQVR4SXZBbQpVdTJHUnYwQVZsZTI2RjdsN3I1VEhoUDZPUWZUK2R2S01hU3Q3aWEyK3VuZEl3cGlkWENGLy9TVklXTEsxKzFQCmZ1blFaQy8yaUhnQ1N0Smk2U0JHUXFhekFrVUhpOG1oMVVCUHdkNmtBTi9KNGtCWEJ5aGxtZGRzT2hDeXpuSTgKTE5RdzBFeDcyUEZRMnh1Qm9KNWIvOEdCMnhkMC8yU0V0bmdmaWFzTk9wOEYxY2JQSVpGdm5FMDlaR3ljWWszSgpUSU9NdjNXME9xYVg4OEQ3K29oM0R0V05Bc0Jlc01ZVlBhUmxyTkJhUXFjemg3VEhZcUR0OGIyRUdmNXBxS2pFCm5pSVY5Yk9PUlpab2xrZzlzQUFHcWF5SjVJS3Q2YmNtVENIYXRBcGpRZ3NWWjk5QnRZQzZiSWFudXRDWllUOVoKQWdNQkFBR2pnZ0hVTUlJQjBEQU1CZ05WSFJNQkFmOEVBakFBTUIwR0ExVWRKUVFXTUJRR0NDc0dBUVVGQndNQgpCZ2dyQmdFRkJRY0RBakFPQmdOVkhROEJBZjhFQkFNQ0JhQXdQQVlEVlIwZkJEVXdNekF4b0MrZ0xZWXJhSFIwCmNEb3ZMMk55YkM1emRHRnlabWxsYkdSMFpXTm9MbU52YlM5elptbG5Nbk14TFRZeUxtTnliREJqQmdOVkhTQUUKWERCYU1FNEdDMkNHU0FHRy9XNEJCeGNCTUQ4d1BRWUlLd1lCQlFVSEFnRVdNV2gwZEhBNkx5OWpaWEowYVdacApZMkYwWlhNdWMzUmhjbVpwWld4a2RHVmphQzVqYjIwdmNtVndiM05wZEc5eWVTOHdDQVlHWjRFTUFRSUJNSUdDCkJnZ3JCZ0VGQlFjQkFRUjJNSFF3S2dZSUt3WUJCUVVITUFHR0htaDBkSEE2THk5dlkzTndMbk4wWVhKbWFXVnMKWkhSbFkyZ3VZMjl0THpCR0JnZ3JCZ0VGQlFjd0FvWTZhSFIwY0RvdkwyTmxjblJwWm1sallYUmxjeTV6ZEdGeQpabWxsYkdSMFpXTm9MbU52YlM5eVpYQnZjMmwwYjNKNUwzTm1hV2N5TG1OeWREQWZCZ05WSFNNRUdEQVdnQlFsClJZRm9VQ1k0UFRzdExMN05hdG0yUGJObVl6QXBCZ05WSFJFRUlqQWdnZzhxTG5KaGJtTm9aWEl1YzNCaFkyV0MKRFhKaGJtTm9aWEl1YzNCaFkyVXdIUVlEVlIwT0JCWUVGQnplTmxRNUI0dnVIQVcvQ3RPakN3ZTV2QVZkTUEwRwpDU3FHU0liM0RRRUJDd1VBQTRJQkFRQjhWRE1VU3JQbFIyVHdLbVl6bDg4Q1FMSUZRUWlpSEFhQkZ3T3FLNGxuCmRoSVpuZEtvOTFKTS9CY1lrWEtnN3BSVmhZMVdkdFQ2dUpoUnF2bWg3SHlWWS80VGdlK3UzTFVRYlNOeFdaamkKWEUxK3ptRUEvQ2lQSjRWMkg1dldhL0d4Z25yNVBrekhpSzM3VHJWWXgxOUpPa0NUcnhYd1A1b0MwZUorSHNpaApsZWJlVWtlbkJDNmtqbGRqelV5YldEWThMbnY3QVFydHhUdmQrWS9iQjFyMlVoOENSeXUyaDdlbVpzcTBVUHpuCml5R1E5OEcraEx6U0dESjRqcEdEUUIwc3k5R1gzYSt2RWlVanFTd3hlMkJkaTNPYUQxbDVYVlRiWjBSNnUydjAKWDdwVEtEcVBRaFRoWUJxdDJod3ducTBkWlRnUEdMWEZ3clZxemNrczdHK3kKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=     # ssl cert for cattle server.
      key.pem: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBME00cU9TL0MydGE1QlJBRThTTHdKbEx0aGtiOUFGWlh0dWhlNWU2K1V4NFQramtICjAvbmJ5akdrcmU0bXR2cnAzU01LWW5Wd2hmLzBsU0ZpeXRmdFQzN3AwR1F2OW9oNEFrclNZdWtnUmtLbXN3SkYKQjR2Sm9kVkFUOEhlcEFEZnllSkFWd2NvWlpuWGJEb1FzczV5UEN6VU1OQk1lOWp4VU5zYmdhQ2VXLy9CZ2RzWApkUDlraExaNEg0bXJEVHFmQmRYR3p5R1JiNXhOUFdSc25HSk55VXlEakw5MXREcW1sL1BBKy9xSWR3N1ZqUUxBClhyREdGVDJrWmF6UVdrS25NNGUweDJLZzdmRzloQm4rYWFpb3hKNGlGZld6amtXV2FKWklQYkFBQnFtc2llU0MKcmVtM0prd2gyclFLWTBJTEZXZmZRYldBdW15R3A3clFtV0UvV1FJREFRQUJBb0lCQVFDNWFjamVuUVduTTdKNQp4MTdNRFYwNGVyMEdWblVFM3FibStYS0ROTHYycktmS3N1ZTdtSXhPQUVVZVdYSXhXNTlkU1dkSVJNYVZodEpWCnRwNjJSb1VvNlNhUWNOYVNVVjVYa3I4OUs0d0lOOWswN2RnRU9tSGlmYTJzNVJkaGhKRTBBTjluS0NqOEIxN2UKY0xVeFFkYjRqa29oeW1XUU4vVVkrbWR6ZFFBSjZmZjE2RGtxY3RGZkpONnhPSlFnM2h0L0E2NEl5OU8vL0ZRcgoxMnlDelJQT3ZCUnJjelBuM05qVm9mUkF1UVhreUR0bkVwSlVUa1c5OXVtTzQ0NS9qOU5RTDdIMnYvOU9rdjAyCnlPSWVaUDY2cVVoSGY2NmF1NlZ4NFRSOEdqQXhUcnZXSkJCVFB3eGw2bGhHWUd2UzAzQkdqVFN5WVByUnl0U2gKSEZweVpxSGRBb0dCQU9uTmE3TEVxTGdEaTVmMTRWNUlrei9VcC8zaVMxRkc4TlIyc240bHNPaVFXQWptUTg3TQpFNzhId0RIc013RFRUZjljbW9zdWlUakZqSUFWV0F5cFlvQnZiMzVQK2hHU05nTXYydUI5RUxScGxHeFBRRUlyCmJWS01ZNW9IbWZYTWhaRVZRbCtnZldGNHE5eFh0Ykc4cTFmTTBQNGxVK1VBdGpzQVduVjJNeGxYQW9HQkFPU2gKTUUxdjZBeHFpL2Q5Z0ZEWUZtb09ucGU2bjNhSktENlNld3hJazFzNFVEQllMSEpFb1FBT0NTdW9wZUVRUHM1RAo0STNPZXhSKys1YVp6R0ZpeUhhZDNPRGJBSVgzNVlseXg1UXNMa0FVNGZCZUZDR0p1Tm5jQk9jakxqelJYK3ljCmRUMFgyZ0RldUZadmxpTXVCUWJoMjNudkh4RnZXbFkvTXdOVm13N1BBb0dBTk5oZWVHaWs3ZnEzS2FERTBNZTgKcUpmTFpNSXFYZk9YNlozdW1ENnlyczQ1WjhHTUlBaldpYjRadmU3eVZFUnVnOEtObDlucjRDNGVwTEN1VnlaTwpBbE90c3JJbkJxT3ltNlBNYUNNOGpGcTAxb3BQTHVXYjd5V1dPYkZ3SmpPVkdRYmlHclV1d2NKQnJpc1JBVnh3CnFnYThVa1Zqb2dZNEtqdlpObVdDQlQ4Q2dZQnB6ZktsazRsRzNiUUNoOUR2R09GZW1YOXBabE5QcnUreDdXWUcKYkR2TmRrVWQ2bUEvVFdWWXVpWWlUenpjNkFDNHdnN1VjVjdpUUZXNy8xYm5KcWp3dytPcEo1Q1pidnlKM0ZWaQpUQVBuWWdLaGsxZ3JvU21yb0xlZ0k5Yk5ESFFnOHRNS3Y5UUNuUStmNktvSmc4Mk52czRzSXE0MUNsdzdGNnBLCis3M3pYd0tCZ1FDQm9JQWdHL1R4d3hDbytUODZNNWZOTlJJYkZBbWJOTzFRQ252Z1djSThCUGxzeS9STFFHNXIKdVpQUEJvYkluWWtuQU56NzlYRFBpM0R2MTFwUUlJaHdLdGtVVmRaL09lNnlZdUJvZWdEQVJMa2d6bytyTXRtdApLWUVHL3NwMjVNUGlwMkdFd3p2RUc4aHlaZHRMbGNNcFUrQTdVMmpWd1lUMWNaL2lNQkVQckE9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=      # ssl key for cattle server.
      cacerts.pem: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUZBRENDQStpZ0F3SUJBZ0lCQnpBTkJna3Foa2lHOXcwQkFRc0ZBRENCanpFTE1Ba0dBMVVFQmhNQ1ZWTXgKRURBT0JnTlZCQWdUQjBGeWFYcHZibUV4RXpBUkJnTlZCQWNUQ2xOamIzUjBjMlJoYkdVeEpUQWpCZ05WQkFvVApIRk4wWVhKbWFXVnNaQ0JVWldOb2JtOXNiMmRwWlhNc0lFbHVZeTR4TWpBd0JnTlZCQU1US1ZOMFlYSm1hV1ZzClpDQlNiMjkwSUVObGNuUnBabWxqWVhSbElFRjFkR2h2Y21sMGVTQXRJRWN5TUI0WERURXhNRFV3TXpBM01EQXcKTUZvWERUTXhNRFV3TXpBM01EQXdNRm93Z2NZeEN6QUpCZ05WQkFZVEFsVlRNUkF3RGdZRFZRUUlFd2RCY21sNgpiMjVoTVJNd0VRWURWUVFIRXdwVFkyOTBkSE5rWVd4bE1TVXdJd1lEVlFRS0V4eFRkR0Z5Wm1sbGJHUWdWR1ZqCmFHNXZiRzluYVdWekxDQkpibU11TVRNd01RWURWUVFMRXlwb2RIUndPaTh2WTJWeWRITXVjM1JoY21acFpXeGsKZEdWamFDNWpiMjB2Y21Wd2IzTnBkRzl5ZVM4eE5EQXlCZ05WQkFNVEsxTjBZWEptYVdWc1pDQlRaV04xY21VZwpRMlZ5ZEdsbWFXTmhkR1VnUVhWMGFHOXlhWFI1SUMwZ1J6SXdnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCCkR3QXdnZ0VLQW9JQkFRRGxrR1pMN1BsR2Nha2dnNzdwYkw5S3lVaHBnWFZPYlNUMnl4Y1QrTEJ4V1lSNmF5dUYKcERTMUZ1WEx6T2xCY0N5a0x0YjZNbjNocU42VUVLd3h3Y0RZYXY5Wko2dDIxdndMZEd1NHA2NC94RlQwdERGRQozWk5XaktSTVhwdUp5eVNEbStKWGZiZllFaC9KaFczMDBZRHhVSnVIcnRRTEVBWDdKN29vYlJmcER0Wk51VGxWCkJ2OEtKQVYrTDhZZGNtelVpeW1NVjMzYTJldG1HdE5QcDk5L1VzUXd4YVhKRGdMRlU3OTNPR2dHSk1ObXlEZCsKTUI1RmNTTTEvNURZS3AyTjU3Q1NUVHgvS2dxVDNNMFdSbVgzWUlTTGRrdVJKM01Va3VEcTdvOFc2bzBPUG5ZWAp2MzJKZ0lCRVErY3Q0RU1KZGRvMjZLM2JpVHIxWFJLT0l3U0RBZ01CQUFHamdnRXNNSUlCS0RBUEJnTlZIUk1CCkFmOEVCVEFEQVFIL01BNEdBMVVkRHdFQi93UUVBd0lCQmpBZEJnTlZIUTRFRmdRVUpVV0JhRkFtT0QwN0xTeSsKeldyWnRqMnpabU13SHdZRFZSMGpCQmd3Rm9BVWZBd3lINmZaTUgvRWZXaWpZcWloenFzSFd5Y3dPZ1lJS3dZQgpCUVVIQVFFRUxqQXNNQ29HQ0NzR0FRVUZCekFCaGg1b2RIUndPaTh2YjJOemNDNXpkR0Z5Wm1sbGJHUjBaV05vCkxtTnZiUzh3T3dZRFZSMGZCRFF3TWpBd29DNmdMSVlxYUhSMGNEb3ZMMk55YkM1emRHRnlabWxsYkdSMFpXTm8KTG1OdmJTOXpabkp2YjNRdFp6SXVZM0pzTUV3R0ExVWRJQVJGTUVNd1FRWUVWUjBnQURBNU1EY0dDQ3NHQVFVRgpCd0lCRml0b2RIUndjem92TDJObGNuUnpMbk4wWVhKbWFXVnNaSFJsWTJndVkyOXRMM0psY0c5emFYUnZjbmt2Ck1BMEdDU3FHU0liM0RRRUJDd1VBQTRJQkFRQldaY3IrOHo4S3FKT0xHTWZlUTJrVE5DQytUbDk0cUd1YzIycE4KUWR2QkUremNNUUFpWHZjQW5nemdOR1UwK2JFNlRraklFb0dJWEZzK0NGTjY5eHBrMzdoUVljeFRVVUFwUzhMMApyanBmNU1xdEpzeE9ZVVBsL1ZlbU4zRE9ReXV3bE1PUzZlRmZxaEJKdDJuazROQWZaS1FyelI5dm9QaUVKQmpPCmVUMnBrYjlVR0JPSm1WUVJEVlhGSmd0NVQxb2NidmxqMnhTQXBBZXIrcktsdVlqZGtmNWxPNlNqZWI2SlRlSFEKc1BUSUZ3d0tsaFI4Q2JkczRjTFlWZFFZb0twQmFYQWtvN252NlZyY1B1dVVTdkMzM2w4T2R2cjcrMmtEUlVCUQo3bklNcEJLR2djMFQwVTdFUE1wT0RkSW04UUMzdEthaTRXNTZnZjB3ckhvZngxbDcKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQotLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS0KTUlJRW9EQ0NBNGlnQXdJQkFnSURPUlNFTUEwR0NTcUdTSWIzRFFFQkN3VUFNR2d4Q3pBSkJnTlZCQVlUQWxWVApNU1V3SXdZRFZRUUtFeHhUZEdGeVptbGxiR1FnVkdWamFHNXZiRzluYVdWekxDQkpibU11TVRJd01BWURWUVFMCkV5bFRkR0Z5Wm1sbGJHUWdRMnhoYzNNZ01pQkRaWEowYVdacFkyRjBhVzl1SUVGMWRHaHZjbWwwZVRBZUZ3MHgKTkRBeE1ERXdOekF3TURCYUZ3MHpNVEExTXpBd056QXdNREJhTUlHUE1Rc3dDUVlEVlFRR0V3SlZVekVRTUE0RwpBMVVFQ0JNSFFYSnBlbTl1WVRFVE1CRUdBMVVFQnhNS1UyTnZkSFJ6WkdGc1pURWxNQ01HQTFVRUNoTWNVM1JoCmNtWnBaV3hrSUZSbFkyaHViMnh2WjJsbGN5d2dTVzVqTGpFeU1EQUdBMVVFQXhNcFUzUmhjbVpwWld4a0lGSnYKYjNRZ1EyVnlkR2xtYVdOaGRHVWdRWFYwYUc5eWFYUjVJQzBnUnpJd2dnRWlNQTBHQ1NxR1NJYjNEUUVCQVFVQQpBNElCRHdBd2dnRUtBb0lCQVFDOTdjRUQvUGFQL0FLeGIxdWZTTm1kZWVLaXR3TmhWaGpEUjdiWHlqMDFMb2xECjk2RnBtOTZLR3YwVElKeTBTWGN5S1ZiOXVleU0zU0w2Y3R3bllaZnU5bHFFN0c0WnVZa3MzSVJiMVhUN2ExL0YKaWFVUVVvbEdWZlM0ZFJ6bWYrUlVya3Y0VlhKWEFobjRGM0ZaNng0b0IzVEZuVWkrYkxUMHBMRHpaRGQ1a3NEcwpSbDUvNFcxVFRHS3Z6UjhMWTdzNm5mdjhlUUNZWVhUUEpvSkFZL095Y21vWkRabksxQTUxekRmN2k0bkJXZkZpCmYxK3pYMlV3K0tlM1RYWmFIblplTk1Eb2xsYVppclB3ZjZUTnZkd3lNWHlSeitCZkVmaHJxa2xjMFptVTBhTGoKWTFzSmRyVldZdUZMZEIyVzFDYlVDQVJaMEpnT0R1YmUvTVBzSDVEeEFnTUJBQUdqZ2dFcE1JSUJKVEFQQmdOVgpIUk1CQWY4RUJUQURBUUgvTUE0R0ExVWREd0VCL3dRRUF3SUJCakFkQmdOVkhRNEVGZ1FVZkF3eUg2ZlpNSC9FCmZXaWpZcWloenFzSFd5Y3dId1lEVlIwakJCZ3dGb0FVdjErMzBjN2RINGIwVzFXczNOY1F3ZzZwaU9jd09nWUkKS3dZQkJRVUhBUUVFTGpBc01Db0dDQ3NHQVFVRkJ6QUJoaDVvZEhSd09pOHZiMk56Y0M1emRHRnlabWxsYkdSMApaV05vTG1OdmJTOHdPQVlEVlIwZkJERXdMekF0b0N1Z0tZWW5hSFIwY0RvdkwyTnliQzV6ZEdGeVptbGxiR1IwClpXTm9MbU52YlM5elpuSnZiM1F1WTNKc01Fd0dBMVVkSUFSRk1FTXdRUVlFVlIwZ0FEQTVNRGNHQ0NzR0FRVUYKQndJQkZpdG9kSFJ3Y3pvdkwyTmxjblJ6TG5OMFlYSm1hV1ZzWkhSbFkyZ3VZMjl0TDNKbGNHOXphWFJ2Y25rdgpNQTBHQ1NxR1NJYjNEUUVCQ3dVQUE0SUJBUUNGWThIWjNibi9xYjJtR2R5L0V6b1JPQ0pVc2F3RkVQdDhzNVkvCk1ZdG0vNGp6NGIvN3h4OEEvMFpxaTJFeXlRRlJkdnVheHZvZ1VjaEd4SmpYZWFQakJISS9pMDAwVTJmc015eDcKNkpRQktIdzZORnNDZHhhTlFDVXpzTHhzbDljRmV2K01oYzV2b0ZNQUYyNGViTDBpMXdxSU4vWjk2NWxCN3lmTApqR0JyVEFGK1pWQUxUN2lWbXBwdU5QMXpPalB4a2RYelRpMTA2Ty9Ua0RYeEJtaGsxTkFUL1ZMVHhtM0JPb294CjNRVW1OVXFNWmJoU2E0SHMwcHkxTkJDWG5EN0dMKzJPUWtJa0x1bHptaVg1RWZIeUkybkw1WlJwb05MY3NQeEUKaWF3WHFNelZOM2NXeFlDNURJOVhBbFdaaFh0SjhDNWJvTUpYVTEyaTZLWTN3d0g2Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0KLS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUVEekNDQXZlZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRVUZBREJvTVFzd0NRWURWUVFHRXdKVlV6RWwKTUNNR0ExVUVDaE1jVTNSaGNtWnBaV3hrSUZSbFkyaHViMnh2WjJsbGN5d2dTVzVqTGpFeU1EQUdBMVVFQ3hNcApVM1JoY21acFpXeGtJRU5zWVhOeklESWdRMlZ5ZEdsbWFXTmhkR2x2YmlCQmRYUm9iM0pwZEhrd0hoY05NRFF3Ck5qSTVNVGN6T1RFMldoY05NelF3TmpJNU1UY3pPVEUyV2pCb01Rc3dDUVlEVlFRR0V3SlZVekVsTUNNR0ExVUUKQ2hNY1UzUmhjbVpwWld4a0lGUmxZMmh1YjJ4dloybGxjeXdnU1c1akxqRXlNREFHQTFVRUN4TXBVM1JoY21acApaV3hrSUVOc1lYTnpJRElnUTJWeWRHbG1hV05oZEdsdmJpQkJkWFJvYjNKcGRIa3dnZ0VnTUEwR0NTcUdTSWIzCkRRRUJBUVVBQTRJQkRRQXdnZ0VJQW9JQkFRQzNNc2orNlhHbUJJV3REQkZrMzg1Tjc4Z0RHSWMvb2F2N1BLYWYKOE1PaDJ0VFliaXRUa1Bza3BENkU4SjdvWCt6bEowVDFLS1kvZTk3Z0t2RElyMU12bnNvRkFaTWVqMlljT2FkTgorbHEyY3dRbFp1dDNmK2RaeGtxWkpSUlU2eWJIODM4WjFUQndqNit3UmlyL3Jlc3A3ZGVmcWdTSG85VDVpYVUwClg5dERrWUkyMldZOHNiaTVndjJjT2o0UXlEdnZCbVZtZXBzWkdEMy9jVkU4TUM1ZnZqMTNjN0pkQm16REkxYWEKSzRVbWtoeW5BclBrUHcydkNIbUN1RFk5NnB6VE5iTzhhY3Ixekozby9XU05GNEF6Ymw1S1habkpIb2UwblJyQQoxVzRUTlNOZTM1dGZQZS9XOTNiQzZqNjdlQTBjUW1kckJOajQxdHB2aS9KRW9BR3JBZ0VEbzRIRk1JSENNQjBHCkExVWREZ1FXQkJTL1g3ZlJ6dDBmaHZSYlZhemMxeERDRHFtSTV6Q0JrZ1lEVlIwakJJR0tNSUdIZ0JTL1g3ZlIKenQwZmh2UmJWYXpjMXhEQ0RxbUk1NkZzcEdvd2FERUxNQWtHQTFVRUJoTUNWVk14SlRBakJnTlZCQW9USEZOMApZWEptYVdWc1pDQlVaV05vYm05c2IyZHBaWE1zSUVsdVl5NHhNakF3QmdOVkJBc1RLVk4wWVhKbWFXVnNaQ0JECmJHRnpjeUF5SUVObGNuUnBabWxqWVhScGIyNGdRWFYwYUc5eWFYUjVnZ0VBTUF3R0ExVWRFd1FGTUFNQkFmOHcKRFFZSktvWklodmNOQVFFRkJRQURnZ0VCQUFXZFA0aWQwY2thVmFHc2FmUHpXZHFiQVljYVQxZXBvWGtKS3R2MwpMN0llek1kZWF0aURoNkdYNzBrMVBuY0dRVmhpdjQ1WXVBcG5QK3l6M1NGbUg4bFUrbkxNUFV4QTJJR3ZkNTZECmVydWl4L1UwRjQ3WkVVRDAvQ3dxVFJWL3AySmRMaVhUQUFzZ0doMW8rUmU0OUwyTDdTaFozVTBXaXhlRHlMSmwKeHkxNnBhcThVNFp0M1Zla3l2Z2dRUXRvOFBUN2RMNVdYWHA1OWZrZGhlTXRsYjcxY1pCRHpJMGZtZ0FLaHlucApWU0pZQUNQcTR4SkRLVnRIQ04yTVFXcGxCcWpsSWFwQnRKVWhsYmw5MFRTckU5YXR2TnppUFRuTnZUNTFjS0VZCldRUEpJclNQbk5WZUt0ZWx0dFFLYmZpM1FCRkdtaDk1RG1LL0Q1ZnM0QzhmRjVRPQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
    ```

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

    >**Important:**
    >
    >   - Each `.pem` must be in base-64: `cat <PEM_FILE> | base64`
    >   - If you're using a self-signed certificate, both `cattle-keys-server` and `cattle-keys-ingress` must use certificates and keys signed by the same CA.

    - `<BASE64_CRT>`
    - `<BASE64_KEY>`

    **Example:**

    ```
    apiVersion: v1
    kind: Secret
    metadata:
      name: cattle-keys-ingress
      namespace: cattle-system
    type: Opaque
    data:
      tls.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUZYVENDQkVXZ0F3SUJBZ0lKQU5QTE5EZnJoL2gzTUEwR0NTcUdTSWIzRFFFQkN3VUFNSUhHTVFzd0NRWUQKVlFRR0V3SlZVekVRTUE0R0ExVUVDQk1IUVhKcGVtOXVZVEVUTUJFR0ExVUVCeE1LVTJOdmRIUnpaR0ZzWlRFbApNQ01HQTFVRUNoTWNVM1JoY21acFpXeGtJRlJsWTJodWIyeHZaMmxsY3l3Z1NXNWpMakV6TURFR0ExVUVDeE1xCmFIUjBjRG92TDJObGNuUnpMbk4wWVhKbWFXVnNaSFJsWTJndVkyOXRMM0psY0c5emFYUnZjbmt2TVRRd01nWUQKVlFRREV5dFRkR0Z5Wm1sbGJHUWdVMlZqZFhKbElFTmxjblJwWm1sallYUmxJRUYxZEdodmNtbDBlU0F0SUVjeQpNQjRYRFRFM01EZ3hPREU0TVRnd01Wb1hEVEl3TURneE9ERTRNVEV3TUZvd1BURWhNQjhHQTFVRUN4TVlSRzl0CllXbHVJRU52Ym5SeWIyd2dWbUZzYVdSaGRHVmtNUmd3RmdZRFZRUUREQThxTG5KaGJtTm9aWEl1YzNCaFkyVXcKZ2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLQW9JQkFRRFF6aW81TDhMYTFya0ZFQVR4SXZBbQpVdTJHUnYwQVZsZTI2RjdsN3I1VEhoUDZPUWZUK2R2S01hU3Q3aWEyK3VuZEl3cGlkWENGLy9TVklXTEsxKzFQCmZ1blFaQy8yaUhnQ1N0Smk2U0JHUXFhekFrVUhpOG1oMVVCUHdkNmtBTi9KNGtCWEJ5aGxtZGRzT2hDeXpuSTgKTE5RdzBFeDcyUEZRMnh1Qm9KNWIvOEdCMnhkMC8yU0V0bmdmaWFzTk9wOEYxY2JQSVpGdm5FMDlaR3ljWWszSgpUSU9NdjNXME9xYVg4OEQ3K29oM0R0V05Bc0Jlc01ZVlBhUmxyTkJhUXFjemg3VEhZcUR0OGIyRUdmNXBxS2pFCm5pSVY5Yk9PUlpab2xrZzlzQUFHcWF5SjVJS3Q2YmNtVENIYXRBcGpRZ3NWWjk5QnRZQzZiSWFudXRDWllUOVoKQWdNQkFBR2pnZ0hVTUlJQjBEQU1CZ05WSFJNQkFmOEVBakFBTUIwR0ExVWRKUVFXTUJRR0NDc0dBUVVGQndNQgpCZ2dyQmdFRkJRY0RBakFPQmdOVkhROEJBZjhFQkFNQ0JhQXdQQVlEVlIwZkJEVXdNekF4b0MrZ0xZWXJhSFIwCmNEb3ZMMk55YkM1emRHRnlabWxsYkdSMFpXTm9MbU52YlM5elptbG5Nbk14TFRZeUxtTnliREJqQmdOVkhTQUUKWERCYU1FNEdDMkNHU0FHRy9XNEJCeGNCTUQ4d1BRWUlLd1lCQlFVSEFnRVdNV2gwZEhBNkx5OWpaWEowYVdacApZMkYwWlhNdWMzUmhjbVpwWld4a2RHVmphQzVqYjIwdmNtVndiM05wZEc5eWVTOHdDQVlHWjRFTUFRSUJNSUdDCkJnZ3JCZ0VGQlFjQkFRUjJNSFF3S2dZSUt3WUJCUVVITUFHR0htaDBkSEE2THk5dlkzTndMbk4wWVhKbWFXVnMKWkhSbFkyZ3VZMjl0THpCR0JnZ3JCZ0VGQlFjd0FvWTZhSFIwY0RvdkwyTmxjblJwWm1sallYUmxjeTV6ZEdGeQpabWxsYkdSMFpXTm9MbU52YlM5eVpYQnZjMmwwYjNKNUwzTm1hV2N5TG1OeWREQWZCZ05WSFNNRUdEQVdnQlFsClJZRm9VQ1k0UFRzdExMN05hdG0yUGJObVl6QXBCZ05WSFJFRUlqQWdnZzhxTG5KaGJtTm9aWEl1YzNCaFkyV0MKRFhKaGJtTm9aWEl1YzNCaFkyVXdIUVlEVlIwT0JCWUVGQnplTmxRNUI0dnVIQVcvQ3RPakN3ZTV2QVZkTUEwRwpDU3FHU0liM0RRRUJDd1VBQTRJQkFRQjhWRE1VU3JQbFIyVHdLbVl6bDg4Q1FMSUZRUWlpSEFhQkZ3T3FLNGxuCmRoSVpuZEtvOTFKTS9CY1lrWEtnN3BSVmhZMVdkdFQ2dUpoUnF2bWg3SHlWWS80VGdlK3UzTFVRYlNOeFdaamkKWEUxK3ptRUEvQ2lQSjRWMkg1dldhL0d4Z25yNVBrekhpSzM3VHJWWXgxOUpPa0NUcnhYd1A1b0MwZUorSHNpaApsZWJlVWtlbkJDNmtqbGRqelV5YldEWThMbnY3QVFydHhUdmQrWS9iQjFyMlVoOENSeXUyaDdlbVpzcTBVUHpuCml5R1E5OEcraEx6U0dESjRqcEdEUUIwc3k5R1gzYSt2RWlVanFTd3hlMkJkaTNPYUQxbDVYVlRiWjBSNnUydjAKWDdwVEtEcVBRaFRoWUJxdDJod3ducTBkWlRnUEdMWEZ3clZxemNrczdHK3kKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=  # ssl cert for ingress. If selfsigned, must be signed by same CA as cattle server
      tls.key: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBME00cU9TL0MydGE1QlJBRThTTHdKbEx0aGtiOUFGWlh0dWhlNWU2K1V4NFQramtICjAvbmJ5akdrcmU0bXR2cnAzU01LWW5Wd2hmLzBsU0ZpeXRmdFQzN3AwR1F2OW9oNEFrclNZdWtnUmtLbXN3SkYKQjR2Sm9kVkFUOEhlcEFEZnllSkFWd2NvWlpuWGJEb1FzczV5UEN6VU1OQk1lOWp4VU5zYmdhQ2VXLy9CZ2RzWApkUDlraExaNEg0bXJEVHFmQmRYR3p5R1JiNXhOUFdSc25HSk55VXlEakw5MXREcW1sL1BBKy9xSWR3N1ZqUUxBClhyREdGVDJrWmF6UVdrS25NNGUweDJLZzdmRzloQm4rYWFpb3hKNGlGZld6amtXV2FKWklQYkFBQnFtc2llU0MKcmVtM0prd2gyclFLWTBJTEZXZmZRYldBdW15R3A3clFtV0UvV1FJREFRQUJBb0lCQVFDNWFjamVuUVduTTdKNQp4MTdNRFYwNGVyMEdWblVFM3FibStYS0ROTHYycktmS3N1ZTdtSXhPQUVVZVdYSXhXNTlkU1dkSVJNYVZodEpWCnRwNjJSb1VvNlNhUWNOYVNVVjVYa3I4OUs0d0lOOWswN2RnRU9tSGlmYTJzNVJkaGhKRTBBTjluS0NqOEIxN2UKY0xVeFFkYjRqa29oeW1XUU4vVVkrbWR6ZFFBSjZmZjE2RGtxY3RGZkpONnhPSlFnM2h0L0E2NEl5OU8vL0ZRcgoxMnlDelJQT3ZCUnJjelBuM05qVm9mUkF1UVhreUR0bkVwSlVUa1c5OXVtTzQ0NS9qOU5RTDdIMnYvOU9rdjAyCnlPSWVaUDY2cVVoSGY2NmF1NlZ4NFRSOEdqQXhUcnZXSkJCVFB3eGw2bGhHWUd2UzAzQkdqVFN5WVByUnl0U2gKSEZweVpxSGRBb0dCQU9uTmE3TEVxTGdEaTVmMTRWNUlrei9VcC8zaVMxRkc4TlIyc240bHNPaVFXQWptUTg3TQpFNzhId0RIc013RFRUZjljbW9zdWlUakZqSUFWV0F5cFlvQnZiMzVQK2hHU05nTXYydUI5RUxScGxHeFBRRUlyCmJWS01ZNW9IbWZYTWhaRVZRbCtnZldGNHE5eFh0Ykc4cTFmTTBQNGxVK1VBdGpzQVduVjJNeGxYQW9HQkFPU2gKTUUxdjZBeHFpL2Q5Z0ZEWUZtb09ucGU2bjNhSktENlNld3hJazFzNFVEQllMSEpFb1FBT0NTdW9wZUVRUHM1RAo0STNPZXhSKys1YVp6R0ZpeUhhZDNPRGJBSVgzNVlseXg1UXNMa0FVNGZCZUZDR0p1Tm5jQk9jakxqelJYK3ljCmRUMFgyZ0RldUZadmxpTXVCUWJoMjNudkh4RnZXbFkvTXdOVm13N1BBb0dBTk5oZWVHaWs3ZnEzS2FERTBNZTgKcUpmTFpNSXFYZk9YNlozdW1ENnlyczQ1WjhHTUlBaldpYjRadmU3eVZFUnVnOEtObDlucjRDNGVwTEN1VnlaTwpBbE90c3JJbkJxT3ltNlBNYUNNOGpGcTAxb3BQTHVXYjd5V1dPYkZ3SmpPVkdRYmlHclV1d2NKQnJpc1JBVnh3CnFnYThVa1Zqb2dZNEtqdlpObVdDQlQ4Q2dZQnB6ZktsazRsRzNiUUNoOUR2R09GZW1YOXBabE5QcnUreDdXWUcKYkR2TmRrVWQ2bUEvVFdWWXVpWWlUenpjNkFDNHdnN1VjVjdpUUZXNy8xYm5KcWp3dytPcEo1Q1pidnlKM0ZWaQpUQVBuWWdLaGsxZ3JvU21yb0xlZ0k5Yk5ESFFnOHRNS3Y5UUNuUStmNktvSmc4Mk52czRzSXE0MUNsdzdGNnBLCis3M3pYd0tCZ1FDQm9JQWdHL1R4d3hDbytUODZNNWZOTlJJYkZBbWJOTzFRQ252Z1djSThCUGxzeS9STFFHNXIKdVpQUEJvYkluWWtuQU56NzlYRFBpM0R2MTFwUUlJaHdLdGtVVmRaL09lNnlZdUJvZWdEQVJMa2d6bytyTXRtdApLWUVHL3NwMjVNUGlwMkdFd3p2RUc4aHlaZHRMbGNNcFUrQTdVMmpWd1lUMWNaL2lNQkVQckE9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=  # ssl key for ingress. If selfsigned, must be signed by same CA as cattle server
      ```
6. Save the `.yml` file and close it.

## Run RKE

Enter the command to run RKE while pointing to your `.yml` file. RKE will install Kubernetes and Rancher using your parameters.

1. From your workstation, make sure your `.yml` file and RKE are in the same directory.

2. Open a Terminal instance. Change to the directory that contains your `.yml` and RKE.

3. Enter the one of the following commands, depending on the name of your `.yml` file:

    - `rke up --config rancher-minimal-passthrough.yml`
    - `rke up --config rancher-minimal-ssl.yml`
