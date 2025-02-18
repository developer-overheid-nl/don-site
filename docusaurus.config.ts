import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Developer.overheid.nl",
  customFields: {
    siteName: 'Ontwikkelaarsportaal'
  },
  tagline: "Voor de developer bij de overheid",
  organizationName: "developer.overheid.nl",
  favicon: "favicon.ico",
  headTags: [],

  // Set the production url of your site here
  url: "https://don.apps.digilab.network",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

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
  themes: ["@docusaurus/theme-mermaid"],
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/developer-overheid-nl/don-site/tree/main/",
        },
        blog: {
          blogSidebarCount: 30,
          blogSidebarTitle: "Laatste posts",
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/developer-overheid-nl/don-site/tree/main/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        pages: {},
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/don-social-card.png",
    metadata: [
      {
        property: 'og:title',
        content: 'Developer.overheid.nl | Ontwikkelaarsportaal voor de developer bij de overheid',
      },
      {
        name: 'twitter:image:alt', 
        content: 'Ontwikkelaarsportaal voor de developer bij de overheid; Informatie en tools van de overheid voor ontwikkelaars door Kennisplatform API\'s, Digilab, DSO, Open source werken, BZK, Belastingdienst, Kadaster en andere overheidsorganisaties.',
      }
    ],
    navbar: {
      title: "Home",
      items: [
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "apis",
          label: "API's",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "openSource",
          label: "Open Source",
        },
        {
          type: "docSidebar",
          sidebarId: "security",
          position: "left",
          label: "Security",
        },
        {
          type: "docSidebar",
          sidebarId: "front-end",
          position: "left",
          label: "Front-end",
        },
        {
          type: "docSidebar",
          sidebarId: "richtlijnen",
          position: "left",
          label: "Richtlijnen",
        },
        {
          type: "docSidebar",
          sidebarId: "architectuur",
          position: "left",
          label: "Architectuur",
        },
        {
          type: "docSidebar",
          sidebarId: "overig",
          position: "left",
          label: "Overig",
        },
        { to: "/blog", label: "Blog", position: "right" },
        {
          href: "https://community.developer.overheid.nl",
          label: "Community",
          position: "right",
        },
        {
          href: "https://developer.overheid.nl/apis",
          label: "API Catalogus",
          position: "right",
        },
        {
          href: "https://developer.overheid.nl/apis",
          label: "Open Source Catalogus",
          position: "right",
        },
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
            }
          ]
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
          ],
        },
        {
          title: "Overig",
          items: [
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
