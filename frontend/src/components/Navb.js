import React, { useState, useEffect } from "react";
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Navb() {
  const navigate = useNavigate();
  const count = useSelector(state => state.count)
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setInterval(() => {
      if (localStorage.getItem("login")) {
        setLogin(true);
        
      } else {
        setLogin(false);
      }
    }, 100);
  }, []);
  const logouthandler = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("index");
    localStorage.removeItem("_token");
    navigate("/");
  };
  
  return (
    <div>
      <Container>
        <Navbar collapseOnSelect expand="lg" bg="light">
          <Container>
            <Navbar.Brand href="#home">Pizza App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" style={{ textDecoration: "none" }}>
                  Home
                </Nav.Link>
                {login &&
                 <Nav.Link
                 as={Link}
                 to="/dashboard"
                 style={{ textDecoration: "none" }}
               >
                 Menu
               </Nav.Link>
                }
               

               
              </Nav>
              <Nav className="mr-9">
                
                {login ? (
                  <span>
                  <Row>
                    <Col>
                    <Button variant="light">
                    <NavDropdown title="Profile" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/getorders" style={{ textDecoration: "none" }}>Orders</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile" style={{ textDecoration: "none" }}>Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/updateprofile" style={{ textDecoration: "none" }}>Update Profile</NavDropdown.Item>
                  
                  
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                    </Button>
                   
                    </Col>
                    <Col>
                    <Nav.Link>
                      <Button
                         onClick={() => navigate("/cart")}
                        variant="outline-dark"
                      > Cart {count!=0 && count}
                      </Button>
                    </Nav.Link>
                    </Col>
                    
                    <Col>
                    <Nav.Link>
                      <Button
                        onClick={() => logouthandler()}
                        variant="outline-dark"
                      >LogOut
                      </Button>
                    </Nav.Link>
                    </Col>
                  </Row>
                </span>
                  
                    
                  
                ) : (
                  <span>
                    <Row>
                      <Col>
                        <Nav.Link>
                          <Button
                            onClick={() => navigate("/signup")}
                            variant="outline-dark"
                          >
                            Signup
                          </Button>
                        </Nav.Link>
                      </Col>
                      <Col>
                        <Nav.Link>
                          <Button
                            onClick={() => navigate("/login")}
                            variant="outline-dark"
                          >
                            LogIn
                          </Button>
                        </Nav.Link>
                      </Col>
                    </Row>
                  </span>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}
