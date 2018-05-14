---
title: Pipelines
weight: 2350
---

Pipelines help you automate the software delivery process. You can integrate Rancher with GitHub to create a pipeline.

You can set up your pipeline to run a series of stages and steps to test your code and deploy it.

<dl>
	<dt>Pipelines</dt>
	<dd>Contain a series of stages and steps. Out-of-the-box, the pipelines feature supports fan out and in capabilities.</dd>
	<dt>Stages</dt>
	<dd>Executed sequentially. The next stage will not execute until all of the steps within the stage execute.</dd>
	<dt>Steps</dt>
	<dd>Are executed in parallel within a stage. </dd>
</dl>
