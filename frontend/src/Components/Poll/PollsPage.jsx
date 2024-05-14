import React, { useEffect, useState } from "react";
import PollComponent from "./PollComponent";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
export default function PollsPage() {
  const navigate=useNavigate();
  const { uid } = useParams();
  const [polls, setPolls] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchPolls() {
      try {
        const res = await axios.get("/api/poll");
        setPolls(res.data.data);
        // console.log(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchPolls();
  }, []);
 
  return (
    <>
    <div className="d-flex justify-between mx-2">
      <h1 className="text-center">All Polls</h1>
      <button className="btn btn-primary" onClick={() =>navigate(`/createpoll/${uid}`)}>
        Create Poll
      </button>
    </div>
    <hr className="mx-2"/>
    <div>
      {polls?.map((poll, index) => {
        return (
          <div key={index}>
            <PollComponent data={poll} userId={uid}/>
          </div>
        );
      })}
    </div>
    </>
  );
}
