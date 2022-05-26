import React from "react";
import { Nav, Navbar, Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
  return (
    <div className="m-5">
      <Container className="text-start  bg-light ">
        <Row className=" m-3 p-5 ">

          <h1 className="mb-4" >Pizza Delivery</h1>
          
          <p>Welcome to pizza delivery service. This is the place when you may chose the most delicious pizza you like from wide variety of options!</p>
          <hr />
          <p className="fw-bold">we're performing delivery free of charge in case if your order is higher than 300</p>
          <Button  onClick={() => navigate("/signup")} variant="secondary allign-center mt-10" size="lg">
            Sign In and Order
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
