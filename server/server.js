const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// app.use(express.static(path.join(__dirname, "../project/build")));

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to Mongodb"))
  .then(() => {
    app.listen(port);
    console.log(`Server is connected at port ${port}`);
  })
  .catch((error) => console.log("Mongodb connection failed", error));

app.use("/cars", require("./routes/carsRoute"));
app.use("/users", require("./routes/usersRoute"));
app.use("/bookings", require("./routes/bookingRoute"));
app.get("/", (req, res) =>
  res.send(`Available routes on this port ${port}
        1.cars
        2.users
        3.bookings`)
);
