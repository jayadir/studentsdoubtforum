import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Link } from "react-router-dom";
export default function Question(props) {
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <Link to="/answer" className="text-decoration-none"><h5 className="card-title">{props.question}</h5></Link>
          <hr />
          <p className="card-text">{props.description}</p>
          <hr />
          <div className="d-flex align-items-center justify-content-between ">
            <div>
            <IconButton color="primary" fontSize="small" aria-label="upvote">
              <ThumbUpIcon style={{ fontSize: 20 }} />
            </IconButton>

            <IconButton color="secondary" aria-label="downvote">
              <ThumbDownIcon style={{ fontSize: 20 }} />
            </IconButton>
            </div>
            <div> tags</div>
          </div>
        </div>
      </div>
    </>
  );
}
