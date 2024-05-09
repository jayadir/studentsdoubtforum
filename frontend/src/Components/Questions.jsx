import React, { useState, useEffect } from "react";
import Question from "./Question";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Questions() {
  const [value, setValue] = useState("Filter");
  const [questions, setQuestions] = useState([]);
  const [filterItems, setFilterItems] = useState("Newest");
  const { title } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const questionsResponse =
          title === undefined
            ? await axios.get(`/api/getAllQuestions?filter=${filterItems}`)
            : await axios.get(
                `/api/searchquestions?title=${title.replace(/_/g, " ")}?filter=${filterItems}`
              );
        setQuestions(questionsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [title, filterItems]);

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between w-100">
        <h4>{title === undefined ? "All questions" : "Search Results"}</h4>

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
              <p
                className="dropdown-item"
                onClick={() => {
                  setFilterItems("Newest");
                }}
              >
                Newest
              </p>
            </li>
            {/* <li>
              <p
                className="dropdown-item"
                onClick={() => {
                  setFilterItems("Active");
                }}
              >
                Active
              </p>
            </li> */}
            <li>
              <p
                className="dropdown-item"
                onClick={() => setFilterItems("Most Liked")}
              >
                {" "}
                Most Liked{" "}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      {Array.isArray(questions) &&
        questions.map((question) => (
          <div key={question._id}>
            <Question data={question} />
          </div>
        ))}
    </>
  );
}
