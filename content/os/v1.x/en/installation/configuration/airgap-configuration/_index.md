---
title: Air Gap Configuration
weight: 138
---

In the airgap environment, `Docker Registry`, `RancherOS Reposirotries URL` and `RancherOS Upgrade URL` should be configured to ensure the os can pull images and update os services and upgrade os.


### Configuring Private Docker Registry

You should use private docker registry for `user-docker` and `system-docker` to pull images.

1. Add [Images prefix]({{< baseurl >}}/os/v1.x/en/installation/configuration/images-prefix/) for private docker registries.
2. Set private registries certificates for `user-docker`
  - [Certificates for private registries]({{< baseurl >}}/os/v1.x/en/installation/configuration/private-registries/#certificates-for-private-registries)
3. Set private registries certificates for `system-docker`
  1. To set the private registries certificates before the RancherOS startup, RancherOS provide a way to flush your custom certs to the ISO. See how to [set custom certs to ISO]({{< baseurl >}}/os/v1.x/en/installation/configuration/airgap-configuration/#set-custom-certs-to-iso)
  2. You can also set the private registries certificates after the RancherOS startup.
      - Append your private registries certs to `/etc/ssl/certs/ca-certificates.crt.rancher` file then reboot to make the certs fully take effect.
4. The images used by RancherOS should be pushed to your private registries.

#### Set custom certs to ISO

RancherOS provide a [script](https://github.com/rancher/os/blob/master/scripts/tools/flush_crt_iso.sh) to set your custom certs to a ISO. The following commands show how to use the script to flush certs into a ISO.
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

### Configuring RancherOS Reposirotries and Upgrade URL

By default, RancherOS will update the `engine`, `console`,  `service` list from `https://raw.githubusercontent.com/rancher/os-services` and update `os` list from `https://releases.rancher.com/os/releases.yml`.  
So in the airgap environment, you should change the Reposirotries URL and Upgrade URL to your own URL.

#### 1. Clone os-services files

Clone `github.com/rancher/os-services` to local. The repo has many branches named after the RancherOS versions. Please checkout the branch that you are using.

```
$ git clone https://github.com/rancher/os-services.git
$ cd os-services
$ git checkout v1.5.2
```

#### 2. Download the os releases yaml

Download the `releases.yml` from `https://releases.rancher.com/os/releases.yml`.

#### 3. Serve these files by HTTP

Use a HTTP server to serve the cloned `os-services` directory and downloaded `releases.yml`.   
Make sure you can access all the files in `os-services` and `releases.yml` by URL.

#### 4. Set the URLs to `rancher.repositories.core.url` and `rancher.upgrade.url`.

In your cloud-config, set `rancher.repositories.core.url` and `rancher.upgrade.url` to your own `os-services` URL.
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

### Example Cloud-config

Here is an total cloud-config example for using RancherOS in airgap environment.
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
