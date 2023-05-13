<template>
  <v-container class="login-page" fluid>
    <v-row justify="center" align="center" class="form-row">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-card-title class="text-center title">
            <h2>Авторизация</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit="submitForm">
              <v-text-field
                v-model="email"
                label="Почта"
                :rules="[requiredValueRule]"
                placeholder="example@gmail.com"
                required
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="[requiredValueRule]"
                label="Пароль"
                required
                type="password"
              ></v-text-field>
              <v-alert
                v-if="error"
                type="error"
                density="compact"
                border="start"
                variant="tonal"
                class="mb-6"
                :text="error"
              ></v-alert>
              <v-btn
                type="submit"
                color="primary"
                :loading="loading"
                class="mr-4"
                >Войти в аккаунт</v-btn
              >
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="text-center">
              Нет аккаунта?
              <router-link to="/registration">Зарегистрироваться</router-link>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API } from "@/api/client";
import { useUserStore } from "@/stores/user";
import { mapStores } from "pinia";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      error: "",
      requiredValueRule: (value) => {
        if (value) return true;

        return "Заполните поле";
      },
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async submitForm(event) {
      event.preventDefault();

      const validation = await this.$refs.form.validate();

      if (validation.valid) {
        this.loading = true;
        try {
          const response = await API.post("/auth/authenticate", {
            email: this.email,
            password: this.password,
          });

          this.error = "";

          this.userStore.setUserByToken(response.data.token);

          this.$router.push("/");
        } catch (error) {
          this.error = error.response.data.message;
        }
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-row {
  margin-bottom: 2rem;
}

.title {
  padding: 20px;
}
</style>
