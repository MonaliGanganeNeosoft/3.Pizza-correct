import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutOrder } from "../config/Myservice";
import { Container, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState();
  const [cardnum, setCardnum] = useState();
  const [uid, setUid] = useState("");
  const [checkoutdone, setCheckoutdone] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getcart = JSON.parse(localStorage.getItem("cart"));

    if (getcart) {
      setCart(getcart);
      let total = 0;

      setTotal(total);
      totalcalc();
      const count = cart
        .map((item) => Number(item.quantity))
        .reduce((prev, curr) => prev + curr, 0);
      console.log("count" + count);
      dispatch({ type: "count", payload: count });
    }
  }, []);
  const totalcalc = () => {
    let getcart = JSON.parse(localStorage.getItem("cart"));
    let total = 0;
    getcart.forEach((data) => {
      total = total + data.quantity * data.price;
    });
    console.log(total);
    setTotal(total);
  };

  const checkout = () => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode.uid);
      setUid(decode.uid);
      let uid=decode.uid
    checkoutOrder({ cart, total, cardnum,uid  }).then((res) => {
      console.log(res.data);
    });
    localStorage.removeItem("cart");
    setCheckoutdone(true);
    }
    
  };

  if (!checkoutdone) {
    return (
      <div className="text-start mt-5">
        <Container>
          <h2>Checkout</h2>
          <h5>Credit Card</h5>
          <input
            type="number"
            onChange={(e) => setCardnum(e.target.value)}
            className="form-control"
          />
          <br />
          <h5> Order Total: ₹{total}</h5>
          <Button variant="dark" size="lg" onClick={checkout}>
            Checkout
          </Button>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-start mt-5">
          <Container>
            <h2>Order has been placed successfully!</h2>

            <Alert variant="info">
              You will receive notification by email with order details.
            </Alert>

            <Button
              variant="dark"
              size="lg"
              onClick={() => navigate("/dashboard")}
            >
              Order More
            </Button>
          </Container>
        </div>
      </div>
    );
  }
}

export default Checkout;
