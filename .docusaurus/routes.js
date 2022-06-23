import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '760'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'f31'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '578'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '1f6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'fc3'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '248'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '421'),
    exact: true
  },
  {
    path: '/2.0-2.4',
    component: ComponentCreator('/2.0-2.4', 'bd3'),
    routes: [
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings', '404'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication', 'b6c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/ad',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/ad', 'c2f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/azure-ad',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/azure-ad', 'c11'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/freeipa',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/freeipa', '82b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/github',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/github', 'da7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/google',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/google', '042'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/keycloak',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/keycloak', '8a0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/local',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/local', 'e66'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/microsoft-adfs',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/microsoft-adfs', '9c7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup', '9b1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/microsoft-adfs/rancher-adfs-setup',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/microsoft-adfs/rancher-adfs-setup', 'e66'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/okta',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/okta', '0f0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/openldap',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/openldap', '23b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/openldap/openldap-config',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/openldap/openldap-config', 'a75'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/ping-federate',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/ping-federate', '299'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/shibboleth',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/shibboleth', '010'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/shibboleth/about',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/shibboleth/about', 'c43'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/user-groups',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/authentication/user-groups', '814'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/config-private-registry',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/config-private-registry', 'a60'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/drivers',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/drivers', 'a4b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/drivers/cluster-drivers',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/drivers/cluster-drivers', '00e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/drivers/node-drivers',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/drivers/node-drivers', '620'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/k8s-metadata',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/k8s-metadata', '749'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/pod-security-policies',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/pod-security-policies', '41d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rbac',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rbac', 'fc8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles', '0fb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rbac/default-custom-roles',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rbac/default-custom-roles', '1dd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rbac/global-permissions',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rbac/global-permissions', 'd83'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rbac/locked-roles',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rbac/locked-roles', '39d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates', '3ab'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/applying-templates',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/applying-templates', 'c64'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/creating-and-revising',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/creating-and-revising', '095'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/creator-permissions',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/creator-permissions', '0ec'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/enforcement',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/enforcement', '847'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/example-scenarios',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/example-scenarios', '484'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/example-yaml',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/example-yaml', 'fa8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/overrides',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/overrides', 'f25'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/rke-templates-and-hardware',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/rke-templates-and-hardware', 'b28'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/template-access-and-sharing',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/admin-settings/rke-templates/template-access-and-sharing', 'bd2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/api',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/api', '129'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/api/api-tokens',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/api/api-tokens', '46d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/backups',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/backups', 'dbb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/backups/backup',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/backups/backup', 'd0b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/backups/backup/docker-backups',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/backups/backup/docker-backups', '099'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/backups/backup/k3s-backups',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/backups/backup/k3s-backups', 'd92'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/backups/backup/rke-backups',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/backups/backup/rke-backups', '96e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/backups/restore',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/backups/restore', '4e4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/backups/restore/docker-restores',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/backups/restore/docker-restores', '272'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/backups/restore/k3s-restore',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/backups/restore/k3s-restore', '8a0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/backups/restore/rke-restore',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/backups/restore/rke-restore', 'ec7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/backups/restore/rke-restore/v2.0-v2.1',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/backups/restore/rke-restore/v2.0-v2.1', '352'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/best-practices',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/best-practices', '8b2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/best-practices/containers',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/best-practices/containers', '0b6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/best-practices/deployment-strategies',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/best-practices/deployment-strategies', '59b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/best-practices/deployment-types',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/best-practices/deployment-types', '547'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/best-practices/management',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/best-practices/management', '327'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cli',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cli', 'f96'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin', 'fba'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/backing-up-etcd',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/backing-up-etcd', 'ced'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/certificate-rotation',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/certificate-rotation', '0ad'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/cleaning-cluster-nodes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/cleaning-cluster-nodes', 'd96'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/cloning-clusters',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/cloning-clusters', '426'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/cluster-access',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/cluster-access', 'e75'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/cluster-access/ace',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/cluster-access/ace', '780'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/cluster-access/cluster-members',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/cluster-access/cluster-members', '07e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/cluster-access/kubectl',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/cluster-access/kubectl', '5d7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/cluster-autoscaler',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/cluster-autoscaler', 'f99'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/cluster-autoscaler/amazon',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/cluster-autoscaler/amazon', '187'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/editing-clusters',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/editing-clusters', 'fe4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/nodes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/nodes', 'd2e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/pod-security-policy',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/pod-security-policy', 'f59'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/projects-and-namespaces',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/projects-and-namespaces', 'e01'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/restoring-etcd',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/restoring-etcd', 'c3e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools', '1f0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cis-scans',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cis-scans', 'b2f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cis-scans/skipped-tests',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cis-scans/skipped-tests', 'd50'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-alerts',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-alerts', '52f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-alerts/default-alerts',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-alerts/default-alerts', '83d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-logging',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-logging', '6e0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-logging/elasticsearch',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-logging/elasticsearch', 'b83'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-logging/fluentd',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-logging/fluentd', 'df2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-logging/kafka',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-logging/kafka', '02c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-logging/splunk',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-logging/splunk', 'ad9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-logging/syslog',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-logging/syslog', '5a8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring', '196'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring/cluster-metrics',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring/cluster-metrics', 'e03'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring/custom-metrics',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring/custom-metrics', '2e5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring/expression',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring/expression', '8dd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring/project-monitoring',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring/project-monitoring', '294'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring/prometheus',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring/prometheus', '7d6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring/viewing-metrics',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/cluster-monitoring/viewing-metrics', '56a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio', '642'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/disabling-istio',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/disabling-istio', '9a9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/rbac',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/rbac', '62e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/release-notes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/release-notes', '015'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/resources',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/resources', '9d8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup', '893'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/deploy-workloads',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/deploy-workloads', '79a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster', 'b0f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster/enable-istio-with-psp',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster/enable-istio-with-psp', 'a7b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/enable-istio-in-namespace',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/enable-istio-in-namespace', '626'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/gateway',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/gateway', '213'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/node-selectors',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/node-selectors', 'a89'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/set-up-traffic-management',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/set-up-traffic-management', '98f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/view-traffic',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/istio/setup/view-traffic', '5cc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/notifiers',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/notifiers', '104'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/opa-gatekeeper',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/tools/opa-gatekeeper', '80e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/upgrading-kubernetes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/upgrading-kubernetes', '3c9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage', '036'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/attaching-existing-storage',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/attaching-existing-storage', '910'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/examples',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/examples', '455'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/examples/ebs',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/examples/ebs', '813'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/examples/nfs',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/examples/nfs', '45f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/examples/vsphere',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/examples/vsphere', '5f2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/glusterfs-volumes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/glusterfs-volumes', 'fca'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/how-storage-works',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/how-storage-works', '085'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/iscsi-volumes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/iscsi-volumes', '808'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/provisioning-new-storage',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-admin/volumes-and-storage/provisioning-new-storage', 'f22'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning', 'd9e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/cluster-capabilities-table',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/cluster-capabilities-table', '77a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters', '968'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/ack',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/ack', '2a6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/aks',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/aks', 'e2e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/cce',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/cce', '464'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/eks',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/eks', '731'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/gke',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/gke', 'af9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/tke',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/tke', 'a1d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/imported-clusters',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/imported-clusters', '890'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/node-requirements',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/node-requirements', '405'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/production',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/production', '453'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/production/nodes-and-roles',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/production/nodes-and-roles', '457'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/production/recommended-architecture',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/production/recommended-architecture', 'dc6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters', '39d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers', '5ab'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/amazon',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/amazon', '54e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/azure',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/azure', 'e56'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/gce',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/gce', '147'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere', 'da7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/custom-nodes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/custom-nodes', 'a85'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/custom-nodes/agent-options',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/custom-nodes/agent-options', 'bbb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools', '3b3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/azure',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/azure', '04b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/azure/azure-node-template-config',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/azure/azure-node-template-config', 'ffe'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean', 'a02'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean/do-node-template-config',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean/do-node-template-config', '379'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/ec2',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/ec2', '2dc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/ec2/ec2-node-template-config',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/ec2/ec2-node-template-config', 'c53'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere', '8ce'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/creating-credentials',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/creating-credentials', '2ab'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters', '2b8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config', '9c1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/prior-to-2.0.4',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/prior-to-2.0.4', '1eb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/v2.0.4',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/v2.0.4', 'e04'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/v2.2.0',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/v2.2.0', '9fb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/v2.3.0',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/v2.3.0', '835'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/v2.3.3',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/v2.3.3', 'e90'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options', 'dfe'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options/pod-security-policies',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options/pod-security-policies', 'ffa'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/rancher-agents',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/rancher-agents', 'd7e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/windows-clusters',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/windows-clusters', '3d4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/windows-clusters/azure-storageclass',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/windows-clusters/azure-storageclass', '956'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/windows-clusters/docs-for-2.1-and-2.2',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/windows-clusters/docs-for-2.1-and-2.2', 'a51'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements', '10c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/contributing',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/contributing', 'd9e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/deploy-across-clusters',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/deploy-across-clusters', '81d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/faq',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/faq', 'a04'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/faq/kubectl',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/faq/kubectl', '5ce'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/faq/networking',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/faq/networking', '81b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/faq/networking/cni-providers',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/faq/networking/cni-providers', '391'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/faq/removing-rancher',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/faq/removing-rancher', '9e6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/faq/security',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/faq/security', '97d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/faq/technical',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/faq/technical', '5e3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/faq/telemetry',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/faq/telemetry', '029'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/faq/upgrades-to-2x',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/faq/upgrades-to-2x', '6b1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/helm-charts',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/helm-charts', 'cf4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/helm-charts/adding-catalogs',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/helm-charts/adding-catalogs', '9f9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/helm-charts/built-in',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/helm-charts/built-in', 'c37'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/helm-charts/catalog-config',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/helm-charts/catalog-config', '88e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/helm-charts/creating-apps',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/helm-charts/creating-apps', '85d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/helm-charts/globaldns',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/helm-charts/globaldns', 'e50'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/helm-charts/launching-apps',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/helm-charts/launching-apps', '81d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/helm-charts/managing-apps',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/helm-charts/managing-apps', 'cf3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/helm-charts/multi-cluster-apps',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/helm-charts/multi-cluster-apps', '0cb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/helm-charts/tutorial',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/helm-charts/tutorial', 'cf5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation', 'c32'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s', 'df5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options', 'bce'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s/rollbacks',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s/rollbacks', 'f97'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades', 'd32'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades/helm2',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades/helm2', 'de3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades/migrating-from-rke-add-on',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades/migrating-from-rke-add-on', '412'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades/namespace-migration',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades/namespace-migration', '7bf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods', '4ac'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/air-gap',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/air-gap', 'ffc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/air-gap/install-rancher',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/air-gap/install-rancher', 'f15'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/air-gap/launch-kubernetes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/air-gap/launch-kubernetes', 'dd2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/air-gap/populate-private-registry',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/air-gap/populate-private-registry', '0a8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/air-gap/prepare-nodes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/air-gap/prepare-nodes', '01e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/behind-proxy',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/behind-proxy', '42b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/behind-proxy/install-rancher',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/behind-proxy/install-rancher', 'e77'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/behind-proxy/launch-kubernetes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/behind-proxy/launch-kubernetes', 'a25'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/behind-proxy/prepare-nodes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/behind-proxy/prepare-nodes', 'da9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker', 'b47'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/advanced',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/advanced', 'a33'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/proxy',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/proxy', '89f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/single-node-rollbacks',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/single-node-rollbacks', '5ec'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/single-node-upgrades',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/single-node-upgrades', '2e2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/troubleshooting',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/troubleshooting', '244'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/requirements',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/requirements', '8de'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/requirements/installing-docker',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/requirements/installing-docker', '062'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/requirements/ports',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/requirements/ports', 'ff6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/requirements/ports/common-ports-table',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/requirements/ports/common-ports-table', '7c3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources', 'a79'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced', '71e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/air-gap-helm2',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/air-gap-helm2', 'b36'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/air-gap-helm2/install-rancher',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/air-gap-helm2/install-rancher', '538'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/air-gap-helm2/launch-kubernetes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/air-gap-helm2/launch-kubernetes', 'a5e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/air-gap-helm2/populate-private-registry',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/air-gap-helm2/populate-private-registry', '1bc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/air-gap-helm2/prepare-nodes',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/air-gap-helm2/prepare-nodes', 'c0e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/api-audit-log',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/api-audit-log', '076'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/arm64-platform',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/arm64-platform', 'bc0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/cluster-yml-templates',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/cluster-yml-templates', 'a03'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/cluster-yml-templates/node-certificate',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/cluster-yml-templates/node-certificate', '07d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/cluster-yml-templates/node-certificate-recognizedca',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/cluster-yml-templates/node-certificate-recognizedca', '89f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/cluster-yml-templates/node-externalssl-certificate',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/cluster-yml-templates/node-externalssl-certificate', '62e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/cluster-yml-templates/node-externalssl-recognizedca',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/cluster-yml-templates/node-externalssl-recognizedca', '347'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/etcd',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/etcd', 'a82'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/firewall',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/firewall', '8e5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2', 'e0a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/create-nodes-lb',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/create-nodes-lb', '98d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/create-nodes-lb/nginx',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/create-nodes-lb/nginx', '8e7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/create-nodes-lb/nlb',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/create-nodes-lb/nlb', '965'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/helm-init',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/helm-init', 'e51'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/helm-init/troubleshooting',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/helm-init/troubleshooting', '91e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/helm-rancher',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/helm-rancher', '886'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/helm-rancher/chart-options',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/helm-rancher/chart-options', '20e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/helm-rancher/tls-secrets',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/helm-rancher/tls-secrets', '0b3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/helm-rancher/troubleshooting',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/helm-rancher/troubleshooting', '137'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/kubernetes-rke',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/kubernetes-rke', '9d0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/kubernetes-rke/troubleshooting',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/kubernetes-rke/troubleshooting', '50a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on', 'afb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/api-auditing',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/api-auditing', '28e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/layer-4-lb',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/layer-4-lb', '179'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/layer-4-lb/nlb',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/layer-4-lb/nlb', '80a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/layer-7-lb',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/layer-7-lb', 'b83'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/layer-7-lb/alb',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/layer-7-lb/alb', '014'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/layer-7-lb/nginx',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/layer-7-lb/nginx', 'abd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/proxy',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/proxy', 'deb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/troubleshooting',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/troubleshooting', 'db3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/troubleshooting/default-backend',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/troubleshooting/default-backend', '051'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/troubleshooting/generic-troubleshooting',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/troubleshooting/generic-troubleshooting', '70c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/troubleshooting/job-complete-status',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/troubleshooting/job-complete-status', '425'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/rke-add-on/layer-4-lb',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/rke-add-on/layer-4-lb', 'db4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/rke-add-on/layer-7-lb',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/rke-add-on/layer-7-lb', 'c3c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/single-node-install-external-lb',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/advanced/single-node-install-external-lb', 'a9e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/chart-options',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/chart-options', '071'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/choosing-version',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/choosing-version', 'daf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/custom-ca-root-certificate',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/custom-ca-root-certificate', 'ad0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/feature-flags',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/feature-flags', '702'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/feature-flags/enable-not-default-storage-drivers',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/feature-flags/enable-not-default-storage-drivers', 'de3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/feature-flags/istio-virtual-service-ui',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/feature-flags/istio-virtual-service-ui', '908'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/helm-version',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/helm-version', '883'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials', 'd31'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/ha-RKE',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/ha-RKE', 'b7c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/ha-with-external-db',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/ha-with-external-db', '56c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/how-ha-works',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/how-ha-works', 'd54'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials', '925'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/ec2-node',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/ec2-node', '47b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha', '5bf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha-with-external-db',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha-with-external-db', '877'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nginx',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nginx', 'de1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nlb',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nlb', '0f0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/rds',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/rds', 'eb1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/local-system-charts',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/local-system-charts', 'c13'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/tls-secrets',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/tls-secrets', 'b96'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/tls-settings',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/tls-settings', '918'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/troubleshooting',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/troubleshooting', '733'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/update-rancher-cert',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/update-rancher-cert', '27b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/upgrading-cert-manager',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/upgrading-cert-manager', 'b59'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/installation/resources/upgrading-cert-manager/helm-2-instructions',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/installation/resources/upgrading-cert-manager/helm-2-instructions', '738'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/introduction',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/introduction', '4c3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher', '2f3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/certificates',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/certificates', 'e5b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/configmaps',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/configmaps', '1e1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/horitzontal-pod-autoscaler',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/horitzontal-pod-autoscaler', 'eed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/horitzontal-pod-autoscaler/hpa-background',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/horitzontal-pod-autoscaler/hpa-background', 'e05'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/horitzontal-pod-autoscaler/hpa-for-rancher-before-2_0_7',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/horitzontal-pod-autoscaler/hpa-for-rancher-before-2_0_7', 'a54'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl', '4c3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-rancher-ui',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-rancher-ui', '052'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/horitzontal-pod-autoscaler/testing-hpa',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/horitzontal-pod-autoscaler/testing-hpa', 'cad'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress', 'd90'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress/ingress',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress/ingress', '33b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers', '7de'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/registries',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/registries', 'c7e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/secrets',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/secrets', 'e19'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/service-discovery',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/service-discovery', 'd12'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/workloads',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/workloads', '280'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/workloads/add-a-sidecar',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/workloads/add-a-sidecar', '0db'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/workloads/deploy-workloads',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/workloads/deploy-workloads', 'f8c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/workloads/rollback-workloads',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/workloads/rollback-workloads', '4a9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/workloads/upgrade-workloads',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/k8s-in-rancher/workloads/upgrade-workloads', '95b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/overview',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/overview', 'ec2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/overview/architecture',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/overview/architecture', '0da'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/overview/architecture-recommendations',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/overview/architecture-recommendations', 'b7e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/overview/concepts',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/overview/concepts', '195'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/pipelines',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/pipelines', '2c0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/pipelines/concepts',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/pipelines/concepts', 'a50'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/pipelines/config',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/pipelines/config', '0fb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/pipelines/docs-for-v2.0.x',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/pipelines/docs-for-v2.0.x', '62a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/pipelines/example',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/pipelines/example', 'b9e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/pipelines/example-repos',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/pipelines/example-repos', '693'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/pipelines/storage',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/pipelines/storage', '62d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin', '8cb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin/namespaces',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin/namespaces', 'd6f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin/pipelines',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin/pipelines', '306'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin/pod-security-policies',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin/pod-security-policies', 'a94'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin/project-members',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin/project-members', 'ebe'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin/resource-quotas',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin/resource-quotas', '0fa'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin/resource-quotas/override-container-default',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin/resource-quotas/override-container-default', 'c1f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin/resource-quotas/override-namespace-default',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin/resource-quotas/override-namespace-default', '608'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin/resource-quotas/quota-type-reference',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin/resource-quotas/quota-type-reference', '0ed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin/resource-quotas/quotas-for-projects',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin/resource-quotas/quotas-for-projects', 'd9a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin/tools',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin/tools', '4cf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin/tools/project-alerts',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin/tools/project-alerts', '6b3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/project-admin/tools/project-logging',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/project-admin/tools/project-logging', '1c8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/quick-start-guide',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/quick-start-guide', 'dd0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/quick-start-guide/cli',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/quick-start-guide/cli', 'e23'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment', '496'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment/amazon-aws-qs',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment/amazon-aws-qs', '0ba'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment/digital-ocean-qs',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment/digital-ocean-qs', '343'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment/google-gcp-qs',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment/google-gcp-qs', 'ff6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment/microsoft-azure-qs',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment/microsoft-azure-qs', '65a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment/quickstart-manual-setup',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment/quickstart-manual-setup', '8b1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment/quickstart-vagrant',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/quick-start-guide/deployment/quickstart-vagrant', '5b1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/quick-start-guide/workload',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/quick-start-guide/workload', '6fe'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/quick-start-guide/workload/quickstart-deploy-workload-ingress',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/quick-start-guide/workload/quickstart-deploy-workload-ingress', 'f15'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/quick-start-guide/workload/quickstart-deploy-workload-nodeport',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/quick-start-guide/workload/quickstart-deploy-workload-nodeport', 'c36'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security', '7e4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/cve',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/cve', 'b17'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.1',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.1', '2f7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.1/benchmark-2.1',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.1/benchmark-2.1', '002'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.1/hardening-2.1',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.1/hardening-2.1', 'a69'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.2',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.2', '1d4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.2/benchmark-2.2',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.2/benchmark-2.2', '36a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.2/hardening-2.2',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.2/hardening-2.2', '07e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x', 'b33'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.0',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.0', 'ee2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.0/benchmark-2.3',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.0/benchmark-2.3', 'aeb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.0/hardening-2.3',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.0/hardening-2.3', 'a8d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.3',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.3', '8cb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.3/benchmark-2.3.3',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.3/benchmark-2.3.3', '188'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.3/hardening-2.3.3',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.3/hardening-2.3.3', '8fc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.5',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.5', '810'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.5/benchmark-2.3.5',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.5/benchmark-2.3.5', '90d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.5/hardening-2.3.5',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.5/hardening-2.3.5', '61e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.4',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.4', 'b13'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.4/benchmark-2.4',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.4/benchmark-2.4', '3cf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/rancher-2.4/hardening-2.4',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/rancher-2.4/hardening-2.4', '0bf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/security/security-scan',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/security/security-scan', 'db0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/system-tools',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/system-tools', 'c91'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/troubleshooting',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/troubleshooting', '451'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/troubleshooting/dns',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/troubleshooting/dns', '8cd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/troubleshooting/imported-clusters',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/troubleshooting/imported-clusters', '493'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/troubleshooting/kubernetes-components',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/troubleshooting/kubernetes-components', '02b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/troubleshooting/kubernetes-components/controlplane',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/troubleshooting/kubernetes-components/controlplane', '31f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/troubleshooting/kubernetes-components/etcd',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/troubleshooting/kubernetes-components/etcd', '081'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/troubleshooting/kubernetes-components/nginx-proxy',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/troubleshooting/kubernetes-components/nginx-proxy', 'ede'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/troubleshooting/kubernetes-components/worker-and-generic',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/troubleshooting/kubernetes-components/worker-and-generic', 'f7e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/troubleshooting/kubernetes-resources',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/troubleshooting/kubernetes-resources', '7c2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/troubleshooting/logging',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/troubleshooting/logging', 'c30'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/troubleshooting/networking',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/troubleshooting/networking', '5e4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/troubleshooting/rancherha',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/troubleshooting/rancherha', 'a43'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/user-settings',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/user-settings', 'b6a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/user-settings/api-keys',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/user-settings/api-keys', '829'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/user-settings/cloud-credentials',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/user-settings/cloud-credentials', '8f2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/user-settings/node-templates',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/user-settings/node-templates', '911'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/user-settings/preferences',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/user-settings/preferences', '332'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/v1.6-migration',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/v1.6-migration', 'ac5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/v1.6-migration/discover-services',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/v1.6-migration/discover-services', '380'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/v1.6-migration/expose-services',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/v1.6-migration/expose-services', 'ce5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/v1.6-migration/get-started',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/v1.6-migration/get-started', 'ca2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/v1.6-migration/kub-intro',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/v1.6-migration/kub-intro', '552'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/v1.6-migration/load-balancing',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/v1.6-migration/load-balancing', 'ce9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/v1.6-migration/monitor-apps',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/v1.6-migration/monitor-apps', 'ae3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/v1.6-migration/run-migration-tool',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/v1.6-migration/run-migration-tool', 'c93'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/v1.6-migration/run-migration-tool/migration-tools-ref',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/v1.6-migration/run-migration-tool/migration-tools-ref', '648'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.0-2.4/v2.0-v2.4/en/v1.6-migration/schedule-workloads',
        component: ComponentCreator('/2.0-2.4/v2.0-v2.4/en/v1.6-migration/schedule-workloads', 'c2a'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/2.5',
    component: ComponentCreator('/2.5', 'f0e'),
    routes: [
      {
        path: '/2.5/v2.5/en/admin-settings',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings', '03b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication', '43f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/ad',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/ad', '877'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/azure-ad',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/azure-ad', 'ab0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/freeipa',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/freeipa', '4a8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/github',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/github', 'a28'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/google',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/google', '491'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/keycloak',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/keycloak', '28d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/local',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/local', '639'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/microsoft-adfs',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/microsoft-adfs', 'b7e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup', '867'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/microsoft-adfs/rancher-adfs-setup',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/microsoft-adfs/rancher-adfs-setup', '10a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/okta',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/okta', '589'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/openldap',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/openldap', '01c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/openldap/openldap-config',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/openldap/openldap-config', '42d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/ping-federate',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/ping-federate', '176'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/shibboleth',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/shibboleth', '833'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/shibboleth/about',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/shibboleth/about', 'dc5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/authentication/user-groups',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/authentication/user-groups', '61c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/config-private-registry',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/config-private-registry', '93c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/drivers',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/drivers', '94e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/drivers/cluster-drivers',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/drivers/cluster-drivers', '827'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/drivers/node-drivers',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/drivers/node-drivers', 'a70'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/k8s-metadata',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/k8s-metadata', 'ed4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/pod-security-policies',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/pod-security-policies', 'c0e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rbac',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rbac', 'f4a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rbac/cluster-project-roles',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rbac/cluster-project-roles', '440'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rbac/default-custom-roles',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rbac/default-custom-roles', '5b3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rbac/global-permissions',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rbac/global-permissions', '93b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rbac/locked-roles',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rbac/locked-roles', 'f69'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rke-templates',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rke-templates', '11a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rke-templates/applying-templates',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rke-templates/applying-templates', 'fdc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rke-templates/creating-and-revising',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rke-templates/creating-and-revising', 'af6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rke-templates/creator-permissions',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rke-templates/creator-permissions', 'f3d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rke-templates/enforcement',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rke-templates/enforcement', '96f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rke-templates/example-scenarios',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rke-templates/example-scenarios', '1ab'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rke-templates/example-yaml',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rke-templates/example-yaml', 'c2b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rke-templates/overrides',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rke-templates/overrides', '279'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rke-templates/rke-templates-and-hardware',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rke-templates/rke-templates-and-hardware', 'b28'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/admin-settings/rke-templates/template-access-and-sharing',
        component: ComponentCreator('/2.5/v2.5/en/admin-settings/rke-templates/template-access-and-sharing', 'f4b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/api',
        component: ComponentCreator('/2.5/v2.5/en/api', '32e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/api/api-tokens',
        component: ComponentCreator('/2.5/v2.5/en/api/api-tokens', 'e34'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/backups',
        component: ComponentCreator('/2.5/v2.5/en/backups', 'cb6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/backups/back-up-rancher',
        component: ComponentCreator('/2.5/v2.5/en/backups/back-up-rancher', '23e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/backups/configuration',
        component: ComponentCreator('/2.5/v2.5/en/backups/configuration', '35e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/backups/configuration/backup-config',
        component: ComponentCreator('/2.5/v2.5/en/backups/configuration/backup-config', 'ea7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/backups/configuration/restore-config',
        component: ComponentCreator('/2.5/v2.5/en/backups/configuration/restore-config', '767'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/backups/configuration/storage-config',
        component: ComponentCreator('/2.5/v2.5/en/backups/configuration/storage-config', '801'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/backups/docker-installs',
        component: ComponentCreator('/2.5/v2.5/en/backups/docker-installs', '558'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/backups/docker-installs/docker-backups',
        component: ComponentCreator('/2.5/v2.5/en/backups/docker-installs/docker-backups', 'f18'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/backups/docker-installs/docker-restores',
        component: ComponentCreator('/2.5/v2.5/en/backups/docker-installs/docker-restores', 'b5f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/backups/examples',
        component: ComponentCreator('/2.5/v2.5/en/backups/examples', '6a0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/backups/migrating-rancher',
        component: ComponentCreator('/2.5/v2.5/en/backups/migrating-rancher', 'd49'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/backups/restoring-rancher',
        component: ComponentCreator('/2.5/v2.5/en/backups/restoring-rancher', '83f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/best-practices',
        component: ComponentCreator('/2.5/v2.5/en/best-practices', '1a1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/best-practices/rancher-managed',
        component: ComponentCreator('/2.5/v2.5/en/best-practices/rancher-managed', '8fd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/best-practices/rancher-managed/containers',
        component: ComponentCreator('/2.5/v2.5/en/best-practices/rancher-managed/containers', '643'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/best-practices/rancher-managed/logging',
        component: ComponentCreator('/2.5/v2.5/en/best-practices/rancher-managed/logging', 'b2b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/best-practices/rancher-managed/managed-vsphere',
        component: ComponentCreator('/2.5/v2.5/en/best-practices/rancher-managed/managed-vsphere', 'ce1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/best-practices/rancher-managed/monitoring',
        component: ComponentCreator('/2.5/v2.5/en/best-practices/rancher-managed/monitoring', '33c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/best-practices/rancher-server',
        component: ComponentCreator('/2.5/v2.5/en/best-practices/rancher-server', 'cdf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/best-practices/rancher-server/deployment-strategies',
        component: ComponentCreator('/2.5/v2.5/en/best-practices/rancher-server/deployment-strategies', '327'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/best-practices/rancher-server/deployment-types',
        component: ComponentCreator('/2.5/v2.5/en/best-practices/rancher-server/deployment-types', '1d2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/best-practices/rancher-server/rancher-in-vsphere',
        component: ComponentCreator('/2.5/v2.5/en/best-practices/rancher-server/rancher-in-vsphere', 'be9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cis-scans',
        component: ComponentCreator('/2.5/v2.5/en/cis-scans', '9d2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cis-scans/configuration',
        component: ComponentCreator('/2.5/v2.5/en/cis-scans/configuration', 'ce9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cis-scans/custom-benchmark',
        component: ComponentCreator('/2.5/v2.5/en/cis-scans/custom-benchmark', '3d5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cis-scans/rbac',
        component: ComponentCreator('/2.5/v2.5/en/cis-scans/rbac', '2f5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cis-scans/skipped-tests',
        component: ComponentCreator('/2.5/v2.5/en/cis-scans/skipped-tests', '143'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cli',
        component: ComponentCreator('/2.5/v2.5/en/cli', '8ca'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin', '1f4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/backing-up-etcd',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/backing-up-etcd', '16f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/certificate-rotation',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/certificate-rotation', 'fcf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/cleaning-cluster-nodes',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/cleaning-cluster-nodes', 'ffd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/cloning-clusters',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/cloning-clusters', '22c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/cluster-access',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/cluster-access', 'a04'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/cluster-access/ace',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/cluster-access/ace', 'ecd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/cluster-access/cluster-members',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/cluster-access/cluster-members', '4a9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/cluster-access/kubectl',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/cluster-access/kubectl', '3d6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/cluster-autoscaler',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/cluster-autoscaler', 'c6e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/cluster-autoscaler/amazon',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/cluster-autoscaler/amazon', 'cfa'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/editing-clusters',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/editing-clusters', 'e9e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/editing-clusters/eks-config-reference',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/editing-clusters/eks-config-reference', '486'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/editing-clusters/gke-config-reference',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/editing-clusters/gke-config-reference', '8c9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/editing-clusters/gke-config-reference/private-clusters',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/editing-clusters/gke-config-reference/private-clusters', '5ee'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/editing-clusters/rke-config-reference',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/editing-clusters/rke-config-reference', '0d5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/editing-clusters/syncing',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/editing-clusters/syncing', '64b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/nodes',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/nodes', '315'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/pod-security-policy',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/pod-security-policy', '136'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/projects-and-namespaces',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/projects-and-namespaces', '872'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/restoring-etcd',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/restoring-etcd', '8aa'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/tools',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/tools', '68c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/upgrading-kubernetes',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/upgrading-kubernetes', '29f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/volumes-and-storage',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/volumes-and-storage', '8f7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/volumes-and-storage/attaching-existing-storage',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/volumes-and-storage/attaching-existing-storage', '06b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/volumes-and-storage/ceph',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/volumes-and-storage/ceph', '7ab'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/volumes-and-storage/examples',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/volumes-and-storage/examples', 'c7a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/volumes-and-storage/examples/ebs',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/volumes-and-storage/examples/ebs', '157'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/volumes-and-storage/examples/nfs',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/volumes-and-storage/examples/nfs', '19f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/volumes-and-storage/examples/vsphere',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/volumes-and-storage/examples/vsphere', 'c88'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/volumes-and-storage/glusterfs-volumes',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/volumes-and-storage/glusterfs-volumes', 'd3b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/volumes-and-storage/how-storage-works',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/volumes-and-storage/how-storage-works', '110'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/volumes-and-storage/iscsi-volumes',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/volumes-and-storage/iscsi-volumes', 'ce8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-admin/volumes-and-storage/provisioning-new-storage',
        component: ComponentCreator('/2.5/v2.5/en/cluster-admin/volumes-and-storage/provisioning-new-storage', 'e9f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning', '56a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/cluster-capabilities-table',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/cluster-capabilities-table', '142'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters', 'd5d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/ack',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/ack', '1fb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/aks',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/aks', 'd80'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/cce',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/cce', '11a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/eks',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/eks', 'b95'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/eks/permissions',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/eks/permissions', 'ed4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/gke',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/gke', '4ca'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/tke',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/tke', 'edc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/node-requirements',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/node-requirements', 'f0a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/production',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/production', '3cc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/production/nodes-and-roles',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/production/nodes-and-roles', '763'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/production/recommended-architecture',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/production/recommended-architecture', '2da'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/registered-clusters',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/registered-clusters', '42d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters', '06c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers', '2cc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/amazon',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/amazon', '0f9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/azure',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/azure', 'fee'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/gce',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/gce', '3d9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere', 'c01'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere/in-tree',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere/in-tree', '090'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere/out-of-tree',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere/out-of-tree', 'dd2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere/out-of-tree/vsphere-volume-migration',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere/out-of-tree/vsphere-volume-migration', '029'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/custom-nodes',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/custom-nodes', '439'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/custom-nodes/agent-options',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/custom-nodes/agent-options', 'e19'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools', '349'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/azure',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/azure', '13f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/azure/azure-node-template-config',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/azure/azure-node-template-config', '2f3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean', 'f74'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean/do-node-template-config',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean/do-node-template-config', '3bd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/ec2',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/ec2', '82e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/ec2/ec2-node-template-config',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/ec2/ec2-node-template-config', 'd90'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/vsphere',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/vsphere', '7d3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/vsphere/creating-credentials',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/vsphere/creating-credentials', '3d7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters', 'd35'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config', '369'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/options',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/options', '8c4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/options/pod-security-policies',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/options/pod-security-policies', '372'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/rancher-agents',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/rancher-agents', '75c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/windows-clusters',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/windows-clusters', '849'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/windows-clusters/azure-storageclass',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/windows-clusters/azure-storageclass', '3a9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements', '6f5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/cluster-provisioning/rke-clusters/windows-clusters/windows-parity',
        component: ComponentCreator('/2.5/v2.5/en/cluster-provisioning/rke-clusters/windows-clusters/windows-parity', '826'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/contributing',
        component: ComponentCreator('/2.5/v2.5/en/contributing', 'e91'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/deploy-across-clusters',
        component: ComponentCreator('/2.5/v2.5/en/deploy-across-clusters', '6c4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/deploy-across-clusters/fleet',
        component: ComponentCreator('/2.5/v2.5/en/deploy-across-clusters/fleet', '9ba'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/deploy-across-clusters/fleet/architecture',
        component: ComponentCreator('/2.5/v2.5/en/deploy-across-clusters/fleet/architecture', '4ca'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/deploy-across-clusters/fleet/proxy',
        component: ComponentCreator('/2.5/v2.5/en/deploy-across-clusters/fleet/proxy', '792'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/deploy-across-clusters/fleet/windows',
        component: ComponentCreator('/2.5/v2.5/en/deploy-across-clusters/fleet/windows', '57d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/deploy-across-clusters/multi-cluster-apps',
        component: ComponentCreator('/2.5/v2.5/en/deploy-across-clusters/multi-cluster-apps', 'ab5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/faq',
        component: ComponentCreator('/2.5/v2.5/en/faq', '4be'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/faq/deprecated-features-25x',
        component: ComponentCreator('/2.5/v2.5/en/faq/deprecated-features-25x', 'a83'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/faq/kubectl',
        component: ComponentCreator('/2.5/v2.5/en/faq/kubectl', 'c7e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/faq/networking',
        component: ComponentCreator('/2.5/v2.5/en/faq/networking', '132'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/faq/networking/cni-providers',
        component: ComponentCreator('/2.5/v2.5/en/faq/networking/cni-providers', '6b0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/faq/removing-rancher',
        component: ComponentCreator('/2.5/v2.5/en/faq/removing-rancher', 'd81'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/faq/security',
        component: ComponentCreator('/2.5/v2.5/en/faq/security', 'c68'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/faq/technical',
        component: ComponentCreator('/2.5/v2.5/en/faq/technical', '76a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/faq/telemetry',
        component: ComponentCreator('/2.5/v2.5/en/faq/telemetry', 'c9e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/helm-charts',
        component: ComponentCreator('/2.5/v2.5/en/helm-charts', '1a5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation',
        component: ComponentCreator('/2.5/v2.5/en/installation', '138'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/install-rancher-on-k8s',
        component: ComponentCreator('/2.5/v2.5/en/installation/install-rancher-on-k8s', 'ce6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/install-rancher-on-k8s/aks',
        component: ComponentCreator('/2.5/v2.5/en/installation/install-rancher-on-k8s/aks', '383'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/install-rancher-on-k8s/amazon-eks',
        component: ComponentCreator('/2.5/v2.5/en/installation/install-rancher-on-k8s/amazon-eks', '370'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/install-rancher-on-k8s/chart-options',
        component: ComponentCreator('/2.5/v2.5/en/installation/install-rancher-on-k8s/chart-options', '95e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/install-rancher-on-k8s/gke',
        component: ComponentCreator('/2.5/v2.5/en/installation/install-rancher-on-k8s/gke', '319'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/install-rancher-on-k8s/rollbacks',
        component: ComponentCreator('/2.5/v2.5/en/installation/install-rancher-on-k8s/rollbacks', '8ba'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/install-rancher-on-k8s/upgrades',
        component: ComponentCreator('/2.5/v2.5/en/installation/install-rancher-on-k8s/upgrades', '9ec'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/install-rancher-on-k8s/upgrades/air-gap-upgrade',
        component: ComponentCreator('/2.5/v2.5/en/installation/install-rancher-on-k8s/upgrades/air-gap-upgrade', 'e8d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods', '6ea'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/air-gap',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/air-gap', 'f8b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/air-gap/install-rancher',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/air-gap/install-rancher', '2a8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/air-gap/install-rancher/docker-install-commands',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/air-gap/install-rancher/docker-install-commands', '143'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/air-gap/launch-kubernetes',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/air-gap/launch-kubernetes', 'da9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/air-gap/populate-private-registry',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/air-gap/populate-private-registry', '477'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/air-gap/prepare-nodes',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/air-gap/prepare-nodes', '4bf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/behind-proxy',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/behind-proxy', 'e68'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/behind-proxy/install-rancher',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/behind-proxy/install-rancher', '9f7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/behind-proxy/launch-kubernetes',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/behind-proxy/launch-kubernetes', '794'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/behind-proxy/prepare-nodes',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/behind-proxy/prepare-nodes', '758'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/install-rancher-on-linux',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/install-rancher-on-linux', '69f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/install-rancher-on-linux/rancherd-configuration',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/install-rancher-on-linux/rancherd-configuration', 'b1a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/install-rancher-on-linux/rollbacks',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/install-rancher-on-linux/rollbacks', 'f6e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/install-rancher-on-linux/upgrades',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/install-rancher-on-linux/upgrades', '6c7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/single-node-docker',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/single-node-docker', '3b2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/single-node-docker/advanced',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/single-node-docker/advanced', 'ade'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/single-node-docker/proxy',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/single-node-docker/proxy', 'bb8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/single-node-docker/single-node-rollbacks',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/single-node-docker/single-node-rollbacks', '3f7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/single-node-docker/single-node-upgrades',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/single-node-docker/single-node-upgrades', '498'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/other-installation-methods/single-node-docker/troubleshooting',
        component: ComponentCreator('/2.5/v2.5/en/installation/other-installation-methods/single-node-docker/troubleshooting', 'faf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/requirements',
        component: ComponentCreator('/2.5/v2.5/en/installation/requirements', '07b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/requirements/installing-docker',
        component: ComponentCreator('/2.5/v2.5/en/installation/requirements/installing-docker', '2f0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/requirements/ports',
        component: ComponentCreator('/2.5/v2.5/en/installation/requirements/ports', 'd86'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/requirements/ports/common-ports-table',
        component: ComponentCreator('/2.5/v2.5/en/installation/requirements/ports/common-ports-table', '7fe'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources', '34c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/advanced',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/advanced', '723'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/advanced/api-audit-log',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/advanced/api-audit-log', '2cd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/advanced/arm64-platform',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/advanced/arm64-platform', '600'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/advanced/etcd',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/advanced/etcd', '34a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/advanced/firewall',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/advanced/firewall', '383'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/advanced/single-node-install-external-lb',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/advanced/single-node-install-external-lb', '9a8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/choosing-version',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/choosing-version', '36b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/custom-ca-root-certificate',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/custom-ca-root-certificate', '616'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/feature-flags',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/feature-flags', '367'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/feature-flags/enable-not-default-storage-drivers',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/feature-flags/enable-not-default-storage-drivers', 'e61'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/feature-flags/istio-virtual-service-ui',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/feature-flags/istio-virtual-service-ui', 'e5f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/helm-version',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/helm-version', '53d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials', '156'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials/ha-RKE',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials/ha-RKE', '907'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials/ha-rke2',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials/ha-rke2', 'ad9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials/ha-with-external-db',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials/ha-with-external-db', '337'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials/how-ha-works',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials/how-ha-works', '082'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials', '893'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/ec2-node',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/ec2-node', 'dc6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha', 'e5c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha-with-external-db',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha-with-external-db', '02e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-rke2-ha',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-rke2-ha', '54d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nginx',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nginx', 'a97'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nlb',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nlb', 'ee4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/rds',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/k8s-tutorials/infrastructure-tutorials/rds', 'a56'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/local-system-charts',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/local-system-charts', '5cd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/tls-secrets',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/tls-secrets', 'dcb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/tls-settings',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/tls-settings', '6c8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/troubleshooting',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/troubleshooting', '760'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/update-rancher-cert',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/update-rancher-cert', '6bc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/upgrading-cert-manager',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/upgrading-cert-manager', '05e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/installation/resources/upgrading-cert-manager/helm-2-instructions',
        component: ComponentCreator('/2.5/v2.5/en/installation/resources/upgrading-cert-manager/helm-2-instructions', '6c8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/introduction',
        component: ComponentCreator('/2.5/v2.5/en/introduction', 'f3f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio',
        component: ComponentCreator('/2.5/v2.5/en/istio', '269'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/configuration-reference',
        component: ComponentCreator('/2.5/v2.5/en/istio/configuration-reference', '4ad'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/configuration-reference/canal-and-project-network',
        component: ComponentCreator('/2.5/v2.5/en/istio/configuration-reference/canal-and-project-network', 'f9a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/configuration-reference/enable-istio-with-psp',
        component: ComponentCreator('/2.5/v2.5/en/istio/configuration-reference/enable-istio-with-psp', '78d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/configuration-reference/rke2',
        component: ComponentCreator('/2.5/v2.5/en/istio/configuration-reference/rke2', '617'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/configuration-reference/selectors-and-scrape',
        component: ComponentCreator('/2.5/v2.5/en/istio/configuration-reference/selectors-and-scrape', '999'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/disabling-istio',
        component: ComponentCreator('/2.5/v2.5/en/istio/disabling-istio', '02d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/rbac',
        component: ComponentCreator('/2.5/v2.5/en/istio/rbac', 'd44'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/resources',
        component: ComponentCreator('/2.5/v2.5/en/istio/resources', '0bd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/setup',
        component: ComponentCreator('/2.5/v2.5/en/istio/setup', '724'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/setup/deploy-workloads',
        component: ComponentCreator('/2.5/v2.5/en/istio/setup/deploy-workloads', '039'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/setup/enable-istio-in-cluster',
        component: ComponentCreator('/2.5/v2.5/en/istio/setup/enable-istio-in-cluster', '4e9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/setup/enable-istio-in-namespace',
        component: ComponentCreator('/2.5/v2.5/en/istio/setup/enable-istio-in-namespace', '719'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/setup/gateway',
        component: ComponentCreator('/2.5/v2.5/en/istio/setup/gateway', '0c9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/setup/set-up-traffic-management',
        component: ComponentCreator('/2.5/v2.5/en/istio/setup/set-up-traffic-management', '31b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/istio/setup/view-traffic',
        component: ComponentCreator('/2.5/v2.5/en/istio/setup/view-traffic', 'f1e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher', 'dac'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/certificates',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/certificates', '46e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/configmaps',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/configmaps', '7ca'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler', 'aa2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler/hpa-background',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler/hpa-background', '65e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl', '77e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-rancher-ui',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-rancher-ui', '1d0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler/testing-hpa',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler/testing-hpa', '47d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/load-balancers-and-ingress',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/load-balancers-and-ingress', '89f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/load-balancers-and-ingress/ingress',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/load-balancers-and-ingress/ingress', '554'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers', '9a7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/registries',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/registries', 'cb3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/secrets',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/secrets', 'f46'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/service-discovery',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/service-discovery', 'a2d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/workloads',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/workloads', 'c6f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/workloads/add-a-sidecar',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/workloads/add-a-sidecar', '4af'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/workloads/deploy-workloads',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/workloads/deploy-workloads', '6a6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/workloads/rollback-workloads',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/workloads/rollback-workloads', 'e21'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/k8s-in-rancher/workloads/upgrade-workloads',
        component: ComponentCreator('/2.5/v2.5/en/k8s-in-rancher/workloads/upgrade-workloads', '5c6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/logging',
        component: ComponentCreator('/2.5/v2.5/en/logging', '666'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/logging/architecture',
        component: ComponentCreator('/2.5/v2.5/en/logging/architecture', '666'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/logging/custom-resource-config',
        component: ComponentCreator('/2.5/v2.5/en/logging/custom-resource-config', '3d1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/logging/custom-resource-config/flows',
        component: ComponentCreator('/2.5/v2.5/en/logging/custom-resource-config/flows', '308'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/logging/custom-resource-config/outputs',
        component: ComponentCreator('/2.5/v2.5/en/logging/custom-resource-config/outputs', 'b22'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/logging/helm-chart-options',
        component: ComponentCreator('/2.5/v2.5/en/logging/helm-chart-options', '0fe'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/logging/migrating',
        component: ComponentCreator('/2.5/v2.5/en/logging/migrating', 'e7c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/logging/rbac',
        component: ComponentCreator('/2.5/v2.5/en/logging/rbac', '0c0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/logging/taints-tolerations',
        component: ComponentCreator('/2.5/v2.5/en/logging/taints-tolerations', '879'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/longhorn',
        component: ComponentCreator('/2.5/v2.5/en/longhorn', 'fdf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting', 'b12'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/configuration',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/configuration', '89f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/configuration/advanced',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/configuration/advanced', 'd98'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/configuration/advanced/alertmanager',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/configuration/advanced/alertmanager', 'd5b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/configuration/advanced/prometheus',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/configuration/advanced/prometheus', '28d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/configuration/advanced/prometheusrules',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/configuration/advanced/prometheusrules', 'b1a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/configuration/examples',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/configuration/examples', '1a3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/configuration/helm-chart-options',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/configuration/helm-chart-options', 'e34'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/configuration/receiver',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/configuration/receiver', '4c5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/configuration/route',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/configuration/route', '6c0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/configuration/servicemonitor-podmonitor',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/configuration/servicemonitor-podmonitor', '7d7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/dashboards',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/dashboards', '785'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/expression',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/expression', 'dfc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/guides',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/guides', '3e0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/guides/customize-grafana',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/guides/customize-grafana', 'afc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/guides/enable-monitoring',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/guides/enable-monitoring', '2e1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/guides/memory-usage',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/guides/memory-usage', 'eda'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/guides/migrating',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/guides/migrating', '126'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/guides/monitoring-workloads',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/guides/monitoring-workloads', 'c96'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/guides/persist-grafana',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/guides/persist-grafana', '21a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/guides/uninstall',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/guides/uninstall', '249'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/how-monitoring-works',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/how-monitoring-works', '282'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/rbac',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/rbac', '922'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/monitoring-alerting/windows-clusters',
        component: ComponentCreator('/2.5/v2.5/en/monitoring-alerting/windows-clusters', '062'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/opa-gatekeper',
        component: ComponentCreator('/2.5/v2.5/en/opa-gatekeper', 'c79'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/overview',
        component: ComponentCreator('/2.5/v2.5/en/overview', '6ff'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/overview/architecture',
        component: ComponentCreator('/2.5/v2.5/en/overview/architecture', 'b77'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/overview/architecture-recommendations',
        component: ComponentCreator('/2.5/v2.5/en/overview/architecture-recommendations', 'e8a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/overview/concepts',
        component: ComponentCreator('/2.5/v2.5/en/overview/concepts', 'ac5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/pipelines',
        component: ComponentCreator('/2.5/v2.5/en/pipelines', 'a11'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/pipelines/concepts',
        component: ComponentCreator('/2.5/v2.5/en/pipelines/concepts', '4e8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/pipelines/config',
        component: ComponentCreator('/2.5/v2.5/en/pipelines/config', 'c99'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/pipelines/example',
        component: ComponentCreator('/2.5/v2.5/en/pipelines/example', '442'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/pipelines/example-repos',
        component: ComponentCreator('/2.5/v2.5/en/pipelines/example-repos', 'dea'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/pipelines/storage',
        component: ComponentCreator('/2.5/v2.5/en/pipelines/storage', '60d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/project-admin',
        component: ComponentCreator('/2.5/v2.5/en/project-admin', '653'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/project-admin/namespaces',
        component: ComponentCreator('/2.5/v2.5/en/project-admin/namespaces', 'bf9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/project-admin/pipelines',
        component: ComponentCreator('/2.5/v2.5/en/project-admin/pipelines', 'a41'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/project-admin/pod-security-policies',
        component: ComponentCreator('/2.5/v2.5/en/project-admin/pod-security-policies', '4b6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/project-admin/project-members',
        component: ComponentCreator('/2.5/v2.5/en/project-admin/project-members', '510'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/project-admin/resource-quotas',
        component: ComponentCreator('/2.5/v2.5/en/project-admin/resource-quotas', 'a7c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/project-admin/resource-quotas/override-container-default',
        component: ComponentCreator('/2.5/v2.5/en/project-admin/resource-quotas/override-container-default', 'd5d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/project-admin/resource-quotas/override-namespace-default',
        component: ComponentCreator('/2.5/v2.5/en/project-admin/resource-quotas/override-namespace-default', 'b45'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/project-admin/resource-quotas/quota-type-reference',
        component: ComponentCreator('/2.5/v2.5/en/project-admin/resource-quotas/quota-type-reference', 'ec9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/project-admin/resource-quotas/quotas-for-projects',
        component: ComponentCreator('/2.5/v2.5/en/project-admin/resource-quotas/quotas-for-projects', '712'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/project-admin/tools',
        component: ComponentCreator('/2.5/v2.5/en/project-admin/tools', '2ec'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/quick-start-guide',
        component: ComponentCreator('/2.5/v2.5/en/quick-start-guide', '1f1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/quick-start-guide/deployment',
        component: ComponentCreator('/2.5/v2.5/en/quick-start-guide/deployment', '337'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/quick-start-guide/deployment/amazon-aws-qs',
        component: ComponentCreator('/2.5/v2.5/en/quick-start-guide/deployment/amazon-aws-qs', 'e6c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/quick-start-guide/deployment/digital-ocean-qs',
        component: ComponentCreator('/2.5/v2.5/en/quick-start-guide/deployment/digital-ocean-qs', '669'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/quick-start-guide/deployment/google-gcp-qs',
        component: ComponentCreator('/2.5/v2.5/en/quick-start-guide/deployment/google-gcp-qs', '4f8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/quick-start-guide/deployment/microsoft-azure-qs',
        component: ComponentCreator('/2.5/v2.5/en/quick-start-guide/deployment/microsoft-azure-qs', '12e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/quick-start-guide/deployment/quickstart-manual-setup',
        component: ComponentCreator('/2.5/v2.5/en/quick-start-guide/deployment/quickstart-manual-setup', 'd8e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/quick-start-guide/deployment/quickstart-vagrant',
        component: ComponentCreator('/2.5/v2.5/en/quick-start-guide/deployment/quickstart-vagrant', '530'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/quick-start-guide/workload',
        component: ComponentCreator('/2.5/v2.5/en/quick-start-guide/workload', 'aef'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/quick-start-guide/workload/quickstart-deploy-workload-ingress',
        component: ComponentCreator('/2.5/v2.5/en/quick-start-guide/workload/quickstart-deploy-workload-ingress', '531'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/quick-start-guide/workload/quickstart-deploy-workload-nodeport',
        component: ComponentCreator('/2.5/v2.5/en/quick-start-guide/workload/quickstart-deploy-workload-nodeport', '73a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/security',
        component: ComponentCreator('/2.5/v2.5/en/security', '937'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/security/best-practices',
        component: ComponentCreator('/2.5/v2.5/en/security/best-practices', '575'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/security/cve',
        component: ComponentCreator('/2.5/v2.5/en/security/cve', '33c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/security/rancher-2.5',
        component: ComponentCreator('/2.5/v2.5/en/security/rancher-2.5', '76d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/security/rancher-2.5/1.5-benchmark-2.5',
        component: ComponentCreator('/2.5/v2.5/en/security/rancher-2.5/1.5-benchmark-2.5', 'a50'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/security/rancher-2.5/1.5-hardening-2.5',
        component: ComponentCreator('/2.5/v2.5/en/security/rancher-2.5/1.5-hardening-2.5', '408'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/security/rancher-2.5/1.6-benchmark-2.5',
        component: ComponentCreator('/2.5/v2.5/en/security/rancher-2.5/1.6-benchmark-2.5', '7c1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/security/rancher-2.5/1.6-hardening-2.5',
        component: ComponentCreator('/2.5/v2.5/en/security/rancher-2.5/1.6-hardening-2.5', '51e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/security/security-scan',
        component: ComponentCreator('/2.5/v2.5/en/security/security-scan', '590'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/security/selinux',
        component: ComponentCreator('/2.5/v2.5/en/security/selinux', '9ab'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/system-tools',
        component: ComponentCreator('/2.5/v2.5/en/system-tools', 'be2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/troubleshooting',
        component: ComponentCreator('/2.5/v2.5/en/troubleshooting', '970'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/troubleshooting/dns',
        component: ComponentCreator('/2.5/v2.5/en/troubleshooting/dns', '117'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/troubleshooting/imported-clusters',
        component: ComponentCreator('/2.5/v2.5/en/troubleshooting/imported-clusters', '1f9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/troubleshooting/kubernetes-components',
        component: ComponentCreator('/2.5/v2.5/en/troubleshooting/kubernetes-components', '9cb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/troubleshooting/kubernetes-components/controlplane',
        component: ComponentCreator('/2.5/v2.5/en/troubleshooting/kubernetes-components/controlplane', 'ba3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/troubleshooting/kubernetes-components/etcd',
        component: ComponentCreator('/2.5/v2.5/en/troubleshooting/kubernetes-components/etcd', '537'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/troubleshooting/kubernetes-components/nginx-proxy',
        component: ComponentCreator('/2.5/v2.5/en/troubleshooting/kubernetes-components/nginx-proxy', '2d6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/troubleshooting/kubernetes-components/worker-and-generic',
        component: ComponentCreator('/2.5/v2.5/en/troubleshooting/kubernetes-components/worker-and-generic', 'f6a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/troubleshooting/kubernetes-resources',
        component: ComponentCreator('/2.5/v2.5/en/troubleshooting/kubernetes-resources', '59d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/troubleshooting/logging',
        component: ComponentCreator('/2.5/v2.5/en/troubleshooting/logging', '62c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/troubleshooting/networking',
        component: ComponentCreator('/2.5/v2.5/en/troubleshooting/networking', '992'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/troubleshooting/rancherha',
        component: ComponentCreator('/2.5/v2.5/en/troubleshooting/rancherha', '05a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/user-settings',
        component: ComponentCreator('/2.5/v2.5/en/user-settings', '019'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/user-settings/api-keys',
        component: ComponentCreator('/2.5/v2.5/en/user-settings/api-keys', '0e9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/user-settings/cloud-credentials',
        component: ComponentCreator('/2.5/v2.5/en/user-settings/cloud-credentials', 'ab6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/user-settings/node-templates',
        component: ComponentCreator('/2.5/v2.5/en/user-settings/node-templates', '949'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/2.5/v2.5/en/user-settings/preferences',
        component: ComponentCreator('/2.5/v2.5/en/user-settings/preferences', '37c'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/en',
    component: ComponentCreator('/en', 'aa7'),
    routes: [
      {
        path: '/en',
        component: ComponentCreator('/en', 'e90'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings',
        component: ComponentCreator('/en/en/admin-settings', '563'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication',
        component: ComponentCreator('/en/en/admin-settings/authentication', '1d2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/ad',
        component: ComponentCreator('/en/en/admin-settings/authentication/ad', '931'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/azure-ad',
        component: ComponentCreator('/en/en/admin-settings/authentication/azure-ad', '7db'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/freeipa',
        component: ComponentCreator('/en/en/admin-settings/authentication/freeipa', 'a37'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/github',
        component: ComponentCreator('/en/en/admin-settings/authentication/github', '56e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/google',
        component: ComponentCreator('/en/en/admin-settings/authentication/google', '428'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/keycloak-oidc',
        component: ComponentCreator('/en/en/admin-settings/authentication/keycloak-oidc', 'e3b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/keycloak-saml',
        component: ComponentCreator('/en/en/admin-settings/authentication/keycloak-saml', '12a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/local',
        component: ComponentCreator('/en/en/admin-settings/authentication/local', '182'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/microsoft-adfs',
        component: ComponentCreator('/en/en/admin-settings/authentication/microsoft-adfs', '787'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup',
        component: ComponentCreator('/en/en/admin-settings/authentication/microsoft-adfs/microsoft-adfs-setup', '19e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/microsoft-adfs/rancher-adfs-setup',
        component: ComponentCreator('/en/en/admin-settings/authentication/microsoft-adfs/rancher-adfs-setup', '5f5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/okta',
        component: ComponentCreator('/en/en/admin-settings/authentication/okta', '5b4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/openldap',
        component: ComponentCreator('/en/en/admin-settings/authentication/openldap', '779'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/openldap/openldap-config',
        component: ComponentCreator('/en/en/admin-settings/authentication/openldap/openldap-config', '6ad'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/ping-federate',
        component: ComponentCreator('/en/en/admin-settings/authentication/ping-federate', 'c86'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/shibboleth',
        component: ComponentCreator('/en/en/admin-settings/authentication/shibboleth', '1f2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/shibboleth/about',
        component: ComponentCreator('/en/en/admin-settings/authentication/shibboleth/about', '8c2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/authentication/user-groups',
        component: ComponentCreator('/en/en/admin-settings/authentication/user-groups', 'f41'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/branding',
        component: ComponentCreator('/en/en/admin-settings/branding', 'b81'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/cluster-templates',
        component: ComponentCreator('/en/en/admin-settings/cluster-templates', 'a39'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/config-private-registry',
        component: ComponentCreator('/en/en/admin-settings/config-private-registry', '2f2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/drivers',
        component: ComponentCreator('/en/en/admin-settings/drivers', '566'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/drivers/cluster-drivers',
        component: ComponentCreator('/en/en/admin-settings/drivers/cluster-drivers', 'b18'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/drivers/node-drivers',
        component: ComponentCreator('/en/en/admin-settings/drivers/node-drivers', 'e6b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/k8s-metadata',
        component: ComponentCreator('/en/en/admin-settings/k8s-metadata', 'b3c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/pod-security-policies',
        component: ComponentCreator('/en/en/admin-settings/pod-security-policies', '23b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rbac',
        component: ComponentCreator('/en/en/admin-settings/rbac', '397'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rbac/cluster-project-roles',
        component: ComponentCreator('/en/en/admin-settings/rbac/cluster-project-roles', '31f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rbac/default-custom-roles',
        component: ComponentCreator('/en/en/admin-settings/rbac/default-custom-roles', '2de'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rbac/global-permissions',
        component: ComponentCreator('/en/en/admin-settings/rbac/global-permissions', 'c40'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rbac/locked-roles',
        component: ComponentCreator('/en/en/admin-settings/rbac/locked-roles', 'b39'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rke-templates',
        component: ComponentCreator('/en/en/admin-settings/rke-templates', '861'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rke-templates/applying-templates',
        component: ComponentCreator('/en/en/admin-settings/rke-templates/applying-templates', '8cf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rke-templates/creating-and-revising',
        component: ComponentCreator('/en/en/admin-settings/rke-templates/creating-and-revising', 'af0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rke-templates/creator-permissions',
        component: ComponentCreator('/en/en/admin-settings/rke-templates/creator-permissions', 'bd5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rke-templates/enforcement',
        component: ComponentCreator('/en/en/admin-settings/rke-templates/enforcement', '1c3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rke-templates/example-scenarios',
        component: ComponentCreator('/en/en/admin-settings/rke-templates/example-scenarios', '651'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rke-templates/example-yaml',
        component: ComponentCreator('/en/en/admin-settings/rke-templates/example-yaml', '0f2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rke-templates/overrides',
        component: ComponentCreator('/en/en/admin-settings/rke-templates/overrides', 'f8d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rke-templates/rke-templates-and-hardware',
        component: ComponentCreator('/en/en/admin-settings/rke-templates/rke-templates-and-hardware', '9b0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/admin-settings/rke-templates/template-access-and-sharing',
        component: ComponentCreator('/en/en/admin-settings/rke-templates/template-access-and-sharing', 'ea9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/api',
        component: ComponentCreator('/en/en/api', '201'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/api/api-tokens',
        component: ComponentCreator('/en/en/api/api-tokens', '283'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/backups',
        component: ComponentCreator('/en/en/backups', '1c7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/backups/back-up-rancher',
        component: ComponentCreator('/en/en/backups/back-up-rancher', 'd2e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/backups/configuration',
        component: ComponentCreator('/en/en/backups/configuration', '37d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/backups/configuration/backup-config',
        component: ComponentCreator('/en/en/backups/configuration/backup-config', '66c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/backups/configuration/restore-config',
        component: ComponentCreator('/en/en/backups/configuration/restore-config', '5ad'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/backups/configuration/storage-config',
        component: ComponentCreator('/en/en/backups/configuration/storage-config', 'e83'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/backups/docker-installs',
        component: ComponentCreator('/en/en/backups/docker-installs', '770'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/backups/docker-installs/docker-backups',
        component: ComponentCreator('/en/en/backups/docker-installs/docker-backups', 'b2f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/backups/docker-installs/docker-restores',
        component: ComponentCreator('/en/en/backups/docker-installs/docker-restores', 'b9f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/backups/examples',
        component: ComponentCreator('/en/en/backups/examples', 'd5e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/backups/migrating-rancher',
        component: ComponentCreator('/en/en/backups/migrating-rancher', '6ea'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/backups/restoring-rancher',
        component: ComponentCreator('/en/en/backups/restoring-rancher', 'b5b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/best-practices',
        component: ComponentCreator('/en/en/best-practices', '37f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/best-practices/rancher-managed',
        component: ComponentCreator('/en/en/best-practices/rancher-managed', '588'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/best-practices/rancher-managed/containers',
        component: ComponentCreator('/en/en/best-practices/rancher-managed/containers', '5b9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/best-practices/rancher-managed/logging',
        component: ComponentCreator('/en/en/best-practices/rancher-managed/logging', '4e1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/best-practices/rancher-managed/managed-vsphere',
        component: ComponentCreator('/en/en/best-practices/rancher-managed/managed-vsphere', 'f5d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/best-practices/rancher-managed/monitoring',
        component: ComponentCreator('/en/en/best-practices/rancher-managed/monitoring', '53b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/best-practices/rancher-server',
        component: ComponentCreator('/en/en/best-practices/rancher-server', 'fbd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/best-practices/rancher-server/deployment-strategies',
        component: ComponentCreator('/en/en/best-practices/rancher-server/deployment-strategies', '0b3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/best-practices/rancher-server/deployment-types',
        component: ComponentCreator('/en/en/best-practices/rancher-server/deployment-types', 'af8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/best-practices/rancher-server/rancher-in-vsphere',
        component: ComponentCreator('/en/en/best-practices/rancher-server/rancher-in-vsphere', 'e8e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cis-scans',
        component: ComponentCreator('/en/en/cis-scans', '7a4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cis-scans/configuration',
        component: ComponentCreator('/en/en/cis-scans/configuration', 'bff'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cis-scans/custom-benchmark',
        component: ComponentCreator('/en/en/cis-scans/custom-benchmark', '4b9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cis-scans/rbac',
        component: ComponentCreator('/en/en/cis-scans/rbac', '55e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cis-scans/skipped-tests',
        component: ComponentCreator('/en/en/cis-scans/skipped-tests', 'd98'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cli',
        component: ComponentCreator('/en/en/cli', 'acb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin',
        component: ComponentCreator('/en/en/cluster-admin', 'ea5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/backing-up-etcd',
        component: ComponentCreator('/en/en/cluster-admin/backing-up-etcd', '966'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/certificate-rotation',
        component: ComponentCreator('/en/en/cluster-admin/certificate-rotation', '678'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/cleaning-cluster-nodes',
        component: ComponentCreator('/en/en/cluster-admin/cleaning-cluster-nodes', '7e6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/cloning-clusters',
        component: ComponentCreator('/en/en/cluster-admin/cloning-clusters', 'f86'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/cluster-access',
        component: ComponentCreator('/en/en/cluster-admin/cluster-access', 'fc7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/cluster-access/ace',
        component: ComponentCreator('/en/en/cluster-admin/cluster-access/ace', '57f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/cluster-access/cluster-members',
        component: ComponentCreator('/en/en/cluster-admin/cluster-access/cluster-members', 'd13'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/cluster-access/kubectl',
        component: ComponentCreator('/en/en/cluster-admin/cluster-access/kubectl', 'c55'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/cluster-autoscaler',
        component: ComponentCreator('/en/en/cluster-admin/cluster-autoscaler', 'b3d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/cluster-autoscaler/amazon',
        component: ComponentCreator('/en/en/cluster-admin/cluster-autoscaler/amazon', 'b29'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/editing-clusters',
        component: ComponentCreator('/en/en/cluster-admin/editing-clusters', 'b9a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/editing-clusters/aks-config-reference',
        component: ComponentCreator('/en/en/cluster-admin/editing-clusters/aks-config-reference', '948'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/editing-clusters/eks-config-reference',
        component: ComponentCreator('/en/en/cluster-admin/editing-clusters/eks-config-reference', 'ae4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/editing-clusters/gke-config-reference',
        component: ComponentCreator('/en/en/cluster-admin/editing-clusters/gke-config-reference', '31a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/editing-clusters/gke-config-reference/private-clusters',
        component: ComponentCreator('/en/en/cluster-admin/editing-clusters/gke-config-reference/private-clusters', '076'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/editing-clusters/k3s-config-reference',
        component: ComponentCreator('/en/en/cluster-admin/editing-clusters/k3s-config-reference', '328'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/editing-clusters/rke-config-reference/rke-config-references',
        component: ComponentCreator('/en/en/cluster-admin/editing-clusters/rke-config-reference/rke-config-references', '03a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/editing-clusters/rke2-config-reference',
        component: ComponentCreator('/en/en/cluster-admin/editing-clusters/rke2-config-reference', '5cb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/editing-clusters/syncing',
        component: ComponentCreator('/en/en/cluster-admin/editing-clusters/syncing', 'db1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/nodes',
        component: ComponentCreator('/en/en/cluster-admin/nodes', '5f4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/pod-security-policies',
        component: ComponentCreator('/en/en/cluster-admin/pod-security-policies', '9da'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/pod-security-policy',
        component: ComponentCreator('/en/en/cluster-admin/pod-security-policy', '212'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/projects-and-namespaces',
        component: ComponentCreator('/en/en/cluster-admin/projects-and-namespaces', '819'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/restoring-etcd',
        component: ComponentCreator('/en/en/cluster-admin/restoring-etcd', '112'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/tools',
        component: ComponentCreator('/en/en/cluster-admin/tools', '49d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/upgrading-kubernetes',
        component: ComponentCreator('/en/en/cluster-admin/upgrading-kubernetes', '4af'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/volumes-and-storage',
        component: ComponentCreator('/en/en/cluster-admin/volumes-and-storage', '24d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/volumes-and-storage/attaching-existing-storage',
        component: ComponentCreator('/en/en/cluster-admin/volumes-and-storage/attaching-existing-storage', 'c30'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/volumes-and-storage/ceph',
        component: ComponentCreator('/en/en/cluster-admin/volumes-and-storage/ceph', 'ab0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/volumes-and-storage/examples',
        component: ComponentCreator('/en/en/cluster-admin/volumes-and-storage/examples', '079'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/volumes-and-storage/examples/ebs',
        component: ComponentCreator('/en/en/cluster-admin/volumes-and-storage/examples/ebs', '66e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/volumes-and-storage/examples/nfs',
        component: ComponentCreator('/en/en/cluster-admin/volumes-and-storage/examples/nfs', '595'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/volumes-and-storage/examples/vsphere',
        component: ComponentCreator('/en/en/cluster-admin/volumes-and-storage/examples/vsphere', '1ba'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/volumes-and-storage/glusterfs-volumes',
        component: ComponentCreator('/en/en/cluster-admin/volumes-and-storage/glusterfs-volumes', '08e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/volumes-and-storage/how-storage-works',
        component: ComponentCreator('/en/en/cluster-admin/volumes-and-storage/how-storage-works', '240'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/volumes-and-storage/iscsi-volumes',
        component: ComponentCreator('/en/en/cluster-admin/volumes-and-storage/iscsi-volumes', 'ef9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-admin/volumes-and-storage/provisioning-new-storage',
        component: ComponentCreator('/en/en/cluster-admin/volumes-and-storage/provisioning-new-storage', '60a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning',
        component: ComponentCreator('/en/en/cluster-provisioning', '93f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/cluster-capabilities-table',
        component: ComponentCreator('/en/en/cluster-provisioning/cluster-capabilities-table', 'a27'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/hosted-kubernetes-clusters',
        component: ComponentCreator('/en/en/cluster-provisioning/hosted-kubernetes-clusters', '82f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/hosted-kubernetes-clusters/ack',
        component: ComponentCreator('/en/en/cluster-provisioning/hosted-kubernetes-clusters/ack', '29b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/hosted-kubernetes-clusters/aks',
        component: ComponentCreator('/en/en/cluster-provisioning/hosted-kubernetes-clusters/aks', '44c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/hosted-kubernetes-clusters/cce',
        component: ComponentCreator('/en/en/cluster-provisioning/hosted-kubernetes-clusters/cce', '767'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/hosted-kubernetes-clusters/eks',
        component: ComponentCreator('/en/en/cluster-provisioning/hosted-kubernetes-clusters/eks', '8a9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/hosted-kubernetes-clusters/eks/permissions',
        component: ComponentCreator('/en/en/cluster-provisioning/hosted-kubernetes-clusters/eks/permissions', '219'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/hosted-kubernetes-clusters/gke',
        component: ComponentCreator('/en/en/cluster-provisioning/hosted-kubernetes-clusters/gke', 'bb7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/hosted-kubernetes-clusters/tke',
        component: ComponentCreator('/en/en/cluster-provisioning/hosted-kubernetes-clusters/tke', '33a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/node-requirements',
        component: ComponentCreator('/en/en/cluster-provisioning/node-requirements', 'd51'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/production',
        component: ComponentCreator('/en/en/cluster-provisioning/production', 'dca'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/production/nodes-and-roles',
        component: ComponentCreator('/en/en/cluster-provisioning/production/nodes-and-roles', '147'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/production/recommended-architecture',
        component: ComponentCreator('/en/en/cluster-provisioning/production/recommended-architecture', 'fc7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/registered-clusters',
        component: ComponentCreator('/en/en/cluster-provisioning/registered-clusters', '4b8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters', '7ea'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/behavior-differences-between-rke1-and-rke2',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/behavior-differences-between-rke1-and-rke2', 'ac1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/cloud-providers',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/cloud-providers', 'e6f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/cloud-providers/amazon',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/cloud-providers/amazon', '565'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/cloud-providers/azure',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/cloud-providers/azure', '3ca'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/cloud-providers/gce',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/cloud-providers/gce', '420'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere', 'e97'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere/in-tree',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere/in-tree', 'a0e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere/out-of-tree',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere/out-of-tree', '9d0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere/out-of-tree/vsphere-volume-migration',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere/out-of-tree/vsphere-volume-migration', '272'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/custom-nodes',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/custom-nodes', '937'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/custom-nodes/agent-options',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/custom-nodes/agent-options', 'f3d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools', '96c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/azure',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/azure', 'abe'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/azure/azure-machine-config',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/azure/azure-machine-config', '905'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/azure/azure-node-template-config',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/azure/azure-node-template-config', 'db4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean', '62d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean/do-machine-config',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean/do-machine-config', '2cc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean/do-node-template-config',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean/do-node-template-config', '68b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/ec2',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/ec2', '78b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/ec2/ec2-machine-config',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/ec2/ec2-machine-config', 'b33'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/ec2/ec2-node-template-config',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/ec2/ec2-node-template-config', 'cb4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/nutanix',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/nutanix', '5af'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/nutanix/nutanix-node-template-config',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/nutanix/nutanix-node-template-config', '141'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/nutanix/provisioning-nutanix-clusters/providing-nutanix-clusters',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/nutanix/provisioning-nutanix-clusters/providing-nutanix-clusters', 'abb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/vsphere/creating-a-vm-template',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/vsphere/creating-a-vm-template', '4a6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/vsphere/creating-credentials',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/vsphere/creating-credentials', 'eb9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters', '442'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vpshere',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vpshere', '2da'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config', '158'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/options',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/options', '387'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/rancher-agents',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/rancher-agents', 'eb2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/windows-clusters',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/windows-clusters', '40b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/windows-clusters/azure-storageclass',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/windows-clusters/azure-storageclass', 'e0d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements', '239'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/cluster-provisioning/rke-clusters/windows-clusters/windows-parity',
        component: ComponentCreator('/en/en/cluster-provisioning/rke-clusters/windows-clusters/windows-parity', '6f9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/contributing',
        component: ComponentCreator('/en/en/contributing', 'e13'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/deploy-across-clusters',
        component: ComponentCreator('/en/en/deploy-across-clusters', '5a4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/deploy-across-clusters/fleet',
        component: ComponentCreator('/en/en/deploy-across-clusters/fleet', '140'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/deploy-across-clusters/fleet/architecture',
        component: ComponentCreator('/en/en/deploy-across-clusters/fleet/architecture', '81d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/deploy-across-clusters/fleet/proxy',
        component: ComponentCreator('/en/en/deploy-across-clusters/fleet/proxy', 'b4e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/deploy-across-clusters/fleet/windows',
        component: ComponentCreator('/en/en/deploy-across-clusters/fleet/windows', '3b2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/deploy-across-clusters/multi-cluster-apps',
        component: ComponentCreator('/en/en/deploy-across-clusters/multi-cluster-apps', '420'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/faq',
        component: ComponentCreator('/en/en/faq', 'd9c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/faq/deprecated-features',
        component: ComponentCreator('/en/en/faq/deprecated-features', '104'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/faq/dockershim',
        component: ComponentCreator('/en/en/faq/dockershim', '88e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/faq/kubectl',
        component: ComponentCreator('/en/en/faq/kubectl', '4bb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/faq/networking',
        component: ComponentCreator('/en/en/faq/networking', '3ea'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/faq/networking/cni-providers',
        component: ComponentCreator('/en/en/faq/networking/cni-providers', '9ba'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/faq/removing-rancher',
        component: ComponentCreator('/en/en/faq/removing-rancher', '835'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/faq/security',
        component: ComponentCreator('/en/en/faq/security', '2ac'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/faq/technical',
        component: ComponentCreator('/en/en/faq/technical', '46c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/faq/telemetry',
        component: ComponentCreator('/en/en/faq/telemetry', '846'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/helm-charts/creating-apps',
        component: ComponentCreator('/en/en/helm-charts/creating-apps', '732'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/helm-charts/helm',
        component: ComponentCreator('/en/en/helm-charts/helm', '68e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation',
        component: ComponentCreator('/en/en/installation', '25f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/install-rancher-on-k8s',
        component: ComponentCreator('/en/en/installation/install-rancher-on-k8s', '03b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/install-rancher-on-k8s/aks',
        component: ComponentCreator('/en/en/installation/install-rancher-on-k8s/aks', '44d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/install-rancher-on-k8s/amazon-eks',
        component: ComponentCreator('/en/en/installation/install-rancher-on-k8s/amazon-eks', '3ea'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/install-rancher-on-k8s/chart-options',
        component: ComponentCreator('/en/en/installation/install-rancher-on-k8s/chart-options', '24f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/install-rancher-on-k8s/gke',
        component: ComponentCreator('/en/en/installation/install-rancher-on-k8s/gke', 'c4c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/install-rancher-on-k8s/rollbacks',
        component: ComponentCreator('/en/en/installation/install-rancher-on-k8s/rollbacks', 'a1f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/install-rancher-on-k8s/upgrades',
        component: ComponentCreator('/en/en/installation/install-rancher-on-k8s/upgrades', '811'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/install-rancher-on-k8s/upgrades/air-gap-upgrade',
        component: ComponentCreator('/en/en/installation/install-rancher-on-k8s/upgrades/air-gap-upgrade', '012'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods',
        component: ComponentCreator('/en/en/installation/other-installation-methods', '7e5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/air-gap',
        component: ComponentCreator('/en/en/installation/other-installation-methods/air-gap', '894'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/air-gap/install-rancher',
        component: ComponentCreator('/en/en/installation/other-installation-methods/air-gap/install-rancher', 'ca5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/air-gap/install-rancher/docker-install-commands',
        component: ComponentCreator('/en/en/installation/other-installation-methods/air-gap/install-rancher/docker-install-commands', '92b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/air-gap/launch-kubernetes',
        component: ComponentCreator('/en/en/installation/other-installation-methods/air-gap/launch-kubernetes', 'f53'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/air-gap/populate-private-registry',
        component: ComponentCreator('/en/en/installation/other-installation-methods/air-gap/populate-private-registry', '821'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/air-gap/prepare-nodes',
        component: ComponentCreator('/en/en/installation/other-installation-methods/air-gap/prepare-nodes', '1b1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/behind-proxy',
        component: ComponentCreator('/en/en/installation/other-installation-methods/behind-proxy', 'aca'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/behind-proxy/install-rancher',
        component: ComponentCreator('/en/en/installation/other-installation-methods/behind-proxy/install-rancher', '715'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/behind-proxy/launch-kubernetes',
        component: ComponentCreator('/en/en/installation/other-installation-methods/behind-proxy/launch-kubernetes', 'cfd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/behind-proxy/prepare-nodes',
        component: ComponentCreator('/en/en/installation/other-installation-methods/behind-proxy/prepare-nodes', '3cc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/single-node-docker',
        component: ComponentCreator('/en/en/installation/other-installation-methods/single-node-docker', '204'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/single-node-docker/advanced',
        component: ComponentCreator('/en/en/installation/other-installation-methods/single-node-docker/advanced', 'a98'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/single-node-docker/proxy',
        component: ComponentCreator('/en/en/installation/other-installation-methods/single-node-docker/proxy', '1b8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/single-node-docker/single-node-rollbacks',
        component: ComponentCreator('/en/en/installation/other-installation-methods/single-node-docker/single-node-rollbacks', '9a9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/single-node-docker/single-node-upgrades/single-node-updates',
        component: ComponentCreator('/en/en/installation/other-installation-methods/single-node-docker/single-node-upgrades/single-node-updates', '54e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/other-installation-methods/single-node-docker/troubleshooting',
        component: ComponentCreator('/en/en/installation/other-installation-methods/single-node-docker/troubleshooting', 'ca1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/requirements',
        component: ComponentCreator('/en/en/installation/requirements', 'e40'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/requirements/dockershim',
        component: ComponentCreator('/en/en/installation/requirements/dockershim', 'ada'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/requirements/installing-docker',
        component: ComponentCreator('/en/en/installation/requirements/installing-docker', '997'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/requirements/ports',
        component: ComponentCreator('/en/en/installation/requirements/ports', 'ad1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/requirements/ports/common-ports-table',
        component: ComponentCreator('/en/en/installation/requirements/ports/common-ports-table', '3ce'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources',
        component: ComponentCreator('/en/en/installation/resources', '117'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/advanced',
        component: ComponentCreator('/en/en/installation/resources/advanced', 'bde'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/advanced/api-audit-log',
        component: ComponentCreator('/en/en/installation/resources/advanced/api-audit-log', '0e2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/advanced/arm64-platform',
        component: ComponentCreator('/en/en/installation/resources/advanced/arm64-platform', 'f45'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/advanced/etcd',
        component: ComponentCreator('/en/en/installation/resources/advanced/etcd', '867'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/advanced/firewall',
        component: ComponentCreator('/en/en/installation/resources/advanced/firewall', 'b55'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/advanced/single-node-install-external-lb',
        component: ComponentCreator('/en/en/installation/resources/advanced/single-node-install-external-lb', 'bce'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/bootstrap-password',
        component: ComponentCreator('/en/en/installation/resources/bootstrap-password', '91d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/choosing-version',
        component: ComponentCreator('/en/en/installation/resources/choosing-version', '3cd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/custom-ca-root-certificate',
        component: ComponentCreator('/en/en/installation/resources/custom-ca-root-certificate', '425'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/feature-flags',
        component: ComponentCreator('/en/en/installation/resources/feature-flags', 'd5e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/feature-flags/continuous-delivery',
        component: ComponentCreator('/en/en/installation/resources/feature-flags/continuous-delivery', '5fb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/feature-flags/enable-not-default-storage-drivers',
        component: ComponentCreator('/en/en/installation/resources/feature-flags/enable-not-default-storage-drivers', 'fed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/feature-flags/istio-virtual-service-ui',
        component: ComponentCreator('/en/en/installation/resources/feature-flags/istio-virtual-service-ui', '96d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/helm-version',
        component: ComponentCreator('/en/en/installation/resources/helm-version', '91f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials', 'd9d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials/ha-RKE',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials/ha-RKE', 'dcf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials/ha-rke2',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials/ha-rke2', '81e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials/ha-with-external-db',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials/ha-with-external-db', 'fcd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials/how-ha-works',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials/how-ha-works', '00a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials', '92e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/ec2-node',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/ec2-node', '9f4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha', 'f9c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha-with-external-db',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha-with-external-db', '3e6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-rke2-ha',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-rke2-ha', '825'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nginx',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nginx', '04f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nlb',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/nlb', '3d1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/rds',
        component: ComponentCreator('/en/en/installation/resources/k8s-tutorials/infrastructure-tutorials/rds', '1c9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/local-system-charts',
        component: ComponentCreator('/en/en/installation/resources/local-system-charts', '2c2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/tls-secrets',
        component: ComponentCreator('/en/en/installation/resources/tls-secrets', '2b0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/tls-settings',
        component: ComponentCreator('/en/en/installation/resources/tls-settings', '344'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/troubleshooting',
        component: ComponentCreator('/en/en/installation/resources/troubleshooting', 'cf6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/update-rancher-cert',
        component: ComponentCreator('/en/en/installation/resources/update-rancher-cert', 'd3c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/installation/resources/upgrading-cert-manager',
        component: ComponentCreator('/en/en/installation/resources/upgrading-cert-manager', '653'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio',
        component: ComponentCreator('/en/en/istio', '146'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/configuration-reference',
        component: ComponentCreator('/en/en/istio/configuration-reference', '364'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/configuration-reference/canal-and-project-network',
        component: ComponentCreator('/en/en/istio/configuration-reference/canal-and-project-network', '245'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/configuration-reference/enable-istio-with-psp',
        component: ComponentCreator('/en/en/istio/configuration-reference/enable-istio-with-psp', 'd72'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/configuration-reference/rke2',
        component: ComponentCreator('/en/en/istio/configuration-reference/rke2', '906'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/configuration-reference/selectors-and-scrape',
        component: ComponentCreator('/en/en/istio/configuration-reference/selectors-and-scrape', '66c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/disabling-istio',
        component: ComponentCreator('/en/en/istio/disabling-istio', '657'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/rbac',
        component: ComponentCreator('/en/en/istio/rbac', '6cf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/resources',
        component: ComponentCreator('/en/en/istio/resources', 'ccc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/setup',
        component: ComponentCreator('/en/en/istio/setup', 'b40'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/setup/deploy-workloads',
        component: ComponentCreator('/en/en/istio/setup/deploy-workloads', 'd80'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/setup/enable-istio-in-cluster',
        component: ComponentCreator('/en/en/istio/setup/enable-istio-in-cluster', '67d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/setup/enable-istio-in-namespace',
        component: ComponentCreator('/en/en/istio/setup/enable-istio-in-namespace', '745'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/setup/gateway',
        component: ComponentCreator('/en/en/istio/setup/gateway', '068'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/setup/set-up-traffic-management',
        component: ComponentCreator('/en/en/istio/setup/set-up-traffic-management', 'cdc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/istio/setup/view-traffic',
        component: ComponentCreator('/en/en/istio/setup/view-traffic', '50d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher',
        component: ComponentCreator('/en/en/k8s-in-rancher', '475'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/certificates',
        component: ComponentCreator('/en/en/k8s-in-rancher/certificates', '969'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/configmaps',
        component: ComponentCreator('/en/en/k8s-in-rancher/configmaps', '399'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/horizontal-pod-autoscaler',
        component: ComponentCreator('/en/en/k8s-in-rancher/horizontal-pod-autoscaler', '9ca'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/horizontal-pod-autoscaler/hpa-background',
        component: ComponentCreator('/en/en/k8s-in-rancher/horizontal-pod-autoscaler/hpa-background', 'a51'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/horizontal-pod-autoscaler/manage-hpa-with-kubectl',
        component: ComponentCreator('/en/en/k8s-in-rancher/horizontal-pod-autoscaler/manage-hpa-with-kubectl', '1e0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/horizontal-pod-autoscaler/manage-hpa-with-rancher-ui',
        component: ComponentCreator('/en/en/k8s-in-rancher/horizontal-pod-autoscaler/manage-hpa-with-rancher-ui', '1d5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/horizontal-pod-autoscaler/testing-hpa',
        component: ComponentCreator('/en/en/k8s-in-rancher/horizontal-pod-autoscaler/testing-hpa', '9dc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/load-balancers-and-ingress',
        component: ComponentCreator('/en/en/k8s-in-rancher/load-balancers-and-ingress', '404'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/load-balancers-and-ingress/ingress',
        component: ComponentCreator('/en/en/k8s-in-rancher/load-balancers-and-ingress/ingress', '1f0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/load-balancers-and-ingress/ingress-config',
        component: ComponentCreator('/en/en/k8s-in-rancher/load-balancers-and-ingress/ingress-config', '12e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers',
        component: ComponentCreator('/en/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers', 'f4e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/registries',
        component: ComponentCreator('/en/en/k8s-in-rancher/registries', 'e94'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/secrets',
        component: ComponentCreator('/en/en/k8s-in-rancher/secrets', '7f5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/service-discovery',
        component: ComponentCreator('/en/en/k8s-in-rancher/service-discovery', 'ad7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/workloads',
        component: ComponentCreator('/en/en/k8s-in-rancher/workloads', '244'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/workloads/add-a-sidecar',
        component: ComponentCreator('/en/en/k8s-in-rancher/workloads/add-a-sidecar', '005'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/workloads/deploy-workloads',
        component: ComponentCreator('/en/en/k8s-in-rancher/workloads/deploy-workloads', 'd27'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/workloads/rollback-workloads',
        component: ComponentCreator('/en/en/k8s-in-rancher/workloads/rollback-workloads', 'ff3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/k8s-in-rancher/workloads/upgrade-workloads',
        component: ComponentCreator('/en/en/k8s-in-rancher/workloads/upgrade-workloads', 'eff'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/logging',
        component: ComponentCreator('/en/en/logging', 'ef3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/logging/architecture',
        component: ComponentCreator('/en/en/logging/architecture', '0bb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/logging/custom-resource-config',
        component: ComponentCreator('/en/en/logging/custom-resource-config', 'eaf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/logging/custom-resource-config/flows',
        component: ComponentCreator('/en/en/logging/custom-resource-config/flows', '9d1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/logging/custom-resource-config/outputs',
        component: ComponentCreator('/en/en/logging/custom-resource-config/outputs', '1d4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/logging/helm-chart-options',
        component: ComponentCreator('/en/en/logging/helm-chart-options', 'a30'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/logging/migrating',
        component: ComponentCreator('/en/en/logging/migrating', '1bf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/logging/rbac',
        component: ComponentCreator('/en/en/logging/rbac', '0a8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/logging/taints-tolerations',
        component: ComponentCreator('/en/en/logging/taints-tolerations', '6f0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/longhorn',
        component: ComponentCreator('/en/en/longhorn', 'c82'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting',
        component: ComponentCreator('/en/en/monitoring-alerting', '5c3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/configuration',
        component: ComponentCreator('/en/en/monitoring-alerting/configuration', 'b9a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/configuration/advanced',
        component: ComponentCreator('/en/en/monitoring-alerting/configuration/advanced', '5e3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/configuration/advanced/alertmanager',
        component: ComponentCreator('/en/en/monitoring-alerting/configuration/advanced/alertmanager', 'e64'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/configuration/advanced/prometheus',
        component: ComponentCreator('/en/en/monitoring-alerting/configuration/advanced/prometheus', '061'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/configuration/advanced/prometheusrules',
        component: ComponentCreator('/en/en/monitoring-alerting/configuration/advanced/prometheusrules', '9a6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/configuration/examples',
        component: ComponentCreator('/en/en/monitoring-alerting/configuration/examples', '540'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/configuration/helm-chart-options',
        component: ComponentCreator('/en/en/monitoring-alerting/configuration/helm-chart-options', '16a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/configuration/receiver',
        component: ComponentCreator('/en/en/monitoring-alerting/configuration/receiver', '034'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/configuration/route',
        component: ComponentCreator('/en/en/monitoring-alerting/configuration/route', 'cc1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/configuration/servicemonitor-podmonitor',
        component: ComponentCreator('/en/en/monitoring-alerting/configuration/servicemonitor-podmonitor', '7bf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/dashboards',
        component: ComponentCreator('/en/en/monitoring-alerting/dashboards', '144'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/expression',
        component: ComponentCreator('/en/en/monitoring-alerting/expression', 'b11'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/guides',
        component: ComponentCreator('/en/en/monitoring-alerting/guides', '31b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/guides/customize-grafana',
        component: ComponentCreator('/en/en/monitoring-alerting/guides/customize-grafana', 'cf6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/guides/enable-monitoring',
        component: ComponentCreator('/en/en/monitoring-alerting/guides/enable-monitoring', '60a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/guides/memory-usage',
        component: ComponentCreator('/en/en/monitoring-alerting/guides/memory-usage', 'e60'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/guides/migrating',
        component: ComponentCreator('/en/en/monitoring-alerting/guides/migrating', '38f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/guides/monitoring-workloads',
        component: ComponentCreator('/en/en/monitoring-alerting/guides/monitoring-workloads', 'dac'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/guides/persist-grafana',
        component: ComponentCreator('/en/en/monitoring-alerting/guides/persist-grafana', '7ba'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/guides/uninstall',
        component: ComponentCreator('/en/en/monitoring-alerting/guides/uninstall', '2fa'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/how-monitoring-works',
        component: ComponentCreator('/en/en/monitoring-alerting/how-monitoring-works', '7a5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/prometheus-federator',
        component: ComponentCreator('/en/en/monitoring-alerting/prometheus-federator', '499'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/prometheus-federator/guides/customizing-grafana',
        component: ComponentCreator('/en/en/monitoring-alerting/prometheus-federator/guides/customizing-grafana', '33e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/prometheus-federator/guides/enable-prom-fed',
        component: ComponentCreator('/en/en/monitoring-alerting/prometheus-federator/guides/enable-prom-fed', '7a7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/prometheus-federator/guides/prom-fed-workloads',
        component: ComponentCreator('/en/en/monitoring-alerting/prometheus-federator/guides/prom-fed-workloads', '674'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/prometheus-federator/guides/uninstall-prom-fed',
        component: ComponentCreator('/en/en/monitoring-alerting/prometheus-federator/guides/uninstall-prom-fed', 'bf6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/prometheus-federator/rbac',
        component: ComponentCreator('/en/en/monitoring-alerting/prometheus-federator/rbac', 'c19'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/rbac',
        component: ComponentCreator('/en/en/monitoring-alerting/rbac', 'a2c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/monitoring-alerting/windows-clusters',
        component: ComponentCreator('/en/en/monitoring-alerting/windows-clusters', 'bd4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/neuvector-integration',
        component: ComponentCreator('/en/en/neuvector-integration', 'db8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/opa-gatekeper/opa-gatekeeper',
        component: ComponentCreator('/en/en/opa-gatekeper/opa-gatekeeper', '91c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/overview',
        component: ComponentCreator('/en/en/overview', '03e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/overview/architecture',
        component: ComponentCreator('/en/en/overview/architecture', '132'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/overview/architecture-recommendations',
        component: ComponentCreator('/en/en/overview/architecture-recommendations', '252'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/overview/concepts',
        component: ComponentCreator('/en/en/overview/concepts', '7c4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/pipelines',
        component: ComponentCreator('/en/en/pipelines', 'a1c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/pipelines/concepts',
        component: ComponentCreator('/en/en/pipelines/concepts', '6ce'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/pipelines/config',
        component: ComponentCreator('/en/en/pipelines/config', '579'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/pipelines/example',
        component: ComponentCreator('/en/en/pipelines/example', '3ea'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/pipelines/example-repos',
        component: ComponentCreator('/en/en/pipelines/example-repos', 'afd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/pipelines/storage',
        component: ComponentCreator('/en/en/pipelines/storage', '047'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/project-admin',
        component: ComponentCreator('/en/en/project-admin', '7e3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/project-admin/namespaces',
        component: ComponentCreator('/en/en/project-admin/namespaces', '954'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/project-admin/pipelines',
        component: ComponentCreator('/en/en/project-admin/pipelines', '9ed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/project-admin/pod-security-policies',
        component: ComponentCreator('/en/en/project-admin/pod-security-policies', '2c0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/project-admin/project-members',
        component: ComponentCreator('/en/en/project-admin/project-members', '1cb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/project-admin/resource-quotas',
        component: ComponentCreator('/en/en/project-admin/resource-quotas', '41a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/project-admin/resource-quotas/override-container-default',
        component: ComponentCreator('/en/en/project-admin/resource-quotas/override-container-default', '65c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/project-admin/resource-quotas/override-namespace-default',
        component: ComponentCreator('/en/en/project-admin/resource-quotas/override-namespace-default', 'e3c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/project-admin/resource-quotas/quota-type-reference',
        component: ComponentCreator('/en/en/project-admin/resource-quotas/quota-type-reference', 'cb4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/project-admin/resource-quotas/quotas-for-projects',
        component: ComponentCreator('/en/en/project-admin/resource-quotas/quotas-for-projects', '7c6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/project-admin/tools',
        component: ComponentCreator('/en/en/project-admin/tools', '209'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide',
        component: ComponentCreator('/en/en/quick-start-guide', 'a0b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/deployment',
        component: ComponentCreator('/en/en/quick-start-guide/deployment', 'a0d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/deployment/amazon-aws-marketplace-qs',
        component: ComponentCreator('/en/en/quick-start-guide/deployment/amazon-aws-marketplace-qs', 'aa2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/deployment/amazon-aws-qs',
        component: ComponentCreator('/en/en/quick-start-guide/deployment/amazon-aws-qs', '4f4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/deployment/digital-ocean-qs',
        component: ComponentCreator('/en/en/quick-start-guide/deployment/digital-ocean-qs', 'e6b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/deployment/equinix-metal-qs',
        component: ComponentCreator('/en/en/quick-start-guide/deployment/equinix-metal-qs', '213'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/deployment/google-gcp-qs',
        component: ComponentCreator('/en/en/quick-start-guide/deployment/google-gcp-qs', '298'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/deployment/hetzner-cloud-qs',
        component: ComponentCreator('/en/en/quick-start-guide/deployment/hetzner-cloud-qs', '056'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/deployment/microsoft-azure-qs',
        component: ComponentCreator('/en/en/quick-start-guide/deployment/microsoft-azure-qs', '780'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/deployment/quickstart-manual-setup',
        component: ComponentCreator('/en/en/quick-start-guide/deployment/quickstart-manual-setup', '5da'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/deployment/quickstart-vagrant',
        component: ComponentCreator('/en/en/quick-start-guide/deployment/quickstart-vagrant', '67e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/workload',
        component: ComponentCreator('/en/en/quick-start-guide/workload', '60b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/workload/quickstart-deploy-workload-ingress',
        component: ComponentCreator('/en/en/quick-start-guide/workload/quickstart-deploy-workload-ingress', 'be8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/quick-start-guide/workload/quickstart-deploy-workload-nodeport',
        component: ComponentCreator('/en/en/quick-start-guide/workload/quickstart-deploy-workload-nodeport', 'abc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/security',
        component: ComponentCreator('/en/en/security', 'c21'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/security/best-practices',
        component: ComponentCreator('/en/en/security/best-practices', '210'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/security/cve',
        component: ComponentCreator('/en/en/security/cve', '23c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/security/hardening-guides',
        component: ComponentCreator('/en/en/security/hardening-guides', '732'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/security/hardening-guides/rke-1.6-benchmark-2.6',
        component: ComponentCreator('/en/en/security/hardening-guides/rke-1.6-benchmark-2.6', '036'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/security/hardening-guides/rke-1.6-hardening-2.6',
        component: ComponentCreator('/en/en/security/hardening-guides/rke-1.6-hardening-2.6', 'ee8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/security/hardening-guides/rke2-1.6-benchmark-2.6',
        component: ComponentCreator('/en/en/security/hardening-guides/rke2-1.6-benchmark-2.6', 'c22'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/security/hardening-guides/rke2-1.6-hardening-2.6',
        component: ComponentCreator('/en/en/security/hardening-guides/rke2-1.6-hardening-2.6', 'f31'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/security/security-scan',
        component: ComponentCreator('/en/en/security/security-scan', '034'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/security/selinux',
        component: ComponentCreator('/en/en/security/selinux', '09e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/system-tools',
        component: ComponentCreator('/en/en/system-tools', '7e4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting',
        component: ComponentCreator('/en/en/troubleshooting', 'dce'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/dns',
        component: ComponentCreator('/en/en/troubleshooting/dns', '28a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/expired-webhook-certificates',
        component: ComponentCreator('/en/en/troubleshooting/expired-webhook-certificates', 'ba5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/imported-clusters',
        component: ComponentCreator('/en/en/troubleshooting/imported-clusters', 'ab0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/kubernetes-components',
        component: ComponentCreator('/en/en/troubleshooting/kubernetes-components', '34c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/kubernetes-components/controlplane/etcd',
        component: ComponentCreator('/en/en/troubleshooting/kubernetes-components/controlplane/etcd', '89b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/kubernetes-components/etcd',
        component: ComponentCreator('/en/en/troubleshooting/kubernetes-components/etcd', '501'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/kubernetes-components/nginx-proxy',
        component: ComponentCreator('/en/en/troubleshooting/kubernetes-components/nginx-proxy', '983'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/kubernetes-components/worker-and-generic',
        component: ComponentCreator('/en/en/troubleshooting/kubernetes-components/worker-and-generic', 'dbb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/kubernetes-resources',
        component: ComponentCreator('/en/en/troubleshooting/kubernetes-resources', '2f1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/logging',
        component: ComponentCreator('/en/en/troubleshooting/logging', 'ac3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/networking',
        component: ComponentCreator('/en/en/troubleshooting/networking', '7ef'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/rancherha',
        component: ComponentCreator('/en/en/troubleshooting/rancherha', 'a75'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/troubleshooting/userid-tracking-in-audit-logs',
        component: ComponentCreator('/en/en/troubleshooting/userid-tracking-in-audit-logs', 'e20'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/user-settings',
        component: ComponentCreator('/en/en/user-settings', 'ec1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/user-settings/api-keys',
        component: ComponentCreator('/en/en/user-settings/api-keys', '77c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/user-settings/cloud-credentials',
        component: ComponentCreator('/en/en/user-settings/cloud-credentials', '723'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/user-settings/node-templates',
        component: ComponentCreator('/en/en/user-settings/node-templates', '8d2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/user-settings/preferences',
        component: ComponentCreator('/en/en/user-settings/preferences', '19a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/en/en/virtualization-admin',
        component: ComponentCreator('/en/en/virtualization-admin', '781'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
