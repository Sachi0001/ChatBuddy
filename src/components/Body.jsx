import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { addUsers, removeUsers } from '../utils/userSlice'
import { Base_Url } from '../utils/constants'

export const Body = () => {
  const user = useSelector((store) => store?.user)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isChecking, setIsChecking] = useState(true)

  const checkAuth = async () => {
    // Skip auth check for login page
    if (location.pathname === '/login') {
      setIsChecking(false)
      return
    }

    try {
      const res = await fetch(`${Base_Url}/user`, {
        credentials: "include"
      })

      if (!res?.ok) {
        console.log("Auth check failed, redirecting to login")
        dispatch(removeUsers())
        navigate("/login", { replace: true })
        return
      }

      const data = await res.json()
      dispatch(addUsers(data?.data))
    } catch (error) {
      console.error("Auth check error:", error)
      dispatch(removeUsers())
      navigate("/login", { replace: true })
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    // Always check auth when navigating to protected routes
    if (!user || location.pathname !== '/login') {
      setIsChecking(true)
      checkAuth()
    } else {
      setIsChecking(false)
    }
  }, [location.pathname])

  // Show loading while checking authentication
  if (isChecking && location.pathname !== '/login') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}