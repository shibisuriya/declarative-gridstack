import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/declarative-gridstack/",
  title: "declarative-gridstack",
  description: "Use gridstack.js with ease.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "Why?",
        link: "/why-declarative-gridstack",
      },
      { text: "Core Concepts", link: "/core-concepts" },
      {
        text: "Frameworks",
        items: [{ text: "React", link: "frameworks/react/" }],
      },
    ],

    sidebar: {
      "frameworks/react/": [
        {
          text: "How-to",
          items: [
            { text: "Simple Grid", link: "frameworks/react/how-to/simple" },
            { text: "Nested Grid", link: "frameworks/react/how-to/nested" },
            {
              text: "Drag and Drop",
              link: "frameworks/react/how-to/drag-and-drop",
            },
          ],
        },
      ],
      "core-concepts": [
        {
          text: "Section Title A",
          items: [
            { text: "Item A", link: "/item-a" },
            { text: "Item B", link: "/item-b" },
          ],
        },
        {
          text: "Section Title A",
          items: [
            { text: "Item A", link: "/item-a" },
            { text: "Item B", link: "/item-b" },
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
