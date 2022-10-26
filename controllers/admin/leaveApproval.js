import { StatusCodes } from "http-status-codes";
import { NotFoundError, UnAuthenticatedError } from "../../errors/index.js";
import currentYearmodal from "../../models/Admin/CurrentYear.js";
import salaryDetails from "../../models/Admin/monthlySalary.js";
import modal from "../../models/Employee/leaveDetails.js";
import leaveDetailsModal from "../../models/Employee/leaveDetails.js";
import userModal from "../../models/User.js";
import newdate from "date-and-time";

// controllers => admin => leaveApprovals.js
const getAllDetailsAdmin = async (req, res) => {
  //let queryObject = {};
  const roleId = req.emp.empId; //_id
  const gotRole = await userModal.findById({ _id: roleId });
  const empId = req.employeeId.empId;

  const access = (gotRole, empId) => {
    let queryObject = {};
    if (gotRole.role == "Admin") {
      let getAdm = { adminId: empId };

      let result = modal.find(getAdm);
      queryObject = result;
    } else if (gotRole.role == "stateAdmin") {
      let getEmp = { empId: empId, state: gotRole.state, role: "Employee" };
      let result = modal.find(getEmp);
      queryObject = result;
    }
    return queryObject;
  };
  // let result = modal.find(queryObject);
  let result = access(gotRole, empId);

  // setup pagination

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  let skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  let details = await result;
  console.log(details, details.length);

  // no of pages and total details

  const totalDetails = await modal.countDocuments(result);
  const noOfPages = Math.ceil(totalDetails / 10);

  /*
  if next year returned leaves are reseted
  */

  let date = new Date();
  let year = date.getFullYear(); //2022
  const currentYear = await currentYearmodal
    .findOne()
    .sort({ _id: -1 })
    .limit(1);
  console.log(typeof currentYear.currentYear, typeof year);
  // const dummy = await modal.findOne().sort({ _id: -1 }).limit(1);

  if (year == currentYear.currentYear) {
    return res
      .status(StatusCodes.OK)
      .json({ details, totalDetails, numOfPages: noOfPages });
  } else if (
    year != currentYear.currentYear &&
    year > currentYear.currentYear
  ) {
    const balanceleaveDays = await modal.updateMany({
      balanceleaveDays: 12,
      leaveTaken: 0,
      leaveTakenBefore: 0,
    });
    const updateCurrentYear = await currentYearmodal.updateMany({
      currentYear: year,
    });
    console.log("dummychanged", updateCurrentYear);

    return res
      .status(StatusCodes.OK)
      .json({ details, totalDetails, numOfPages: noOfPages });
  } else {
    console.log(`something went wrong`);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "something went wrong" });
  }
};

const updateStatus = async (req, res) => {
  const { id: statusId } = req.params;
  const { status } = req.body;
  console.log(req.body, statusId);
  // console.log(statusId);
  //---------------
  const roleId = req.emp.empId; //_id
  const gotRole = await userModal.findById({ _id: roleId });
  console.log("gotRole");

  const empId = req.employeeId.empId; //for empId
  console.log("ID... ", empId, "gotRole.empId", gotRole.empId);
  const access = (gotRole, empId) => {
    let queryObject = {};
    if (gotRole.role == "Admin") {
      let getAdm = { adminId: empId, createdFor: statusId };

      // let result = DepartmentDetails.find(getAdm);
      queryObject = getAdm;
    } else if (gotRole.role == "stateAdmin") {
      try {
        let getEmp = {
          empId: empId,
          createdFor: statusId,
          role: "Employee",
          state: gotRole.state,
        }; //state: gotRole.state, role: "Employee"
        queryObject = getEmp;
      } catch (error) {
        throw new UnAuthenticatedError("cannot find single record");
      }
      // let result = DepartmentDetails.find(getEmp);
    }
    return queryObject;
  };
  //----------------
  const queryObject = access(gotRole, empId);
  // const details = await leaveDetailsModal.find({ createdFor: statusId });
  const details = await leaveDetailsModal.find(queryObject);
  console.log("details length", details.length, details);

  console.log("lastdetails", details[details.length - 1]);

  if (details === null) {
    throw new NotFoundError(`no leave details with id found`);
  }
  const detailsLength = details.length;

  const { totalDays } = details[details.length - 1]; //taken last totaldays
  const { _id } = details[details.length - 1]; //0
  const { balanceleaveDays } = details[details.length - 1]; //0
  const { leaveTaken } = details[details.length - 1]; //0
  const { defaultLeavePerYear } = details[details.length - 1]; //0
  const { count } = details[0];
  console.log(balanceleaveDays, totalDays, detailsLength);

  //lastprevious content

  /*
  TODO for count == 1
  */
  // if (count == 1) {
  //   let changelevdet = details[details.length - 2]; //last first leave details this is for reference in current one

  //   let lastLevTaken = details[details.length - 2].leaveTaken;
  //   if (changelevdet == undefined) {
  //     let result = (changelevdet = 0);
  //     return result;
  //   }
  //   console.log(result);
  //   return lastLevTaken
  // }
  if (details === null) {
    throw new NotFoundError(`no leave details with id found`);
  }

  // update details
  const updateDetail = await leaveDetailsModal.findOneAndUpdate(
    {
      _id,
    },

    req.body,
    { new: true, runValidators: true }
  );

  //TODO: cleared

  if (count == 0 || (count == 0 && detailsLength <= 1)) {
    // const preBalanceLeaveDays = details[details.length - 2].balanceleaveDays;

    let leaveTakenCalc = leaveTaken + totalDays; //leave taken per year
    let balanceleaveDaysCalc = defaultLeavePerYear - leaveTakenCalc;

    console.log("calculation", leaveTakenCalc, balanceleaveDaysCalc);

    if (status == "approved" && balanceleaveDays > 0) {
      //&& balanceleaveDays > 0
      console.log("flag 1");
      console.log(req.body);
      const updateDetail = await leaveDetailsModal.findByIdAndUpdate(
        {
          _id,
        },

        { count: 1 },
        { new: true, runValidators: true }
      );
      req.body.balanceleaveDays = balanceleaveDaysCalc;
      req.body.leaveTaken = leaveTakenCalc;

      // req.body.balanceleaveDays = balanceleaveDays;
      // req.body.leaveTaken = leaveTaken;
      const balanceleaveDays = await modal
        .findOneAndUpdate(
          {
            _id,
          },

          req.body,
          { new: true, runValidators: true }
        )
        .exec();

      console.log(
        balanceleaveDaysCalc,
        leaveTakenCalc,
        "result:",
        balanceleaveDays
      );

      res.status(StatusCodes.OK).json({ balanceleaveDays });
    }
  } else if (status == "approved" && count == 1 && detailsLength > 1) {
    //&& preBalanceLeaveDays > 0
    const preBalanceLeaveDays = details[details.length - 2].balanceleaveDays;
    const lastLevTaken = details[details.length - 2].leaveTaken;
    // const preBalanceLeaveDays = details[details.length - 2].balanceleaveDays;

    // let lastLevTaken = details[details.length - 2].leaveTaken;
    let leaveTakenCalc = lastLevTaken + totalDays; //leave taken per year
    let balanceleaveDaysCalc = defaultLeavePerYear - leaveTakenCalc;

    if (status == "approved" && preBalanceLeaveDays > 0) {
      //&& balanceleaveDays > 0
      console.log("flag 2.1");
      console.log(req.body);
      const updateDetail = await leaveDetailsModal.findByIdAndUpdate(
        {
          _id,
        },

        { count: 1 },
        { new: true, runValidators: true }
      );
      req.body.balanceleaveDays = balanceleaveDaysCalc;
      req.body.leaveTaken = leaveTakenCalc;

      // req.body.balanceleaveDays = balanceleaveDays;
      // req.body.leaveTaken = leaveTaken;
      const balanceleaveDays = await modal
        .findOneAndUpdate(
          {
            _id,
          },

          req.body,
          { new: true, runValidators: true }
        )
        .exec();

      console.log(
        balanceleaveDaysCalc,
        leaveTakenCalc,
        "result:",
        balanceleaveDays
      );

      res.status(StatusCodes.OK).json({ balanceleaveDays });
    } else if (
      status == "approved" &&
      preBalanceLeaveDays <= 0 &&
      lastLevTaken >= 12
    ) {
      // balanceleaveDays == 12 && leaveTaken == 0;
      console.log("flag 2.2");

      /*
    if balanceleavedays is less than 0:
    if that month  finished 
      values =  balanceleavedays = 0; leaveTaken = 12; paymentSuccess = 1;
    if !that month not end.
      values = balanceleavedays = ...; leaveTaken = ...; paymentSuccess = 1;
    */

      /*
      In salary controllers if that month ended the balanceleave should be go to exceed_leave_taken
      if done.. balanaceleave and leavetaken will be reseted 
      --> how: cmp -> thismonth last day + today; balanceleave values goto exceed_leave_taken
               nextmonth begin the balanceleave and leavetaken should be reseted like 0, 12

      */

      let dateObj = new Date();
      let today = newdate.format(dateObj, "YYYY/M/DD");
      //use dateobj.transform
      console.log(today);
      //date
      let dates = new Date();
      //this month first date
      let getMonthfirstDate = new Date(
        dates.getFullYear(),
        dates.getMonth(),
        1
      );
      //this month last date
      let getMonthlastDate = new Date(
        dates.getFullYear(),
        dates.getMonth() + 1,
        0
      );

      let monthFirstDate = newdate.format(getMonthfirstDate, "YYYY/M/DD");
      let monthLastDate = newdate.format(getMonthlastDate, "YYYY/M/DD");

      //CLEARED

      console.log("monthlastDate", monthLastDate);

      //put statusID and salaryDetails emp id should  be same
      const getPaymentdetails = await salaryDetails.findOne({
        createdFor: statusId,
      });
      console.log("gp", getPaymentdetails);

      //data flow
      if (today >= monthFirstDate && getPaymentdetails.paymentSuccess == 0) {
        //today >= monthLastDate and paymentsuccess:  0
        console.log("flag 3.1");

        if (
          today >= details[details.length - 1].nextMonth &&
          getPaymentdetails.paymentSuccess == 0 &&
          details.balanceleaveDays <= 0 &&
          details.leaveTaken >= 12
        ) {
          /*today >= next month starts and payment == 0
        
        do: balance:0, leaveTaken : 12
        //exceed can send goes to save
        */
          /*nextmonth: last month saves in db then today meets>= lastmonth  all are reset
       then nextmonth also reset in db 
       */

          const reset = await modal.findOneAndUpdate(
            {
              _id,
            },
            {
              balanceleaveDays: 0,
              leaveTaken: 12,
              nextMonth: monthLastDate,
              // exceedLeave: 0,
            }
          );

          console.log("updateDetail", updateDetail);
          return res.status(StatusCodes.OK).json({ updateDetail });
        }
        const preBalanceLeaveDays =
          details[details.length - 2].balanceleaveDays;
        const lastLevTaken = details[details.length - 2].leaveTaken;
        let leaveTakenCalc = lastLevTaken + totalDays; //leave taken per year
        let balanceleaveDaysCalc = defaultLeavePerYear - leaveTakenCalc;
        const leaveTakenDB = await modal.findOneAndUpdate(
          {
            _id,
          },
          {
            balanceleaveDays: balanceleaveDaysCalc,
            leaveTaken: leaveTakenCalc,
            exceedLeave: Math.abs(balanceleaveDaysCalc),
          }
        );

        console.log("leaveTakenDB", leaveTakenDB);
        return res.status(StatusCodes.OK).json({ updateDetail });
      } else if (
        today >= monthFirstDate &&
        getPaymentdetails.paymentSuccess == 1
      ) {
        console.log("flag 3.2");

        //today >= monthFirstDate
        //reset
        const reset = await modal.findOneAndUpdate(
          {
            _id,
          },
          {
            exceedLeave: 0,
          }
        );

        const resetPaymentSuccess = await salaryDetails.findOneAndUpdate(
          {
            _id: statusId,
          },
          {
            paymentSuccess: 0,
          }
        );
        //payment changed 0
        return res.status(StatusCodes.OK).json({ updateDetail });
      }
    }
  } else if (
    (status == "declined" && details == null) ||
    (status == "declined" && details.length > 1)
  ) {
    //&& details == null) ||(status == "declined" && details > 1)
    console.log("flag 4");
    const preBalanceLeaveDays = details[details.length - 2].balanceleaveDays;
    const lastLevTaken = details[details.length - 2].leaveTaken;
    const predetails = await modal.findByIdAndUpdate(
      {
        _id,
      },
      {
        balanceleaveDays: preBalanceLeaveDays,
        leaveTaken: lastLevTaken,
      }
    );
    console.log(preBalanceLeaveDays, lastLevTaken, predetails);
    return res.status(StatusCodes.OK).json({ predetails });
  } else {
    console.log("flag 0");
    console.log("something went wrong");
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "something went wrong" });
  }
};

export { getAllDetailsAdmin, updateStatus };
