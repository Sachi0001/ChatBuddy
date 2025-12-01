import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestSlice';
import { SuccessMessage } from './SuccessMessage';
import { ErrorMessage } from './ErrorMessage';
import { Base_Url } from '../utils/constants';

export const Requests = () => {

  const requests = useSelector((store) => store.request);
  const [successMessage,setSuccessMessage] = useState("");
  const[errorMessage,setErrorMessage] = useState("")
  
  const dispatch = useDispatch();

  const getRequests = async () => {
    const res = await fetch(`${Base_Url}/recived/requests`, {
      credentials: "include"
    });

    const data = await res.json();
    dispatch(addRequests(data?.data));
  };


const acceptOrReject = async(status,_id)=>{
    try {
        const response = await fetch(`${Base_Url}/reviewRequest/${status}/${_id}`,{
            method:"POST",
            credentials:"include"
        })
        const data = await response.json();
        if(response.ok){
        setSuccessMessage(data?.message)
        dispatch(removeRequests(_id))
        }else{
          setErrorMessage(data.error || "something went dhsdhj")
        }
        
    } catch (error) {
        
      setErrorMessage(error.error)
        console.log(error)
   
    }
}


  useEffect(() => {
    getRequests();
  }, []);

  return (

    <>
    <div className='absolute top-4 left-1/2 -translate-x-1/2 z-50"'>
        {successMessage&&<SuccessMessage message = {successMessage} setMessage = {()=>setSuccessMessage()}/>}
         {errorMessage && <ErrorMessage message = {errorMessage} setMessage = {()=>setErrorMessage()} />}

        </div>
        <div className="card bg-base-100 w-96 shadow-sm px-4"></div>
    <h1 className='text-center mb-4 text-xl'>You have {requests.length} requests </h1>
  {  requests.length > 0 && (
      <div className="flex flex-col items-center gap-4 w-full px-2">
        
        {requests.map((item, i) => (
          <div
            key={i}
            className="
              card card-side bg-base-300 shadow-sm 
              w-full sm:w-10/12 md:w-7/12 lg:w-6/12 
              flex flex-col sm:flex-row h-auto
            "
          >
            <figure className="w-full sm:w-40 h-40 sm:h-full">
              <img
                className="h-full w-full object-cover rounded-sm"
                src={item?.fromUserId?.photoUrl}
                alt="profile pic"
              />
            </figure>

            <div className="card-body p-4 w-full">
              <h2 className="card-title text-lg">
                {item?.fromUserId?.firstName + " " + item?.fromUserId?.lastName}
              </h2>
              <p>{item?.fromUserId?.about}</p>
            </div>

         <div className="card-body p-4 flex flex-row items-center justify-end w-full sm:w-auto">
  <div className="flex justify-center ">
    <button className="btn btn-primary btn-sm sm:btn-md md:p-4 sm:p-2 mx-2  bg-blue-600 hover:bg-green-700"  onClick={()=>acceptOrReject("accepted",item._id)}>
      Accept
    </button>
    <button className="btn  btn-sm sm:btn-md md:p-4 sm:p-2 mx-2  hover:bg-red-700 p-4" onClick={()=>acceptOrReject("rejected",item._id)}>
      Reject
    </button>
  </div>
</div>


          </div>
        ))}

      </div>
    )
}</> );
};
