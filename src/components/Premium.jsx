import React from 'react';
import { Base_Url } from '../utils/constants';
import chatImg from "../assets/chat.webp"

export const Premium = () => {


  const handlePayment = async(membershipType)=>{
    try {
      const response = await fetch(`${Base_Url}/payment/create`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
       body:JSON.stringify({membershipType})
    
      })

      const data = await response.json()
      console.log(data)

      const{keyId,amount,currency,orderId,notes} = data
  var options = {
            key: keyId,
            amount,
            currency,
            name: "ChatBuddy",
            description: "payment",
            image: "https://cdn.razorpay.com/logos/GhRQcyean79PqE_medium.png",
            order_id: orderId,
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
                contact: "999999999"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            },
        };
        var rzp = new window.Razorpay(options);
        rzp.open();

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="w-full p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">

      {/* Silver Card */}
      <div className="card bg-base-300 rounded-box shadow-md w-full md:w-1/2 flex flex-col items-center">
        <h1
          className="p-4 rounded-md m-4 text-black font-semibold shadow-md text-center w-1/2"
          style={{
            background:
              "linear-gradient(135deg, #eeeeee 0%, #cfcfcf 25%, #b3b3b3 50%, #e6e6e6 75%, #ffffff 100%)",
          }}
        >
          Silver Membership
        </h1>

        <ul className="p-4 text-center space-y-2">
          <li>Chat with other people</li>
          <li>Send 100 connection requests per day</li>
          <li>3 months</li>
        </ul>

        <button onClick={()=>handlePayment("silver")}
          className="p-2 rounded-md m-4 text-black font-semibold shadow-md w-1/4"
          style={{
            background:
              "linear-gradient(135deg, #eeeeee 0%, #cfcfcf 25%, #b3b3b3 50%, #e6e6e6 75%, #ffffff 100%)",
          }}
        >
          Buy Silver
        </button>
      </div>

      {/* Divider (hidden on small screens) */}
      <div className="divider divider-horizontal hidden md:flex">OR</div>

      {/* Gold Card */}
      <div className="card bg-base-300 rounded-box shadow-md w-full md:w-1/2 flex flex-col items-center">
        <h1
          className="p-4 rounded-md m-4 text-black font-semibold shadow-md text-center w-1/2"
          style={{
            background:
              "linear-gradient(90deg, #F7E98E, #E0C25B, #D4A017, #E0C25B, #F7E98E)",
          }}
        >
          Gold Membership
        </h1>

        <ul className="p-4 text-center space-y-2">
          <li>Chat with other people</li>
          <li>Send unlimited connection requests per day</li>
          <li>12 months</li>
        </ul>

        <button onClick={()=>handlePayment("gold")}
          className="p-2 rounded-md m-4 text-black font-semibold shadow-md w-1/4"
          style={{
            background:
              "linear-gradient(90deg, #F7E98E, #E0C25B, #D4A017, #E0C25B, #F7E98E)",
          }}
        >
          Buy Gold
        </button>
      </div>
    </div>
  );
};
