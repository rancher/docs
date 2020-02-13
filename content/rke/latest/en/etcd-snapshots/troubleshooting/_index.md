---
title: Troubleshooting
weight: 5
---

As of **v0.1.9**, the **rke-bundle-cert** container is removed on both success and failure of a restore. To debug any issues, you will need to look at the **logs** generated from rke.

As of **v0.1.8** and below, the **rke-bundle-cert** container is left over from a failed etcd restore. If you are having an issue with restoring an **etcd snapshot** then you can do the following on each etcd nodes before attempting to do another restore:

```
docker container rm --force rke-bundle-cert
```

The rke-bundle-cert container is usually removed when a backup or restore of **etcd** succeeds. Whenever something goes wrong, the **rke-bundle-cert** container will be left over. You can look
at the logs or inspect the container to see what the issue is.

```
docker container logs --follow rke-bundle-cert
docker container inspect rke-bundle-cert
```

The important thing to note is the mounts of the container and location of the `pki.bundle.tar.gz`.
