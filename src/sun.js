import { calcEquiSol } from './stellafane';

// https://stellafane.org/misc/equinox.html
export function sunPhases(date = new Date()) {
  return [...Array(4)].map((_, i) => calcEquiSol(i, date.getUTCFullYear()));
}
