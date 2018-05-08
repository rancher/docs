Rancher uses etcd as datastore. When using the Single Node Install, the embedded etcd will be used. The persistent data will be stored in `/var/lib/rancher` inside the container. You can bind mount a host volume to this location to preserve data on the host it is running on.

<u>Command to use:</u>

```
docker run -d -p 80:80 -p 443:443 \
  -v /host/rancher:/var/lib/rancher \
  rancher/rancher
```
