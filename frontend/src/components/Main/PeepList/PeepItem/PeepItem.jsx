import React, { useState } from 'react';
import { dateFormatting } from '../../../../utils/dateFormatting';
import './PeepItem.css'; 
import NewComment from './NewComment';
import Comment from './Comment/Comment';

const PeepItem = ({peepItem, uploadPeeps, isLoggedIn}) => {
  const { content, _id, comments, createdAt} = peepItem;
  const {name,username} = peepItem.user

  const [viewComments, setViewComments] = useState(false)

  const commentsList = comments.map(comment => <Comment key={comment._id} comment={comment} ></Comment>)

  const showComments = (e)=>{
    e.preventDefault();
    if (viewComments === false) {setViewComments(true)};
    if(viewComments === true) {setViewComments(false)};

  }
  return (
    <div className="peep-item">
      <div className="peep-author">
        {name} <span className="peep-username">@{username}</span>  
        <span className="peep-timestamp">{dateFormatting(createdAt)}</span>

      </div>
      <div className="peep-content">{content}</div>
      <button type='submit' className= "comments-button" onClick={showComments}>{viewComments ? "Hide Comments":"View comments"}</button>
      {viewComments && commentsList}
      {isLoggedIn && viewComments && <NewComment peepId ={_id} uploadPeeps={uploadPeeps} />}

    </div>
  );
}

export default PeepItem;
