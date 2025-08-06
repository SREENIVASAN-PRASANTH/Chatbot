import React from 'react'
import ChatBotIcon from './components/ChatBotIcon'

const App = () => {
  return (
    <div className="container">
      <div className="chatbot-popup">

        {/* chatbot header */}
        <div className="chat-header">
          <div className="headerInfo">
            <ChatBotIcon/>
            <h2 className = "logo-text">Chatbot</h2>  
          </div>
          <button className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>


        {/* chatbot body */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatBotIcon/>
            <p className="message-text">
              Hey there <br /> How can I help you!
            </p>
          </div>

          <div className="message user-message">
            <p className="message-text">
              Need help in contact submission
            </p>
          </div>
        </div>

        {/* chatbot footer */}
        <div className="chatbot-footer">
          <form action="#" className="chat-form">
            <input type="text" placeholder = "Message...." className="message-input" required />

            <button className="material-symbols-rounded">
              arrow_upward
            </button>
          </form>
        </div>


      </div>
    </div>
  )
}

export default App
