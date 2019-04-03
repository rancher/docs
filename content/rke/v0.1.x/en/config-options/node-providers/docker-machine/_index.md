---
title: Docker-Machine Provider
weight: 250
---

The `docker-machine` provider reads the users `MACHINE_STORAGE_PATH` and prompts the user to use machines found in the path.


**It is important to note that the user used by docker-machine to provision the host must belong to the docker group and be able to execute docker commands. The user is written to the config.json for the machine and is passed to the cluster.yml.**

## Provisioning hosts with docker-machine

```bash
# Create a node that acts as a worker and controlplane node
docker-machine create -d virtualbox --engine-label worker=true --engine-label controlplane=true rancher01
```

If no labels are passed, it is assumed that each node will be an all-in-one node

| Key          | Value      |
| ------------ | ---------- |
| worker       | true/false |
| controlplane | true/false |
| etcd         | true/false |

## Running with rke config

```bash
# You can pass --node-provider or -N
$ rke config -N docker-machine
[+] Cluster Level SSH Private Key Path [~/.ssh/id_rsa]: 
# If the MACHINE_STORAGE_PATH is different from the default location, you may enter the new path here
[+] Docker Machine storage path [/Users/dustin.hendel/.docker/machine/machines]:
# Any docker-machine configs found in the path are presented
# When a default value is present hittng enter wil pass the default
# If there is none in the default value then no nodes were found in the path that was passed, press ctrl+c to exit
[+] Which  nodes would you like to use (cannot be none ctrl+c to exit) [rancher01,rancher02]:
```

Once the machines are passed, the configs for each node are read and written to the cluster.yml.

```go
func readNodeConfig(node, storePath string) (v3.RKEConfigNode, error) {
	nodeConfig := v3.RKEConfigNode{}
	config := &dockerMachineConfig{}
	configPath := fmt.Sprintf("%s/%s/config.json", storePath, node)

	configFile, err := ioutil.ReadFile(configPath)

	if err != nil {
		return nodeConfig, err
	}

	if err := json.Unmarshal(configFile, config); err != nil {
		return nodeConfig, err
	}

	if config.Driver.IPAddress == "" {
		logrus.Infof("IPAddress is not defined in the config.json for the machine %s", node)
	}

	sshPort := strconv.Itoa(config.Driver.SSHPort)

	if sshPort == "" {
		sshPort = "22"
	}

	nodeConfig.Address = config.Driver.IPAddress
	nodeConfig.SSHKeyPath = config.Driver.SSHKeyPath
	nodeConfig.User = config.Driver.SSHUser
	nodeConfig.Port = sshPort
	nodeConfig.Role = getRolesFromLabels(config)

	return nodeConfig, nil
}
```

It is recommended to double check the node settings once config is complete as some docker-machine drivers do not always write to the standard keys in the config. Rke will throw an `INFO` message if it cannot find the `IPADDRESS`.