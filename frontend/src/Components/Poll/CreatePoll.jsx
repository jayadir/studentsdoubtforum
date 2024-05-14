import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/Slices/userSice";
function CreatePoll() {
  const user = useSelector(userSelector);
  const { uid } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState({ question: "", options: ["", ""] });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/poll", {
        ...poll,
        createdBy: uid,
        authorName: user.name,
      });
      console.log(response);
      navigate(`/polls/${uid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (index, event) => {
    const values = [...poll.options];
    values[index] = event.target.value;
    setPoll({ ...poll, options: values });
  };

  return (
    <div
      className="mx-auto w-50 d-flex flex-column"
      style={{ maxWidth: "100%" }}
    >
      <div className="d-flex justify-content-center shadow p-3 mb-5 bg-white rounded align-items-center text-align-center">
        <h3>Create Your Poll</h3>
      </div>
      <div className="d-flex shadow p-3 mb-5 bg-white rounded">
        <div style={{ maxWidth: "100%", width: "100%" }}>
          <div className="form-group">
            <h5 className="my-3">
              <label htmlFor="question">Question</label>
            </h5>
            <input
              type="text"
              className="form-control w-100"
              id="question"
              value={poll.question}
              onChange={(event) =>
                setPoll({ ...poll, question: event.target.value })
              }
              placeholder="Enter your question"
              style={{ width: "100%" }}
            />
          </div>
          {poll.options.map((option, index) => (
            <div className="form-group" key={index}>
              <h5 className="my-3">
                <label htmlFor={`option${index}`}>Option {index + 1}</label>
              </h5>
              <input
                type="text"
                className="form-control"
                id={`option${index}`}
                value={option}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Enter an option"
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary my-3"
            onClick={() => setPoll({ ...poll, options: [...poll.options, ""] })}
          >
            Add option
          </button>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default CreatePoll;
