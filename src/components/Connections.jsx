import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Base_Url } from '../utils/constants';
import { Link } from 'react-router-dom';

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

console.log(connections,"connections")

    return (

        <>
            <h1 className='text-center mb-4 text-xl'>You have {connections?.length} connections </h1>
            {connections?.length > 0 && (
                <div className="flex flex-col items-center gap-4 w-full px-2 mb-4">

                    {connections?.map((item, i) => (
                        <div
                            key={item._id}
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
<Link to={`/chat/${item._id}`}>
<button>
    Chat
</button></Link>
                        </div>
                    ))}

                </div>
            )
            }</>);

}
