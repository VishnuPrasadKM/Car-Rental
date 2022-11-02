import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../redux/action/carsAction";
import { useLocation } from "react-router-dom";
import { Row, Col, Divider, DatePicker, Checkbox, Button, Modal } from "antd";
import moment from "moment";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { bookCar } from "../redux/action/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const { RangePicker } = DatePicker;
function Booking() {
  const location = useLocation();
  const carId = location.pathname.split("/")[2];

  const { cars } = useSelector((state) => state.carsReducer);
  const [car, setCar] = useState({});

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const isAdmin = JSON.parse(localStorage.getItem("admin"));

  const dispatch = useDispatch();
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getCars());
    } else {
      setCar(cars.find((o) => o._id == carId));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 100 * totalHours);
    }
  }, [driver, totalHours]);

  function disabledPastDate(current) {
    return (
      moment().add(-1, "days") >= current || moment().add(1, "month") <= current
    );
  }

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy, HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy, HH:mm"));
    if (values[1].diff(values[0], "hours") == 0) {
      setTotalHours(values[1].diff(values[0], "hours") + 1);
    } else {
      setTotalHours(values[1].diff(values[0], "hours"));
    }
  }

  const user = JSON.parse(localStorage.getItem("user"));

  function checkSlotAndBooking() {
    const alreadyBookedSlots = car.bookedTimeSlots.filter(
      (slot) =>
        !(
          (slot.from >= from && slot.to > to) ||
          (slot.from < from && slot.to <= to)
        )
    );
    if (alreadyBookedSlots.length === 0) {
      document.getElementById("bookingslotcheck").click();
    } else {
      alert(
        "Car is not available for the selected time interval, please check available slots."
      );
    }
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: user._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookCar(reqObj));
  }

  return (
    <div>
      <Navbar />
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "86vh" }}
      >
        <Col lg={10} sm={24} xs={24} style={{ width: "50%" }}>
          <img
            src={car.image}
            data-aos="zoom-in"
            className="boxShadow1 bookcarimg"
          />
        </Col>

        <Col
          lg={10}
          sm={24}
          xs={24}
          style={{ width: "45%", textAlign: "right" }}
        >
          <Divider type="horizontal" plain>
            <h4>Car information</h4>
          </Divider>
          <div className="bookcarinfo">
            <h6>
              <b>{car.name}</b>
            </h6>
            <h6>
              Type:<b> {car.fuelType}</b>
            </h6>
            <h6>
              Max Persons:<b> {car.capacity}</b>
            </h6>
          </div>
          <Divider type="horizontal" plain>
            <h4>Select Time Slot</h4>
          </Divider>
          <div className="bookcartime">
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="MMM DD yyyy HH:mm"
              onChange={selectTimeSlots}
              disabledDate={(current) => disabledPastDate(current)}
            />
            <br />
            <button
              className="btn2 mt-2"
              onClick={() => {
                setShowModal(true);
              }}
            >
              See Booked Slots
            </button>
          </div>
          <div className="bookcarinfo">
            <h6>
              Total Hours: <b>{totalHours} </b>
            </h6>
            <h6>
              Rent: Rs <b>{car.rentPerHour} </b>/ Hour
            </h6>

            <Checkbox
              style={{ color: "black" }}
              onChange={(e) => {
                if (e.target.checked) {
                  setDriver(true);
                } else {
                  setDriver(false);
                }
              }}
            >
              <h6>Driver Required</h6>
            </Checkbox>
          </div>
          <div className="bookingcartotal">
            <h6 className="display-6">
              Total Amount: {isNaN(totalAmount) ? 0 : totalAmount}
            </h6>
            <Button onClick={checkSlotAndBooking}>Book Now</Button>
            <StripeCheckout
              shippingAddress
              amount={totalAmount * 100}
              currency="INR"
              token={onToken}
              stripeKey="pk_test_51LIXAsSBLyA07gC8BCFEmzqnv17znGqgKGxUYaooavgEqCdw14oJ7R6PSYYwNo31uEnjHE1jAfjEmsoHeolQ0fVy00giTfXaa9"
            >
              <button style={{ display: "none" }} id="bookingslotcheck">
                t2
              </button>
            </StripeCheckout>
          </div>
        </Col>
        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn2 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn2"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
      <Footer />
    </div>
  );
}

export default Booking;
