import React, { useEffect } from 'react'
import { Navbar } from './Navbar'
import {Outlet, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { addUsers } from '../utils/userSlice'
import { Base_Url } from '../utils/constants'

export const Body = () => {
  const user = useSelector((store)=>store?.user)

  const navigate = useNavigate()
const dispatch = useDispatch()
  const feed = async()=>{
    if(user) return;
    try {
      const res = await fetch(`${Base_Url}/user`,{
  credentials: "include"
})
      if (!res?.ok) {
  if (res?.status === 401) {
    navigate("/login");
  }
  return;
}
      const data = await res.json();
      dispatch(addUsers(data?.data))
    } catch (error) {
     
      console.log(error)
    }
  }

useEffect(()=>{
  if(!user){
    feed()
  }

},[])





  return (
    <div>

<Navbar />
<Outlet />

    </div>
  )
}
