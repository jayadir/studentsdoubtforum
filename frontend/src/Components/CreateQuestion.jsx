import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

export default function CreateQuestion() {
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setTagList([...tagList, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTagList(tagList.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="mx-auto w-50 d-flex flex-column" style={{ maxWidth: "100%" }}>
      <div className="d-flex justify-content-center shadow p-3 mb-5 bg-white rounded align-items-center text-align-center">
        <h3>Post Your Query</h3>
      </div>
      <div className="d-flex shadow p-3 mb-5 bg-white rounded">
        <div style={{ maxWidth: "100%",width:"100%" }}>
          <div className="form-group">
            <h5 className="my-3">
              <label htmlFor="question">Query</label>
            </h5>
            <input
              type="text"
              className="form-control w-100"
              id="question"
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
      <button type="submit" className="btn btn-primary">Submit</button>
    </div>
  );
}
