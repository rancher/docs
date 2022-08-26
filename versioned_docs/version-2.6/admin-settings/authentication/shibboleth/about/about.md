---
title: Group Permissions with Shibboleth and OpenLDAP
weight: 1
---

This page provides background information and context for Rancher users who intend to set up the Shibboleth authentication provider in Rancher. 

Because Shibboleth is a SAML provider, it does not support searching for groups. While a Shibboleth integration can validate user credentials, it can't be used to assign permissions to groups in Rancher without additional configuration.

One solution to this problem is to configure an OpenLDAP identity provider. With an OpenLDAP back end for Shibboleth, you will be able to search for groups in Rancher and assign them to resources such as clusters, projects, or namespaces from the Rancher UI.

### Terminology

- **Shibboleth** is a single sign-on log-in system for computer networks and the Internet. It allows people to sign in using just one identity to various systems. It validates user credentials, but does not, on its own, handle group memberships.
- **SAML:** Security Assertion Markup Language, an open standard for exchanging authentication and authorization data between an identity provider and a service provider.
- **OpenLDAP:** a free, open-source implementation of the Lightweight Directory Access Protocol (LDAP). It is used to manage an organization’s computers and users. OpenLDAP is useful for Rancher users because it supports groups. In Rancher, it is possible to assign permissions to groups so that they can access resources such as clusters, projects, or namespaces, as long as the groups already exist in the identity provider.
- **IdP or IDP:** An identity provider. OpenLDAP is an example of an identity provider.

### Adding OpenLDAP Group Permissions to Rancher Resources

The diagram below illustrates how members of an OpenLDAP group can access resources in Rancher that the group has permissions for.

For example, a cluster owner could add an OpenLDAP group to a cluster so that they have permissions view most cluster level resources and create new projects. Then the OpenLDAP group members will have access to the cluster as soon as they log in to Rancher.

In this scenario, OpenLDAP allows the cluster owner to search for groups when assigning persmissions. Without OpenLDAP, the functionality to search for groups would not be supported.

When a member of the OpenLDAP group logs in to Rancher, she is redirected to Shibboleth and enters her username and password.

Shibboleth validates her credentials, and retrieves user attributes from OpenLDAP, including groups. Then Shibboleth sends a SAML assertion to Rancher including the user attributes. Rancher uses the group data so that she can access all of the resources and permissions that her groups have permissions for.

![Adding OpenLDAP Group Permissions to Rancher Resources]({{<baseurl>}}/img/rancher/shibboleth-with-openldap-groups.svg)
 