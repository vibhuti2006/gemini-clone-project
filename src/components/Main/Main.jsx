import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'

const Main = () => {
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            <div className="greet">
                <p><span>Hello, Folk</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>What's the best way to structure a full-stack web app?</p>
                    <img src={assets.code_icon} alt="" />
                </div>
                <div className="card">
                    <p>Suggest countries to visit in budget</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Can you help me brainstorm a story plot?</p>
                    <img src={assets.light_bulb} alt="" />
                </div>
                <div className="card">
                    <p>Can you simulate a conversation between Sherlock Holmes and Batman?</p>
                    <img src={assets.message_icon} alt="" />
                </div>
            </div>

            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder='Enter a prompt here'/>
                    <div>
                        <img src={assets.gallery_add_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className='bottom-info'>
                    Google Gemini can make mistakes. Check important information.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main