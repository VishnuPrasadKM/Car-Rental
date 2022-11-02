import axios from "axios";
import { message } from "antd";

export const bookCar = (reqObj) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5000/bookings/bookcar", reqObj);

    message.success("Your Car booked successfully");
    setTimeout(() => {
      window.location.href = "/userbookings";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong , please try later");
  }
};

export const getAllBookings = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/bookings/getallbookings/"
    );
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserBookings = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/bookings/user/" + userId
    );
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
