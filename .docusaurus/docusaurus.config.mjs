/*
 * AUTOGENERATED - DON'T EDIT
 * Your edits in this file will be overwritten in the next build!
 * Modify the docusaurus.config.js file at your site's root instead.
 */
export default {
  "title": "Rancher Documentation",
  "tagline": "Find guides, tutorials and best practices for running Kubernetes everywhere.",
  "url": "https://rancher.com/docs/rancher",
  "baseUrl": "/",
  "onBrokenLinks": "throw",
  "onBrokenMarkdownLinks": "warn",
  "favicon": "img/favicon.png",
  "organizationName": "rancher",
  "projectName": "rancher-docs",
  "trailingSlash": false,
  "themeConfig": {
    "algolia": {
      "appId": "YOUR_APP_ID",
      "apiKey": "YOUR_SEARCH_API_KEY",
      "indexName": "YOUR_INDEX_NAME",
      "contextualSearch": true,
      "externalUrlRegex": "external\\.com|domain\\.com",
      "searchParameters": {},
      "searchPagePath": false
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": true,
      "respectPrefersColorScheme": false
    },
    "prism": {
      "additionalLanguages": [
        "rust"
      ],
      "theme": {
        "plain": {
          "color": "#bfc7d5",
          "backgroundColor": "#292d3e"
        },
        "styles": [
          {
            "types": [
              "comment"
            ],
            "style": {
              "color": "rgb(105, 112, 152)",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "string",
              "inserted"
            ],
            "style": {
              "color": "rgb(195, 232, 141)"
            }
          },
          {
            "types": [
              "number"
            ],
            "style": {
              "color": "rgb(247, 140, 108)"
            }
          },
          {
            "types": [
              "builtin",
              "char",
              "constant",
              "function"
            ],
            "style": {
              "color": "rgb(130, 170, 255)"
            }
          },
          {
            "types": [
              "punctuation",
              "selector"
            ],
            "style": {
              "color": "rgb(199, 146, 234)"
            }
          },
          {
            "types": [
              "variable"
            ],
            "style": {
              "color": "rgb(191, 199, 213)"
            }
          },
          {
            "types": [
              "class-name",
              "attr-name"
            ],
            "style": {
              "color": "rgb(255, 203, 107)"
            }
          },
          {
            "types": [
              "tag",
              "deleted"
            ],
            "style": {
              "color": "rgb(255, 85, 114)"
            }
          },
          {
            "types": [
              "operator"
            ],
            "style": {
              "color": "rgb(137, 221, 255)"
            }
          },
          {
            "types": [
              "boolean"
            ],
            "style": {
              "color": "rgb(255, 88, 116)"
            }
          },
          {
            "types": [
              "keyword"
            ],
            "style": {
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "doctype"
            ],
            "style": {
              "color": "rgb(199, 146, 234)",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "namespace"
            ],
            "style": {
              "color": "rgb(178, 204, 214)"
            }
          },
          {
            "types": [
              "url"
            ],
            "style": {
              "color": "rgb(221, 221, 221)"
            }
          }
        ]
      },
      "magicComments": [
        {
          "className": "theme-code-block-highlighted-line",
          "line": "highlight-next-line",
          "block": {
            "start": "highlight-start",
            "end": "highlight-end"
          }
        }
      ]
    },
    "navbar": {
      "title": "",
      "logo": {
        "alt": "logo",
        "src": "img/rancher-logo-horiz-color.svg",
        "href": "en"
      },
      "items": [
        {
          "type": "docsVersionDropdown",
          "position": "left",
          "dropdownItemsAfter": [
            {
              "to": "/versions",
              "label": "All versions"
            }
          ],
          "dropdownActiveClassDisabled": false,
          "dropdownItemsBefore": []
        },
        {
          "href": "https://github.com/rancher/rancher",
          "label": "GitHub",
          "position": "right",
          "className": "btn btn-primary icon-github"
        },
        {
          "href": "https://rancher.com/pricing",
          "label": "Pricing",
          "position": "right",
          "className": "btn btn-primary"
        },
        {
          "type": "search",
          "position": "right",
          "className": "btn btn-primary"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "style": "dark",
      "links": [],
      "copyright": "Copyright © 2022 SUSE Rancher. All Rights Reserved."
    },
    "docs": {
      "versionPersistence": "localStorage",
      "sidebar": {
        "hideable": false,
        "autoCollapseCategories": false
      }
    },
    "metadata": [],
    "tableOfContents": {
      "minHeadingLevel": 2,
      "maxHeadingLevel": 3
    }
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "routeBasePath": "/",
          "sidebarPath": "/Users/catherineluse/Documents/rancher-docs/rancher-docusaurus/docs/sidebars.js",
          "showLastUpdateTime": true,
          "editUrl": "https://github.com/kubewarden/docs/edit/main/",
          "lastVersion": "current",
          "versions": {
            "current": {
              "label": "v2.6",
              "path": "en"
            }
          }
        },
        "blog": false,
        "theme": {
          "customCss": [
            "/Users/catherineluse/Documents/rancher-docs/rancher-docusaurus/docs/src/css/custom.css"
          ]
        }
      }
    ]
  ],
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "staticDirectories": [
    "static"
  ],
  "customFields": {},
  "plugins": [],
  "themes": [],
  "scripts": [],
  "stylesheets": [],
  "clientModules": [],
  "titleDelimiter": "|",
  "noIndex": false
};
