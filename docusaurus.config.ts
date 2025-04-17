// import { themes as prismThemes } from "prism-react-renderer";
import docusaurusTheme from "./src/utils/prismLight"
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
          blogSidebarCount: 0,
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
      searchPagePath: 'zoeken', // DON version: when set to `false`, it shows the modal, if set to {string}, it will show search input on homepage and button in menu.
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
          "Ontwikkelaarsportaal van de Nederlandse overheid; Eén plek met informatie, bronnen, tools en codevoorbeelden van de overheid voor developers over privacy, security, toegankelijkheid, DevOps, infra, data, AI, standaarden, API's, Open Source en meer.",
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
          "aria-label": "Onze GitHub repositories",
          className: "navbar__icon-link",
          html: `<svg aria-hidden="true" height="24" viewBox="0 0 24 24" version="1.1" width="24" data-view-component="true" class="octicon octicon-mark-github">
            <path fill="CurrentColor" d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
          </svg>`,
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
                <!-- temporary forced-colors fix untill good BZK svg-logo -->
                <img class="sponsors__logo" src="/img/logo-bzk.png" alt="Logo van Ministerie van Binnenlandse Zaken en Koninkrijksrelaties" style="forced-color-adjust: none; background-color: var(--ifm-footer-background-color);" />
                <svg class="sponsors__logo" viewBox="150 15 96 50" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <style>
                      .abbr { color: #f5f5f5; }
                      .brdr { color: #009FE4; }
                      @media (forced-colors: active) {
                        .abbr { color: #004388; }
                      }
                      @media (forced-colors: active) and (prefers-color-scheme: dark) {
                        .abbr { color: #f5f5f5; }
                      }
                    </style>
                  </defs>
                  <g fill="none" fill-rule="evenodd">
                    <g class="brdr" transform="translate(187.931 15)">
                      <path d="M57.396 24.913c0-13.573-11.004-24.622-24.56-24.7-.024 0-.048-.003-.073-.003H24.75a2.504 2.504 0 1 0 0 5.01h7.945c10.858 0 19.694 8.834 19.694 19.693 0 10.86-8.836 19.694-19.694 19.694H5.289v-4.578H.281v9.587h32.482v-.001c13.59-.04 24.633-11.105 24.633-24.702" fill="currentColor" />
                    </g>
                    <g class="brdr" transform="translate(150 15)">
                      <path d="M.448 24.913c0 13.573 11.004 24.622 24.56 24.7.024 0 .048.003.073.003h8.014a2.504 2.504 0 1 0 0-5.009h-7.944c-10.859 0-19.694-8.834-19.694-19.694 0-10.859 8.835-19.694 19.694-19.694h27.404v4.578h5.009V.21H25.08v.001C11.49.251.448 11.316.448 24.913" fill="currentColor" />
                    </g>
                    <path class="abbr" fill="currentColor" d="M176.017 42.116l-4.678-12.401h-5.664l8.14 20.366h3.921l8.401-20.366h-5.363zm26.542.558l-7.928-12.959h-6.413v20.367h4.997V36.787l8.15 13.295h6.19V29.715h-4.996zm19.323-4.94v4.663h3.537v2.677a9.773 9.773 0 0 1-1.414.54c-.652.203-1.443.306-2.354.306-.88 0-1.686-.15-2.394-.448a5.338 5.338 0 0 1-1.824-1.247 5.522 5.522 0 0 1-1.17-1.894c-.272-.729-.41-1.549-.41-2.433 0-.867.138-1.681.41-2.42a5.502 5.502 0 0 1 1.17-1.908 5.374 5.374 0 0 1 1.824-1.246c.709-.298 1.514-.449 2.394-.449 1.064 0 1.959.151 2.657.449.7.297 1.338.74 1.898 1.318l.242.248 3.515-3.835-.237-.221a8.923 8.923 0 0 0-3.627-2.038c-1.35-.386-2.847-.583-4.448-.583-1.572 0-3.044.25-4.373.745a10.139 10.139 0 0 0-3.481 2.143c-.975.928-1.746 2.066-2.29 3.384-.543 1.315-.819 2.8-.819 4.413 0 1.613.276 3.098.82 4.413.545 1.319 1.314 2.457 2.289 3.384.974.926 2.146 1.647 3.48 2.143 1.33.494 2.802.744 4.374.744 1.464 0 2.92-.152 4.33-.452a16.054 16.054 0 0 0 4.09-1.478l.177-.09V37.733h-8.366z"/>
                  </g>
                </svg>
                <svg class="sponsors__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 230.61">
                  <defs>
                    <style>
                      .cls-1{ fill: #e1710d; }
                      .cls-2{ fill: #fefdfd; }
                      @media (forced-colors: active) {
                        .cls-2{ fill: CanvasText; }
                      }
                    </style>
                  </defs>
                  <g>
                    <path class="cls-1" d="M482,171H8V8H482ZM490,0H0V179H490Z"/>
                    <polygon class="cls-2" points="34.72 34.14 57.62 34.14 57.62 40.73 42.71 40.73 42.71 52.51 56.82 52.51 56.82 59.1 42.71 59.1 42.71 77.8 34.72 77.8 34.72 34.14"/><path class="cls-2" d="M76.59,78.4c-9,0-15.44-5.59-15.44-16.44s7.59-17.71,16.37-17.71c9.06,0,15.45,5.6,15.45,16.51S85.38,78.4,76.59,78.4m.47-27.49c-4.59,0-8.19,3.79-8.19,10.78,0,6.79,3.2,10,8.19,10,4.59,0,8.19-3.79,8.19-10.78,0-6.72-3.27-10.05-8.19-10.05"/><path class="cls-2" d="M117.2,52.18a14,14,0,0,0-3.73-.47,10.18,10.18,0,0,0-6.39,2.4V77.8H99.56V45.05l7.45-.33v3.79c2.27-2.93,4.33-4.06,6.93-4.06a13.57,13.57,0,0,1,3.79.47Z"/><path class="cls-2" d="M128.58,65c0,4.53,1.73,6.39,5.79,6.39a13.64,13.64,0,0,0,6.26-1.4v-25l7.52-.33V77.8H140.9V75.61c-2.93,1.79-5.06,2.79-8.39,2.79-7.66,0-11.45-4.33-11.45-12V45.05l7.52-.33V65Z"/><path class="cls-2" d="M195.94,57.7c0-4.33-2.13-6.26-6-6.26a14.25,14.25,0,0,0-6.12,1.27V77.8H176.3V57.7c0-4.46-2.06-6.26-6-6.26a14.07,14.07,0,0,0-6.12,1.27V77.8h-7.52V45.05l7.32-.33v2.4a15.53,15.53,0,0,1,8.65-2.67c4.26,0,7,1.27,9,3.6a17.14,17.14,0,0,1,10.45-3.6c7.26,0,11.38,4.2,11.38,11.72V77.8h-7.52V57.7Z"/><path class="cls-2" d="M32.26,137.11a55.85,55.85,0,0,0,11.12,1.07c6,0,9.38-2.67,9.38-5.79,0-2.8-1.33-4.46-6.59-6.26l-5.45-1.86c-5.13-1.73-7.93-5.4-7.93-11,0-7.59,6.13-13,16.85-13a47.39,47.39,0,0,1,9.25.86l-.54,6.66a45.9,45.9,0,0,0-9.11-.87c-6,0-8.66,2.33-8.66,5.46,0,2.73,1.53,4.33,5.53,5.59l5.39,1.73c6.39,2.07,9.18,5.53,9.18,11.19,0,8.25-6.65,14-17.57,14a58,58,0,0,1-10.85-.8Z"/><path class="cls-2" d="M64.81,111.42h4v-6l7.52-.67v6.66h8.32v5.79H76.33v15.57c0,3.8,2,5.46,4.92,5.46a16.18,16.18,0,0,0,4.26-.53V144a22.5,22.5,0,0,1-6.45.8c-6.13,0-10.25-3.46-10.25-11V117.21h-4Z"/><path class="cls-2" d="M114.73,144.37h-7v-2.13a16,16,0,0,1-9.32,2.53c-6.72,0-10.45-3.67-10.45-9.19,0-6.06,4.66-10.32,15-10.32,1.66,0,3.12.07,4.52.07v-1.86c0-3.6-2.13-5.6-7.32-5.6a22.84,22.84,0,0,0-9.39,2l-1.06-6.32A28.55,28.55,0,0,1,101.49,111c8.85,0,13.24,4.19,13.24,11.58v21.77Zm-14.17-5.59a13.71,13.71,0,0,0,6.85-1.73v-6.19c-1.26-.07-3-.14-4.32-.14-5.4,0-7.46,1.73-7.46,4.26,0,2.33,1.8,3.8,4.93,3.8"/><path class="cls-2" d="M142.69,124.2c0-4.33-2.13-6.19-6.06-6.19a15.29,15.29,0,0,0-6.39,1.26v25.1h-7.52V111.62l7.32-.33v2.39a15.37,15.37,0,0,1,8.72-2.66c7.19,0,11.45,4.13,11.45,11.65v21.7h-7.52V124.2Z"/><path class="cls-2" d="M185.82,144.37H178.5V142.1a14.53,14.53,0,0,1-8.52,2.67c-8.19,0-13.71-5.46-13.71-16.11,0-11.12,7.19-17.64,17.24-17.64a18.18,18.18,0,0,1,4.79.53V98.24l7.52-.4v46.53ZM164,128.26c0,7,3.4,9.92,8.25,9.92a11.57,11.57,0,0,0,6.06-1.53V117.88a26.67,26.67,0,0,0-4.72-.4c-5.79,0-9.59,4-9.59,10.78"/><path class="cls-2" d="M218.71,144.37h-7.06v-2.13a16,16,0,0,1-9.32,2.53c-6.72,0-10.45-3.67-10.45-9.19,0-6.06,4.66-10.32,15-10.32,1.66,0,3.13.07,4.53.07v-1.86c0-3.6-2.13-5.6-7.33-5.6a22.79,22.79,0,0,0-9.38,2l-1.07-6.32A28.55,28.55,0,0,1,205.46,111c8.85,0,13.25,4.19,13.25,11.58v21.77Zm-14.18-5.59a13.71,13.71,0,0,0,6.85-1.73v-6.19c-1.26-.07-3-.14-4.32-.14-5.39,0-7.46,1.73-7.46,4.26,0,2.33,1.8,3.8,4.93,3.8"/><path class="cls-2" d="M251.06,144.37H244v-2.13a16,16,0,0,1-9.32,2.53c-6.72,0-10.45-3.67-10.45-9.19,0-6.06,4.66-10.32,15-10.32,1.66,0,3.13.07,4.53.07v-1.86c0-3.6-2.13-5.6-7.33-5.6a22.79,22.79,0,0,0-9.38,2L226,113.55A28.55,28.55,0,0,1,237.81,111c8.85,0,13.25,4.19,13.25,11.58v21.77Zm-14.18-5.59a13.75,13.75,0,0,0,6.86-1.73v-6.19c-1.27-.07-3-.14-4.33-.14-5.39,0-7.46,1.73-7.46,4.26,0,2.33,1.8,3.8,4.93,3.8"/><path class="cls-2" d="M276.69,118.74a14.44,14.44,0,0,0-3.73-.46,10.21,10.21,0,0,0-6.39,2.39v23.7h-7.52V111.62l7.45-.34v3.8c2.26-2.93,4.33-4.06,6.92-4.06a13.23,13.23,0,0,1,3.8.47Z"/><path class="cls-2" d="M308.7,144.37h-7.32V142.1a14.53,14.53,0,0,1-8.52,2.67c-8.19,0-13.71-5.46-13.71-16.11,0-11.12,7.19-17.64,17.24-17.64a18.18,18.18,0,0,1,4.79.53V98.24l7.52-.4v46.53Zm-21.83-16.11c0,7,3.4,9.92,8.25,9.92a11.59,11.59,0,0,0,6.06-1.53V117.88a26.76,26.76,0,0,0-4.72-.4c-5.8,0-9.59,4-9.59,10.78"/><path class="cls-2" d="M321,97.77a4.09,4.09,0,0,1,4.46,4.33,4.14,4.14,0,0,1-4.46,4.26c-2.86,0-4.39-1.73-4.39-4.26A4.14,4.14,0,0,1,321,97.77m3.8,46.6h-7.53V111.62l7.53-.33Z"/><path class="cls-2" d="M331.27,137.31a38,38,0,0,0,9.38,1.13c4.66,0,6.26-1.39,6.26-3.39,0-1.73-.93-2.73-4.46-3.73l-4.13-1.2c-4.52-1.33-7.05-4.12-7.05-8.78,0-5.93,5.06-10.32,13.71-10.32a40.21,40.21,0,0,1,8,.73l-.46,6.32a47.33,47.33,0,0,0-8-.66c-4.06,0-5.86,1.4-5.86,3.13s.67,2.53,3.86,3.39l3.93,1.07c5.66,1.53,7.92,4.46,7.92,8.85,0,6.79-5.26,10.92-13.71,10.92a39,39,0,0,1-9.45-.93v-6.53Z"/><path class="cls-2" d="M385.05,144.37H378v-2.13a16,16,0,0,1-9.32,2.53c-6.72,0-10.45-3.67-10.45-9.19,0-6.06,4.66-10.32,15-10.32,1.66,0,3.12.07,4.52.07v-1.86c0-3.6-2.13-5.6-7.32-5.6a22.81,22.81,0,0,0-9.39,2L360,113.55A28.55,28.55,0,0,1,371.81,111c8.85,0,13.24,4.19,13.24,11.58v21.77Zm-14.17-5.59a13.71,13.71,0,0,0,6.85-1.73v-6.19c-1.26-.07-3-.14-4.33-.14-5.39,0-7.45,1.73-7.45,4.26,0,2.33,1.8,3.8,4.93,3.8"/><path class="cls-2" d="M390.18,111.42h4v-6l7.52-.67v6.66H410v5.79h-8.32v15.57c0,3.8,2,5.46,4.93,5.46a16.18,16.18,0,0,0,4.26-.53V144a22.62,22.62,0,0,1-6.46.8c-6.12,0-10.25-3.46-10.25-11V117.21h-4v-5.79Z"/><path class="cls-2" d="M419.46,97.77a4.1,4.1,0,0,1,4.47,4.33,4.15,4.15,0,0,1-4.47,4.26c-2.86,0-4.39-1.73-4.39-4.26a4.14,4.14,0,0,1,4.39-4.33m3.8,46.6h-7.52V111.62l7.52-.33Z"/><path class="cls-2" d="M444.69,110.82c8.06,0,13.05,4.86,13.05,13.45,0,2-.07,4.12-.2,5.59H437.17c.8,5.85,4.19,8.52,10.12,8.52a28,28,0,0,0,9.58-1.6V143a30,30,0,0,1-10.51,1.73c-10.06,0-16.51-5.33-16.51-16.78,0-11.25,6.66-17.17,14.84-17.17m5.73,13.51c0-4.52-2.4-7.45-6.26-7.45-3.53,0-6.19,2.59-6.86,7.45Z"/><path class="cls-2" d="M32.82,229.75v-3.31c1.35.32,2.59.54,3.71.69a27.71,27.71,0,0,0,3.43.21,8.07,8.07,0,0,0,5-1.44,4.41,4.41,0,0,0,1.92-3.67,4.89,4.89,0,0,0-.8-2.79,10.25,10.25,0,0,0-3.13-2.6l-3.73-2.32a10.45,10.45,0,0,1-3.27-3.05,7.07,7.07,0,0,1-1-3.86,8,8,0,0,1,2.79-6.27,10.36,10.36,0,0,1,7.14-2.48q1.8,0,3.06.12a17.73,17.73,0,0,1,2.67.45l-.28,3.21c-1-.22-2-.38-2.84-.49a22.72,22.72,0,0,0-2.89-.17,6.28,6.28,0,0,0-4.42,1.51,4.57,4.57,0,0,0-1.64,3.41,4.52,4.52,0,0,0,.74,2.6,7.82,7.82,0,0,0,2.62,2.18l3.65,2.18a11.62,11.62,0,0,1,4,3.4,7.3,7.3,0,0,1,1.09,4,8.42,8.42,0,0,1-3,6.55,11.47,11.47,0,0,1-7.92,2.67c-1.17,0-2.3,0-3.41-.16a25.61,25.61,0,0,1-3.4-.6"/><path class="cls-2" d="M54.73,209.74V207h2.69l.47-5,3.36-.52L60.69,207h4.77l-.28,2.7H60.4L59,223.32a5.78,5.78,0,0,0,.31,3.33,1.87,1.87,0,0,0,1.73.88,8.29,8.29,0,0,0,1.58-.14c.46-.1,1-.26,1.73-.48v3a11.07,11.07,0,0,1-2.06.57,14.29,14.29,0,0,1-2.3.14,4.11,4.11,0,0,1-3.57-1.6c-.77-1.08-1-2.89-.78-5.45l1.42-13.81Z"/><path class="cls-2" d="M82.54,207l2.84-.48-2.13,23.66H80l.38-3.79h-.15a10.92,10.92,0,0,1-3.31,3.2,7.22,7.22,0,0,1-3.69,1,4.56,4.56,0,0,1-3.76-1.82Q68,227,68,222.56q0-7.71,3.38-11.83c2.26-2.74,4.8-4.11,7.64-4.11a17.88,17.88,0,0,1,1.89.09,12.49,12.49,0,0,1,1.61.29m-2,15.89,1.18-13.15a10,10,0,0,0-1.42-.21c-.54-.05-1.06-.07-1.56-.07-1.77,0-3.42,1.08-5,3.26s-2.29,5.38-2.29,9.61a7.18,7.18,0,0,0,.83,4,2.42,2.42,0,0,0,2,1.16,5.22,5.22,0,0,0,2.86-1.16,15.35,15.35,0,0,0,3.34-3.48"/><path class="cls-2" d="M102.09,230.18l1.46-15.28c.19-1.9.06-3.21-.4-3.93a2.11,2.11,0,0,0-1.87-1.09,6,6,0,0,0-2.67.9,23,23,0,0,0-3.81,2.79l-1.51,16.61H89.93l2.08-23,3.36-.43L95,210.35h.14a15,15,0,0,1,3.73-2.88,7.37,7.37,0,0,1,3.32-.85,4.43,4.43,0,0,1,3.78,1.77c.89,1.18,1.2,3.18.95,6l-1.52,15.81Z"/><path class="cls-2" d="M130,197l-3,33.17h-3.26l.38-3.79h-.15a11.55,11.55,0,0,1-3.33,3.2,7.07,7.07,0,0,1-3.67,1,4.56,4.56,0,0,1-3.76-1.82q-1.44-1.82-1.44-6.22,0-7.71,3.38-11.83c2.26-2.74,4.8-4.11,7.64-4.11a16.2,16.2,0,0,1,1.63.07,10.08,10.08,0,0,1,1.35.21l.85-9.46Zm-5.72,25.88,1.23-13.15a10.25,10.25,0,0,0-1.45-.21c-.55-.05-1.08-.07-1.58-.07-1.77,0-3.42,1.08-5,3.26s-2.29,5.38-2.29,9.61a7.18,7.18,0,0,0,.83,4,2.42,2.42,0,0,0,2,1.16,5.22,5.22,0,0,0,2.86-1.16,15.35,15.35,0,0,0,3.34-3.48"/><path class="cls-2" d="M148,207l2.84-.48-2.13,23.66h-3.27l.38-3.79h-.14a11,11,0,0,1-3.31,3.2,7.22,7.22,0,0,1-3.69,1,4.56,4.56,0,0,1-3.77-1.82q-1.44-1.82-1.44-6.22,0-7.71,3.38-11.83t7.65-4.11a18.15,18.15,0,0,1,1.89.09A12.81,12.81,0,0,1,148,207m-2,15.89,1.18-13.15a10,10,0,0,0-1.42-.21c-.53-.05-1.05-.07-1.56-.07-1.77,0-3.41,1.08-4.94,3.26s-2.3,5.38-2.3,9.61a7.27,7.27,0,0,0,.83,4,2.42,2.42,0,0,0,2,1.16,5.19,5.19,0,0,0,2.86-1.16,15.35,15.35,0,0,0,3.34-3.48"/><path class="cls-2" d="M169.74,207l2.84-.48-2.13,23.66h-3.26l.38-3.79h-.14a11.05,11.05,0,0,1-3.32,3.2,7.17,7.17,0,0,1-3.69,1,4.56,4.56,0,0,1-3.76-1.82q-1.44-1.82-1.44-6.22,0-7.71,3.38-11.83c2.26-2.74,4.8-4.11,7.64-4.11a18.22,18.22,0,0,1,1.9.09,12.33,12.33,0,0,1,1.6.29m-2,15.89,1.18-13.15a10,10,0,0,0-1.42-.21c-.54-.05-1.06-.07-1.56-.07-1.77,0-3.42,1.08-4.94,3.26s-2.3,5.38-2.3,9.61a7.27,7.27,0,0,0,.83,4,2.42,2.42,0,0,0,2,1.16,5.22,5.22,0,0,0,2.86-1.16,15.35,15.35,0,0,0,3.34-3.48"/><path class="cls-2" d="M189.29,207l-.43,3.31c-.25,0-.47-.06-.66-.07s-.43,0-.71,0a4.41,4.41,0,0,0-2.79,1.23,13.78,13.78,0,0,0-2.8,3.4l-1.32,15.38h-3.36l1.94-23,3.36-.42-.43,4.35h.19a11.75,11.75,0,0,1,2.82-3.69,4.43,4.43,0,0,1,2.62-.85,4.5,4.5,0,0,1,.83.07,2.33,2.33,0,0,1,.74.26"/><path class="cls-2" d="M208.73,197l-3,33.17h-3.26l.38-3.79h-.14a11.7,11.7,0,0,1-3.34,3.2,7.07,7.07,0,0,1-3.67,1,4.56,4.56,0,0,1-3.76-1.82q-1.44-1.82-1.44-6.22,0-7.71,3.38-11.83c2.26-2.74,4.8-4.11,7.64-4.11a16.07,16.07,0,0,1,1.63.07,10.08,10.08,0,0,1,1.35.21l.86-9.46ZM203,222.89l1.23-13.15a10,10,0,0,0-1.45-.21c-.55-.05-1.08-.07-1.58-.07-1.77,0-3.42,1.08-4.94,3.26s-2.3,5.38-2.3,9.61a7.27,7.27,0,0,0,.83,4,2.42,2.42,0,0,0,2,1.16,5.22,5.22,0,0,0,2.86-1.16,15.35,15.35,0,0,0,3.34-3.48"/><path class="cls-2" d="M219.19,229.75v-3.31c1.35.32,2.59.54,3.71.69a27.71,27.71,0,0,0,3.43.21,8.07,8.07,0,0,0,5-1.44,4.41,4.41,0,0,0,1.92-3.67,4.82,4.82,0,0,0-.81-2.79,10.06,10.06,0,0,0-3.12-2.6l-3.73-2.32a10.45,10.45,0,0,1-3.27-3.05,7,7,0,0,1-1-3.86,8,8,0,0,1,2.79-6.27,10.36,10.36,0,0,1,7.14-2.48q1.8,0,3.06.12a17.73,17.73,0,0,1,2.67.45l-.29,3.21c-1-.22-2-.38-2.83-.49a22.72,22.72,0,0,0-2.89-.17,6.27,6.27,0,0,0-4.42,1.51,4.57,4.57,0,0,0-1.64,3.41,4.52,4.52,0,0,0,.74,2.6,7.82,7.82,0,0,0,2.62,2.18l3.65,2.18a11.62,11.62,0,0,1,4,3.4,7.3,7.3,0,0,1,1.09,4,8.44,8.44,0,0,1-3,6.55,11.51,11.51,0,0,1-7.93,2.67c-1.17,0-2.3,0-3.41-.16a25.33,25.33,0,0,1-3.4-.6"/><path class="cls-2" d="M255.43,207l2.84-.48-2.13,23.66h-3.27l.38-3.79h-.14a10.92,10.92,0,0,1-3.31,3.2,7.32,7.32,0,0,1-3.69,1,4.55,4.55,0,0,1-3.76-1.82q-1.46-1.82-1.45-6.22,0-7.71,3.39-11.83t7.64-4.11a18.15,18.15,0,0,1,1.89.09,12.81,12.81,0,0,1,1.61.29m-2,15.89,1.18-13.15a10,10,0,0,0-1.42-.21c-.53-.05-1-.07-1.56-.07-1.76,0-3.41,1.08-4.94,3.26s-2.3,5.38-2.3,9.61a7.27,7.27,0,0,0,.83,4,2.43,2.43,0,0,0,2,1.16,5.24,5.24,0,0,0,2.86-1.16,15.12,15.12,0,0,0,3.33-3.48"/><path class="cls-2" d="M262.81,230.18l2.08-23,3.36-.43-.33,3.55h.14a17.87,17.87,0,0,1,3.55-2.88,6.54,6.54,0,0,1,3.27-.85,4.28,4.28,0,0,1,3,1,5.28,5.28,0,0,1,1.49,2.86h.09a16.65,16.65,0,0,1,3.72-2.94,7.28,7.28,0,0,1,3.43-.89,4.33,4.33,0,0,1,3.69,1.79q1.32,1.8.95,6l-1.52,15.8h-3.36l1.47-15.28c.19-1.9.06-3.21-.4-3.93a2,2,0,0,0-1.77-1.09,5.53,5.53,0,0,0-2.54.78,20.55,20.55,0,0,0-3.47,2.53l-1.66,17h-3.41l1.47-15.28a7.81,7.81,0,0,0-.28-3.93,1.89,1.89,0,0,0-1.8-1.09,5.36,5.36,0,0,0-2.6.88,24.86,24.86,0,0,0-3.69,2.76l-1.52,16.66Z"/><path class="cls-2" d="M295.88,222q0-7.8,3.13-11.61t6.71-3.81a6.41,6.41,0,0,1,4.45,1.41,5.06,5.06,0,0,1,1.57,3.93,7.76,7.76,0,0,1-3.36,6.48c-2.24,1.68-5.27,2.51-9.09,2.51q0,3.88,1.23,5.23a4.5,4.5,0,0,0,3.5,1.35,11.37,11.37,0,0,0,3.1-.42,16.45,16.45,0,0,0,3-1.23V229a13.24,13.24,0,0,1-3.27,1.28,16.75,16.75,0,0,1-3.78.38,6.87,6.87,0,0,1-5.33-2c-1.24-1.36-1.87-3.53-1.87-6.53m12.35-9.65a2.79,2.79,0,0,0-.75-2.13,3,3,0,0,0-2.13-.71c-1.17,0-2.36.72-3.55,2.15s-2,3.64-2.27,6.6a10.38,10.38,0,0,0,6.43-1.73,5.08,5.08,0,0,0,2.27-4.18"/><path class="cls-2" d="M327.16,230.18l1.46-15.28c.19-1.9.06-3.21-.4-3.93a2.11,2.11,0,0,0-1.87-1.09,6,6,0,0,0-2.67.9,23,23,0,0,0-3.81,2.79l-1.51,16.61H315l2.08-23,3.36-.43-.33,3.55h.14a14.86,14.86,0,0,1,3.74-2.88,7.3,7.3,0,0,1,3.31-.85,4.43,4.43,0,0,1,3.78,1.77c.89,1.18,1.2,3.18.95,6l-1.51,15.81Z"/><path class="cls-2" d="M340.17,230.18,336.57,207h3.6l2.55,20.06h.19l1.09-2.27c.85-1.76,1.74-3.87,2.65-6.31s1.67-4.76,2.27-6.93l-.66-4.55h3.45l2.65,20.07h.19l1.09-2.28a45.88,45.88,0,0,0,3.05-8.23,68,68,0,0,0,1.73-9.56h3.5a59.21,59.21,0,0,1-2.06,9.87,49.79,49.79,0,0,1-3.71,8.78l-2.37,4.49h-4l-2-14.1h-.09a54.31,54.31,0,0,1-1.57,5.2,42.1,42.1,0,0,1-2,4.78l-2,4.12Z"/><path class="cls-2" d="M366.1,222q0-7.8,3.12-11.61t6.72-3.81a6.42,6.42,0,0,1,4.45,1.41A5.06,5.06,0,0,1,382,212a7.74,7.74,0,0,1-3.36,6.48c-2.24,1.68-5.27,2.51-9.08,2.51,0,2.59.4,4.33,1.22,5.23a4.51,4.51,0,0,0,3.51,1.35,11.3,11.3,0,0,0,3.09-.42,16.17,16.17,0,0,0,3-1.23V229a13,13,0,0,1-3.27,1.28,16.75,16.75,0,0,1-3.78.38,6.84,6.84,0,0,1-5.32-2c-1.25-1.36-1.87-3.53-1.87-6.53m12.35-9.65a2.79,2.79,0,0,0-.76-2.13,3,3,0,0,0-2.13-.71c-1.17,0-2.35.72-3.55,2.15s-2,3.64-2.27,6.6a10.36,10.36,0,0,0,6.43-1.73,5.09,5.09,0,0,0,2.28-4.18"/><path class="cls-2" d="M397.37,207l-.43,3.31c-.25,0-.47-.06-.66-.07s-.42,0-.71,0a4.45,4.45,0,0,0-2.79,1.23,13.54,13.54,0,0,0-2.79,3.4l-1.32,15.38h-3.36l1.93-23,3.36-.42-.42,4.35h.19a11.91,11.91,0,0,1,2.81-3.69,4.46,4.46,0,0,1,2.63-.85,4.57,4.57,0,0,1,.83.07,2.27,2.27,0,0,1,.73.26"/><path class="cls-2" d="M402.86,221.8l-.76,8.38h-3.36l3-32.74,3.41-.43L404,209.41h.15a9.6,9.6,0,0,1,2.81-2.08,6.87,6.87,0,0,1,3-.71,5.52,5.52,0,0,1,4,1.46,5.59,5.59,0,0,1,1.51,4.21,7.65,7.65,0,0,1-1.7,4.9,9.2,9.2,0,0,1-4.31,3.05l3.31,5.35c.38.63.86,1.36,1.45,2.18s1.2,1.62,1.87,2.41h-4.17c-.5-.6-1-1.21-1.44-1.82a15.29,15.29,0,0,1-1.16-1.78l-2.93-5.2Zm.24-2.69,1.84-.24a9.2,9.2,0,0,0,5.16-2,5,5,0,0,0,1.84-3.92,3.41,3.41,0,0,0-.75-2.44,2.66,2.66,0,0,0-2-.78,6.68,6.68,0,0,0-2.72.73,8.76,8.76,0,0,0-2.77,2Z"/><path class="cls-2" d="M418.85,222q0-7.8,3.13-11.61t6.71-3.81a6.41,6.41,0,0,1,4.45,1.41A5.06,5.06,0,0,1,434.7,212a7.75,7.75,0,0,1-3.35,6.48c-2.24,1.68-5.27,2.51-9.09,2.51q0,3.88,1.23,5.23a4.48,4.48,0,0,0,3.5,1.35,11.37,11.37,0,0,0,3.1-.42,16.74,16.74,0,0,0,3-1.23V229a13.24,13.24,0,0,1-3.27,1.28,16.78,16.78,0,0,1-3.79.38,6.86,6.86,0,0,1-5.32-2c-1.24-1.36-1.87-3.53-1.87-6.53m12.35-9.65a2.76,2.76,0,0,0-.76-2.13,3,3,0,0,0-2.13-.71c-1.16,0-2.35.72-3.54,2.15s-2,3.64-2.28,6.6a10.39,10.39,0,0,0,6.44-1.73,5.08,5.08,0,0,0,2.27-4.18"/><path class="cls-2" d="M450.13,230.18l1.46-15.28c.19-1.9.06-3.21-.4-3.93a2.11,2.11,0,0,0-1.87-1.09,6,6,0,0,0-2.67.9,23,23,0,0,0-3.81,2.79l-1.51,16.61H438l2.08-23,3.36-.43-.33,3.55h.14a15,15,0,0,1,3.73-2.88,7.37,7.37,0,0,1,3.32-.85,4.43,4.43,0,0,1,3.78,1.77c.89,1.18,1.2,3.18.95,6l-1.52,15.81Z"/>
                  </g>
                </svg>
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
            {
              label: "LinkedIn",
              href: "https://nl.linkedin.com/company/developer-overheid-nl",
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
              label: "Toegankelijkheid",
              href: "/toegankelijkheid",
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
      theme: docusaurusTheme, // better contrast
      additionalLanguages: ["turtle"],
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
