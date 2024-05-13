import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/Slices/userSice";
import parse from "html-react-parser";
import AnswerComponent from "./AnswerUtil";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CreateQuestion from "./CreateQuestion";
import Cookies from "js-cookie";
import Alert from "./Alert";
import Question from "./Question";
export default function Answer() {
  const jwt = Cookies.get("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({});
  const [datestr, setDate] = useState();
  const [answer, setAnswer] = useState(false);
  const [value, setValue] = useState("");
  const { questionId } = useParams();
  const [alert, setAlert] = useState("");
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  useEffect(() => {
    async function getRelatedQuestions() {
      try {
        const response = await axios.get(
          `/api/searchquestions?title=${details.title}`,
          config
        );
        setRelatedQuestions(
          response.data.data.filter((question) => question?._id !== details?._id)
        );
        // console.log("rel",response.data.data)
      } catch (err) {
        console.log(err);
      }
    }
    getRelatedQuestions();
  }, [details]);
  useEffect(() => {
    async function getAnswer() {
      if (alert === "") {
        try {
          const response = await axios.get(
            `/api/getOneQuestion/${questionId}`,
            config
          );
          const responseData = response.data[0];
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
    }
    getAnswer();
  }, [questionId]);
  const handleCloseAlert = () => {
    setAlert("");
    navigate("/");
  };
  console.log(details);
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `/api/modifyQuestion/${questionId}`,
        config
      );
      if (res.status === 200) {
        setAlert("Question has been deleted succesfully");
      }
      console.log(res);
    } catch (error) {
      console.log("error in deleting question", error);
    }
  };
  const handleEdit = async () => {
    setEdit(true);
  };
  const handleSubmit = async () => {
    if (value === "") {
      return;
    }
    try {
      const parsedValue = parse(value, { trim: true });
      console.log("Parsed Value:", parsedValue);
      let stringValue = "";
      if (Array.isArray(parsedValue)) {
        stringValue = parsedValue.reduce((accumulator, child) => {
          if (typeof child === "string") {
            return accumulator + child;
          } else if (child.props && child.props.children) {
            return accumulator + child.props.children;
          } else {
            return accumulator;
          }
        }, "");
      } else {
        stringValue = parsedValue;
      }
      console.log("Value:", stringValue);
      const resp = await axios.post(
        "/api/createAnswer",
        {
          answer: value,
          answeredBy: user,
          question: questionId,
        },
        config
      );
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
  if (alert !== "") {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column ">
          <div className="alert-container">
            <div className="alert-content">
              <div className="alert alert-danger" role="alert">
                {alert}
                <button
                  type="button"
                  className="btn-close mx-2"
                  onClick={handleCloseAlert}
                ></button>
              </div>
            </div>
          </div>
          <p>No Data</p>
          <button
            className="w-45"
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            GO TO HOMEPAGE
          </button>
        </div>
      </div>
    );
  }
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
              <Link
                className="asked-by"
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
        <div className="w-100 h-76" style={{ zIndex: 1 }}>
          {edit && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                width: "100%",
                height: "80%",
              }}
            >
              <CreateQuestion
                title={details?.title}
                description={details?.description}
                questionId={details?._id}
                update={true}
              />
            </div>
          )}
        </div>{" "}
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
              const comments = details.comments.filter(
                (comment) => comment.answer === answer._id
              );
              return (
                <AnswerComponent
                  key={answer._id}
                  answer={answer}
                  comments={comments}
                />
              );
            })}
          </div>
        ) : (
          <div className="no-answers-message">There are no answers yet.</div>
        )}
      </div>
      <hr />
      <h3>RELATED QUESTIONS</h3>
      <hr />
      <div>
        {relatedQuestions.map((question) => {
          return (
            <div key={question._id}>
              <Question data={question} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
