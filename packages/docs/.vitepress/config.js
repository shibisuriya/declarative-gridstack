import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/declarative-gridstack/",
  title: "declarative-gridstack",
  description: "Use gridstack.js with ease.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Core Concepts", link: "/core-concepts/gridstack-containers" },
      {
        text: "Frameworks",
        items: [{ text: "React", link: "frameworks/react/" }],
      },
    ],

    sidebar: {
      "frameworks/react/": [
        // {
        //   text: "How-to",
        //   items: [
        //     { text: "Simple Grid", link: "frameworks/react/how-to/simple" },
        //     { text: "Nested Grid", link: "frameworks/react/how-to/nested" },
        //     {
        //       text: "Drag and Drop",
        //       link: "frameworks/react/how-to/drag-and-drop",
        //     },
        //   ],
        // },
      ],
      "core-concepts": [
        {
          text: "Core Concepts",
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
