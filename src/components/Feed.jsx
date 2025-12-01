import React, { useEffect, useState } from 'react'
import { UserCard } from './UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'

export const Feed = () => {
const feed = useSelector((store)=>store.feed)
const dispatch = useDispatch()
const getFeed = async()=>{
    try {
        if(feed) return;
        const response = await fetch(`${Base_Url}/interactionFeed`,{
            credentials:"include"
        })
        const data = await response.json()
        dispatch(addFeed(data))
    } catch (error) {
        console.log(error)
    }
}


useEffect(()=>{
    getFeed()
},[])

 if (!feed || feed.length === 0) {
    return <h1 className="text-center mt-10">You have viewed all the people</h1>;
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard feed={feed[0]} />
    </div>
  );
};
