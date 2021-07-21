import { isSameDay, julian } from './dates';
import { moonPhase, moonPhases2 } from './moon';
import { phase, phase_string } from './moon_py';
import { formatTime } from "./util";

export function MoonIndicator({ date }) {
  if (false) {
    const phase = moonPhase(date);
    let out = "\xA0"; // &nbsp;
    if (phase === 0)
      out = "🌑";
    else if (phase === 7)
      out = "🌓";
    else if (phase === 15)
      out = "🌕";
    else if (phase === 22)
      out = "🌗";
    return <span style={{ fontSize: "0.5em" }} title={phase.toString()}>{out}</span>;
  }

  const phases = moonPhases2(date);
  let out = "\xA0"; // &nbsp;
  let title = "";

  if (isSameDay(date, phases[0])) {
    out = "🌑";
    title = formatTime(phases[0]);
  }
  else if (isSameDay(date, phases[1])) {
    out = "🌓";
    title = formatTime(phases[1]);
  }
  else if (isSameDay(date, phases[2])) {
    out = "🌕";
    title = formatTime(phases[2]);
  }
  else if (isSameDay(date, phases[3])) {
    out = "🌗";
    title = formatTime(phases[3]);
  }
  else if (isSameDay(date, phases[4])) {
    out = "🌑";
    title = formatTime(phases[4]);
  }

  return <span style={{ fontSize: "0.5em" }} title={title}>{out}</span>;
}

export function MoonIndicatorAll({ date }) {
  const str = phase_string(phase(julian(date)).phase);
  let out = "\xA0"; // &nbsp;
  if (str === "new")
    out = "🌑";
  else if (str === "waxing crescent")
    out = "🌒";
  else if (str === "first quarter")
    out = "🌓";
  else if (str === "waxing gibbous")
    out = "🌔";
  else if (str === "full")
    out = "🌕";
  else if (str === "waning gibbous")
    out = "🌖";
  else if (str === "last quarter")
    out = "🌗";
  else if (str === "waning crescent")
    out = "🌘";
  return <span style={{ fontSize: "0.5em" }}>{out}</span>;
}
