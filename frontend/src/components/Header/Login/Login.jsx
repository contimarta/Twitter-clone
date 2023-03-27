import React, { useState } from 'react';
import { logIn } from '../../../utils/AuthServices.js';

const Login = ({setIsLoggedIn, setName}) =>{
const [formData, setFormData] = useState({ email: '', password: '' });
const [logInForm, setLogInForm] = useState(false)

const handleLogInForm = () =>{
  if (logInForm===true) {setLogInForm(false);}
  if (logInForm===false) {setLogInForm(true);}
}
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await logIn(formData)
    setName(response.user.name)
    if (response.token){setIsLoggedIn(true)}
  } catch (err) {
    alert("Incorrect email or password")
    console.log(err.message);
  }
};

return(
<div>
<button type="submit" onClick={handleLogInForm}>{logInForm ? 'BACK' : 'LOG IN'}</button>
{logInForm &&
  <form onSubmit={handleSubmit}>
  <label htmlFor="email">Email:</label>
  <input type="email" name="email" id='email' value={formData.email} onChange={handleChange} />

  <label htmlFor="password">Password:</label>
  <input type="password" name="password" id='password' value={formData.password} onChange={handleChange} />

  <button type="submit">LOG IN</button>
</form>
}


</div>)}

export default Login;