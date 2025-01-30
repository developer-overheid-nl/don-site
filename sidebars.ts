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
  apis: [
    {
      type: "autogenerated",
      dirName: "apis",
    },
  ],
  openSource: [
    {
      type: "autogenerated",
      dirName: "open-source",
    },
  ],
  security: [
    {
      type: "autogenerated",
      dirName: "security",
    },
  ],
  "front-end": [
    {
      type: "autogenerated",
      dirName: "front-end",
    },
  ],
  richtlijnen: [
    {
      type: "autogenerated",
      dirName: "richtlijnen",
    },
  ],
  overig: [
    {
      type: "autogenerated",
      dirName: "overig",
    },
  ],
};

export default sidebars;
