import { getGroupsList, getTimetables } from './parser/parser.js';
import { connectToDb } from './db/db.js'
import {Timetable} from './db/models/timetable.js'

async function generateCollegeTimetables() {
  const collegeFaculty = 20;
  const groups = await getGroupsList(collegeFaculty);

  const timetables = await Promise.all(groups.map((group) => {
    return new Promise((resolve) => {
      getTimetables(collegeFaculty, group.value).then((timetables) => {
        resolve({
          group: group.value,
          oddTimetable: timetables.odd,
          evenTimetable: timetables.even,
        })
      });
    });
  }));

  return timetables;
}

(async () => {
  await connectToDb();

  // const timetables = await generateCollegeTimetables();

  // const model = new Timetable({
  //   timetables: timetables,
  //   timestamp: new Date().toISOString(),
  // });

  // await model.save();
})()


