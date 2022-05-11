import React, {useState, useEffect} from "react";

function Day(dayProps) {
  // Props
  const {day, setDay, month} = dayProps;

  const [daysPerMonth, setDaysPerMonth] = useState();

  const days = [
    {
      months: [2],
      days: 28
    },
    {
      months: [4, 6, 9, 11],
      days: 30
    },
    {
      months: [1, 3, 5, 7, 8, 10, 12],
      days: 31
    }
  ];

  useEffect(() => {
    // Get number of days depending on month chosen
    const getDays = () => {
      days.map((item) => {
        item.months.map((m) => {
          if(m == month) {
            setDaysPerMonth(item.days);
          }
        });
      });
    }

    getDays();
  }, [month]);

  return (
    <select className="Day form-select text-center me-2 w-auto" value={day} onChange={(e) => setDay(e.target.value)}>
      <option disabled selected>{day}</option>
      {Array.from(Array(daysPerMonth), (e, index) => {
        return (
          <option key={index + 1} value={index + 1}>{index + 1}</option>
        );
      })}
    </select>
  );
}

export default Day;
