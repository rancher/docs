---
title: Certificate Troubleshooting
weight: 4
---
### How Do I Know if My Certificates are in PEM Format?

You can recognize the PEM format by the following traits:

- The file begins with the following header:
    ```
    -----BEGIN CERTIFICATE-----
    ```
- The header is followed by a long string of characters.
- The file ends with a footer:
  -----END CERTIFICATE-----

PEM Certificate Example:

```
----BEGIN CERTIFICATE-----
MIIGVDCCBDygAwIBAgIJAMiIrEm29kRLMA0GCSqGSIb3DQEBCwUAMHkxCzAJBgNV
... more lines
VWQqljhfacYPgp8KJUJENQ9h5hZ2nSCrI+W00Jcw4QcEdCI8HL5wmg==
-----END CERTIFICATE-----
```

PEM Certificate Key Example:

```
-----BEGIN RSA PRIVATE KEY-----
MIIGVDCCBDygAwIBAgIJAMiIrEm29kRLMA0GCSqGSIb3DQEBCwUAMHkxCzAJBgNV
... more lines
VWQqljhfacYPgp8KJUJENQ9h5hZ2nSCrI+W00Jcw4QcEdCI8HL5wmg==
-----END RSA PRIVATE KEY-----
```

If your key looks like the example below, see [Converting a Certificate Key From PKCS8 to PKCS1.](#converting-a-certificate-key-from-pkcs8-to-pkcs1)

```
-----BEGIN PRIVATE KEY-----
MIIGVDCCBDygAwIBAgIJAMiIrEm29kRLMA0GCSqGSIb3DQEBCwUAMHkxCzAJBgNV
... more lines
VWQqljhfacYPgp8KJUJENQ9h5hZ2nSCrI+W00Jcw4QcEdCI8HL5wmg==
-----END PRIVATE KEY-----
```

### Converting a Certificate Key From PKCS8 to PKCS1

If you are using a PKCS8 certificate key file, Rancher will log the following line:

```
ListenConfigController cli-config [listener] failed with : failed to read private key: asn1: structure error: tags don't match (2 vs {class:0 tag:16 length:13 isCompound:true})
```

To make this work, you will need to convert the key from PKCS8 to PKCS1 using the command below:

```
openssl rsa -in key.pem -out convertedkey.pem
```

You can now use `convertedkey.pem` as certificate key file for Rancher.

### What is the Order of Certificates if I Want to Add My Intermediate(s)?

The order of adding certificates is as follows:

```
-----BEGIN CERTIFICATE-----
%YOUR_CERTIFICATE%
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
%YOUR_INTERMEDIATE_CERTIFICATE%
-----END CERTIFICATE-----
```

### How Do I Validate My Certificate Chain?

You can validate the certificate chain by using the `openssl` binary. If the output of the command (see the command example below) ends with `Verify return code: 0 (ok)`, your certificate chain is valid. The `ca.pem` file must be the same as you added to the `rancher/rancher` container.

When using a certificate signed by a recognized Certificate Authority, you can omit the `-CAfile` parameter.

Command:

```
openssl s_client -CAfile ca.pem -connect rancher.yourdomain.com:443
...
    Verify return code: 0 (ok)
```