import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import Alert from "./Alert";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/Slices/userSice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StacksEditor } from "@stackoverflow/stacks-editor";
import "@stackoverflow/stacks-editor/dist/styles.css";
import { useRef } from "react";
import Cookies from "js-cookie";
// import axios from "axios";
export default function CreateQuestion({
  title,
  description,
  update,
  questionId,
}) {
  const jwt = Cookies.get("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const isUpdate = update || false;
  const editorRef = useRef(null);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [value, setValue] = useState(description || "");
  const [question, setQuestion] = useState(title || "");
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const [isOrgRelated, setIsOrgRelated] = useState(false); 
  const [userDetails,setUserDetails]=useState({})
  useEffect(()=>{
    axios.get(`/api/User?userId=${user.uid}`,config).then((res)=>{
      setUserDetails(res.data.data[0])
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  // console.log(userDetails)
  const handleAlertClose = () => {
    setAlert(null);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setTagList([...tagList, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTagList(tagList.filter((_, index) => index !== indexToRemove));
  };

  const stripHtmlTags = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question === "" || value === "" || tagList.length === 0) {
      setAlert("Fill all the fields to submit the question");
      return;
    }
    const questionData = {
      title: question,
      description: value,
      tags: tagList,
      askedBy: user,
      uid: user.uid,
      Organisation: isOrgRelated ? userDetails?.organization : "all",
    };
    console.log("updata",questionData);
    if (!isUpdate) {
      try {
        const status = await axios.post(
          "/api/createQuestion",
          questionData,
          config
        );
        navigate("/");
        console.log("Question created successfully:", status);
      } catch (error) {
        console.error("Error creating question:", error);
      }
    } else {
      try {
        const status = await axios.patch(
          `/api/modifyQuestion/${questionId}`,
          questionData,
          config
        );
        navigate("/");
        console.log("Question updated successfully:", status);
      } catch (error) {
        console.error("Error updating question:", error);
      }
    }
  };
  console.log(user)
  return (
    <div
      className="mx-auto w-50 d-flex flex-column"
      style={{ maxWidth: "100%" }}
    >
      {alert && <Alert alert={alert} handleAlertClose={handleAlertClose} />}
      <div className="d-flex justify-content-center shadow p-3 mb-5 bg-white rounded align-items-center text-align-center">
        <h3>{isUpdate === false ? "Post Your Query" : "Update Your Query"}</h3>
      </div>
      <div className="d-flex shadow p-3 mb-5 bg-white rounded">
        <div style={{ maxWidth: "100%", width: "100%" }}>
          <div className="form-group">
            <h5 className="my-3">
              <label htmlFor="question">Query</label>
            </h5>
            <input
              type="text"
              className="form-control w-100"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
              style={{ width: "100%" }}
            />
          </div>
          <div className="form-group">
            <h5 className="my-3"> Description</h5>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className=""
              placeholder="Enter your description"
              style={{ maxWidth: "100%", width: "100%" }}
            />
          </div>
          <div className="form-group d-flex align-items-center">
            <input
              type="checkbox"
              id="orgRelated"
              checked={isOrgRelated}
              onChange={(e) => setIsOrgRelated(e.target.checked)}
            />
            <h5 className="my-3 ms-2">
              <label htmlFor="orgRelated">
                Is this question related to the organization?
              </label>
            </h5>
          </div>
          <div className="form-group">
            <h5 className="my-3">
              <label htmlFor="tags">Tags</label>
            </h5>
            <div>
              {tagList.map((tag, index) => (
                <span
                  key={index}
                  className="badge bg-light text-dark rounded-pill me-1 p-2 m-2"
                  style={{ cursor: "pointer" }}
                >
                  {tag}
                  <span onClick={() => handleRemoveTag(index)} className="ms-1">
                    &#x2715;
                  </span>
                </span>
              ))}
            </div>
            <input
              type="text"
              className="form-control"
              id="tags"
              placeholder="Enter tags"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
