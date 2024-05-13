import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Questions from './Questions'
// import axios from 'axios'
export default function OrganisationPage() {
  const {orgName}=useParams()
  console.log(orgName)
  return (
    <div>
      <Questions Organisation={orgName?.replace(/_/g, " ")}/>
    </div>
  )
}
