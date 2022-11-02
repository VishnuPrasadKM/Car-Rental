import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj) => async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/login",
      reqObj
    );
    let adminid = "62c69cb7b6b11c8ed5d512a2";
    if (response.data.user._id !== adminid) {
      window.localStorage.setItem("admin", false);
    } else {
      console.log(typeof response.data.user._id);
      window.localStorage.setItem("admin", true);
    }
    localStorage.setItem("user", JSON.stringify(response.data.user));
    message.success("Login Success");
    setTimeout(() => {
      window.location.href = "/home";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
  }
};

export const userRegister = (reqObj) => async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/register",
      reqObj
    );
    message.success("Registration Successful");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
  }
};
