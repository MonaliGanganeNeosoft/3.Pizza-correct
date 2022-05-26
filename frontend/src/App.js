import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom';
import Navb from './components/Navb';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Updateprofile from './components/Updateprofile';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Getorders from './components/Getorders';
import Profile from './components/Profile';

function App() {
  
  return (
    <div className="App">
       <Router>
      <Navb/>
          <Routes>
          
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} /> 
          <Route path="/dashboard" element={<Dashboard/>} /> 
          <Route path="/updateprofile" element={<Updateprofile/>} /> 
          <Route path="/cart" element={<Cart/>} /> 
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/getorders" element={<Getorders/>} />
          <Route path="/profile" element={<Profile/>} />



          </Routes>
          </Router>
    </div>
  );
}

export default App;
