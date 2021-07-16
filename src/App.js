import './App.css';
import { phase, phase_string } from './moon';

function App() {

  const d = startOfWeek(startOfMonth());
  const weeks = makeWeeks(d, 100);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
            <th>S</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            weeks.map((w, i) => {
              const isStartOfMonth = w.some(d => d.getDate() === 1);
              const isStartOfYear = w.some(d => d.getMonth() === 0 && d.getDate() === 1);

              return (
                <tr key={+w[0]}>
                  <th>{weekNumber(w[0])}</th>
                  {
                    w.map(d => <td key={+d}><DayView date={d} /></td>)
                  }
                  <th>{isStartOfMonth && (w[6].getMonth() + 1)}</th>
                  <th>{(isStartOfYear || i === 0) && (1e4 + w[6].getFullYear())}</th>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;

function DayView ({ date }) {
  const isToday = +date === +startOfDay();

  /** @type {import('react').CSSProperties} */
  const style = {
    padding: "0.5em",
    margin: "0.25em",
    border: "1px solid #CCC",
    background: isToday ? "#FFFFCC" : "transparent",
    position: "relative",
  };

  /** @type {import('react').CSSProperties} */
  const julianStyle = {
    fontSize: "0.5em",
    display: "block",
  };

  /** @type {import('react').CSSProperties} */
  const moonStyle = {
    position: "absolute",
    top: 0,
    right: "0.25em",
    lineHeight: "0.5em",
  };

  const allMoon = false;

  return (
    <div style={style}>
      {date.getDate()}
      <div style={moonStyle}>
        { allMoon ?
          <MoonIndicatorAll date={date} /> :
          <MoonIndicator date={date} />
        }
      </div>
      <span style={julianStyle}>{julian(date)}</span>
    </div>
  );
}

function MoonIndicator ({ date }) {
  if (false) {
    const phase = moonPhase(date);
    let out = "\xA0"; // &nbsp;
    if (phase === 0) out = "🌑";
    else if (phase === 7) out = "🌓";
    else if (phase === 15) out = "🌕";
    else if (phase === 22) out = "🌗";
    return <span style={{fontSize:"0.5em"}} title={phase.toString()}>{out}</span>;
  }

  const phases = moonPhases(date);
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

  return <span style={{fontSize:"0.5em"}} title={title}>{out}</span>;
}

function MoonIndicatorAll ({ date }) {
  const str = phase_string(phase(julian(date)).phase);
  let out = "\xA0"; // &nbsp;
  if (str === "new") out = "🌑";
  else if (str === "waxing crescent") out = "🌒";
  else if (str === "first quarter") out = "🌓";
  else if (str === "waxing gibbous") out = "🌔";
  else if (str === "full") out = "🌕";
  else if (str === "waning gibbous") out = "🌖";
  else if (str === "last quarter") out = "🌗";
  else if (str === "waning crescent") out = "🌘";
  return <span style={{fontSize:"0.5em"}}>{out}</span>;
}

function makeWeeks(d, count) {
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

function startOfMonth (date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth());
}

function startOfWeek (date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
}

function startOfDay (date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}


/**
 * ISO Week Number
 * Algorithm from https://www.epochconverter.com/weeknumbers
 */
function weekNumber (date = new Date()) {
  const target  = new Date(date);
  const dayNr   = (date.getDay() + 6) % 7;

  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = +target;

  target.setMonth(0, 1);

  if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }

  return 1 + Math.ceil((firstThursday - +target) / 604800000);
}

/**
 * Algorithm from https://quasar.as.utexas.edu/BillInfo/JulianDatesG.html
 */
function julian (date = new Date()) {
  let y = date.getUTCFullYear();
  let m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();

  if (m < 3) {
      y--;
      m += 12;
  }

  const a = (y / 100)|0;
  const b = (a / 4)|0;
  const c = 2 - a + b;
  const e = (365.25 * (y + 4716))|0;
  const f = (30.6001 * (m + 1))|0;

  const h = date.getUTCHours();
  const g = h < 12 ? 1 : 0;

  return c + d + e + f - 1524 - g;
}

function moonPhase (date = new Date()) {
  if (false) return moonPhase1(date);
  if (false) return moonPhase2(date);
  if (false) return moonPhase3(date);
  if (true) return moonPhase4(date);
}

/**
 * Algorithm from http://www.ben-daglish.net/moon.shtml
 * @param {Date} date
 * @returns
 */
function moonPhase1 (date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
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
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
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
function moonPhases (date = new Date()) {
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

/**
 *
 * @param {Date} date1
 * @param {Date} date2
 */
function isSameDay (date1, date2) {
  return date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate();
}

function formatTime (date = new Date()) {
  return `${date.getHours().toString().padStart(2,"0")}:${date.getMinutes().toString().padStart(2,"0")}`;
}