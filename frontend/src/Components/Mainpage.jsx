import React from "react";
import Button from "./Button";
import Questions from "./Questions";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
// import FilterListIcon from "@material-ui/icons/FilterList";
export default function Mainpage() {
  const navigate=useNavigate()
  // const [questions, setQuestions] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {// because async isnt directly supported in useEffect
  //     try {
  //       const questionsResponse = await axios.get("/api/getAllQuestions");
  //       setQuestions(questionsResponse.data);
  //       // console.log(questionsResponse.data)
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   fetchData(); 
  // }, []);
  // console.log(questions)
  return (
    <>
      <div className="d-flex flex-row align-items-center w-100 justify-content-between">
        <h1>Dashboard</h1>
        {/* <FilterListIcon/> */}
        <Button onClick={()=>navigate('/ask')}>Ask</Button>
      </div>
      
        <Questions  />
      
        
      
    </>
  );
}
