import got from 'got';
import { FACULTY_PARAM_NAME, TIMETABLE_URL, GROUP_PARAM_NAME } from '../config.js';

export async function getTimetablePage(faculty, group) {
  const response = await got(TIMETABLE_URL, {
    searchParams: {
      [FACULTY_PARAM_NAME]: faculty,
      [GROUP_PARAM_NAME]: group,
    },
  });

  return response.body;
}
