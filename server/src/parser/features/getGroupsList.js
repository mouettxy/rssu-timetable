import cheerio from 'cheerio';
import { getTimetablePage } from './getTimetablePage.js';

export async function getGroupsList(faculty) {
  const page = await getTimetablePage(faculty);

  const $ = cheerio.load(page);

  return $('select#group > option')
    .map((_, e) => {
      const element = $(e);

      return {
        text: element.text(),
        value: element.val(),
      };
    })
    .get();
}
