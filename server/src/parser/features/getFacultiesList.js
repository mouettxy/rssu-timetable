import cheerio from 'cheerio';
import { EXCLUDE_SELECT_TEXT } from '../config.js';
import { getTimetablePage } from './getTimetablePage.js';

export async function getFacultiesList() {
  const page = await getTimetablePage();

  const $ = cheerio.load(page);

  return $('select#faculty > option')
    .map((_, e) => {
      const element = $(e);

      return {
        text: element.text(),
        value: parseInt(element.val()),
      };
    })
    .get()
    .filter((faculty) => {
      return faculty.text !== EXCLUDE_SELECT_TEXT;
    })
    .sort((a, b) => a.value - b.value);
}
