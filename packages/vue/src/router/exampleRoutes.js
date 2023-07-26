export default [
  {
    path: "/examples/simple",
    name: "home",
    component: () => import("../examples/Simple.vue"),
  },
  {
    path: "/examples/nested",
    name: "about",
    component: () => import("../examples/Nested.vue"),
  },
  {
    path: "/examples/state-syncing",
    component: () => import("../examples/StateSyncing.vue"),
  },
  {
    path: "/examples/drag-and-drop",
    component: () => import("../examples/DragAndDrop.vue"),
  },
  {
    path: "/examples/update-dimensions",
    component: () => import("../examples/UpdateDimension.vue"),
  },
  {
    path: "/examples/columns",
    component: () => import("../examples/ColumnsExample.vue"),
  },
  {
    path: "/examples/min-and-max",
    component: () => import("../examples/MinAndMax.vue"),
  },
];
