import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../redux/action/carsAction";
import { Row, Col } from "react-bootstrap";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

function Home() {
  const navigate = useNavigate();

  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, []);

  const [totalCars, setTotalcars] = useState([]);
  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  function setFilter(values) {
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var temp = [];
    for (var car of cars) {
      if (car.bookedTimeSlots.length == 0) {
        temp.push(car);
      } else {
        const alreadyBookedSlots = car.bookedTimeSlots.filter(
          (slot) =>
            !(
              (slot.from >= selectedFrom && slot.to > selectedTo) ||
              (slot.from < selectedFrom && slot.to <= selectedTo)
            )
        );
        if (alreadyBookedSlots.length === 0) {
          temp.push(car);
        }
      }
    }
    setTotalcars(temp);
  }

  return (
    <div>
      <Navbar />
      <Row className="home">
        <Col span={12} className="justify-content-end pt-4 px-4 mx-2">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onClick={setFilter}
          />
          <button
            className="btn2 rounded mx-3"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </Col>
        {/* </Row> */}
        <Row justify="center" className="px-3" style={{ margin: "0 2px" }}>
          {totalCars.map((car, index) => {
            return (
              <Col key={index} className="colAlign">
                <div className="car p-2 boxShadow1 mt-3 justify-content-around rounded">
                  <div className="imgAlign">
                    <img
                      className="rounded carimg "
                      src={car.image}
                      alt={car.name}
                    />
                  </div>
                  <div className="car-content d-flex align-items-center justify-content-between">
                    <div>
                      <p>{car.name}</p>
                      <p>Rent: Rs {car.rentPerHour} /Hour</p>
                    </div>
                    <div>
                      <button
                        className="mr-2 btn"
                        onClick={() => navigate(`/booking/${car._id}`)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Row>
      <br />
      <Footer />
    </div>
  );
}

export default Home;
