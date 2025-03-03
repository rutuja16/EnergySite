import React from 'react';

function Chatbot(props) {
    return (
        <div className='Chat-Container'>
            <div className='chatbot-popup'>
                {/* Header */}
                <div className='chat-header'>
                    <div className='header-info'>
                    <img src="/chatbot.png" alt="bot-icon" />
                    <h2 className='logo-text'>ChatBot</h2>
                    </div>
                    <button class="material-symbols-outlined">keyboard_arrow_down</button>
                </div>
                {/* Body */}
                <div className='chat-body'>
                    <div className='message bot-message'>
                        <img src="/chatbot.png" alt="bot-icon" />
                        <p className='message-text'>
                            Hey there<br/> How can I help You today
                        </p>
                    </div>
                    <div className='message user-message'>
                        <img src="" alt="bot-icon" />
                        <p className='message-text'>
                            Hi Bot<br/> Want to update something...
                        </p>
                    </div>
                    <div className='message bot-message'>
                        <img src="/chatbot.png" alt="bot-icon" />
                        <p className='message-text'>
                            Hey there<br/> How can I help You today
                        </p>
                    </div>
                    <div className='message user-message'>
                        <img src="" alt="bot-icon" />
                        <p className='message-text'>
                            Hi Bot<br/> Want to update something...
                        </p>
                    </div>
                    <div className='message bot-message'>
                        <img src="/chatbot.png" alt="bot-icon" />
                        <p className='message-text'>
                            Hey there<br/> How can I help You today
                        </p>
                    </div>
                    <div className='message user-message'>
                        <img src="" alt="bot-icon" />
                        <p className='message-text'>
                            Hi Bot<br/> Want to update something...
                        </p>
                    </div>
                    <div className='message bot-message'>
                        <img src="/chatbot.png" alt="bot-icon" />
                        <p className='message-text'>
                            Hey there<br/> How can I help You today
                        </p>
                    </div>
                    <div className='message user-message'>
                        <img src="" alt="bot-icon" />
                        <p className='message-text'>
                            Hi Bot<br/> Want to update something...
                        </p>
                    </div>
                </div>

                <div className='chat-footer'>
                    <form className='chat-form'>
                        <input type='text' className='msg-txt' placeholder='Message...'required/>
                        <button class="material-symbols-outlined">arrow_upward</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;