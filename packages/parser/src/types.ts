export type Lecture = {
  time: { from: string; to: string };
  audience: string;
  subject: {
    days: string[];
    type: string;
    text: string;
  };
  teacher: {
    credentials: string;
    position: string;
  };
};

export type Timetable = { dayOfWeek: string; lectures: Lecture[] }[];

export type Timetables = {
  odd: Timetable;
  even: Timetable;
};
