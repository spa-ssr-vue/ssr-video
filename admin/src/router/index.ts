import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import ResourceList from "@/components/ResourceList.vue";


Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/:resource/list', name: 'resource-list', component: ResourceList, props: true },
    ]
  },
];

const router: VueRouter = new VueRouter({
  routes
});

export default router;
