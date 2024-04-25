import React, { useState, useEffect } from "react";
import Question from "./Question";
import axios from "axios";

export default function Questions() {
  const [value, setValue] = useState("Filter");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const questionsResponse = await axios.get("/api/getAllQuestions");
        setQuestions(questionsResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

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
      <hr />
      {Array.isArray(questions) && questions.map((question) => (
        <div key={question._id}>
          <Question data={question} />
        </div>
      ))}
    </>
  );
}
