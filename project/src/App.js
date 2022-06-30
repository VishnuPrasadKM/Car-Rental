import React from 'react'
import './App.css'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from './Pages/home';
import Login from './Pages/login';
import Register from './Pages/register';
import Error from './Pages/error';
import BookingCar from './Pages/bookingCarPage';
import Welcome from "./Pages/Welcome";
import 'antd/dist/antd.css';


const App = () => {
  return (
    <div className='App'>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path='/bookingcar' exact element={<BookingCar />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App