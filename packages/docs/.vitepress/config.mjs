import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "./src/docs/",
  title: "Declarative Gridstack docs",
  description: "Docs for Declarative Gridstack.",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Concepts", link: "/concepts/gridstack-containers" },
      { text: "Guides", link: "/guides/react/" },
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
              items: [{ text: "Subgrids", link: "/api/react/gridstack-item" }],
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
          items: [{ text: "Containers", link: "/concepts/containers" }],
        },
      ],
      "/guides/": [
        {
          text: "Guides",
          items: [
            {
              text: "React",
              collapsed: false,
              items: [{ text: "Subgrids", link: "/api/react/gridstack-item" }],
            },
            {
              text: "Vue",
              collapsed: true,
              items: [{ text: "Subgrids", link: "subgrids" }],
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
