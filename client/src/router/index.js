import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegistrationView from "../views/RegistrationView.vue";
import LoginView from "../views/LoginView.vue";
import SettingsView from "../views/SettingsView.vue";
import DownloadView from "../views/DownloadView.vue";
import { useUserStore } from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/registration",
      name: "registration",
      component: RegistrationView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
    {
      path: "/download",
      name: "download",
      component: DownloadView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = !["/login", "/registration"].includes(to.path);
  const userStore = useUserStore();

  if (requiresAuth && !userStore.isAuth) {
    next("/login");
  } else {
    next();
  }
});

export default router;
