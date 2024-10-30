import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import CSS của react-calendar
import styles from "./MiniCalender.module.css"; // Import CSS module

const MiniCalendar = () => {
  const [date, setDate] = useState(new Date());
  console.log(date);
  return (
    <div>
      <div className={styles.calendarContainer}>
        {/* <i class="bi bi-calendar-plus"></i>
        Calendar */}
        <Calendar onChange={setDate} value={date} className={styles.calendar} />
      </div>
    </div>
  );
};

export default MiniCalendar;
