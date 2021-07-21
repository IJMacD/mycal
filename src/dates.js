

/**
 *
 * @param {Date} date1
 * @param {Date} date2
 */
export function isSameDay (date1, date2) {
  return date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate();
}

export function makeWeeks(d, count) {
  const weeks = [];

  for (let i = 0; i < count; i++) {
    const week = [];

    for (let j = 0; j < 7; j++) {
      week.push(new Date(d));

      d.setDate(d.getDate() + 1);
    }

    weeks.push(week);
  }
  return weeks;
}

export function startOfMonth(date = new Date()) {
  const d = new Date(date.getUTCFullYear(), date.getUTCMonth());
  modifyToUTC(d);
  return d;
}

export function startOfWeek(date = new Date()) {
  const d = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - date.getUTCDay() + 1);
  modifyToUTC(d);
  return d;
}

export function startOfDay(date = new Date()) {
  const d = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  modifyToUTC(d);
  return d;
}

/**
 * ISO Week Number
 * Algorithm from https://www.epochconverter.com/weeknumbers
 */
export function weekNumber(date = new Date()) {
  const target = new Date(date);
  const dayNr = (date.getUTCDay() + 6) % 7;

  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = +target;

  target.setMonth(0, 1);

  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }

  return 1 + Math.ceil((firstThursday - +target) / 604800000);
}

export function yearDay (date = new Date()) {
  const first_jan = new Date(date.getUTCFullYear(), 0, 1);
  modifyToUTC(first_jan);

  return julian(date) - julian(first_jan) + 1;
}

export const ordinalDate = yearDay;

/**
 * Algorithm from https://quasar.as.utexas.edu/BillInfo/JulianDatesG.html
 */
export function julian(date = new Date()) {
  let y = date.getUTCFullYear();
  let m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();

  if (m < 3) {
    y--;
    m += 12;
  }

  const a = (y / 100) | 0;
  const b = (a / 4) | 0;
  const c = 2 - a + b;
  const e = (365.25 * (y + 4716)) | 0;
  const f = (30.6001 * (m + 1)) | 0;

  const h = date.getUTCHours();
  const i = date.getUTCMinutes();
  const s = date.getUTCSeconds();
  const ms = date.getUTCMilliseconds();

  const g = (h + (i + (s + (ms / 1000)) / 60 / 60)) / 24;

  return c + d + e + f - 1524 - 0.5 + g;
}

/**
 * Assume that times have been set in local time but they were intended to be UTC
 * @param {Date} date
 */
function modifyToUTC (date) {
  date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}
