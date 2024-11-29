import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewComment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const allComments = JSON.parse(localStorage.getItem("comments")) || [];
    const selectedComment = allComments.find(
      (comment) => parseInt(comment?.id) === parseInt(id)
    );
    setComment(selectedComment);
  }, [id]);

  return (
    <div className="comment-container">
      <div className="button-wrapper">
        <button onClick={() => navigate("/")}>Show All Comments</button>
      </div>
      <div className="id-section">
        <p>ID:</p> <p>{comment.id}</p>
      </div>
      <div className="name-section">
        <p>Name:</p> <p>{comment.name}</p>
      </div>
      <div className="email-section">
        <p>Email:</p> <p>{comment.email}</p>
      </div>
      <div className="comment-section">
        <p>Comment:</p> <p>{comment.body}</p>
      </div>
    </div>
  );
};

export default ViewComment;
