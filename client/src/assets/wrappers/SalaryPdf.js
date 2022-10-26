import styled from "styled-components";

const Wrapper = styled.tr`
  .salary-container {
    width: 1000px;
  }
  .heading {
    display: flex;
    justify-content: space-between;
  }
  .company-info {
    text-align: center;
  }

  .underline {
    border: 1px solid rgb(0, 0, 0);
    margin: 1.5rem 0;
  }
  .basic-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 3rem;
  }
  .info-container {
    margin: 2rem 0;
    width: max-content;
  }
  .left-content {
    margin-right: 1rem;
    font-weight: bold;
  }

  .verticalLine {
    border-left: 1px solid black;
    height: 100px;
    position: absolute;
    left: 50%;
    margin-top: -3rem;
  }

  .salary-table1 {
    width: 100%;
    margin-top: 3%;
    border: 1px solid black;
  }
  .salary-table2 {
    width: 100%;
    margin-top: 3%;
  }

  .salary-align {
    /* border-right: 2px solid black; */
  }
  .table-1 {
    border: 1px solid black;
    border-collapse: collapse;
  }

  th,
  td {
    height: 30px;
  }

  .last-row {
    border-bottom: 2px solid #000;
    border-top: 2px solid #000;
  }
  table {
    text-align: none;
    box-shadow: none;
    overflow-x: hidden;
  }
  th {
    padding: 0px;
  }
  thead tr {
  }
  thead tr {
  }

  td {
    box-shadow: none;
    padding: 0px;
  }
  table td {
    overflow: hidden;

    white-space: nowrap;
  }

  /* tr:nth-child(even) {
  background-color: rgb(240, 240, 240);
} */

  tr:hover {
    /* background-color: white; */
  }
  th:hover {
  }
  .table-1 td {
    text-align: center;
    padding: 0.5rem 0;
    border: 1px solid black;
  }
`;
export default Wrapper;
