import Vue from "vue";
import VueRouter from "vue-router";
import PacksScreen from "../views/PacksScreen.vue";
import Login from "../views/Login.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "PacksScreen",
    component: PacksScreen,
  },
  {
    path: "/items",
    name: "ItemsScreen",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ItemsScreen.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
