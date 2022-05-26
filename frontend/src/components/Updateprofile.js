import React, { useState,useEffect ,useRef} from "react";
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
// import bcryptjs from 'bcryptjs';
import { getUsers } from '../config/Myservice';
import { useDispatch, useSelector } from "react-redux";
import {deleteUser,updateUser} from '../config/Myservice'
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getUser } from "../config/Myservice";


const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForUsername = RegExp(/^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/);
const regForPassword = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
const regForMobile=RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
function Updateprofile() {
    const navigate = useNavigate();
    // const index = useSelector(state => state.index)
    const [uid, setUid] = useState("");

    const [userdata, setUserdata] = useState([]);
    const refemail = useRef(null);
    const reffname = useRef(null);
    const reflname = useRef(null);
    const refmobile = useRef(null);
    const refaddress = useRef(null);
    const refpassword = useRef(null);
    // const [email, setEmail] = useState("")
    // const [fname, setFname] = useState("")
    // const [lname, setlname] = useState("")
    // const [mobile, setmobile] = useState()
    // const [address, setaddress] = useState("")
    // const [password, setpassword] = useState("")
    

const [indexo, setindexo] = useState()

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

    //   const info=()=>{
        
    //   }
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
      const onDeleteHandler = (index) => {
        deleteUser(index).then((res) => {
          console.log(res.data);
        });
        localStorage.removeItem("login");
        localStorage.removeItem("index");
        navigate('/')
        alert("Deleted");
      };
    
      const UpdateUserHandler = async(event) => {
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
            fname: reffname.current.value,
            lname: reflname.current.value,
            mobile:refmobile.current.value,
            email: refemail.current.value,
            password: refpassword.current.value,
            address:refaddress.current.value

          };
          updateUser(userdata._id,formData).then(res=>{console.log(res.data)})
    
        //   const URL = "http://localhost:3001/user/";
        //   axios.post(URL, formData)
        //   .then(res=>{
        //     setUser(res.data)
        //   })
          // const res = axios.post(URL, formData);
          // setUser(res.data);
          alert("Updated Succesfully");
          
          document.getElementById("myForm").reset();
          localStorage.removeItem("login");
    localStorage.removeItem("index");
    localStorage.removeItem("_token");
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
       
    return (

        <div>
           
                <Container className=" mt-3">
        <h1>Update Data</h1>
        <Form id="myForm"> 
          <Form.Group>
            <Form.Label ></Form.Label>
            <Row className="justify-content-md-center">
              <Col xs lg="3">
                <Form.Control
                  placeholder="First name"
                  name="fname"
                  id="fname"
                  ref={reffname}
                  onChange={handler}
                  defaultValue={userdata.fname}
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
                  ref={reflname}
                  onChange={handler}
                  defaultValue={userdata.lname}
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
                  ref={refemail}
                  onChange={handler}
                  defaultValue={userdata.email}
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
                    ref={refmobile}
                    onChange={handler}
                    defaultValue={userdata.mobile}
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
              
                    <Form.Control type="password" placeholder="Enter password" name="password" id="password" onChange={handler} ref={refpassword} />
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
                    ref={refaddress}
                    onChange={handler}
                    as="textarea" rows={3}
                    defaultValue={userdata.address}
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
          <Button variant="primary" type="submit" onClick={UpdateUserHandler} >
         
   Update
  </Button>&nbsp;
  <Button variant="danger"  onClick={()=>onDeleteHandler(userdata._id)}> Delete Account</Button>
  </Form.Group>
        </Form>
      </Container>
             
        </div>
    )}else{
    return <h1>You Are Logged In</h1>
}
}

export default Updateprofile
