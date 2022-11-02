import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/action/bookingActions";
import { Col, Row } from "antd";
import Navbar from "../Components/Navbar";
import moment from "moment";
function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings(user._id));
  }, []);

  return (
    <div className="bookings">
      <Navbar />
      <h3 className="text-center mt-2 display-5">Bookings</h3>

      <Row
        justify="center"
        gutter={16}
        style={{ marginLeft: "0", marginRight: "0" }}
      >
        <Col lg={16} sm={24}>
          {bookings.map((booking) => {
            return (
              <Row
                style={{ marginLeft: "0", marginRight: "0" }}
                className="boxShadow2 mt-3 text-left rowedit"
              >
                <Col lg={10} sm={24} className="colStyle">
                  <p>
                    <b>{booking.car.name}</b>
                  </p>
                  <p>
                    User Id : <b>{booking.user}</b>
                  </p>
                  <p>
                    Total hours : <b>{booking.totalHours}</b>
                  </p>
                  <p>
                    Total amount : <b>{booking.totalAmount}</b>
                  </p>
                </Col>

                <Col lg={14} sm={24} className="colStyle">
                  <p>
                    Transaction Id : <b>{booking.transactionId}</b>
                  </p>
                  <p>
                    From: <b>{booking.bookedTimeSlots[0].from}</b>
                  </p>
                  <p>
                    To: <b>{booking.bookedTimeSlots[0].to}</b>
                  </p>
                  <p>
                    Date of booking:{" "}
                    <b>{moment(booking.createdAt).format("MMM DD yyyy")}</b>
                  </p>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}

export default UserBookings;
