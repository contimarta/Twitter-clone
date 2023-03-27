// NewPeep.jsx
import React, { useState } from 'react';
import "./NewPeep.css"
import {newPeep} from "../../../utils/DataServices.js"

const NewPeep = ({uploadPeeps}) => {
  const [peepText, setPeepText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await newPeep(peepText)
      setPeepText(''); // Clear the input field after successful submission
      await uploadPeeps()
    }  
     catch (err) {
      alert("You need to log in before peeping!")
      return{error: err.message}
    }
  };

  const handleChange = (e) => {
    setPeepText(e.target.value);
  };

  return (
    <div>
      <form className='new-peep-form' onSubmit={handleSubmit}>
      <div className="grid-container">
        <input
          type="text"
          placeholder="What's happening?"
          name="peep"
          maxLength="280"
          value={peepText}
          onChange={handleChange}
        />
        
        <button type="submit">PEEP</button>
        </div>
      </form>
    </div>
  );
};

export default NewPeep;
