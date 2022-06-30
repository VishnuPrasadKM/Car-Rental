const express = require('express')
const router = express.Router()
const Users = require("../models/userModel")

router.post("/login", async (req, res) => {

    const {username, password}=req.body
    try {
        const user = await Users.findOne({username,password})
        if(user) {res.send(user)}
        else{
            return res.status(400).json(error)
        }
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.post("/register", async (req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.send("User registered Successfully")
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;