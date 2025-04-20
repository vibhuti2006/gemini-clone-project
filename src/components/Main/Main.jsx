import React, { useState  , useContext} from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Main = () => {

  const {inputValue,
    setInputValue,
    inChat,
    setInChat,
    messages,
    setMessages,
    isLoading,
    setIsLoading} = useContext(Context);

  function handlePrompt(customPrompt) {
    const prompt = customPrompt || inputValue.trim();
    if (prompt === "") return;

    const userMessage = prompt;
    const updatedMessages = [
      ...messages,
      { type: "user", content: userMessage },
    ];
    setMessages(updatedMessages);
    setInChat(true);
    setIsLoading(true);
    setInputValue(""); // Clear input field

    const API_KEY = "AIzaSyDCK86CWhdwJouK-S7OTrmyzyUpnki1U20";
    const API_URL =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent";

    const headers = {
      "Content-Type": "application/json",
      "x-goog-api-key": API_KEY,
    };

    const requestBody = {
      contents: [
        {
          parts: [
            { text: userMessage },
            {
              text: "Give me just plain structured text dont bold italic underline etc and dont mention it anywhere in the reeponse",
            },
          ],
        },
      ],
    };

    fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        const output =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I couldn't generate a response. Please try again.";

        setMessages([...updatedMessages, { type: "bot", content: output }]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessages([
          ...updatedMessages,
          {
            type: "bot",
            content: "Sorry, I encountered an error. Please try again.",
          },
        ]);
        setIsLoading(false);
      });
  }

  // Function to handle card selection
  const handleCardClick = (prompt) => {
    handlePrompt(prompt);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {/* Initial greeting screen */}
        {!inChat && (
          <div>
            <div className="greet">
              <p>
                <span>Hello, Folk</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "What's the best way to structure a full-stack web app?"
                  )
                }
              >
                <p>What's the best way to structure a full-stack web app?</p>
                <img src={assets.code_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Suggest countries to visit in budget")
                }
              >
                <p>Suggest countries to visit in budget</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Can you help me brainstorm a story plot?")
                }
              >
                <p>Can you help me brainstorm a story plot?</p>
                <img src={assets.light_bulb} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Can you simulate a conversation between Sherlock Holmes and Batman?"
                  )
                }
              >
                <p>
                  Can you simulate a conversation between Sherlock Holmes and
                  Batman?
                </p>
                <img src={assets.message_icon} alt="" />
              </div>
            </div>
          </div>
        )}

        {/* Chat conversation display */}
        {inChat && (
          <div className="chat-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.type === "user" ? "user-message" : "bot-message"
                }
              >
                {message.type === "user" ? (
                  <div className="user-message-container">
                    <p className="response-text">{message.content}</p>
                  </div>
                ) : (
                  <div className="gemini-response-container">
                    <div className="gemini-avatar">
                      <img
                        src={assets.gemini_icon_new || assets.user_icon}
                        alt="Gemini"
                      />
                    </div>
                    <div className="gemini-content">
                      <p className="response-text">{message.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Loading animation when waiting for a response */}
            {isLoading && (
              <div className="bot-message">
                <div className="gemini-response-container">
                  <div className="gemini-avatar">
                    <img
                      src={assets.gemini_icon_new || assets.user_icon}
                      alt="Gemini"
                    />
                  </div>

                  
                  {/* <div className="gemini-content">
                    <div className="gemini-indicator">
                      <div className="gemini-spinner">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                  </div> */
                  
                  // updation
                  <div className="loader">
                    <hr/>
                    <hr/>
                    <hr/>
                  </div>
                  
                  
                  }
                </div>
              </div>
            )}
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim() !== "") {
                  handlePrompt();
                }
              }}
              value={inputValue}
              type="text"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              placeholder="Enter a prompt here"
            />
            <div>


              <div className="tooltip-container">
                <img
                  id="gallery-add-icon"
                  src={assets.gallery_add_icon}
                  alt=""
                />
                <span className="custom-tooltip">This is a Paid Feature</span>
              </div>

              <div className="tooltip-container">
                <img
                  id="gallery-add-icon"
                  src={assets.mic_icon}
                  alt=""
                />
                <span className="custom-tooltip">This is a Paid Feature</span>
              </div>

              {inputValue.trim().length > 0 && (
                <img src={assets.send_icon} onClick={handlePrompt} alt="" />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Google Gemini can make mistakes. Check important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
