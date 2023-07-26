import Vue from "vue";
import VueRouter from "vue-router";
import exampleRoutes from "./exampleRoutes.js";

Vue.use(VueRouter);

const routes = [
  ...exampleRoutes,
  {
    path: "/dev",
    component: () => import("../examples/Dev.vue"),
  },
];

const router = new VueRouter({
  mode: "history", // Set mode to 'history'
  routes,
});

export default router;
