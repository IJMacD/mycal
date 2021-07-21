import './App.css';
import { startOfWeek, startOfMonth, makeWeeks, weekNumber, startOfDay, julian, yearDay } from './dates';
import { MoonIndicatorAll, MoonIndicator } from './MoonIndicator';
import { SunIndicator } from './SunIndicator';
import { useSavedState } from './useSavedState';
import { useVisibilityChange } from './useVisibilityChange';

const DAY_NAMES = {
  english: ["Monday","Tuesday","Wedensday","Thursday","Friday","Sauturday","Sunday"],
  norse: ["Moon day","Tiw's day","Woden's day","Thor's day","Freya's day","Sauturn's day","Sun day"],
  french: ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"],
  planets: ["Moon","Mars","Mercury","Jupiter","Venus","Saturn","Sun"],
  latin: ["diēs Lūnae","diēs Mārtis","diēs Mercuriī","diēs Iovis","diēs Veneris","diēs Sāturnī","diēs Sōlis"],
  japanese: ["月","火","水","木","金","土","日"],
  astronomical: ["☽︎","♂","☿","♃","♀","♄","☉"],
  babylonian: ["Sin","Nergal","Nabu","Marduk","Ishtar","Shabattu","Shamash"],
  greek: ["ἡμέρᾱ Σελήνης","ἡμέρᾱ Ἄρεως","ἡμέρᾱ Ἑρμοῦ","ἡμέρᾱ Διός","ἡμέρᾱ Ἀφροδῑ́της","ἡμέρᾱ Κρόνου","ἡμέρᾱ Ἡλίου"],
  hebrew: ["שני","שלישי","רביעי","חמישי","שישי","שבת","ראשון"],
};

const JULIAN_PREF = {
  NONE: 0,
  AT_MIDNIGHT: 1,
  FROM_NOON: 2,
  MODIFIED: 3,
  NASA: 4,
  J2000: 5,
};

function App() {
  const [ yearPreference, setYearPreference ] = useSavedState("mycal.yearPref", "gregorian");
  const [ dayNameOrigin, setDayNameOrigin] = useSavedState("mycal.dayname", /** @type {Object.keys(DAY_NAMES)} */"english");
  const [ julianPreference, setJulianPreference ] = useSavedState("mycal.julianPreference", JULIAN_PREF.AT_MIDNIGHT);
  const [ yearDayPreference, setYearDayPreference ] = useSavedState("mycal.yearDayPreference", 0);
  const [ monthBands, setMonthBands ] = useSavedState("mycal.monthBands", false);
  useVisibilityChange();

  const d = startOfWeek(startOfMonth());
  const weeks = makeWeeks(d, 100);

  const dayHeaderStyle = {
    fontSize: "0.5em",
  };

  const dayNames = DAY_NAMES[dayNameOrigin] || [];

  /**
   *
   * @param {Date} date
   */
  function getDayClassName (date) {
    const d = new Date();
    const currentMonth = d.getFullYear() === date.getUTCFullYear() && d.getMonth() === date.getUTCMonth();
    const monthEven = date.getUTCMonth() % 2;

    return `Day ${currentMonth ? "Day-CurrentMonth" : ""} ${monthEven ? "Day-MonthEven" : "Day-MonthOdd"}`;
  }

  const yearAdjust = yearPreference === "holocene" ? 1e4 : 0;
  const dayPreferences = { yearDay: yearDayPreference, julian: julianPreference };

  return (
    <div className="App">
      <div className="App-Options">
        <label>
          <span>Year</span>{' '}
          <select
            value={yearPreference}
            onChange={e => setYearPreference(e.target.value)}
          >
            <option value="gregorian">Gregorian</option>
            <option value="holocene">Holocene Era</option>
          </select>
        </label>
        <label>
          <span>Day Names</span>{' '}
          <select
            value={dayNameOrigin}
            onChange={e => setDayNameOrigin(e.target.value)}
          >
            <option value="english">English</option>
            <option value="norse">Norse</option>
            <option value="planets">Planets</option>
            <option value="french">French</option>
            <option value="latin">Latin</option>
            <option value="japanese">Japanese</option>
            <option value="astronomical">Astronomical</option>
            <option value="babylonian">Babylonian</option>
            <option value="greek">Greek</option>
            <option value="hebrew">Hebrew</option>
          </select>
        </label>
        <label>
          <span>Year Day</span>{' '}
          <input type="checkbox" checked={yearDayPreference === 1} onChange={e => setYearDayPreference(e.target.checked ? 1 : 0)} />
        </label>
        <label>
          <span>Julian</span>{' '}
          <select
            value={julianPreference}
            onChange={e => setJulianPreference(+e.target.value)}
          >
            <option value={JULIAN_PREF.NONE}>None</option>
            <option value={JULIAN_PREF.AT_MIDNIGHT}>At Midnight</option>
            <option value={JULIAN_PREF.FROM_NOON}>From Noon</option>
            <option value={JULIAN_PREF.MODIFIED}>Modified</option>
            <option value={JULIAN_PREF.NASA}>NASA</option>
            <option value={JULIAN_PREF.J2000}>J2000</option>
          </select>
        </label>
        <label>
          <span>Month Bands</span>{' '}
          <input type="checkbox" checked={monthBands} onChange={e => setMonthBands(e.target.checked)} />
        </label>
      </div>
      <table className={monthBands?"MonthBands":""}>
        <thead>
          <tr>
            <th></th>
            {
              dayNames.map((n,i) => <th key={i} style={dayHeaderStyle}>{n}</th>)
            }
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            weeks.map((w, i) => {
              const isStartOfMonth = w.some(d => d.getDate() === 1);
              const currentWeek = Date.now() >= +w[0] && Date.now() < (+w[0] + 7 * 86400000);

              const n = weekNumber(w[0]);

              return (
                <tr key={+w[0]} className={currentWeek?"Week Week-Current":"Week"}>
                  <th style={{textAlign:"right"}}>
                    {(n === 1 || i === 0) && (yearAdjust + w[6].getFullYear() + "-")}
                    W{n.toString().padStart(2,"0")}
                  </th>
                  {
                    w.map(d => (
                      <td key={+d} className={getDayClassName(d)}>
                        <DayView date={d} preferences={dayPreferences} />
                      </td>
                    ))
                  }
                  <th className={getDayClassName(w[6])}>{isStartOfMonth && (w[6].getMonth() + 1)}</th>
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

function DayView ({ date, preferences: { julian: julianPreference, yearDay: yearDayPreference } }) {
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
  const sunStyle = {
    position: "absolute",
    top: 0,
    left: "0.25em",
    lineHeight: "0.5em",
  };

  /** @type {import('react').CSSProperties} */
  const moonStyle = {
    position: "absolute",
    top: 0,
    right: "0.25em",
    lineHeight: "0.5em",
  };

  const allMoon = false;

  let j = 0;

  if (julianPreference !== JULIAN_PREF.NONE) {
    j = julian(date);
  }

  switch (julianPreference) {
    case JULIAN_PREF.FROM_NOON:
      j += 0.5;
      break;
    case JULIAN_PREF.MODIFIED:
      j -= 2400000.5;
      break;
    case JULIAN_PREF.NASA:
      j -= 2400000.5;
      j -= 40000;
      break;
    case JULIAN_PREF.J2000:
      j -= 2451545.0;
      // To match https://heasarc.gsfc.nasa.gov/cgi-bin/Tools/xTime/xTime.pl
      j += 0.5;
      break;
    default:
  }

  j = j|0;

  return (
    <div style={style}>
      <div className="Day-Date">{date.getUTCDate()}</div>
      <div style={sunStyle}>
        <SunIndicator date={date} />
      </div>
      <div style={moonStyle}>
        { allMoon ?
          <MoonIndicatorAll date={date} /> :
          <MoonIndicator date={date} />
        }
      </div>
      { yearDayPreference !== 0 && <span style={julianStyle}>{yearDay(date)}</span> }
      { julianPreference !== JULIAN_PREF.NONE && <span style={julianStyle}>{j}</span> }
    </div>
  );
}


