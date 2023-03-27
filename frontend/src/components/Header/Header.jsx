import React, { useState } from 'react';
import Login from "./Login/Login.jsx"
import Signup from './Signup/Signup.jsx';
import "./Header.css"

const Header = ({isLoggedIn, setIsLoggedIn}) => {
    const [name, setName] = useState("")

  
    const handleLogout = () => {
      localStorage.removeItem('token'); // Remove the token from local storage
      setIsLoggedIn(false); 
    };

  return (
    <header>
      <h1>My Chitter App</h1>
      <div className="authentication">
      {isLoggedIn ? (
      <><p className='welcome-text'>Welcome, {name}!</p>
        <button type="submit"  onClick={handleLogout}>LOG OUT</button>
      </>
      ) : (
        
      <Login setIsLoggedIn={setIsLoggedIn} setName = {setName} /> )}
      <Signup/></div>

    </header>
  );
};

export default Header;
