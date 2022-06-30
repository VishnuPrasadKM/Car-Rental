const express = require('express')
const router = express.Router();
const Booking= require("../models/bookingModel")
const Car = require("../models/carModel")
router.post("/bookcar", async(req, res)=>{
    req.body.transactionId="1234"
    try {
        const newbooking=new Booking(req.body)
        await newbooking.save()
        res.send("Your booking is Successfull")
    } catch (error) {
        return res.status(400).json(error);
        console.log(error);
    }
})

module.exports = router