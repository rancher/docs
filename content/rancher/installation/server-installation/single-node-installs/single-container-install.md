---
title: Single Node Installation
draft: true
tags: [ "tag", "tag", "tag", "tag" ]
layout: single-left
categories:
  - ""
  - ""
---
# Single Container Install

{{< prereq_install >}}

## To Install Rancher Server

Install {{< product >}} by connecting to your Linux host and running the single container installation command.

1.	Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection.

2.	From your shell, enter the following command:

	```
	$ sudo docker run -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/server
	```

	>**Tip:** You can install different versions of {{< product >}} Server by using different [Server Tags](../../server-tags/).

**Result:** Rancher is installed.
