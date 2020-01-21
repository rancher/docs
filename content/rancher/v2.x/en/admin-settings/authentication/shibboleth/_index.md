---
title: Configuring Shibboleth (SAML)
weight: 1210
---

_Available as of v2.4.0_


Shibboleth

Select the Shibboleth icon. Fill in the configuration for the Shibboleth account, Save the information and Test that access control is working.

With Shibboleth, there are some known issues that you should be aware of if you are configuring to validate against it.

    There is no search or lookup support. When adding in users, the exact IDs must be inputted for the correct users to get access.
    When adding users to an environment, group IDs are not supported unless the admin, who turned on access control, is a member of the group.

Site Access

Depending on your authentication type, Rancher provides different levels of site access.
Active Directory/GitHub/Shibboleth

If you have authenticated with AD or GitHub, there will be 3 options available.

- Allow any valid Users - Any user within GitHub or Active Directory would be able to access your Rancher instance. This is not recommended for GitHub as it would be any user in GitHub!
- Allow members of Environments, plus Authorized Users and Organizations - Any user who is a member or owner of an environment will also have access to the Rancher instance as well as any user added to the Authorized Users and Organizations list.
- Restrict access only to Authorized Users and Organizations - Only users who are added to the Authorized Users and Organizations would have access to the Rancher instance. Even if a user has been added to an environment, they would not have access unless they are also added to the Authorized Users and Organizations section.

Anyone with the permissions for the Rancher instance will be given user permissions. They will not be able to view the Admin tab. You would explicitly need to change their account to be an admin account.

In order for users to view different environments, they will need to be added to the environment by an owner of the environment.