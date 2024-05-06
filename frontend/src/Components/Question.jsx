import React from "react";
import {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Link } from "react-router-dom";
import axios from "axios";
function limitString(string, limit) {
  return string.length > limit ? string.substring(0, limit) + "..." : string;
}
export default function Question({ data }) {
  const [upvotes, setUpvotes] = useState(data.upvotes)
  const [downvotes, setDownvotes] = useState(data.downvotes)
  const handleUpvote = async () => {
    const res=await axios.put("/api/upvote/"+data._id)
    if(res.status===200){
      setUpvotes(upvotes+1)
    }
    else{
      console.log("Error in upvoting")
    }
  }
  const handleDowntvote = async () => {
    const res=await axios.put("/api/downvote/"+data._id)
    if(res.status===200){
      setDownvotes(downvotes+1)
    }
    else{
      console.log("Error in downvoting")
    }
  }
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <Link to={"/answer/"+data._id} className="text-decoration-none">
            <h5 className="card-title">{data.title}</h5>
          </Link>
          <hr />
          <p className="card-text" dangerouslySetInnerHTML={{__html:data.description}}>
            {/* {limitString(data.description,200)} */}
            </p>
          <hr />
          <div className="d-flex align-items-center justify-content-between ">
            <div>
              <IconButton
                color="primary"
                fontSize="small"
                aria-label="upvote"
                onClick={handleUpvote}
              >
                <ThumbUpIcon style={{ fontSize: 20 }} />{" "}
                <span style={{ fontSize: 20, marginLeft: 4 }}>
                  {upvotes}
                </span>
              </IconButton>

              <IconButton
                color="secondary"
                aria-label="downvote"
                onClick={handleDowntvote}
              >
                <ThumbDownIcon style={{ fontSize: 20 }} />{" "}
                <span style={{ fontSize: 20, marginLeft: 4 }}>
                  {downvotes}
                </span>
              </IconButton>
            </div>
            {/* <div> tags</div> */}
            <div>
              {data.tags.map((tag,index) => {
                return (
                  <span
                  key={index}
                    className="badge"
                    style={{
                      color: "black",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "5px",
                      padding: "5px",
                      marginRight: "5px",
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
