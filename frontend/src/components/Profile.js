import React, { useState,useEffect } from "react";
import axios from "axios";
import { addSignup } from '../config/Myservice';
import bcrypt from 'bcryptjs'
import {
  Button,
  Row,
  Col,
  Modal,
  Form,
  Container,
  InputGroup,
  FormControl,
  FormGroup,
} from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getUser } from "../config/Myservice";


function Profile() {
    const navigate = useNavigate();
    const [uid, setUid] = useState("");
    const [userdata, setUserdata] = useState([]);
   

const [indexo, setindexo] = useState()

  
      useEffect(() => {
        
     
      
        if (localStorage.getItem("_token") != undefined) {
            let token = localStorage.getItem("_token");
            let decode = jwt_decode(token);
            console.log(decode.uid);
            setUid(decode.uid);
            let uid=decode.uid
            getUser(uid).then((res) => {
                if (res.data.err == 0) {
                  setUserdata(res.data.data);
                  console.log(res.data.data)
                  //    console.log(userdata[index])
                 
                }
              });
          
          }
         
      }, []);

      
    if(localStorage.getItem('_token'))
      {
       
    return (

        <div>
           
                <Container className=" mt-3">
        
        {
           

            <div className="text-start">
                <h1>Profile</h1>
                <br/>
                <h2>Name: {userdata.fname}  {userdata.lname}</h2>
                <h2>Email: {userdata.email}</h2>
                <h2>Mobile No: {userdata.mobile}</h2>
                <h2>Address: {userdata.address}</h2>
                </div>
           
        }
      </Container>
             
        </div>
    )}else{
    return <h1>You Are Logged In</h1>
}
}

export default Profile
