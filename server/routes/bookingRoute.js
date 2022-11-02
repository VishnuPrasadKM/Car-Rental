const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const stripe = require("stripe")(
  "sk_test_51LIXAsSBLyA07gC81DW5dqO5NDnbU2jd2gejhubnOVExkPJ2joG7coeFUrEY8aUVU8AhrYzLR2X5hEoB0pYDp3Jq00VME90S30"
);

router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    var paymentObject = {};
    (paymentObject.amount = req.body.totalAmount * 100),
      (paymentObject.currency = "USD");
    paymentObject.payment_method_types = ["card"];
    paymentObject.receipt_email = token.email;
    paymentObject.customer = customer.id;
    const payment = await stripe.paymentIntents.create(paymentObject);

    if (payment) {
      req.body.transactionId = payment.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await car.save();
      res.send("Your booking is Successfull");
    } else {
      res.send("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/user/:userid", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userid }).populate(
      "car"
    );
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
