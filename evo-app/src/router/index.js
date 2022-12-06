import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/home", name: "home", component: HomeView,
  },

  {
    path: "/about", name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/events", name: "events",
    component: () =>
      import(/* webpackChunkName: "event" */ "../views/EventsView.vue")
  },
  {
    path: "/kitchen", name: "kitchen",
    component: () =>
      import(/* webpackChunkName: "kitchen" */ "../views/KitchenView.vue")
  },
  {
    path: "/profile", name: "profile",
    component: () =>
      import(/* webpackChunkName: "kitchen" */ "../views/profilePage.vue")
  },
  {
    path: "/SignUp", name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "SignUp" */ "../views/SignUp.vue")
  },
  {
    path: "/", name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LogIn.vue")
  },
  {
    path: '/:pathMatch(.*)*',
    component: () =>
      import(/* webpackChunkName: "errorPage" */ "../views/errorPage.vue")
  },
  {
    path: "/profile", name: "profilePage",
    component: () =>
      import(/* webpackChunkName: "logOut" */ "../views/profilePage.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
