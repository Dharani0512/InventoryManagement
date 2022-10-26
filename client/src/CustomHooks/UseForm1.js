import axios from "axios";
import React, { useState, useEffect } from "react";

const useForm1 = () => {
  const [department, setDepartment] = useState([
    {
      email: "",
      role: "",
      name: "",
      date_of_join: "",
      dob: "",
      employeeId: "",
      department: "",
      gender: "",
    },
  ]);
  const [employee, setEmployee] = useState([
    {
      email: "",
      role: "",
      name: "",
      date_of_join: "",
      date_of_birth: "",
    },
  ]);
  const [leave, setLeave] = useState([
    {
      employeeId: "",
      name: "",
      role: "",
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: "",
      totalLeave: "",
    },
  ]);

  const handleChange = (e, values, setValues) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // console.log(values);
  };

  const handleSubmit = (e, values, setValues, path) => {
    e.preventDefault();

    setValues(values);
    console.log(values);

    axios
      .post(`/api/v1/${path}`, values)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.data));
  };

  return {
    leave,
    setLeave,
    department,
    setDepartment,
    handleChange,
    handleSubmit,
    employee,
    setEmployee,
  };
};

export default useForm1;
