<template>
  <v-container class="registration-form" fluid>
    <v-row justify="center" align="center" class="form-row">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-card-title class="text-center title">
            <h2>Регистрация</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit="submitForm">
              <v-text-field
                v-model="email"
                label="Почта"
                placeholder="example@gmail.com"
                :rules="[requiredValueRule]"
                name="email"
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Пароль"
                :rules="[requiredValueRule]"
                name="new-password"
                required
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Повторите пароль"
                :rules="[requiredValueRule]"
                name="new-password-confirm"
                required
                type="password"
              ></v-text-field>
              <v-select
                v-model="group"
                :items="groups"
                :rules="[requiredValueRule]"
                name="group"
                item-title="text"
                item-value="value"
                label="Группа"
                required
                :loading="groupsLoading"
              ></v-select>
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
                :loading="loading"
                color="primary"
                class="mr-4"
                >Создать аккаунт</v-btn
              >
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="text-center">
              Уже есть аккаунт?
              <router-link to="/login">Войти</router-link>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API } from "@/api/client";
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      group: "",
      error: "",
      groups: [],
      loading: false,
      groupsLoading: false,
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
    async getGroups() {
      try {
        this.groupsLoading = true;
        const response = await API.get("/misc/groups");

        this.groups = response.data.groups;
      } catch (error) {
        this.error = "Ошибка при загрузке групп, перезагрузите страницу";
      }

      this.groupsLoading = false;
    },

    async submitForm(event) {
      event.preventDefault();

      const validation = await this.$refs.form.validate();

      if (validation.valid) {
        if (this.password !== this.confirmPassword) {
          this.error = "Пароли не совпадают";
          return;
        }

        this.loading = true;
        try {
          const response = await API.post("/auth/register", {
            email: this.email,
            password: this.password,
            group: this.group,
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
  mounted() {
    this.getGroups();
  },
};
</script>

<style scoped>
.registration-form {
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
