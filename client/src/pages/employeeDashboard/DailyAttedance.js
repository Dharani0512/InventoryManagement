import React, { useEffect, useRef, useState } from "react";
import { useAppcontext } from "../../context/appContext";
import { Alert } from "../../components";
import Clock from "../../components/Clock";
import axios from "axios";

const DailyAttedance = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState();
  const [login, setLogin] = useState(false);
  const [render, setRender] = useState(false);

  const ref = useRef(false);
  useEffect(() => {
    const data = localStorage.getItem("punchIn");
    setLogin(JSON.parse(data));
  }, [render]);

  const {
    details,
    showAlert,
    getDepartment,
    punchIn,
    alertText,
    createPunchIn,
    loginState,
    createPunchOut,
    punchInValue,
  } = useAppcontext();

  const Weather_API_key = process.env.REACT_APP_WEATHER_API;
  useEffect(() => {
    getDepartment("/loginAttendance");
  }, [punchIn]);
    useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    });
    },[])
 useEffect(() => {

    if (ref.current) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${"5abd072af850e8350d86981776778c0a"}`
        )
        .then((resp) => {
          setLocation(resp.data.name);
          console.log(resp.data.name);
        })
        .catch((err) => {
          // Handle Error Here
          console.error(err);
        });
    }
    return () => {
      ref.current = true;
    };
  }, [longitude]);

  const currentDate = new Date();
  const currentTime =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  // date
  const newDate =
    currentDate.getDate() +
    "-" +
    ("0" + (currentDate.getMonth() + 0)) +
    "-" +
    currentDate.getFullYear();

  const states = {
    loginTime: currentTime,
    date: newDate,
    attendanceType: "mobile tracking",
    location: location,
    latitude,
    longitude,
  };
  const logoutState = {
    logoutTime: currentTime,
    date: newDate,
    attendanceType: "mobile tracking",
    location: location,
    latitude,
    longitude,
  };

  // find exact location

  const getLocation = async () => {
    const { data } = await axios.get(
      `https://www.google.co.in/maps/dir/${latitude},${longitude}//@13.0709159,80.2247662,21z/data=4m2!4m1!3e2`
    );
    console.log(data);
  };
  useEffect(() => {
    getLocation();
  }, []);
  const logoutEmail = JSON.parse(localStorage.getItem("user")).email;
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
                 logoutEmail, 
                  "logoutAttendance",
                  logoutState,
                  "Logged out successfully",
                  "punchOut",
                  "stateAdmin"
                );

                setRender(!render);
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
                setRender(!render);
              }}
            >
              Punch In
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default DailyAttedance;

