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
          <v-sheet min-height="calc(100vh - 32px)" class="sheet" rounded="lg">
            <Qalendar :config="config" :events="events" />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { Qalendar } from "qalendar";
import timetablesJson from "../timetables.json";
import { nanoid } from "nanoid";

export default {
  components: {
    Qalendar,
  },

  data() {
    return {
      config: {
        week: {
          startsOn: "monday",
          nDays: 7,
          scrollToHour: 5,
        },
        locale: "ru-RU",
        defaultMode: "week",
        showCurrentTime: true,
        dayBoundaries: {
          start: 6,
          end: 20,
        },
      },

      events: [
        {
          title: "Advanced algebra",
          with: "Chandler Bing",
          time: { start: "2023-05-16 12:05", end: "2022-05-16 13:35" },
          color: "yellow",
          isEditable: true,
          id: "753944708f0f",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
        },
        {
          title: "Ralph on holiday",
          with: "Rachel Greene",
          time: { start: "2022-05-10", end: "2022-05-22" },
          color: "green",
          isEditable: true,
          id: "5602b6f589fc",
        },
      ],
    };
  },

  methods: {
    generateEvents() {
      const timetables = timetablesJson.timetables;

      const currentGroup = "БД-К-0-Д-2021-1";

      const currentTimetable = timetables.find(
        (timetable) => timetable.group === currentGroup
      );

      const timetable = currentTimetable.oddTimetable;
      const timetableEven = currentTimetable.eventTimetable;

      const daysMapping = {
        Понедельник: 1,
        Вторник: 2,
        Среда: 3,
        Четверг: 4,
        Пятница: 5,
        Суббота: 6,
        Воскресенье: 0,
      };

      function generateEvents(start, end) {
        const events = [];
        let currentDate = new Date(start);
        const endDate = new Date(end);

        while (currentDate <= endDate) {
          const weekNumber = Math.floor(
            (currentDate - start) / (7 * 24 * 60 * 60 * 1000)
          );
          const isEvenWeek = weekNumber % 2 === 0;

          const currentTimetable = isEvenWeek ? timetableEven : timetable;
          const dayOfWeek = currentDate.getDay();
          const dayTimetable = currentTimetable.find(
            (day) => daysMapping[day.dayOfWeek] === dayOfWeek
          );

          if (dayTimetable) {
            dayTimetable.lectures.forEach((lecture) => {
              const startTime = new Date(currentDate);
              const [startHours, startMinutes] = lecture.time.from.split(":");
              startTime.setHours(startHours, startMinutes);

              const endTime = new Date(currentDate);
              const [endHours, endMinutes] = lecture.time.to.split(":");
              endTime.setHours(endHours, endMinutes);

              events.push({
                ...lecture,
                time: {
                  start: startTime.toISOString(),
                  end: endTime.toISOString(),
                },
              });
            });
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }

        return events;
      }

      const events = generateEvents(
        new Date("2023-01-01"),
        new Date("2023-12-31")
      ).map((event) => {
        return {
          title: `${event.subject.text} (${event.subject.type})`,
          id: nanoid(),
          color: "blue",
          description: `Преподаватель: ${
            event.teacher.credentials
          }. <br> Аудитория: ${event.audience.trim()}.`,
          time: {
            start: this.formatDate(event.time.start),
            end: this.formatDate(event.time.end),
          },
        };
      });

      this.events = events;
      console.log(events);
      console.log(currentTimetable);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear().toString().slice(-2);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `20${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },

  mounted() {
    this.generateEvents();
  },
};
</script>

<style>
@import "qalendar/dist/style.css";
</style>
