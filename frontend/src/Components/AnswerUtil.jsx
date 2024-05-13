import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import "./AnswerComponent.css"; // Import the CSS file
import axios from "axios";
import { blue } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/Slices/userSice";
import Cookies from "js-cookie";
const AnswerComponent = ({ answer, comments }) => {
  const jwt = Cookies.get("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const [showComments, setShowComments] = useState(false);
  const [upvotes, setUpvotes] = useState(answer.upvotes);
  const [downvotes, setDownvotes] = useState(answer.downvotes);
  const [addComment, setAddComment] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentList, setCommentList] = useState(comments);
  const numberOfComments = comments?.length;
  const user = useSelector(userSelector);
  const handleUpvote = async () => {
    try {
      const response = await axios.put(
        `/api/answer/${answer._id}?vote=upvote`,
        {},
        config
      );
      if (response.status === 200) {
        setUpvotes(upvotes + 1);
      }
      const ratingResponse = await axios.patch(
        "/api/User",
        {
          uid: answer.answeredBy.uid,
        },
        config
      );
    } catch (error) {
      console.error("Error in upvoting", error);
    }
  };

  const handleDowntvote = async () => {
    try {
      const response = await axios.put(
        `/api/answer/${answer._id}?vote=downvote`,
        {},
        config
      );
      if (response.status === 200) {
        setDownvotes(downvotes + 1);
      }
    } catch (error) {
      console.error("Error in downvoting", error);
    }
  };
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/createComment/${answer._id}`,
        {
          comment: commentValue,
          commentedBy: user?.name,
          questionId: answer.question,
        },
        config
      );
      if (response.status === 200) {
        setCommentValue("");
        setCommentList((prev) => [...prev, response.data.data]);
        // window.location.reload();
      }
    } catch (error) {
      console.error("Error in commenting", error);
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
            <Link to={`/profile/${answer?.answeredBy?.uid}`}>
              Answered by: {answer.answeredBy.name}{" "}
              {/* <span>({answer.answeredBy.email})</span> */}
            </Link>
            <p>Answered at: {new Date(answer.answeredAt).toLocaleString()}</p>
            <p style={{ marginLeft: "20px" }}>{numberOfComments} comments</p>
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
              <div className="w-100">
                {addComment && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <form style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        <label>Comment:</label>
                        <textarea
                          name="comment"
                          value={commentValue}
                          onChange={(e) => {
                            setCommentValue(e.target.value);
                          }}
                          className="form-control comment ml-2 answer-container card"
                          // style={{
                          //   width: "100vw",
                          //   maxWidth: "800px",
                          //   height: "200px",
                          //   padding: "10px",
                          // }}
                        />
                      </div>
                      <input
                        type="submit"
                        value="Submit"
                        onClick={handleSubmitComment}
                        style={{ display: "block", margin: "10px auto" }}
                      />
                    </form>
                  </div>
                )}
              </div>
              {commentList?.map((comment) => (
                <div
                  key={comment._id}
                  className="comment ml-2 answer-container card d-flex"
                >
                  <p dangerouslySetInnerHTML={{ __html: comment.comment }}></p>
                  <p>
                    Commented by: {comment.commentedBy} <br />
                    Commented at:{" "}
                    {new Date(comment.commentedAt).toLocaleString()}
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
