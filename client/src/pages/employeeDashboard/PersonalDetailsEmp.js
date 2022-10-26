import Wrapper from "../../assets/wrappers/EmpSingleDetial";
import { useAppcontext } from "../../context/appContext";
import React, { useEffect } from "react";
import Loading from "../../components/Loading";

const PersonalDetailsEmp = () => {
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
    getDepartment(`/personalDetails/${empId}`, "stateAdmin");
  }, []);

  console.log(details);
  if (isLoading) {
    return <Loading center />;
  }
  if (details.length === 0) {
    <Wrapper>
      <h2>No Details to Display</h2>
    </Wrapper>;
  }
  console.log(details.email);

  return (
    <Wrapper>
      <h3 className="center mb1">Personal Details</h3>
      <div className="center">
        <table>
          <tr>
            <th> Detials </th>
            <th> Content </th>
          </tr>
          {details.map((item, index) => {
            const {
              accountNumber,
              bankName,
              currentAddress,
              date_of_birth,
              designation,
              email,
              employeeId,
              gender,
              ifscCode,
              name,
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
                  <td>Current Address</td>
                  <td>{currentAddress}</td>
                </tr>
                <tr>
                  <td>AccountNumber</td>
                  <td>{accountNumber}</td>
                </tr>
                <tr>
                  <td>Bank Name</td>
                  <td>{bankName}</td>
                </tr>
                <tr>
                  <td>IFSC Code</td>
                  <td>{ifscCode}</td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </Wrapper>
  );
};

export default PersonalDetailsEmp;
