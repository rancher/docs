Rancher Docs
------------

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

and then navigate to http://localhost:9001/.  You can customize the port by passing it as an argument:

Linux
```bash
  ./scripts/dev 8080
```

Windows
```powershell
./scripts/dev-windows.ps1 -port 8080
```
## New versions of the docs

To create a new version of the documentation for a product:

1. Copy the most recent version of the product documentation to create a new version. If the most recent version is 1.2.4 and you'd like to create 1.2.5:

    ```sh
    cp -rf content/productName/v1.2.4 content/productName/v1.2.5
    ```

1. Add the version to the `params.versions` list in `config.toml`. Make sure that the list has the latest version first.

## License

Copyright (c) 2014-2019 [Rancher Labs, Inc.](https://rancher.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
