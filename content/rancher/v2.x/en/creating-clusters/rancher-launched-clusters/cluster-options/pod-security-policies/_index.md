---
title: Pod Security Policies
weight: 50
aliases:

---

_Pod Security Policies_ (or PSPs) are objects that control security-sensitive aspects of pod specification (like root privileges). If a pod does not meet the conditions specified in the PSP, Kubernetes will not allow it to start, and Rancher will display an error message of `Pod <NAME> is forbidden: unable to validate...`.