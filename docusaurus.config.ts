import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkDirectiveSugar from 'remark-directive-sugar';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Developer.Overheid.NL",
  customFields: {
    siteName: 'Developer Overheid NL'
  },
  tagline: "Developer Portal van de Nederlandse Overheid",
  organizationName: "developer.overheid.nl",
  favicon: "favicon.svg",
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-96x96.png',
        sizes: '96x96',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'shortcut icon',
        href: '/favicon.ico',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/site.webmanifest',
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
  themes: ["@docusaurus/theme-mermaid"],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'communities',
        path: 'communities',
        routeBasePath: 'communities',
        sidebarPath: './sidebarsCommunities.ts',
        tags: '../tags.yml',
        onInlineTags: 'throw',
        // ... other options
      },
    ],
  ],
  presets: [
    [
      "classic",
      {
        docs: {
          path: 'docs',
          routeBasePath: 'kennisbank',
          sidebarPath: "./sidebars.ts",
          tags: '../tags.yml',
          onInlineTags: 'throw',
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
            type: ["rss", "atom"],
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
    // Replace with your project's social card
    image: "img/don-social-card.png",
    metadata: [
      {
        property: 'og:title',
        content: 'Developer Overheid NL | Developer Portal van de Nederlandse Overheid',
      },
      {
        name: 'twitter:image:alt', 
        content: "Developer Portal van de Nederlandse Overheid; Informatie, bronnen en tools van de overheid voor ontwikkelaars door Kennisplatform API's, Digilab, Opensourcewerken, Binnenlandse Zaken, Geonovum, Belastingdienst, Kadaster en andere overheidsinstanties.",
      }
    ],
    navbar: {
      title: "Home",
      items: [
        {
          to: '/kennisbank',
          label: 'Kennisbank',
          position: 'left',
          activeBaseRegex: `/kennisbank`,
        },
        {
          to: '/communities',
          label: 'Communities',
          position: 'left',
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
          label: "Open Source Software",
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
