import React from 'react'
import { useRef } from 'react';

const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {

    const inputRef = useRef();

    const handleFormSubmit = (e) =>{ 
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();

        if(!userMessage) return;
        inputRef.current.value = "";

        // update chat history with user message
        setChatHistory((history) => [...history, {role : "user", text: userMessage}]);


        // delay 600ms before showing thinking.. message and generating reespone
        setTimeout(() => {

          // add thinking placeholder for the bot response
          setChatHistory((history) => [...history, {role : "model", text: "Thinking..."}])

          //call the function to generate bot response
          generateBotResponse([...chatHistory, {role:"user", text: userMessage}]);
        }
        , 600);

        
    }


  return (
    <div>
      <form action="#" className="chat-form" onSubmit = {handleFormSubmit}>
        <input ref={inputRef} type="text" placeholder = "Message...." className="message-input" required />

        <button className="material-symbols-rounded">
            arrow_upward
        </button>
       </form>
    </div>
  )
}

export default ChatForm
