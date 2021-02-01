---
title: Notifiers
weight: 4
aliases:
  - /rancher/v2.0-v2.4/en/project-admin/tools/notifiers
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers
  - /rancher/v2.0-v2.4/en/monitoring-alerting/legacy/notifiers
  - /rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/notifiers
---

Notifiers are services that inform you of alert events. You can configure notifiers to send alert notifications to staff best suited to take corrective action.

Rancher integrates with a variety of popular IT services, including:

- **Slack**: Send alert notifications to your Slack channels.
- **Email**: Choose email recipients for alert notifications.
- **PagerDuty**: Route notifications to staff by phone, SMS, or personal email.
- **WebHooks**: Update a webpage with alert notifications.
- **WeChat**: (Available as of v2.2.0) Send alert notifications to your Enterprise WeChat contacts.
- **DingTalk**: (Available as of v2.4.6) Send alert notifications to DingTalk using a webhook.
- **Microsoft Teams**: (Available as of v2.4.6) Send alert notifications to Teams using a webhook.

This section covers the following topics:

- [Roles-based access control for notifiers](#roles-based-access-control-for-notifiers)
- [Adding notifiers](#adding-notifiers)
- [Configuration](#configuration)
- [Managing notifiers](#managing-notifiers)
- [Example payload for a webhook alert notifier](#example-payload-for-a-webhook-alert-notifier)

# Roles-based Access Control for Notifiers

Notifiers are configured at the cluster level. This model ensures that only cluster owners need to configure notifiers, leaving project owners to simply configure alerts in the scope of their projects. You don't need to dispense privileges like SMTP server access or cloud account access.

# Adding Notifiers

Set up a notifier so that you can begin configuring and sending alerts.

1. From the **Global View**, open the cluster that you want to add a notifier.
1. From the main menu, select **Tools > Notifiers**. Then click **Add Notifier**.
1. Select the service you want to use as your notifier, and then fill out the form. For help filling out the form, refer to the configuration section below.
1. Click **Test.** You should receive a notification confirming that the notifier is configured correctly.
1. Click **Add** to complete adding the notifier.

**Result:** Your notifier is added to Rancher.

# Configuration

- [Slack](#slack)
- [Email](#email)
- [PagerDuty](#pagerduty)
- [Webhook](#webhook)
- [WeChat](#wechat)
- [DingTalk](#dingtalk)
- [Microsoft Teams](#microsoft-teams)

### Slack

| Field | Explanation |
|----------|----------------------|
| Name | Enter a **Name** for the notifier.   |
| URL |    From Slack, create a webhook. For instructions, see the [Slack Documentation](https://get.slack.help/hc/en-us/articles/115005265063-Incoming-WebHooks-for-Slack). Then enter the Slack webhook URL.  |
| Default Channel |    Enter the name of the channel that you want to send alert notifications in the following format: `#<channelname>`. Both public and private channels are supported.    |
| Proxy URL |   Proxy for the Slack webhook.     |
| Send Resolved Alerts |  _Available as of v2.3.0_ Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage)     |

**Validation:** Click **Test**. If the test is successful, the Slack channel you're configuring for the notifier outputs **Slack setting validated.**

### Email

| Field | Explanation |
|----------|----------------------|
| Name | Enter a **Name** for the notifier.   |
| Default Recipient Address |  Enter the email address that you want to receive the notification.   |
| Send Resolved Alerts |  _Available as of v2.3.0_ Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage)   |

SMTP Server Configuration:

| Field | Explanation |
|----------|----------------------|
| Sender |   Enter an email address available on your mail server that you want to send the notification.   |
| Host |   Enter the IP address or hostname for your SMTP server. Example: `smtp.email.com`   |
| Port |  In the **Port** field, enter the port used for email. Typically, TLS uses `587` and SSL uses `465`. |
| Use TLS | If you're using TLS, make sure **Use TLS** is selected.    |
| Username   |  Username to authenticate with the SMTP server.   |
| Password |  Password to authenticate with the SMTP server.    |

**Validation:** Click **Test**. If the test is successful, Rancher prints **settings validated** and you receive a test notification email.

### PagerDuty

| Field | Explanation |
|----------|----------------------|
| Name |  Enter a **Name** for the notifier. |
| Default Integration Key | From PagerDuty, create a Prometheus integration. For instructions, see the [PagerDuty Documentation](https://www.pagerduty.com/docs/guides/prometheus-integration-guide/). Then enter the integration key.
| Service Key | The same as the integration key. For instructions on creating a Prometheus integration, see the [PagerDuty Documentation](https://www.pagerduty.com/docs/guides/prometheus-integration-guide/). Then enter the integration key. |
| Send Resolved Alerts |  _Available as of v2.3.0_ Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage)   |

**Validation:** Click **Test**. If the test is successful, your PagerDuty endpoint outputs **PagerDuty setting validated.**

### Webhook

| Field | Explanation |
|----------|----------------------|
| Name |  Enter a **Name** for the notifier. |
| URL |  Using the app of your choice, create a webhook URL. |
| Proxy URL | Proxy for the webhook. |
| Send Resolved Alerts |  _Available as of v2.3.0_ Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage)   |

**Validation:** Click **Test**. If the test is successful, the URL you're configuring as a notifier outputs **Webhook setting validated.**

### WeChat

_Available as of v2.2.0_

| Field | Explanation |
|----------|----------------------|
| Name |  Enter a **Name** for the notifier. |
| Corporation ID |    Enter the "EnterpriseID" of your corporation. You can get it fro the [Profile page](https://work.weixin.qq.com/wework_admin/frame#profile). |
| Application Agent ID | From Enterprise WeChat, create an application in the [Application page](https://work.weixin.qq.com/wework_admin/frame#apps), and then enter the "AgentId" of this application. You will also need to enter the application secret. |
| Application Secret |   The secret that corresponds to the Application Agent ID. | 
| Recipient Type |  Party, tag, or user.   |
| Default Recipient |  The default recipient ID should correspond to the recipient type. It should be the party ID, tag ID or user account that you want to receive the notification. You could get contact information from [Contacts page](https://work.weixin.qq.com/wework_admin/frame#contacts).  |
| Proxy URL |  If you are using a proxy, enter the proxy URL.   |
| Send Resolved Alerts |  _Available as of v2.3.0_ Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage)  |

**Validation:** Click **Test.** If the test is successful, you should receive an alert message.

### DingTalk

_Available as of v2.4.6_

| Field | Explanation |
|----------|----------------------|
| Name |  Enter a **Name** for the notifier. |
| Webhook URL |   Enter the DingTalk webhook URL. For help setting up the webhook, refer to the [DingTalk documentation.](https://www.alibabacloud.com/help/doc-detail/52872.htm)    |
| Secret |   Optional: Enter a secret for the DingTalk webhook.   |
| Proxy URL |    Optional: Enter a proxy for the DingTalk webhook.  |
| Send Resolved Alerts |  Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage)   |

**Validation:** Click **Test.** If the test is successful, the DingTalk notifier output is **DingTalk setting validated.**

### Microsoft Teams

_Available as of v2.4.6_

| Field | Explanation |
|----------|----------------------|
| Name |  Enter a **Name** for the notifier. |
| Webhook URL |   Enter the Microsoft Teams webhook URL. For help setting up the webhook, refer to the [Teams Documentation.](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)    |
| Proxy URL | Optional: Enter a proxy for the Teams webhook. |
| Send Resolved Alerts |  Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage)   |

**Validation:** Click **Test.** If the test is successful, the Teams notifier output is **MicrosoftTeams setting validated.**

# Managing Notifiers

After you set up notifiers, you can manage them. From the **Global** view, open the cluster that you want to manage your notifiers. Select **Tools > Notifiers**. You can:

- **Edit** their settings that you configured during their initial setup.
- **Clone** them, to quickly setup slightly different notifiers.
- **Delete** them when they're no longer necessary.

# Example Payload for a Webhook Alert Notifier

```json
{
  "receiver": "c-2a3bc:kube-components-alert",
  "status": "firing",
  "alerts": [
    {
      "status": "firing",
      "labels": {
        "alert_name": "Scheduler is unavailable",
        "alert_type": "systemService",
        "cluster_name": "mycluster (ID: c-2a3bc)",
        "component_name": "scheduler",
        "group_id": "c-2a3bc:kube-components-alert",
        "logs": "Get http://127.0.0.1:10251/healthz: dial tcp 127.0.0.1:10251: connect: connection refused",
        "rule_id": "c-2a3bc:kube-components-alert_scheduler-system-service",
        "severity": "critical"
      },
      "annotations": {},
      "startsAt": "2020-01-30T19:18:13.321684733Z",
      "endsAt": "0001-01-01T00:00:00Z",
      "generatorURL": ""
    }
  ],
  "groupLabels": {
    "component_name": "scheduler",
    "rule_id": "c-2a3bc:kube-components-alert_scheduler-system-service"
  },
  "commonLabels": {
    "alert_name": "Scheduler is unavailable",
    "alert_type": "systemService",
    "cluster_name": "mycluster (ID: c-2a3bc)"
  }
}
```
# What's Next?

After creating a notifier, set up alerts to receive notifications of Rancher system events.

- [Cluster owners]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) can set up alerts at the [cluster level]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/alerts/).
- [Project owners]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#project-roles) can set up alerts at the [project level]({{<baseurl>}}/rancher/v2.0-v2.4/en/project-admin/tools/alerts/).
