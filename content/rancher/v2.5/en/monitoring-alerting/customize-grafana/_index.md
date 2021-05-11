---
title: Customizing Grafana Dashboards
weight: 9
---

there’s already a wealth of information provided by kube-state-metrics. Cpu utilization, memory utilization for different things across namespaces. If you just want resource metrics for prod, you don’t need to create a new ServiceMonitor for it. All you need to do is go to the prometheus UI and do a PromQL query to get the information.

	- let’s say you want metrics that apply only for the container alertmanager.
	- then you can do graphs of that over time.
	- link to the promql queries used to make grafana dashboards. To get those queries, 
	- go to grafana 
		- right click on a graphic and click explore
		- it shows you the PromQL queries that are embedded in it
		- show screenshot of how to get to explore
		- show screenshot of how to modify the query
		- can modify it
		- grafana shows you updated based on your modifications to the query
		- customizing grafana dashboards section
		- also link to persisting grafana dashboards section
