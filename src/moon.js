import { isSameDay, julian } from "./dates";
import { phase } from "./moon_py";
import { calcMoonPhase } from "./stellafane";

export function moonPhase (date = new Date()) {
    if (false) return moonPhase1(date);
    if (false) return moonPhase2(date);
    if (false) return moonPhase3(date);
    return moonPhase4(date);
}

/**
 * Algorithm from http://www.ben-daglish.net/moon.shtml
 * @param {Date} date
 * @returns
 */
function moonPhase1 (date = new Date()) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDay();
      let r = year % 100;
      r %= 19;
      if (r>9){ r -= 19;}
      r = ((r * 11) % 30) + month + day;
      if (month<3){r += 2;}
      r -= ((year<2000) ? 4 : 8.3);
      r = Math.floor(r+0.5)%30;
      return (r < 0) ? r+30 : r;
}

/**
 * Algorithm from http://www.ben-daglish.net/moon.shtml
 * @param {Date} date
 * @returns
 */
function moonPhase2 (date = new Date()) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const n = Math.floor(12.37 * (year - 1900 + ((1 * month - 0.5)/12.0)));
    const RAD = 3.14159265/180.0;
    const t = n / 1236.85;
    const t2 = t * t;
    const as = 359.2242 + 29.105356 * n;
    const am = 306.0253 + 385.816918 * n + 0.010730 * t2;
    let xtra = 0.75933 + 1.53058868 * n + ((1.178e-4) - (1.55e-7) * t) * t2;
    xtra += (0.1734 - 3.93e-4 * t) * Math.sin(RAD * as) - 0.4068 * Math.sin(RAD * am);
    const i = (xtra > 0.0 ? Math.floor(xtra) :  Math.ceil(xtra - 1.0));
    const j1 = julian(date);
    const jd = (2415020 + 28 * n) + i;
    return (j1-jd + 30)%30;
}

function moonPhase3 (date = new Date()) {
    return Math.round(phase(julian(date)).phase * 30) % 30;
}

// Algorithm by me
export function moonPhases (date = new Date()) {
    // From https://minkukel.com/en/various/calculating-moon-phase/
    // const synodic_month = 29.53058770576;

    // From wikipedia
    const T = (julian(date)-2451545.0)/36525;
    const synodic_month = 29.5305888531 + 0.00000021621 * T - 3.64e-10 * T * T;

    // From regression of full moons in 2021
    // const synodic_month = 29.555744949494947;

    const synodic_month_millis = synodic_month * 86400 * 1000;

    // const epoch_new_moon = new Date("2000-01-06T18:14Z");
    // const epoch_new_moon = new Date("2020-01-03T04:45:00Z");
    const epoch_new_moon = new Date("2021-01-13T05:00:00Z");

    const delta = +date - +epoch_new_moon;

    const lunar_cycle_count = (delta / synodic_month_millis)|0;

    const newMoon = new Date(+epoch_new_moon + (lunar_cycle_count * synodic_month_millis));

    const firstQuarter = new Date(+newMoon + 1/4 * synodic_month_millis);

    const fullMoon = new Date(+newMoon + 1/2 * synodic_month_millis);

    const lastQuarter = new Date(+newMoon + 3/4 * synodic_month_millis);

    const nextNewMoon = new Date(+newMoon + synodic_month_millis);

    return [
      newMoon,
      firstQuarter,
      fullMoon,
      lastQuarter,
      nextNewMoon,
    ];
}

function moonPhase4 (date = new Date()) {
    const phases = moonPhases(date);

    if (isSameDay(date, phases[0])) return 0;
    if (isSameDay(date, phases[1])) return 7;
    if (isSameDay(date, phases[2])) return 15;
    if (isSameDay(date, phases[3])) return 22;
    if (isSameDay(date, phases[4])) return 0;

    return -1;
}

// https://stellafane.org/observing/moon_phase.html
export function moonPhases2 (date = new Date()) {
    const { new: newMoons, full: fullMoons } = calcMoonPhase(date.getUTCFullYear());

    const nextNewMoonIndex = newMoons.findIndex(n => +n > +date);
    const prevNewMoonIndex = nextNewMoonIndex - 1;

    if (prevNewMoonIndex < 0) {
      throw Error("Can't find the moon");
    }

    const prevNewMoon = newMoons[prevNewMoonIndex];
    const fullMoon = fullMoons[prevNewMoonIndex];
    const nextNewMoon = newMoons[nextNewMoonIndex];

    const firstQuarter = new Date((+prevNewMoon + +fullMoon) / 2);
    const lastQuarter = new Date((+fullMoon + +nextNewMoon) / 2);

    return [
      prevNewMoon,
      firstQuarter,
      fullMoon,
      lastQuarter,
      nextNewMoon,
    ];
}
