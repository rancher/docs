---
title: Bootstrap Password
weight: 800
---

When Rancher starts for the first time, a password is randomly generated for the first admin user. When the admin first logs in to Rancher, the UI shows commands that can be used to retrieve the bootstrap password. The admin needs to run those commands and log in with the bootstrap password. Then Rancher gives the admin an opportunity to reset the password.

The bootstrap password is randomly generated if it is not set during installation with a variable. For details on how to set the bootstrap password using a variable, see below.

### Specifying the Bootstrap Password in Helm Installs

For a Helm install, users can specify the bootstrap password variable by configuring it in the Helm chart values with `.Values.bootstrapPassword`. The password will be stored in a Kubernetes secret and the UI will show instructions for how to retrieve password on `note.txt` after Rancher is installed.


### Specifying the Bootstrap Password in Docker Installs

For a Docker install, you can specify the bootstrap password by passing `-e CATTLE_BOOTSTRAP_PASSWORD=password` to the Docker install command.