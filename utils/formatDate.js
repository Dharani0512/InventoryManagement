import moment from "moment";
import date from "date-and-time";
const formatDate = (date) => {
  const momentDate = moment(date).format("MMM Do, YYYY");
  return momentDate;
};

const findDates = (day) => {
  const today = date.format(day, "D-MM-YYYY");
  return today;
};

const datecon = (day) => {
  const today = date.format(day, "YYYYMMD");
  return today;
};

const compareDates = (day) => {
  const today = moment(day).format();
  return today;
};

const findDate = (day) => {
  const today = moment(day).format("YYYY-MM-Do");
};

const endDay = (day) => {
  const time = moment().endOf(day).format();
  // const format = moment(time).format();
  return time;
};
//make a month start d
const startOfMonth = () => {
  const res = moment().startOf("month").format();
  return res;
};
//make a month end day
const endOfMonth = () => {
  const res = moment().endOf("month").format(); //.format("D-MM-YYYY");
  return res;
};

//first day of the year
const startofYear = () => {
  const res = moment().startOf("year").format();
  return res;
};

//last day of the year
const endofYear = () => {
  const res = moment().endOf("year").format();
  return res;
};

const loginDate = (day) => {
  const today = moment(day).format("MMM Do YY");
  return today;
};
let todayFormat = () => {
  const today = moment().format();
  return today;
};

export {
  formatDate,
  findDate,
  findDates,
  loginDate,
  endDay,
  startOfMonth,
  endOfMonth,
  todayFormat,
  compareDates,
  datecon,
  startofYear,
  endofYear,
};
