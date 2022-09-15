Rancher Docs
------------

## Contributing

### Rancher Manager update

The Rancher Manager* documentation is moving. Please file any issues or pull requests at https://github.com/rancher/rancher-docs instead.

* = content/rancher

### K3s update

The K3s* documentation is moving. Please file any issues or pull requests at https://github.com/k3s-io/docs instead.

* = content/k3s

## Running for development/editing

The `rancher/docs:dev` docker image runs a live-updating server.  To run on your workstation, run:

Linux
```bash
  ./scripts/dev
```

Windows
```powershell
./scripts/dev-windows.ps1
```

and then navigate to http://localhost:9001/. Click the link on the card associated with a given Rancher version to
access the documentation. For example, clicking on the link of the Rancher v2.5 card will redirect to
http://localhost:9001/rancher/v2.5/en/. Note that due to the way the Rancher website is built, links in the top
navigation panel will not work.

You can customize the port by passing it as an argument:

Linux
```bash
  ./scripts/dev 8080
```

Windows
```powershell
./scripts/dev-windows.ps1 -port 8080
```

License
=======
Copyright (c) 2014-2022 [Rancher Labs, Inc.](https://rancher.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
