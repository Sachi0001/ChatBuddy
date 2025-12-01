import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

export const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections)
    const getConnections = async () => {
       try {
            const res = await fetch(`${Base_Url}/connections`, { credentials: "include" });
            const data = await res.json();
            dispatch(addConnections(data?.data))
        } catch (error) {
          console.log(error)
        }
    }

useEffect(()=>{
    getConnections()
},[])

    return (

        <>
            <h1 className='text-center mb-4 text-xl'>You have {connections?.length} connections </h1>
            {connections?.length > 0 && (
                <div className="flex flex-col items-center gap-4 w-full px-2 mb-4">

                    {connections?.map((item, i) => (
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
                                    src={item?.photoUrl}
                                    alt="profile pic"
                                />
                            </figure>

                            <div className="card-body p-4 w-full">
                                <h2 className="card-title text-lg">
                                    {item?.firstName + " " + item?.lastName}
                                </h2>
                                <p>{item?.about}</p>
                            </div>

                            {/* <div className="card-body p-4 flex flex-row items-center justify-end w-full sm:w-auto">
                                <div className="flex justify-center ">
                                    <button className="btn btn-primary btn-sm sm:btn-md md:p-4 sm:p-2 mx-2  bg-blue-600 hover:bg-green-700" >
                                        Accept
                                    </button>
                                    <button className="btn  btn-sm sm:btn-md md:p-4 sm:p-2 mx-2  hover:bg-red-700 p-4">
                                        Reject
                                    </button>
                                </div>
                            </div>
 */}

                        </div>
                    ))}

                </div>
            )
            }</>);
}
