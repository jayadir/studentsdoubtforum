import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Question from "../Question";
import axios from "axios";
import Cookies from "js-cookie";
import PollComponent from "../Poll/PollComponent";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  avatar: {
    height: "95%",
    width: "60%",
    marginBottom: theme.spacing(2),
    border: "2px solid black",
  },
  userDetails: {
    marginLeft: theme.spacing(2),
    color: "black",
  },
  questions: {
    marginTop: theme.spacing(2),
    backgroundColor: "#e8eaf6",
    padding: theme.spacing(2),
    borderRadius: "5px",
    width: "100%",
  },
}));

export default function UserProfile() {
  const [view, setView] = useState("questions");
  const jwt = Cookies.get("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const [userDetails, setUserDetails] = useState({});
  const [userQuestions, setUserQuestions] = useState([]);
  const [polls, setPolls] = useState([]);
  const classes = useStyles();
  const { uid } = useParams();

  useEffect(() => {
    async function getUserDetails() {
      try {
        const res = await axios.get(`/api/User?userId=${uid}`, config);
        setUserDetails(res?.data?.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getUserDetails();
  }, [uid]);

  async function getUserPolls() {
    setView("polls");
    try {
      const res = await axios.get(
        `/api/getUserPolls?userId=${userDetails?._id}`
      );
      console.log("polls",res);
      setPolls(res?.data?.data);
    } catch (error) {
      console.log("error in fetching user polls ", error);
    }
  }

  useEffect(() => {
    async function getUserQuestions() {
      try {
        const res = await axios.get(`/api/userQuestion/${uid}`, config);
        setUserQuestions(res?.data?.data);
      } catch (error) {
        console.log("error in fetching user questions ", error);
      }
    }
    getUserQuestions();
  }, [uid]);

  console.log(userDetails);

  return (
    <div className={`container d-flex flex-column mt-4 ${classes.container}`}>
      <div className="d-flex">
        <div className="w-70">
          <Avatar className={classes.avatar} />
        </div>
        <div className={classes.userDetails}>
          <h2>User Details</h2>
          <p>Name: {userDetails?.name}</p>
          <p>Email: {userDetails?.email}</p>
          <p>Rating: {userDetails?.rating}</p>
          <p>{userDetails?.qualification}</p>
        </div>
      </div>

      <div className={classes.questions}>
        <div className="d-flex justify-content-around mt-4">
          <button onClick={() => setView("questions")}>Questions Asked</button>
          <button onClick={() => getUserPolls()}>User Polls</button>
        </div>
        <hr />
        {view === "questions" ? (
          <div className={classes.questions}>
            <h4 className="mt-4">Questions Asked</h4>
            <hr />
            {userQuestions?.map((question, index) => {
              return (
                <div key={index}>
                  <Question data={question} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={classes.questions}>
            <h4 className="mt-4">User Polls</h4>
            <hr />
            {polls?.map((poll, index) => {
              return (
                <div key={index}>
                  <PollComponent data={poll} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}