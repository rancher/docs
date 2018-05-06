- How do I know if my certificates are in **PEM** format?

You can recognize the **PEM** format by:

**Starting with**: `-----BEGIN CERTIFICATE-----`</br>
**Ending with**: `-----END CERTIFICATE-----`

<u>Example of a PEM certificate</u>
```
----BEGIN CERTIFICATE-----
MIIGVDCCBDygAwIBAgIJAMiIrEm29kRLMA0GCSqGSIb3DQEBCwUAMHkxCzAJBgNV
... more lines
VWQqljhfacYPgp8KJUJENQ9h5hZ2nSCrI+W00Jcw4QcEdCI8HL5wmg==
-----END CERTIFICATE-----
```

- What is the order of certificates in case I want to add my intermediate(s)?

The order of adding certificates is as follows:

```
-----BEGIN CERTIFICATE----- 
(Your certificate)
-----END CERTIFICATE----- 
-----BEGIN CERTIFICATE----- 
(Your intermediate certificate)
-----END CERTIFICATE----- 
```

- How do I validate my certificate chain?

You can validate the certificate chain by using the `openssl` binary. If the output  of the command (See <u>Command to use:</u> below) ends with `Verify return code: 0 (ok)`, your certificate chain is valid. The `ca.pem` file should be the same as you supplied to the `rancher/rancher` container. When using a certificate signed by a well known Certificate Authority, you can omit the `-CAfile` parameter.

<u>Command to use:</u>
```
openssl s_client -CAfile ca.pem -connect rancher.yourdomain.com:443
...
    Verify return code: 0 (ok)
```
