import Holidays from 'date-holidays';

import { DateTime } from 'luxon';

const howManyHours = (
  futureDate: Date = new Date(),
  past: Date = pastDate(6)
) => {
  const diffInMilliSeconds =
    Math.abs(futureDate.getTime() - past.getTime()) / 1000;
  const hours = Math.floor(diffInMilliSeconds / 3600);

  const weekendHours = (d1: Date, d0: Date) => {
    const ndays =
      1 + Math.round((d1.getTime() - d0.getTime()) / (24 * 3600 * 1000));
    const nsaturdays = Math.floor((d0.getDay() + ndays) / 7);
    return (
      (2 * nsaturdays +
        (d0.getDay() == 0 ? 1 : 0) -
        (d1.getDay() == 6 ? 1 : 0)) *
      24
    );
  };
  return (
    hours - weekendHours(futureDate, past) - holidayHours_(futureDate, past)
  );
};

const getHolidaysOldestFirst = (holidays, y1: number, y2: number) =>
  y1 === y2
    ? holidays.concat(new Holidays('US').getHolidays(y1))
    : 
        getHolidaysOldestFirst(
          holidays.concat(new Holidays('US').getHolidays(y2++)),
          y1,
          y2,
          
        
      );

/*
      const getHolidaysOldestFirst = (holidays, y1: number, y2: number) =>
  y1 === y2
    ? holidays.concat(y1)
    : getHolidaysOldestFirst(
          holidays.concat(y2++),
          y1,
          y2,
          
          
        
      );
*/
let rec = n => n == 1 ? n : n + rec(n - 1);
console.log(rec(10))

const getMultiYearHolidays = (y1: number, y2: number) =>
  y1 > y2
    ? getHolidaysOldestFirst([], y1, y2)
    : getHolidaysOldestFirst([], y2, y1);

console.log(getMultiYearHolidays(2014, 2012).filter(v=>v.name === 'Easter Sunday'))
/**
 * Get's the hours of holidays between two dates (so if july 4 is betweeen, return 24, if july 4 and labor date, return 48)
 * @param {Date} futureDate
 * @param {Date} past
 * @return {number} hours of holidays between two dates
 */
const holidayHours_ = (d1: Date = pastDate(-120), d2: Date = new Date()) => {
  //onst v = new Holidays('US')

  const holidays =
    d1.getFullYear() === d2.getFullYear()
      ? new Holidays('US').getHolidays(d1.getFullYear())
      : getMultiYearHolidays(d1.getFullYear(), d2.getFullYear());

  const v = new Holidays('US').getHolidays(d1.getFullYear());

  return 100;
  //const calendar = CalendarApp.getCalendarById(
  //  'en.usa#holiday@group.v.calendar.google.com');
  //return calendar.getEvents(past, futureDate).filter(v=>v.getDescription() == 'Public holiday').length * 24
};

/**
 * Utility to create past dates
 * @param {number} daysAgo
 * @return {Date}
 *
 */
const pastDate = (daysAgo = 10) =>
  ((pastDate) => new Date(pastDate.setDate(pastDate.getDate() - daysAgo)))(
    new Date()
  );

console.log(holidayHours_());
