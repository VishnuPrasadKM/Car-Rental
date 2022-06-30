const express = require('express')
const router = express.Router()
const Car = require("../models/carModel")


router.get("/getcars", async (req, res) => {
    try {
        const cars = await Car.find()
        res.send(cars)
        console.log(cars)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.post("/addcar", async (req, res,next) => {

    const { name, image, capacity, fuelType, bookedTimeSlots, rentPerHour } = req.body
    let newCar
    try {
        newCar = new Car({
            name,
            image,
            capacity, 
            fuelType,
            bookedTimeSlots, 
            rentPerHour
        })
        await newCar.save()
        res.send("Car added Successfully")
    } catch (error) {
        console.log(error)
    }
    if(!newCar) {return res.status(400).json(
        {message:'Unable to Add car'}
    )}
    return res.status(200).json({newCar});
});

router.post("/editcar", async (req, res) => {
    const { name, image, capacity, fuelType, bookedTimeSlots, rentPerHour } = req.body
    let car
    try {
        car = await Car.findByIdAndUpdate( _id,{ 
            name,
            image,
            capacity, 
            fuelType,
            bookedTimeSlots, 
            rentPerHour
        });
       car = await car.save()
        res.send("Car details updated Successfully")
    } catch (error) {
        console.log(error)
    }
    if(!car) {return res.status(404).json(
        {message:'Unable to updated car'}
    )}
    return res.status(200).json({car})
});

router.delete("/removecar/:id", async (req, res) => {

    let car
    try {
        car = await Car.findByIdAndDelete(req.params.id)
    } catch (error) {
        console.log(error)
    }
    if(!car) {return res.status(404).json(
        {message:'Unable to delete car'}
    )}
    return res.status(200).json({message:'Car successfully removed',car})
});

module.exports = router