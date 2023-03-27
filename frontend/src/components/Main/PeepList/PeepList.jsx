import React from 'react';
import PeepItem from "./PeepItem/PeepItem.jsx"

const PeepList = ({peeps, uploadPeeps, isLoggedIn}) => {


const peepList = peeps.map((peepItem) => 
    <PeepItem key = {peepItem._id} peepItem={peepItem} uploadPeeps={uploadPeeps} isLoggedIn={isLoggedIn}/>)

return(<>{peepList}</>)
}

export default PeepList;