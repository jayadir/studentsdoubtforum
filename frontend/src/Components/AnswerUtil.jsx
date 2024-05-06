import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import IconButton from "@material-ui/core/IconButton";
import "./AnswerComponent.css"; // Import the CSS file
import axios from "axios";
import { blue } from "@material-ui/core/colors";

const AnswerComponent = ({ answer, comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [upvotes, setUpvotes] = useState(answer.upvotes);
  const [downvotes, setDownvotes] = useState(answer.downvotes);
  const [addComment, setAddComment] = useState(false);
  const numberOfComments = comments?.length;

  const handleUpvote = async () => {
    try {
      const response = await axios.put(`/api/answer/${answer._id}?vote=upvote`);
      if (response.status === 200) {
        setUpvotes(upvotes + 1);
      }
    } catch (error) {
      console.error("Error in upvoting", error);
    }
  };

  const handleDowntvote = async () => {
    try {
      const response = await axios.put(`/api/answer/${answer._id}?vote=downvote`);
      if (response.status === 200) {
        setDownvotes(downvotes + 1);
      }
    } catch (error) {
      console.error("Error in downvoting", error);
    }
  };

  return (
    <>
      <div className="answer-container card d-flex ">
        <div className="answer-content card-body">
          <div
            className="answer-text card-text"
            dangerouslySetInnerHTML={{ __html: answer.Answer }}
          ></div>
          <div className="answered-info d-flex ">
            <div className="thumbs">
              <IconButton
                color="primary"
                fontSize="small"
                aria-label="upvote"
                onClick={handleUpvote}
              >
                <ThumbUpIcon style={{ fontSize: 20 }} />{" "}
                <span style={{ fontSize: 20, marginLeft: 4 }}>{upvotes}</span>
              </IconButton>

              <IconButton
                color="secondary"
                aria-label="downvote"
                onClick={handleDowntvote}
              >
                <ThumbDownIcon style={{ fontSize: 20 }} />{" "}
                <span style={{ fontSize: 20, marginLeft: 4 }}>{downvotes}</span>
              </IconButton>
            </div>
            <p>
              Answered by: {answer.answeredBy.name}{" "}
              <span>({answer.answeredBy.email})</span>
            </p>
            <p>Answered at: {new Date(answer.answeredAt).toLocaleString()}</p>
            <p style={{marginLeft: '20px'}}>{numberOfComments} comments</p>
          </div>
          {showComments == true ? (
          <div className="comments ml-2 my-0">
            <div className="d-flex justify-content-between">
              {" "}
              <p
                className="answer-text card-text"
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowComments(!showComments);
                }}
              >
                Hide Comments
              </p>
              <div className="">
                <button
                  className="add-answer-button"
                  onClick={() => setAddComment(!addComment)}
                >
                  Add Comment
                </button>
              </div>
            </div>

            {comments?.map((comment) => (
              <div
                key={comment._id}
                className="comment ml-2 answer-container card d-flex"
              >
                <p dangerouslySetInnerHTML={{__html:comment.comment}}></p>
                <p>
                  Commented by: {comment.commentedBy} <br />
                  Commented at: {new Date(comment.commentedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p
            className="answer-text card-text m-2"
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              setShowComments(!showComments);
            }}
          >
            {numberOfComments} comments
          </p>
        )}
      </div>
        </div>

        
    </>
  );
};

export default AnswerComponent;