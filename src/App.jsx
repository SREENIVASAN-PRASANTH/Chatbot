import React from 'react'
import {useState} from 'react'
import ChatBotIcon from './components/ChatBotIcon'
import ChatForm from './components/ChatForm'
import ChatMessage from './components/ChatMessage'
import { useEffect, useRef } from 'react'
import {companyInfo} from "./companyInfo"

const App = () => {

  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();


  const generateBotResponse = async (history) => {

    //helper function to update chat history
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: "model", text, isError}])
    }

    //format chat history for Api request
    history = history.map(({role, text}) => ({role, parts :[{text}]}));

    const requestOptions = {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({contents: history})
    }

    try{
      //make api call to get bot response
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok) throw new Error(data.error.message || "Something went wrong");

      //clean and update chat history with bot response
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();

      updateHistory(apiResponseText);
    }
    catch(error){
      updateHistory(error.message, true);
      
    }
  }

  useEffect(() => {
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behaviour: "smooth"});
  }, [chatHistory]);

  return (
    <div className= {`container ${showChatbot ? "show-chatbot":""}`}>
      <button onClick = {() => setShowChatbot(prev => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>

      <div className="chatbot-popup">

        {/* chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatBotIcon/>
            <h2 className = "logo-text">Chatbot</h2>  
          </div>
          <button onClick = {() => setShowChatbot(prev => !prev)} className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>


        {/* chatbot body */}
        <div ref = {chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatBotIcon/>
            <p className="message-text">
              Hey there <br /> How can I help you!
            </p>
          </div>

          {/* Render the chat history  dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key = {index} chat = {chat}/>
          ))}

          
        </div>

        {/* chatbot footer */}
        <div className="chatbot-footer">
          <ChatForm chatHistory = {chatHistory} setChatHistory = {setChatHistory} generateBotResponse = {generateBotResponse}/>
        </div>


      </div>
    </div>
  )
}

export default App
