---
title: Air Gap Configuration
weight: 138
---

In the air gap environment, the Docker registry, RancherOS repositories URL, and the RancherOS upgrade URL should be configured to ensure the OS can pull images, update OS services, and upgrade the OS.


# Configuring a Private Docker Registry

You should use a private Docker registry so that `user-docker` and `system-docker` can pull images.

1. Add the private Docker registry domain to the [images prefix]({{< baseurl >}}/os/v1.x/en/installation/configuration/images-prefix/).
2. Set the private registry certificates for `user-docker`. For details, refer to [Certificates for Private Registries]({{< baseurl >}}/os/v1.x/en/installation/configuration/private-registries/#certificates-for-private-registries)
3. Set the private registry certificates for `system-docker`. There are two ways to set the certificates:
  - To set the private registry certificates before RancherOS starts, you can run a script included with RancherOS. For details, refer to [Set Custom Certs in ISO]({{< baseurl >}}/os/v1.x/en/installation/configuration/airgap-configuration/#set-custom-certs-in-iso).
  - To set the private registry certificates after RancherOS starts, append your private registry certs to the `/etc/ssl/certs/ca-certificates.crt.rancher` file. Then reboot to make the certs fully take effect.
4. The images used by RancherOS should be pushed to your private registry.

# Set Custom Certs in ISO

RancherOS provides a [script](https://github.com/rancher/os/blob/master/scripts/tools/flush_crt_iso.sh) to set your custom certs for an ISO. The following commands show how to use the script:

```shell
$ git clone https://github.com/rancher/os.git
$ cd os
$ make shell-bind
$ cd scripts/tools/
$ wget http://link/rancheros-xx.iso
$ wget http://link/custom.crt
$ ./flush_crt_iso.sh --iso rancheros-xx.iso --cert custom.crt
$ exit

$ ls ./build/
```

# Configuring RancherOS Repositories and Upgrade URL

The following steps show how to configure RancherOS to update from private repositories.

By default, RancherOS will update the `engine`, `console`, and `service` list from `https://raw.githubusercontent.com/rancher/os-services` and update the `os` list from `https://releases.rancher.com/os/releases.yml`. So in the air gap environment, you need to change the repository URL and upgrade URL to your own URLs. 

### 1. Clone os-services files

Clone `github.com/rancher/os-services` to local. The repo has many branches named after the RancherOS versions. Please check out the branch that you are using.

```
$ git clone https://github.com/rancher/os-services.git
$ cd os-services
$ git checkout v1.5.2
```

### 2. Download the OS releases yaml

Download the `releases.yml` from `https://releases.rancher.com/os/releases.yml`.

### 3. Serve these files by HTTP

Use a HTTP server to serve the cloned `os-services` directory and download `releases.yml`.   
Make sure you can access all the files in `os-services` and `releases.yml` by URL.

### 4. Set the URLs

In your cloud-config, set `rancher.repositories.core.url` and `rancher.upgrade.url` to your own `os-services` and `releases` URLs:
```yaml
#cloud-config
rancher:
  repositories:
    core:
      url: https://foo.bar.com/os-services
  upgrade:
    url: https://foo.bar.com/os/releases.yml
```

You can also customize `rancher.repositories.core.url` and `rancher.upgrade.url` after it's been started using `ros config`.

```
$ sudo ros config set rancher.repositories.core.url https://foo.bar.com/os-services
$ sudo ros config set rancher.upgrade.url https://foo.bar.com/os/releases.yml
```

<<<<<<< HEAD
<<<<<<< HEAD
# Example Cloud-config

Here is a total cloud-config example for using RancherOS in air gap environment.
=======
### Example Cloud-config

Here is an total cloud-config example for using RancherOS in airgap environment.
>>>>>>> Add RancherOS airgap configuration doc
=======
# Example Cloud-config

Here is a total cloud-config example for using RancherOS in air gap environment.
>>>>>>> Minor edits to RancherOS air gap docs
For `system-docker`, see [Configuring Private Docker Registry]({{< baseurl >}}/os/v1.x/en/installation/configuration/airgap-configuration/#configuring-private-docker-registry).

```yaml
#cloud-config
write_files:
  - path: /etc/docker/certs.d/myregistrydomain.com:5000/ca.crt
    permissions: "0644"
    owner: root
    content: |
      -----BEGIN CERTIFICATE-----
      MIIDJjCCAg4CCQDLCSjwGXM72TANBgkqhkiG9w0BAQUFADBVMQswCQYDVQQGEwJB
      VTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50ZXJuZXQgV2lkZ2l0
      cyBQdHkgTHRkMQ4wDAYDVQQDEwVhbGVuYTAeFw0xNTA3MjMwMzUzMDdaFw0xNjA3
      MjIwMzUzMDdaMFUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEw
      HwYDVQQKExhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQxDjAMBgNVBAMTBWFsZW5h
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxdVIDGlAySQmighbfNqb
      TtqetENPXjNNq1JasIjGGZdOsmFvNciroNBgCps/HPJphICQwtHpNeKv4+ZuL0Yg
      1FECgW7oo6DOET74swUywtq/2IOeik+i+7skmpu1o9uNC+Fo+twpgHnGAaGk8IFm
      fP5gDgthrWBWlEPTPY1tmPjI2Hepu2hJ28SzdXi1CpjfFYOiWL8cUlvFBdyNqzqT
      uo6M2QCgSX3E1kXLnipRT6jUh0HokhFK4htAQ3hTBmzcxRkgTVZ/D0hA5lAocMKX
      EVP1Tlw0y1ext2ppS1NR9Sg46GP4+ATgT1m3ae7rWjQGuBEB6DyDgyxdEAvmAEH4
      LQIDAQABMA0GCSqGSIb3DQEBBQUAA4IBAQA45V0bnGPhIIkb54Gzjt9jyPJxPVTW
      mwTCP+0jtfLxAor5tFuCERVs8+cLw1wASfu4vH/yHJ/N/CW92yYmtqoGLuTsywJt
      u1+amECJaLyq0pZ5EjHqLjeys9yW728IifDxbQDX0cj7bBjYYzzUXp0DB/dtWb/U
      KdBmT1zYeKWmSxkXDFFSpL/SGKoqx3YLTdcIbgNHwKNMfTgD+wTZ/fvk0CLxye4P
      n/1ZWdSeZPAgjkha5MTUw3o1hjo/0H0ekI4erZFrZnG2N3lDaqDPR8djR+x7Gv6E
      vloANkUoc1pvzvxKoz2HIHUKf+xFT50xppx6wsQZ01pNMSNF0qgc1vvH
      -----END CERTIFICATE-----
rancher:
  environment:
    REGISTRY_DOMAIN: xxxx.yyy
  repositories:
    core:
      url: https://foo.bar.com/os-services
  upgrade:
    url: https://foo.bar.com/os/releases.yml
```
