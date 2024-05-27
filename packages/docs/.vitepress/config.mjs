import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "./src/docs/",
  title: "Declarative Gridstack docs",
  description: "Docs for Declarative Gridstack.",
  logo: "static/images/logo.jpeg",
  cleanUrls: true,
  base: "/declarative-gridstack/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Concepts", link: "/concepts/gridstack-containers" },
      { text: "Guides", link: "/guides/react/simple" },
      { text: "API", link: "/api/react/gridstack-items" },
    ],
    sidebar: {
      "/api/": [
        {
          text: "API",
          items: [
            {
              text: "React",
              collapsed: false,
              items: [
                {
                  text: "Gridstack containers",
                  link: "/api/react/gridstack-containers.md",
                },
                {
                  text: "Gridstack Items",
                  link: "/api/react/gridstack-items.md",
                },
              ],
            },
            {
              text: "Vue",
              collapsed: true,
              items: [{ text: "Subgrids", link: "subgrids" }],
            },
          ],
        },
      ],
      "/concepts/": [
        {
          text: "Concepts",
          items: [
            {
              text: "Gridstack Containers",
              link: "/concepts/gridstack-containers",
            },
            {
              text: "Gridstack Items",
              link: "/concepts/gridstack-items",
            },
            {
              text: "Gridstack Subgrids",
              link: "/concepts/gridstack-subgrids",
            },
            {
              text: "Gridstack Droppables",
              link: "/concepts/gridstack-droppables",
            },
            {
              text: "One-way binding",
              link: "/concepts/one-way-binding",
            },
            {
              text: "Advantages",
              link: "/concepts/advantages",
            },
            {
              text: "How it works?",
              link: "/concepts/how-it-works",
            },
          ],
        },
      ],
      "/guides/": [
        {
          text: "Guides",
          items: [
            {
              text: "React",
              collapsed: false,
              items: [
                { text: "Adding items", link: "/guides/react/adding-items/" },
                { text: "CRA (create-react-app)", link: "/guides/react/cra/" },
                {
                  text: "Drag and drop into trash",
                  link: "/guides/react/drag-and-drop-into-trash",
                },
                {
                  text: "drag and drop",
                  link: "/guides/react/drag-and-drop",
                },
                {
                  text: "Nested",
                  link: "/guides/react/nested",
                },
                {
                  text: "Removing items",
                  link: "/guides/react/removing-items",
                },
                {
                  text: "Simple",
                  link: "/guides/react/simple",
                },
                {
                  text: "Using APIs",
                  link: "/guides/react/using-apis",
                },
              ],
            },
            {
              text: "Vue",
              collapsed: true,
              items: [],
            },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
