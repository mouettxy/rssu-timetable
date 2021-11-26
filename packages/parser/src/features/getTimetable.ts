import cheerio from 'cheerio';
import { Timetable, Timetables } from '../types';
import { getTimetablePage } from './getTimetablePage';

function parseLectureSubject(subject: string) {
  const daysRegex = /(\d{2}\.\d{2}\.\d{2})/gm;
  const typeRegex = /(лекция)|(практическое занятие)|(лабораторная работа)/gi;
  const charsRegex = /;|\(|\)|/gm;

  const days = subject.match(daysRegex) || [];
  const type = subject.match(typeRegex) ? subject.match(typeRegex)[0] : '';
  const text = subject
    .replace(daysRegex, '')
    .replace(typeRegex, '')
    .replace(charsRegex, '')
    .trim();

  return { days, type, text };
}

export async function getTimetables(faculty: number, group: string) {
  const page = await getTimetablePage(faculty, group);
  const $ = cheerio.load(page);

  function parseDayLectures(rows: cheerio.Cheerio) {
    if (rows.length === 1 && rows.find('td').text() === 'Занятий нет') {
      return [];
    }

    return rows
      .map((_, row) => {
        const cols = $(row).find('td');

        const time = {
          from: $(cols[0]).find('.time-start').text(),
          to: $(cols[0]).find('.time-end').text(),
        };

        const audience = $(cols[1]).text().replace('\n', '');
        const subject = parseLectureSubject($(cols[2]).text());

        const teacherPosition = $(cols[3]).find('span').text().trim();
        const teacherCredentials = $(cols[3])
          .text()
          .replace(teacherPosition, '')
          .trim();
        const teacher = {
          credentials: teacherCredentials,
          position: teacherPosition,
        };

        return {
          time,
          audience,
          subject,
          teacher,
        };
      })
      .get();
  }

  function parseTimetable(timetable: cheerio.Cheerio): Timetable {
    const result = [];
    const days = $(timetable).find('.day');

    days.each((_, e) => {
      const dayOfWeek = $(e).find('tr').first().text();
      const rows = $(e).children('tr').slice(1);

      result.push({
        dayOfWeek,
        lectures: parseDayLectures(rows),
      });
    });

    return result;
  }

  const timetables: Partial<Timetables> = {
    odd: null,
    even: null,
  };

  $('table.timetable').each((_, e) => {
    const timetable = $(e);

    const heading = $(timetable).find('.week-parity span').text();

    if (heading === 'Четная неделя') {
      timetables.even = parseTimetable(timetable);
    } else {
      timetables.odd = parseTimetable(timetable);
    }
  });

  return timetables;
}
