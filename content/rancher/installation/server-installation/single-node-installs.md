---
title: Single Node Installation
layout: single-docs
weight: 250
---

# Single-Node Installation

## Option 1: Single Container Install

Installing Rancher on a Linux host using a single Docker container is simple. Simply connect to your host and run the command below.

1.	Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection.

2.	From your shell, enter the following command:

	```
	$ sudo docker run -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher
	```

**Result:** Rancher is installed.

## Option 2: Single Container Install with etcd

## Option 3: Local Cluster Install
