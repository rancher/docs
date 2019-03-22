---
title: Notifiers
weight: 1
---

Notifiers are services that inform you of alert events. You can configure notifiers to send alert notifications to staff best suited to take corrective action.

Notifiers are configured at the cluster level. This model ensures that only cluster owners need to configure notifiers, leaving project owners to simply configure alerts in the scope of their projects. You don't need to dispense privileges like SMTP server access or cloud account access.

Rancher integrates with a variety of popular IT services, including:

- **Slack**: Send alert notifications to your Slack channels.
- **Email**: Choose email recipients for alert notifications.
- **PagerDuty**: Route notifications to staff by phone, SMS, or personal email.
- **WebHooks**: Update a webpage with alert notifications.
- **WeChat**: Send alert notifications to your Enterprise WeChat contacts.

## Adding Notifiers

Set up a notifier so that you can begin configuring and sending alerts.

1. From the **Global View**, open the cluster that you want to add a notifier.

1. From the main menu, select **Tools > Notifiers**. Then click **Add Notifier**.

1. Select the service you want to use as your notifier, and then fill out the form.
{{% accordion id="slack" label="Slack" %}}
1. Enter a **Name** for the notifier.
1. From Slack, create a webhook. For instructions, see the [Slack Documentation](https://get.slack.help/hc/en-us/articles/115005265063-Incoming-WebHooks-for-Slack).
1. From Rancher, enter your Slack webhook **URL**.
1. Enter the name of the channel that you want to send alert notifications in the following format: `#<channelname>`.

    Both public and private channels are supported.
1. Click **Test**. If the test is successful, the Slack channel you're configuring for the notifier outputs `Slack setting validated`.
{{% /accordion %}}
{{% accordion id="email" label="Email" %}}
1. Enter a **Name** for the notifier.
1. In the **Sender** field, enter an email address available on your mail server that you want to send the notification.
1. In the **Host** field, enter the IP address or hostname for your SMTP server. Example: `smtp.email.com`
1. In the **Port** field, enter the port used for email. Typically, TLS uses `587` and SSL uses `465`. If you're using TLS, make sure **Use TLS** is selected.
1. Enter a **Username** and **Password** that authenticate with the SMTP server.
1. In the **Default Recipient** field, enter the email address that you want to receive the notification.
1. Click **Test**. If the test is successful, Rancher prints `settings validated` and you receive a test notification email.
{{% /accordion %}}
{{% accordion id="pagerduty" label="PagerDuty" %}}
1. Enter a **Name** for the notifier.
1. From PagerDuty, create a webhook. For instructions, see the [PagerDuty Documentation](https://support.pagerduty.com/docs/webhooks).
1. From PagerDuty, copy the webhook's **Integration Key**.
1. From Rancher, enter the key in the **Service Key** field.
1. Click **Test**. If the test is successful, your PagerDuty endpoint outputs `PageDuty setting validated`.
{{% /accordion %}}
{{% accordion id="webhook" label="WebHook" %}}
1. Enter a **Name** for the notifier.
1. Using the app of your choice, create a webhook URL.
1. Enter your webhook **URL**.
1. Click **Test**. If the test is successful, the URL you're configuring as a notifier outputs `Webhook setting validated`.
{{% /accordion %}}
{{% accordion id="WeChat" label="WeChat" %}}

_Available as of v2.2.0_

1. Enter a **Name** for the notifier.
1. In the **Corporation ID** field, enter the "EnterpriseID" of your corporation, you could get it from [Profile page](https://work.weixin.qq.com/wework_admin/frame#profile).
1. From Enterprise WeChat, create an application in the [Application page](https://work.weixin.qq.com/wework_admin/frame#apps), and then enter the "AgentId" and "Secret" of this application to the **Application Agent ID** and **Application Secret** fields.
1. Select the **Recipient Type** and then enter a corresponding id to **Default Recipient** field, for example, the party id, tag id or user account that you want to receive the notification. You could get contact information from [Contacts page](https://work.weixin.qq.com/wework_admin/frame#contacts).
{{% /accordion %}}

1. Click **Add** to complete adding the notifier.

**Result:** Your notifier is added to Rancher.

## What's Next?

After creating a notifier, set up alerts to receive notifications of Rancher system events.

- [Cluster owners]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) can set up alerts at the [cluster level]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/alerts/).
- [Project owners]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles) can set up alerts at the [project level]({{< baseurl >}}/rancher/v2.x/en/project-admin/tools/alerts/).

## Managing Notifiers

After you set up notifiers, you can manage them. From the **Global** view, open the cluster that you want to manage your notifiers. Select **Tools > Notifiers**. You can:

- **Edit** their settings that you configured during their initial setup.
- **Clone** them, to quickly setup slightly different notifiers.
- **Delete** them when they're no longer necessary.
