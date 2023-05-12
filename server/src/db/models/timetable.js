import mongoose from "mongoose";

const oneTimetableSchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
  },
  lectures: [
    {
      time: {
        from: {
          type: String,
        },
        to: {
          type: String,
        },
      },
      audience: {
        type: String,
      },
      subject: {
        days: {
          type: Array,
        },
        type: {
          type: String,
        },
        text: {
          type: String,
        },
      },
      teacher: {
        credentials: {
          type: String,
        },
        position: {
          type: String,
        },
      },
    },
  ],
});

const timetableSchema = new mongoose.Schema({
  group: {
    type: String,
  },
  oddTimetable: [oneTimetableSchema],
  evenTimetable: [oneTimetableSchema],
});

const timetableDumpSchema = new mongoose.Schema({
  timetables: [timetableSchema],
  timestamp: {
    type: String,
  }
})

export const Timetable = mongoose.model("Timetable", timetableDumpSchema);
