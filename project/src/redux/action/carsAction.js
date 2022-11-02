import axios from "axios";
import { message } from "antd";

export const getCars = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/cars/getcars");
    dispatch({ type: "GET_ALL_CARS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const addCar = (reqObj) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5000/cars/addcar", reqObj);
    message.success("New car added successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

export const editCar = (reqObj) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5000/cars/editcar", reqObj);
    message.success("Car details updated successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCar = (reqObj) => async (dispatch) => {
  try {
    await axios.delete("http://localhost:5000/cars/removecar/" + reqObj.carid);
    message.success("Car deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
  }
};
