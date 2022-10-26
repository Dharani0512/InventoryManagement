import React, { useEffect, useState } from "react";
import { useAppcontext } from "../../context/appContext";
import { Alert } from "../../components";
import Clock from "../../components/Clock";
import { formatDate } from "../../utils/utilsFunction";
import axios from "axios";
import moment from "moment";
const DailyAttedance = () => {
  const [state, setState] = useState();
  const {
    details,
    showAlert,
    getDepartment,
    punchIn,
    // punchInId,
    createPunchIn,
    createPunchOut,
  } = useAppcontext();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [punchInId, setPunchInId] = useState("");
  const Weather_API_key = process.env.REACT_APP_WEATHER_API;

  const [login, setLogin] = useState(punchIn);
  useEffect(() => {
    getDepartment("/loginAttendance", "stateAdmin");
  }, [punchIn]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Weather_API_key}`
      )
      .then((resp) => {
        setLocation(resp.data.name);
        console.log(resp.data.name);
      })
      .catch((err) => {
        // Handle Error Here
        console.error(err);
      });
  }, [latitude, longitude]);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  const currentDate = new Date();
  const currentTime =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  // // date
  // const newDate =
  //   currentDate.getDate() +
  //   "/" +
  //   +(currentDate.getMonth() + 0) +
  //   "/" +
  //   currentDate.getFullYear();
  const id = localStorage.getItem("user");
  const createdFor = JSON.parse(id)._id;

  const states = {
    createdFor,
    loginTime: currentTime,
    logoutime: currentTime,
    // date: moment(today).format("D-MM-YY"),
    date: new Date().getDate(),
    attendanceType: "mobile tracking",
    location: location,
  };
  const logoutState = {
    logoutTime: currentTime,
    //date: moment(today).format("D-MM-YY"),
    date: new Date(),
    attendanceType: "mobile tracking",
    location: location,
  };
  useEffect(() => {
    const id = localStorage.getItem("punchInId");
    setPunchInId(id);
    console.log(id);
  }, [login]);
  return (
    <>
      <h1 className="daily-attendance-heading">Punch Time</h1>
      <Clock />
      {showAlert && <Alert />}
      <div className="daily-attendance ">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          {login ? (
            <button
              className="btn"
              onClick={() => {
                createPunchOut(
                  punchInId,
                  "logoutAttendance",
                  logoutState,
                  "Logged out successfully",
                  "punchOut"
                );
                setLogin(!login);
              }}
            >
              Punch Out
            </button>
          ) : (
            <button
              className="btn"
              onClick={() => {
                createPunchIn(
                  "loginAttendance",
                  states,
                  "Logged in successfully",
                  "punchIn",
                  "stateAdmin"
                );
                setTimeout(() => {
                  setLogin(!login);
                }, 500);
              }}
            >
              Punch In
            </button>
          )}
          <div className="mt2"></div>
        </form>
      </div>
    </>
  );
};

export default DailyAttedance;
