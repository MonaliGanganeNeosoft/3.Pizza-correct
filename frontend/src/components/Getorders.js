import { getOrders } from '../config/Myservice';
import React, { useState, useEffect } from "react";
import { Card, Button, Row, Container ,Table} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Getorders() {
    const [order, setOrder] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        getOrders().then((res) => {
          if (res.data.err == 0) {
            setOrder(res.data.data);
            console.log(res.data.data)
          }
        });
      }, []);
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
  {order[0]&&
  order[0].orders.map((order,i)=>(
    
    <tr>
      <td>{i+1}</td>
      <td><img src={order.image} width="70" height="70"></img></td>
      <td>{order.pname}</td>
      <td> ₹{order.price}</td>
      <td>{order.quantity}</td>
      
    </tr>
    
    
  ))}
  <tr>
      <td></td>
     
      <td colSpan="4"><Button variant="dark" size="lg" onClick={()=>navigate('/dashboard')}>Order More</Button></td>
    </tr>
  </tbody>
</Table>
</Container>
        </div>
    )
}

export default Getorders
