import React, { useEffect, useState } from "react";
import { Base_Url } from "../utils/constants";

export const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [membershipType, setMembershipType] = useState("");

  const verifyPremium = async () => {
    try {
      const res = await fetch(`${Base_Url}/premium/verify`, {
        credentials: "include",
      });
      const data = await res.json();
      setIsPremium(data.isPremium);
      setMembershipType(data.membershipType);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyPremium();
  }, []);

  const handlePayment = async (membershipType) => {
    try {
      const response = await fetch(`${Base_Url}/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ membershipType }),
      });

      const data = await response.json();
      const { keyId, amount, currency, orderId, notes } = data;

      var options = {
        key: keyId,
        amount,
        currency,
        name: "ChatBuddy",
        description: "payment",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "999999999",
        },
        theme: { color: "#3399cc" },
        handler: verifyPremium,
      };

      var rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  // --------------------------
  // 🔥 UI CONDITIONS
  // --------------------------

  // Condition 1: Already Gold
  if (isPremium && membershipType === "gold") {
    return (
      <div className="w-full p-10 text-center text-xl font-semibold">
        🎉 You are already a <span className="text-yellow-600">Gold Member</span>!
      </div>
    );
  }

  // Condition 2: Silver member → Show only Gold card
  if (isPremium && membershipType === "silver") {
    return (
      <div className="w-full p-6 flex justify-center">
        <div className="card bg-base-300 rounded-box shadow-md w-full md:w-1/2 flex flex-col items-center">
          <h1
            className="p-4 rounded-md m-4 text-black font-semibold shadow-md text-center w-1/2"
            style={{
              background:
                "linear-gradient(90deg, #F7E98E, #E0C25B, #D4A017, #E0C25B, #F7E98E)",
            }}
          >
            Upgrade to Gold Membership
          </h1>

          <ul className="p-4 text-center space-y-2">
            <li>Chat with other people</li>
            <li>Send unlimited connection requests</li>
            <li>12 months</li>
          </ul>

          <button
            onClick={() => handlePayment("gold")}
            className="p-2 rounded-md m-4 text-black font-semibold shadow-md w-1/4"
            style={{
              background:
                "linear-gradient(90deg, #F7E98E, #E0C25B, #D4A017, #E0C25B, #F7E98E)",
            }}
          >
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  // Condition 3: Not premium → show both cards (your existing UI)
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
          <li>Send 100 connection requests/day</li>
          <li>3 months</li>
        </ul>

        <button
          onClick={() => handlePayment("silver")}
          className="p-2 rounded-md m-4 text-black font-semibold shadow-md w-1/4"
          style={{
            background:
              "linear-gradient(135deg, #eeeeee 0%, #cfcfcf 25%, #b3b3b3 50%, #e6e6e6 75%, #ffffff 100%)",
          }}
        >
          Buy Silver
        </button>
      </div>

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
          <li>Unlimited connection requests</li>
          <li>12 months</li>
        </ul>

        <button
          onClick={() => handlePayment("gold")}
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
