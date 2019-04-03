---
title: Node Providers
weight: 250
---

Node Provider is a simple interface provided to supply rke with external node providers. For example if a user provisions hosts with docker-machine `--node-provider docker-machine` could be passed when `rke config` is ran to pre-populate the nodes in cluster.yml

* [DOCKER_MACHINE]({{< baseurl >}}/rke/v0.1.x/en/config-options/node-providers/docker-machine)

## Creating a new provider

### The Interface

```go
type NodeConfigProvider interface {
	Init() error
	GetNodesFromConfig(reader *bufio.Reader) ([]string, error)
	ReadNodeConfigurations(deployNodes []string) ([]v3.RKEConfigNode, error)
}
```

### Regstering your new provider

In your `nodeproviders/myprovider/myprovider.go`
```go

import ncp "github.com/rancher/rke/nodeconfigproviders"

func init() {
	ncp.RegisterNodeConfigProvider("myprovider", &Provider{})
}
```

In `cmd/config.go` import your provider
```go
impor (
    _ "github.com/rancher/rke/nodeconfigproviders/dockermachine"
    _ "github.com/rancher/rke/nodeconfigproviders/myprovider"
)
```