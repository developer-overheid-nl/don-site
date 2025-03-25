import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkDirectiveSugar from "remark-directive-sugar";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "developer.overheid.nl",
  customFields: {
    siteName: "developer.overheid.nl",
  },
  tagline: "Ontwikkelaarsportaal van de Nederlandse overheid",
  organizationName: "developer.overheid.nl",
  favicon: "favicon.svg",
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        href: "/favicon-96x96.png",
        sizes: "96x96",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "shortcut icon",
        href: "/favicon.ico",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    },
  ],

  // Set the production url of your site here
  url: "https://developer.overheid.nl",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "nl",
    locales: ["nl"],
  },
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid", "docusaurus-theme-search-typesense"],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "communities",
        path: "communities",
        routeBasePath: "communities",
        sidebarPath: "./sidebarsCommunities.ts",
        tags: "../tags.yml",
        onInlineTags: "throw",
        // ... other options
      },
    ],
  ],
  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "kennisbank",
          sidebarPath: "./sidebars.ts",
          tags: "../tags.yml",
          onInlineTags: "throw",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/developer-overheid-nl/don-site/tree/main/",
        },
        blog: {
          blogSidebarCount: 20,
          blogSidebarTitle: "Laatste posts",
          showReadingTime: true,
          beforeDefaultRemarkPlugins: [remarkDirectiveSugar],
          feedOptions: {
            type: "all",
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/developer-overheid-nl/don-site/tree/main/",
          // Useful options to enforce blogging best practices
          tags: "../tags.yml",
          onInlineTags: "throw",
          onInlineAuthors: "throw",
          onUntruncatedBlogPosts: "throw",
        },
        pages: {},
        sitemap: {},
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    typesense: {
      typesenseCollectionName: "developer_overheid",
      typesenseServerConfig: {
        nodes: [
          {
            host: "search.developer.overheid.nl",
            port: 443,
            protocol: "https",
          },
          // {
          //   host: "search.don.apps.digilab.network",
          //   port: 443,
          //   protocol: "https",
          // },
          // {
          //   host: "localhost",
          //   port: 8108,
          //   protocol: "http",
          // },
        ],
        // apiKey: "xyz", Lokaal
        // apiKey: "wpxe5EBzgodXiGygAr5jIYIAXNErTg3w", //test
        apiKey: "TimHDyXz7K91KWuiXDcH2UN41hMk8BNc", //prod
      },
      typesenseSearchParameters: {
        query_by:
          "hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5",
        filter_by: "",
        multi_search: true,
      },
      externalUrlRegex:
        "apis\\.developer\\.overheid\\.nl|oss\\.developer\\.overheid\\.nl",
      contextualSearch: false,
      searchPagePath: false,
    },
    // Replace with your project's social card
    image: "img/don-social-card.png",
    metadata: [
      {
        property: "og:title",
        content:
          "developer.overheid.nl | Ontwikkelaarsportaal van de Nederlandse overheid",
      },
      {
        name: "twitter:image:alt",
        content:
          "Ontwikkelaarsportaal van de Nederlandse overheid; Informatie, bronnen en tools van de overheid voor ontwikkelaars door Kennisplatform API's, Digilab, Opensourcewerken, Binnenlandse Zaken, Geonovum, Belastingdienst, Kadaster en andere overheidsinstanties.",
      },
    ],
    navbar: {
      title: "Home",
      items: [
        {
          to: "/kennisbank",
          label: "Kennisbank",
          position: "left",
          activeBaseRegex: `/kennisbank`,
        },
        {
          to: "/communities",
          label: "Communities",
          position: "left",
          activeBaseRegex: `/communities`,
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://community.developer.overheid.nl",
          label: "Forum",
          position: "right",
        },
        {
          href: "https://apis.developer.overheid.nl",
          label: "API's",
          position: "right",
        },
        {
          href: "https://oss.developer.overheid.nl",
          label: "Open Source",
          position: "right",
        },
        {
          href: "https://data.overheid.nl",
          label: "Open Data",
          position: "right",
        },
        {
          href: "https://www.pdok.nl",
          label: "Geodata",
          position: "right",
        },
        {
          href: "https://github.com/developer-overheid-nl/",
          'aria-label': 'Onze GitHub repositories',
          html: `<svg aria-hidden="true" height="24" viewBox="0 0 24 24" version="1.1" width="24" data-view-component="true" class="octicon octicon-mark-github">
    <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
</svg>`,
          position: "right",
        }
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Mede mogelijk gemaakt door:",
          items: [
            {
              html: `
              <div class="sponsors">
                <img class="sponsors__logo" src="/img/logo-bzk.png" alt="Logo van Ministerie van Binnenlandse Zaken en Koninkrijksrelaties" />
                <img class="sponsors__logo" src="/img/logo-vng.svg" alt="Logo van Vereniging van Nederlandse Gemeenten" />
                <img class="sponsors__logo" src="/img/Logo_Forum_Standaardisatie_RGB_wit.png" alt="Logo forum voor standaardisatie" />
              </div>
              `,
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discourse",
              href: "https://community.developer.overheid.nl",
            },
            {
              label: "Slack",
              href: "https://codefornl.slack.com/archives/CFV4B3XE2",
            },
            {
              label: "GitHub",
              href: "https://github.com/developer-overheid-nl",
            },
            {
              label: "Mastodon",
              href: "https://social.overheid.nl/@developer",
            },
          ],
        },
        {
          title: "Overig",
          items: [
            {
              label: "Bijdragen",
              to: "/contributing",
            },
            {
              label: "Implementatie ondersteuning",
              to: "/implementatie-ondersteuning",
            },
            {
              label: "Contact",
              to: "/contact",
            },
            {
              label: "Privacyverklaring",
              to: "/privacy",
            },
            {
              label: "Toegankelijkheidsverklaring",
              href: "https://www.toegankelijkheidsverklaring.nl/register/17963",
            },
            {
              label: "Sitearchief",
              href: "https://minbzk.sitearchief.nl/?subsite=developeroverheid",
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
