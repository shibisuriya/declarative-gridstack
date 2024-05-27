import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/declarative-gridstack/",
  title: "declarative-gridstack",
  description: "Use gridstack.js with ease.",
  themeConfig: {
    search: {
      provider: "local",
    },
    logo: "/logo.jpeg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Core Concepts", link: "/core-concepts/gridstack-containers" },
      {
        text: "Guides",
        items: [
          { text: "React", link: "/guides/react" },
          { text: "Vue", link: "/guides/vue" },
        ],
      },
    ],

    sidebar: {
      "/guides/": {
        base: "/guides/",
        items: [
          {
            text: "CRA (create-react-app)",
            link: "frameworks/react/how-to/cra",
          },
          { text: "Simple Grid", link: "frameworks/react/how-to/simple" },
          { text: "Nested Grid", link: "frameworks/react/how-to/nested" },
          {
            text: "Drag and Drop",
            link: "frameworks/react/how-to/drag-and-drop",
          },
          {
            text: "Drag and drop into trash",
            link: "frameworks/react/how-to/drag-and-drop-into-trash.md",
          },
          {
            text: "Adding items",
            link: "frameworks/react/how-to/adding-items.md",
          },
          {
            text: "Using APIs",
            link: "frameworks/react/how-to/using-apis.md",
          },
          {
            text: "Removing items",
            link: "frameworks/react/how-to/removing-items.md",
          },
        ],
      },
      "/core-concepts/": {
        base: "/core-concepts/",
        items: [
          {
            text: "Containers",
            link: "/core-concepts/gridstack-containers",
          },
          {
            text: "Items",
            link: "/core-concepts/gridstack-items",
          },
          {
            text: "Subgrids",
            link: "/core-concepts/gridstack-subgrids",
          },
          {
            text: "Droppables",
            link: "/core-concepts/gridstack-droppables",
          },
          {
            text: "How it works?",
            link: "/core-concepts/how-it-works",
          },
          {
            text: "One way binding",
            link: "/core-concepts/one-way-binding",
          },
          {
            text: "Advantages",
            link: "/core-concepts/advantages",
          },
        ],
      },
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/shibisuriya/declarative-gridstack",
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © ${new Date().getFullYear()} Shibi Suriya`,
    },
  },
});
