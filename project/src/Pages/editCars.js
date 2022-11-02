import { Col, Row, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCar, getCars } from "../redux/action/carsAction";

import { TbArrowBackUp } from "react-icons/tb";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function EditCar({ match }) {
  let navigate = useNavigate();
  const location = useLocation();
  const carId = location.pathname.split("/")[2];
  console.log("carId " + carId);
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const [car, setcar] = useState();
  const [totalcars, settotalcars] = useState([]);
  const isAdmin = JSON.parse(localStorage.getItem("admin"));
  useEffect(() => {
    if (isAdmin == false) {
      message.error("You Don't Have the Admin Permission");
    }
  }, []);
  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getCars());
    } else {
      settotalcars(cars);
      setcar(cars.find((o) => o._id === carId));
    }
  }, [cars]);

  function onFinish(values) {
    values._id = car._id;
    dispatch(editCar(values));
  }

  return (
    <div style={{ backgroundColor: "#7cfcd13a" }}>
      <Navbar />
      <div className="pt-2">
        <button className="btn2 rounded" onClick={() => navigate("/admin")}>
          Back <TbArrowBackUp />
        </button>
      </div>
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          {totalcars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-2 rounded"
              layout="vertical"
              onFinish={onFinish}
              style={{ background: "wheat" }}
            >
              <h3>Edit Car</h3>

              <hr />
              <Form.Item
                name="name"
                label="Car name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image url"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <div className="text-right ">
                <button className="btn2 rounded">Update Car</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default EditCar;
