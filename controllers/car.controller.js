const mongoose = require("mongoose");
const Car = require("../models/Car");
const { sendResponse, AppError } = require("../helpers/utils.js");
const carController = {};

carController.createCar = async (req, res, next) => {
  const info = req.body;
  try {
    // YOUR CODE HERE
    if (!info) throw new AppError(402, "Bad Request", "Create Car Error");
    const created = await Car.create(info);
    sendResponse(res, 200, true, { car: created }, null, "Create Car Success");
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  const page = req.query.page ? req.query.page : 1;
  const filter = req.query.filter ? req.query.filter : {};

  try {
    // YOUR CODE HERE
    //mongoose query
    const listOfFound = await Car.find(filter).limit(Number(page) * 20);
    console.log("first", listOfFound.length);
    sendResponse(
      res,
      200,
      true,
      { cars: listOfFound, page: page, total: listOfFound.length },
      null,
      "Get Car List Successfully!"
    );
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication
  //you will also get updateInfo from req
  // empty target and info mean update nothing

  const targetId = req.params.id;
  const updateInfo = req.body;

  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);

    sendResponse(
      res,
      200,
      true,
      { car: updated },
      null,
      "Update Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

  // empty target mean delete nothing
  const targetId = req.params.id;

  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Car.findByIdAndDelete(targetId, options);

    sendResponse(
      res,
      200,
      true,
      { car: updated },
      null,
      "Delete Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
