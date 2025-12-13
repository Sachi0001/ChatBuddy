import React, { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Base_Url } from "../utils/constants";

export const Chat = () => {
  const [messages, setMessages] = useState([]);   // store chat messages
  const [input, setInput] = useState("");         // store text input

  const user = useSelector((store) => store.user);
  const userId = user?._id;
 const endRef = useRef(null);

  const { targetId } = useParams();

  const fetchMessages = async()=>{
    const res = await fetch(`${Base_Url}/chat/${targetId}`,{credentials:"include"});
    const data = await res.json();
  
      const messages = data?.chat?.messages?.map((item)=>{
        return{
          firstName:item.senderId.firstName,
          text:item.messages
        }
      })
      
      setMessages(messages);
  
  }


useEffect(()=>{
fetchMessages();

},[])


  useEffect(() => {
    const socket = createSocketConnection();

    // Join room
    socket.emit("joinChat", { userId, targetId });

    // Receive message
    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName+":"+text)
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    return () => socket.disconnect();
  }, [userId, targetId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetId,
      text: input
    });

    setInput(""); // clear box
  };


const handleScrollToBottom = ()=>{
endRef.current.scrollIntoView({behavior:"smooth"})

}

useEffect(()=>{
  handleScrollToBottom()
},[messages])
  return (
    <div className="w-full min-h-screen p-4">
      <div className="max-w-2xl mx-auto border border-slate-300 rounded-lg p-4 h-[70vh] flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-center">Chat Box</h1>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((item, i) => (
            <div key={i}>
              {item.firstName === user.firstName ? (
                <div className="chat chat-end">
                  <div>{item.firstName}</div>

                  <div className="chat-bubble">{item.text}</div>
                </div>
              ) : (
                <div className="chat chat-start">
                  <div>{item.firstName}</div>
                  <div className="chat-bubble">{item.text}</div>
                </div>
              )}
            </div>
          ))}
          <div ref={endRef}>

          </div>
        </div>

        {/* Input Box */}
        <div className="mb-0 flex gap-2 pt-2">
          <input
            className="border p-2 flex-1 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    }}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={sendMessage}

          
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
