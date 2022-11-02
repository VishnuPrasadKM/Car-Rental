import { Container, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  let userString = JSON.stringify(user);
  let firstIndex = userString.indexOf("username") + 11;
  let lastIndex = userString.indexOf(`"email":`) - 2;
  let username = userString.substring(firstIndex, lastIndex);
  const isAdmin = JSON.parse(localStorage.getItem("admin"));
  return (
    <div>
      <div className="header boxShadow2">
        <Container>
          <div className="d-flex justify-content-between">
            <h1 id="logo">
              <a onClick={() => navigate("/home")}>Car Rental</a>
            </h1>
            <Dropdown className="dropdown">
              <Dropdown.Toggle className="btn2">{username}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/home");
                  }}
                >
                  Home
                </Dropdown.Item>
                {isAdmin && (
                  <Dropdown.Item
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/admin");
                    }}
                  >
                    Admin Panel
                  </Dropdown.Item>
                )}
                {!isAdmin && (
                  <Dropdown.Item
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/userbookings");
                    }}
                  >
                    Bookings
                  </Dropdown.Item>
                )}
                {isAdmin && (
                  <Dropdown.Item
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/carbooking");
                    }}
                  >
                    Bookings
                  </Dropdown.Item>
                )}
                <Dropdown.Item
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Navbar;
