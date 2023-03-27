import { useState } from "react";
import { newComment } from "../../../../utils/DataServices";
import "./NewComment.css";

const NewComment = ({peepId, uploadPeeps})=>{
    const [comment,setComment] = useState('')

const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
    await newComment(comment,peepId)
    setComment('')
    await uploadPeeps();
    }
    catch(err){
        return {error: err.message}
    }
}
const handleChange = (e)=>{
    setComment(e.target.value)

}
    return(
    <>
    <form onSubmit={handleSubmit} className="new-comment-form">
        <input type="text" value={comment} onChange={handleChange} className="new-comment-input" />
        <button type="submit" className="new-comment-button">Comment</button>
    </form>
  </>
    
    )
}

export default NewComment;
