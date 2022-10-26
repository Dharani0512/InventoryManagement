import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useAppcontext } from "../../context/appContext";
import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
const CalendarAttendance = ({ s }) => {
  const { totalDetails, getCalendar, filterDate } = useAppcontext();
  console.log(filterDate);

  useEffect(() => {
    getCalendar("/loginAttendance/calendar");
  }, []);
  const eventArr = filterDate.map((item) => {
    const { _id, count } = item;
    const obj = { title: count + " presant", date: _id };
    return obj;
  });
  console.log(eventArr);

  // const date = calendarDate.map((item) => {
  //   const { _id, count } = item;

  //   const x = _id.split("/");
  //   const val = x[2] + "-" + "0" + x[1] + -+x[0];
  //   const obj = { title: count, date: _id };

  //   return obj;
  // });

  const renderEventContent = () => {
    return <>{filterDate.length}</>;
  };
  const linkToAttendance = () => {
    return <Link to="departmentForm" />;
  };
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventArr}
        eventClick={() => linkToAttendance()}
      />
    </div>
  );
};

export default CalendarAttendance;
