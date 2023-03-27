import React, { useState } from 'react';
import { signUp } from '../../../utils/AuthServices';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', name: '',email: '', password: '' });
  const [signupForm, setSignupForm] = useState(false)

  const handleSignupForm = () =>{
    if (signupForm===true) {setSignupForm(false);}
    if (signupForm===false) {setSignupForm(true);}
  }
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signUp(formData)
    setFormData({ username: '', name: '',email: '', password: '' })
    setSignupForm(false)
    if(!response?.error){
      alert(`Sign up successful. You can now log in, ${response.user.name}!`)}
    else{
      const errors = response.error.map(error => error.msg).join("\n")
      alert(errors)
    }
    
  };

  return (
    <div className='signup-container'>
      <button type="submit" onClick={handleSignupForm}>{signupForm ? 'BACK' : 'SIGN UP'}</button>

      {signupForm && 
      <form onSubmit={handleSubmit}>

        <label htmlFor="name">Name:</label>
        <input type="name" id="name" name="name" value={formData.name} onChange={handleChange} />
        
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />


        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />

        <button type="submit">SIGN UP</button>
      </form>}
    </div>
  );
};

export default Signup;
