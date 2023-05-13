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
                placeholder="example@gmail.com"
                required
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Пароль"
                required
                type="password"
              ></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4"
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
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        console.log({
          email: this.email,
          password: this.password,
        });
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
