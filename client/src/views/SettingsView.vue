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

              <v-list-item link color="grey-lighten-4">
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
            <v-card>
              <v-card-title
                >Привязка аккаунта Telegram для получения
                уведомлений</v-card-title
              >
              <v-card-text>
                <p>
                  Откройте приложение Telegram и найдите бота
                  <strong
                    ><a href="https://t.me/rssu_timetable_bot" target="_blank"
                      >@rssu_timetable_bot</a
                    ></strong
                  >.
                </p>
                <br />
                <p>Отправьте боту следующую команду:</p>
                <p>
                  <code>/start {{ secureHash }}</code>
                </p>
                <br />
                <p>Дождитесь подтверждающего уведомления</p>
              </v-card-text>
            </v-card>
            <br />
            <v-alert
              type="warning"
              border="start"
              variant="tonal"
              title="Текущий статус подключения Telegram"
              text="Уедомления не подключены"
            ></v-alert>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      secureHash: "",
    };
  },

  mounted() {
    const userEmail = "user@example.com";
    const userGroup = "userGroup";

    this.secureHash = btoa(`${userEmail}:${userGroup}`);
  },
};
</script>
