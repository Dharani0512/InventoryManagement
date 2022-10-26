import Wrapper from "../../assets/wrappers/EmpSingleDetial";
import { useAppcontext } from "../../context/appContext";
import React, { useEffect } from "react";
import Loading from "../../components/Loading";
const DepartmentDetailsEmp = () => {
  const {
    isLoading,
    details,
    totalDetails,
    getDepartment,
    setEditDepartment,
    deleteDetail,
  } = useAppcontext();
  const id = localStorage.getItem("user");
  const empId = JSON.parse(id)._id;
  useEffect(() => {
    getDepartment(`/departmentDetail/${empId}`, "stateAdmin");
  }, []);
  return (
    <Wrapper>
      <h3 className="center mb1">Department Details</h3>
      <div className="center">
        <table>
          <tr>
            <th> Detials </th>
            <th> Content </th>
          </tr>
          {details.map((item, index) => {
            const {
              _id,
              name,
              employeeId,
              designation,
              email,
              gender,
              employeeStatus,
              department,
            } = item;
            return (
              <>
                <tr>
                  <td>Employee Id </td>
                  <td>{employeeId}</td>
                </tr>
                <tr>
                  <td>Name </td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Email Id </td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td>Designation</td>
                  <td>{designation}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{gender}</td>
                </tr>
                <tr>
                  <td>Department</td>
                  <td>{department}</td>
                </tr>
                <tr>
                  <td>EmployeeStatus</td>
                  <td>{employeeStatus}</td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </Wrapper>
  );
};

export default DepartmentDetailsEmp;
