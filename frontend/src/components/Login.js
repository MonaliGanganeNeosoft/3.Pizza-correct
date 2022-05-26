import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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
// import SocialButton from "./SocialButton";
import bcrypt from "bcryptjs";

import { getUsers , login } from "../config/Myservice";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForUsername = RegExp(
  /^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/
);
const regForPassword = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

function Login() {
  const dispatch = useDispatch();

  const [userdata, setUserdata] = useState([]);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    getUsers().then((res) => {
      if (res.data.err == 0) {
        setUserdata(res.data.data);
      }
    });
  }, []);

  const handler = (event) => {
    const { name, value } = event.target;

    // let errors=state.errors;
    switch (name) {
      case "username":
        let eusername = value.length > 1 ? "" : "Enter Valid UserName";
        setErrors({ ...errors, username: eusername });

        break;

      case "password":
        let epassword = regForPassword.test(value)
          ? ""
          : "Enter Valid Password";
        setErrors({ ...errors, password: epassword });
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

  const formSubmit = async (event) => {
    console.log(userdata);
    event.preventDefault();
    // setUser({ ...user, cource: selectedc });
    if (
      validate(errors) &&
      document.getElementById("username").value !== "" &&
      document.getElementById("password").value !== ""
    ) {
      // securePassword(cred.password)
      var ver = false;
      login(user).then(res=>{
        if(res.data.err==0){
          console.log(res.data)
          let login = user.username;

         
          //   history.push("/dashboard");
          console.log("logged in");
          localStorage.setItem("_token", res.data.token);

          localStorage.setItem("login", JSON.stringify(login));
          navigate("/dashboard");
        }
        if(res.data.err==1){
          console.log(res.data)
          alert("Username/Email or Password is wrong");
        }
      })
      // userdata.map((data, i) => {
      //   const passwordmatch = bcrypt.compare(user.password, data.password);
      //   console.log(user.username);
      //   if (
      //     (data.email === user.username || data.username === user.username) &&
      //     passwordmatch
      //   ) {
      //     ver = true;
          
      //     localStorage.setItem("index", JSON.stringify(i));
      //     dispatch({ type: "index", payload: i });
      //   }
      // });

      // if (ver) {
      //   let login = user.username;

      //   navigate("/dashboard");
      //   //   history.push("/dashboard");
      //   console.log("logged in");
      //   localStorage.setItem("login", JSON.stringify(login));
      // } else {
      //   alert("Username/Email or Password is wrong");
      // }
    } else {
      alert("Please Enter Valid Data");
    }
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  //   const handleSocialLogin = (user) => {
  //     console.log(user);
  //     setUserdata(user._profile)
  //     if(user){
  //         localStorage.setItem("login", JSON.stringify(user._profile.email));
  //         navigate('/dashboard')
  //     }
  //   };

  //   const handleSocialLoginFailure = (err) => {
  //     console.error(err);
  //   };
  if (localStorage.getItem("login")) {
    return <h1>You Are Logged In</h1>;
  } else {
    return (
      <div>
        <Container>
          <h1>Log In</h1>
          <Form id="myForm">
            {/* <Form.Group>
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
          </Form.Group> */}
            <Form.Group>
              <Row className="justify-content-md-center">
                <Col xs lg="5">
                  <Form.Label></Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Text>@</InputGroup.Text>

                    <FormControl
                      type="text"
                      placeholder="Username / Email"
                      name="username"
                      id="username"
                      onChange={handler}
                    />
                  </InputGroup>
                  {errors.username && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.username}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Form.Label></Form.Label>
              <Row className="justify-content-md-center">
                <Col xs lg="5">
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    id="password"
                    onChange={handler}
                  />
                  {errors.password && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.password}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <br />

            <Form.Group>
              <Button variant="outline-dark" type="submit" onClick={formSubmit}>
                Log In
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
