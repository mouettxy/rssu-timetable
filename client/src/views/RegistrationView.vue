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
                required
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Пароль"
                required
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Повторите пароль"
                required
                type="password"
              ></v-text-field>
              <v-select
                v-model="country"
                :items="countries"
                label="Группа"
                required
              ></v-select>
              <v-btn type="submit" color="primary" class="mr-4"
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
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      countries: ["Country 1", "Country 2", "Country 3"], // Replace with your own list of countries
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        // Form validation successful, submit the form
        // Here, you can perform additional logic such as making an API request to register the user
        // For brevity, I'm just printing the form data to the console
        console.log({
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          country: this.country,
        });
      }
    },
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
