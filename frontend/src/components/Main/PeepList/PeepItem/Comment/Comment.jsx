import React from "react";
import { dateFormatting } from "../../../../../utils/dateFormatting";
import "./Comment.css";

const Comment = ({ comment }) => {
  const { content, username, createdAt } = comment;
  const formattedDate = dateFormatting(createdAt);

  return (
    <div className="comment-item">
      <span className="comment-username">@{username}</span>
      <span className="comment-content">{content}</span>
      <span className="comment-date">{formattedDate}</span>
    </div>
  );
};

export default Comment;
