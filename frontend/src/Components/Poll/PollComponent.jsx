import React, { useState, useEffect } from "react";
import "./PollComponent.css";
import axios from "axios";
import Cookies from "js-cookie";

export default function PollComponent({ data, userId }) {
  const uid = Cookies.get("uid");

  const [pollData, setPollData] = useState(data);
  const [selectedOption, setSelectedOption] = useState(null);

  const totalVotes = data.options.reduce(
    (total, option) => total + option.votes,
    0
  );

  useEffect(() => {
    if (data.voters.includes(userId)) {
      setSelectedOption(true);
    }
  }, []);

  const handleOptionChange = async (optionId) => {
    if (selectedOption) return;
    setSelectedOption(optionId);
    try {
      const response = await axios.patch(`/api/poll?pollId=${data._id}`, {
        optionId,
        userId,
      });
      console.log(response);
      setPollData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="poll-card m-5 px-3">
      <h2>{pollData.question}</h2>
      <hr />
      {pollData.options.map((option) => (
        <div
          key={option._id}
          className={`poll-option ${
            selectedOption === option._id ? "selected" : ""
          }`}
          onClick={() => handleOptionChange(option._id)}
        >
          <div className="poll-option-label">
            <input
              type="checkbox"
              id={option._id}
              checked={selectedOption === option._id}
              onChange={() => handleOptionChange(option._id)}
              disabled={selectedOption !== null}
            />
            <label htmlFor={option._id}>{option.option}</label>
          </div>
          {selectedOption && (
            <div className="poll-bar-container">
              <div
                className="poll-bar"
                style={{ width: `${(option.votes / totalVotes) * 100}%` }}
              ></div>
              <span>{option.votes}</span>
            </div>
          )}
        </div>
      ))}
      <p>Created By: {pollData?.authorName}</p>
    </div>
  );
}
