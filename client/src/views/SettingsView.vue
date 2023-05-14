<template>
  <BaseView>
    <v-card>
      <v-card-title
        >Привязка аккаунта Telegram для получения уведомлений</v-card-title
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
      v-if="userStore.user.telegramId === -1"
      type="warning"
      border="start"
      variant="tonal"
      title="Текущий статус подключения Telegram"
      text="Уедомления не подключены"
    ></v-alert>
    <v-alert
      v-else
      type="success"
      border="start"
      variant="tonal"
      title="Текущий статус подключения Telegram"
      text="Уедомления подключены"
    ></v-alert>
  </BaseView>
</template>

<script>
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/user";
import BaseView from "@/components/BaseView.vue";

export default {
  components: {
    BaseView,
  },
  computed: {
    ...mapStores(useUserStore),

    secureHash() {
      return this.userStore.user.telegramAuthKey;
    },
  },
};
</script>
