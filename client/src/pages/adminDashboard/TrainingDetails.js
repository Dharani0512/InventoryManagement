import React from "react";

const data = ["Employee Id", "Date", "Module Name", "Name", "Training Status"];

const TrainingDetails = () => {
  return (
    <div className="Employee-container">
      <div className="top-section">
        <h1 className="department-heading">Training Details</h1>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              {data.map((item) => {
                // const { name } = item;
                return <th>{item}</th>;
              })}
            </tr>
          </thead>

          {/* {fetchData.map((item) => {
            const {
              _id,
              email,
              role,
              name,
              date_of_join,
              dob,
              employeeId,
              department,
            } = item;
            return (
              <tr>
                <td> {employeeId} </td>
                <td> {name} </td>
                <td> {role} </td>
                <td> {email} </td>
                <td> {department} </td>
                <td style={{ display: "flex", fontSize: "1.5rem" }}>
                  <TiEdit style={{ marginRight: "1rem" }} />
                  <FaTrashAlt onClick={() => deleteData(_id)} />
                </td>
              </tr>
            );
          })} */}
        </table>
      </div>
    </div>
  );
};

export default TrainingDetails;
