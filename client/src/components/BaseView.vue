<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg">
            <v-list rounded="lg">
              <v-list-item link to="/">
                <v-list-item-title> Главная </v-list-item-title>
              </v-list-item>
              <v-list-item link to="/settings">
                <v-list-item-title> Настройки </v-list-item-title>
              </v-list-item>
              <v-list-item link to="/download">
                <v-list-item-title> Скачать </v-list-item-title>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item link color="grey-lighten-4" @click="onLogOut">
                <v-list-item-title> Выйти </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet
            min-height="calc(100vh - 32px)"
            class="sheet pa-4"
            rounded="lg"
          >
            <slot />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    onLogOut() {
      this.userStore.logOut();

      this.$router.push("/login");
    },
  },
};
</script>
