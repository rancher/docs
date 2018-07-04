---
title: Round Robin DNS
weight: 277
---

If you don't have load balancers available in your environment, you can substitute with a Round Robin DNS entry.

Create multiple `A` records for the same DNS endpoint. Your DNS server will rotate the IP addresses when queried.

You can use tools like `dig` or `nslookup` to see all the records.

```
$ dig rancher.example.com

; <<>> DiG 9.11.3-1ubuntu1.1-Ubuntu <<>> rancher.example.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 28524
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1280
;; QUESTION SECTION:
;rancher.example.com.	IN	A

;; ANSWER SECTION:
rancher.example.com. 300 IN	A	18.188.33.133
rancher.example.com. 300 IN	A	13.58.200.233
rancher.example.com. 300 IN	A	18.217.100.233

;; Query time: 60 msec
;; SERVER: 192.168.5.1#53(192.168.5.1)
;; WHEN: Tue Jul 03 20:04:50 CDT 2018
;; MSG SIZE  rcvd: 104
```