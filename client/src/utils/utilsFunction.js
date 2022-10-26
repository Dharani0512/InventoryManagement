import moment from "moment";

const formatDate = (date) => {
  const momentDate = moment(date).format("MMM Do, YYYY");
  return momentDate;
};

const indianFormat = (day) => {
  const momentDate = moment(day).format("DD/MM/YYYY");
  return momentDate;
};
export {indianFormat, formatDate };
