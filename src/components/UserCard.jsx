import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { removeFeed } from '../utils/feedSlice';
import { SuccessMessage } from './SuccessMessage';
import { Base_Url } from '../utils/constants';

export const UserCard = ({ feed }) => {
  const [successMessage, setSuccessMessage] = useState("");
  
  // Safety check - return early if no feed
  if (!feed) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  const { _id, firstName, lastName, age, gender, skills, photoUrl, about } = feed;
  const dispatch = useDispatch();
  const location = useLocation()
  
  const interestOrIgnoreRequest = async (status, _id) => {
    try {
      const response = await fetch(`${Base_Url}/sendRequest/${status}/${_id}`, {
        method: "POST",
        credentials: "include",
      })
      
      if (response.ok) {
        dispatch(removeFeed(_id));
        const data = await response.json()
        setSuccessMessage(data)
      } else {
        console.log("Request failed:", response);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col shadow-xl'>
      <div className='absolute top-4 left-1/2 -translate-x-1/2 z-50'>
        {successMessage && <SuccessMessage message={successMessage} setMessage={() => setSuccessMessage("")} />}
      </div>
      
      <div className="card bg-base-100 w-96 shadow-sm px-4">
        <figure>
          <img
            src={photoUrl}
            alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          {skills && <p>{skills}</p>}
          <p>{about}</p>

          {(location.pathname === "/feed" || location.pathname === "/") &&
            <div className="card-actions justify-center">
              <button 
                className="btn hover:bg-red-700 p-4" 
                onClick={() => interestOrIgnoreRequest("ignored", _id)}
              >
                Ignore
              </button>
              <button 
                className="btn bg-blue-600 hover:bg-green-700 p-4" 
                onClick={() => interestOrIgnoreRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          }
        </div>
      </div>
    </div>  
  )
}