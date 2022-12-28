const mongoose = require("mongoose");
const Car = require("../models/Car");
const { sendResponse, AppError } = require("../helpers/utils.js");
const carController = {};

const carTypes = [
  "MANUAL",
  "AUTOMATIC",
  "AUTOMATED_MANUAL",
  "DIRECT_DRIVE",
  "UNKNOWN",
];

const carStyles = [
  "2dr Hatchback",
  "2dr SUV",
  "4dr Hatchback",
  "4dr SUV",
  "Cargo Minivan",
  "Cargo Van",
  "Convertible",
  "Convertible SUV",
  "Coupe",
  "Crew Cab Pickup",
  "Passenger Minivan",
  "Passenger Van",
  "Regular Cab Pickup",
  "Sedan",
  "Wagon",
];

const carMake = [
  "Acura",
  "Aston Martin",
  "Audi",
  "BMW",
  "Bentley",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "FIAT",
  "Ferrari",
  "Ford",
  "GMC",
  "HUMMER",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Maserati",
  "Maybach",
  "Mazda",
  "Mercedes-Benz",
  "Mitsubishi",
  "Nissan",
  "Oldsmobile",
  "Plymouth",
  "Pontiac",
  "Porsche",
  "Rolls-Royce",
  "Saab",
  "Scion",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

carController.createCar = async (req, res, next) => {
  const { make, model, price, release_date, size, style, transmission_type } =
    req.body;

  try {
    // YOUR CODE HERE
    if (
      !make ||
      !model ||
      !price ||
      !release_date ||
      !size ||
      !style ||
      !transmission_type
    )
      throw new AppError(402, "Bad Request", "Create Car Error");

    if (!carMake.includes(make)) {
      const error = new Error("Car does not exit");
      error.statusCode = 404;
      throw error;
    }

    if (price < 2000) {
      const error = new Error("Car's price is too low");
      error.statusCode = 404;
      throw error;
    }

    if (!carTypes.includes(type)) {
      const error = new Error("Type of car does not exit");
      error.statusCode = 404;
      throw error;
    }

    if (!carStyles.includes(style)) {
      const error = new Error("Style of car does not exit");
      error.statusCode = 404;
      throw error;
    }
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
  console.log("first", targetId);
  const { make, model, price, release_date, size, style, transmission_type } =
    req.body;
  console.log(
    "second",
    make,
    model,
    price,
    release_date,
    size,
    style,
    transmission_type
  );
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query

    if (
      !targetId ||
      !make ||
      !model ||
      !price ||
      !release_date ||
      !size ||
      !style ||
      !transmission_type
    ) {
      const error = new Error("Missing required data.");
      error.statusCode = 404;
      throw error;
    }

    if (!Car.findById(targetId)) {
      const error = new Error("Car does not exists.");
      error.statusCode = 500;
      throw error;
    }

    if (!carMake.includes(make)) {
      const error = new Error("Car's brand does not exit");
      error.statusCode = 404;
      throw error;
    }

    if (price < 2000) {
      const error = new Error("Car's price is too low");
      error.statusCode = 404;
      throw error;
    }

    if (!carTypes.includes(type)) {
      const error = new Error("Type of car does not exit");
      error.statusCode = 404;
      throw error;
    }

    if (!carStyles.includes(style)) {
      const error = new Error("Style of car does not exit");
      error.statusCode = 404;
      throw error;
    }

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
    if (!targetId) {
      const error = new Error("Missing required data.");
      error.statusCode = 404;
      throw error;
    }
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
