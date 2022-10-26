const sendDetails = async (
  req,
  obj,
  queryArr,
  queryName,
  sortOptions,
  sortName,
  modal,
  sort,
  filter,
  filterValue
) => {
  let details, totalDetails, numOfPages;
  let queryObject = obj;

  //   trail

  for (let i = 0; i < queryArr.length; i++) {
    if (queryArr[i]) {
      let value = queryArr[i];
      let name = queryName[i];

      queryObject[name] = { $regex: value, $options: "i" };
    }
  }
  if (filter) {
    if (filter !== "all") {
      queryObject[filterValue] = { $regex: filter };
    }
  }
  // No await
  let result = modal.find(queryObject);

  // chain sort conditions

  // dynamic sort
  for (let i = 0; i < sortOptions.length; i++) {
    if (sort === sortOptions[i]) {
      result = result.sort(sortName[i]);
    }
  }
  // // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  details = await result;

  totalDetails = await modal.countDocuments(queryObject);
  numOfPages = Math.ceil(totalDetails / limit);
  return [details, totalDetails, numOfPages];
};

export default sendDetails;

//   const [search, employeeDetailsId] = queryArr;

//   console.log(queryObject);
//   if (search) {
//     queryObject.name = { $regex: search, $options: "i" };
//   }
//   if (employeeDetailsId) {
//     queryObject.employeeId = { $regex: employeeDetailsId, $options: "i" };

// add stuff based on condition
//   queryArr.map((item) => {
//     if (item) {
//       console.log(item);
//       queryObject.search = { $regex: item, $options: "i" };
//     }
//   });
//   }
