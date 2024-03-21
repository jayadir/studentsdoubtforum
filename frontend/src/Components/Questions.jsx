import React from "react";
import { useState } from "react";
import Question from "./Question";
export default function Questions() {
  const [value, setValue] = useState("Filter");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
    <div className="d-flex flex-row align-items-center justify-content-between w-100">
      <h4>All questions</h4>

      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="navbarDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {value}
        </button>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <a className="dropdown-item" href="#">
              Newest
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Active
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              More
            </a>
          </li>
        </ul>
      </div>
    </div>
    <hr/>
    <Question question="What is React?" description="I am trying to learn React and I am not sure what it is. Can someone help me?" />
    </>
  );
}
