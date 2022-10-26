import { StatusCodes } from "http-status-codes";
import locationSettings from "../../models/settings/locationSettings.js";

const createLocation = async (req, res) => {
  const details = await locationSettings.create(req.body);

  res.status(StatusCodes.CREATED).json({ details });
};

const getAllLocation = async (req, res) => {
  const items = await locationSettings.find({});
  const details = items.map((item) => {
    return item.listOfLocation;
  });
  res.status(StatusCodes.OK).json(details);
};

const deleteLocation = (req, res) => {};

export { createLocation, getAllLocation, deleteLocation };
