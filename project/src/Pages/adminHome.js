import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { deleteCar, getCars } from "../redux/action/carsAction";
import { Col, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Popconfirm } from "antd";
import { Container } from "react-bootstrap";
import { RiShareForwardFill } from "react-icons/ri";
function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  return (
    <div>
      <Navbar />
      <div>
        <Container className="mt-3 d-flex justify-content-between">
          <h3 className="mt-1 mr-2">Admin Panel</h3>
          <button className="btn2 rounded" style={{ backgroundColor: "beige" }}>
            <a onClick={() => navigate("/addcar")}>
              Add Car <RiShareForwardFill />
            </a>
          </button>
        </Container>
        <br />

        <Row justify="center" style={{ margin: "0 2px" }}>
          {totalCars.map((car, index) => {
            return (
              <Col key={index} style={{ paddingBottom: "20px" }}>
                <div className="car p-2 boxShadow1 rounded removecar ">
                  <div className="imgAlign">
                    <img
                      src={car.image}
                      className="carimg rounded"
                      alt={car.name}
                    />
                  </div>

                  <div className="car-content align-items-center justify-content-between">
                    <div className="text-left pl-2 d-flex justify-content-between">
                      <p>{car.name}</p>
                      <p>Rs {car.rentPerHour}/ hour</p>
                    </div>
                    <div className=" d-flex justify-content-center">
                      <Link to={`/editcar/${car._id}`} className="px-4">
                        <AiOutlineEdit
                          className="mr-3"
                          style={{ color: "green", cursor: "pointer" }}
                        />
                      </Link>
                      <Popconfirm
                        title="Are you sure to delete this car?"
                        onConfirm={() => {
                          dispatch(deleteCar({ carid: car._id }));
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <AiOutlineDelete
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      </Popconfirm>
                      <br />
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default AdminHome;
