import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import { useSelector } from "react-redux";
import { userSelector } from "../redux/Slices/userSice";
import parse from "html-react-parser";
import AnswerComponent from "./AnswerUtil"; // Import the AnswerComponent
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
export default function Answer() {
  const [details, setDetails] = useState({});
  const [datestr, setDate] = useState();
  const [answer, setAnswer] = useState(false);
  const [value, setValue] = useState("");
  const { questionId } = useParams();
  const user = useSelector(userSelector);

  useEffect(() => {
    async function getAnswer() {
      try {
        const response = await axios.get(`/api/getOneQuestion/${questionId}`);
        const responseData = response.data[0]; // Assuming response is an array with one object
        setDetails(responseData);

        const date = new Date(responseData.createdAt);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        };
        setDate(date.toLocaleDateString("en-US", options));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getAnswer();
  }, [questionId]);

  console.log(details);
  const handleDelete=async ()=>{
    
  }
  const handleEdit=()=>{}
  const handleSubmit = async () => {
    if (value === "") {
      return;
    }
    try {
      const parsedValue = parse(value, { trim: true }); // Trim whitespace
      console.log("Parsed Value:", parsedValue);
      let stringValue = "";
      if (Array.isArray(parsedValue)) {
        stringValue = parsedValue.reduce((accumulator, child) => {
          if (typeof child === "string") {
            return accumulator + child;
          } else if (child.props && child.props.children) {
            return accumulator + child.props.children; // Check for props.children
          } else {
            return accumulator;
          }
        }, "");
      } else {
        stringValue = parsedValue;
      }
      console.log("Value:", stringValue);
      const resp = await axios.post("/api/createAnswer", {
        answer: value,
        answeredBy: user,
        question: questionId,
      });
      if (resp.status === 200) {
        setValue("");
        setAnswer(false);
        console.log("Answer submitted successfully:", resp);
      } else {
        throw new Error("Unexpected response status: " + resp.message);
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  return (
    <div className="answer-container">
      <div className="shadow question-details">
        <div className="row">
          <div className="col-md-6">
            <h3>{details.title}</h3>
            <div
              dangerouslySetInnerHTML={{ __html: details.description }}
            ></div>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="asked-on">{datestr}</div>
          </div>
        </div>
        <hr className="question-divider" />
        <div className="row">
          <div className="col-md-6">
            {user?.uid !== details?.askedBy?.uid ? (
              <Link className="asked-by" 
              to={`/profile/${details?.askedBy?.uid}`}
               >
                Asked by:{" "}
                {details.askedBy?.email.substring(
                  0,
                  details.askedBy.email.indexOf("@")
                )}
              </Link>
            ) : (
              <div>
                <div className="actions">
                  <IconButton aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-6 text-md-end">
            <button
              className="add-answer-button"
              onClick={() => setAnswer(!answer)}
            >
              Add Answer
            </button>
          </div>
        </div>
        {answer && (
          <div className="create-answer-popup">
            <button className="close-button" onClick={() => setAnswer(false)}>
              &times;
            </button>
            <div className="create-answer-form">
              <ReactQuill
                value={value}
                onChange={setValue}
                theme="snow"
                placeholder="Write your answer here..."
                className="react-quill my-3"
              />
              <button
                className="submit-answer-button mt-5 mx-auto"
                onClick={handleSubmit}
              >
                Submit Answer
              </button>
            </div>
          </div>
        )}
        {details?.answerDetails ? (
          <div className="shadow mt-2">
            {details.answerDetails?.map((answer) => {
              const comments=details.comments.filter(comment=>comment.answer===answer._id)
              return <AnswerComponent key={answer._id} answer={answer} comments={comments}/>
})}
          </div>
        ) : (
          <div className="no-answers-message">There are no answers yet.</div>
        )}
      </div>
    </div>
  );
}
