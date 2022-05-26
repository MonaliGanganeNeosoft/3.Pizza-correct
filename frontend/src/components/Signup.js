import React, { useState } from "react";
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

// import bcryptjs from 'bcryptjs';
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForUsername = RegExp(/^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/);
const regForPassword = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
const regForMobile=RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
function Signup() {
  const navigate = useNavigate();

    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        password: "",
        repeatpassword:"",
        address:""
      });
      const [errors, setErrors] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        password: "",
        repeatpassword:"",
        address:""
      });
      const handler = (event) => {
        const { name, value } = event.target;
    
        // let errors=state.errors;
        switch (name) {
          case "fname":
            let efname = regForName.test(value) ? "" : "Please Enter Valid Name";
            setErrors({ ...errors, fname: efname });
            console.log(value)
            break;
          case "lname":
            let elname = regForName.test(value) ? "" : "Please Enter Valid Name";
            setErrors({ ...errors, lname: elname });
            break;
          case "email":
            let eemail = regForEmail.test(value) ? "" : "Enter Valid Email";
            setErrors({ ...errors, email: eemail });
            break;
          case "mobile":
            let emobile = regForMobile.test(value) ? "" : "Enter Valid Mobile No";
            setErrors({ ...errors, mobile: emobile });
            console.log(emobile)
            break;
    
            case 'password':
              let epassword = regForPassword.test(value) ? "" : "Enter Valid Password";
              setErrors({ ...errors, password: epassword });
              break;
          case 'repeatpassword':
            console.log(user.password)
            console.log(value)
            let erepeatpassword = value!==user.password ? "Password Dont Match" : "";
            setErrors({ ...errors, repeatpassword: erepeatpassword });                            
              break;
              case 'address':
              let eaddress = (value.length > 10 ) ? "" : "Address must have more than 10 alphabets";
              setErrors({ ...errors, address: eaddress });
              break;
    
          
          
          default:
        }
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    
        // setState({[name]:value},...state);
    
        // setErrors(errors)
      };
    
      const formSubmit = async(event) => {
        event.preventDefault();
        // setUser({ ...user, cource: selectedc });
        if (
          validate(errors) &&
          document.getElementById("fname").value !== "" &&
          document.getElementById("lname").value !== "" &&
          document.getElementById("email").value !== "" &&
          document.getElementById("mobile").value !== "" &&
          document.getElementById("password").value !== "" &&
          document.getElementById("repeatpassword").value !== "" &&
          document.getElementById("address").value !== "" 
        ) {
          
          // securePassword(cred.password)
          // const passwordHash = await bcrypt.hash(user.password,10);
          let formData = {
            fname: user.fname,
            lname: user.lname,
            mobile:user.mobile,
            email: user.email,
            password: user.password,
            address:user.address

          };
          addSignup(formData).then(res=>{console.log(res.data)})
    
        //   const URL = "http://localhost:3001/user/";
        //   axios.post(URL, formData)
        //   .then(res=>{
        //     setUser(res.data)
        //   })
          // const res = axios.post(URL, formData);
          // setUser(res.data);
          alert("Registered Succesfully");
          document.getElementById("myForm").reset();
          navigate('/login')
          
        } else {
          alert("Please Enter Valid Data");
        }
      };
      const validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
      };
    if(localStorage.getItem('login'))
      {
        return <h1>You Are Logged In</h1>
    }
    else{
    return (
        <div>
             <Container className=" mt-3">
        <h1>SignUp</h1>
        <Form id="myForm"> 
          <Form.Group>
            <Form.Label ></Form.Label>
            <Row className="justify-content-md-center">
              <Col xs lg="3">
                <Form.Control
                  placeholder="First name"
                  name="fname"
                  id="fname"
                  onChange={handler}
                  //   className={!errors.fname ? '' : 'red-border'}

                  //   error={errors.fname===''?'':'ajfah'} helperText={errors.email}
                />

                {errors.fname && (
                  <Form.Text style={{ color: "red" }}>{errors.fname}</Form.Text>
                )}
              </Col>
              <Col xs lg="3">
                <Form.Control
                  placeholder="Last name"
                  name="lname"
                  id="lname"
                  onChange={handler}
                />
                {errors.lname && (
                  <Form.Text style={{ color: "red" }}>{errors.lname}</Form.Text>
                )}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row className="justify-content-md-center">
              <Col xs lg="6">
                <Form.Label></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  id="email"
                  onChange={handler}
                />
                {errors.email && (
                  <Form.Text style={{ color: "red" }}>{errors.email}</Form.Text>
                )}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row className="justify-content-md-center">
              <Col xs lg="6">
                <Form.Label></Form.Label>
                <InputGroup className="mb-2">
                
                  {/* <InputGroup.Text>@</InputGroup.Text> */}

                  <FormControl
                  type="Number"
                    placeholder="Mobile No"
                    name="mobile"
                    id="mobile"
                    onChange={handler}
                  />
                  </InputGroup>
                   {errors.mobile && (
                  <Form.Text style={{ color: "red" }}>{errors.mobile}</Form.Text>
                )}
                
                
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Form.Label></Form.Label>
            <Row className="justify-content-md-center">
              <Col xs lg="3">
              
                    <Form.Control type="password" placeholder="Enter password" name="password" id="password" onChange={handler}/>
                {errors.password && (
                  <Form.Text style={{ color: "red" }}>{errors.password}</Form.Text>
                )}
              </Col>
              <Col xs lg="3">
              
                    <Form.Control type="password" placeholder="Confirm password" name="repeatpassword" id="repeatpassword" onChange={handler}/>
                {errors.repeatpassword && (
                  <Form.Text style={{ color: "red" }}>{errors.repeatpassword}</Form.Text>
                )}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row className="justify-content-md-center">
              <Col xs lg="6">
                <Form.Label></Form.Label>
                <InputGroup className="mb-2">
                
                  {/* <InputGroup.Text>@</InputGroup.Text> */}

                  <FormControl
                  type="text"
                    placeholder="Enter Address"
                    name="address"
                    id="address"
                    onChange={handler}
                    as="textarea" rows={3}
                  />
                  </InputGroup>
                   {errors.address && (
                  <Form.Text style={{ color: "red" }}>{errors.address}</Form.Text>
                )}
                
                
              </Col>
            </Row>
          </Form.Group>
          <br/>
          <Form.Group>
          <Button variant="primary" type="submit" onClick={formSubmit}>
    SignUp
  </Button>
  </Form.Group>
        </Form>
      </Container>
        </div>
    )}
}

export default Signup
