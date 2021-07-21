import { ordinalDate } from './dates';
import { calcEquiSol } from './stellafane';

// https://stellafane.org/misc/equinox.html
export function sunPhases(date = new Date()) {
  return [...Array(4)].map((_, i) => calcEquiSol(i, date.getUTCFullYear()));
}

/**
 *
 * @param {Date} date
 * @returns {number} Declination in radians
 */
export function declination (date = new Date()) {
  const N = ordinalDate(date) - 1;
  const th = 0.98565 / 180 * Math.PI;
  const th2 = 1.914 / 180 * Math.PI;
  return -Math.asin(0.39779 * Math.cos(th * (N + 10) + th2 * Math.sin(th * (N - 2))));
}

/**
 *
 * @param {number} latitude Latitiude in radians
 * @param {Date} date
 * @returns {number} Zenith angle in radians
 */
export function zenith (latitude, date = new Date()) {
  return latitude - declination(date);
}

/**
 *
 * @param {number} latitude Latitude in radians
 * @param {Date} date
 * @returns {number} Altitude angle in radians
 */
export function altitude (latitude, date = new Date()) {
  return Math.PI / 2 - zenith(latitude, date);
}