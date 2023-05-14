<template>
  <BaseView>
    <Qalendar :config="config" :events="events" />
  </BaseView>
</template>

<script>
import { Qalendar } from "qalendar";
import timetablesJson from "../timetables.json";
import { nanoid } from "nanoid";
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/user";
import BaseView from "@/components/BaseView.vue";

export default {
  components: {
    Qalendar,
    BaseView,
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

      events: [],
    };
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    generateEvents() {
      const timetables = timetablesJson.timetables;

      const currentGroup = this.userStore.user.group;

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
