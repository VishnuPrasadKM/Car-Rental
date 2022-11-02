import { Col, Row, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { addCar } from "../redux/action/carsAction";
import { TbArrowBackUp } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function AddCar() {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  function onFinish(values) {
    values.bookedTimeSlots = [];

    dispatch(addCar(values));
    console.log(values);
  }
  return (
    <div style={{ backgroundColor: "#7cfcd13a" }}>
      <Navbar />
      <div className="pt-2">
        <button className="btn2 rounded" onClick={() => navigate("/admin")}>
          Back <TbArrowBackUp />
        </button>
      </div>
      <Row justify="center mt-2">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form
            className="bs1 p-2 rounded"
            layout="vertical"
            onFinish={onFinish}
            style={{ background: "wheat" }}
          >
            <h3>Add New Car</h3>
            <hr />
            <Form.Item
              name="name"
              label="Car name"
              rules={[{ required: true }]}
            >
              <Input style={{ background: "white" }} />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image url"
              rules={[{ required: true }]}
            >
              <Input style={{ background: "white" }} />
            </Form.Item>
            <Form.Item
              name="rentPerHour"
              label="Rent per hour"
              rules={[{ required: true }]}
            >
              <Input style={{ background: "white" }} />
            </Form.Item>
            <Form.Item
              name="capacity"
              label="Capacity"
              rules={[{ required: true }]}
            >
              <Input style={{ background: "white" }} />
            </Form.Item>
            <Form.Item
              name="fuelType"
              label="Fuel Type"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <div className="text-right">
              <button className="btn2 rounded">
                Add Car <IoIosAddCircleOutline />
              </button>
            </div>
          </Form>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default AddCar;
