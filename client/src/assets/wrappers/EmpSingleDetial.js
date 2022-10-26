import styled from "styled-components";

const Wrapper = styled.section`
  * {
    margin: 0;
    box-sizing: border-box;
    padding: 0;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mb1 {
    margin-bottom: 1rem;
  }
  table {
    border: 1px solid black;
    text-align: left;
    border-collapse: collapse;
    margin-bottom: 2rem;
    border: 1rem;
    -webkit-box-shadow: -2px 29px 28px 13px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -2px 29px 28px 13px rgba(0, 0, 0, 0.75);
    box-shadow: -2px 29px 28px 13px rgba(0, 0, 0, 0.75);
  }

  tr th {
    padding: 1rem 2rem;
    background-color: greenyellow;
    font-size: 1.25rem;
  }
  tr td {
    padding: 1rem 2rem;
    max-width: 300px;
  }
  tr:nth-child(even) {
    background-color: #f3f3f3;
  }
  tr:last-child {
    border-bottom: 5px solid greenyellow;
  }
`;
export default Wrapper;
