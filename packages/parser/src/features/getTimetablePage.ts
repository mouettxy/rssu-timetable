import got from 'got';
import { FACULTY_PARAM_NAME, TIMETABLE_URL, GROUP_PARAM_NAME } from '../config';

export async function getTimetablePage(faculty?: number, group?: string) {
  const response = await got(TIMETABLE_URL, {
    searchParams: {
      [FACULTY_PARAM_NAME]: faculty,
      [GROUP_PARAM_NAME]: group,
    },
  });

  return response.body;
}
