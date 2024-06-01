import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "./src/docs/",
  title: "Declarative Gridstack",
  description: "Docs for Declarative Gridstack.",
  logo: "static/images/logo.jpeg",
  cleanUrls: true,
  base: "/declarative-gridstack/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Showcase", link: "/showcase/ubuntu-desktop" },
      { text: "Concepts", link: "/concepts/gridstack-grids" },
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
              text: "Gridstack Grids",
              link: "/concepts/gridstack-grids",
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
                {
                  text: "Using CRA (Create React App)",
                  link: "/guides/react/cra",
                },
                { text: "Adding items", link: "/guides/react/adding-items" },
                {
                  text: "Removing items",
                  link: "/guides/react/removing-items",
                },
                {
                  text: "Simple",
                  link: "/guides/react/simple",
                },
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
                  text: "Using APIs",
                  link: "/guides/react/using-apis",
                },
              ],
            },
            {
              text: "Vue",
              collapsed: true,
              items: [
                {
                  text: "Nested",
                  link: "/guides/vue/nested",
                },
                {
                  text: "Using APIs",
                  link: "/guides/vue/using-apis",
                },
              ],
            },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/shibisuriya/declarative-gridstack",
      },
    ],
  },
});
