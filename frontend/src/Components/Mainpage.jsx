import React from "react";
import Button from "./Button";
import Questions from "./Questions";
import { useNavigate } from "react-router-dom";
// import FilterListIcon from "@material-ui/icons/FilterList";
export default function Mainpage() {
  const navigate=useNavigate()
  return (
    <>
      <div className="d-flex flex-row align-items-center w-100 justify-content-between">
        <h1>Dashboard</h1>
        {/* <FilterListIcon/> */}
        <Button onClick={()=>navigate('/ask')}>Ask</Button>
      </div>
      <div>
        <Questions/>
      </div>
    </>
  );
}
