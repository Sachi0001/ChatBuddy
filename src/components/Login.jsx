import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUsers } from '../utils/userSlice';
import {useNavigate} from "react-router-dom"
import { SuccessMessage } from './SuccessMessage';
import { ErrorMessage } from './ErrorMessage';
import { Base_Url } from '../utils/constants';

export const Login = () => {
  const navigate = useNavigate()
const [emailId,setEmailId] = useState("");
const [successMessage,setSuccessMessage] = useState("");
const [errorMessage,setErrorMessage] = useState("");
const[firstName,setFirstName] = useState("");
const[lastName,setLastName] = useState("")
const [password,setPassWord] = useState("")
const [isLogin,setIsLogin] = useState(true)
const dispatch = useDispatch()
const handleLogin = async() =>{
 try{
  const response = await fetch(`${Base_Url}/login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify({
      emailId:emailId,
      password:password

    })
  })
  const data = await response.json()
  if(response.ok){
setSuccessMessage(data.message)
  
dispatch(addUsers(data.data))
navigate("/feed")
  }else{
    setErrorMessage(data.error)
  }
  
 }catch(err){
  setErrorMessage(err)
  console.log(err)
 }
}


const handleSignUp = async()=>{
  try {
    const res = await fetch(`${Base_Url}/signup`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify({
        firstName,
        lastName,
        emailId,
        password
      })
    })

    const data = await res.json()
    if(res.ok){

      setSuccessMessage(data.message)
    }else{
      setErrorMessage(data.error)
    }
  } catch (error) {
    console.log(error)
    setErrorMessage(error)
  }
}

  return (
    <>
    <div className='absolute top-4 left-1/2 -translate-x-1/2 z-50"'>
            {successMessage&&<SuccessMessage message = {successMessage} setMessage = {()=>setSuccessMessage()}/>}
             {errorMessage && <ErrorMessage message = {errorMessage} setMessage = {()=>setErrorMessage()} />}
    
            </div>
    <div className='flex justify-center my-4'>
    <div className="card card-dash bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title justify-center text-2xl">{isLogin?"Login":"Signup"}</h2>
    <fieldset className="fieldset text-base">

      {!isLogin && <>
       <legend className="fieldset-legend my-2">First Name</legend>
  <input type="text" className="input" placeholder="Type here"
  value={firstName}
  onChange={(e)=>{setFirstName(e.target.value)}}
  />
   <legend className="fieldset-legend my-2">Last Name</legend>
  <input type="text" className="input" placeholder="Type here" 
  value={lastName}
  onChange={(e)=>{setLastName(e.target.value)}}/></>}
  <legend className="fieldset-legend my-2">Email Id</legend>
  <input type="text" className="input" placeholder="Type here"
  value={emailId}
  onChange={(e)=>{setEmailId(e.target.value)}}
  />
   <legend className="fieldset-legend my-2">Password</legend>
  <input type="text" className="input" placeholder="Type here" 
  value={password}
  onChange={(e)=>{setPassWord(e.target.value)}}/>
</fieldset>


    <div className="card-actions flex flex-col justify-center items-center gap-2">
  <button
    className="bg-blue-600 text-white p-4 rounded-md w-1/3 text-center"
    onClick={isLogin ? handleLogin : handleSignUp}
  >
    {isLogin ? "Login" : "Signup"}
  </button>

  <div className="text-sm text-center">
    {isLogin ? (
      <>
        If you are not registered please{" "}
        <span className="text-blue-600 cursor-pointer" onClick={()=>setIsLogin(false)}>
          SignUp
        </span>
      </>
    ) : (
      <>
        If you are already registered please{" "}
        <span className="text-blue-600 cursor-pointer" onClick={()=>setIsLogin(true)}>
          Login
        </span>
      </>
    )}
  </div>
</div>

  </div>
</div></div></>
  )
}
