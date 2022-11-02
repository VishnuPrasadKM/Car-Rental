const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

router.get("/getcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addcar", async (req, res, next) => {
  const { name, image, capacity, fuelType, bookedTimeSlots, rentPerHour } =
    req.body;
  let newCar;
  try {
    newCar = new Car({
      name,
      image,
      capacity,
      fuelType,
      bookedTimeSlots,
      rentPerHour,
    });
    await newCar.save();
    console.log("suuccess.." + newCar);
    res.send("Car added Successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/editcar", async (req, res) => {
  const { _id, name, image, capacity, fuelType, bookedTimeSlots, rentPerHour } =
    req.body;
  let car;
  try {
    car = await Car.findByIdAndUpdate(_id, {
      name,
      image,
      capacity,
      fuelType,
      bookedTimeSlots,
      rentPerHour,
    });
    car = await car.save();
    res.send("Car details updated Successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.delete("/removecar/:carid", async (req, res) => {
  let car;
  try {
    car = await Car.findByIdAndDelete(req.params.carid.toString().trim());
    res.send({ message: "Car successfully removed", car });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
