import React, { useEffect, useState } from 'react'
import { UserCard } from './UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { Base_Url } from '../utils/constants';

export const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getFeed = async () => {
    // Only skip if feed has items
    if (feed && feed.length > 0) return;
    
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${Base_Url}/interactionFeed`, {
        credentials: "include"
      })

      if (!response.ok) {
        throw new Error('Failed to fetch feed')
      }

      const data = await response.json()
      dispatch(addFeed(data))
    } catch (error) {
      console.error('Feed error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error: {error}</span>
        </div>
      </div>
    )
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">No More Users</h1>
          <p className="text-base-content/70">You have viewed all available people</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard feed={feed[0]} />
    </div>
  )
}