import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Error from "./Pages/error";
import BookingCar from "./Pages/bookingCarPage";
import UserBookings from "./Pages/userBookings";
import Bookings from "./Pages/allBookings";
import AddCar from "./Pages/addCar";
import AdminHome from "./Pages/adminHome";
import EditCar from "./Pages/editCars";
import PrivateRoutes from "./context/AuthProvider";
import AdminRoute from "./context/AdminChecker";
import "antd/dist/antd.css";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/booking/:carid" element={<BookingCar />} />
            <Route path="/userbookings" element={<UserBookings />} />
            {/* Admin Route */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/carbooking" element={<Bookings />} />
              <Route path="/addcar" element={<AddCar />} />
              <Route path="/editcar/:carid" element={<EditCar />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
