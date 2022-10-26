// // import Calendar from "react-calendar";
// // import React, { useEffect, useState } from "react";
// // import { useAppcontext } from "../../context/appContext";
// // import moment from "moment";

// // const AttendanceCalendar = () => {
//   // const [value, onChange] = useState(new Date());
//   // const {
//     // loginTime,
//     // attendanceType,
//     // details,
//     // totalDetails,
//     // editPending,
//     // createDepartment,
//     // getDepartment,
//   // } = useAppcontext();
//   useEffect(() => {
//     getDepartment("/loginAttendance");
//   }, []);
//   const val = details.map((item) => {
//     const { date } = item;
//     const date1 = date.split("-");
//     const newDate = date1[0] + "-" + date1[2] + "-" + date1[1];
//     return newDate;
//   });
//   console.log(val[1]);
//   const date = new Date();

//   const curDate =
//     date.getFullYear().toString() +
//     "-" +
//     date.getDate().toString() +
//     "-" +
//     parseInt(date.getMonth() + 1);
//   console.log(curDate);

//   // const attDate = val.forEach((item) => console.log(item));
//   // console.log(attDate);
//   let dummy;
//   return (
//     <div>
//       // {/* <Calendar */}
//         onChange={onChange}
//         value={[new Date(2022, 2, 1), new Date(2022, 1, 1)]}
//         tileContent={({ activeStartDate, date, view }) => {
//           const curDate =
//             date.getFullYear().toString() +
//             "-" +
//             date.getDate().toString() +
//             "-" +
//             parseInt(date.getMonth() + 1);

//           return view === "month" && curDate === val[1]
//             ? "1 employee presant" + val[1].length
//             : null;
//         }}
//       />
//     // {/* </div> */}
//   );
// };

// export default AttendanceCalendar;
// // ({ view, date }) => {
//           // const curDate =
//             // date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

//           // const content =
//             // view === "month" && curDate === date ? <p>hi</p> : null;
//           // console.log(content);
//           // return content;
//         // }
