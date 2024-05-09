import React, { useEffect,useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Question from "../Question"
import axios from "axios"
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
  },
  avatar: {
    height: '95%',
    width: '60%',
    marginBottom: theme.spacing(2),
    border: '2px solid black', 
  },
  userDetails: {
    marginLeft: theme.spacing(2),
    color: 'black', 
  },
  questions: {
    marginTop: theme.spacing(2),
    backgroundColor: '#e8eaf6',
    padding: theme.spacing(2),
    borderRadius: '5px',
  },
}));

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [userQuestions, setUserQuestions] = useState([]); 
  const classes = useStyles();
  const {uid}=useParams();
  useEffect(()=>{
    async function getUserDetails() {try {
      const res=await axios.get(`/api/User?userId=${uid}`)
      setUserDetails(res?.data?.data[0])
    } catch (error) {
      console.log(error)
    }}
    getUserDetails()
  },[uid])
  useEffect(()=>{
    async function getUserQuestions(){
      try {
        const res=await axios.get(`/api/userQuestion/${uid}`)
        // console.log(res)
        setUserQuestions(res?.data?.data)
      } catch (error) {
        console.log("error in fetching user questions ",error)
      }
    }
    getUserQuestions()
  },[uid])
  console.log(userDetails)
  return (
    <div className={`container d-flex flex-column mt-4 ${classes.container}`}>
      <div className="d-flex">
        <div className="w-70">
          <Avatar className={classes.avatar} />
        </div>
        <div className={classes.userDetails}>
          <h2>User Details</h2>
          <p>Name: {userDetails.name }</p>
          <p>Email: {userDetails.email}</p>
          <p>Rating: {userDetails.rating}</p>
          <p>{userDetails.qualification}</p>
        </div>
      </div>
      
      <div className={classes.questions}>
      <h4 className="mt-4">Questions Asked</h4>
        <hr/>
        {
          userQuestions?.map((question,index)=>{
            return (
              <div key={index}>
                <Question data={question}/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}