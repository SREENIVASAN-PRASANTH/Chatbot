import React from 'react'
import { useRef } from 'react';

const ChatForm = () => {

    const inputRef = useRef();

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();

        if(!userMessage) return;

        console.log(userMessage);

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
