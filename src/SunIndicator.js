import { isSameDay } from './dates';
import { sunPhases } from './sun';
import { formatTime } from "./util";

export function SunIndicator({ date }) {
  const phases = sunPhases(date);
  let out = "\xA0"; // &nbsp;
  let title = "";

  if (isSameDay(date, phases[0])) {
    out = "☀️";
    title = `Vernal Equinox ${formatTime(phases[0])}`;
  }
  else if (isSameDay(date, phases[1])) {
    out = "☀️";
    title = `Summer Solstice ${formatTime(phases[1])}`;
  }
  else if (isSameDay(date, phases[2])) {
    out = "☀️";
    title = `Autumnal Equinox ${formatTime(phases[2])}`;
  }
  else if (isSameDay(date, phases[3])) {
    out = "☀️";
    title = `Winter Solstice ${formatTime(phases[3])}`;
  }

  return <span style={{ fontSize: "0.5em" }} title={title}>{out}</span>;
}
