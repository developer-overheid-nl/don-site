import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // gettingStartedSidebar: [{type: 'autogenerated', dirName: '.'}],
  overview: [
    {
      type: "category",
      label: "Kennisbank",
      link: { type: "doc", id: "index" },
      items: [
        {
          type: "doc",
          id: "leidraad/index",
          label: "Leidraad",
        },
        {
          type: "doc",
          id: "apis/index",
          label: "API's",
        },
        // "data/index",
        {
          type: "doc",
          id: "frontend/index",
          label: "Front-end",
        },
        {
          type: "doc",
          id: "infra/index",
          label: "Infrastructuur",
        },
      ],
    },
  ],
  leidraad: [
    {
      type: "autogenerated",
      dirName: "leidraad",
    },
  ],
  apis: [
    {
      type: "autogenerated",
      dirName: "apis",
    },
  ],
  data: [
    {
      type: "autogenerated",
      dirName: "data",
    },
  ],
  frontend: [
    {
      type: "autogenerated",
      dirName: "frontend",
    },
  ],
  infra: [
    {
      type: "autogenerated",
      dirName: "infra",
    },
  ],
};

export default sidebars;
