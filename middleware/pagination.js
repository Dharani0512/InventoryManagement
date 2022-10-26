const pagination = async (req, res, model, result, queryObject) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const details = await result;

  const totalDetails = await model.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalDetails / limit);
  return { details, totalDetails, numOfPages };
};

export default pagination;
