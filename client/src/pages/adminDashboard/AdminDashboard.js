import React, { useEffect, useState } from "react";
import "../../assets/css/dashboard.css";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppcontext } from "../../context/appContext";
import axios from "axios";
import BitsLogo from "../../components/BitsLogo";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// Create a JSON object to store the chart configurations

const AdminDashboard = () => {
  const { getDepartment, details, getPresant, totalPresant } = useAppcontext();

  let arr = [];
  let obj = {};
  useEffect(() => {
    getPresant("loginAttendance/findPresant");
  }, []);

  const [projects, presant, absent, total, graph] = totalPresant;

  if (presant) {
    arr.push(presant.noOfEmpolyeePresent);
    arr.push(absent.noOfEmpolyeeAbsent);
    arr.push(total.totalNoOfEmployee);
    arr.push(projects.noOfProjects);
    arr.push(graph.graphPerformanceDetailsmonthly);
  }
  // const data = {
  //   labels: ["Red", "Blue", "Yellow", "Orange", "Pink"],
  //   datasets: [
  //     {
  //       label: "dataset1",
  //       data: [12, 4, 6, 9, 8],
  //       borderColor: "red",
  //     },
  //   ],
  // };

  // Preparing the chart data

  let chartData = arr[4];

  const date = new Date().getFullYear();

  const chartConfigs = {
    type: "column2d", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Over All Employee Performance", //Set the chart caption
        // subCaption: "In MMbbl = One Million barrels", //Set the chart subcaption
        xAxisName: `Year ${date}`, //Set the x-axis name
        yAxisName: " Performance Score", //Set the y-axis name
        numberSuffix: "",
        theme: "fusion", //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chartData,
    },
  };

  return (
    <Wrapper>
      <div className="dashboard-container">
        <div className="cards">
          <div className="card1 card">
            <h3>No of Projects</h3>

            <span>{arr[3]}</span>
          </div>
          <div className="card1 card">
            <h3>No of Employees</h3>
            <span> {arr[2]} </span>
          </div>
          <div className="card2 card">
            <h3>No Of Employee present</h3>
            <span>{arr[0]}</span>
          </div>
          <div className="card3 card">
            <h3>No Of Empolyee Absent</h3>
            <span>{arr[1]}</span>
          </div>
        </div>
        <div className="chart-container"></div>
        {<ReactFC {...chartConfigs} />}
      </div>
      <BitsLogo/>
    </Wrapper>
  );
};

export default AdminDashboard;
