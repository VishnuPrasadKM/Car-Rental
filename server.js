const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors')
const express=require('express');
const app=express();

    const port = process.env.PORT || 5000

    mongoose.connect(process.env.dbUrl,
        { useUnifiedTopology: true, useNewUrlParser: true })
        .then(()=>console.log('Connected to Mongodb'))
            .then(()=>{
                app.listen(port)
                console.log(`Server is connected at port ${port}`)
            })
        .catch((error)=>console.log('Mongodb connection failed',error))

        app.use(express.json())
        app.use(cors())

        app.use('/cars', require('./routes/carsRoute'))
        app.use('/users', require('./routes/usersRoute'))
        app.use('/bookings', require('./routes/bookingRoute'))
        app.get('/', (req, res) => res.send(`Available routes on this port ${port}
        1.cars
        2.users
        3.bookings`))