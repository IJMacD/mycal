import './App.css';

function App() {

  const d = startOfWeek(startOfMonth());
  const weeks = makeWeeks(d, 1000);

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
            weeks.map(w => (
              <tr key={+w[0]}>
                <th>{weekNumber(w[0])}</th>
                {
                  w.map(d => <td key={+d}><DayView date={d} /></td>)
                }
                <th>{w[0].getMonth() !== w[6].getMonth() && (w[6].getMonth() + 1)}</th>
                <th>{w[0].getFullYear() !== w[6].getFullYear() && (1e4 + w[6].getFullYear())}</th>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;

function DayView ({ date }) {
  const isToday = +date === +startOfDay();


  const style = {
    padding: 8,
    margin: 4,
    border: "1px solid #CCC",
    background: isToday ? "#FFFFCC" : "transparent",
  };

  const julianStyle = {
    fontSize: "0.5em",
    display: "block",
  };

  return (
    <div style={style}>
      {date.getDate()}
      <span style={julianStyle}>{getJulian(date)}</span>
    </div>
  );
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
function getJulian (date = new Date()) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  const d = date.getDate();

  if (m < 3) {
      y--;
      m += 12;
  }

  const a = (y / 100)|0;
  const b = (a / 4)|0;
  const c = 2 - a + b;
  const e = (365.25 * (y + 4716))|0;
  const f = (30.6001 * (m + 1))|0;

  return c + d + e + f - 1524;
}