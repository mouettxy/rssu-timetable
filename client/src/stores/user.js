import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    isAuth: false,
    user: null,
  }),

  actions: {
    setUserByToken(token) {
      localStorage.setItem("token", token);

      try {
        const decodedToken = jwt_decode(token);

        this.user = decodedToken;
        this.isAuth = true;
      } catch (error) {
        this.user = null;
        this.isAuth = false;
      }
    },
  },
});
