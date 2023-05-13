<script>
import jwt_decode from "jwt-decode";
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  computed: {
    ...mapStores(useUserStore),
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwt_decode(token);

    if (decoded.email) {
      this.userStore.setUserByToken(token);
    }
  },
};
</script>

<template>
  <v-app id="inspire">
    <RouterView />
  </v-app>
</template>
