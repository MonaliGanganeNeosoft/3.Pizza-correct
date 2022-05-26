import React, { useEffect, useState,useRef } from "react";
import { getPizzaData } from "../config/Myservice";
import { Card, Button, Row, Container,Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLinkClickHandler } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [checkoutdone, setCheckoutdone] = useState(false);
  const refQuantity = useRef(null);
  const navigate = useNavigate();
  const [prodata, setProdata] = useState([]);
  const dispatch = useDispatch();
  const prod = useSelector((state) => state.prod);

  const arr = localStorage.getItem("mycart");

  const [total, setTotal] = useState(0);

  const arrquant = JSON.parse(localStorage.getItem("mycartquant"));
  const arrquant2 = localStorage.getItem("mycartquant");
 
  useEffect(() => {
    const getcart = JSON.parse(localStorage.getItem("cart"));
    if (getcart) {
      setCart(getcart);
      const count =  JSON.parse(localStorage.getItem("cart")).map(item => Number(item.quantity)).reduce((prev, curr) => prev + curr, 0);
      console.log("count"+count)
      dispatch({ type: "count", payload: count });
    }
    // if (arrquant) {
    //   let count = arrquant.reduce((a, b) => {
    //     return a + b;
    //   });
    //   dispatch({ type: "count", payload: count });
    // }
    
    // getPizzaData().then((res) => {
    //   if (res.data.err == 0) {
    //     setProdata(res.data.data);
    //     if(arrquant){
    //         let count = arrquant.reduce((a, b) => {
    //             return a + b;
    //           });
    //           dispatch({ type: "count", payload: count })
    //     }

    //   }
    // });
    totalcalc()
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const count =  JSON.parse(localStorage.getItem("cart")).map(item => Number(item.quantity)).reduce((prev, curr) => prev + curr, 0);
      console.log("count"+count)
      dispatch({ type: "count", payload: count });
    totalcalc()
  }, [cart]);

  //   const totalcost=()=>{
  //     let total= 0
  //     let prodquant = 0
  //     let index = 0
  //       prodata.forEach((prod)=>{
  //           if(arr.includes(prod.id)){
  //               index = arr.indexOf(prod.id)
  //                prodquant=arrquant[index]
  //               total = total+ (prodquant * prod.price)
  //           }
  //           else{
  //               total=0
  //           }

  //       })
  //       setTotal(total)
  //   }
  //   totalcost()

  const cartDelete = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    const count = cart.map(item => Number(item.quantity)).reduce((prev, curr) => prev + curr, 0);
    console.log("count"+count)
    dispatch({ type: "count", payload: count });
  };
  const quantityChange=(e,i)=>{
    console.log(e.target.value)
    const updatedCart=cart
    updatedCart[i].quantity=e.target.value
    console.log(updatedCart)
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(cart));
    const count =  JSON.parse(localStorage.getItem("cart")).map(item => Number(item.quantity)).reduce((prev, curr) => prev + curr, 0);
    console.log("count"+count)
    dispatch({ type: "count", payload: count });
    totalcalc()
  }
  const totalcalc=()=>{
    let total=0
    cart.forEach((data)=>{
      total= total + (data.quantity*data.price)
    })
    console.log(total)
    setTotal(total)
  }
  const checkout=()=>{
    navigate("/checkout")
  }

  if (!checkoutdone) {
    return (
      <div className="mt-4">
        <Container>
        <Table striped bordered hover>
  <thead>
    
    <tr>
      <th>#</th>
      <th colSpan="2">Pizza</th>
      <th>Price</th>
      <th>Quantity</th>
    </tr>
  </thead>
  <tbody>
  {cart.map((cart,i)=>(
    
    <tr>
      <td>{i+1}</td>
      <td><img src={cart.image} width="70" height="70"></img></td>
      <td>{cart.pname}</td>
      <td> ₹{cart.price}</td>
      <td><input type="number" className="form-control"  onChange={(e)=>quantityChange(e,i)} ref={refQuantity} defaultValue={cart.quantity}/></td>
      
      <td><button className="btn btn-danger" onClick={()=>cartDelete(cart.id)}>Remove</button></td>
    </tr>
    
    
  ))}
  <tr>
      <td></td>
      <td colSpan="3"><h2>Total:  ₹{total}</h2></td>
      <td colSpan="2"><Button variant="dark" size="lg" onClick={checkout}>Checkout</Button></td>
    </tr>
  </tbody>
</Table>
</Container>
        {/* <Container className="mt-4">
          <Row xs={6} md={4} className="justify-content-center">
            {prodata.length > 0 &&
              prodata.map(
                (prod, i) =>
                  arr.includes(prod.id) && (
                    <Card
                      key={i}
                      style={{ width: "18rem", margin: "10px" }}
                      className="bg-light bg-gradient"
                    >
                      <Card.Img
                        variant="top"
                        src={prod.image}
                        className="mt-1 bg-gradient"
                        width="200"
                        height="250"
                      />
                      <Card.Body>
                        <Card.Title>{prod.pname}</Card.Title>
                        <Card.Text>
                          {" "}
                          Quantity: {arrquant2[arr.indexOf(prod.id)]}
                        </Card.Text>
                        <Card.Text>
                          {prod.price} <b>₹</b>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  )
              )}
          </Row>

          
        </Container> */}
      </div>
    );
  } else {
    return (
<h2>DONE order</h2>
    );
  }
}

export default Cart;
