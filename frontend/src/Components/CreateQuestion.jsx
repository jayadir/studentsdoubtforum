import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState,useEffect } from "react";
import Alert from "./Alert";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/Slices/userSice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StacksEditor } from "@stackoverflow/stacks-editor";
import "@stackoverflow/stacks-editor/dist/styles.css";
import { useRef } from "react";

// import "@stackoverflow/stacks-editor/dist/fonts.css";
export default function CreateQuestion() {
  const editorRef = useRef(null);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState("");
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  // const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");
  // useEffect(() => {
  //   if (editorRef.current) {
  //     new StacksEditor(editorRef.current, "*Your* **markdown** here");
  //   }
  // }, []);
  
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
      // description: value.substring(3, value.length - 4),
      // description: stripHtmlTags(value).trim(),
      tags: tagList,
      askedBy: user,
      uid:user.uid
    };
    try {
      const status = await axios.post("/api/createQuestion", questionData);
      navigate("/");
      console.log("Question created successfully:", status);
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };
  // console.log(user)
  return (
    <div
      className="mx-auto w-50 d-flex flex-column"
      style={{ maxWidth: "100%" }}
    >
      {alert && <Alert alert={alert} handleAlertClose={handleAlertClose} />}
      <div className="d-flex justify-content-center shadow p-3 mb-5 bg-white rounded align-items-center text-align-center">
        <h3>Post Your Query</h3>
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
              // modules={{
              //   toolbar: true,
              //   syntax: true, // Enable syntax highlighting
              //   clipboard: {
              //     matchVisual: false,
              //   },
              // }}
              // formats={[
              //   "header",
              //   "font",
              //   "size",
              //   "bold",
              //   "italic",
              //   "underline",
              //   "strike",
              //   "blockquote",
              //   "code-block", // Enable code block format
              //   "list",
              //   "bullet",
              //   "indent",
              //   "link",
              //   "image",
              //   "color",
              //   "background",
              // ]}
            />
          </div>
          {/* <div className="form-group">
            <div id="editor-container" ref={editorRef}>
              <h5 className="my-3"> Description</h5>
              <StacksEditor
                initialValue="Your markdown here"
                value={value}
                onChange={setValue}
                placeholder="Enter your description"
                style={{ maxWidth: "100%", width: "100%" }}
              />
            </div>
          </div> */}

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