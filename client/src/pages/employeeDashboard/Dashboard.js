import React, { useEffect, useState } from "react";
import "../../assets/css/dashboard.css";

import { useAppcontext } from "../../context/appContext";
import axios from "axios";
// Step 1 - Include react

// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
// Preparing the chart data
const chartData = [
  {
    label: "Venezuela",
    value: "290",
  },
  {
    label: "Saudi",
    value: "260",
  },
  {
    label: "Canada",
    value: "180",
  },
  {
    label: "Iran",
    value: "140",
  },
  {
    label: "Russia",
    value: "115",
  },
  {
    label: "UAE",
    value: "100",
  },
  {
    label: "US",
    value: "30",
  },
  {
    label: "China",
    value: "30",
  },
];
// Create a JSON object to store the chart configurations

const Dashboard = () => {
  const {
    details,
    getDepartment,
    employeeDashboardDetails,
    getEmployeeDashboard,
  } = useAppcontext();

  useEffect(() => {
    getDepartment("lastMonthPerformance");
  }, []);
  useEffect(() => {
    getEmployeeDashboard("employeeDashboard");
  }, []);
  const {
    EmployeePresent,
    EmployeeAbsent,
    EmployeeOverallPerformace,
    EmployeeLastMonthPerformance,
  } = employeeDashboardDetails;
  console.log(details);
  const chartConfigs = {
    type: "column2d", // The chart type
    width: "800", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Performance", //Set the chart caption
        // subCaption: ,             //Set the chart subcaption
        xAxisName: "Performance", //Set the x-axis name
        yAxisName: "Performance Marks", //Set the y-axis name
        // numberSuffix: "",
        theme: "fusion", //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: details,
    },
  };
  return (
    <div className="dashboard-container">
      <div className="cards">
        <div className="card1 card">
          <h3>Monthly Performance</h3>
          <span>{EmployeeLastMonthPerformance}</span>
        </div>
        <div className="card4 card">
          <h3>OverAll Performance</h3>
          <span>{EmployeeOverallPerformace}</span>
        </div>
        <div className="card2 card">
          <h3>No of Days Presant</h3>
          <span>{EmployeePresent}</span>
        </div>
        <div className="card3 card">
          <h3>No Of Days Absent</h3>
          <span>{EmployeeAbsent}</span>
        </div>
        <div className="chart-container">
          {/* <ReactFC {...chartConfigs} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
